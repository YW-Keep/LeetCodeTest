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

// 面试题 04.12. 求和路径
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
var pathSum = function(root, sum) {
    let result = 0
    solve(root,sum)
    return result
    function solve(root,sum) {
        if(root == null) {return }
        dfs(root,sum)
        solve(root.left,sum)
        solve(root.right,sum)
    }
    function dfs(root,target) {
        if(root == null) {return}
        let newNum = target - root.val
        if (newNum == 0) {
            result++
        }
        dfs(root.left,newNum)
        dfs(root.right,newNum)

    }
};

// 面试题 05.01. 插入
var insertBits = function(N, M, i, j) {
    for(let k =i; k<=j;k++) {
        if(N & (1<<k)) {
            N -= 1<<k
        }
    }
    N +=M<<i
    return N
};

// 面试题 05.02. 二进制数转字符串  基础逻辑题   需要了解小数二进制转化
/**
 * @param {number} num
 * @return {string}
 */
var printBin = function(num) {
    let result = '0.'
    for (let i = 0; i < 30; i++) {
        num = num*2
        if(num>=1) {
            result += '1'
            num -= 1 
        } else {
            result += '0'
        }
        if(num == 0) {
            return result
        }
    }
    return "ERROR"
};
// 面试题 05.03. 翻转数位 动态规划
/**
 * @param {number} num
 * @return {number}
 */
var reverseBits = function(num) {
    let nChange = 0,change  = 0,max = 0
    while(num != 0) {
        if(num & 1 > 0) {
            nChange += 1
            change += 1
        } else {
            change = nChange + 1
            nChange = 0
        }
        max = Math.max(max,change)
        num = num >> 1
    }
    max = Math.max(max,nChange +1)
    return max
};

// 面试题 05.04. 下一个数 找第一个01 与10
/**
 * @param {number} num
 * @return {number[]}
 */
var findClosedNumbers = function(num) {
    let numStr = ('0' + num.toString(2)).split(''),max = -1, min = -1
    let length = numStr.length,count = 0
    for (let i = 1; i < length; i++) {
        if(numStr[length -i] == '1' && numStr[length -i - 1] == '0') {
            let maxAr = numStr.concat()
            maxAr[length -i -1] = '1'
            maxAr[length -i] = '0'
            count = i - count - 1
            for (let index = i -1; index > 0; index--) {
                maxAr[length -index] = count > 0 ?  '0' : '1'
                count--;
            }
            max = Number.parseInt(maxAr.join(''),2)
            break;
        } 
        if(numStr[length -i] == '1') {
            count++
        }
    }
    count = 0
    for (let i = 1; i < length; i++) {
        if(numStr[length -i] == '0' && numStr[length -i - 1] == '1') {
            let minAr = numStr.concat()
            minAr[length -i -1] = '0'
            minAr[length -i] = '1'
            for (let index = i -1; index > 0; index--) {
                minAr[length -index] = count > 0 ?  '1' : '0'
                count--;
            }
            min = Number.parseInt(minAr.join(''),2)
            break;
        } 
        if(numStr[length -i] == '1') {
            count++
        }
    }
    return [max,min]
};
findClosedNumbers(23)

// 面试题 05.06. 整数转换  先异或 找出不同的位置 在通过 num&(num -1)去掉最右边的一个1 这样统计不同位置数 
/**
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
var convertInteger = function(A, B) {
    let  num =  A ^ B
    let result = 0
    while (num != 0) {
        num &= (num -1) 
        result++
    }
    return result;
};

// 面试题 05.07. 配对交换 基本位运算
/**
 * @param {number} num
 * @return {number}
 */
var exchangeBits = function(num) {
    return (num<<1 & 0xAAAAAAAA) | (num>>1 & 0x55555555);
};

// 面试题 05.08. 绘制直线  基本位运算
var drawLine = function(length, w, x1, x2, y) {
    let result = Array(length).fill(0)
    for (let i = x1; i <= x2; i++) {
        result[Math.floor((y*w + i)/32)] |= (1<<(31-i%32))      
    }
    return result;
};

// 面试题 08.01. 三步问题  动态规划
/**
 * @param {number} n
 * @return {number}
 */
var waysToStep = function(n) {
    let num1  = 1, num2 = 2, num3 = 4
    if(n <3) {
        return n == 2 ? 2 : 1
    }
    n = n -3;
    while(n > 0) {
        let newNum = (num1 + num2 + num3)%1000000007 
        num1 = num2
        num2 = num3
        num3 = newNum
        n--
    }
    return num3;

};

// 面试题 08.02. 迷路的机器人 回朔算法 需要做记录不然超时
/**
 * @param {number[][]} obstacleGrid
 * @return {number[][]}
 */
