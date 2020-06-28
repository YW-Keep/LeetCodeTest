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

// 面试题26. 树的子结构  递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function(A, B) {
    if(A == null || B == null) {
        return false;
    }
    return  check(A,B) || isSubStructure(A.left,B) || isSubStructure(A.right,B) 
    function check(a,b) {
        if(b == null) {return true}
        if(a == null) {return false}
        if(a.val != b.val) {return false}
        return check(a.left,b.left) && check(a.right,b.right)
    }
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

// 面试题28. 对称的二叉树 递归
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
var isSymmetric = function(root) {
    if(!root) { return true}
    return checkInfo(root.left,root.right)
    function checkInfo(left,right) {
        if(!left && !right) {return true}
        if(!left || !right) {return false}
        if(left.val == right.val) {
            return checkInfo(left.left,right.right) && checkInfo(left.right,right.left)
        } else {
            return false
        }
    }
};

// 面试题32 - I. 从上到下打印二叉树 遍历

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function(root) {
    if(!root) {return []}
    let backup = [root];
    let res = []
    while(backup.length > 0) {
        let newBackup = []
        for (let i = 0; i < backup.length; i++) {
            let node = backup[i]
            res.push(node.val)
            if(node.left) {
                newBackup.push(node.left)
            }
            if(node.right) {
                newBackup.push(node.right)
            }
        }
        backup = newBackup
    }
    return res;
};

// 面试题32 - II. 从上到下打印二叉树 II 遍历
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function(root) {
    if(!root) {return []}
    let backup = [root];
    let res = []
    while(backup.length > 0) {
        let newBackup = []
        let newTier = []
        for (let i = 0; i < backup.length; i++) {
            let node = backup[i]
            newTier.push(node.val)
            if(node.left) {
                newBackup.push(node.left)
            }
            if(node.right) {
                newBackup.push(node.right)
            }
        }
        backup = newBackup
        res.push(newTier)
    }
    return res;
};
// 面试题32 - III. 从上到下打印二叉树 III 遍历
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function(root) {
    if(!root) {return []}
    let backup = [root];
    let res = []
    i = 1;
    while(backup.length > 0) {
        let newBackup = []
        let newTier = []
        let isPush = i%2 == 1
        for (let i = 0; i < backup.length; i++) {
            let node = backup[i]
            if(isPush) {
                newTier.push(node.val)
            } else {
                newTier.unshift(node.val)
            }
            if(node.left) {
                newBackup.push(node.left)
            }
            if(node.right) {
                newBackup.push(node.right)
            }
        }
        backup = newBackup
        res.push(newTier)
        i++
    }
    return res;
};

// 面试题34. 二叉树中和为某一值的路径  递归
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
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
    let result = [],backup = [],tep = 0;
    dfs(root)
    return result
    function dfs(node) {
        if(!node) {return}
        backup.push(node.val)
        tep += node.val
        if(!node.left && !node.right && tep == sum) {
            result.push(backup.concat())
        }
        dfs(node.left)
        dfs(node.right)
        backup.pop()
        tep -= node.val
    }
};

// 剑指 Offer 35. 复杂链表的复制 map记录
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    let root = new Node(1),next = root,oldNext = head;
    let backUp = new Map()
    while(oldNext) {
        let item = backUp.get(oldNext)
        if(!item) {
            item = new  Node(oldNext.val)
            backUp.set(oldNext,item)
        }
        next.next = item
        if(oldNext.random) {
            let random = backUp.get(oldNext.random)
            if(!random) {
                random = new  Node(oldNext.random.val)
                backUp.set(oldNext.random,random)
            }
            item.random = random
        }
        next = next.next
        oldNext = oldNext.next
    }
    return root.next;
};



// 面试题39. 数组中出现次数超过一半的数字 摩尔投票法
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let num = nums[0]
    let count = 1
    for (let i = 1; i < nums.length; i++) {
        let inNum = nums[i]
        if(inNum == num){
            count++
        } else {
            count--
        }
        if(count < 0) {
            num = inNum
            count = 1
        }
    }
    return num
};

