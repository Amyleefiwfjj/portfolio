// 5개 클래스 이름 (SimCLR 프로젝트에서 썼던 거 그대로)
const classNames = ['Basophil', 'Eosinophil', 'Lymphocyte', 'Monocyte', 'Neutrophil'];

const models = {
    supervised: {
        name: 'Supervised',
        epochs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        trainLoss: [1.2, 0.9, 0.7, 0.5, 0.38, 0.30, 0.25, 0.22, 0.20, 0.18],
        valAcc: [0.65, 0.72, 0.80, 0.86, 0.90, 0.92, 0.94, 0.95, 0.95, 0.96],
        // 최종 confusion matrix 예시 (row: 실제, col: 예측)
        confusion: [
            [48, 1, 0, 1, 0],  // 실제 Basophil
            [0, 45, 2, 1, 2],  // 실제 Eosinophil
            [0, 1, 97, 1, 1],  // 실제 Lymphocyte
            [0, 0, 3, 45, 2],  // 실제 Monocyte
            [0, 0, 1, 2, 97],  // 실제 Neutrophil
        ]
    },
    simclr: {
        name: 'SimCLR + Linear probe',
        epochs: [1, 2, 3, 4, 5],
        trainLoss: [0.9590, 0.9126, 0.8857, 0.8639, 0.8525],
        valAcc: [0.50, 0.58, 0.63, 0.68, 0.70],
        confusion: [
            [40, 5, 3, 1, 1],
            [2, 38, 5, 2, 3],
            [1, 4, 85, 5, 5],
            [0, 2, 6, 38, 4],
            [0, 1, 4, 5, 80],
        ]
    }
};