var pathWithObstacles = function(obstacleGrid) {
    if(obstacleGrid.length == 0){return}
    let result = [],backup = [],m = obstacleGrid.length,n = obstacleGrid[0].length
    for (let i = 0; i < m; i++) {
        backup.push(new Array(n).fill(false))
    }
    dfs(0,0)
    return result
    function dfs(i,j) {
        if(i >= m || j >= n || backup[i][j] || obstacleGrid[i][j] == '1') {
            return false
        }
        result.push([i,j])
        if(i == m - 1 && j == n - 1) {
            return true
        }
        backup[i][j] = true;
        if(dfs(i+1,j) || dfs(i,j+1)) {
            return true
        }
        result.pop()
        return false
    } 
}
// 面试题 08.03 魔术索引 这里用了取巧的方法，也可以用二分法做
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMagicIndex = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        if(nums[i] == i) {
            return i
        } else if(nums[i] > i) {
            i = nums[i] - 1
        }
    }
    return -1
};

// 面试题 08.04. 幂集 在上次的基础上 加数，再加上上次
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    let result = [[]]
    for (let num of  nums) {
        let newRult = []
        for (let i = 0; i < result.length; i++) {
            newRult.push(result[i].concat())
            newRult[i].push(num)
        }
        result = result.concat(newRult)
    }
    return result;
};

// 面试题 08.05. 递归乘法  位运算
/**
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
var multiply = function(A, B) {
    if(B > A) { return multiply(B,A)}
    if(B == 1) {return A}
    if(B == 0)  { return 0}
    if(B & 1 == 1) {
        return multiply(A<<1,B>>1) + A
    } else {
        return  multiply(A<<1,B>>1)
    }
};

// 面试题 08.06. 汉诺塔问题  经典递归问题
/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @return {void} Do not return anything, modify C in-place instead.
 */
var hanota = function(A, B, C) {
    move(A.length,A,B,C)
    console.log('xxx');
    function move(n,a,b,c) {
        if(n == 1) {
            c.push(a.pop())
            return
        }
        move(n-1,a,c,b)
        c.push(a.pop())
        move(n-1,b,a,c)
    }
};
 
// 面试题 08.07	无重复字符串的排列组合  深度遍历递归
/**
 * @param {string} S
 * @return {string[]}
 */
var permutation = function(S) {
    let result = []
    dfs(S,'')
    return result;
    function dfs(lastS,node) {
        if(lastS.length == 0) {
            result.push(node)
            return
        } 
        for (let index = 0; index < lastS.length; index++) {
            dfs(lastS.substring(0,index) + lastS.substring(index+1),node + lastS[index])
        }
    }

};

// 面试题 08.08. 有重复字符串的排列组合  深度遍历递归 去重
/**
 * @param {string} S
 * @return {string[]}
 */
var permutation = function(S) {
    let result = []
    let newS = S.split('').sort(function(a,b){return b.localeCompare(a)}).join('')
    dfs(newS,'')
    return result;
    function dfs(lastS,node) {
        if(lastS.length == 0) {
            result.push(node)
            return
        } 
        for (let index = 0; index < lastS.length; index++) {
            if(index + 1 < lastS.length && lastS[index] == lastS[index+1]) { continue}
            dfs(lastS.substring(0,index) + lastS.substring(index+1),node + lastS[index])
        }
    }
};

// 面试题 08.09. 括号 递归
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let result = []
    dfs(n,n,'')
    return result;
    function dfs(i,j,ans) {
        if(i == 0 && j == 0) {
            result.push(ans)
            return
        } 
        if(i > 0) {
            dfs(i-1,j,ans +'(')
        } 
        if(i <j && j > 0) {
            dfs(i,j-1,ans +')')
        }
    }
};

// 面试题 08.10. 颜色填充 递归
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, newColor) {
    let oldColor = image[sr][sc]
    let maxi = image.length
    let maxj = image[0].length
    if(oldColor != newColor) {
        dfs(sr,sc)
    }
    return image;

    function dfs(i,j) {
        if(i >=0 && i<maxi && j >=0 && j<maxj &&image[i][j] == oldColor) {
            image[i][j] = newColor
            dfs(i+1,j)
            dfs(i-1,j)
            dfs(i,j+1)
            dfs(i,j-1)
        }
    }
};

// 面试题 08.11. 硬币 动态规划
/**
 * @param {number} n
 * @return {number}
 */
var waysToChange = function(n) {
    let coins = [1,5,10,25]
    let dp = Array(n+1).fill(1);
    for (let i = 1; i < 4; i++) {
        for (let j = 5; j <= n; j++) {
            if(j >= coins[i]) {
                dp[j] = (dp[j] + dp[j -coins[i]])%1000000007
            }
        }
    }
    return dp[n]
};
// 面试题 08.12. 八皇后   回朔算法
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    let bp1 = new Map(), bp2 =  new Map() ,bp3 = new Map()
    let str = Array(n).fill('.')
    let result = [],ts = []
    dfs(0)
    return result
    function dfs(plies) {
        if(plies == n) {
            result.push(ts.concat())
            return 
        }
        for (let index = 0; index < n; index++) {
            // 说明可以占据
            if(!(bp1.get(index) || bp2.get(plies + index) || bp3.get(n-1 -index + plies))) {
                bp1.set(index,1)
                bp2.set(plies + index,1)
                bp3.set(n-1 -index + plies,1)
                str[index] = 'Q'
                ts.push(str.join(''))
                str[index] = '.'
                dfs(plies+1)
                ts.pop()
                bp1.delete(index)
                bp2.delete(plies + index)
                bp3.delete(n-1 -index + plies)
            } 
        }
    }
};

