let circleRadius = 20; // 원의 기본 반지름
let circleX = 0; // 원의 x 좌표
let circleY = 0; // 원의 y 좌표
let trail = []; // 마우스를 따라가는 트레일
let points = []; // 배경의 반짝이는 점들

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
}

function draw() {
  // 배경에 그라데이션 효과 추가
  let bgColor1 = map(mouseX, 0, width, 0, 255);
  let bgColor2 = map(mouseY, 0, height, 0, 255);
  background(bgColor1, bgColor2, 255 - bgColor1); // 배경 그라데이션

  // 마우스 트레일: 마우스를 따라가는 원들이 남는다
  trail.push(createVector(mouseX, mouseY)); // 마우스 위치를 트레일 배열에 추가
  if (trail.length > 20) {
    trail.shift(); // 트레일의 길이가 20을 넘으면 앞부분을 삭제
  }

  // 트레일에 따라 원들을 그리기 (원 크기 점차적으로 변화)
  noFill();
  stroke(255, 0, 0); // 빨간색 트레일
  for (let i = 0; i < trail.length; i++) {
    let pos = trail[i];
    ellipse(pos.x, pos.y, map(i, 0, trail.length, 10, 50), map(i, 0, trail.length, 10, 50)); // 트레일 크기
  }

  // 배경에 반짝이는 점들 추가
  for (let i = 0; i < 10; i++) {
    let pointX = random(width);
    let pointY = random(height);
    let pointSize = random(5, 10);
    let alpha = map(dist(mouseX, mouseY, pointX, pointY), 0, width, 100, 255);

    stroke(255, alpha); // 투명도 변화
    strokeWeight(pointSize);
    point(pointX, pointY); // 반짝이는 점
  }

  // 마우스 위치에 따라 원이 부드럽게 따라가도록 설정
  let easing = 0.1; // 부드럽게 따라가는 속도 (0.1은 천천히 따라감)
  circleX += (mouseX - circleX) * easing; // 원의 x 위치 부드럽게 이동
  circleY += (mouseY - circleY) * easing; // 원의 y 위치 부드럽게 이동

  // 원 그리기
  stroke(0);
  strokeWeight(3);
  ellipse(circleX, circleY, circleRadius * 2, circleRadius * 2); // 원의 크기 설정

  // 원의 크기 동적 변화 (마우스와 원의 거리 기반)
  circleRadius = map(dist(mouseX, mouseY, circleX, circleY), 0, width, 20, 100); // 크기 조정

  // 배경에 움직이는 선 추가 (마우스와 반응하는 선)
  stroke(255, 100, 200); // 색상 설정
  strokeWeight(2);
  for (let i = 0; i < width; i += 50) {
    let y1 = map(sin(frameCount * 0.05 + i * 0.05), -1, 1, 0, height);
    let y2 = map(cos(frameCount * 0.05 + i * 0.05), -1, 1, 0, height);
    line(i, y1, i + 50, y2); // 선 그리기
  }
}
function mouseClicked() {
  window.location.href = "Myworks3.html"; // 클릭 즉시 Myworks2.html로 이동

}

// 페이지 로딩 시 로딩 화면 숨기기
window.addEventListener('load', function () {
  const loadingScreen = document.getElementById('loading-screen');
  const content = document.getElementById('content');

  loadingScreen.style.display = 'none'; // 로딩 화면 숨기기
  content.style.display = 'block'; // 콘텐츠 표시
});
