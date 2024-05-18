#include <iostream>
#include "classes/AVLTree.h"

int main() {
    AVLTree tree;

    tree.insert("apple", "fruit");
    tree.insert("banana", "fruit");
    tree.insert("carrot", "vegetable");
    tree.insert("apple", "tech company");
    tree.insert("carrot", "color");

    std::cout << "Preorder traversal of the constructed AVL tree is:\n";
    tree.preOrder();

    std::cout << "\nSearching for 'apple': ";
    std::set<std::string> values = tree.find("apple");
    if (!values.empty()) {
        for (const auto& val : values) {
            std::cout << val << " ";
        }
    } else {
        std::cout << "Not Found";
    }
    std::cout << std::endl;

    std::cout << "Searching for 'carrot': ";
    values = tree.find("carrot");
    if (!values.empty()) {
        for (const auto& val : values) {
            std::cout << val << " ";
        }
    } else {
        std::cout << "Not Found";
    }
    std::cout << std::endl;

    std::cout << "Searching for 'banana': ";
    values = tree.find("banana");
    if (!values.empty()) {
        for (const auto& val : values) {
            std::cout << val << " ";
        }
    } else {
        std::cout << "Not Found";
    }
    std::cout << std::endl;

    std::cout << "Searching for 'orange': ";
    values = tree.find("orange");
    if (!values.empty()) {
        for (const auto& val : values) {
            std::cout << val << " ";
        }
    } else {
        std::cout << "Not Found";
    }
    std::cout << std::endl;

    return 0;
}
