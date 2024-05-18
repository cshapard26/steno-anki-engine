#ifndef DICTIONARYPARSER_H
#define DICTIONARYPARSER_H

#include <string>
#include "AVLTree.h"

class DictionaryParser {
public:
    static void parseAndAddToTree(const std::string& filename, AVLTree& tree);
};

#endif