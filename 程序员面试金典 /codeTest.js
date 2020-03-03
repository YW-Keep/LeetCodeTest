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