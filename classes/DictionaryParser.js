const fs = require('fs');
const { AVLTree } = require('./AVLTree');

class DictionaryParser {
    static parseAndAddToTree(filename, tree) {
        try {
            const data = fs.readFileSync(filename, 'utf8');
            const jsonData = JSON.parse(data);

            Object.keys(jsonData).forEach(key => {
                const value = jsonData[key];
                tree.insert(key, value);
            });
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    }
}

module.exports = DictionaryParser;
