//01.01 如果用2的26次方的数字（或者26位数字）也一样可以解决问题。
/**
 * @param {string} astr
 * @return {boolean}
 */
var isUnique = function(astr) {
    let backArray = new Array(26).fill(false);
    for (let index = 0; index < astr.length; index++) {
        let char = astr[index].charCodeAt() - '97'
        if(backArray[char]) {
            return false
        } else {
            backArray[char] = true
        }
    }
    return true
};

//01.02. 判定是否互为字符重排 数组记录
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var CheckPermutation = function(s1, s2) {
    let backArray = new Array(26).fill(0);
    for (let index = 0; index < s1.length; index++) {
        let char = s1[index].charCodeAt() - '97'
        backArray[char] = backArray[char] +1
    }
    for (let index = 0; index < s2.length; index++) {
        let char = s2[index].charCodeAt() - '97'
        if(backArray[char] == 0) {
            return false;
        }
        backArray[char] = backArray[char] - 1
    }
    for (let index = 0; index < backArray.length; index++) {
        if(backArray[index] != 0) {return false}
    }
    return true
};
 
// 面试题 01.03. URL化 基本逻辑
/**
 * @param {string} S
 * @param {number} length
 * @return {string}
 */
var replaceSpaces = function(S, length) {
    let result = '';
    for (let index = 0; index < length; index++) {
        result += S[index] == ' ' ?  '%20' : S[index]
    }  
    return result
};

// 面试题 01.04. 回文排列 map记录
/**
 * @param {string} s
 * @return {boolean}
 */
var canPermutePalindrome = function(s) {
    let backMap = new Map();
    let single = 0
    for (let index = 0; index < s.length; index++) {
        let key = s[index]
        backMap.set(key,(backMap.get(key) || 0)+1)
    }
    let isFirst = false;
    for(let item of backMap) {
        if(item[1]%2  == 1) {
            if(!isFirst) {
                isFirst = true
            } else {
                return false
            }
        }
    }
    return true

};
// 01.05. 一次编辑 逻辑题
/**
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
var oneEditAway = function(first, second) {
    let fNum = first.length ,sNum = second.length;
    if(fNum < sNum) {
        return oneEditAway(second,first)
    }
    if(fNum - sNum >= 2) {
        return false
    }
    let isSame = true
    if(fNum -sNum == 1) {
        isSame = false
    }
    let isDif = false,i = 0 ,j =0
    while(i < fNum,j<sNum) {
        if(first[i] != second[j]) {
            if(isDif) {return false}
            isDif =  true
            if(isSame) {
                i++
                j++
            } else {
                i++
            }
        } else {
            i++
            j++
        }
    }

    return true
};
// 面试题 01.06. 字符串压缩 基础逻辑题
/**
 * @param {string} S
 * @return {string}
 */
var compressString = function(S) {
    if(S.length == 0) { return ''}
    let back = S[0],num =1,result =''
    for (let index = 1; index < S.length; index++) {
        let char = S[index]
        if(char  == back) {
            num++
        } else {
            result = result + back + num.toString()
            back = char 
            num = 1
        }
    }
    result = result + back + num.toString()
    return result.length >= S.length ? S : result
};
// 面试题 01.07. 旋转矩阵 先对称变换  再反转
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    let size = matrix.length
    for (let i = 1; i < size; i++) {        
        let back = []
        for(j = 0;j <i;j++) {
            let swap = matrix[i][j];
            matrix[i][j] = matrix[j][i]
            matrix[j][i] = swap
        }
    }
    for(let i = 0; i< Math.floor(size/2);i++) {
        for(j = 0;j< size ;j++) {
            let swap = matrix[j][i];
            matrix[j][i] = matrix[j][size - i - 1];
            matrix[j][size - i - 1] = swap;
        }
    }
};

// 面试题 01.08. 零矩阵  map记录要替换的行列 统一替换
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    if(matrix.length == 0) {
        return
    }
    if(matrix[0].length == 0) {
        return
    }
    let iBack = new Map()
    let jBack = new Map()
    for (let i = 0; i < matrix.length; i++) {        
        for(j = 0;j <matrix[i].length;j++) {
            if(matrix[i][j] == 0) {
                iBack.set(i,1)
                jBack.set(j,1)
            } 
        }
    }
    for(let i = 0;i < matrix.length; i++) {
        if(iBack.get(i) != null) {
            for(j = 0;j <matrix[i].length;j++) {
                matrix[i][j] = 0
            }
        }
    }
    for(let j = 0;j < matrix[0].length; j++) {
        if(jBack.get(j) != null) {
            for(i = 0;i <matrix.length;i++) {
                matrix[i][j] = 0
            }
        }
    }
};

