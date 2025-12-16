let scrollY = 0;
let maxScroll; // 3 * height
const cA = "#F89A92";
const cB = "#81D9CC";

function setup() {
  createCanvas(windowWidth, windowHeight);
  maxScroll = 3 * height;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  maxScroll = 3 * height;
}

function mouseWheel(e) {
  // 휠 감도는 프로젝트에 맞게 조정
  scrollY += e.delta * 0.8;
  scrollY = constrain(scrollY, 0, maxScroll);
  return false;
}

function draw() {
  background(245);

  const t = constrain(scrollY / maxScroll, 0, 1);

  // Phase A: 페인트 이동/생성
  drawPaintTravel(t);

  // Phase B: 아래 페이지(네모 레이아웃) + 페인트 정착
  drawLandingBlocks(t);
}

function drawPaintTravel(t) {
  // 시작점: 화면 상단 중앙
  const startX = width * 0.5;
  const startY = height * 0.25;

  // 페인트가 아래로 “도달”하는 가상의 y
  const travelY = lerp(startY, height * 1.2, t);

  noStroke();

  // 단순화: 두 페인트가 서로 다른 방향으로 약간 벌어지며 내려감
  fill(cA);
  ellipse(lerp(startX, width * 0.2, t), travelY, 24 + 40 * (1 - t));

  fill(cB);
  ellipse(lerp(startX, width * 0.8, t), travelY, 24 + 40 * (1 - t));

  // 시작점(한 점) 강조
  fill(30);
  ellipse(startX, startY, 6, 6);
}

function drawLandingBlocks(t) {
  // 아래 페이지는 t가 어느 정도 커지면 나타나야 자연스럽다.
  const appear = smoothstep(0.7, 1.0, t); // 0.7~1 사이에서 서서히 등장

  if (appear <= 0) return;

  const blockW = width / 3;
  const leftX = 0;
  const rightX = width - blockW;

  // 네모 “채움 진행률”: t가 0.7->1로 갈 때 0->1
  const p = appear;

  // 네모 배경(윤곽)
  noFill();
  stroke(0, 40);
  rect(leftX, 0, blockW, height);
  rect(rightX, 0, blockW, height);

  noStroke();

  // 채워지는 면적(위에서 아래로)
  fill(cA);
  rect(leftX, 0, blockW, height * p);

  fill(cB);
  rect(rightX, 0, blockW, height * p);
}

function smoothstep(a, b, x) {
  const t = constrain((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}
