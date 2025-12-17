let patterns = [];
let baseSize = 50; // 기본 원 크기
let cols, rows; // 그리드의 열과 행
let maxDistance; // 마우스와의 최대 거리
let time = 0; // Perlin noise의 시간값

// 마우스 포인터와 관련된 변수
let pointerCircle; // 마우스 포인터를 따라가는 원

function setup() {
    createCanvas(windowWidth, windowHeight);
    cols = int(width / baseSize); // 열의 개수 계산
    rows = int(height / baseSize); // 행의 개수 계산
    maxDistance = dist(0, 0, width, height); // 화면의 대각선 길이 (마우스 거리)

    // 마우스 포인터에 따른 원 초기화
    pointerCircle = new Pattern(mouseX, mouseY, color(255, 0, 0, 150));

    // 초기 패턴 생성
    for (let i = 0; i < cols; i++) {
        patterns[i] = [];
        for (let j = 0; j < rows; j++) {
            let x = i * baseSize + baseSize / 2;
            let y = j * baseSize + baseSize / 2;
            let color = getColorAt(x, y);
            patterns[i][j] = new Pattern(x, y, color);
        }
    }
}

function draw() {
    background(0, 0.0, 20);  // 배경을 검은색으로 설정하면서 트레일 효과를 위한 약간의 투명도를 주어 이전 원의 트레일이 남도록 함

    time += 0.01; // Perlin noise 시간 값 증가

    // 마우스 포인터의 원도 움직이게 만듬
    pointerCircle.x = mouseX;
    pointerCircle.y = mouseY;
    pointerCircle.display(); // 마우스 포인터를 따라가는 원

    // 각 패턴을 Perlin Noise로 흐르게 만드는 과정
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let p = patterns[i][j];

            // 마우스와의 거리 계산
            let distance = dist(mouseX, mouseY, p.x, p.y);
            let sizeFactor = map(distance, 0, maxDistance, 0.5, 2); // 원 크기 변화

            p.update(time, sizeFactor);  // Perlin noise에 의해 원이 흐르도록 업데이트
            p.display(); // 원 그리기
        }
    }
}

// 마우스를 클릭하면 색상과 패턴이 변화
function mousePressed() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            patterns[i][j].changePattern(); // 패턴 변경
        }
    }
}

// 특정 위치에 맞는 색상을 반환하는 함수
function getColorAt(x, y) {
    let r = map(x, 0, width, 0, 255);
    let g = map(y, 0, height, 0, 255);
    let b = map(dist(x, y, mouseX, mouseY), 0, width, 0, 255);
    return color(r, g, b);
}

// 패턴 클래스
class Pattern {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = baseSize;
        this.shapeType = int(random(0, 3)); // 초기 도형 종류 (0: 원, 1: 사각형, 2: 삼각형)
    }

    // Perlin noise로 위치를 부드럽게 업데이트
    update(time, sizeFactor) {
        this.size = baseSize * sizeFactor;

        let xOffset = map(this.x, 0, width, 0, 1000);
        let yOffset = map(this.y, 0, height, 0, 1000);

        // Perlin noise를 사용하여 부드럽게 움직임을 만든다
        let n1 = noise(xOffset + time) * TWO_PI;  // X축에 대한 Perlin Noise
        let n2 = noise(yOffset + time) * TWO_PI;  // Y축에 대한 Perlin Noise

        this.x += cos(n1) * 2;  // Perlin noise를 기반으로 X축 움직임
        this.y += sin(n2) * 2;  // Perlin noise를 기반으로 Y축 움직임
    }

    // 패턴 그리기
    display() {
        fill(this.color);
        noStroke();
        switch (this.shapeType) {
            case 0:
                triangle(this.x, this.y + this.size / 2, this.x +this.size / 2, this.y - this.size / 2, this.x - this.size / 2, this.y - this.size / 2); // 삼각형
                break;
            case 1:
                rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size); // 사각형
                break;
            case 2:
                triangle(this.x, this.y - this.size / 2, this.x - this.size / 2, this.y + this.size / 2, this.x + this.size / 2, this.y + this.size / 2); // 삼각형
                break;
        }
    }

    // 패턴을 변경하는 함수
    changePattern() {
        this.shapeType = int(random(0, 3)); // 도형 종류 변경
        this.color = getColorAt(this.x, this.y); // 색상 변경
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