// 面试题 01.09. 字符串轮转 基础题 双倍子串
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isFlipedString = function(s1, s2) {
    return s1.length == s2.length &&  (s1+s1).indexOf(s2) != -1;
};

// 面试题 02.01. 移除重复节点 map记录

function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeDuplicateNodes = function(head) {
    if(!head) {return head}
    let backup = new Map()
    backup.set(head.val,true)
    let next = head;
    while(next.next) {
        if(backup.get(next.next.val)) {
            next.next = next.next.next
        } else {
            backup.set(next.next.val,true)
            next = next.next
        }
    }
    return head;
};

// 面试题 02.02. 返回倒数第 k 个节点 快慢指针
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {number}
 */
var kthToLast = function(head, k) {
    let fast = head;
    let slow = head;
    while(k > 0) {
        fast = fast.next
        k--
    }
    while(fast) {
        fast = fast.next
        slow = slow.next
    }
    return slow.val
};

// 面试题 02.03. 删除中间节点 把该节点设置为下个节点 剔除下个节点
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    node.val = node.next.val
    node.next =  node.next.next
};

// 面试题 02.04. 分割链表  双指针合并
/** 
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    let last = new ListNode(0)
    let first = new ListNode(0)
    first.next =head
    let next = first
    let next2 = last
    while(next.next) {
        if(next.next.val < x) {
            next = next.next
        } else {
            next2.next =  next.next
            next2 = next2.next
            next.next = next.next.next
            next2.next = null
        }
    }
    next.next = last.next
    return first.next;
};

// 面试题 02.05. 链表求和 遍历
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    
    let head = new ListNode(0);
    let next1 = l1
    let next2 = l2
    let next3 = head;
    let back = 0
    while(next1 || next2 || back > 0) {

        let sum = (next1 ? next1.val : 0) + (next2 ? next2.val : 0) + back;
        next3.next = new ListNode(sum%10)
        back = Math.floor(sum/10)
        next1 = next1 ? next1.next : null
        next2 = next2 ? next2.next : null
        next3 = next3.next;
    }
    return head.next;
};

// 面试题 02.06. 回文链表 堆栈
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    let fast = head,slow = head,backup = []
    while(fast && fast.next) {
        backup.push(slow.val)
        slow = slow.next
        fast = fast.next.next
    }
    if(fast) { slow = slow.next} 
    while(slow) {
        let num =  backup.pop()
        if(num != slow.val) {return false} 
        slow = slow.next
    }
    return true
};

// 面试题 02.07. 链表相交 双指针

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let a1 = headA
    let a2 = headB 
    while(a1 != a2) {
        if(a1) {
            a1 = a1.next
        } else {
            a1 = headB
        }
        if(a2) {
            a2 = a2.next
        } else {
            a2 = headA
        }
    }
    return a1
};

// 面试题 02.08. 环路检测 快慢指针
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    if(!head || !head.next) { return null}
    let fast = head.next.next;
    let slow = head.next;
    while(fast != slow && fast && fast.next) {
        fast = fast.next.next
        slow = slow.next
    }
    if(slow == fast) {
        slow = head
        while(slow != fast) {
            slow = slow.next
            fast = fast.next
        }
        return slow
    }
    return null
};
// 面试题 03.01. 三合一   一个数组分成三个堆栈

/**
 * @param {number} stackSize
 */
var TripleInOne = function(stackSize) {
    this.top = [0,0,0]
    this.data = new Array(3*stackSize)
    this.stackSize = stackSize
};

/** 
 * @param {number} stackNum 
 * @param {number} value
 * @return {void}
 */
TripleInOne.prototype.push = function(stackNum, value) {
    let num = this.top[stackNum]
    if(num < this.stackSize) {
        this.data[this.stackSize*stackNum + num] = value
        this.top[stackNum] =  num +1
    }
};

/** 
 * @param {number} stackNum
 * @return {number}
 */
TripleInOne.prototype.pop = function(stackNum) {
    let num = this.top[stackNum]
    if(num <= 0) {
        return -1
    } else {
        this.top[stackNum] =  num -1
        return this.data[this.stackSize*stackNum + num-1]
    }
};

/** 
 * @param {number} stackNum
 * @return {number}
 */
TripleInOne.prototype.peek = function(stackNum) {
    let num = this.top[stackNum]
    if(num <= 0) {
        return -1
    } else {
        return this.data[this.stackSize*stackNum + num-1]
    }

};

/** 
 * @param {number} stackNum
 * @return {boolean}
 */
TripleInOne.prototype.isEmpty = function(stackNum) {
    return this.top[stackNum]==0;
};

