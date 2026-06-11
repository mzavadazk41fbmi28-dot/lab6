const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false';
// Функція повертає Promise, який у разі успіху містить масив монет
export async function fetchCryptoData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Помилка сервера: HTTP ${response.status}`);
        }
        // Вказуємо, що розпарсений JSON відповідає нашому масиву інтерфейсів
        const data = await response.json();
        return data;
    }
    catch (error) {
        // Прокидаємо помилку далі, щоб її обробив основний модуль
        throw new Error(`Помилка з'єднання з API: ${error}`);
    }
}
//# sourceMappingURL=api.js.map