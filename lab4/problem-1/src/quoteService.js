// src/quoteService.js
const QUOTES_API_URL = 'https://api.quotable.io/random';

async function getQuote() {
  try {
    const response = await fetch(QUOTES_API_URL);
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error fetching quote:', error);
    return 'Error fetching quote';
  }
}

export { getQuote };