// 面试题 08.13. 堆箱子 动态规划，当前的最大值就是 上一个能承受这个人的最大值加当前值
/**
 * @param {number[][]} box
 * @return {number}
 */
var pileBox = function(box) {
    if(box.length == 0) {return 0}
    box.sort((a,b) => {
        return a[0] == b[0] ? (a[1] == b[1] ? b[2] -a[2] : b[1] - a[1] ) : (a[0] - b[0])
    })
    let bp = new Array(box.length).fill(0), res = 0
    bp[0] = box[0][2]
    res = box[0][2]
    for (let i = 1; i < box.length; i++) {
        let max = 0,base_depth = box[i][1],base_height = box[i][2]
        for( let j = 0;j<i ;j++) {
            if(base_depth> box[j][1] && base_height > box[j][2]) {
                max = Math.max(max,bp[j])
            }
            bp[i] = max + base_height
            res = Math.max(res,bp[i])
        }
    }
    return res;
};
// 面试题 10.01. 合并排序的数组  倒序存入
/**
 * @param {number[]} A
 * @param {number} m
 * @param {number[]} B
 * @param {number} n
 * @return {void} Do not return anything, modify A in-place instead.
 */
var merge = function(A, m, B, n) {
    let  i = m -1, j = n -1
    for (let index = A.length -1; index >= 0; index--) {
        if(i < 0) {
            A[index] = B[j]
            j--
        } else if(j < 0) {
            break
        } else {
            if(A[i] > B[j]) {
                A[index] = A[i]
                i--
            } else {
                A[index] = B[j]
                j--;
            }
        }
    }
};
// 面试题 10.02. 变位词组 主要是要找合适的key 降低算法复杂度
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let bp = new Map()
    for (let index = 0; index < strs.length; index++) {
        let str  = strs[index]
        let key = str.split('').sort(function(a,b){return b.localeCompare(a)}).join('')
        if(bp.get(key)) {
            bp.get(key).push(str)
        } else {
            bp.set(key,[str])
        }
    }
    let result = []
    for (let item of bp) {
        result.push(item[1])      
    }
    return result;
};

// 面试题 10.03. 搜索旋转数组  二分法
/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var search = function(arr, target) {
    let left  = 0, right = arr.length;
    while(left < right) {
        let mid = Math.floor((left + right)/2)
        if(arr[left] < arr[mid]) {
            if(arr[left] <= target && target <= arr[mid]) {
                right = mid
            } else {
                left = mid +1;
            }
        } else if(arr[left] > arr[mid]) {
            if (arr[left] <= target || target <= arr[mid]) {
                right = mid
            } else {
                left = mid +1;
            }
        } else {
            if(arr[left] == target) {
                right = left
            } else {
                left++
            }
        }
    }
    return  arr[left] == target ? left : -1
};

// 面试题 10.05. 稀疏数组搜索 二分查找法
/**
 * @param {string[]} words
 * @param {string} s
 * @return {number}
 */
var findString = function(words, s) {
    let left = 0,right = words.length
    while(left < right) {
        let mid = Math.floor((right + left)/2)
        while(words[mid] == '' && mid < right) {
            mid++
        }
        if(mid == right) {
            right = Math.floor((right + left)/2)
            continue
        }
        if(words[mid] == s) {
            return mid
        } else if(words[mid] > s) {
            right = mid
        } else {
            left = mid +1
        }
    }
    return -1
};
// 面试题 10.09. 排序矩阵查找 中位数移动
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    let m = matrix.length;
    if(m == 0){return false}
    let n = matrix[0].length;
    let i = 0,j = n -1;
    while(i < m && j > -1) {
        if(matrix[i][j] > target) {
            j--
        } else if(matrix[i][j] < target) {
            i++
        } else {
            return true
        }
    }
    return false
};

// 面试题 17.08. 马戏团人塔  首先排序，然后 最长上升子序列解题方法
/**
 * @param {number[]} height
 * @param {number[]} weight
 * @return {number}
 */
var bestSeqAtIndex = function(height, weight) {
    let bp = []
    for (let i = 0; i < height.length; i++) {
        bp.push([height[i],weight[i]])
    }
    bp.sort((a,b) => { 
        if(a[0] == b[0]) {
            return b[1] - a[1]
        } else {
            return a[0] - b[0]
        }
    })
    let backup = [bp[0][1]]
    for (let index = 1; index < bp.length; index++) {
        let num =  bp[index][1]
        if(num > backup[backup.length -1]) {
            backup.push(num)
        } else if (num < backup[0]) {
            backup[0] = num
        } else {
            var left = 0 ,right = backup.length;
            while(left < right) {
                let mid = Math.floor((left + right)/2);
                if(num > backup[mid]) {
                    left = mid +1;
                } else {
                    right =mid;
                }
            }
            backup[left] = num;
        }
    }
    return backup.length;
};
// 面试题 17.10. 主要元素 摩尔投票
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let count = 0, bp = 0
    for(let num of nums) {
        if(count == 0) {
            bp = num
            count++
        } else {
            if(bp == num) {
                count++
            } else {
                count--
            }
        }
    }
     count = 0
    for (let num of nums) {
        if(bp == num) {
            count++
        } 
    }

    return count > nums.length/2 ? bp : -1
};

