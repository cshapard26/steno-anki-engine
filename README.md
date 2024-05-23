# Steno Anki Engine
## What is it?
[Clippy2](https://github.com/Josiah-tan/plover_clippy_2) is a community add-on for Open Steno Project's [stenography](https://en.wikipedia.org/wiki/Stenotype) software [Plover](https://github.com/openstenoproject/plover). The add-on locally tracks a user's keystrokes and creates a datalog any time the user executes a suboptimal brief (a word on the stenotpye).

[Anki](https://github.com/ankitects/anki) is a popular spaced repition flashcard app that algorithmically burns terms into the user's memory, which is a must have for any student learning stenography.

This steno-anki-engine is a lightweight Node.js script that:
1. Parses clippy_2.org files and extracts the important information from among the loads of extraneous data.
2. Allows quick look-up in any steno dictionary and thins results down to the best briefs (based on stroke number and disambiguifiers).
3. Creates a word-brief map file specifically formatted for Anki from a large list of undefined words.
4. Allows for the addition of custom dictionaries for any lookup or word list.
5. Phoneticizes briefs for more advanced learners.
6. Leverages a custon, fine-tuned AI from OpenAI's [gpt-3.5-turbo-0125](https://platform.openai.com/docs/models/gpt-3-5-turbo) to accurately suggest briefs for words not found in a steno dictionary.

## Usage Instructions
### Downloading and Running
- Make sure to have Node.js installed. You can find official instructions on how to download it [here](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs).
- Create a copy of this repo or download it as a zip file. You can find official instructions on how to do that [here](https://docs.github.com/en/get-started/start-your-journey/downloading-files-from-github). 
- In your terminal, cd into the repo.
- Run `node index.js help` for a comprehensive list of all the avaliable commands. Important ones include:
  - `node index.js create ankifile <word_list>` which creates defines all words in a file and formats it for export to Anki
  - `node index.js create clippy2 <clippy_2.org file location>` which extracts the most common mistrokes from a clippy_2.org file and formats them for Anki
  - `node index.js suggest <word>` which uses AI to suggest a brief for the given word

### Setting up OpenAI API Requests
 Due to the nature of GitHub, I am unable to share my own API key. Thus, if you wish to use the `suggest` feature, then you must provide your own. To do so, you must first create an API key from OpenAI (you must add a minimun of $5.00 to your account for this step). You can find official instructions on how to get your token [here](https://platform.openai.com/api-keys). Then, either provide your token to the terminal as an environment variable named `OPENAI_API_KEY`, or in the `classes/GPTPrompter.js` file, replace `process.env.OPENAI_API_KEY` with your API key. If all goes correctly, you should now be able to run the `node index.js suggest <word` command.

### Example Commands

`node index.js create ankifile examples/data_set/example_file.txt -p -r -i`
- Creates a file formatted for Anki from the word list at `examples/data_set/example_file.txt` and puts the results in the default `outputs/ankifile.csv`
- Gives phonetic results (N instead of TPH, etc) with the `-p` flag
- Reverses the result order (BRIEFS,WORD instead of WORD,BRIEFS) in the output file with the `-r` flag
- Searches with case insensitivity (searches for "canopy" not "Canopy" in the example) with the `-i` flag

`node index.js create clippy2 examples/data_set/clippy_2.org -d dictionaries/user.json -e newName.csv -t 50`
- Creates a file formatted for Anki from the clippy_2 data at `examples/data_set/clippy_2.org`
- Searches the default `main.json` as well as a custom `user.json` for briefs with the `-d` flag
- Overrides the default export filename (`clippy2-anki.csv`) and puts the results in the custom `newName.csv` file with the `-e` flag
- Sets the clippy_2 output threshold to 50 (instead of the default 5) with the `-t` flag, which means that only errors that occured more than 50 times will show up in the final file

`node index.js suggest watermelon`
- Sends a request to GPT-3.5 asking for 3 possible briefs for the word `watermelon`. Results may vary. Multiple atttempts may yield better results.
- Example output: `GPT suggested briefs for "watermelon": WAURL, WA*URPL, WA*EPL`
