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