// 面试题 10.11. 峰与谷 错位交换  一次遍历 直接跟前位判断交换
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var wiggleSort = function(nums) {
    if(nums.length < 3) {
        return 
    }
    for (let i = 1; i < nums.length; i++) {
        let parity =  i%2 == 1
        if(parity && nums[i] > nums[i -1] || !parity && nums[i] < nums[i-1]) {
            let pb = nums[i-1]
            nums[i-1] = nums[i];
            nums[i] = pb
        }
    }
};
//  面试题 16.01. 交换数字 相加再减
/**
 * @param {number[]} numbers
 * @return {number[]}
 */
var swapNumbers = function(numbers) {
    numbers[1] = numbers[1] + numbers[0]
    numbers[0] = numbers[1] - numbers[0]
    numbers[1] = numbers[1] - numbers[0] 
    return numbers
};

// 面试题 10.10. 数字流的秩  二分查找加速
var StreamRank = function() {
    this.bp = []   
};

/** 
 * @param {number} x
 * @return {void}
 */
StreamRank.prototype.track = function(x) {
    let start = 0, end = this.bp.length
    while(start < end) {
        let mid = Math.floor((start + end)/2)
        if(this.bp[mid] == x) {
            start = mid
            end = mid
        } else if (this.bp[mid] < x) {
            start = mid + 1
        } else {
            end = mid
        }
    } 
    this.bp.splice(start,0,x)
};

/** 
 * @param {number} x
 * @return {number}
 */
StreamRank.prototype.getRankOfNumber = function(x) {
    let start = 0, end = this.bp.length
    while(start < end) {
        let mid = Math.floor((start + end)/2)
        if(this.bp[mid] <= x) {
            start = mid + 1 
        } else {
            end = mid
        }
    }
    return start
};

/**
 * Your StreamRank object will be instantiated and called as such:
 * var obj = new StreamRank()
 * obj.track(x)
 * var param_2 = obj.getRankOfNumber(x)
 */

 // 面试题 16.02. 单词频率 map记录
/**
 * @param {string[]} book
 */
var WordsFrequency = function(book) {
    this.bp = new Map()
    for(let item of book) {
        this.bp.set(item,(this.bp.get(item) || 0)+1)
    }
};

/** 
 * @param {string} word
 * @return {number}
 */
WordsFrequency.prototype.get = function(word) {
    return this.bp.get(word) || 0
};

/**
 * Your WordsFrequency object will be instantiated and called as such:
 * var obj = new WordsFrequency(book)
 * var param_1 = obj.get(word)
 */

 // 面试题 16.04. 井字游戏 穷举
 /**
 * @param {string[]} board
 * @return {string}
 */
var tictactoe = function(board) {
    let length = board.length;

    if(check('X')) {
        return 'X'
    }
    if(check('O')) {
        return 'O'
    }
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if(board[i][j] == ' ') {
                return 'Pending'
            }
        }        
    }

    return 'Draw'

    function check(str) {
        // 横
        for(i = 0; i < length; i++) {
            let isAll = true
            for(j = 0;j< length;j++) {
               if(board[i][j] != str) {
                   isAll = false
                   break;
               }
            }
            if(isAll) { return true}
        }
        // 竖
        for(i = 0; i < length; i++) {
            let isAll = true
            for(j = 0;j< length;j++) {
               if(board[j][i] != str) {
                   isAll = false
                   break;
               }
            }
            if(isAll) { return true}
        }
        
        // 对角线
        let result = true
        for (let i = 0; i < length; i++) {
            if(board[i][i] != str) {
                result =  false;
                break
            }           
        }
        if(result) { return true}
        result = true
        for (let i = 0; i < length; i++) {
            if(board[i][length -1 - i] != str) {
                result =  false;
                break
            }           
        }
        return result
    }
};

// 面试题 16.05. 阶乘尾数 数5的个数
/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function(n) {
    let result = 0
    while(n > 0) {
        result += Math.floor(n/5)
        n = Math.floor(n/5)
    }
    return result;
};

// 面试题 16.06. 最小差  排序 双指针逼近
/**
 * @param {number[]} a
 * @param {number[]} b
 * @return {number}
 */
var smallestDifference = function(a, b) {
    a.sort((a,b) => a - b)
    b.sort((a,b) => a - b)
    let min =  Math.abs(a[0] - b[0]),i = 0,j =0
    while(i < a.length && j < b.length && min != 0) {
        min = Math.min(min,  Math.abs(a[i] - b[j])) 
        if(a[i] < b[j]) {
            i++ 
        } else {
            j++
        }
    }
    return min
};

// 面试题 16.07. 最大数值   取平均值abs一下加差距
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var maximum = function(a, b) {
    let k = (a + b)/2
    return k + Math.abs(a - k)
};



