import { fetchCryptoData } from './api.js';
// ... далі код без змін
// Запуск логіки після завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});
// Асинхронна функція ініціалізації, яка нічого не повертає (void)
async function initApp() {
    // Типізуємо елемент DOM. Він може бути HTMLElement або null (якщо не знайдений)
    const container = document.getElementById('crypto-container');
    // Обов'язкова перевірка на null (Вимога 5)
    if (!container) {
        console.error('Критична помилка: Контейнер #crypto-container не знайдено в DOM');
        return;
    }
    try {
        // Отримуємо дані з нашого API-модуля
        const data = await fetchCryptoData();
        renderData(data, container);
    }
    catch (error) {
        // Обробка помилок та виведення повідомлення користувачу (Вимога 6)
        console.error(error);
        if (error instanceof Error) {
            container.innerHTML = `<p class="error">Не вдалося завантажити дані. Деталі: ${error.message}</p>`;
        }
        else {
            container.innerHTML = `<p class="error">Сталася невідома помилка при завантаженні даних.</p>`;
        }
    }
}
// Функція рендеру зі строгими типами параметрів
function renderData(coins, container) {
    container.innerHTML = ''; // Очищаємо статус "Завантаження..."
    coins.forEach((coin) => {
        const card = document.createElement('div');
        card.className = 'crypto-card';
        // Типізація локальних змінних
        const isPositive = coin.price_change_percentage_24h >= 0;
        const changeClass = isPositive ? 'positive' : 'negative';
        card.innerHTML = `
            <div class="coin-info">
                <img src="${coin.image}" alt="${coin.name}" class="coin-icon">
                <div class="coin-name">
                    <h2>${coin.name}</h2>
                    <span>${coin.symbol.toUpperCase()}</span>
                </div>
            </div>
            <div class="coin-price">
                <p class="price">$${coin.current_price.toLocaleString()}</p>
                <p class="change ${changeClass}">
                    ${coin.price_change_percentage_24h.toFixed(2)}%
                </p>
            </div>
        `;
        container.appendChild(card);
    });
}
