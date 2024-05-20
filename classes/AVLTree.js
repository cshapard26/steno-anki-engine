class AVLNode {
    constructor(key, value) {
        this.key = key;
        this.value = new Set();
        this.value.add(value);
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    // Helper function to get the height of a node
    getHeight(node) {
        if (!node) return 0;
        return node.height;
    }

    // Helper function to update the height of a node
    updateHeight(node) {
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    // Helper function to get the balance factor of a node
    getBalanceFactor(node) {
        if (!node) return 0;
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    // Helper function to perform a right rotation
    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        this.updateHeight(y);
        this.updateHeight(x);

        // Return new root
        return x;
    }

    // Helper function to perform a left rotation
    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        this.updateHeight(x);
        this.updateHeight(y);

        // Return new root
        return y;
    }

    // Helper function to balance the tree
    balance(node) {
        if (!node) return null;

        // Update height of the current node
        this.updateHeight(node);

        // Get the balance factor
        const balanceFactor = this.getBalanceFactor(node);

        // Left Heavy
        if (balanceFactor > 1) {
            // Left Left Case
            if (this.getBalanceFactor(node.left) >= 0) {
                return this.rotateRight(node);
            }
            // Left Right Case
            else {
                node.left = this.rotateLeft(node.left);
                return this.rotateRight(node);
            }
        }
        // Right Heavy
        else if (balanceFactor < -1) {
            // Right Right Case
            if (this.getBalanceFactor(node.right) <= 0) {
                return this.rotateLeft(node);
            }
            // Right Left Case
            else {
                node.right = this.rotateRight(node.right);
                return this.rotateLeft(node);
            }
        }

        // Node is already balanced
        return node;
    }

    // Insert a key-value pair into the AVL tree
    insert(key, value) {
        this.root = this._insert(this.root, key, value);
    }

    _insert(node, key, value) {
        // Perform standard BST insertion
        if (!node) return new AVLNode(key, value);

        if (key < node.key) {
            node.left = this._insert(node.left, key, value);
        } else if (key > node.key) {
            node.right = this._insert(node.right, key, value);
        } else {
            // Key already exists, add value to the set
            node.value.add(value);
            return node;
        }

        // Update height of this ancestor node
        this.updateHeight(node);

        // Balance this node
        return this.balance(node);
    }

    // Search for a key in the AVL tree
    search(key) {
        return this.contains(key) ? this._search(this.root, key).value : new Set();
    }

    _search(node, key) {
        if (!node) return null;

        if (key < node.key) {
            return this._search(node.left, key);
        } else if (key > node.key) {
            return this._search(node.right, key);
        } else {
            return node;
        }
    }

    // Test if a key exists in the AVL tree
    contains(key) {
        return this._search(this.root, key) !== null;
    }
}

module.exports = AVLTree;