// 面试题 16.08. 整数的英语表示 逻辑题 没有特殊的算法
/**
 * @param {number} num
 * @return {string}
 */
var numberToWords = function(num) {
    var  N = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30, 40, 50, 60, 70, 80, 90, 
        100, 1000, 1000000, 1000000000]
    var S = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", 
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
    "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
    "Hundred", "Thousand", "Million", "Billion"]
    if(num == 0) {
        return "Zero"
    }
    let i = 30,res =''
    while(i >= 0 && N[i] > num) {
        i--
    }
    if(N[i] <= 90) {
        res += S[i]
    } else {
        res += numberToWords(Math.floor(num/N[i])) + ' ' + S[i]
    }
    if(num%N[i] > 0) {
        res += ' ' + numberToWords(num%N[i])
    }
    return res
};

// 面试题 16.10. 生存人数 双指针
/**
 * @param {number[]} birth
 * @param {number[]} death
 * @return {number}
 */
var maxAliveYear = function(birth, death) {
    birth.sort((a,b)=> a - b)
    death.sort((a,b) => a - b)
    let i = 0,j = 0, maxNum =0,res = 0,length = birth.length,num = 0
    while(i < length && j < length) {
        if(birth[i] <= death[j]) {
            num++
            if(num > maxNum) {
                maxNum = num
                res = birth[i]
            }
            i++
        } else {
            num--
            j++
        }
    }
    return res
};

// 面试题 16.11. 跳水板 基础逻辑
/**
 * @param {number} shorter
 * @param {number} longer
 * @param {number} k
 * @return {number[]}
 */
var divingBoard = function(shorter, longer, k) {
    if(k == 0) { return []}
    if(shorter == longer) {
        return [shorter*k]
    }
    let result = []
    for (let i = 0; i <= k; i++) {
        let num =  shorter*(k - i) + longer*i
        result.push(num)
    }
    return result
};

// 面试题 16.15. 珠玑妙算 逻辑题
/**
 * @param {string} solution
 * @param {string} guess
 * @return {number[]}
 */
var masterMind = function(solution, guess) {
    let backup1 = [0,0,0,0],backup2 = [0,0,0,0],num = 0
    let map = new Map();
    map.set('R',0)
    map.set('Y',1)
    map.set('G',2)
    map.set('B',3)
    for (let i = 0; i < solution.length; i++) {
        let key1 = solution[i]
        let key2 = guess[i]
        if(key1 == key2) {
            num++
        }
        backup1[map.get(key1)] += 1
        backup2[map.get(key2)] += 1
    }
    let res = 0
    for (let i = 0; i < backup1.length; i++) {
        res +=  Math.min(backup1[i],backup2[i])
    }
    return [num,res-num];
};

// 面试题 16.16. 部分排序  前后两次遍历找到需要重排的点
/**
 * @param {number[]} array
 * @return {number[]}
 */
var subSort = function(array) {
    let  r = -1, max = Number.MIN_SAFE_INTEGER
    for (let i = 0; i < array.length; i++) {
        if(array[i] >= max) {
            max = array[i];
        } else {
            r = i;
        }
    }
    let l = -1, min =  Number.MAX_SAFE_INTEGER
    for (let i = array.length -1; i >= 0; i--) {
        if(array[i] <= min) {
            min = array[i]
        } else {
            l = i
        }
    }
    return [l,r];
};

// 面试题 16.17. 连续数列
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    if(nums.length == 0) {return 0}
    let res = nums[0],bd = -1;
    for (let i = 0; i < nums.length; i++) {
        if(bd < 0) {
            bd = nums[i]
        } else {
            bd += nums[i]
        }
        res = Math.max(bd,res)
    }
    return res
};

// 面试题 16.18. 模式匹配  不知道说什么 感觉题目有点问题
/**
 * @param {string} pattern
 * @param {string} value
 * @return {boolean}
 */
var patternMatching = function(pattern, value) {
    let aN = 0,bN = 0,length = value.length;
    for (let i = 0; i < pattern.length; i++) {
        if(pattern[i] == 'a') {
            aN++
        } else {
            bN++
        }
    }
    if(aN == 0 && bN == 0) {
        return value.length == 0
    }
    if(value.length == 0) {
        return! (aN && bN)
    }
    if(aN == 0) {
        if(length%bN == 0) {
            if(check(0,length/bN)) {
                return true
            }
        }
    } else if(bN == 0){
        if(length%aN == 0) {
            if(check(length/aN,0)) {
                return true
            }
        }
    } else {
        if(aN == 1 || bN == 1) {
            return true
        }
        for (let i = 0; i < length/aN; i++) {
            if((length - i*aN)%bN == 0) {
                if(check(i,(length - i*aN)/bN)){
                    return true
                }
            }
        }
    }
    return false;
    function check(a,b) {
        let countA  = 0, countB = 0,checkA = '',checkB = ''
        for (let i = 0; i < pattern.length; i++) {
            if(pattern[i] == 'a') {
                let str  = value.substr(countA*a + countB*b,a)
                if(countA == 0) {
                    checkA = str
                } else {
                    if(checkA != str) {
                        return false
                    }
                }
                countA++
            } else {
                let str  = value.substr(countA*a + countB*b,b)
                if(countB == 0) {
                    checkB = str
                } else {
                    if(checkB != str) {
                        return false
                    }
                }
                countB++
            }
        }
        return true
    }
};
// 面试题 16.19. 水域大小  dfs遍历
/**
 * @param {number[][]} land
 * @return {number[]}
 */