// 面试题42. 连续子数组的最大和 动态规划
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let max = nums[0]
    for (let i = 1; i < nums.length; i++) {
        let num = nums[i]
        if(nums[i-1] > 0) {
            num += nums[i-1]
        }
        if(num > max) {
            max = num;
        }
        nums[i] = num
    }
    return max;
};

// 剑指 Offer 43. 1～n整数中1出现的次数  分情况处理
/**
 * @param {number} n
 * @return {number}
 */
var countDigitOne = function(n) {
    let  digit = 1,res = 0
    let hight = Math.floor(n/10),cur = n%10,low = 0
    while(hight != 0 || cur != 0) {
        if(cur == 0) {
            res += hight*digit
        } else if(cur == 1) {
            res += hight*digit + low +1
        } else {
            res += (hight +1) *digit
        }
        low += cur*digit
        cur = hight%10
        hight = Math.floor(hight/10)
        digit = digit*10
    }
    return res
};

// 剑指 Offer 45. 把数组排成最小的数 排序拼接
/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function(nums) {
    nums.sort((a,b) =>{
        let num1 = Number.parseInt(a.toString() + b.toString())
        let num2 = Number.parseInt(b.toString() + a.toString())
        return num1 - num2
    })
    let res = ''
    for (let i = 0; i < nums.length; i++) {
        res += nums[i].toString()
    }
    return res
};

// 剑指 Offer 46. 把数字翻译成字符串 动态规划
/**
 * @param {number} num
 * @return {number}
 */
var translateNum = function(num) {
    if(num < 10) {return 1}
    let back = 1,now = 1
    let numStr = num.toString()
    for (let i = 1; i < numStr.length; i++) {    
        let newNow = 0
        let inNum = Number.parseInt( numStr[i - 1] + numStr[i])  
        if(inNum > 9  && inNum < 26) {
            newNow = back + now
        } else {
            newNow =  now
        }
        back = now
        now  = newNow
    }
    return now;
};


// 面试题47. 礼物的最大价值 动态规划
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function(grid) {
    let backup = new Array(grid[0].length).fill(0)
    
    for (let i = 0; i < grid.length; i++) {
        let newBackup = [];
        let item =grid[i]
        for (let j = 0; j < item.length; j++) {
            if(j == 0) {
                newBackup.push(backup[j] + item[j])
            }  else {
                newBackup.push(Math.max(newBackup[j-1],backup[j]) + item[j])
            }        
        }
        backup = newBackup
    }
    return backup[backup.length - 1]
};


// 剑指 Offer 49. 丑数 动态规划
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
    let i = 0,j = 0,k = 0,backup = [1]
    while(backup.length < n) {
        let num = Math.min(backup[i]*2,backup[j]*3,backup[k]*5)
        backup.push(num)
        if(backup[i]*2 == num){i++}
        if(backup[j]*3 == num){j++}
        if(backup[k]*5 == num){k++}
    }
    return backup[n-1];
};

// 剑指 Offer 50. 第一个只出现一次的字符 记录 遍历
/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function(s) {
    let backup = new Map ()
    for (let i = 0; i < s.length; i++) {
        backup.set(s[i],(backup.get(s[i])||0) + 1)
    }

    for (let i = 0; i < s.length; i++) {
        if(backup.get(s[i]) == 1) {
            return s[i]
        }       
    }
    return ' '
};

// 剑指 Offer 52. 两个链表的第一个公共节点  双指针
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let node1 = headA ,node2 = headB
    while(node1 != node2) {
        node1 = node1 ? node1.next : headB
        node2 = node2 ? node2.next : headA
    }
    return node1
};

// 剑指 Offer 53 - I. 在排序数组中查找数字 I  二分法
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    return search(target) - search(target -1)
    function search(num) {
        let left = 0, right = nums.length - 1
        while(left <= right) {
            let mid = Math.floor((left+right)/2)
            if(nums[mid] <= num) {
                left = mid + 1
            } else {
                right = mid - 1
            }

        }
        return left;
    }
};

// 剑指 Offer 53 - II. 0～n-1中缺失的数字 基础题
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    let length = nums.length
    let sum = (length +1)*length/2
    for (let i = 0; i < nums.length; i++) {
        sum -= nums[i]
    }
    return sum
};