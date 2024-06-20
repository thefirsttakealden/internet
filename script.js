let roses = 0;
let item1Quantity = 0;
let item2Quantity = 0;
let autoRosesPerSecond = 0;

document.getElementById('main').addEventListener('click', (event) => {
    addRose(event.clientX, event.clientY);
});

document.getElementById('collect-roses').addEventListener('click', () => {
    collectRoses();
});

document.querySelectorAll('.exchange-button').forEach((button, index) => {
    button.addEventListener('click', () => {
        const cost = parseInt(button.getAttribute('data-cost'));
        if (roses >= cost) {
            roses -= cost;
            document.getElementById('roses').innerText = roses;
            alert(`成功兌換物品 ${index + 1}`);
            if (index === 0) {
                item1Quantity++;
                document.getElementById('item1-quantity').innerText = item1Quantity;
            } else if (index === 1) {
                item2Quantity++;
                document.getElementById('item2-quantity').innerText = item2Quantity;
            }
        } else {
            alert('玫瑰數量不足');
        }
    });
});

setInterval(() => {
    roses += autoRosesPerSecond; // 增加每秒自動產生的玫瑰數量
    autoRosesPerSecond = item2Quantity * 2 + item1Quantity * 1;
    // 更新總玫瑰數量
    document.getElementById('roses').innerText = roses;
    // 更新每秒生成的玫瑰數量顯示
    document.getElementById('autoRosesPerSecond').innerText = autoRosesPerSecond;

}, 1000); // 每秒執行一次

function addRose(x, y) {
    const rose = document.createElement('div');
    rose.className = 'rose';

    // 計算玫瑰的精確位置
    const mainRect = document.getElementById('main').getBoundingClientRect();
    const offsetX = x - mainRect.left - 15; // 調整為圖片居中
    const offsetY = y - mainRect.top - 15;

    rose.style.left = `${offsetX}px`;
    rose.style.top = `${offsetY}px`;

    document.getElementById('main').appendChild(rose);
}

function collectRoses() {
    roses += document.getElementsByClassName('rose').length;
    document.getElementById('roses').innerText = roses;
    document.querySelectorAll('.rose').forEach(rose => {
        rose.remove();
    });
}