var pondSizes = function(land) {
    let area = 0, length1 = land.length, length2 = land[0].length, result = [];
    for (let i = 0; i < length1; i++) {
        for (let j = 0; j < length2; j++) {
            if(land[i][j] == 0) {
                area = 0
                dfs(i,j)
                result.push(area)
            }
        }
    }
    return result.sort((a, b) => a - b)

    function dfs(i,j) {
        if(i < 0 || j < 0 || i>= length1 || j >= length2 ) { return}
        if(land[i][j] ==0) {
            land[i][j] = 1
            area++
            let backup = [[0,1],[1,0],[0,-1],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]]
            for (let index = 0; index < backup.length; index++) {
                dfs(i+ backup[index][0],j+ backup[index][1])
            }
        }
    }
};

// 面试题 16.20. T9键盘 映射加判断
/**
 * @param {string} num
 * @param {string[]} words
 * @return {string[]}
 */
var getValidT9Words = function(num, words) {
    let backStr = '22233344455566677778889999',result = [],length = num.length
    for (let i = 0; i < words.length; i++) {
        let word = words[i]
        if(word.length == length) {
            let isReal = true
            for (let j = 0; j < length; j++) {
                let count = Number.parseInt( word[j].charCodeAt()) - 97
                if(backStr[count] !=  num[j]) {
                    isReal = false
                    break;
                }
            }
            if(isReal) {result.push(word)}
        }
    }
    return result;
};

// 面试题 16.21. 交换和  算差值 map记录
/**
 * @param {number[]} array1
 * @param {number[]} array2
 * @return {number[]}
 */
var findSwapValues = function(array1, array2) {
    let backup = new Map(),sum1 =0 ,sum2 = 0
    for (let i = 0; i < array1.length; i++) {
        sum1 += array1[i]    
    }
    for (let i = 0; i < array2.length; i++) {
        sum2 += array2[i] 
        backup.set(array2[i],true)   
    }
    if(Math.abs(sum1 -sum2)%2  == 1) {
        return []
    }
    let short = (sum1 - sum2)/2
    for (let i = 0; i < array1.length; i++) {
        let num =  array1[i]
        if(backup.get(num - short)) {
            return [num, num - short]
        }
    }
    return []
};

// 面试题 16.24. 数对和 map记录 也可以排序快慢指针
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var pairSums = function(nums, target) {
    let backup = new Map(),result = []
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        backup.set(num,(backup.get(num) || 0) + 1)
    }
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        backup.set(num,backup.get(num) - 1)
        if(backup.get(num) >= 0 && (backup.get(target - num) || 0) > 0) {
            backup.set(target - num,backup.get(target - num) - 1)
            result.push([num,target - num])
        }
    }
    return result;
};

// 面试题 16.26. 计算器 乘法合并成数据处理
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    s.replace(/\s+/g,"");
    s = s + '+'
    let res = 0,isAdd = true,backStr = ''
    for (let i = 0; i < s.length; i++) {
        let inStr = s[i]
        if(inStr == '+' || inStr == '-') {
            let num = getNum(backStr) 
            if(isAdd) {
                res += num
            } else {
                res -= num
            }
            isAdd = inStr == '+'
            backStr = ''
        } else {
            backStr += inStr
        }
    }
    return res

    function getNum(str) {
        str = str + '*'
        let numBack = 1, isProduct = true,backStr = ''
        for (let i = 0; i < str.length; i++) {
            let inStr = str[i]
            if(inStr == '*' || inStr == '/') {
                let num = Number.parseInt(backStr)
                if(isProduct) {
                    numBack =  numBack*num
                } else {
                    numBack =  Math.floor(numBack/num)
                }
                isProduct = inStr == '*'
                backStr = ''
            } else {
                backStr += inStr
            }
        }
        return numBack
    }

};
calculate(" 3+5 / 2 ")

// 面试题 17.01. 不用加号的加法  位运算 一位一位算
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var add = function(a, b) {
    let sum = 0,backup = 0
    while(b != 0) {
        sum = a^b
        backup =  (a&b) <<1;
        a = sum
        b = backup
    }
    return a
};

// 面试题 17.04. 消失的数字
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    let length = nums.length,sum = (1 + length)*length/2
    for (let i = 0; i < nums.length; i++) {
        sum -=  nums[i]
    }
    return sum;
};

// 面试题 17.05.  字母与数字 记录 检查
/**
 * @param {string[]} array
 * @return {string[]}
 */
