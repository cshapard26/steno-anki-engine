#include <iostream>
#include "classes/AVLTree.cpp"

int main() {
    AVLTree<int> tree;

    tree.insert(10);
    tree.insert(20);
    tree.insert(30);
    tree.insert(40);
    tree.insert(50);
    tree.insert(25);

    std::cout << "Preorder traversal of the constructed AVL tree is:\n";
    tree.preOrder();

    return 0;
}
