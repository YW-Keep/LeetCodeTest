// leetcode 第一题 空间换时间
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var myMap = new Map();
    for (let index = 0; index < nums.length; index++) {
        let num = nums[index];
        let reslut =  target - num;
        if (myMap.get(reslut) != null) {
            return [myMap.get(reslut), index];
        } else {
            myMap.set(num, index);
        }
    }
    return [];
};




// 第二题 没什么难度 循环 需要考虑下进位
function ListNode(val) {
       this.val = val;
       this.next = null;
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    var head = new ListNode(1);
    var nowTip = head;
    var carray = 0;
    while (l1 != null || l2 != null) {
        let num1 = l1 == null ? 0 : l1.val;
        let num2 = l2 == null ? 0 : l2.val;
        let num = (num1 + num2 + carray)%10;
        carray = (num1 + num2 + carray)/10;
        carray = Math.floor(carray);
        nowTip.next = new ListNode(num);
        nowTip = nowTip.next;
        if (l1) {
            l1 = l1.next;
        } 
        if (l2) {
             l2 = l2.next;
        }
  
    }
    if (carray != 0) {
        nowTip.next = new ListNode(carray);
    }
    return head.next;
};



// leetcode 第三题 我又用空间换时间了
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    var myMap = new Map();
    var reslut = 0;
    var begain = 0;
    for (let index = 0; index < s.length; index++) {
        let char = s[index];
        if (myMap.get(char) != null) {
            begain = Math.max(myMap.get(char) + 1,begain);
        }
        myMap.set(char,index);
        reslut = Math.max(reslut,index - begain + 1);
    }
    return reslut;
};



//4. 两个排序数组的中位数   排序数组，其实就是取数  二分法求值
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {

    let medianNum = Math.floor((nums1.length + nums2.length)/2);
    if ((nums1.length + nums2.length)%2 > 0) {
        return findValueInSortedArray(medianNum, nums1, nums2);
    } else {
        let lowerNum = findValueInSortedArray(medianNum - 1, nums1, nums2);
        let higherNum = findValueInSortedArray(medianNum, nums1, nums2);
        return (lowerNum + higherNum)/2;
    }
};