var findLongestSubarray = function(array) {
    let num = 0,start = 0,end = 0,backup  =  new Map()
    backup.set(0,-1)
    for (let i = 0; i < array.length; i++) {
      num += checkNum(array[i]) ? 1 : -1
       let before = backup.get(num)
       if(before != null) {
           if(i -before > end - start)  {
               start = before
               end = i
           }
       } else {
           backup.set(num,i)
       }
    }
    return array.slice(start +1 ,end +1)
    function checkNum (num) {
        let backup = '0123456789'
        for (let i = 0; i < num.length; i++) {
           if(backup.indexOf(num[i]) == -1) {
               return false
           }
        }
        return true
    }
};

// 面试题 17.06. 2出现的次数 按位判断计算
/**
 * @param {number} n
 * @return {number}
 */
var numberOf2sInRange = function(n) {
    let s = n.toString(),check = 2,result = 0,length = s.length
    for (let i = 0; i < length; i++) {
        let num = Number.parseInt(s[i])
        let left = i == 0? 0 : Number.parseInt(s.substr(0,i)) 
        if(num > check) {
            result +=  (left+1)*(10**(length - i-1))
        } else if(num < check) {
            result += (left)*(10**(length-i-1))
        }else {
            let right = s.substr(i+1)
            result += (left)*(10**(length-i-1)) + (right == '' ? 0: Number.parseInt(right)) + 1
        }
    }
    return result;
};

// 面试题 17.07. 婴儿名字 连通原理
/**
 * @param {string[]} names
 * @param {string[]} synonyms
 * @return {string[]}
 */
var trulyMostPopular = function(names, synonyms) {
    let backup = new Map(),nameBack = new Map()
    for (let i = 0; i < names.length; i++) {
        addInfo(names[i])
    }
    
    for (let i = 0; i < synonyms.length; i++) {
        mergeInfo(synonyms[i])
    }

    let res = []
    for (let item of backup) {
        res.push(item[0] + '(' + item[1].toString() +')')
    }
    return res;

    function addInfo(string) {
        let key ='',num ='',numStart = false
        for (let i = 0; i < string.length; i++) {
            let char = string[i];
            if(char == '(' || char == ')') {
                numStart = true
            } else {
                if(numStart) {
                    num += char 
                } else {
                    key += char
                }
            }
        }
        backup.set(key,Number.parseInt(num))
        nameBack.set(key,key)
    }

    function mergeInfo(string) {
        let arr = string.substr(1,string.length -2).split(',')
        let root1 = getroot(arr[0]),root2 = getroot(arr[1])
        if(root1 == null || root2 == null) { return}
        if(root1 != root2) {
            if(root1 < root2) {
                backup.set(root1,backup.get(root1)+ backup.get(root2))
                backup.delete(root2)
                nameBack.set(root2,root1)
            } else {
                backup.set(root2,backup.get(root1)+ backup.get(root2))
                backup.delete(root1)
                nameBack.set(root1,root2)
            }
        }
    }

    function getroot(key) {
        let res = nameBack.get(key)
        if(res == null) {return null}
        if(res == key) {
            return key
        } else {
            nameBack.set(key, nameBack.get(res))
            return getroot(res)
        }
    }
};

// 面试题 17.09. 第 k 个数 逻辑题 记录备份
/**
 * @param {number} k
 * @return {number}
 */
var getKthMagicNumber = function(k) {
    let res = [1], p3 = 0,p5 = 0,p7 = 0
    while(res.length < k) {
        let min = Math.min(res[p3]*3,res[p5]*5,res[p7]*7)
        res.push(min)
        if(res[p3]*3 == min) { p3++}
        if(res[p5]*5 == min) { p5++}
        if(res[p7]*7 == min) { p7++}
    }
    return res[res.length -1]
};

// 面试题 17.11. 单词距离  遍历赋值判断
/**
 * @param {string[]} words
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var findClosest = function(words, word1, word2) {
    let num1 = -1,num2 = -1, min = Number.MAX_VALUE

    for (let i = 0; i < words.length; i++) {
        let word = words[i]
        if(word == words1) {
            num1 = i
            if(num1 > 0 && num2 > 0) {
                min = Math.min(Math.abs(num1-num2),min)
            }
        } else if(word == words2) {
            num2 = i
            if(num1 > 0 && num2 > 0) {
                min = Math.min(Math.abs(num1-num2),min)
            }
        }
    }
    return min
};

// 面试题 17.12. BiNode 二叉树的中序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBiNode = function(root) {
    if(root == null) {
        return root
    }
    let left = convertBiNode(root.left)
    if(left == null) {
        left = root
    } else {
        let leftTmp = left
        while(left.right !=null) {
            left = left.right
        }
        left.right = root
        left = leftTmp
    }
    root.left = null
    root.right =  convertBiNode(root.right)
    return left;
};

// 面试题 17.14. 最小K个数  最小堆
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var smallestK = function(arr, k) {
    let result = Array(k).fill(100001)
    for (let i = 0; i < arr.length; i++) {
        let num = arr[i];
        if(num < result[k-1]) {
            let j = 0
            // 这里用二分查找会快很多
            while(result[j] < num) {
                j++
            }
            result.pop()
            result.splice(j, 0, num); 
        } 
    }
    return result;
};

// 面试题 17.16. 按摩师 就是打家劫舍
/**
 * @param {number[]} nums
 * @return {number}
 */
