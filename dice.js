// dice.js

document.getElementById('rollButton').addEventListener('click', rollDice);

function rollDice() {
    let diceCount = document.getElementById('diceCount').value;
    let diceContainer = document.getElementById('diceContainer');
    let resultText = document.getElementById('result');
    
    // 清空之前的結果
    diceContainer.innerHTML = '';
    resultText.textContent = "骰子滾動中...";

    // 創建對應數量的 img 元素
    for (let i = 0; i < diceCount; i++) {
        let img = document.createElement('img');
        img.className = 'diceImage';
        diceContainer.appendChild(img);
    }

    let rollCount = 10; // 動畫滾動次數
    let currentRoll = 0;

    let interval = setInterval(() => {
        // 為每個骰子更新隨機圖片
        let diceImages = document.querySelectorAll('.diceImage');
        diceImages.forEach(img => {
            let randomRoll = Math.floor(Math.random() * 6) + 1;
            img.src = `image/dice${randomRoll}.png`;
        });

        currentRoll++;
        if (currentRoll >= rollCount) {
            clearInterval(interval);

            // 最終結果
            let finalResults = [];
            diceImages.forEach(img => {
                let finalResult = Math.floor(Math.random() * 6) + 1;
                img.src = `image/dice${finalResult}.png`;
                finalResults.push(finalResult);
            });

            // 將結果排序
            finalResults.sort((a, b) => a - b);

            // 清空並重新添加按排序結果的圖片
            diceContainer.innerHTML = '';
            finalResults.forEach(result => {
                let img = document.createElement('img');
                img.className = 'diceImage';
                img.src = `image/dice${result}.png`;
                diceContainer.appendChild(img);
            });

            resultText.textContent = `你擲出了: ${finalResults.join(', ')}`;
        }
    }, 100); // 每 100 毫秒更新一次圖片
}
