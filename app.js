import https from 'https';  
import readline from 'readline';  
import chalk from 'chalk';  

const rl = readline.createInterface({  
    input: process.stdin,  
    output: process.stdout,  
});  

const apiKey = '1eeccfb59edc61c8c944107e';  
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;  

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const rates = JSON.parse(data).conversion_rates;

        rl.question('Enter the amount in USD: ', (amount) => {
            rl.question('Enter the target currency (e.g. eur, inr): ', (currency) => {
                const rate = rates[currency.toUpperCase()];
                if (rate) {
                    console.log(`${amount} USD is approximately ${convertCurrency(amount, rate)} ${currency.toUpperCase()}`);
                } else {
                    console.log(chalk.red('Invalid currency'));
                }
                rl.close();
            });
        });
    });
}).on('error', (err) => {
    console.error(chalk.red('Error fetching data:'), err.message);
});

function convertCurrency(amount, rate) {
    return (amount * rate).toFixed(2);
}