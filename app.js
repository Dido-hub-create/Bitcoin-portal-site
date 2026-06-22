// Конфигурация на секциите
const sections = {
    home: `<h1>Добре дошли в Bitcoin Portal Bulgaria</h1><div id="price-widget" class="card"><h3>BTC Цена:</h3><p id="price-data">Зареждане...</p></div>`,
    education: `<h1>Обучение</h1><div class="card"><h3>Какво е Биткойн?</h3><p>Биткойн е децентрализирана дигитална валута...</p></div>`,
   dca: `<h1>DCA Калкулатор</h1>
      <div class="card">
        <input type="number" id="monthly" placeholder="Месечна инвестиция ($)" style="margin-bottom:10px;">
        <input type="number" id="months" placeholder="Брой месеци" style="margin-bottom:10px;">
        <input type="number" id="future-price" placeholder="Очаквана цена на BTC ($)" style="margin-bottom:10px;">
        <button onclick="calculateDCA()">Изчисли</button>
        <div id="dca-result" style="margin-top:15px;"></div>
      </div>`,
    blog: `<h1>Блог</h1><div class="card"><h3>Биткойн през 2026</h3><p>Скорошни новини...</p></div>`
};

function showSection(id) {
    document.getElementById('content').innerHTML = sections[id];
    if(id === 'home') fetchPrice();
}

async function fetchPrice() {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur');
        const data = await res.json();
        document.getElementById('price-data').innerHTML = `USD: $${data.bitcoin.usd} | EUR: €${data.bitcoin.eur}`;
    } catch(e) {
        document.getElementById('price-data').innerText = "Грешка при зареждане на цената.";
    }
}

function calculateDCA() {
    const monthly = document.getElementById('monthly').value;
    const months = document.getElementById('months').value;
    const total = monthly * months;
    document.getElementById('dca-result').innerHTML = `<p>Общо инвестирани: $${total}</p>`;
}

// Първоначално зареждане
showSection('home');
fetchBTCPrice(); 
setInterval(fetchBTCPrice, 60000); // обновяване
