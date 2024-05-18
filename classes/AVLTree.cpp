#include "AVLTree.h"

// Constructor
AVLTree::AVLTree() : root(nullptr) {}

// Height Calculation
int AVLTree::height(Node* n) {
    return n ? n->height : 0;
}

// Balance Factor Calculation
int AVLTree::getBalance(Node* n) {
    return n ? height(n->left) - height(n->right) : 0;
}

// Right Rotation
AVLTree::Node* AVLTree::rightRotate(Node* y) {
    Node* x = y->left;
    Node* T2 = x->right;

    x->right = y;
    y->left = T2;

    y->height = std::max(height(y->left), height(y->right)) + 1;
    x->height = std::max(height(x->left), height(x->right)) + 1;

    return x;
}

// Left Rotation
AVLTree::Node* AVLTree::leftRotate(Node* x) {
    Node* y = x->right;
    Node* T2 = y->left;

    y->left = x;
    x->right = T2;

    x->height = std::max(height(x->left), height(x->right)) + 1;
    y->height = std::max(height(y->left), height(y->right)) + 1;

    return y;
}

// Insertion
AVLTree::Node* AVLTree::insert(Node* node, std::string key, std::string value) {
    if (!node)
        return new Node(key, value);

    if (key < node->key)
        node->left = insert(node->left, key, value);
    else if (key > node->key)
        node->right = insert(node->right, key, value);
    else {
        node->value.insert(value);
        return node;
    }

    node->height = 1 + std::max(height(node->left), height(node->right));

    int balance = getBalance(node);

    if (balance > 1 && key < node->left->key)
        return rightRotate(node);

    if (balance < -1 && key > node->right->key)
        return leftRotate(node);

    if (balance > 1 && key > node->left->key) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }

    if (balance < -1 && key < node->right->key) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    return node;
}

// Public Insert Method
void AVLTree::insert(std::string key, std::string value) {
    root = insert(root, key, value);
}

// Private Find Method
AVLTree::Node* AVLTree::find(Node* node, std::string key) {
    if (!node || node->key == key)
        return node;

    if (key < node->key)
        return find(node->left, key);
    else
        return find(node->right, key);
}

// Public Find Method
std::set<std::string> AVLTree::find(std::string key) {
    Node* result = find(root, key);
    if (result)
        return result->value;
    else
        return std::set<std::string>();
}

// PreOrder Traversal
void AVLTree::preOrder(Node* root) {
    if (root) {
        std::cout << root->key << ": ";
        for (const auto& val : root->value) {
            std::cout << val << " ";
        }
        std::cout << std::endl;
        preOrder(root->left);
        preOrder(root->right);
    }
}

// Public PreOrder Method
void AVLTree::preOrder() {
    preOrder(root);
}
