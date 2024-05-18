#ifndef AVLTREE_H
#define AVLTREE_H

#include <iostream>
#include <string>
#include <set>

class AVLTree {
private:
    struct Node {
        std::string key;
        std::set<std::string> value;
        Node* left;
        Node* right;
        int height;
        Node(std::string k, std::string v) : key(k), left(nullptr), right(nullptr), height(1) {value.insert(v);}
    };

    Node* root;

    int height(Node* n);
    int getBalance(Node* n);
    Node* rightRotate(Node* y);
    Node* leftRotate(Node* x);
    Node* insert(Node* node, std::string key, std::string value);
    Node* find(Node* node, std::string key);
    void preOrder(Node* root);

public:
    AVLTree();
    void insert(std::string key, std::string value);
    std::set<std::string> find(std::string key);
    void preOrder();
};

#endif
