const AVLTree = require('./classes/AVLTree');
const DictionaryParser = require('./classes/DictionaryParser');

const tree = new AVLTree();
DictionaryParser.parseAndAddToTree('./dictionaries/main.json', tree);

const args = process.argv.slice(2);

if (args.length <= 0) {
    console.log("Invalid arguments. Run 'node index.js help' for more information.");
} else if (args[0] === "help") {
    console.log("AnkiSteno Usage:");
    console.log(" ./ankisteno help                                displays this help page");
    console.log(" ./ankisteno lookup <word> [flags]               looks up word in a dictionary and prints results to terminal");
    console.log(" ./ankisteno create ankifile <word_list> [flags] creates a file formatted for Anki with each word in word_list looked up in a dictionary");
    console.log(" ./ankisteno create clippy2 <word_list> [flags]  creates a file formatted for Anki from the data in a clippy_2.org file");
    console.log(" ./ankisteno suggest <word> [flags]              uses OpenAI's GPT-4o to suggest briefs for a word (results may vary)");
    console.log("Flags:");
    console.log("             -d <dictionary>                     adds an additional dictionary to the search. default behavior is to only include main.json");
    console.log("             -l <word_list>                      adds an additional word_list to the search");
    console.log("             -p                                  uses phonetic results instead of standard ones (NAIM vs TPHAEUPL). warning: not all conflicts are accounted for (TPHR will map to FL, not NR)");
    console.log("             -r                                  reverses results to be BRIEF,WORD instead of WORD,BRIEF");
    console.log("             -i                                  makes word_list case insensitive (does not affect dictionaries)");
    console.log("\nFor further assistance, please email me at coopershapard@duck.com");
}

console.log(process.argv[2] + ": " + [...tree.find(process.argv[2])].join(", "));
