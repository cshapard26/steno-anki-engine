const https = require('https');

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
                    { role: 'system', content: 'You are a helpful stenography chat bot.' },
                    { role: 'user', content: `Give me three different suggestions for stenography briefs for the word ${userWord}. They should follow all the rules of stenography and have the minimal number of strokes. Only include the briefs in your answer, and make sure they do not conflict with existing briefs.` },
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

                res.on('data', (chunk) => {
                    data += chunk;
                });

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

            req.on('error', (e) => {
                reject(e);
            });

            req.write(JSON.stringify(requestBody));
            req.end();
        });
    }
}

module.exports = GPTPrompter;