const AVLTree = require('./classes/AVLTree');
const DictionaryParser = require('./classes/DictionaryParser');
const FlashcardMaker = require('./classes/FlashcardMaker');
const GPTPrompter = require('./classes/GPTPrompter');

const tree = new AVLTree();
const flashcards = new FlashcardMaker(tree);
const GPTPrompt = new GPTPrompter();
DictionaryParser.parseAndAddToTree('./dictionaries/main.json', tree);

const args = process.argv.slice(2);
let threshold = 5;
const wordList = [];

if (args.length <= 0) {
    console.log("Invalid arguments. Run 'node index.js help' for more information.");
} else if (args[0] != "help" && args[0] != "lookup" && args[0] != "create" && args[0] != "suggest") {
    console.log("Invalid arguments. Run 'node index.js help' for more information.");
} else if (args[0] === "help") {
    console.log("AnkiSteno Usage:");
    console.log("  node index.js help                                displays this help page");
    console.log("  node index.js lookup <word> [flags]               looks up word in a dictionary and prints the best results to the terminal");
    console.log("  node index.js create ankifile <word_list> [flags] creates a file formatted for Anki with each word in word_list looked up in a dictionary");
    console.log("  node index.js create clippy2 <word_list> [flags]  creates a file formatted for Anki from the data in a clippy_2.org file. also includes the total number of misstrokes as an optional anki column");
    console.log("  node index.js suggest <word> [flags]              uses OpenAI's GPT-4o to suggest briefs for a word (results may vary)");
    console.log("Flags:");
    console.log("                -d <dictionary>                     adds an additional dictionary to the search. default behavior is to only include dictionaries/main.json (Plover's default dictionary)");
    console.log("                -l <word_list>                      adds an additional word_list to the search");
    console.log("                -p                                  uses phonetic results instead of standard ones (NAIM vs TPHAEUPL). warning: not all conflicts are accounted for (TPHR will map to FL, not NR, etc)");
    console.log("                -r                                  reverses results to be BRIEF,WORD instead of WORD,BRIEF. does not affect clippy2's outputs");
    console.log("                -i                                  makes word_list case insensitive (does not affect dictionaries)");
    console.log("                -e <export_filename>                changes the default export filename of the outputs (default is outputs/ankifile.csv or outputs/clippy2-anki.csv)");
    console.log("                -t <threshold>                      for the 'create clippy2' command. specifies the number of misstrokes needed to add the brief to the final list (default is 5)");
    console.log("\nFor further assistance, please email me at coopershapard@duck.com");
    return;
} else if (args.length <= 1) {
    console.log("Invalid arguments. Run 'node index.js help' for more information.");
} else if (args[0] === "lookup") {
    if (!addFlags(2)) return false;
    console.log(args[1] + ": " + [...DictionaryParser.trimResults(tree.search(args[1]))].join(", "));
} else if (args[0] === "suggest") {
    if (!addFlags(2)) return false;
    GPTPrompt.suggestBrief(args[1])
        .then(response => {
            console.log(`GPT-4 Suggested Briefs for "${args[1]}": ${response}`);
        })
        .catch(error => {
            console.error('Error:', error);
        });
} else if (args.length <= 2) {
    console.log("Invalid arguments. Run 'node index.js help' for more information.");
} else if (args[0] === "create" && args[1] === "ankifile") {
    if (!addFlags(3)) return false;
    wordList.push(args[2]);
    flashcards.makeFromWordList(wordList);
} else if (args[0] === "create" && args[1] === "clippy2") {
    if (!addFlags(3)) return false;
    flashcards.makeFromClippy2(args[2], threshold);
} else {
    console.log("Invalid arguments. Run 'node index.js help' for more information.");
}

return;

function addFlags(start) {
    for (let i = start; i < args.length; i++) {
        if (args[i].startsWith("-")) {
            if (args[i] === "-d") {
                if (args.length >= i + 2) {
                    i++;
                    DictionaryParser.parseAndAddToTree(args[i], tree);
                } else {
                    console.log("Invalid arguments. Run 'node index.js help' for more information.");
                    return false;
                }
            } else if (args[i] === "-l") {
                if (args.length >= i + 2) {
                    i++;
                    wordList.push(args[i]);
                } else {
                    console.log("Invalid arguments. Run 'node index.js help' for more information.");
                    return false;
                }
            } else if (args[i] === "-p") {
                tree.phonetic = true;
            } else if (args[i] === "-r") {
                flashcards.reversed = true;
            } else if (args[i] === "-i") {
                flashcards.caseInsensitive = true;
            } else if (args[i] === "-e") {
                if (args.length >= i + 2) {
                    i++;
                    flashcards.ankiOutputFileName = args[i];
                    flashcards.clippyOutputFileName = args[i];
                } else {
                    console.log("Invalid arguments. Run 'node index.js help' for more information.");
                    return false;
                }
            } else if (args[i] === "-t") {
                if (args.length >= i + 2) {
                    i++;
                    if (!Number.isInteger(+args[i])) {
                        console.log("Invalid arguments. Run 'node index.js help' for more information.");
                        return false;
                    }
                    threshold = args[i];
                } else {
                    console.log("Invalid arguments. Run 'node index.js help' for more information.");
                    return false;
                }
            } else {
                console.log("Invalid arguments. Run 'node index.js help' for more information.");
                return false;
            }
        } else {
            console.log("Invalid arguments. Run 'node index.js help' for more information.");
            return false;
        }
    }
    return true;
}