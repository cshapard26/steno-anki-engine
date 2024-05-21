const fs = require('fs');
const AVLTree = require('./AVLTree');
const DictionaryParser = require('./DictionaryParser');


class FlashcardMaker {
    constructor() {
        this.tree = new AVLTree();
        this.ankiOutputFileName = "outputs/ankifile.csv";
        this.clippyOutputFileName = "outputs/clippy2-anki.csv";
    }

    makeFromWordList(wordList, dictionary) {
        DictionaryParser.parseAndAddToTree(dictionary, this.tree);

        const linesSet = new Set();
        const data = fs.readFileSync(wordList, 'utf-8');
        const lines = data.split('\n');
        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine) {
                linesSet.add(trimmedLine);
            }
        });
        fs.writeFileSync(this.ankiOutputFileName, '');

        linesSet.forEach(word => {
            fs.writeFileSync(this.ankiOutputFileName, `${word},${[...DictionaryParser.trimResults(this.tree.search(word))].join(",")}\n`, { encoding: 'utf-8', flag: 'a' });
        });

    }

    makeFromClippy2(importFileName, occurrenceThreshold = 5) {
        let data;
        try {
            data = fs.readFileSync(importFileName, 'utf-8');
        } catch (err) {
            throw new Error("Error opening file. Make sure the file name is spelled correctly.");
        }

        const briefCollection = {};
        const lines = data.split('\n');

        lines.forEach(line => {
            if (!line.startsWith('-')) {
                const parts = line.split("4m");
                if (parts.length > 1) {
                    let word = parts[1].split("")[0].trim().toLowerCase();
                    let brief = parts[1].split("6m")[1].split("\x1b")[0];
                    if (brief.includes(',')) {
                        brief = brief.split(",")[0];
                    }
                    if (!word.endsWith("0m")) {
                        const pair = `${word},${brief}`;
                        if (!briefCollection[pair]) {
                            briefCollection[pair] = 0;
                        }
                        briefCollection[pair]++;
                    }
                }
            }
        });

        // Sort the dictionary by occurrence
        const sortedBriefs = Object.entries(briefCollection)
            .filter(([pair, count]) => count >= occurrenceThreshold)
            .sort((a, b) => b[1] - a[1]);

        const outputData = sortedBriefs.map(([pair, count]) => pair + ',' + count).join('\n');
        fs.writeFileSync(this.clippyOutputFileName, outputData, 'utf-8');
    }
}

module.exports = FlashcardMaker;