/**
 * Your TripleInOne object will be instantiated and called as such:
 * var obj = new TripleInOne(stackSize)
 * obj.push(stackNum,value)
 * var param_2 = obj.pop(stackNum)
 * var param_3 = obj.peek(stackNum)
 * var param_4 = obj.isEmpty(stackNum)
 */

 // 面试题 03.02. 栈的最小值 辅助栈
 /**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.data = []
    this.minDate = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.data.push(x);
    if(this.minDate.length == 0 || this.minDate[this.minDate.length -1]  >= x) {
        this.minDate.push(x);
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    let x = this.data.pop()
    if(this.minDate[this.minDate.length -1]  == x) {
        this.minDate.pop()
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return  this.data.length > 0 ? this.data[this.data.length -1] : null
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return  this.minDate.length > 0 ? this.minDate[this.minDate.length -1] : null
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

// 面试题 03.03. 堆盘子 基础逻辑判断 注意特殊情况
/**
 * @param {number} cap
 */
var StackOfPlates = function(cap) {
    this.stacks = []
    this.maxNum = cap 
};

/** 
 * @param {number} val
 * @return {void}
 */
StackOfPlates.prototype.push = function(val) {
    if(this.maxNum <= 0) {return}
    let length = this.stacks.length
    if(length == 0) {
        this.stacks = [[val]]
    } else {
        let son = this.stacks[length -1] 
        if(son.length == this.maxNum) {
            this.stacks.push([val])
        } else {
            son.push(val)
        }
    }
}; 

/**
 * @return {number}
 */
StackOfPlates.prototype.pop = function() {
    if(this.maxNum <= 0) {return -1}
    let length = this.stacks.length
    if(length > 0) {
        let son = this.stacks[length -1] 
        let value = son.pop()
        if(son.length == 0) {
            this.stacks.pop()
        }
        return value
    }
    return -1
};

/** 
 * @param {number} index
 * @return {number}
 */
StackOfPlates.prototype.popAt = function(index) {
    if(this.maxNum <= 0) {return -1}
    let length = this.stacks.length
    if(index < length) {
        let son = this.stacks[index]
        let value = son.pop()
        if(son.length == 0) {
            this.stacks.splice(index,1)
        }
        return value
    }
    return -1
};

/**
 * Your StackOfPlates object will be instantiated and called as such:
 * var obj = new StackOfPlates(cap)
 * obj.push(val)
 * var param_2 = obj.pop()
 * var param_3 = obj.popAt(index)
 */
// 面试题 03.04. 化栈为队 两个栈来回倒腾 我这里用了数组
/**
 * Initialize your data structure here.
 */
var MyQueue = function() {
    this.data = []
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.data.push(x)
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if(this.data.length > 0) {
        let value = this.data[0]
        this.data.splice(0,1)
        return value

    } else {
        return null
    }
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    return this.data.length == 0 ?  null : this.data[0]
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.data.length == 0 
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

 // 面试题 03.05. 栈排序
 var SortedStack = function() {
     this.data = []
};

/** 
 * @param {number} val
 * @return {void}
 */
SortedStack.prototype.push = function(val) {
    let sData = [];
    while(this.data.length > 0 && this.data[this.data.length -1] < val) {
        sData.push(this.data.pop())
    }
    this.data.push(val);
    while(sData.length > 0) {
        this.data.push(sData.pop())
    }
};

/**
 * @return {void}
 */
SortedStack.prototype.pop = function() {
    if(this.data.length > 0) {
        this.data.pop()
    }
};

/**
 * @return {number}
 */
SortedStack.prototype.peek = function() {
    let length  = this.data.length
    return length == 0 ?  -1 : this.data[length -1]
};

/**
 * @return {boolean}
 */
SortedStack.prototype.isEmpty = function() {
    return this.data.length == 0 
};

/**
 * Your SortedStack object will be instantiated and called as such:
 * var obj = new SortedStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.isEmpty()
 */

 // 面试题 03.06. 动物收容所 有编号 双栈
 var AnimalShelf = function() {
     this.cat = []
     this.dog = []
};

/** 
 * @param {number[]} animal
 * @return {void}
 */
AnimalShelf.prototype.enqueue = function(animal) {
    if(animal[1] == 0) {
        this.cat.push(animal[0])
    } else {
        this.dog.push(animal[0])
    }
};

/**
 * @return {number[]}
 */
AnimalShelf.prototype.dequeueAny = function() {
    if(this.dog.length > 0 && this.cat.length > 0) {
        if(this.dog[0] >this.cat[0]) {
            return this.dequeueCat()
        } else {
            return this.dequeueDog()
        }
    }
    if(this.dog.length > 0) {
        return this.dequeueDog()
    } 
    if(this.cat.length > 0) {
        return this.dequeueCat()
    } 
    return [-1,-1]
};

/**
 * @return {number[]}
 */
AnimalShelf.prototype.dequeueDog = function() {
    if(this.dog.length > 0) {
        let num = this.dog[0];
        this.dog.splice(0,1)
        return [num,1]
    }
    return [-1,-1]
};

/**
 * @return {number[]}
 */
AnimalShelf.prototype.dequeueCat = function() {
    if(this.cat.length > 0) {
        let num = this.cat[0];
        this.cat.splice(0,1)
        return [num,0]
    }
    return [-1,-1]
};

// 面试题 04.01. 节点间通路  有向的 深度遍历待优化
/**
 * @param {number} n
 * @param {number[][]} graph
 * @param {number} start
 * @param {number} target
 * @return {boolean}
 */
var findWhetherExistsPath = function(n, graph, start, target) {
    let backup = []
    for (let index = 0; index < n; index++) {
        backup.push([])
    }
    for (let item of  graph) {
        backup[item[0]].push(item[1]);
    }
    let isDo = new Array(n).fill(false);
    let doNum  = [start];
    while(doNum.length > 0) {
        let checkNum = doNum.pop();
        isDo[start] = true;
        for(let num of backup[checkNum]) {
            if(num == target) {
                return true
            } 
            if(!isDo[num]) {
                doNum.push(num)
            }
        }
    }
    return false
};


// 面试题 04.02. 最小高度树  递归
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    let num = nums.length;
    if(num == 0) { return null}
    let mid = Math.floor(num/2);
    let root = new TreeNode(nums[mid]);
    root.left = sortedArrayToBST(nums.slice(0,mid));
    root.right = sortedArrayToBST(nums.slice(mid+1));
    return root;
};

