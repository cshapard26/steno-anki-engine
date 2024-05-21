const fs = require('fs');
const { AVLTree } = require('./AVLTree');

class DictionaryParser {
    static parseAndAddToTree(filename, tree) {
        try {
            const data = fs.readFileSync(filename, 'utf8');
            const jsonData = JSON.parse(data);

            Object.keys(jsonData).forEach(key => {
                const value = jsonData[key];
                tree.insert(value, key);
            });
        } catch (err) {
            console.error(`${err}`);
        }
    }

    static trimResults(wordSet) {
        if (wordSet.size <= 1) return wordSet;
        let outputSet = new Set();
        let min = 10;

        wordSet.forEach(word => {
            if (word.split('/').length - 1 < min) {
                min = word.split('/').length - 1;
                outputSet = new Set();
                outputSet.add(word);
            } else if (word.split('/').length - 1 === min) {
                outputSet.add(word);
            }
        });
        if (outputSet.size > 1) {
            let newSet = new Set();
            outputSet.forEach(word => {
                if (word.split('-').length === 1) newSet.add(word);
            });
            outputSet.forEach(word => {
                if (word.split('*').length !== 1) newSet.delete(word);
            });
            if (newSet.size >= 1) {
                return newSet;
            }
        }
        return outputSet;
    }
}

module.exports = DictionaryParser;