var massage = function(nums) {
    let a = 0,b = 0
    for (let i = 0; i < nums.length; i++) {
        let c = Math.max(b,a+nums)
        a = b
        b = c
    }
    return b
};


// 面试题 17.17. 多次搜索  单个判断
/**
 * @param {string} big
 * @param {string[]} smalls
 * @return {number[][]}
 */
var multiSearch = function(big, smalls) {
    let result= []

    for (let index = 0; index < smalls.length; index++) {
        result.push(chek(smalls[index]))
    }
    return result;
     
    function chek(str) {
        if(str.length == 0) { return []}
        let j = 0
        let res = []
        for (let i = 0; i < big.length; i++) {
            if(big.substr(i,str.length) == str) {
                res.push(i)
            }
        }
        
        return res;
    }
};
// 面试题 17.18. 最短超串  窗口
/**
 * @param {number[]} big
 * @param {number[]} small
 * @return {number[]}
 */
var shortestSeq = function(big, small) {
    let backMap = new Map(),count = small.length
    for (let i = 0; i < small.length; i++) {
        backMap.set(small[i],(backMap.get(small[i]) || 0) +1)
    }
    let left = 0,right = 0,res = [-1,big.length];
    while(right < big.length) {
        if(count > 0) {
            let key =  big[right],value = backMap.get(key)
            if(value != null) {
                if(value > 0) {
                    count--;
                }
                backMap.set(key,value -1);
            } 
            if(count != 0) {
                right++
            }

        } else {
            let key =  big[left],value = backMap.get(key)
            if((res[1] -res[0]) > (right - left)) {
                res = [left,right]
            } 
            if(value != null) {
                backMap.set(key,value +1);
                if(value >= 0) {
                    count++;
                    right++;
                }
            } 
            left++
        }
    }
    if(count == 0) {
        if((res[1] -res[0]) > (right - left)) {
            res = [left,right]
        } 
    }
    if(res[0] == -1) {
        return []
    }
    return res;
};



// 面试题 17.19. 消失的两个数字  获取两个数的和 取得平均数，然后问题就变成在平均数下找到一个缺失的数
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var missingTwo = function(nums) {
    let sum = (nums.length +2 +1)*(nums.length +2)/2
    for (let i = 0; i < nums.length; i++) {
        sum -= nums[i];        
    }
    let mid = Math.floor(sum/2),numSum = mid *(mid +1)/2
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i]
        if(num <= mid) {
            numSum -= num
        }      
    }
    return [numSum,sum  - numSum]
};

// 面试题 17.20. 连续中值  这里用了排序 其实可以用双堆
/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
    this.backNum = []
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    this.backNum.push(num)
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    this.backNum.sort((a,b) =>a-b) 
    let length = this.backNum.length
    let mid =  Math.floor(length/2)
    if(length%2 ==1) {
        return  this.backNum[mid]
    } else {
        return (this.backNum[mid-1] + this.backNum[mid])/2
    }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */


// 面试题 17.21. 直方图的水量 双指针
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let res = 0,left = 0,right = height.length -1,maxLeft = height[left],maxRight = height[right]
    while(left < right) {
        if(maxLeft < maxRight) {
            res += maxLeft -  height[left++]
            maxLeft = Math.max(maxLeft,height[left])
        } else {
            res += maxRight - height[right--]
            maxRight = Math.max(maxRight,height[right])
        }
    }
    return res
};

// 1512. 好数对的数目 map记录
/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function(nums) {
    let backup = new Map(),res = 0
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i]
        let numCount = backup.get(num)
        if(numCount != null) {
            res += numCount
        } else {
            numCount = 0
        }
        numCount++
        backup.set(num,numCount)
    }
    return res
};

// 1496. 判断路径是否相交 map记录
/**
 * @param {string} path
 * @return {boolean}
 */
var isPathCrossing = function(path) {
    let x = 0,y = 0,backup = new Map()
    backup.set('0,0',1)
    for (let i = 0; i < path.length; i++) {
        let str =  path[i]
        if(str == 'N') {
            x++;
        } else if(str == 'S') {
            x--;
        } else if(str == 'W') {
            y++;
        } else {
            y--;
        }
        let key =  x.toString() + ',' + y.toString()
        if(backup.get(key)!= null) {
            return true
        }
        backup.set(key,1);
    }
    return false
};

// 1518. 换酒问题  基础题
/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var numWaterBottles = function(numBottles, numExchange) {
    let  res = numBottles,enpty = numBottles;
    while(enpty >= numExchange) {
        res += Math.floor(enpty/numExchange)
        enpty = Math.floor(enpty/numExchange) + enpty%numExchange
    }
    return res
};

// LCP 06. 拿硬币  基础逻辑题

var minCount = function(coins) {
    let res = 0;
    for (let i = 0; i < coins.length; i++) {
        let coin =  coins[i]
        res += Math.floor(coin/2) 
        res += coin%2
    }
    return res
};