// 面试题 04.03. 特定深度节点链表 二叉树层序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {TreeNode} tree
 * @return {ListNode[]}
 */
var listOfDepth = function(tree) {
    let result = [];
    if(!tree) {return result};
    let backup = [tree]
    while(backup.length > 0) {
        let head = new TreeNode(0),next = head,newBackup = []
        for(let node of backup) {
            next.next = new ListNode(node.val)
            next = next.next
            if(node.left) {newBackup.push(node.left)}
            if(node.right) {newBackup.push(node.right)}
        }
        backup = newBackup
        result.push(head.next)
    }
    return result
};

// 面试题 04.04. 检查平衡性  递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    let isBalanced = true
    getDeep(root)
    return isBalanced
    function getDeep(node) {
        if(!isBalanced || !node) {
            return 0
        }
        let leftDeep = getDeep(node.left)
        let rightDeep = getDeep(node.right)
        if(Math.abs(leftDeep-rightDeep)>1){
            isBalanced = false;
        }
        return Math.max(leftDeep,rightDeep)+1;
    }
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

// 面试题 04.05. 合法二叉搜索树  非递归二叉树的中序遍历
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    let backup = []
    let pre = -Number.MAX_VALUE
    let next = root
    while(next != null) {
        backup.push(next);
        next = next.left
    }
    while(backup.length > 0) {
        let node  = backup.pop()
        if(node.val <= pre) {
            return false
        }
        pre = node.val
        let r = node.right 
        while(r != null) {
            backup.push(r);
            r = r.left
        }
    }
    return true
};

// 面试题 04.06. 后继者 非递归二叉树的中序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function(root, p) {
    let backup = []
    let pre = false
    let next = root
    while(next != null) {
        backup.push(next);
        next = next.left
    }
    while(backup.length > 0) {
        let node  = backup.pop()
        if(pre) {
            return node
        }
        if(node == p) {
            pre = true
        }
        let r = node.right 
        while(r != null) {
            backup.push(r);
            r = r.left
        }
    }
    return null
};

//  面试题 04.08. 首个共同祖先  递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if(!root) { return null}
    if(root == p || root == q) {
        return root
    }
    let left = lowestCommonAncestor(root.left,p,q)
    let right = lowestCommonAncestor(root.right,p,q)
    if(left && right) {
        return root
    }
    return left ? left : right;
};

// 面试题 04.10. 检查子树 递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {boolean}
 */
var checkSubTree = function(t1, t2) {
    if(t1 == null) {return t2 == null}
    return isSame(t1,t2) || checkSubTree(t1.left,t2) || checkSubTree(t1.right,t2)

    function isSame(t1,t2) {
        if(t1 == null && t2 == null) { return true}
        if(t1 == null || t2 == null) { return false}
        return t1.val == t2.val && isSame(t1.left,t2.left) && isSame(t1.right,t2.right)
    }
};