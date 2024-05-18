#ifndef AVLTREE_H
#define AVLTREE_H

#include <iostream>

template <typename T>
class AVLTree {
private:
    struct Node {
        T key;
        Node* left;
        Node* right;
        int height;
        Node(T k) : key(k), left(nullptr), right(nullptr), height(1) {}
    };

    Node* root;

    int height(Node* n);
    int getBalance(Node* n);
    Node* rightRotate(Node* y);
    Node* leftRotate(Node* x);
    Node* insert(Node* node, T key);
    void preOrder(Node* root);

public:
    AVLTree();
    void insert(T key);
    void preOrder();
};

#endif
