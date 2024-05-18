#include <iostream>
#include "classes/AVLTree.h"
#include "classes/DictionaryParser.h"
#include <chrono>

int main(int argc, char** argv) {
    // Create an AVL tree
    AVLTree tree;

    // Parse the JSON file and add terms to the AVL tree
    DictionaryParser::parseAndAddToTree("../dictionaries/main.json", tree);

    // Perform operations with the AVL tree
    // For example, print the tree's preorder traversal
    auto start = std::chrono::high_resolution_clock::now();
    for (auto& i : tree.find(argv[1])) std::cout << argv[1] << ": " << i << "\n";
    auto end = std::chrono::high_resolution_clock::now();
    std::cout << "Time = " << std::chrono::duration_cast<std::chrono::microseconds>(end - start).count() << " us\n";
    

    return 0;
}
