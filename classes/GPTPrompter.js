const https = require('https');
const { resolve } = require('path');
class GPTPrompter {
    constructor() {
        this.api = process.env.OPENAI_API_KEY;
        this.host = 'api.openai.com';
        this.endpoint = 'https://api.openai.com/v1/chat/completions';
    }

    async suggestBrief(userWord) {
        return new Promise((resolve, reject) => {
            const requestBody = {
                model: 'gpt-4-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: `Give me three different suggestions for stenography briefs for the word ${userWord}. They should follow all the phonetic rules of stenography and be made of only one stroke, if possible, but can be up to three. Check your work to make sure they do not conflict with any other briefs in a standard main.json dictionary and are spelled with correct Steno Order (STKPWHRAO*EUFRPBLGTSDZ). Only include the briefs in your answer, each seperated by a comma.` },
                ],
                max_tokens: 150,
                temperature: 0.3
            };

            const options = {
                hostname: this.host,
                path: this.endpoint,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.api}`
                }
            };

            const req = https.request(options, (res) => {
                let data = '';

                // A chunk of data has been received.
                res.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received.
                res.on('end', () => {
                    const response = JSON.parse(data);
                    let message;
                    try {
                        message = response.choices[0].message.content;
                    } catch {
                        console.log(response);
                        reject();
                    }
                    resolve(message);
                });
            });


            // Handle error
            req.on('error', (e) => {
                reject(e);
            });

            // Send the request with the requestData
            req.write(JSON.stringify(requestBody));
            req.end();

        });
    }
}

module.exports = GPTPrompter;