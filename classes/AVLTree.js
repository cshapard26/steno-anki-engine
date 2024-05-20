class AVLTree {
    constructor() {
        this.root = null;
    }

    height(node) {
        return node ? node.height : 0;
    }

    getBalance(node) {
        return node ? this.height(node.left) - this.height(node.right) : 0;
    }

    rightRotate(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;

        return x;
    }

    leftRotate(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;

        return y;
    }

    insert(node, key, value) {
        if (!node)
            return new Node(key, value);

        if (key < node.key)
            node.left = this.insert(node.left, key, value);
        else if (key > node.key)
            node.right = this.insert(node.right, key, value);
        else {
            node.value.add(value);
            return node;
        }

        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));

        const balance = this.getBalance(node);

        if (balance > 1 && key < node.left.key)
            return this.rightRotate(node);

        if (balance < -1 && key > node.right.key)
            return this.leftRotate(node);

        if (balance > 1 && key > node.left.key) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        if (balance < -1 && key < node.right.key) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }

    insert(key, value) {
        this.root = this.insert(this.root, key, value);
    }

    find(node, key) {
        if (!node || node.key === key)
            return node;

        if (key < node.key)
            return this.find(node.left, key);
        else
            return this.find(node.right, key);
    }

    find(key) {
        const result = this.find(this.root, key);
        if (result)
            return result.value;
        else
            return new Set();
    }

    preOrder(root) {
        if (root) {
            console.log(root.key + ": " + [...root.value].join(" "));
            this.preOrder(root.left);
            this.preOrder(root.right);
        }
    }

    preOrder() {
        this.preOrder(this.root);
    }
}

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = new Set();
        this.left = null;
        this.right = null;
        this.height = 1;
        this.value.add(value);
    }
}

module.exports = AVLTree;
