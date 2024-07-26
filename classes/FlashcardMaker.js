const fs = require('fs');
const DictionaryParser = require('./DictionaryParser');


class FlashcardMaker {
    constructor(tree) {
        this.tree = tree;
        this.ankiOutputFileName = "outputs/ankifile.csv";
        this.clippyOutputFileName = "outputs/clippy2-anki.csv";
        this.reversed = false;
        this.caseInsensitive = false;
        this.hideNaN = false;
    }

    makeFromWordList(wordList) {
        fs.writeFileSync(this.ankiOutputFileName, '');

        const linesSet = new Set();

        wordList.forEach(file => {
            let data;
            try {
                data = fs.readFileSync(file, 'utf-8');
            } catch {
                console.error(`Error opening file "${file}". Ignoring.`);
                return;
            }
            const lines = data.split('\n');
            lines.forEach(line => {
                const trimmedLine = line.trim();
                if (trimmedLine) {
                    if (!this.caseInsensitive) {
                        linesSet.add(trimmedLine);
                    } else {
                        linesSet.add(trimmedLine.toLowerCase());
                    }
                }
            });
        });

        linesSet.forEach(word => {
            const briefList = [...DictionaryParser.trimResults(this.tree.search(word))]
            if (this.hideNaN && (briefList[0] == "[No Brief Found]")) {
                // Skip
            } else {
                if (this.reversed) {
                    fs.writeFileSync(this.ankiOutputFileName, `"${briefList.join(", ")}",${word}\n`, { encoding: 'utf-8', flag: 'a' });
                } else {
                    fs.writeFileSync(this.ankiOutputFileName, `${word},"${briefList.join(", ")}"\n`, { encoding: 'utf-8', flag: 'a' });
                }
            }
        });
    }

    makeFromClippy2(importFileName, occurrenceThreshold) {
        let data;
        try {
            data = fs.readFileSync(importFileName, 'utf-8');
        } catch (err) {
            throw new Error(`Error opening file "${importFileName}". Make sure the file name is spelled correctly.`);
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
                        let pair;
                        if (this.reversed) {
                            pair = `${brief},${word}`;
                        } else {
                            pair = `${word},${brief}`;
                        }

                        if (!briefCollection[pair]) {
                            briefCollection[pair] = 0;
                        }
                        briefCollection[pair]++;
                    }
                }
            }
        });

        const sortedBriefs = Object.entries(briefCollection)
            .filter(([pair, count]) => count >= occurrenceThreshold)
            .sort((a, b) => b[1] - a[1]);

        fs.writeFileSync(this.clippyOutputFileName, sortedBriefs.map(([pair, count]) => pair + ',' + count).join('\n'), 'utf-8');
    }
}

module.exports = FlashcardMaker;