/**
 * @param {number}   k
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findValueInSortedArray = function(k, num1, num2) {

    if (num1.length > num2.length) {
        return findValueInSortedArray(k, num2, num1);
    }

    if (num1.length == 0) {
        return num2[k];
    }

    if(k <= 0) {
        return Math.min(num1[0],num2[0]);
    }

    let index1 = Math.min(Math.floor((k -1)/2),num1.length - 1);
    let index2 = Math.min(Math.floor((k -1)/2),num2.length - 1);
    if (num1[index1] < num2[index2]) {
        return findValueInSortedArray(k - index1 - 1, num1.slice(index1 + 1, num1.length) , num2);
    } else {
        return findValueInSortedArray(k - index2 - 1, num1, num2.slice(index2 + 1, num2.length));
    }
}




// 5. 最长回文子串  首先插入#来除去奇偶性的判断  然后 Manacher 算法 
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    var newS = '#';
    for (let index = 0; index < s.length; index++) {
        newS += s[index];
        newS += '#';
    }
    newS  = '$' + newS + '&';

    var p = new Array();
    var mid = 0;
    var right = 0;

    var max_mid = 0;
    var max_leng = 0;
    p[0] = 0;
    for (let index = 1; index < newS.length; index++) {
        if (index < right) {
            p[index] = Math.min(p[2*mid - index], right - index)
        } else {
            p[index] = 1;
        }
        while(newS[index - p[index]] == newS[index + p[index]]) {
            p[index]++;
        }
        if(p[index] + index > right) {
            mid = index;
            right = p[index] + index;
        }
        if(p[index] - 1 > max_leng){
            max_leng = p[index] - 1;
            max_mid = index;
        }
    }
    var start = Math.floor(max_mid / 2 )  -  Math.floor(max_leng / 2);
    if (max_mid % 2 == 0) {
        start --;
    }
    return s.slice(start , start + max_leng);
};

// 11. 盛最多水的容器 （确定一个变量，修改另外一个变量）
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    var max = 0;
    var left = 0;
    var right = height.length - 1;

    while (left < right) {
        let now = Math.min(height[left],height[right])*(right - left);
        max = Math.max(max,now);
        if (height[left] < height[right]) {
            left += 1;
        } else {
            right -= 1;
        }
    }
    return max;
};



// 15. 三数之和  思路就是第一个数 然后做 一个数组中找到两个数的和等于目标值，首相想到的是用算法1的方法算2个数和等于目标值，发现这样很难去重
// 所以换一种思路，先给数组排序，然后定一个数，头尾指针移动去寻找相应的值。最后加入。

// 这是第一种方式写的  难以去重
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum1 = function(nums) {
    var result = new Array();
    var ma
    for (let index = 0; index < nums.length; index++) {
        var num  = nums[index]
        let backArr = twoSum2( nums.slice(index + 1,nums.length) , -num);
        result = result.concat(backArr);
    }
    return result;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum2 = function(nums, target) {
    var myMap = new Map();
    var backArr = new Array();
    for (let index = 0; index < nums.length; index++) {
        let num = nums[index];
        let reslut =  target - num;
        if (myMap.get(reslut) != null) {
            backArr.push([num,reslut,-target]);
        } else {
            myMap.set(num, index);
        }
    }
    return backArr;
};

// 第二种
var threeSum2 = function(nums) {
    var result = new Array();
    var newNums = nums.sort(compare);
    for (let index = 0; index < newNums.length; index++) {
        let num = newNums[index];
        var start = index + 1;
        var end = newNums.length - 1;
        // 去重
        if (index > 0 && (num == newNums[index - 1])) {
            continue;
        }
        while (start < end) {
            let sum = newNums[start] + newNums[end] + num;
            if (sum == 0) {
                result.push([newNums[start], newNums[end], num])
                // 去重
                while (start < end && (newNums[start] == newNums[start + 1])) {
                    start++;
                }
                while (start < end && (newNums[end] == newNums[end - 1])) {
                    end--;
                }
                start++;
                end--;
            } else if (sum < 0) {
                start++;
            } else {
                end--;
            }
        }
    }
    return result;
};

// 排序方法
var compare = function (x, y) {
    if (x < y) {
        return -1;
    } else if (x > y) {
        return 1;
    } else {
        return 0;
    }
}



//17. 电话号码的字母组合   深度遍历

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (digits.length < 1) {
        return [];
    }
    var reslut = new Array();
    dfs17(0,digits,"",reslut);
    return reslut;
};

var conversion = [" ", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];

/**
 * @param {number} step
 * @param {string} digits
 * @param {string} target
 * @param {string[]]} reslut
 */
var dfs17 = function(step, digits, target, reslut) {
    if (step == digits.length) {
        reslut.push(target);
        return;
    }
    var addNum = Number(digits[step]);
    var addString = conversion[addNum];

    for (let index = 0; index < addString.length; index++) {
        var element = addString[index];
        dfs17(step + 1, digits, target + element, reslut);
    }
}

//19. 删除链表的倒数第N个节点  看到这个第一个想法就是快慢指针

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    var fast = head;
    var slow = head;
    var num = 0;
    while (fast != null && num <= n ) {
        fast = fast.next;
        num++; 
    }

    while (fast != null) {
        fast = fast.next;
        slow = slow.next;
    }

    if (num == n) {
        head =  head.next;
    } else if (num > n) {
        slow.next = slow.next.next;
    }
    
    return head;
};

//20. 有效的括号
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    var key = {
        "(" : ")",
        "[" : "]",
        "{" : "}"
    };
    var queue = Array();
    for(i=0;i<s.length;i++) {
        var arr  = s[i];
        if (key[arr] != null) {
            queue.push(arr);
        } else {
           var last = queue.pop();
           if (key[last] != arr) {
               return false;
           }
        }
    }
    if (queue.length == 0) {
        return true;
    } else {
        return false;
    }
};

// 21. 合并两个有序链表
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    var head = new ListNode(1);
    var step = head;
    while ( l1 != null && l2 != null) {
        if (l1.val < l2.val) {
            step.next = l1
            l1 = l1.next;
        } else {
            step.next = l2
            l2 = l2.next;
        }
        step = step.next;
    }
    if(l1 != null) {
        step.next = l1;
    } 
    if(l2 != null) {
        step.next = l2;
    }
    return  head.next;
};


// 22. 括号生成 二叉树的遍历思想

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    var reslut = Array();
    addStr(reslut, "", n, n);
    return reslut;
};


