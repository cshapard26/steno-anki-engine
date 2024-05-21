const AVLTree = require('./classes/AVLTree');
const DictionaryParser = require('./classes/DictionaryParser');
const FlashcardMaker = require('./classes/FlashcardMaker');

const tree = new AVLTree();
DictionaryParser.parseAndAddToTree('./dictionaries/main.json', tree);

const args = process.argv.slice(2);

if (args.length <= 0) {
    console.log("Invalid arguments. Run 'node index.js help' for more information.");
    return;
} else if (args[0] != "help" && args[0] != "lookup" && args[0] != "create" && args[0] != "suggest") {
    console.log("Invalid arguments. Run 'node index.js help' for more information.");
    return;
} else if (args[0] === "help") {
    console.log("AnkiSteno Usage:");
    console.log("  node index.js help                                displays this help page");
    console.log("  node index.js lookup <word> [flags]               looks up word in a dictionary and prints results to terminal");
    console.log("  node index.js create ankifile <word_list> [flags] creates a file formatted for Anki with each word in word_list looked up in a dictionary");
    console.log("  node index.js create clippy2 <word_list> [flags]  creates a file formatted for Anki from the data in a clippy_2.org file. also includes the total number of misstrokes as an optional anki column");
    console.log("  node index.js suggest <word> [flags]              uses OpenAI's GPT-4o to suggest briefs for a word (results may vary)");
    console.log("Flags:");
    console.log("                -d <dictionary>                     adds an additional dictionary to the search. default behavior is to only include dictionaries/main.json (Plover's default dictionary)");
    console.log("                -l <word_list>                      adds an additional word_list to the search");
    console.log("                -p                                  uses phonetic results instead of standard ones (NAIM vs TPHAEUPL). warning: not all conflicts are accounted for (TPHR will map to FL, not NR, etc)");
    console.log("                -r                                  reverses results to be BRIEF,WORD instead of WORD,BRIEF");
    console.log("                -i                                  makes word_list case insensitive (does not affect dictionaries)");
    console.log("                -e <export_filename>                changes the default export filename of the outputs (default is outputs/ankifile.csv)");
    console.log("                -t <threshold>                      for the 'create clippy2' command. specifies the number of misstrokes needed to add the brief to the final list (default is 5)");
    console.log("\nFor further assistance, please email me at coopershapard@duck.com");
    return;
}

/*
const theWord = 'building';

console.log(theWord + ": " + [...DictionaryParser.trimResults(tree.search(theWord))].join(", "));
*/
const Flashcards = new FlashcardMaker();

Flashcards.makeFromClippy2("clippy_files/clippy_2.org", 5);

Flashcards.makeFromWordList("clippy_files/testList.txt", "dictionaries/main.json");