def main():
    exportFileName = "ploverNotes.txt"
    importFileName = "clippy_2.org"

    # This is the number of times a brief must be typed incorrectly to be turned into an Anki card
    occuranceThreshold = 5 
    
    ## Open up the specified import file. Quit the program if there is an error.
    try:
        dataFile = open(importFileName)
    except:
        raise Exception("Error opening file. Make sure the file name is spelled correctly and is in the current working directory.")
        quit()

    # File opened successfully. Read each line and parse the data, adding to the dictionary as necessary   
    briefCollection = {}
    for brief in dataFile:
        # Remove all Start and End lines
        if not brief.startswith('-'):
            parts = brief.split("4m")
            # Slice out the secotion with the word, remove excess spacing, and convert it to lowercase
            word = parts[1].split("")[0].strip().lower()
            # Slice out the secotion with the brief
            brief = parts[1].split("6m")[1].split("\x1b")[0]
            # Only accept the shortest brief
            if ',' in brief:
                brief = brief.split(",")[0]
            # Test for edge cases, then add the word-brief pair to a dictionary
            if not word.endswith("0m"):
                pair = word + "," + brief
                if pair not in briefCollection:
                    briefCollection[pair] = 0
                briefCollection[pair] += 1
    # Turn the dictionary into a list of tuples that contains the word-brief pair as well as the number of occurnaces
    # Then sort the list in descending order
    briefCollection = sorted(briefCollection.items(), key=lambda x: x[1], reverse=True)
    dataFile.close()

    # Open up the specified export file, or ask the user to overwrite it if it already exists.
    try: 
        returnFile = open(exportFileName, "x")
    except:
        overwrite = input(f"\"{exportFileName}\" exists and may contain previous testing data.\n    Enter \"y\" to overwrite the file.\n    Enter \"n\" to quit the program.\n")
        if overwrite == ("y" or " y" or "y "):
            try:
                returnFile = open(exportFileName, "w")
            except:
                print("Something went wrong when overwriting the file. Quitting the program.")
                quit()
        else:
            quit()
    
    # Add all the pairs to the export file in a standard format
    # Only add if it occurs at least 2 times, disregarding fringe results
    for key in briefCollection:
        if key[1] > occuranceThreshold:
            returnFile.write(key[0] + "\n")

    returnFile.close()

# Program execution
main()
