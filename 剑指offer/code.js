// 面试题03. 数组中重复的数字  交换记录（比之前像的数据记录更好）
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        let  num = nums[i];
        if(num != i) {
            if(nums[num] == num) {
                return num;
            } else {
                nums[i] = nums[num]
                nums[num] = num
            }
        }
    }
    return
};
// 面试题04. 二维数组中的查找  角上查找法 
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
    if(matrix.length == 0) {return false}
    let i = 0,j = matrix[0].length -1;
    while(i < matrix.length && j >= 0) {
        if(matrix[i][j] == target) {
            return true
        } else if(matrix[i][j] > target) {
            j--
        } else {
            i++
        }
    }
    return false
};
// 面试题05. 替换空格 遍历
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
    return s.replace(/ /g,'%20')
};
// 面试题06. 从尾到头打印链表 基础题
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function(head) {
    let res = []
    let next = head;
    while(next) {
        res.unshift(next.val)
        next = next.next
    }
    return res
};

// 面试题07. 重建二叉树  递归
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if(preorder.length == 0) {
        return null
    }
    let node = new TreeNode(preorder[0])
    let i = 0;
    while(inorder[i] != preorder[0]) {
        i++;
    }
    
    node.left = buildTree(preorder.slice(1,i+1),inorder.slice(0,i))
    node.right = buildTree(preorder.slice(i+1), inorder.slice(i+1))
    return node
};
// 面试题09. 用两个栈实现队列 把1数据导到2中 2边都存数据
var CQueue = function() {
    this.stack1 = []
    this.stack2 = []
};
CQueue.prototype.appendTail = function(value) {
    this.stack1.push(value)
};
CQueue.prototype.deleteHead = function() {
    if(this.stack2.length) {
        return this.stack2.pop()
    }
    if(!this.stack1.length) return -1
    while(this.stack1.length) {
        this.stack2.push(this.stack1.pop())
    }
    return this.stack2.pop()
};

// 面试题10- I. 斐波那契数列
/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    if(n == 0) { return 0}
    let a = 0, b = 1
    while(n > 1) {
        let TS = b
        b =  (a + b)%1000000007
        a = TS
        n--
    }
    return b%1000000007
};

// 面试题10- II. 青蛙跳台阶问题 基础题
/**
 * @param {number} n
 * @return {number}
 */
var numWays = function(n) {
    let a = 0,b =1
    while(n > 0) {
        let TS = b
        b =  (a + b)%1000000007
        a = TS
        n--
    }
    return b
};

// 面试题11. 旋转数组的最小数字 二分查找
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function(numbers) {
    let i = 0,j = numbers.length - 1
    while(i < j) {
        let mid = Math.floor((i + j)/2)
        if(numbers[mid] < numbers[j]) {
            j = mid
        } else if(numbers[mid] > numbers[j]) {
            i = mid + 1
        }  else {
            j--
        }
    }
    return numbers[i]
};

// 面试题12. 矩阵中的路径 回朔算法
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    
    let ts = []
    for (let i = 0; i < board.length; i++) {
        ts.push(Array(board[0].length).fill(false))
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if(dfs(i,j,0)) {
                return true
            }
        }
    }
    function dfs(i,j,k) {
        if(i >= board.length || i < 0 || j >= board[0].length || j < 0 || board[i][j] != word[k] || ts[i][j]) return false;
        if(k == word.length -1) return true;
        ts[i][j] = true
        let res = dfs(i+1,j,k+1) || dfs(i-1,j,k+1) || dfs(i,j+1,k+1) || dfs(i,j-1,k+1) 
        ts[i][j] = false
        return res
    }

    return false
};

// 面试题13. 机器人的运动范围  遍历判断是否可行
/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function(m, n, k) {
    let backup = []
    for (let i = 0; i < m; i++) {
        backup.push(Array(n).fill(0))
    }
    let ans = 1
    backup[0][0] = 1
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if( (i== 0 && j ==0) || get(i) + get(j) > k) {
                continue
            }
            if(i -1 >= 0 &&backup[i-1][j] == 1) {
                backup[i][j] = 1
            }
            if(j -1 >= 0 &&backup[i][j -1] == 1) {
                backup[i][j] = 1
            }
            ans += backup[i][j]
        }
    }
    return ans


    function get(num) {
        let res = 0;
        while(num > 0) {
            res += num%10
            num = Math.floor(num/10)
        }
        return res
    }
};


// 面试题14- I. 剪绳子  总结

/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function(n) {
    if(n < 4) { return n - 1}
    let a = Math.floor(n/3) 
    let b = n%3;
    if(b == 0) {
        return Math.pow(3,a)
    } else if(b == 1) {
        return Math.pow(3,a-1)*4
    } else {
        return Math.pow(3,a)*2
    }
};

// 面试题14- II. 剪绳子 II
/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function(n) {
    if(n < 4) { return n - 1}
    let a = Math.floor(n/3) 
    let b = n%3;
    let res = 0
    if(b == 0) {
        res = 3
    } else if(b == 1) {
        res = 4
    } else {
        res = 6
    }
    a--
    while(a > 0) {
        res = res*3%1000000007
        a--
    }
    return res
};

// 面试题15. 二进制中1的个数 位运算 最右边的数据变为1
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let res = 0;
    while(n !== 0) {
        res++
        n &= (n - 1)
    }
    return res
};

// 面试题18. 删除链表的节点 基础题
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function(head, val) {
    let newHead =  new ListNode(0)
    newHead.next = head;
    let node = newHead;
    while(node && node.next) {
        if(node.next.val == val) {
            let next = node.next;
            node.next = node.next.next;
            next.next = null;
            break;   
        }
        node = node.next
    }
    return newHead.next
};


// 面试题21. 调整数组顺序使奇数位于偶数前面 双指针
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function(nums) {
    let i = 0,j = nums.length -1
    while(i < j) {
        if((nums[i] & 1) == 1) {
            i++
            continue
        }
        if((nums[j] & 1) == 0) {
            j--
            continue
        }
        let tp  = nums[i]
        nums[i] = nums[j]
        nums[j] = tp;
    }
    return nums;
};


// 面试题22. 链表中倒数第k个节点 快慢指针
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function(head, k) {
    let fast = head,slow = head;
    while(k > 1) {
        fast = fast.next;
        k--;
    }
    while(fast.next) {
        fast = fast.next
        slow = slow.next
    }
    return slow
};

// 面试题24. 反转链表 遍历
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let  before = null
    let last = head;
    while(last) {
        let node = last;
        last = last.next;
        node.next = before;
        before = node;
    }
    return before;
};

//  面试题25. 合并两个排序的链表 遍历
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let head  = new ListNode(1);
    let next = head
    while(l1 && l2) {
        if(l1.val > l2.val) {
            next.next = l2
            l2  = l2.next
            next = next.next
        } else {
            next.next = l1
            l1  = l1.next
            next = next.next
        }
    }
    if(l1) {
        next.next = l1
    }
    if(l2) {
        next.next =l2
    }
    return head.next
};

// 面试题27. 二叉树的镜像 递归
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
var mirrorTree = function(root) {
    if(!root) { return root}
    let tp =  root.left;
    root.left = root.right;
    root.right = tp;
    mirrorTree(root.left)
    mirrorTree(root.right)
    return root

};