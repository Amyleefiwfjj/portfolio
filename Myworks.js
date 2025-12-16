let trailLayer;
let yarnA, yarnB;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("position", "fixed");
  canvas.style("top", "0");
  canvas.style("left", "0");
  canvas.style("pointer-events", "none"); // 스크롤/클릭은 아래로 통과
  canvas.style("z-index", "1");

  trailLayer = createGraphics(windowWidth, windowHeight);
  trailLayer.clear();

  yarnA = new Yarn(color("#F89A92"));
  yarnB = new Yarn(color("#81D9CC"));
}

function draw() {
  // 배경은 매 프레임 지우고
  background(250);

  // 스크롤을 실의 "목표 위치"로 반영 (예: 아래로 내려갈수록 y 증가)
  const targetY = (window.scrollY || 0) * 0.4 + height * 0.25;
  const targetX1 = width * 0.45;
  const targetX2 = width * 0.55;

  yarnA.step(targetX1, targetY);
  yarnB.step(targetX2, targetY);

  // 누적 레이어에 그리기
  yarnA.drawTo(trailLayer);
  yarnB.drawTo(trailLayer);

  // 누적 결과를 메인 캔버스에 올리기
  image(trailLayer, 0, 0);

  // (선택) 현재 실 위치만 살짝 강조해서 위에 그리기
  yarnA.drawTo(this, true);
  yarnB.drawTo(this, true);
}

class Yarn {
  constructor(c) {
    this.c = c;
    this.N = 40;                // 세그먼트 수(실 길이 느낌)
    this.pts = [];
    for (let i = 0; i < this.N; i++) this.pts.push(createVector(width/2, height/4));
    this.vel = createVector(0, 0);
  }

  step(tx, ty) {
    // 머리점(lead)을 스프링/관성으로 이동
    const head = this.pts[0];
    const target = createVector(tx, ty);

    const force = p5.Vector.sub(target, head).mult(0.08);
    this.vel.add(force).mult(0.85);
    head.add(this.vel);

    // 나머지 점들은 앞 점을 스프링처럼 따라오게
    for (let i = 1; i < this.N; i++) {
      const prev = this.pts[i-1];
      const cur = this.pts[i];
      const dir = p5.Vector.sub(prev, cur);
      dir.mult(0.35);
      cur.add(dir);

      // 약간의 노이즈로 “섬유 흔들림”
      const t = frameCount * 0.02 + i * 0.15;
      cur.x += (noise(t) - 0.5) * 0.6;
      cur.y += (noise(t + 1000) - 0.5) * 0.6;
    }
  }

  drawTo(g, highlight=false) {
    g.push();
    g.noFill();
    g.stroke(this.c);
    g.strokeWeight(highlight ? 4 : 2);

    // 누적 무늬를 더 예쁘게: 낮은 알파로 여러 번 겹쳐 그리기
    if (!highlight) g.stroke(this.c.levels[0], this.c.levels[1], this.c.levels[2], 18);

    g.beginShape();
    for (let p of this.pts) g.curveVertex(p.x, p.y);
    g.endShape();

    // “실 결” 느낌: 미세 오프셋으로 한 번 더
    if (!highlight) {
      g.stroke(this.c.levels[0], this.c.levels[1], this.c.levels[2], 10);
      g.beginShape();
      for (let i = 0; i < this.pts.length; i++) {
        const p = this.pts[i];
        g.curveVertex(p.x + sin(i*0.9)*0.8, p.y + cos(i*0.9)*0.8);
      }
      g.endShape();
    }

    g.pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  const old = trailLayer;
  trailLayer = createGraphics(windowWidth, windowHeight);
  trailLayer.image(old, 0, 0); // 누적 보존(간단 처리)
}
