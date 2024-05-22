class AVLNode {
    constructor(key, value) {
        this.key = key;
        this.value = new Set();
        this.value.add(value);
        this.left = null;
        this.right = null;
        this.height = 1;
        this.phonetic = false;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    getHeight(node) {
        if (!node) return 0;
        return node.height;
    }

    updateHeight(node) {
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    getBalanceFactor(node) {
        if (!node) return 0;
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    rotateRight(y) {
        const x = y.left;
        const temp = x.right;

        x.right = y;
        y.left = temp;
        this.updateHeight(y);
        this.updateHeight(x);

        return x;
    }

    rotateLeft(x) {
        const y = x.right;
        const temp = y.left;

        y.left = x;
        x.right = temp;
        this.updateHeight(x);
        this.updateHeight(y);

        return y;
    }

    balance(node) {
        if (!node) return null;

        this.updateHeight(node);
        const balanceFactor = this.getBalanceFactor(node);

        if (balanceFactor > 1) {
            if (this.getBalanceFactor(node.left) >= 0) {
                return this.rotateRight(node);
            }
            else {
                node.left = this.rotateLeft(node.left);
                return this.rotateRight(node);
            }
        }
        else if (balanceFactor < -1) {
            if (this.getBalanceFactor(node.right) <= 0) {
                return this.rotateLeft(node);
            }
            else {
                node.right = this.rotateRight(node.right);
                return this.rotateLeft(node);
            }
        }

        return node;
    }

    insert(key, value) {
        this.root = this._insert(this.root, key, value);
    }

    _insert(node, key, value) {
        if (!node) return new AVLNode(key, value);

        if (key < node.key) {
            node.left = this._insert(node.left, key, value);
        } else if (key > node.key) {
            node.right = this._insert(node.right, key, value);
        } else {
            node.value.add(value);
            return node;
        }
        this.updateHeight(node);

        return this.balance(node);
    }

    search(key) {
        let output;
        if (this.contains(key)) {
            output = this._search(this.root, key).value;
            if (this.phonetic) output = new Set([...output].map(this.toPhonetic));
        } else {
            output = new Set().add("[No Brief Found]");
        }

        return output;
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

    contains(key) {
        return this._search(this.root, key) !== null;
    }

    toPhonetic(word) {
        if (typeof word !== 'string') {
            console.error('Input must be a string');
            return word;
        }
        const replacements = {
            "TPH": "N",
            "TP": "F",
            "KP": "X",
            "HR": "L",
            "TK": "D",
            "PW": "B",
            "EU": "I",
            "SR": "V",
            "TKPW": "G",
            "BG": "K",
            "PH": "M",
            "SKWR": "J",
            "KWR": "Y",
            "PL": "M",
            "PB": "N",
            "PBLG": "J",
            "KH": "CH",
            "BGS": "CTION",
            "GS": "TION",
            "FP": "CH",
            "RB": "SH",
            "FRB": "RV",
            "AOU": "UU",
            "AEU": "AI",
            "OEU": "OI",
            "AOE": "EE",
            "AOEU": "II"
        };

        let output = word;
        for (const [sequence, replacement] of Object.entries(replacements)) {
            const regex = new RegExp(sequence, 'g');
            output = output.replace(regex, replacement);
        }

        return output;
    }
}


module.exports = AVLTree;