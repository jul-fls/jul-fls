const fs = require('fs');
const axios = require('axios');

const README_TEMPLATE_PATH = './src/README_template.md';
const README_OUTPUT_PATH = './README.md';
const QUOTES_URL = 'https://raw.githubusercontent.com/mudroljub/programming-quotes-api/master/data/quotes.json';

const getQuote = async () => {
    const response = await axios.get(QUOTES_URL);
    const data = response.data;
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
};

const generateReadme = async () => {
    const quote = await getQuote();
    const readmeTemplate = fs.readFileSync(README_TEMPLATE_PATH, 'utf8');
    const readme = readmeTemplate
        .replace('${quote}', encodeURI(quote.en))
        .replace('${author}', encodeURI(quote.author));
    fs.writeFileSync(README_OUTPUT_PATH, readme);
};

generateReadme();
