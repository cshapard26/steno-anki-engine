#include "AVLTree.h"

// Constructor
template <typename T>
AVLTree<T>::AVLTree() : root(nullptr) {}

// Height Calculation
template <typename T>
int AVLTree<T>::height(Node* n) {
    return n ? n->height : 0;
}

// Balance Factor Calculation
template <typename T>
int AVLTree<T>::getBalance(Node* n) {
    return n ? height(n->left) - height(n->right) : 0;
}

// Right Rotation
template <typename T>
typename AVLTree<T>::Node* AVLTree<T>::rightRotate(Node* y) {
    Node* x = y->left;
    Node* T2 = x->right;

    x->right = y;
    y->left = T2;

    y->height = std::max(height(y->left), height(y->right)) + 1;
    x->height = std::max(height(x->left), height(x->right)) + 1;

    return x;
}

// Left Rotation
template <typename T>
typename AVLTree<T>::Node* AVLTree<T>::leftRotate(Node* x) {
    Node* y = x->right;
    Node* T2 = y->left;

    y->left = x;
    x->right = T2;

    x->height = std::max(height(x->left), height(x->right)) + 1;
    y->height = std::max(height(y->left), height(y->right)) + 1;

    return y;
}

// Insertion
template <typename T>
typename AVLTree<T>::Node* AVLTree<T>::insert(Node* node, T key) {
    if (!node)
        return new Node(key);

    if (key < node->key)
        node->left = insert(node->left, key);
    else if (key > node->key)
        node->right = insert(node->right, key);
    else
        return node;

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
template <typename T>
void AVLTree<T>::insert(T key) {
    root = insert(root, key);
}

// PreOrder Traversal
template <typename T>
void AVLTree<T>::preOrder(Node* root) {
    if (root) {
        std::cout << root->key << " ";
        preOrder(root->left);
        preOrder(root->right);
    }
}

// Public PreOrder Method
template <typename T>
void AVLTree<T>::preOrder() {
    preOrder(root);
}