/**
 *
 * @param {string[]]} reslut
 * @param {string} nowStr
 * @param {Number} open
 * @param {Number} close
 * @returns
 */
function addStr(reslut, nowStr, open, close) {
    if (open == 0 && close == 0) {
        reslut.push(nowStr);
        return;
    }
    if(open > 0) {
        addStr(reslut, nowStr + "(", open - 1, close);
    }
    if(close > 0 && close > open) {
        addStr(reslut, nowStr + ")", open, close - 1);
    }
}

           
// 23. 合并K个排序链表 因为链表排序麻烦 所以想法是转成数组，在排序后生产
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    var listArray = Array();
    for (let index = 0; index < lists.length; index++) {
        var element = lists[index];
        while(element != null) {
            listArray.push(element.val);
            element = element.next;
        }
    }

    listArray.sort(compare);
    var head = new ListNode(1);
    var step = head;
    for (let index = 0; index < listArray.length; index++) {
        var element = listArray[index];
        step.next = new ListNode(element);
        step = step.next;
    }
    return head.next;

};

function compare(value1, value2) {
    return value1 - value2;
}


// 32. 最长有效括号 记录（ 的位置，到数组，然后进行安全计算
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    var maxNum = 0;
    var stack = Array();
    stack.push(-1);
    for (let index = 0; index < s.length; index++) {
        var element = s[index];
        if(element == "(") {
            stack.push(index);
        } else {
            stack.pop();
            if (stack.length == 0){
                stack.push(index);
            }
            maxNum = Math.max(maxNum, index - stack[stack.length - 1]);
        }
    }
    return maxNum;
}; 

// 33. 搜索旋转排序数组
// 思路 至少有一半是可以用的 那么继续用二分法去计算
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    var min = 0, max = nums.length -1, mid = 0;
    while (min <= max) {
        mid = Math.floor((min + max) / 2);
        if(nums[mid] == target) {
            return mid
        } 
        if (nums[min] <= nums[mid]) {
            if (nums[min] <= target && target <nums[mid]) {
                max = mid - 1;
            } else {
                min = mid + 1;
            }
        } else {
            if(target <= nums[max] &&   nums[mid] < target) {
                min = mid + 1;
            } else {
                max = mid - 1;
            }
        }
    }
    return -1;
};

// 34. 在排序数组中查找元素的第一个和最后一个位置 (思路二分法先找到一个值 然后左右扩容)

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    var leftR = -1;
    var rightR = -1;
    
    var left = 0;
    var right = nums.length - 1;
    var mid = 0;
    while (left <= right) {
        mid = Math.floor((left + right)/2);
        if(nums[mid] == target) {
            leftR = mid;
            rightR = mid;
            break;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    if(leftR >= 0){
        while ((leftR - 1)  > -1 && nums[leftR -1] == target){
            leftR--;
        }
        while ((rightR + 1)  < nums.length && nums[rightR +1] == target){
            rightR++;
        }
    }
    return [leftR, rightR];
    
};

// 35. 搜索插入位置 又是一题二分法的题目

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    var left = 0 , right = nums.length - 1 , mid = 0;
    while (left < right) {
        mid = Math.floor((left + right)/2);
        if(nums[mid] == target) {
            return mid;
        } else if(nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }    
    if(nums[left] <  target ) {
        left++;
    }
    return left;
};

//   39. 组合总和 深度遍历

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    var result = Array();
    combinationSumDFS(0, 0, Array());
    function combinationSumDFS(start, sum, ans) {
        if (sum == target) {
            result.push(ans);
        } else if (sum < target) {
            for (let index = start; index < candidates.length; index++) {
                let addNum = candidates[index];
                let newAns = ans.slice(0);
                newAns.push(addNum);
                combinationSumDFS(index, sum + addNum, newAns);
            }
        }
    }
    return result;
};


//  42. 接雨水
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    var left = 0, right = height.length - 1;
    var maxLeft = 0, maxRight = 0;
    var ans = 0;
    while(left < right) {
        if(height[left] < height[right]) {
            height[left] >= maxLeft ? (maxLeft = height[left]) : (ans += (maxLeft - height[left]));
            left++;
        } else {
            height[right] >= maxRight ? (maxRight = height[right]) : (ans += (maxRight - height[right]));
            right--;
        }
    }
    return ans;
};

