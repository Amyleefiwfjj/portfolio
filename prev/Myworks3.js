let circles = []; // 원들을 저장할 배열
let pointerCircle; // 마우스 포인터 효과를 위한 원
let scrollCount = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noFill();
    pointerCircle = new Circle(mouseX, mouseY, color(255, 0, 0, 150)); // 초기 마우스 포인터 효과 원 생성
}

function draw() {
    background(0, 0, 0, 20);  // 배경을 검은색으로 설정하면서 약간 투명도를 주어 이전 원의 트레일이 남도록 함

    // 마우스 포인터 효과 원의 위치 업데이트
    pointerCircle.x = mouseX;
    pointerCircle.y = mouseY;

    // 마우스 포인터 효과 원과 트레일 그리기
    pointerCircle.display();

    // 배열에 저장된 원들 각각을 그리기
    for (let i = 0; i < circles.length; i++) {
        circles[i].move();  // 원의 위치 업데이트
        circles[i].display();  // 원과 트레일을 그리기
    }
}

// 원을 클릭한 위치에 추가하는 함수
function mousePressed() {
    // 원을 생성할 때마다 랜덤 색상 생성
    let col = color(random(255), random(255), random(255));
    let newCircle = new Circle(mouseX, mouseY, col);
    circles.push(newCircle); // 새로운 원을 circles 배열에 추가

    // 클릭 횟수가 10을 초과하면 원들을 모두 제거하고 contact-info 보이기
    if (clickCount > 10) {
        circles = []; // 모든 원을 제거
        document.getElementById('contact-info').style.display = 'block'; // contact-info 보이기
    }
    clickCount++;
}

// 원 클래스
class Circle {
    constructor(x, y, col) {
        this.x = x;  // 원의 x 위치
        this.y = y;  // 원의 y 위치
        this.size = random(20, 50);  // 원의 크기 랜덤 설정
        this.color = col;  // 원의 색상
        this.xSpeed = random(-this.size / 10, this.size / 10);  // x 방향 속도, 크기 비례
        this.ySpeed = random(2, this.size / 5);  // y 방향 속도, 크기 비례
        this.trail = [];  // 원의 트레일을 저장할 배열
    }

    // 원의 움직임 및 트레일 추가
    move() {
        // 원의 위치 업데이트
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // 트레일에 현재 위치 추가
        this.trail.push(createVector(this.x, this.y));

        // 트레일의 길이가 너무 길어지면 삭제
        if (this.trail.length > 50) {
            this.trail.shift();
        }

        // 화면의 모서리와 충돌 시 반사
        if (this.x - this.size / 2 <= 0 || this.x + this.size / 2 >= width) {
            this.xSpeed *= -1;  // x 속도 반전
        }
        if (this.y - this.size / 2 <= 0 || this.y + this.size / 2 >= height) {
            this.ySpeed *= -1;  // y 속도 반전
        }
    }

    // 원과 트레일을 그리는 함수
    display() {
        // 트레일 그리기
        for (let i = 0; i < this.trail.length; i++) {
            let alpha = map(i, 0, this.trail.length, 100, 0); // 트레일의 투명도
            let trailSize = map(i, 0, this.trail.length, this.size / 5, this.size / 2); // 트레일의 크기
            stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], alpha);
            strokeWeight(trailSize);  // 트레일의 크기 조정
            point(this.trail[i].x, this.trail[i].y);  // 트레일의 점 그리기
        }

        // 원 그리기 (유리 효과를 주기 위해 약간 투명도 설정)
        noStroke();
        fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], 150);  // 약간 투명한 색상
        ellipse(this.x, this.y, this.size, this.size); // 원 그리기
    }
}

// 마우스 위치에 따라 원 색상 변화 (유리 느낌을 더함)
function mouseMoved() {
    // 마우스 위치에 따라 포인터 색상 변화
    let col = color(map(mouseX, 0, width, 0, 255), map(mouseY, 0, height, 0, 255), 255);
    pointerCircle.color = col; // 마우스 위치에 따라 원 색상 변경
}

function keyPressed() {
    if (key === '1') {
        // 키 '1'을 눌러서 원의 크기와 속도를 변화시킬 수 있음
        for (let circle of circles) {
            circle.size = random(30, 70); // 원 크기 변경
            circle.xSpeed = random(-circle.size / 10, circle.size / 10); // x 속도 변경
            circle.ySpeed = random(2, circle.size / 5); // y 속도 변경
        }
    }
}

window.addEventListener('load', function () {
    // 로딩 화면 숨기기
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');

    // 로딩 화면을 숨기고 콘텐츠를 표시
    loadingScreen.style.display = 'none';
    content.style.display = 'block';
});
function mouseWheel(event) {
    scrollCount += Math.sign(event.delta);

    // 스크롤 카운트가 ±5 이상이면
    if (Math.abs(scrollCount) >= 5) {

        window.location.href = "Myworks4.html";

    }

}
