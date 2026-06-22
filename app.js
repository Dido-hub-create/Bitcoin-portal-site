const sections = {
    home: `<h1>Добре дошли в Bitcoin Portal Bulgaria</h1><div class="card"><h3>BTC Цена:</h3><p id="price-data">Зареждане...</p></div>`,
    education: `<h1>Обучение</h1><div class="card"><h3>Какво е Биткойн?</h3><p>Биткойн е децентрализирана дигитална валута...</p></div>`,
    dca: `<h1>DCA Калкулатор</h1>
          <div class="card">
            <input type="number" id="monthly" placeholder="Месечна инвестиция ($)">
            <input type="number" id="months" placeholder="Брой месеци">
            <input type="number" id="avg-price" placeholder="Средна покупна цена ($)">
            <input type="number" id="future-price" placeholder="Очаквана цена на BTC ($)">
            <button onclick="calculateDCA()">Изчисли</button>
            <div id="dca-result" style="margin-top:15px;"></div>
          </div>`,
    blog: `<h1>Блог</h1><div class="card"><h3>Биткойн през 2026</h3><p>Скорошни новини...</p></div>`
};

function showSection(id) {
    const content = document.getElementById('content');
    const tracker = document.getElementById('tracker-section');

    if(id === 'tracker') {
        content.style.display = 'none';
        tracker.style.display = 'block';
        setTimeout(() => tracker.classList.add('visible'), 50);
    } else {
        tracker.classList.remove('visible');
        tracker.style.display = 'none';
        content.style.display = 'block';
        content.innerHTML = sections[id];
        if(id === 'home') fetchPrice();
    }
}

async function fetchPrice() {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur');
        const data = await res.json();
        document.getElementById('price-data').innerHTML = `USD: $${data.bitcoin.usd} | EUR: €${data.bitcoin.eur}`;
    } catch(e) {
        document.getElementById('price-data').innerText = "Грешка при зареждане.";
    }
}

function calculateDCA() {
    const monthly = parseFloat(document.getElementById('monthly').value);
    const months = parseFloat(document.getElementById('months').value);
    const avgPurchasePrice = parseFloat(document.getElementById('avg-price').value);
    const futurePrice = parseFloat(document.getElementById('future-price').value);

    if (!monthly || !months || !avgPurchasePrice || !futurePrice) {
        document.getElementById('dca-result').innerHTML = "Попълни всички полета!";
        return;
    }

    const totalInvested = monthly * months;
    const btcAccumulated = totalInvested / avgPurchasePrice;
    const futureValue = btcAccumulated * futurePrice;
    const profit = futureValue - totalInvested;
    const roiPercent = ((profit / totalInvested) * 100).toFixed(2);

    document.getElementById('dca-result').innerHTML = `
        <p>Общо инвестирани: <b>$${totalInvested.toLocaleString()}</b></p>
        <p>Натрупани BTC: <b>${btcAccumulated.toFixed(6)}</b></p>
        <p>Прогнозна стойност: <b>$${futureValue.toLocaleString()}</b></p>
        <p>Печалба: <b style="color: ${profit >= 0 ? '#22c55e' : '#ef4444'}">$${profit.toLocaleString()}</b> 
           (<span style="color: ${profit >= 0 ? '#22c55e' : '#ef4444'}">${profit >= 0 ? '+' : ''}${roiPercent}%</span>)</p>
    `;
}

showSection('home');
fetchPrice();
setInterval(fetchPrice, 60000);