//46. 全排列  2个思路，1深度遍历 2.动态规划
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    var reslut = Array();
    permuteDFS(nums,Array(),reslut);
    return reslut;

    /**
     *
     *
     * @param {number[]} nums
     * @param {number[]} ans
     * @param {number[][]} reslut
     */
    function permuteDFS(nums, ans, reslut) {
        if (nums.length == 0) {
            reslut.push(ans);
        } else {
            for (let index = 0; index < nums.length; index++) {
                var newNums = nums.slice(0);
                newNums.splice(index, 1);
                var newAns = ans.slice(0);
                newAns.push(nums[index]);
                permuteDFS(newNums, newAns, reslut);
            }
        }
    }
};

//  48. 旋转图像
// 思路：直接旋转很麻烦，所以先进行斜对称变换再进行反转
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    
    SlashSymmetry(matrix);
    ParallelReverse(matrix);
    /**
     *  斜线反转
     * @param {number[][]} matrix
     */
    function  SlashSymmetry(matrix){
        for (let i = 0; i < matrix.length - 1; i++) {
            for (let j = 0; j < matrix.length - i - 1; j++) {
                let index = matrix[i][j];
               matrix[i][j] = matrix[ matrix.length - 1 - j][ matrix.length - 1 -i];
               matrix[ matrix.length - 1 - j][ matrix.length - 1 -i] = index;
            }
        }
    }

    /**
     * 平行反转
     * @param {number[][]} matrix
     */
    function ParallelReverse(matrix) {
        let changeNum  = Math.floor(matrix.length/2);
        for (let i = 0; i < changeNum; i++) {
            let index = matrix[i];
            matrix[i] = matrix[matrix.length - 1 - i];
            matrix[matrix.length - 1 - i] = index;
        }
    }
};


// 49. 字母异位词分组 思路主要是对字符串排序后匹配。

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {

    var myMap = new Map();
    for (let index = 0; index < strs.length; index++) {
        const element = strs[index];
        let key = sortString(element);
        var oldStrs = myMap.get(key);
        if (oldStrs != null) {
            oldStrs.push(element);
            myMap.set(key, oldStrs)
        } else {
            myMap.set(key, [element]);
        }
    }
    var reslut = Array();
    myMap.forEach(function (item) {
        reslut.push(item);
    });

    return reslut;
    /**
     * 字符串排序
     * @param {string} string
     * @returns string
     */
    function sortString(string) {
        var stringArray = Array();
        for (let index = 0; index < string.length; index++) {
            stringArray.push(string[index]);
        }
        stringArray.sort();
        var reslut = "";
        stringArray.forEach(element => {
            reslut += element;
        });
        return reslut;
    }
};


// 53. 最大子序和 思路 还是递归想 （如果前面和大于零则加入 小于零则舍弃）
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    var max = nums[0];
    var sum = 0;
    for (let index = 0; index < nums.length; index++) {
        let num = nums[index];
        sum = sum + num;
        if (max < sum) {
            max = sum;
        }
        if(sum < 0) {
            sum = 0;
        }
    }
    return max;
};

// 55. 跳跃游戏
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    var max = 0;
    for (let index = 0; index < nums.length - 1; index++) {
        let num = nums[index];
        let nowMax = num + index;
        max = Math.max(max,nowMax);
        if (max <= index) {
            return false;
        } 
    }
    return true;
};

// 56. 合并区间  先排序 这样问题就简单了

function Interval(start, end) {
    this.start = start;
    this.end = end;
}

/**
 * @param {Interval[]} intervals
 * @return {Interval[]}
 */
var merge = function(intervals) {
    if (intervals.length < 2) {
        return intervals;
    }
    var compare = function(x,y) {
        return x.start - y.start;
    }
    intervals.sort(compare);
    var reslut = Array();
    reslut.push(intervals[0])
    for (let index = 1; index < intervals.length; index++) {
        let element = intervals[index];
        if (reslut[reslut.length - 1].end < element.start) {
            reslut.push(element);
        } else {
            reslut[reslut.length - 1].end = Math.max(reslut[reslut.length - 1].end,element.end);
        }
    }
    return reslut;
};


//  62. 不同路径  排序算法

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    if(n < 1 || m < 1) {
        return 1;
    }
    var all = n + m  - 2;
    var min = Math.min(n,m);
    var reslut = 1;
    for (let index = 1; index < min; index++) {
        reslut = all*reslut;
        all--;
        reslut = reslut/index
    }
    return reslut;
};