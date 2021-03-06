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
        let result =  target - num;
        if (myMap.get(result) != null) {
            return [myMap.get(result), index];
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
    var result = 0;
    var begain = 0;
    for (let index = 0; index < s.length; index++) {
        let char = s[index];
        if (myMap.get(char) != null) {
            begain = Math.max(myMap.get(char) + 1,begain);
        }
        myMap.set(char,index);
        result = Math.max(result,index - begain + 1);
    }
    return result;
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
// 7.反转整数 需要做判断
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    var  rev = 0;
    while(x != 0) {
        var pop = x%10;
        x = parseInt(x/10);
        rev = rev*10 +pop; 
    }
    if(rev > Math.pow(2,31) -1 || rev < Math.pow(2,31)*-1) {
        rev = 0;
    }
    return rev;
};

//8.字符串转整数 (atoi)   考虑细节 做判断
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    var result = 0;
    var symbol = 1;
    var newStr = str.replace(/(^\s*)|(\s*$)/g, "");
    var numStr = "0987654321"
    for (let index = 0; index < newStr.length; index++) {
        var char = newStr[index];
        if(index == 0 && char == "-") {
            symbol = symbol * -1;
            continue;
        }
        if(index == 0 && char == "+") {
            continue;
        }
        if(numStr.indexOf(char) != -1){
            result  = result*10 + parseInt(char);
        } else {
            break;
        }
    }
    result = result*symbol;
    if(result > Math.pow(2,31) -1) {
        result = Math.pow(2,31) -1;
    }
    if(result < Math.pow(2,31)*-1) {
        result = Math.pow(2,31)*-1;
    }
    return result;
};

//9.回文数  这里使用的是遍历 还可以把后半段反转 这是一种比较常用的技巧
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    var str = x.toString();
    if (str.length < 2) {
        return true;
    }
    for (let index = 0; index < parseInt(str.length)/2; index++) {
        if(str[index] != str[str.length - index -1]) {
            return false;
        }
    }
    return true
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

//  13.罗马数组转整数 逆转遍历
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    var res = 0;
    var map = {
        I:1,
        V:5,
        X:10,
        L:50,
        C:100,
        D:500,
        M:1000
    };
    for(var i = s.length -1; i >= 0; i-- ){
         var char = map[s[i]];
         var nextChar = map[s[i-1]];
        if(nextChar < char) {
            res += char - nextChar;
            i--;
        } else {
            res += char;
        }
    }
    return res
};

// 14.最长公共前缀 最简单的思想取相同的头部 遍历比较 感觉应该可以更快
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(strs.length == 0) {
        return ""
    }
    var hander = strs[0];
    for (let index = 1; index < strs.length; index++) {
        var sendStr = strs[index];
        var min = Math.min(sendStr.length,hander.length);
        var num = 0;
        while(num < min){
            if(hander[num] != sendStr[num]) {
                break;
            }
            num++;
        }
        if(num == 0) {
            return "";
        } else {
            hander = hander.substr(0,num);
        }
    }
    return hander;
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
        let result =  target - num;
        if (myMap.get(result) != null) {
            backArr.push([num,result,-target]);
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


// 16.最接近的三数之和 排序遍历
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    if (nums.length < 3) {
        return null;
    }
    var newNums = nums.sort(compare);
    var result = nums[0] + nums[1] + nums[2];
    for (let index = 0; index < newNums.length; index++) {
        var tap = target - newNums[index];
        var start = index + 1;
        var end = newNums.length - 1;
        while (start < end) {
           var newTap = newNums[start] + newNums[end];
           if(newTap == tap) {
               return target;
           } else if (newTap > tap) {
               end--;
           } else {
               start++;
           }
           result = Math.abs(result - target) < Math.abs(newTap - tap) ? result : newTap +newNums[index];
        }
    }
    return result;
    function compare(x,y) {
        return x - y;
    }
};

//17. 电话号码的字母组合   深度遍历

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (digits.length < 1) {
        return [];
    }
    var result = new Array();
    dfs17(0,digits,"",result);
    return result;
};

var conversion = [" ", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];

/**
 * @param {number} step
 * @param {string} digits
 * @param {string} target
 * @param {string[]]} result
 */
var dfs17 = function(step, digits, target, result) {
    if (step == digits.length) {
        result.push(target);
        return;
    }
    var addNum = Number(digits[step]);
    var addString = conversion[addNum];

    for (let index = 0; index < addString.length; index++) {
        var element = addString[index];
        dfs17(step + 1, digits, target + element, result);
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
    var result = Array();
    addStr(result, "", n, n);
    return result;
};


/**
 *
 * @param {string[]]} result
 * @param {string} nowStr
 * @param {Number} open
 * @param {Number} close
 * @returns
 */
function addStr(result, nowStr, open, close) {
    if (open == 0 && close == 0) {
        result.push(nowStr);
        return;
    }
    if(open > 0) {
        addStr(result, nowStr + "(", open - 1, close);
    }
    if(close > 0 && close > open) {
        addStr(result, nowStr + ")", open, close - 1);
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

// 24. 两两交换链表中的节点 递归 非递归思考比较繁琐
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    if(head == null || head.next == null) {
        return head;
    } 
    let next = head.next;
    head.next = swapPairs(next.next);
    next.next = head;
    return next;
};
// 25. K 个一组翻转链表 递归
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    let node = new  ListNode(0);
    node.next = head;
    let next = node;
    let i = k

    while(next.next && k > 0) {
        next = next.next;
        k--;
    }

    if(k > 0) {
        return head;
    } 

    let newNext = reverseKGroup(next.next,i);
    next.next = null;
    next = head.next;
    let stash = head;
    stash.next = newNext;
    while (next) {
        let backup = next.next;
        next.next = stash;
        stash = next;
        next = backup
    }
    return stash;
};

// 26.删除排序数组中的重复项 注意是排序数组所以使用快慢指针就可以了
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if(nums.length == 0) {
        return 0;
    }
    var mark = 0;
    for (let index = 0; index < nums.length; index++) {
        if(nums[mark] != nums[index]) {
            mark++;
            nums[mark] = nums[index];
        }
    }
    return mark + 1;
};

// 27. 移除元素 基础逻辑题
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let i = 0;
    for(let num of nums) {
        if(num != val) {
            nums[i] = num;
            i++
        }
    }    
    return i;
};

// 28. 实现 strStr() ...
var strStr = function(haystack, needle) {
    return haystack.indexOf(needle)
};

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
// 38.报数 逻辑题
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    var result = "1";
    for (let index = 1; index < n; index++) {
        helper(result);
    }
    return result;
    function helper(string) {
        var backString = string.substr(0,1);
        var num = 1;
        var newString = "";
        for (let index = 1; index < string.length; index++) {
            var char = string.substr(index,1);
            if(char == backString) {
                num++;
            } else {
                newString += num.toString() + backString;
                backString = char;
                num = 1;
            }
        }
        newString += num.toString() + backString;
        result = newString;
    }
};

//   39. 组合总和  回溯算法
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    
    var res=[];
    function toback(target,list,index){
      if(target==0){
        res.push(list.slice(0));
      }
      for(var i=index;i<candidates.length;i++){
        if(candidates[i]<=target){
          list.push(candidates[i]);
          toback(target-candidates[i],list,i);
          list.pop();
        }
      }
    }
    toback(target,[],0);
    return res
};

// 40.组合总和2 回溯算法加去重
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    var res=[];
    var newcandidates = candidates.sort(compare)
    function toback(target,list,index){
        if(target==0){
            res.push(list.slice(0));
        }
        if(index == newcandidates.length) {
          return;
        }
     
       for(var i=index;i<newcandidates.length;i++){
            if(newcandidates[i]<=target){
                list.push(candidates[i]);
                toback(target-newcandidates[i],list,i+1);
                list.pop();
                while(i < newcandidates.length - 1 &&  newcandidates[i] == newcandidates[i+1]) {
                    i++;
                }
            }
        }
    }
    function compare(value1, value2) {
        return value1 - value2;
    }
    toback(target,[],0);
    return res
};

// 41.缺失的的第一个正数 还是考虑负数记录位置是否存在
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    for (let index = 0; index < nums.length; index++) {
        if(nums[index] < 0) {
            nums[index] = 0;
        }
    }
    for (let index = 0; index < nums.length; index++) {
        var num  = Math.abs(nums[index]) - 1;
        if(num >= 0 && num < nums.length) {
            if(nums[num] == 0) {
                nums[num] = nums.length*-1;
            }else {
                nums[num] = Math.abs(nums[num])*-1;
            }
        }
    }
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        if(element >= 0 ) {
            return  index + 1;
        }
    }
    return  nums.length + 1;
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

//  43.字符串相乘
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    var length = num1.length + num2.length;
    var  result = "";
    for (let index = 0; index < length; index++) {
        result = result + "0";
    }

    for (let i = num1.length - 1; i > -1; i--) {
        var carry = 0;
        for (let j = num2.length - 1; j > -1; j--) {
            var sum = parseInt(result[i + j + 1]) + parseInt(num1[i])*parseInt(num2[j]) + carry;
            result = replacePos(result, i+j+2, String(sum%10));
            carry = parseInt(sum/10);
        }
        var carrySum = parseInt(result[i]) + carry;
        result = replacePos(result, i +1, String(carrySum));
    }
    while(result.length > 0 && result[0] == "0") {
        result = result.slice(1);
    }
    if(result.length == 0) {
        result = "0";
    }

    return result;

    function replacePos(strObj, pos, replacetext) {
        var str = strObj.substr(0, pos - 1) + replacetext + strObj.substring(pos, strObj.length);
        return str;
    }
};
// 这种方式应该稍微快一点
var multiply = function(num1, num2) {
    var maxLength  =  num1.length + num2.length; 
    var result = "";
    var carray = 0;
    for (let i = 0; i < maxLength - 1; i++) {
        let min = Math.max(i - num2.length + 1,0);
        var max  = Math.min(i,num1.length - 1);
        var sum = 0;
        for (let j = min; j <= max ; j++) {
            sum += num1[num1.length - 1 - j]*num2[num2.length - 1 - (i - j)]; 
        }
        sum += carray;
        result = String(sum%10) + result;
        carray = parseInt(sum/10);
    }
    if(carray > 0) {
        result = String(carray) + result;
    }
    while(result.length > 0 && result[0] == "0") {
        result = result.slice(1);
    }
    if(result.length == 0) {
        result = "0";
    }
    return result;
}


// 45. 跳跃游戏 II  顺藤摸瓜
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let end = 0;
    let maxPosition = 0;
    let steps = 0;
    for (let index = 0; index < nums.length -1; index++) {
        maxPosition = Math.max(maxPosition, nums[index] + index); 
        if(index == end) {
            end = maxPosition;
            steps++;
        }
    }
    return steps;
};
//46. 全排列  2个思路，1深度遍历 2.动态规划
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    var result = Array();
    permuteDFS(nums,Array(),result);
    return result;

    /**
     *
     *
     * @param {number[]} nums
     * @param {number[]} ans
     * @param {number[][]} result
     */
    function permuteDFS(nums, ans, result) {
        if (nums.length == 0) {
            result.push(ans);
        } else {
            for (let index = 0; index < nums.length; index++) {
                var newNums = nums.slice(0);
                newNums.splice(index, 1);
                var newAns = ans.slice(0);
                newAns.push(nums[index]);
                permuteDFS(newNums, newAns, result);
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
    var result = Array();
    myMap.forEach(function (item) {
        result.push(item);
    });

    return result;
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
        var result = "";
        stringArray.forEach(element => {
            result += element;
        });
        return result;
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

// 54.螺旋矩阵
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if(matrix.length == 0 || matrix[0].length == 0) {
        return [];
    }
    var result = Array();
    var xMin = -1;
    var xMax = matrix[0].length;
    var yMin = -1;
    var yMax = matrix.length;
    var direction = 0;
    var i = 0,j = 0;
    while (xMin < xMax - 1 && yMin < yMax - 1) {
        var nowD = direction%4;
        if (nowD == 0) {
            while(j < xMax) {
                result.push(matrix[i][j])
                j++;
            }
            j--;
            yMin++;
            i++;
        }
        if (nowD == 1) {
            while(i < yMax) {
                result.push(matrix[i][j])
                i++;
            }
            i--;
            xMax--;
            j--;
        }
        if (nowD == 2) {
            while(xMin < j) {
                result.push(matrix[i][j])
                j--;
            }
            j++;
            yMax--;
            i--;
        }
        if (nowD == 3) {
            while(yMin < i) {
                result.push(matrix[i][j])
                i--;
            }
            i++;
            xMin++;
            j++;
        }
        direction++;
    }
    return result;
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
    var result = Array();
    result.push(intervals[0])
    for (let index = 1; index < intervals.length; index++) {
        let element = intervals[index];
        if (result[result.length - 1].end < element.start) {
            result.push(element);
        } else {
            result[result.length - 1].end = Math.max(result[result.length - 1].end,element.end);
        }
    }
    return result;
};

// 58. 最后一个单词的长度 基本逻辑
var lengthOfLastWord = function(s) {
    let sArray = s.split(' ') 
    while(sArray.length > 0 && !sArray[sArray.length -1]) {
        sArray.pop();
    } 
    return sArray.length > 0 ?  sArray[sArray.length -1].length : 0
};

// 59 螺旋矩形2
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    if(n < 1) {
        return [];
    }
    var result = Array();
    var inArray = Array();
    for (let index = 0; index < n; index++) {
        inArray.push(0);
    }
    for (let index = 0; index < n; index++) {
        result.push(inArray.concat());
    }
    var xMin = -1;
    var xMax = result[0].length;
    var yMin = -1;
    var yMax = result.length;
    var direction = 0;
    var i = 0,j = 0;
    var num = 1;
    while (xMin < xMax - 1 && yMin < yMax - 1) {
        var nowD = direction%4;
        if (nowD == 0) {
            while(j < xMax) {
                result[i][j] = num++;
                j++;
            }
            j--;
            yMin++;
            i++;
        }
        if (nowD == 1) {
            while(i < yMax) {
                result[i][j] = num++;
                i++;
            }
            i--;
            xMax--;
            j--;
        }
        if (nowD == 2) {
            while(xMin < j) {
                result[i][j] = num++;
                j--;
            }
            j++;
            yMax--;
            i--;
        }
        if (nowD == 3) {
            while(yMin < i) {
                result[i][j] = num++;
                i--;
            }
            i++;
            xMin++;
            j++;
        }
        direction++;
    }
    return result;
};

// 61.旋转链表
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    if (head == null || head.next == null || k == 0) {
        return head;
    }

    var num = 1;
    var ponit = head;
    while(ponit.next) {
        num++;
        ponit = ponit.next;
    }
    if (k > num && k%num == 0){
        return head;
    }
    ponit.next = head;
    if (num > k ) {
        num = num - k;
    } else {
        num = num - k%num;
    }
    while (num > 1) {
        head = head.next;
        num--;
    }
    var newhead = head.next;
    head.next = null;
    return newhead;
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
    var result = 1;
    for (let index = 1; index < min; index++) {
        result = all*result;
        all--;
        result = result/index
    }
    return result;
};

// 63.不同路径2  递归肯定是超出时间限制的 所以需要用动态规划 
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    var backArray = [];
    for (let index = 0; index < obstacleGrid[0].length; index++) {
        if(obstacleGrid[0][index] == 1) {
            backArray.push(0);
        }else {
            if (index != 0) {
                backArray[index]= backArray[index - 1];
            } else {
                backArray.push(1);
            }
        }
    }
    for (let index = 1; index < obstacleGrid.length; index++) {
        let inArray = obstacleGrid[index];
        for (let i = 0; i < inArray.length; i++) {
            if(inArray[i] == 1) {
                backArray[i] = 0;
            } else {
                if (i != 0) {
                    backArray[i]= backArray[i] + backArray[i-1];
                } 
            }
        }
    }
    return backArray[backArray.length -1];
};

// 64. 最小路径和  其实也是动态规划，一排一排算最小值。
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    var lastArray = Array()
    for (let i = 0; i < grid.length; i++) {
        let line = grid[i];
        for (let j = 0; j < line.length; j++) {
            let num = line[j];
            if (i == 0) {
                if(j == 0) {
                    lastArray.push(num);
                } else {
                    lastArray.push(lastArray[lastArray.length - 1] + num);
                }
            } else {
                if (j == 0) {
                    lastArray[j] += num;
                } else {
                    lastArray[j] = Math.min(lastArray[j - 1],lastArray[j]) + num;
                }
            }
        }
    }
    return lastArray[lastArray.length - 1];
};

// 70. 爬楼梯 最经典的动态规划入门题吧   后一个正好是前2个的和
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if(n < 2) {
        return n;
    }
    var last = 1;
    var now = 2;
    for (let index = 2; index < n; index++) {
        let num =  last + now;
        last = now;
        now = num;
    }
    return now;
};

// 66. 加一 简单的逻辑计算 考虑 99情况即可
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    var num = digits.length - 1;
    while(num >= 0) {
        if(digits[num] != 9) {
            digits[num] = digits[num] + 1;
            return digits;
        } else {
            digits[num] = 0;
            num--;
        }
    }
    return [1].concat(digits);
};

// 67.二进制求和 遍历处理
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    var maxLength = Math.max(a.length,b.length);
    var result = "";
    var back = 0;
    for (let index = 0; index < maxLength; index++) {
        var num1 =  (a.length - 1 - index) >= 0 ? a.substr(a.length - 1 - index,1) : "0";
        var num2 = (b.length - 1 - index) >=0 ? b.substr(b.length - 1 - index,1) : "0";
        var num = parseInt(num1) + parseInt(num2) + back;
        back = num > 1 ? 1 : 0;
        var newStr =  (num == 1 || num == 3) ? "1" : "0";
        result =  newStr + result;
    }
    if(back > 0) {
        result = "1" + result;
    } 
    return result;
};

// 69. x 的平方根  二分查找
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    let l = 0;
    let r = Math.floor(x/2) +1;
    while (l < r) {
        let mid = Math.floor((r+l)/2);
        if(mid*mid > x) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return l*l > x ? l - 1 : l;
    
};

// 72. 编辑距离  其实是动态规划问题 但是要考虑到2维动态规划 ，需要一个二维数组

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    if (word1.length == 0) {
        return word2.length;
    }
    if (word2.length == 0) {
        return word1.length;
    }
    // 初始化
    var record = Array(word1.length + 1) 
    for (let index = 0; index < record.length; index++) {
        record[index] = Array(word2.length + 1)
        record[index][0] = index;
    }
    for (let index = 0; index < record[0].length; index++) {
        record[0][index] = index;
    }
    for (let row = 1; row < record.length; row++) {
        for (let index = 1; index < record[0].length; index++) {
            let char1 = word1.slice(row - 1,row)
            let char2 = word2.slice(index - 1,index) 
            if(char1 == char2) {
                record[row][index] = record[row - 1][index - 1];
            } else {
                record[row][index] = Math.min(record[row - 1][index - 1],record[row][index - 1],record[row - 1][index]) + 1
            }        
        }
    }
    return record[word1.length][word2.length];
};

// 75. 颜色分类  其实很简单 做2个标记就可以了
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {

    var swapAt = function(num1, num2) {
        let num =  nums[num2];
        nums[num2] = nums[num1];
        nums[num1] = num;
    } 

    var min = 0, index = 0, max = nums.length - 1;
    while (index <= max) {
        if(nums[index] == 0) {
            swapAt(min, index);
            min++;
            index++;
        } else if (nums[index] == 2) {
            swapAt(max, index);
            max--;
        }else {
            index++;
        }
    }
};

// 76. 最小覆盖子串  主要思路 窗口思路 左边一个位置右边一个位置 一个个查询。
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {

    var addNum = function(map, char) {
        var num = map.get(char)
        if (num) {
            map.set(char,num + 1);
        } else {
            map.set(char,1);
        }
    }

    var tMap = new Map();
    for (let index = 0; index < t.length; index++) {
        let char = t.charAt(index);
        addNum(tMap,char);
    }
    var found = 0, begain = -1, end = s.length , minLength = s.length, start = 0;
    var tapMap = new Map()
    for (let index = 0; index < s.length; index++) {
        let char = s.charAt(index);
        if(tMap.get(char)) {
            addNum(tapMap,char);
            if (tapMap.get(char) <= tMap.get(char)) {
                found++;
            }
            if(found == t.length) {
                var stop = 1
                while(start < index && stop == 1) {
                    let char = s.charAt(start);
                    var num = tapMap.get(char);
                    if(num && num > tMap.get(char)) {
                        tapMap.set(char, num -1);
                        start++;
                    } else if(num) {
                        stop = 0;
                    } else {
                        start++;
                    }
                }

                if (index - start < minLength) {
                    minLength = index - start
                    begain = start;
                    end = index;
                }
                let char = s.charAt(start);
                var num = tapMap.get(char);
                tapMap.set(char, num  - 1);
                found--; 
                start++;
            }
        }
    }
    return  (begain == -1) ? "": s.slice(begain, end+1);
};

// 77. 组合 回朔算法
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    let result = []
    dfs(1,[]);
    return result;
    function dfs(first,curr) {
        if(curr.length == k) {
            result.push([...curr])
            return
        }
        for (let i = first; i <= n; i++) {
            curr.push(i)
            dfs(i+1,curr)
            curr.pop()
        }
    }
};

// 78. 子集
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var subsets = function(nums) {
    var result = [[]]; 
    for (var num of nums) {  
      var temp = []
      for (var before of result) {
        temp.push(before.concat(num))
      }
      result = result.concat(temp);
    }
    return result;
}

// 79. 单词搜索  其实是深度遍历  细节很多需要思考
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {

    if ( !word || word.length == 0) {
        return true;
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] == word.charAt(0)) {
                let record = String(i) + "," + String(j);
                if(dfs(word.slice(1,word.length),[record],i,j)){
                    return true;
                } 
            }
        }
    }    
    return false;
    function dfs(word , records, i , j) {
        if ( !word || word.length == 0) {
            return true;
        }

        if (0 <= (i-1) && judge(i-1,j)){
            return true;
        }

        if (0 <= (j-1) && judge(i,j-1)){
            return true;
        }

        if ((i+1) < board.length &&judge(i+1,j)){
            return true;
        }

        if ((j+1) < board[i].length &&judge(i,j+1)){
            return true;
        }
        return false;
        
        function judge(i,j) {
            let record = String(i) + "," + String(j);
            if ((records.indexOf(record) == -1) && word.charAt(0) == board[i][j]) {
                if (dfs(word.slice(1,word.length),records.concat(record),i,j)) {
                    return true;
                }
            }
            return false;
        }
    }
};

// 80.删除排序数组中的重复项 II 基础逻辑

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    for (let i = 0; i<nums.length; i++){
       if (nums[i] == nums[i+2]){
           nums.splice(i--,1)
       }
   }
    return nums.length
};

// 82.删除列表中的重复元素 2 逻辑题
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    if(head == null) {
        return head;
    }
    var  start = new ListNode(head.val -1);
    start.next = head;
    var tap = head;
    var count = start.val;
    var begain = start;
    while(tap != null) {
        if(tap.val == count) {
            begain.next = tap.next;
            tap.next = null;
            tap = begain.next;
        } else {
            count = tap.val;
            if(tap.next != null && tap.val == tap.next.val) {
                begain.next = tap.next.next;
                tap = begain.next;
            } else {
                begain = tap;
                tap = tap.next;
            }
        }
    }
    return start.next;
};

 
// 84. 柱状图中最大的矩形 n复杂度算法  那么就要思考 如果是升序的话 这个问题就好处理了 如果不是升序则需要人为调成升序  单调栈
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    var listArray = Array();
    var index = 0, max = 0;
    while (index <heights.length) {
        if (listArray.length == 0 || heights[listArray[listArray.length -1]] <= heights[index]) {
            listArray.push(index);
            index++;
        }else {
            let last = listArray.pop();
            let topArea = heights[last]*(listArray.length == 0 ? index : index - listArray[listArray.length -1] - 1)
            max = Math.max(max, topArea);
        }
    }
    while (listArray.length > 0) {
        let last = listArray.pop();
        let topArea = heights[last]*(listArray.length == 0 ? index  : index - listArray[listArray.length- 1] - 1)
        max = Math.max(max, topArea);
    }

    return max;
};

// 83. 删除排序链表中的重复元素  map记录，逻辑题
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    let tob = new ListNode(0);
    tob.next = head;
    let backup = new Map()
    let next = tob;
    while (next.next) {
        if(backup.get(next.next.val)) {
            next.next =  next.next.next;
        } else {
            backup.set(next.next.val,true);
            next = next.next;
        }
    }
    return tob.next;
};

//  85. 最大矩形  首先把问题变为1维问题 然后其实就是单调栈问题了  其实就变成了问题 84 这里偷懒直接调用了84 的方法

/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
    if (matrix.length == 0) {
        return 0;
    }
    var max = 0;
    var heights = Array();
    for (let index = 0; index < matrix[0].length; index++) {
        heights.push(0)
    }
    for (let row = 0; row < matrix.length; row++) {
        var list = matrix[row];
        for (let index = 0; index < list.length; index++) {
            if (matrix[row][index] == "1") {
                heights[index] += 1;
            } else {
                heights[index] = 0;
            }
        }
        max = Math.max(max, largestRectangleArea(heights.slice(0)));
    }
    return max;
};

//86. 分隔链表 摘出大数再归并到数组末端
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    var newHand = new ListNode(0);
    var back = new ListNode(0);
    var bNode = back;
    newHand.next = head;
    var node = newHand;
    while(node.next != null) {
        if(node.next.val >= x) {
            bNode.next =  node.next;
            node.next = node.next.next;
            bNode = bNode.next;6
            bNode.next = null;
        } else {
            node = node.next;
        }
    }
    node.next = back.next;
    return newHand.next;
};

// 88.合并2个有序数组 从尾部开始存放

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {

    var i = m - 1, j = n - 1 ;
    var num = m + n  - 1 ;
    while (i > -1 && j > -1) {
        if(nums1[i] > nums2[j]) {
            nums1[num] = nums1[i];
            i--;
        } else {
            nums1[num] = nums2[j];
            j--;
        }
        num--;
    }
    while (i > -1) {
        nums1[num] = nums1[i];
        i--;
        num--;
    }
    while (j > -1) {
        nums1[num] = nums2[j];
        j--;
        num--;
    }
};

// 89.格雷编码  递归思想~动态规划
/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function(n) {
    if(n == 0) {
        return [0];
    }
    var result = [0,1];
    var stap = 1;
    while(stap < n) {
        var num =  Math.pow(2,stap) - 1;
        while(num > -1) {
            result.push(result[num] + Math.pow(2,stap))
            num--;
        }
        stap++;
    }
    return result;
};

// 92. 反转链表 II  递归 加回朔 
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
    let left = head;
    let stop = false;
    backAction(head,m,n);
    return head;
    function backAction(right,m,n) {
        if(n == 1) {return};
        right = right.next;
        if(m > 1) {
            left = left.next;
        }
        backAction(right,m-1,n-1);
        if(left == right || right.next == left) {
            stop = true;
        }
        if(!stop) {
            let t = left.val;
            left.val = right.val;
            right.val = t;
            left = left.next;
        }
    }
};

//93.复原IP地址 可以看成插入三个点 分割成4个地址，但是要校验地址的正确性，1.首位不为0 2. 小于255 可以用回溯算法
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    if (s.length < 4) {
        return [];
    } 
    var result = Array()
    dfs(0,3,"");
    function dfs (start, n, ipSring) {
        if( n == 0) {
            var newString = s.substr(start,s.length-start);
            if(correct(newString)) {
                newString = ipSring + "." + newString;
                result.push(newString);
            }
            return;
        }
        if ((s.length - start) <= n) {
            return;
        } ;
        var min = Math.min(3,s.length - start) + 1;
        for (let index = 1; index < min; index++) {
            var newString = s.substr(start,index);
            if(correct(newString)) {
                newString = ipSring.length > 0 ? ipSring + "." + newString : newString;
                var newNum = n - 1;
                var newStrat =  start + index;
                dfs(newStrat, newNum,newString);
            }
        }

        function correct(checkString) {
            if(checkString.length == 1) {
                return true;
            }
            if ((checkString.length > 0 )&&(checkString.substr(0,1) != "0")) {
              return parseInt(checkString) < 256;
            }
            return false;
        }
        
    }
    return result;
};
// 94. 二叉树的中序遍历  递归写法
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    var result  = Array();
    traverse(root);
    function traverse(root) {
        if(root) {
            traverse(root.left);
            result.push(root.val);
            traverse(root.right);
        }
    }
    return result;
};
// 94. 二叉树的中序遍历  迭代写法 其实递归就是一个堆栈
var inorderTraversal2 = function(root) {
    var result = Array()
    var stack = Array()
    if(root) {
        stack.push(root);
    }
    while(stack.length > 0) {
       var last = stack[stack.length - 1];
       if (last.left) {
           stack.push(last.left);
           last.left = null;
       } else {
           stack.pop();
           result.push(last.val);
           if(last.right) {
            stack.push(last.right);
           }
       }
    }
    return result;
};

// 96. 不同的二叉搜索树  动态规划，问题可以分解
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
    if (n < 2) {
        return 1;
    } 
    var listArray = Array(n+1);
    listArray[0] = 1;
    listArray[1] = 1;
    for (let i = 2; i <= n; i++) {
        listArray[i] = 0;
        for (let j = 0; j < i; j++) {
            listArray[i] =  listArray[i] + listArray[j]*listArray[i - j - 1];
        }
    }
    return listArray[n];
};

// 98. 验证二叉搜索树  
// 节点的左子树只包含小于当前节点的数。 
// 节点的右子树只包含大于当前节点的数。
// 所有左子树和右子树自身必须也是二叉搜索树。
// 所以可以用中序遍历来解决这个问题
var isValidBST = function(root) {
    var result = Array()
    var stack = Array()
    if(root) {
        stack.push(root);
    }
    while(stack.length > 0) {
       var last = stack[stack.length - 1];
       if (last.left) {
           stack.push(last.left);
           last.left = null;
       } else {
           stack.pop();
           if( result.length > 0 && result[result.length -1] >= last.val) {
               return false;
           }
           result.push(last.val);
           if(last.right) {
            stack.push(last.right);
           }
       }
    }
    return true
};

// 100. 相同的树  第一个印象 就是递归 
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if (p == null || q == null) {
        if(p == q) {
            return true;
        } else {
            return false;
        }
    }

    return p.val == q.val && isSameTree(p.left,q.left) && isSameTree(p.right,q.right); 
};

// 101. 对称二叉树 其实与判断两棵树是否相等类似，这里只是判断2颗数是否对称 如果对称 左边等于右边
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {

    if (root == null) {
        return true;
    }
    return isSymmetricTwo(root.left, root.right);
    
    function isSymmetricTwo(p,q) {
        if (p == null || q == null) {
            if(p == q) {
                return true;
            } else {
                return false;
            }
        }
        return p.val == q.val && isSameTree(p.left,q.right) && isSameTree(p.right,q.left); 

    }
};

//  102. 二叉树的层次遍历 递归存储子序列
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (root == null) {
        return [];
    }
    var stack = [root];
    var result = Array();
    while (stack.length != 0) {
        var rowArray = Array()
        var nextArray = Array()
        for (let index = 0; index < stack.length; index++) {
            var element = stack[index];
            rowArray.push(element.val);
            if (element.left != null) {
                nextArray.push(element.left);
            }
            if (element.right != null) {
                nextArray.push(element.right);
            }
        }
        stack = nextArray;
        result.push(rowArray);
    }
    return result;
};
// 103.二叉树的锯齿层次遍历 在上面的基础上做了反转而已
var zigzagLevelOrder = function(root) {
    if (root == null) {
        return [];
    }
    var stack = [root];
    var result = Array();
    var num = 1;
    while (stack.length != 0) {
        var rowArray = Array()
        var nextArray = Array()
        for (let index = 0; index < stack.length; index++) {
            var element = stack[index];
            rowArray.push(element.val);
            if (element.left) {
                nextArray.push(element.left);
            }
            if (element.right) {
                nextArray.push(element.right);
            }
        }
        if(num%2 == 0) {
            rowArray.reverse();
        }
        num++;
        stack = nextArray;
        result.push(rowArray);
    }
    return result;
};


//  104. 二叉树的最大深度
var maxDepth = function(root) {
    if (root == null) {
        return 0;
    }
    var stack = [root];
    var result = 1;
    while (stack.length != 0) {
        var rowArray = Array()
        var nextArray = Array()
        for (let index = 0; index < stack.length; index++) {
            var element = stack[index];
            rowArray.push(element.val);
            if (element.left != null) {
                nextArray.push(element.left);
            }
            if (element.right != null) {
                nextArray.push(element.right);
            }
        }
        stack = nextArray;
        result++;
    }
    return result;
};

// 递归写法
var maxDepth = function(root) {
    if(root  == null) {
        return 0
    }
    return Math.max(maxDepth(root.left),maxDepth(root.right)) + 1;
};

// 105. 从前序与中序遍历序列构造二叉树  递归 注意防止递归过程中数组爆炸
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if (preorder.length > 0 && inorder.length > 0) {
        return bildTreeWithSize(0,preorder.length - 1,0,inorder.length - 1);
    }
    return null; 

    function bildTreeWithSize(bStart,bEnd,mStrat,mEnd) {
        if (bStart == bEnd) {
            return new TreeNode(preorder[bStart]);
        }
        var root = preorder[bStart];
        var tree = new TreeNode(root);
        var num = inorder.indexOf(root);
        if (mStrat <= num - 1) {
            tree.left = bildTreeWithSize(bStart + 1, bStart + num - mStrat, mStrat, num - 1)
        } 
        
        if (num + 1 <= mEnd) {
            tree.right = bildTreeWithSize( bEnd + num + 1 - mEnd, bEnd, num + 1, mEnd)
        }
        return tree;
    }
};

// 106.从中序与后序遍历序列构造二叉树 递归
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    if(postorder.length == 0) {return null};
    let root =  new TreeNode(postorder[postorder.length -1]);
    let num = inorder.indexOf(root.val);
    let left = inorder.slice(0,num);
    let right = inorder.slice(num+1);
    root.left = buildTree(inorder.slice(0,num),postorder.slice(0,num));
    root.right = buildTree(inorder.slice(num+1),postorder.slice(num,inorder.length-1))
    return root;
};
// 107 二叉树的层序遍历2 遍历完成后反转
var levelOrderBottom = function(root) {
    if (root == null) {
        return [];
    }
    var stack = [root];
    var result = Array();
    while (stack.length != 0) {
        var rowArray = Array()
        var nextArray = Array()
        for (let index = 0; index < stack.length; index++) {
            var element = stack[index];
            rowArray.push(element.val);
            if (element.left) {
                nextArray.push(element.left);
            }
            if (element.right) {
                nextArray.push(element.right);
            }
        }
        stack = nextArray;
        result.push(rowArray);
    }
    result.reverse();
    return result;
};

// 108. 将有序数组转换为二叉搜索树 基础逻辑题 
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    if(nums.length == 0 || nums == null) {return null};
    let mid = Math.floor(nums.length/2);
    let root = new TreeNode(nums[mid]);
    root.left = sortedArrayToBST(nums.slice(0,mid))
    root.right = sortedArrayToBST(nums.slice(mid+1,nums.length))
    return root;
};

//  109. 有序链表转换二叉搜索树  转数组 递归创建
var sortedListToBST = function(head) {
    let backup = [];
    let node = head;
    while(node != null) {
        backup.push(node.val);
        node = node.next;
    }
    return creatNode(backup);
    function creatNode(nums) {
        let length = nums.length;
        if(length == 0) {
            return null;
        }
        let num = Math.floor(length/2);
        let root = new TreeNode(nums[num]);
        root.left = creatNode(nums.slice(0,num));
        root.right = creatNode(nums.slice(num+1));
        return root;
    }
};

// 110.平衡二叉树 深度遍历 递归
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {

    return dfs(root) != -1;
    function dfs(node) {
        if(!node) { return 0} 
        let left = dfs(node.left);
        if(left == -1) {return -1};
        let right = dfs(node.right);
        if(right == -1) {return -1};
        if(Math.abs(left - right) > 1) {
            return -1;
        }
        return Math.max(left,right) + 1;
    }
};

// 111. 二叉树的最小深度 递归
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    
    if(!root) { return 0};
    let minNum = Infinity;
    dfs(root,1);
    function dfs(node,num) {
        if(node.left) {
            dfs(node.left,num +1);
        } 
        if(node.right) {
            dfs(node.right,num+1)
        }
        if(!node.left && !node.right) {
            minNum = Math.min(minNum,num);
        }
    }
    return minNum;
};


// 112. 路径总和  递归
var hasPathSum = function(root, sum) {
    if(root == null) {return false}
    if(root.left == null && root.right == null) {
        return root.val - sum == 0;
    }
    return hasPathSum(root.left,sum - root.val) || hasPathSum(root.right,sum - root.val)
};

// 113.路径总和 2  回朔算法 递归算法 都可以

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
    var result = Array();
    var listArray = Array();
    backBFS(root,listArray,sum);
    function backBFS(root,listArray,sum) {
        if(!root){return;}
        if(root.left || root.right) {
            listArray.push(root.val);
            var newNum = sum - root.val;
            if(root.left) {
                backBFS(root.left,listArray,newNum);
            }
            if(root.right) {
                backBFS(root.right,listArray,newNum);
            }
            listArray.pop()
            return;
        } else {
            if(sum == root.val) {
                listArray.push(root.val);
                result.push(listArray.concat())
                listArray.pop();
                return;
            }
        }
    }
    return result;
};

// 114. 二叉树展开为链表 需要原地算法  递归算法 左边的树挂到右边
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
    if (root == null) {
        return;
    }
    flatten(root.left);
    flatten(root.right);
    if (root.left != null) {
        if (root.right == null) {
            root.right = root.left;
            root.left = null;
        }else {
            var next = root.left;
            while (next.right != null) {
                next = next.right; 
            }
            next.right = root.right;
            root.right = root.left;
            root.left = null;
        }    
    }
};
// 网上更加 简单的写法 
var flatten = function(root) {
    var node = root;
    while(node != null) {
        if (node.left != null) {
            var rNode = node.left;
            while (rNode.right != null) {
                rNode = rNode.right;
            }
            rNode.right = node.right;
            node.right = node.left;
            node.left = null;
        }
        node = node.right;
    }
}

// 116. 填充每个节点的下一个右侧节点指针  二叉树的层序遍历
/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    if(root == null) {return null};
    let backup = [root];
    while(backup.length > 0) {
        let inArray = [];
        for (let index = 0; index < backup.length; index++) {
            let node = backup[index];
            if(index < backup.length - 1) {
                node.next = backup[index +1];
            }
            if(node.left) {
                inArray.push(node.left);
            }
            if(node.right) {
                inArray.push(node.right);
            }
        }
        backup = inArray;
    }
    return root;
};

// 117. 填充每个节点的下一个右侧节点指针 II 同116  层序遍历
var connect = function(root) {
    if(root == null) {return null};
    let backup = [root];
    while(backup.length > 0) {
        let inArray = [];
        for (let index = 0; index < backup.length; index++) {
            let node = backup[index];
            if(index < backup.length - 1) {
                node.next = backup[index +1];
            }
            if(node.left) {
                inArray.push(node.left);
            }
            if(node.right) {
                inArray.push(node.right);
            }
        }
        backup = inArray;
    }
    return root;
};

//  118. 杨辉三角 按照逻辑相加
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    if(numRows == 0) {return []}
    if(numRows == 1) {return [[1]]}
    if(numRows == 1) {return [[1],[1,1]]}
    var result = [[1],[1,1]] 
    var num = 2;
    while(num < numRows) {
        num++;
        var  back = [1];
        for (let index = 1; index < num - 1; index++) {
            var newNum = result[result.length - 1][index -1] + result[result.length - 1][index]
            back.push(newNum);
        }
        back.push(1);
        result.push(back);
    }
    return result;
};

// 119. 杨辉三角 II  基础逻辑题
var getRow = function(rowIndex) {
    if (rowIndex == 0) { return [1] };
    if (rowIndex == 1) { return [1,1] };
    var num = rowIndex - 1;
    var result = [1,1];
    while (num > 0 ) {
        var newArray = [1];
        for (let index = 1; index < result.length; index++) {
            newArray.push(result[index -1] + result[index])
        }
        newArray.push(1);
        result = newArray
        num -- ;
    }
    return result
};

// 120.三角形最小路径和  动态规划 计算每层最小值
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
    if(triangle.length == 1) { return triangle[0][0]; }
    var backArray = triangle[0];
    for (let index = 1; index < triangle.length; index++) {
        var newArray = triangle[index];
        var  newBack = [];
        newBack.push(backArray[0] + newArray[0]);
        for (let index = 1; index < newArray.length - 1; index++) {
            var num = newArray[index] + Math.min(backArray[index -1],backArray[index])
            newBack.push(num);
        }
        newBack.push(backArray[backArray.length -1] + newArray[newArray.length -1]);
        backArray = newBack;
    }
    var result = backArray[0];
    for (let index = 1; index < backArray.length; index++) {
        result = Math.min(result,backArray[index]);
    }
    return result;
};
// 倒着算 更快 但是破坏了 结构
let minimumTotal2 = function(triangle) {
    for (let row = triangle.length - 2; row >= 0; --row) {
        for (let col = 0; col < triangle[row].length; ++col) {
            triangle[row][col] += Math.min(triangle[row + 1][col], triangle[row + 1][col + 1]);
        }
    }
    return triangle[0][0];
};

// 121. 买卖股票的最佳时机  记录最小值 每次计算对比就好了

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (prices.length == 0) {
        return 0;
    }
    var min = prices[0];
    var maxD = 0;
    for (var num of prices) {
        if (min  <  num) {
            maxD = Math.max(maxD, num - min);
        } else {
            min = num;
        }
    }
    return maxD;
};

// 122.买卖股票的最佳时机2 贪心算法
/**
 * @param {number[]} prices 
 * @return {number}
 */
var maxProfit = function(prices) {
    var result = 0;
    for (let index = 1; index < prices.length; index++) {
        result += Math.max(0,prices[index] - prices[index -1]);
    }
    return result;
};

// 124. 二叉树中的最大路径和 考虑递归
var maxPathSum = function(root) {
    if (root == null) {
        return 0;
    } 
    var maxNum = root.val;
    maxPathSumToRoot(root);
    function maxPathSumToRoot(root){
        if (root == null) return 0;
        var left = Math.max(maxPathSumToRoot(root.left),0);
        var right = Math.max(maxPathSumToRoot(root.right),0);
        maxNum = Math.max(maxNum, left + right + root.val);
        return Math.max(left,right) + root.val;
    } 
    return maxNum;
};

// 125.验证回文串  双指针 
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    s = s.toLowerCase()
    let start = 0;
    let end = s.length - 1;
    let reg= /^[a-z0-9]+$/;
    while(start < end) {
        let startChar = s[start];
        let endChar = s[end];
        if(!reg.test(startChar)) {
            start++;
        } else if(!reg.test(endChar)) {
            end--;
        } else {
            if(startChar != endChar) {
                return false;
            }
            start++;
            end--;
        }
    }
    return true;
};

// 128. 最长连续序列  空间换时间 用map
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    var recordMap = new Map();
    var max = 0;
    for(var num of nums) {
        if (recordMap.get(num) != null) {
            continue;
        }
        var left =  recordMap.get(num - 1) == null ? 0 : recordMap.get(num - 1);
        var right =  recordMap.get(num + 1) == null ? 0 : recordMap.get(num + 1);
        var inNum = left + right + 1;
        recordMap.set(num,inNum);
        recordMap.set(num - left, inNum);
        recordMap.set(num + right, inNum);
        max = Math.max(max, inNum);
    }
    return max;
};

// 129. 求根到叶子节点数字之和  二叉树递归遍历
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
    let sum = 0;
    dfs(root,0)
    return sum;
    function dfs(node,num) {
        if(node == null) {return}
        let newNum = num*10 + node.val
        if(node.left == null && node.right == null) {
            sum += newNum;
        } else {
            dfs(node.left ,newNum);
            dfs(node.right,newNum)
        }
    }
    
};
// 130. 被围绕的区域 Union-Find 算法
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
    class UF {
        constructor(num) {
            this.count = num;
            this.size = Array(num)
            this.parent = Array(num)
            for (let i = 0; i < num; i++) {
                this.parent[i] = i;
                this.size[i] = 1;
            }
        }
        union(p,q) {
            let rootP = this.find(p)
            let rootQ = this.find(q)
            if(rootP == rootQ) {
                return
            }
            if (this.size[rootP] > this.size[rootQ]) {
                this.parent[rootQ] = rootP;
                this.size[rootP] += this.size[rootQ];
            } else {
                this.parent[rootP] = rootQ;
                this.size[rootQ] += this.size[rootP];
            }
            this.count--
        }
        connected(p,q) {
            let rootP = this.find(p)
            let rootQ = this.find(q)
            return rootP == rootQ
        }
        find(x) {
            while(this.parent[x] != x) {
                // 进行路径压缩
                this.parent[x] = this.parent[this.parent[x]];
                x = this.parent[x];
            }
            return x;
        }
    }
    if(board.length == 0) {return}
    let m = board.length,n = board[0].length
    let uf = new UF(m*n+1),dummy = m*n
    for (let i = 0; i < m; i++) {
        if(board[i][0] == 'O') {
            uf.union(i*n,dummy)
        }
        if(board[i][n-1] == 'O') {
            uf.union(i*n + n-1,dummy)
        }
    }
    for (let i = 0; i < n; i++) {
        if(board[0][i]== 'O') {
            uf.union(i,dummy)
        }
        if(board[m-1][i]== 'O') {
            uf.union(n * (m - 1) + i,dummy)
        }
    }
    let d = [[1,0],[0,1],[0,-1],[-1,0]]
    for (let i = 1; i < m-1; i++) {
        for (let j = 1; j < n-1; j++) {
            if(board[i][j] == 'O') {
                for (let k = 0; k < 4; k++) {
                    let x = i + d[k][0],y = j + d[k][1]
                    if(board[x][y] == 'O') {
                        uf.union(x * n + y, i * n + j);
                    }
                }
            }
            
        }
    }
    for (let i = 1; i < m-1; i++) {
        for (let j = 0; j < n-1; j++) {
            if (!uf.connected(dummy, i * n + j)) {
                board[i][j] = 'X'
            }
        }
    }
    return board;
};
// 134. 加油站 基础逻辑题 
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    let sum = 0, run = 0,  start = 0;
    for (let i = 0; i < gas.length; i++) {
        let num = gas[i] - cost[i];
        sum += num;
        run += num;
        if(run < 0) {
            start = i +1;
            run = 0;
        }
    }
    return  sum < 0 ? -1 : start;
};

// 136. 只出现一次的数字 想到运算符 就很简单 与运算 2个一样的数就被抵消了 留下来的就是只出现一次的
var singleNumber = function(nums) {
    var result = 0;
    for (var num of nums) {
        result ^= num;
    }
    return result;
};

// 137.只出现一次的数字  获取所有数的和以及单个数的和 再计算
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let backup = new Map()
    let oneSum = 0;
    let sum = 0;
    for(let num of nums) {
        sum += num;
        if(backup.get(num) == null) {
            oneSum +=num;
            backup.set(num,num);
        }
    }
    return (oneSum*3 - sum)/2 
};

// 139. 单词拆分   这个题要思索下，其实要想到 前面一部分如果能被分割 增加一个能分割的元素肯定也能被分割 所以就想到了 记录之前值的 动态规划
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    if (s.length == 0) {
        return true;
    }
    var segmentation = Array(s.length + 1)
    segmentation[0] = true;
    for (let i = 1; i <= s.length; i++) {
        var j =  i - 1
        while (j >= 0) {
            if (segmentation[j]) {
                var indexStr = s.substr(j,i-j);
                if(wordDict.indexOf(indexStr) != -1) {
                    segmentation[i] = true;
                    break;
                }
            }
            j--;
        }
    }
    return segmentation[s.length] ?  true : false;
};

// 141. 环形链表 判断是否为环形链表， 可以设置快慢指针快速遍历  环形问题 很多用快慢指针
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if (head == null) {
        return false;
    }
    var slow = head;
    var fast = head.next;
    while (fast) {
        if (slow == fast) {
            return true;
        }
        slow = slow.next;
        fast = fast.next;
        if(fast) {
            fast = fast.next;
        }
    }
    return false;
};
// 142. 环形链表 II  主要要考虑链表不是一个循环 是一个循环还有一条线有可能，所以有入口点
var detectCycle = function(head) {
    var slow = head;
    var fast = head;
    while(true) {
        if (fast == null || fast.next == null) {
            return null;
        }
        slow = slow.next;
        fast = fast.next.next;
        if (fast == slow) {
            break;
        }
    }
    slow = head;
    while(slow != false) {
        slow = slow.next;
        fast = fast.next;
    }
    return slow;
};

// 143. 重排链表  快慢指针 找到后面的链表反转再拼接
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {

    if(!head) {return null}
    var fast =  head.next;
    var slow = head;
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next;
        fast = fast.next;
    }
    var newNode = slow.next;
    slow.next = null;
    newNode = reverse(newNode);
    var fast = head;
    while(newNode) {
        var back = fast.next;
        fast.next = newNode;
        newNode = newNode.next;
        fast.next.next = back;
        fast = back;
    }
    return head;

    function reverse(head) {
        var newHead = null;
        while(head) {
            var stage = head.next;
            head.next = newHead;
            newHead = head;
            head = stage;
        }
        return newHead;
    };
};

//144. 二叉树的前序遍历 递归遍历
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    var result = [];
    dfs(root)
    function dfs(node) {
        if(node == null) {return }
        result.push(node.val);
        dfs(node.left);
        dfs(node.right);
    }
    return result;
};

// 145. 二叉树的后序遍历  递归
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
var postorderTraversal = function(root) {
    let result = [];
    dfs(root);
    function dfs(node) {
        if(node == null) {
            return;
        }
        dfs(node.left);
        dfs(node.right);
        result.push(node.val);
    }
    return result;
};

// 148. 排序链表 归并排序 先用快慢指针做拆分
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
    if(head == null || head.next == null) {
        return head;
    }
    var fast = head.next;
    var slow = head;
    while(fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }
    var next = slow.next;
    slow.next = null;
    
    var merge1 = sortList(head);
    var merge2 = sortList(next);
    return mergeAction(merge1,merge2);
    function mergeAction (merge1, merge2) {
        var head = new ListNode(0);
        var next = head;
        while(merge1 && merge2) {
            if(merge1.val < merge2.val ) {
                next.next = merge1;
                next = merge1;
                merge1 = merge1.next;
            } else {
                next.next = merge2;
                next = merge2;
                merge2 = merge2.next;
            }
        }
        if (merge1) {
            next.next = merge1;
        }
        if (merge2) {
            next.next = merge2;
        }
        return head.next;
    }
};

// 151.翻转字符串里的单词  可以用字符串分割然后倒叙遍历 添加的方式
/**
 * @param {string} str
 * @returns {string}
 */
var reverseWords = function(str) {
    var result = "";
    var stage ="";

    var newStr = str + " ";
    for(let char of newStr) {
        if (char == " ") {
            if(stage.length > 0){
                result = result.length > 0 ? stage + " " + result : stage;
                stage = "";
            }
        } else {
            stage += char.toString(); 
        }
    }
    return result;
};


// 152. 乘积最大子序列 负负得正 所以要记录最大正数 以及最小负数 （题目默认至少有一个数）
var maxProduct = function(nums) {
    var conMax = 1, conMin = 1, result = nums[0];
    for (var num of nums) {
       var inMax = Math.max(num, num*conMax, num*conMin);
       var inMin = Math.min(num, num*conMax, num*conMin);
       conMax = inMax;
       conMin = inMin;
        result = Math.max(conMax, result);
    }
    return result;
};

// 153. 寻找旋转排序数组中的最小值 二分查找法
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    return findNum(0,nums.length -1);
    function findNum(start,end) {
        if(start == end) { return nums[start]}
        let startNum = nums[start];
        let endNum = nums[end];
        if (startNum < endNum) {
            return nums[start];
        }
        let mid = Math.floor((end +start)/2 );
        midNum = nums[mid];
        if(startNum < midNum) {
            return findNum(mid+1,end);
        } else {
            return findNum(start+1,mid);
        }
    }
};


// 155. 最小堆  在用一个堆去记录最小值
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.listArray =  Array();
    this.minArray = Array();
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.listArray.push(x);
    if (this.listArray.length == 1) {
        this.minArray.push(0);
    } else {
        var num = this.minArray[this.minArray.length - 1];
        if(x < this.listArray[num]) {
            this.minArray.push(this.listArray.length - 1);
        }
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    if (this.listArray.length == 0) {
        return;
    }
    if(this.minArray[this.minArray.length - 1] == this.listArray.length - 1) {
        this.minArray.pop();
    }
    this.listArray.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    if (this.listArray.length == 0) {
        return nil;
    }
    return this.listArray[this.listArray.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    if (this.listArray.length == 0) {
        return nil;
    }
    return this.listArray[this.minArray[this.minArray.length - 1]];
};
 
// 160. 相交链表 思路1.  其实把一个链表遍历到尾部 指向 第二个链表头部 就是一个循环链表了   思路2 指向同一个点 后面肯定是长度一样 所以先把他们切割成一样长度 然后一起遍历
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {

    var headAL = ListNodeLength(headA);
    var headBL = ListNodeLength(headB);
    var conA = headA;
    var conB = headB;
    if (headAL > headBL) {
        while(headAL != headBL) {
            conA = conA.next;
            headAL--;
        }
    } else {
        while(headAL != headBL) {
            conB = conB.next;
            headBL--;
        }
    }
    while (conA && conB) {
        if (conA == conB) {
            return conA;
        }else {
            conA = conA.next;
            conB = conB.next;
        }
    }
    return null;

    function ListNodeLength(head) {
        var num = 0;
        while(head) {
            num++;
            head = head.next;
        }
        return num;
    }
};

// 162. 寻找峰值 二分查找大的一侧肯定有峰值 因为nums[-1] = nums[n] = -∞
/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    let left = 0;
    let right = nums.length -1;
    while(left <right) {
        let mid = Math.floor((left + right)/2)
        if(nums[mid] > nums[mid +1]) {
            right = mid;
        } else {
            left = mid +1;
        }
    }
    return left;
};

// 164. 最大间距
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function(nums) {
    if(nums.length < 3) {
        return 0;
    }
    nums.sort(compare)
    var result = 0;
    var back = nums[0];
    for (let index = 1; index < nums.length; index++) {
        const element = nums[index];
        result = Math.max(result,element - back);
        back = element;
    }
    return result;
    function compare(value1, value2) {
        return value1 - value2;
    }
};
// 木桶排序算法大小桶
var maximumGap = function(nums) {
    if(nums.length < 2){
        return 0;
    }
    var len = nums.length;
    var max = nums[0];
    var min = nums[0];
    for(var i = 1;i < len;i++){
        max = Math.max(max,nums[i]);
        min = Math.min(min,nums[i]);
    }
    var gap = Math.floor((max-min)/len) + 1;
    var bucketMax = new Array(len).fill(-Infinity);
    var bucketMin = new Array(len).fill(Infinity);
    for(var i = 0;i < len;i++){
        var index = Math.floor((nums[i] - min) / gap);
        bucketMax[index] = Math.max(bucketMax[index],nums[i]);
        bucketMin[index] = Math.min(bucketMin[index],nums[i]);
    }
    var ans = 0;
    var pre = bucketMax[0];
    for(var i = 1;i < len;i++){
        if(bucketMin[i] != Infinity){
            ans = Math.max(ans,bucketMin[i]-pre);
            pre = bucketMax[i];
        }
    }
    return ans;
};
// 165. 比较版本号  逻辑判断
var compareVersion = function(version1, version2) {
    let v1 = version1.split('.')
    let v2 = version2.split('.')
    let index = 0;
    let min = Math.min(v1.length,v2.length)
    while(index < min) {
        let num1 = parseInt(v1[index])
        let num2 = parseInt(v2[index])
        if(num1 >num2) {
            return 1
        } else if(num1 < num2) {
            return -1
        } else {
            index++;
        }
    }
    if(v1.length != v2.length) {
        let back = v1.length > v2.length ? 1 : -1;
        let array =  back == 1 ? v1 : v2;
        while(index < array.length) {
            if(array[index] != 0) {
                return back
            } else {
                index++;
            }
        }
    }
    return 0;
};

// 168. Excel表列名称  10进制转26进制 辗转相除法
/**
 * @param {number} n
 * @return {string}
 */
var convertToTitle = function(n) {
    var result = '';
    while(n > 0) {
        result = String.fromCharCode( (n-1)%26 +65) + result;
        n = Math.floor((n-1)/26);
    } 
    return result;
};
// 169. 求众数 摩尔投票算法
var majorityElement = function(nums) {
    var major = nums[0];
    var count = 0;
    for (var num of nums) {
        if (major == num) {
            count++;
        } else {
            count--;
            if (count == 0) {
                major = num;
                count = 1;
            }
        }
    }
    return major;
};

// 172. 阶乘后的零  因为0是5*2产生的，所以要数5 与2 的个数，明显5的个数远小于2 所以只要数下5出现的个数就好
var trailingZeroes = function(n) {
    let a=0;
    while(n>=5){
        n=parseInt(n/5)
        a+=n
    }return a;
};

/// 179. 最大数 排序
/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {
    nums.sort(compare)
    let result = ""
    for(let num of nums) {
        result += String(num); 
    }
    return parseInt(result)


    function compare (a,b) {
        let num1 = parseInt(String(a) + String(b)) 
        let num2 = parseInt(String(b) + String(a)) 
        return num2 - num1
    }
};
// 189. 旋转数组 两个自带的方法搞定
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    let l = nums.length;
    k %= l
    nums.unshift(...nums.splice(nums.length - k, k))
};

// 191.位1的个数
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    var count = 0;
    var  flag = 1;
    while(flag != 0) {
        if(flag & n) {
            count++;
        }
        flag = flag << 1;
    }
    return count;
};

// 198. 打家劫舍  动态规划 考虑没有多一家 最大值肯定是打了前一家与没打前一家加多一家里取的最大值
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    var have = 0, noHave = 0;
    for (var num of nums) {
        var began = have;
        have = Math.max(have, noHave + num);
        noHave = Math.max(noHave, began);
    }
    return Math.max(have, noHave);
};

// 199. 二叉树的右视图  递归二叉树的层序遍历
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
var rightSideView = function(root) {
    if(!root) {return []}
    let result = []
    let backup =[root]
    while(backup.length > 0) {
        result.push(backup[backup.length -1].val);
        let newBackup =[];
        for(let node of backup) {
            if(node.left) {
                newBackup.push(node.left)
            } 
            if(node.right) {
                newBackup.push(node.right)
            }
        }
        backup = newBackup
    }
    return result
};

// 201. 数字范围按位与  其实就是低位变零高位不变 位运算
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var rangeBitwiseAnd = function(m, n) {
    let count = 0;
    while(m != n) {
        m >>= 1
        n >>= 1
        count++
    }
    n <<= count
    return n;
};

// 202. 快乐数 递归
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
    if(n == 1 || n == 7) {
        return true;
    }
    if (n < 10) {
        return false;
    }
    let sum = 0;
    while(n >= 1) {
        let num = n%10;
        n = Math.floor(n/10);
        sum += num*num;
    }
    return isHappy(sum);
};

// 203.移除链表元素
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
var removeElements = function(head, val) {
    if(!head) {return null};
    var next = head;
    while(next && next.next) {
        if(next.next.val == val) {
            next.next = next.next.next;
        } else {
            next = next.next;
        }
    }
    return head.val == val ? head.next : head;
};

// 204. 计数质数  采用厄拉多塞筛法
var countPrimes = function(n) {
    if(n < 3) {return 0};
    let backNum = Array(n).fill(true);
    backNum[0] = false;
    backNum[1] = false;
    for (let i = 2; i*i < backNum.length; i++) {
        if(backNum[i]) {
            for (let j = i*i; j < backNum.length; j+=i) {
                backNum[j] = false;
            }
        }
    }
    let result = 0;
    for(let isCount of backNum) {
        if(isCount) {
            result +=1;
        }
    }
    return result;
};
// 205. 同构字符串 基础逻辑题
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    return check(s,t) && check(t,s);
    function check(a,b){
        let backMap = new Map();
        for (let i = 0; i < a.length; i++) {
            let charA =  a.substr(i,1);
            let charB =  b.substr(i,1);
            if(backMap.get(charA)) {
                if(backMap.get(charA) != charB) {
                    return false;
                } 
            } else {
                backMap.set(charA,charB);
            }
        }
        return true;
    }
};


// 206. 反转链表 循环 递归
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    var newHead = null;
    while(head) {
        var stage = head.next;
        head.next = newHead;
        newHead = head;
        head = stage;
    }
    return newHead;
};

// 209. 长度最小的子数组 双指针
 /**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
    var start = 0;
    var min = nums.length +1;
    var sum = 0;
    var backStart =0;
    for (let index = 0; index < nums.length; index++) {
        sum  += nums[index];
        if(sum >= s) {
            while(start < index && sum - nums[start] >= s) {
                sum -= nums[start];
                start++;
            }
            if(index - start + 1 < min) {
                min = index - start + 1;
                backStart = start;
            }
            sum -= nums[start];
            start++;
        }
    }
    if(min == nums.length + 1 ) {
        return 0
    } else {
        return  min
    }
};

// 213.打家劫舍 2  分解成 不是一个圆 不打劫第一个 不打劫最后一个 两种情况
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    let length = nums.length;
    if(length == 0) {
        return 0;
    } else if(length == 1) {
        return nums[0];
    } else {
        return Math.max(easyRob(nums.slice(0, nums.length - 1)),easyRob(nums.slice(1)))
    }
    function easyRob(nums) {
        var have = 0, noHave = 0;
        for (var num of nums) {
            var began = have;
            have = Math.max(have, noHave + num);
            noHave = Math.max(noHave, began);
        }
        return Math.max(have, noHave);
    }  
};

// 215. 数组中的第K个最大元素
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// var findKthLargest = function(nums, k) {
//     if (nums.length == 0) {
//         return 0;
//     }
//     if (nums.length == 1) {
//         return nums[0];
//     }
//     var num = nums[0];
//     var maxNum = Array();
//     var minNum = Array();
//     for (let index = 1; index < nums.length; index++) {
//         var inNum = nums[index];
//         if(num < inNum) {
//             maxNum.push(inNum);
//         } else {
//             minNum.push(inNum);
//         }
//     }
//     if (maxNum.length == k - 1) {
//         return num;
//     } else if (maxNum.length > k -1) {
//         return findKthLargest(maxNum,k);
//     } else {
//         return findKthLargest(minNum,k - maxNum.length - 1);
//     }
// };

// 上面超内存 还不如一个排序  
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    
    var newNums = nums.sort(sequence);
    return newNums[k -1];
    function sequence(a,b) {
        return b - a;
    }
};

// 217.存在重复元素 字典记录
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    var dic = new Map();
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        if(dic.get(element) != undefined) {
            return true
        } else {
            dic.set(element,0);
        }
    }
    return false;
};

// 219. 存在重复元素 II map 暂存
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    let backMap = new Map();
    for (let index = 0; index < nums.length; index++) {
        if(backMap.get(nums[index]) != null) {
            if(index - backMap.get(nums[index]) <= k) {
                return true
            }
        }
        backMap.set(nums[index],index);
    }
    return false
};


//  222. 完全二叉树的节点个数  递归算法  当然也可以左右树判断 进行递归调用
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function(root) {
    if(!root) {
        return 0;
    } else {
        return countNodes(root.left) +  countNodes(root.right) + 1;
    }
};

// 226. 翻转二叉树 递归
var invertTree = function(root) {
    if (!root) {
        return root;
    }
    var left =  invertTree(root.left);
    var right = invertTree(root.right);
    root.left = right;
    root.right =  left;
    return root;
};

// 228. 汇总区间 双指针
var summaryRanges = function(nums) {
    
    let  start = 0
    let end = 0
    let result = []
    while(end < nums.length) {
        if(nums[end] - nums[start] == end  - start) {
            end++;
        } else {
            if(start == end -1) {
                result.push(String(nums[start]))
            } else {
                let str = String(nums[start]) + '->' + String(nums[end-1])
                result.push(str)
            }
            start = end
        }
    }
    if(end > 0) {
        if(start == end -1) {
            result.push(String(nums[start]))
        } else {
            let str = String(nums[start]) + '->' + String(nums[end-1])
            result.push(str)
        }
    }

    return result
};

// 229.求众数2  先找到那2个出现最多次的数，然后再做统计。 摩尔投票法
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function(nums) {

    var result1 = 0;
    var result2 = 0;
    var count1 = 0;
    var count2 = 0;
    for(num of nums) {
        if(num == result1) {
            count1++;
        } else if(num == result2) {
            count2++;
        } else if(count1 == 0) {
            result1 = num;
            count1++;
        } else if(count2 == 0) {
            result2 = num;
            count2++;
        } else {
            count1--;
            count2--;
        }
    }
    count1 = 0;
    count2 = 0;
    for(num of nums) {
        if(num == result1) {
            count1++;
        } else if(num == result2) {
            count2++;
        }
    }
    var result = Array();
    if(count1 > nums.length/3) {
        result.push(result1);
    }
    if(count2 > nums.length/3) {
        result.push(result2);
    }
    return result;
};
majorityElement([3,2,3])
// 230.二叉搜索树中第k小的元素 中序遍历
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    var stack = Array();
    var num = 0;
    if(root) {
        stack.push(root);
    }
    while(stack.length > 0) {
        var last = stack[stack.length - 1];
        if(last.left) {
            stack.push(last.left);
            last.left = null;
        } else {
            stack.pop();
            num++;
            if(num == k) {
                return last.val;
            }
            if(last.right) {
                stack.push(last.right);
            }
        }
    }
};

// 231.2的幂   2的次幂肯定是 最后一位是1 前面的位数都是0....
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
    if(n < 1) return false;
    var  hasOne = false;
    while(n > 0) {
        if (n&1) {
            if(hasOne) {
                return false;
            } else {
                hasOne = true;
            }
        }
        n >>=1;
    }
    return true;
};

// 234.回文链表  快慢指针 去中间 然后反转链表 最后 逐一比较
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    if (!head || !head.next) {
        return true;
    }
    var fast = head;
    var slow = head;
    while(fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }
    if(fast) {
        slow = slow.next;
    }
    slow = reverseList(slow);
    fast = head;
    while (slow) {
        if(fast.val != slow.val) {
            return false;
        }
        fast = fast.next;
        slow = slow.next;
    }
    return true;
    function reverseList(head) {
        var newHead = null;
        while(head) {
            var stage = head.next;
            head.next = newHead;
            newHead = head;
            head = stage;
        }
        return newHead;
    };
};

// 235.二叉搜索树的最近公共祖先
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
    var min = 0,max =0;
    if(p.val > q.val) {
        min = q.val;
        max = p.val;
    } else {
        min = p.val;
        max = q.val;
    }
    while(root) {
        if(max < root.val) {
            root = root.left;
        } else if (min > root.val) {
            root  = root.right;
        } else {
            return root;
        }
    }
};
// 236. 二叉树的最近公共祖先 递归如果遇到跟p,q相等的则返回，递归左右树 如果都存在则就是该点如果一个不存在则在另外一个树上
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if(root == null || root == p || root == q) {
        return root;
    } 
    var left = lowestCommonAncestor(root.left,p,q);
    var right = lowestCommonAncestor(root.right,p,q);
    if(left && right) {
        return root;
    } else {
        return left == null ? right : left;
    }
};
// 237.删除链表中的节点 这题只传入了删除节点 要换个思维就是把删除节点跳过去
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
};


// 238.除自身以外数组的乘积
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    var resultArray = Array();
    var backupNum = 1;
    for (num of nums) {
        resultArray.push(backupNum);
        backupNum *= num;
    }
    backupNum = nums[nums.length - 1];
    for (let index = nums.length - 2; index  > -1; index--) {
        resultArray[index] *= backupNum;
        backupNum *= nums[index]; 
    }
    return resultArray;
};

// 239. 滑动窗口最大值 双向队列
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    var backArray = Array();
    var result = Array();
    for (let index = 0; index < nums.length; index++) {
        var num =nums[index];
        while(backArray.length > 0 && nums[backArray[backArray.length - 1]] < num) {
            backArray.pop();
        }
        backArray.push(index);
        if (backArray[0] == index - k) {
            backArray.shift(0)
        }
        if (index >= k - 1) {
            result.push(nums[backArray[0]]);
        }
    }
    return result;
};

// 242. 有效的字母异位词 基础逻辑 
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if(s.length != t.length) {return false};
    let backup = new Map();
    for (let index = 0; index < s.length; index++) {
        let key  = s[index];
        backup.set(key,backup.get(key)== null ? 1: backup.get(key) + 1)
    }
    for (let index = 0; index < t.length; index++) {
        let key  = t[index];
        let num = backup.get(key)
        if(num == null) {
            return false;
        } else if( num == 1) {
            backup.delete(key);
        }else {
            backup.set(key,num - 1);
        }
    }
    return true;
};

// 257. 二叉树的所有路径 基本逻辑题
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    var result = [];
    dfs(root,"");
    function dfs(node, str) {
        if(node == null) { return }
        var newStr = str.length > 0 ? str + "->" + node.val.toString() : node.val.toString();
        if(node.left == null && node.right == null) {
            result.push(newStr)
        } else {
            dfs(node.left,newStr);
            dfs(node.right,newStr);
        }
    }
    return result;
};

// 258. 各位相加 逻辑题
/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function(num) {
    if(num >= 9 && num%9 == 0) return 9;
    return num%9;
};

// 260. 只出现一次的数字 III  map 消除
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {
    var backMap = new Map();
    for(let num of nums) {
        if(backMap.has(num)) {
            backMap.delete(num);
        } else {
            backMap.set(num,0);
        }
    }
    var result = [];
    for( let mapTop of backMap) {
        result.push(mapTop[0]);
    }
    return result;
};

//  263.丑数 
/**
 * @param {number} num
 * @return {boolean}
 */
var isUgly = function(num) {
    if(num<1) return false;
    while(num>1){
        if(num%2==0){
            num/=2;
        }else if(num%3==0){
            num/=3;
        }else if(num%5==0){
            num/=5;
        }else{
            return false;
        }
    }
    return true;
};
// 264.丑数2 用动态规划
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
    var backAray = Array();
    backAray.push(1);
    var index2 = 0;
    var index3 = 0;
    var index5 = 0;
    while(backAray.length != n) {
        var min = Math.min(backAray[index2]*2,backAray[index3]*3,backAray[index5]*5);
        if(min == backAray[index2]*2) {
            index2++;
        } else if(min == backAray[index3]*3) {
            index3++;
        } else {
            index5++;
        }
        if(min != backAray[backAray.length - 1]) {
            backAray.push(min);
        }
    }
    return backAray[backAray.length -1];
};

// 269.缺失数字 记录总数 计算应该的值减去就好了
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    if(nums.length == 0) {
        return 0;
    }
    var sum = 0;
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        sum += element;
    }
    return (nums.length)*(nums.length + 1)/2  - sum;
};
// 274. H指数 排序判断
/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function(citations) {
    citations.sort((a,b) => b - a)
    for (let i = 0; i < citations.length; i++) {
        if (i > citations[i] -1) {
            return i
        }
    }
    return citations.length;
};

// 275. H指数 II 逻辑题 同上一题 贪心算法思想
/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function(citations) {
    for (let i = citations.length -1; i > -1; i--) {
        let num = citations.length - i 
        if (num > citations[i]) {
            return num-1
        }
    }
    return citations.length;
};

// 279.完全平方数 可以用动态规划做 当然 还有种方式就是： 四平方定理： 任何一个正整数都可以表示成不超过四个整数的平方之和。满足四数平方和定理的数n（这里要满足由四个数构成，小于四个不行），必定满足 n=4a(8b+7)
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
    var num =  Math.floor(Math.sqrt(n));
    if(num*num == n) {
        return 1;
    }
    for (let index = num; index > 0; index--) {
        for (let i = 1; i <= num; i++) {
            if((index*index + i*i) == n) {
                return 2;
            }
        }
    }

    var newN = n;
    while(newN%4 == 0) {
        newN = newN/4;
    }
    if(newN%8 == 7) {
        return 4;
    }
    return 3;
};


// 290. 单词规律  映射
/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
var wordPattern = function(pattern, str) {
    let backup = new Map();
    let backupTwo = new Map();
    let strArray = str.split(' ');
    if(strArray.length != pattern.length) {
        return false;
    }
    for (let index = 0; index < pattern.length; index++) {
        let key = pattern[index];
        let value = strArray[index];
        let getValue = backup.get(key);
        let getKey = backupTwo.get(value);
        if((getValue == null && getKey != null) ||(getValue != null && getKey == null)) {
            return false;
        }
        if(getValue == null) {
            backup.set(key,value);
            backupTwo.set(value,key);
        }else {
            if(getValue != value) {
                return false;
            }
        }
    }
    return true;
};

// 292.Nim游戏 其实4是一个基数 一定能达到的数（即最大值加最小值）
/**
 * @param {number} n
 * @return {boolean}
 */
var canWinNim = function(n) {
    return n%4 > 0 ;
};

// 299.猜数字游戏 逻辑题，先匹配位置数字相同的，再匹配有多少个数字相同
/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function(secret, guess) {
    var backArray = [];
    for (let index = 0; index < 10; index++) {
        backArray.push(0);
    }

    var A = 0;
    for (let index = 0; index < secret.length; index++) {
        var schar = secret.substr(index,1);
        var gchar  = guess.substr(index,1);
        backArray[parseInt(schar)] += 1;
        if(schar == gchar) {
            A ++;
        }
        
    }
    var B = 0;
    for (let index = 0; index < guess.length; index++) {
        var gchar  = guess.substr(index,1);
        gchar = parseInt(gchar);
        if(backArray[gchar] > 0) {
            B++;
            backArray[gchar] -= 1;
        }
    }
    B -= A;
    return A.toString() + "A" + B.toString() + "B";
};

// 300.最长上升子序列，堆栈加二分查找
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    if(nums.length < 2) {
        return nums.length
    }
    var  backArray = [nums[0]];
    for (let index = 1; index < nums.length; index++) {
        let num = nums[index]
        if(num > backArray[backArray.length - 1]) {
            backArray.push(num)
        } else if(num < backArray[0]) {
            backArray[0] = num
        } else {
            var left = 0 ,right = backArray.length;
            while(left < right) {
                let mid = Math.floor((left + right)/2);
                if(num > backArray[mid]) {
                    left = mid +1;
                } else {
                    right =mid;
                }
            }
            backArray[left] = num;
        }
    }
    return backArray.length
};


// 319. 灯泡开关 逻辑思考题
//（1）第i轮时，被切换的灯泡位置是i的倍数。
//（2）由（1）得出，对于第p个灯泡来说，只有其第“因子”轮才会切换，若其有q个因子，则最终被切换q次。因为初始状态是关闭状态，那么因子数是奇数的灯泡最终是亮着的。
//（3）只有平方数的因子个数不是成对出现，举例：4=1*4,2*2，其因子是1,2,4。
//（4）那么题目最终转化为1~n里平方数的个数，进而转化为对n开平方根，向下取整即可。
/**
 * @param {number} n
 * @return {number}
 */
var bulbSwitch = function(n) {
    return Math.floor(Math.sqrt(n));
};
// 328.奇偶链表基础逻辑
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
    var first = new ListNode(0);
    var firstNext = first;
    var second = new ListNode(0);
    sendNext = second;
    var  num = 1;
    while(head) {
        var node = head;
        head = head.next;
        node.next = null;
        if(num%2 == 0) {
            sendNext.next = node;
            sendNext = sendNext.next;
        } else {
            firstNext.next = node;
            firstNext = firstNext.next;
        }
        num++;
    }
    firstNext.next = second.next;
    return first.next
};

// 322. 零钱兑换 动态规划
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    if(coins.length == 0 || amount <= 0) {
        return  amount == 0 ? 0 : -1;
    }
    var backArray = Array(amount);
    for (let index = 0; index < amount; index++) {
        var  current = amount + 1;
        for (let i = 0; i < coins.length; i++) {
            var coin  = coins[i]
            if (index + 1  < coin) {
                continue
            } else if (index + 1 == coin) {
                current = 1
                break
            } else {
                if (backArray[index - coin] != null) {
                    current = Math.min(current,backArray[index - coin] + 1)
                }
            }
        }
        if(current < amount + 1) {
            backArray[index] = current
        }
    }
    return backArray[amount -1] != null ?  backArray[amount -1] : -1;
};
//更简便的写法
var coinChange = function(coins, amount) {
    // 动态规划 每个值最少的硬币数
    r = [0]
    for(let i=1;i<=amount;i++){
        r[i] = amount + 1
        for(let j=0;j<coins.length;j++){
            if(coins[j]<=i){
                r[i]=r[i]>(r[i-coins[j]]+1)?r[i-coins[j]]+1:r[i];
            }
        }
    }
    return (r[amount]>=amount + 1?-1:r[amount])
};

// 326.3的幂  除3 看余数
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function(n) {
    if(n < 1) {return false};
    while(n%3 ==0) {
        n = n/3
    }  
    return n == 1
};

// 334. 递增的三元子序列 递归思想 记录2个值 一个最小值 一个第二小的值
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function(nums) {
    if(nums.length < 3) {
        return false;
    }
    var min = nums[0];
    var mid = Infinity;
    for (let index = 1; index < nums.length; index++) {
        const num = nums[index];
        if(num > mid) {
            return true;
        } else if (num <= min) {
            min = num;
        } else if (num < mid ) {
            mid = num;
        }
    }
    return false;
};

// 342.4的幂  一个循环搞定
/**
 * @param {number} num
 * @return {boolean}
 */
var isPowerOfFour = function(num) {
    if(num == 0) {
        return false;
    }
    var newNum = num;
    while(newNum%4 == 0) {
        newNum = newNum/4;
    }
    return newNum == 1;
};

// 343. 整数拆分  动态规划 要么是之前的值乘以一个余数要么是只分成2个数相乘
/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function(n) {
    let backup = Array(n+1).fill(0);
    backup[2] = 1;
    for (let i = 3; i < n+1; i++) {
        for (let j = 1; j < i; j++) {
            backup[i] = Math.max(backup[i],j*backup[i-j],j*(i-j))
        }
    }
    return backup[n];
};

// 344.反转字符串 反向循环
/**
 * @param {string} s
 * @return {string}
 */
var reverseString = function(s) {
    var result = "";
    for (let index = 0; index < s.length; index++) {
       result += s[s.length - index - 1];
    }
    return result;
};

// 345. 反转字符串中的元音字母 双指针
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
    let check = "aoeiuAOEIU";
    let start = 0;
    let end = s.length -1;
    let isHave = false;
    s =s.split('')
    while(start < end) {
        if(isHave) {
            if(check.indexOf(s[end]) == -1) {
                end--;
            }else {
                [s[start], s[end]] = [s[end], s[start]];
                start++;
                end--;
                isHave = false;
            }
        } else {
            if(check.indexOf(s[start]) == -1) {
                start++;
            } else {
                isHave = true;
            }
        }
    }
    return s.join('');
};


// 347.前K个高频元素  映射成map再排序
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    var myMap = new Map();
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        if(myMap.get(element) != null) {
            myMap.set(element,myMap.get(element) + 1);
        } else {
            myMap.set(element,1);
        }
    }

    var result = Array();
    for(var key of myMap) {
        result.push(key[0]);
    }
    var sortArray = result.sort(copare);
    function copare(x,y) {
        return myMap.get(y) - myMap.get(x);
    }
    return sortArray.slice(0,k);
};

// 349.两个数组的交集 基础逻辑 
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    var mapBack = new Map()
    var result = [];
    for(let num of nums1) {
        mapBack.set(num,1); 
    } 
    for(let num of nums2) {
        if(mapBack.get(num) != null) {
            result.push(num);
            mapBack.delete(num);
        }
    } 
    return result;
};

// 350. 两个数组的交集 II  排序遍历
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    nums1.sort((a,b) => a - b);
    nums2.sort((a,b) => a - b);
    let node1 = 0;
    let node2 = 0;
    let result  = [];
    while(node1 < nums1.length && node2 < nums2.length) {
        if(nums1[node1] < nums2[node2]) {
            node1++;
        } else if (nums1[node1] == nums2[node2]) {
            result.push(nums1[node1]);
            node1++;
            node2++;
        } else {
            node2++;
        }
    }
    return result;
};

// 357. 计算各个位数不同的数字个数 穷举
/**
 * @param {number} n
 * @return {number}
 */
var countNumbersWithUniqueDigits = function(n) {
    if(n > 10) {
        n = 10;
    }
    let backup = [1,10,91,739,5275,32491,168571,712891,2345851,5611771,8877691]
    return backup[n];
};

// 动态规划
var countNumbersWithUniqueDigits2 = function(n) {
    if(n == 0) {return 1};
    if(n == 1) {return 10};
    var backup = 10,
    temp = 9;
    for(let i = 2; i<= n; i++){
        temp = temp*(11-i);
        backup += temp;
    }
    return backup;
};

// 365. 水壶问题 仔细考虑下 就是  z = ax +by;  这就是 求最大公约数 ，看看 z是不是 他们的倍数  所以问题就转化为求最大公约数了 最后考虑xy等于0以及z大于xy的特殊情况
/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {boolean}
 */
var canMeasureWater = function(x, y, z) {
    // 辗转相除法
    if(x == 0 || y == 0) { return z ==x || z== y}
    if(z > (x+ y)) {return false}
    var num = gcd(x,y);
    return  z%num == 0;
    function gcd(x,y) {
        while(true) {
            if((x = x%y) == 0) {
                return y;
            }
            if((y = y%x) == 0) {
                return x;
            }
        }
    }
};

// 367. 有效的完全平方数 基本逻辑题
/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function(num) {
    if(num == 1) {return true}
    let left = 0;
    let right = Math.floor(num/2);
    while(left <= right) {
        let mid = Math.floor((left + right)/2)
        if(mid*mid == num) {
            return true
        }else if(mid*mid <num) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return false;
};

// 371.两整数之和 逻辑题
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function(a, b) {
    while(b != 0) {
        let res = (a&b) <<1;
        a = a^b;
        b = res;
    }
    return a;
};

//  375. 猜数字大小 II 动态规划
/**
 * @param {number} n
 * @return {number}
 */
var getMoneyAmount = function(n) {
    let dp = [];
    for (let index = 0; index < n+1; index++) {
        dp.push(Array(n+1).fill(0))
    }
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i+ len -1 <= n ; i++) {
            let j = i +len -1;
            dp[i][j] = Math.min(i+dp[i +1][j],j+dp[i][j-1])
            for (let k = i+1; k < j; k++) {
                dp[i][j] = Math.min(dp[i][j],k + Math.max(dp[i][k-1],dp[k+1][j]))
            }
        }
    }
    return dp[1][n];
};

// 377. 组合总和 Ⅳ  动态规划
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function(nums, target) {
    let backup = Array(target +1).fill(0);
    nums.sort((a,b) => a-b)
    backup[0] = 1;
    for (let i = 0; i < target; i++) {
        for(let num of nums) {
            if (i + num <= target) {
                backup[i +num] += backup[i];
            } else {
                break;
            }
        }
    }
    return backup[target];
};

// 386.字典序排序  找规律递归
/**
 * @param {number} n
 * @return {number[]}
 */
var lexicalOrder = function(n) {
    var result = Array();
    var min = Math.min(9,n);
    for (let index = 1; index <= min; index++) {
        result.push(index);
        helper(index*10);
    }
    return result;
    function helper(num) {
        for (let index = 0; index <= 9; index++) {
            let newNum = num + index;
            if(newNum <= n) {
                result.push(newNum) 
                helper(newNum*10)
            } else {
                return;
            }
        }
    }
};

// 378.有序矩阵中第K小的元素 归并法做的 最快的应该是二分法遍历
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(matrix, k) {
    var backAray = Array();
    for (let index = 0; index < matrix.length; index++) {
        const element = matrix[index];
        backAray = mergeArray(backAray,element,k);
    }
    return backAray[k - 1];

    function mergeArray(array1,array2,k) {
        var backArray = Array()
        var k1 = 0;
        var k2 = 0;
        while(k1 < array1.length && k2 < array2.length && backArray.length < k) {
            if(array1[k1] > array2[k2]) {
                backArray.push(array2[k2]);
                k2++;
            }else {
                backArray.push(array1[k1]);
                k1++;
            }
        }
        if (k1 == array1.length) {
            while(k2 < array2.length && backArray.length < k) {
                backArray.push(array2[k2]);
                k2++;
            }
        }
        if (k2 == array2.length) {
            while(k1 < array1.length && backArray.length < k) {
                backArray.push(array1[k1]);
                k1++;
            }
        }
        return backArray;
    }
};

// 390. 消除游戏 找规律
/**
 * @param {number} n
 * @return {number}
 */
var lastRemaining = function(n) {
    return n == 1 ? 1 : 2*(Math.floor(n/2) +1  -lastRemaining(Math.floor(n/2)))
};

// 397.整数替换 递归最简单的思路
/**
 * @param {number} n
 * @return {number}
 */
var integerReplacement = function(n) {
    if(n == 1) {
        return 0;
    }
    if(n%2 == 0 ){
        return integerReplacement(n/2) + 1;
    } else {
        return Math.min(integerReplacement(n+1)+1,integerReplacement(n -1)+1);
    }
};

// 下一位是0 肯定是最快的 所以用这个规则更快
var integerReplacement = function(n) {
    var count=0;
    while(n!=1){
        if(n%2==0){
            n>>>=1;
        }else if(n==3 || ((n>>>1)&1)==0){
            n--;
        }else{
            n++;
        }
        count++;
    }
    return count;
};

// 383.赎金信 基本逻辑题
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
    let backMap = new Map();
    for (let index = 0; index < magazine.length; index++) {
        let char  = magazine[index];
        backMap.set(char,(backMap.get(char) ? backMap.get(char) : 0) + 1);
    }
    for (let index = 0; index < ransomNote.length; index++) {
        let char  = ransomNote[index];
        let num = backMap.get(char);
        if(!num) {
            return false;
        }
        num = num -1;
        if(num == 0) {
            backMap.set(char,null);
        } else {
            backMap.set(char, num);
        }
    }
    return true;
};

//387.字符串中的第一个唯一字符
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    var map = new Map();
    for (let index = 0; index < s.length; index++) {
        let element = s.substr(index,1);
        if(map.get(element) != undefined) {
            map.set(element,s.length);
        } else {
            map.set(element,index);
        }
    }
    var result = s.length; 
    for(let element of map) {
        result = Math.min(element[1],result);
    }
    if(result == s.length) {
        result = -1;
    }
    return result;
};
// 另外一种思路 只检查这些字母，如果只出现一次则记录 更快！
var firstUniqChar = function(s) {
    const alpha = 'abcdefghijklmnopqrstuvwxyz';
    let first = s.length;
    for(let i = 0; i < alpha.length; ++i){
        let index = s.indexOf(alpha[i]);
        if(index !== -1 && index === s.lastIndexOf(alpha[i])){
            if(index < first){
                first = index;
            }
        }
    }
    return first == s.length ? -1 : first;
};

// 389.找不同  转ASCII 加减 
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
    let num = 0;
    for (let index = 0; index < t.length - 1; index++) {
        num = num + t[index].charCodeAt()  - s[index].charCodeAt();
    }
    num += t[t.length -1].charCodeAt();
    return String.fromCharCode(num);
};
// 392. 判断子序列 基础逻辑题
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    if(s.length == 0) return true;
    let num = 0;
    for (let index = 0; index < t.length; index++) {
        if(s[num] == t[index]) {
            num++;
            if(num == s.length) {
                return true
            }
        }        
    }
    return false
};
// 394.字符串解码 堆栈
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {

    var heap = Array();
    for(var str of s) {
        if(str == "]") {
            var loopStr = ""
            var popStr = heap.pop();
            while(popStr != "[") {
                loopStr = popStr + loopStr;
                popStr = heap.pop();
            }
            var loopNum = "";
            popStr = heap.pop();
            while(isNum(popStr)) {
                loopNum = popStr + loopNum;
                popStr = heap.pop();
            }
            if(popStr) {
                heap.push(popStr);
            }
            popStr = "";
            for (let index = 0; index < parseInt(loopNum); index++) {
                popStr = popStr + loopStr;
            }
            heap.push(popStr);

        } else {
            heap.push(str);
        }
    } 

    var result = "";
    for (let index = 0; index < heap.length; index++) {
        const element = heap[index];
        result += element;
    }
    return result;

    function isNum(x) {
        var numString = "0123456789";
        return numString.indexOf(x) != -1;
    }
};

// 400. 第N个数字  逻辑题
/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function(n) {
    if(n < 9) { return n};
    let count = 9;
    let i = 1
    while((count + (i+1)*9*Math.pow(10,i)) < n) {
        count += (i+1)*9*Math.pow(10,i);
        i++;
    }
    i++;
    let remain = n - count;
    let num1 = Math.floor(remain/i);
    let num2 = remain%i;
    let lastNum = 0;
    if(num2 == 0) {
        return (Math.pow(10,i-1) - 1 + num1)%10;
    }
    num1 +=  Math.pow(10,i-1);
    return parseInt(num1.toString()[num2 -1]);
};

// 402.移掉K位数字 当后面的数大于等于前面的数时需要递归到最后，然后要考虑0的情况 K是一个移除循环次数
/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function(num, k) {
    if (k < 1) { return num; }
    if(num.length <= k) {return "0";}
    var result = num;
    var start  = 0;
    while(k > 0) {
        if(start + 2 > result.length) {
            start = result.length - 2;
        }
        if(start < 0) {start = 0};
        var num1 = parseInt(result.substr(start, 1));
        var num2 = parseInt(result.substr(start + 1,1));
        while(start < result.length - 2 && num1 <= num2) {
            start++;
            num1 = num2;
            num2 = parseInt(result.substr(start + 1,1)); 
        }
        if(num1 > num2) {
            result = result.substring(0,start) + result.substring(start + 1,result.length);
            start--;
        } else {
            result =  result.substring(0,start+1) + result.substring(start + 2,result.length);
        }
        k--;
        var newNum = parseInt(result.substr(0,1));
        while( newNum == 0 && result.length > 0) {
            result = result.substring(1,result.length);
            newNum = parseInt(result.substr(0,1));
        }
    }
    return result || "0";
};

// 404.左叶子之和  二叉树的遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
    var result = 0;
    traverse(root);
    function traverse(root) {
        if(root) {
            if(root.left !=null && root.left.left == null &&root.left.right == null) {
                result += root.left.val;
                traverse(root.right);
            } else {
                traverse(root.left);
                traverse(root.right);
            }
        }
    }
    return result;
};

// 406.根据身高重建队列  小数不会影响K
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function(people) {
    var sortArray = people.sort(compare);
    var result = Array();
    for (let index = 0; index < sortArray.length; index++) {
        const element = sortArray[index];
        if(element[1] >= result.count) {
            result.push(element);
        } else {
            result.splice(element[1],0,element);
        }
    }
    return result;
    function compare(x,y) {
        if (y[0] == x[0]) {
            return x[1] - y[1];
        } else {
            return y[0] - x[0];
        }
    }
};

// 409.最长回文字符串 逻辑判断
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function(s) {
    var mapBack = new Map()
    for (let index = 0; index < s.length; index++) {
        let char = s.substr(index,1)
        mapBack.set(char,mapBack.get(char) == null ? 1 : mapBack.get(char) + 1)
    }
    var odd = 0;
    var count = 0;
    for(let kv of mapBack) {
        if(kv[1]%2 == 0) {
            count += kv[1];
        } else {
            odd = 1;
            if(kv[1] > 1) {
                count += kv[1] - 1;
            }
        }
    }
    count += odd;
    return count;
};

// 410. 分割数组的最大值  二分查找
/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
var splitArray = function(nums, m) {
    let l = nums[0],h = 0
    for(let num of nums) {
        h += num
        l = Math.max(l,num)
    }
    while(l < h) {
        let mid = Math.floor((l+h)/2);
        let temp = 0
        let cnt = 1
        for(let num of nums) {
            temp += num
            if(temp > mid) {
                temp = num
                cnt++
            }
        }
        if(cnt > m) {
            l = mid +1
        } else {
            h = mid
        }
    }
    return l
};

// 412. Fizz Buzz 很简单 
/**
 * @param {number} n
 * @return {string[]}
 */
let fizzBuzz = function(n) {
    let res = [];
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            res.push("FizzBuzz");
        } else if (i % 3 === 0) {
            res.push("Fizz");
        } else if (i % 5 === 0) {
            res.push("Buzz");
        } else {
            res.push(i.toString());
        }
    }
    return res;
};

// 414. 第三大的数  基础逻辑题
/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function(nums) {
    let first,second,third;
    for(let num of nums) {
        if(!first) {
            first = num;
        } else if(first <= num) {
            if(first != num){
                third = second;
                second = first;
                first = num;  
            }
        } else if(!second) {
            second  = num;
        } else if (second <= num) {
            if(second != num) {
                third = second;
                second = num;
            }
        } else if(!third) {
            third = num;
        } else if(third <= num) {
            third = num;
        }
    }
    return third == undefined ?  first : third;
};

// 415. 字符串相加  基本逻辑题
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
    let l1 = num1.length - 1;
    let l2 = num2.length - 1;
    let result = "",addNum = 0;
    while(l1 >= 0 && l2 >= 0) {
        let num = Number.parseInt(num1[l1]) + Number.parseInt(num2[l2]) +addNum;
        addNum = Math.floor(num/10);
        num = num%10;
        result = num.toString() + result;
        l1--;
        l2--;
    }
    while(l1 >= 0) {
        let num = Number.parseInt(num1[l1]) + addNum;
        addNum = Math.floor(num/10);
        num = num%10;
        result = num.toString() + result;
        l1--;
    }
    while(l2 >= 0) {
        let num =  Number.parseInt(num2[l2]) + addNum;
        addNum = Math.floor(num/10);
        num = num%10;
        result = num.toString() + result;
        l2--;
    }
    if(addNum >0) {
        result = addNum.toString() +result;
    }
    return result;
};

// 416 分割子集 其实最后可以归到背包问题
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    if(nums.length < 2) {
        return false;
    }
    var sum = 0;
    for (let index = 0; index < nums.length; index++) {
        sum += nums[index]; 
    }
    if (sum%2 != 0) {
        return false;
    }
    var mid = sum/2;
    var backArray = Array();
    for (let index = 0; index <= mid; index++) {
        backArray.push(0);
    }
    var rootArray= Array();
    for (let index = 0; index <= nums.length; index++) {
        rootArray.push(backArray.concat());
    }
    for (let i = 1; i <= nums.length; i++) {
        let num = nums[i -1];
        if (num > mid) {
            return false;
        }
        for (let j = num; j <= mid; j++) {
            rootArray[i][j] = Math.max(rootArray[i-1][j],rootArray[i-1][j-num] + num);
        }
    }
    if(rootArray[nums.length][mid] == mid) {
        return true;
    } else {
        return false;
    }
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 经典最快写法 递归写法 每次都是加或者不加两种情况
var canPartition = function(nums) {
    var sum = nums.reduce((a,b)=>a+b);
    if(sum%2==1){
        return false;
    }
    sum = sum / 2;
    var result = false;
    var obj = new Set();
    f(0, 0);
    return result;
    
    function f(r, k) {
        if(obj.has(r+","+k)) {
            return;
        } else {
            obj.add(r+","+k);
        }
        if(r == sum) {
            result = true;
        }
        if(r>sum) {
            return;
        }
        if(result) {
            return;
        }
        if(k==nums.length) {
            return
        }
        f(r+nums[k], k+1);
        f(r, k+1);
    }
};

// 423. 从英文中重建数字 找规律加遍历
/**
 * @param {string} s
 * @return {string}
 */
var originalDigits = function(s) {
    let backup = new Map();
    for(let char of s) {
        backup.set(char,(backup.get(char) || 0) + 1)
    }
    let out = Array(10).fill(0);
    out[0] = backup.get('z') || 0
    out[2] = backup.get('w') || 0
    out[4] = backup.get('u') || 0
    out[6] = backup.get('x') || 0
    out[8] = backup.get('g') || 0
    out[3] = (backup.get('h') || 0) - out[8]
    out[5] = (backup.get('f') || 0) - out[4]
    out[7] = (backup.get('s') || 0) - out[6]
    out[9] = (backup.get('i') || 0) - out[5] - out[6] - out[8]
    out[1] = backup.get('n') - out[7] - 2*out[9]
    let output = ''
    for (let i = 0; i < out.length; i++) {
        let num = out[i];
        while(num > 0) {
            num--;
            output += i;
        }
    }
    return output;
};

 // 429. N叉树的层序遍历 基本逻辑题
 /**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(root == null) {return []}
    var result = [];
    var backArray = [root];
    while(backArray.length > 0 ) {
        var newBack = [];
        var nodeVal = [];
        for(let node of backArray) {
            nodeVal.push(node.val);
            if(node.children != null) {
                newBack = newBack.concat(node.children);
            }          
        }
        backArray = newBack;
        result.push(nodeVal);
    }
    return result;
};

//434.字符串中的单词数 空格分割
/**
 * @param {string} s
 * @return {number}
 */
var countSegments = function(s) {
    // trim  去除头尾空字符串
    if(!s.trim()) return 0;
    // split 分割  filter 过滤(返回yes,no），这样写是过滤空字符串
    return s.split(' ').filter(item => item).length;
};

// 435.无重叠区域 排序 遍历
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    if(intervals.length < 2) {
        return 0;
    }
    intervals.sort((a,b)=> a[1] -b[1]);
    let end = intervals[0][1];
    let result = 0;
    for (let index = 1; index < intervals.length; index++) {
        let node = intervals[index];
        if(node[0] >= end) {
            end = node[1];
        } else {
            end = Math.min(end,node[1]);
            result++;
        }
    }
    return result;
};

// 437.路径总和3 递归
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
var pathSum = function(root, sum) {
    if(root == null) {
        return 0;
    }
    return dfs(root,sum) + pathSum(root.left,sum) +pathSum(root.right,sum);
    function dfs(root,num) {
        if(root == null) {
            return 0
        }
        var count = 0;
        if (root.val == num) {
            count = 1;
        }
        count += dfs(root.left,num - root.val);
        count += dfs(root.right,num - root.val);
        return count;
    }
};

//  441. 排列硬币  数学题 解方程
/**
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function(n) {
    return Math.floor((Math.sqrt(8*n + 1) -1)/2);
};

// 442. 数组中重复的数据 位置记录
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
    let n = nums.length;
    for (let index = 0; index < n; index++) {
        let num = (nums[index] -1)%n;
        nums[num]+= n
    }
    let result = [];
    for (let index = 0; index < n; index++) {
        if(nums[index] > 2*n) {
            result.push(index +1);
        }
    }
    return result;
};

// 443. 压缩字符串 基础逻辑题
/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) {
    let [backup,num,start] = ["",0,0];
    while(start < chars.length) {
        let char =  chars[start];
        if(char  == backup) {
            chars.splice(start,1);
            num++;
            start--;
        } else {
            if(num > 1) {
                let backArray = [];
                while(num >0) {
                    backArray.unshift((num%10).toString())
                    num = Math.floor(num/10);
                }
                chars.splice(start,0,...backArray)
                start += backArray.length;
            } 
            backup = char;
            num = 1;
        }
        start++;
    }
    if(num > 1) {
        let backArray = [];
        while(num >0) {
            backArray.unshift((num%10).toString())
            num = Math.floor(num/10);
        }
        chars.splice(start,0,...backArray)
    }
    return chars.length;
};

// 445. 两数相加 II 堆栈 
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
var addTwoNumbers = function(l1, l2) {
    let stack1 = getNum(l1);
    let stack2 = getNum(l2);
    let backNum = 0;
    let result = null;
    while(stack1.length > 0 || stack2.length > 0 || backNum > 0)  {
        let num = (stack1.length > 0 ? stack1.pop() : 0) + (stack2.length > 0 ? stack2.pop() : 0) + backNum;
        backNum = Math.floor(num/10);
        num = num%10
        let node = new ListNode(num);
        node.next = result;
        result = node;
    }
    return result;

    function getNum(node) {
        let stack = [];
        while(node) {
            stack.push(node.val);
            node = node.next;
        }
        return stack;
    }
};

// 448.找到所有数组中消失的 因为是1-N的数 用正负记录是否存在
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
    for (let index = 0; index < nums.length; index++) {
        var element = Math.abs(nums[index]) -1;
        if(nums[element] > 0) {
            nums[element] = nums[element]*-1;
        }
    }
    var resultArray = Array();
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        if (element > 0) {
            resultArray.push(index + 1);
        }
    }
    return resultArray;
};

// 451. 根据字符出现频率排序 map映射

/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
    let mapBackup = new Map();
    for (let i = 0; i < s.length; i++) {
        mapBackup.set(s[i],(mapBackup.get(s[i]) || 0) +1)
    }
    let arrayBackup = [...mapBackup.keys()];
    arrayBackup.sort((a,b) => mapBackup.get(b) - mapBackup.get(a));
    let result = "";
    for (let char of arrayBackup) {
        let num = mapBackup.get(char);
        while(num > 0) {
            result += char;
            num--;
        }
    }
    return result;
};

// 453. 最小移动次数使数组元素相等  n-1个元素加一 等于一个元素减一，那么要都一样 只要找到最小值其他值减去最小值相加即可
/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function(nums) {
    let min = nums[0];
    for(let num of nums) {
        min = Math.min(min,num);
    }
    let result = 0;
    for(let num of nums) {
        result += num -min;
    }
    return result;
};

// 454.四数相加 II  map映射
/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */
var fourSumCount = function(A, B, C, D) {
    let backMap = new Map();
    for(let Anum of A) {
        for (let Bnum of B) {
            let num = Anum + Bnum;
            backMap.set(num,(backMap.get(num) ? backMap.get(num) : 0)+1)
        }
    }
    let sum = 0;
    for(let Cnum of C) {
        for(let Dnum of D) {
            let num = -(Cnum + Dnum);
            let count = backMap.get(num);
            if(count) {
                sum += count;
            }
        }
    }
    return sum;
};

// 455.分发饼干  贪心算法
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
    g.sort((a,b)=>a-b);
    s.sort((a,b)=>a-b);
    let si = 0;
    let gi = 0;
    let result = 0;

    while(si < s.length && gi < g.length) {
        if(s[si] >= g[gi]) {
            result++;
            si++;
            gi++;
        } else {
            si++;
        }
    }

    return result;
};

// 456. 132模式 堆栈找次大元素 倒序遍历
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function(nums) {
    if(nums.length < 3) {return  false};
    let nextNum = Number.MIN_SAFE_INTEGER;
    let heap = [nums[nums.length -1]];
    for (let i = nums.length - 2; i >= 0; i--) {
        let num = nums[i];
        if(num < nextNum) {
            return true;
        }
        while(heap.length > 0 && num > heap[heap.length - 1]) {
            nextNum = Math.max(nextNum,heap.pop())
        }
        heap.push(num);
    }
    return false;
};

// 457. 环形数组循环 循环问题 快慢指针  代码还可以精简
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var circularArrayLoop = function(nums) {
    if(nums.length < 2) {
        return false
    }
    let count = nums.length
    for (let i = 0; i < count; i++) {
        if(nums[i] == 0) {continue}
        let startNum = nums[i]
        let slow = i,fast = i
        while(true) {
            if(nums[fast]*startNum <= 0) {
                break;
            }
            let nextNode = next(fast);
            if(nextNode == fast) {
                break;
            }
            fast = nextNode;
            if(nums[fast]*startNum <= 0) {
                break;
            }
            nextNode = next(fast)
            if(nextNode == fast) {
                break;
            }
            fast = nextNode
            slow = next(slow)
            if(fast == slow) {
                return true;
            }
        }
    }
    return false;
    function next(index) {

        return (index + nums[index] + 1000*count) %count
    } 
};
// 458. 可怜的小猪  数字表示最大意思问题
/**
 * @param {number} buckets
 * @param {number} minutesToDie
 * @param {number} minutesToTest
 * @return {number}
 */
var poorPigs = function(buckets, minutesToDie, minutesToTest) {
    if(buckets == 1) {return 0};
    let base =  Math.floor(minutesToTest/minutesToDie) + 1;
    var num = 1;
    var sum = base;
    while(sum < buckets) {
        num++;
        sum = sum*base;
    }
    return num;
};

// 459.重复的子字符串  截取对比
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
    for (let index = 1; index <= s.length/2; index++) {
        if(s.length%index == 0 && checkStr(index)) {
            return true;
        }
    }
    return false
    function checkStr(num){
        var checkStr = s.substr(0,num);
        var checkNum = num;
        while(checkNum < s.length) {
            var str = s.substr(checkNum,num);
            if(str != checkStr) {
                return false;
            } else {
                checkNum += num;
            }
        }
        return true;
    }
};
repeatedSubstringPattern("abcabcabcabc");
// 461.汉明距离
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
    var num = x^y;
    var count = 0;
    while(num) {
        if((num & 1) == 1 ){
            count++;
        }
        num >>= 1;
    }
    return count;
};

// 462. 最少移动次数使数组元素相等 II 中位数
/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves2 = function(nums) {
    nums.sort((a,b)=> a - b);
    let move = 0;
    let l = 0;
    let r = nums.length - 1;
    while (l < r) {
        move = move + nums[r] - nums[l];
        l++;
        r--;  
    }
    return move;
};

// 470.用 Rand7() 实现 Rand10()  基本逻辑题

var rand10 = function() {
    let r1 = 0, r2 = 0,num = 41
    do {
        r1 = rand7()
        r2 = rand7()
        num = r1 + (r2-1)*7
    } while (num > 40)
    return num%10 +1
};

// 475. 供暖器 排序 基础逻辑
/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
var findRadius = function(houses, heaters) {
    houses.sort((a,b) => a - b);
    heaters.sort((a,b) => a - b);
    let result = 0;
    let [i,j] = [0,0];
    while(i < houses.length) {
        let house = houses[i];
        let heater = heaters[j];
        if(house <= heater) {
            result = Math.max(result,heater - house);
        } else {
            while(j < heaters.length - 1 && heaters[j + 1] < house) {
                j++;
                heater = heaters[j];
            }

            if(j == heaters.length - 1) {
                result = Math.max(result,house - heater);
            } else {
                if(heaters[j+1] - house >  house - heater) {
                    result = Math.max(result,house - heater);
                } else {
                    j++;
                    result = Math.max(result, heaters[j] - house);
                }
            }
        }
        i++;
    }
    return result;
};

// 476. 数字的补数  相加就是 2平方减一
/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function(num) {
    let start = 2;
    while( start - 1 < num) {
        start = start*2;
    }
    return start - 1 - num;
};

// 482. 密钥格式化 基本逻辑题
/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var licenseKeyFormatting = function(S, K) {
    let result = "";
    let num = K;
    for (let index = S.length - 1; index > -1; index--) {
        if(S[index] != '-') {
            if(num == 0) {
                result = '-' + result;
                num = K;
            }
            result = S[index] + result;
            num--;
        }
    }
    return result.toUpperCase();
};

// 485. 最大连续1的个数  基本逻辑题
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
    let max = 0;
    let temp = 0;
    for(let num of nums) {
        if(num == 0) {
            max = Math.max(max,temp);
            temp = 0;
        } else {
            temp++;
        }
    }
    return Math.max(max,temp);
};

// 486.预测赢家 动态规划， 定义 backArray[i][j]为ij先手多的量，那么我们可以想到  backArray[i][j] =   Math.max(nums[i] - backArray[i + 1][j], nums[j] - backArray[i][j - 1]) 那左边与拿右边之中的最大值
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var PredictTheWinner = function(nums) {
    let n = nums.length;
    let backArray = new Array(n).fill( new Array(n).fill(0));
    for (let index = 0; index < n; index++) {
        backArray[index][index] = nums[index];
    }
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i+1; j < n; j++) {
            backArray[i][j] = Math.max(nums[i] - backArray[i + 1][j], nums[j] - backArray[i][j - 1])
        }
    }
    return backArray[0][n - 1] >= 0;
};

// 491. 递增子序列 动态规划
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function(nums) {
    let backMap = new Map();
    for (let num of nums) {
        let addKey = [[num]];
        for (let [key,value] of backMap) {
            if(num >= value[value.length -1]) {
                addKey.push(value.concat([num]));
            }
        }
        for (let key of addKey) {
            backMap.set(key.toString(),key);        
        }
    }
    let result = [];
    for (let [key,value] of backMap) {
        if(value.length > 1) {
            result.push(value);
        }
    }
    return result;
};

// 492. 构造矩形 开方找数字
/**
 * @param {number} area
 * @return {number[]}
 */
var constructRectangle = function(area) {
    var num = Math.floor(Math.sqrt(area))
    while(num > 1) {
        if(area%num == 0) {
            return [area/num,num];
        }
        num --;
    }
    return [area,1]
};

// 494.目标和  一个数 肯定是正数或者负数， 那么我们可以加总和 即有  P(+) + P(-) = target 而 P(+) - p(-) = sum; 
// 那么即有P(+) = (tagrget + sum)/2  也就是问题被转化成了 有个数组找出有多少个子集和为一个数  这就是一个背包问题
// 背包问题的解法就是动态规划， 先用数组记录每个数能生成的次数，每次加一个数则遍历一遍比他大的数 减去这个数累加。如此计算
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function(nums, S) {
    var sum = 0;
    for(num of nums) {
        sum += num;
    }
    if(S > sum || (S + sum)%2 == 1) {
        return 0;
    }
    var  newS =  (S + sum)/2;

    var backArray = Array();
    backArray.push(1);
    var sumNum = newS 
    while(sumNum > 0) {
        backArray.push(0);
        sumNum--;
    }
    for(num of nums) {
        var taget =  newS ;
        while (taget >= num) {
            backArray[taget] += backArray[taget - num];
            taget--;
        }
    }
    return backArray[newS];
};

// 495.提莫攻击 
/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
var findPoisonedDuration = function(timeSeries, duration) {
    if(timeSeries.length < 1) { return 0;}
    if(timeSeries.length == 1) {return duration;}
    var time = duration;
    var before = timeSeries[0];
    for (let index = 1; index < timeSeries.length; index++) {
        const element = timeSeries[index];
        time +=  element - before > duration ? duration :  element - before;
        before = element;
    }
    return time;
};

// 496.下一个更大元素 1   映射加堆栈
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
    var map =  new Map();
    var stack = Array();
    for (let index = 0; index < nums2.length; index++) {
        const element = nums2[index];
        while(stack.length > 0 && stack[stack.length - 1] < element) {
            map.set(stack[stack.length - 1],element);
            stack.pop();
        } 
        stack.push(element);
    }
    while(stack.length > 0) {
        map.set(stack[stack.length - 1],-1);
            stack.pop();
    }
    var reslut = Array();
    for(let num of nums1) {
        reslut.push(map.get(num));
    }
    return reslut;
};

// 498. 对角线遍历 找规律
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var findDiagonalOrder = function(matrix) {
    if(matrix.length == 0) {return []}
    let m = matrix.length,n = matrix[0].length,i=0,ans = []
    while(i < m + n) {
        let x = 0, y = 0,add = 0
        if(i%2 == 0) {
            x = i < m ?i : m - 1;
            y = i - x
            add = -1
        } else {
            y = i < n ?  i : n -1;
            x = i -y
            add = 1
        }
        while(x >= 0 && x < m && y >= 0 && y< n) {
            ans.push(matrix[x][y])
            x +=  add
            y -= add
        }
        i++
    }
    return ans;
};

// 500. 键盘行  基础逻辑题
/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(words) {
    let result = [];
    for (let word of words) {
        let checkWord = word.toLowerCase();
        let head = checkWord.substr(0,1);
        let check = "zxcvbnm";
        if("qwertyuiop".indexOf(head) != -1) {
            check = "qwertyuiop";
        } else if("asdfghjkl".indexOf(head) != -1) {
            check = "asdfghjkl"
        }
        let isCan = true;
        for (let i = 0; i < checkWord.length; i++) {
            if(check.indexOf(checkWord.substr(i,1)) == -1) {
                isCan = false;
                break;
            } 
        }
        if(isCan) {
            result.push(word);
        }
    }
    return result;
};

// 501.二叉搜索树中的众数 基础逻辑题
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function(root) {
    if(!root) {return []}
    let result = [];
    let sum = 0;
    let num = 0;
    let max = 0;
    dfs(root);
    if(sum > max) {
        result = [num]
        max = sum
    } else if(sum == max) {
        result.push(num);
    }
    function dfs(node) {
        if(!node) {return};
        dfs(node.left);
        if(node.val == num) {
            sum++;
        } else {
            if(sum > max) {
                result = [num]
                max = sum
            } else if(sum == max) {
                result.push(num);
            }
            num = node.val
            sum = 1
        } 
        dfs(node.right);
    }
    return result;
};

// 503.下一个更大元素2  这里都可以不用map记录了 用数组就可以了
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(nums) {
    var map =  new Map();
    var stack = Array();
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        while(stack.length > 0 && nums[stack[stack.length - 1]] < element) {
            map.set(stack[stack.length - 1],element);
            stack.pop();
        } 
        stack.push(index);
    }
    var index = 0;
    while(stack.length > 1 && index < nums.length) {
       const element = nums[index];
        while(stack.length > 0 && nums[stack[stack.length - 1]] < element) {
            map.set(stack[stack.length - 1],element);
            stack.pop();
        } 
        index++;
    }
    while(stack.length > 0) {
        map.set(stack[stack.length - 1],-1);
        stack.pop();
    }
    var  reslut = Array();
    for (let index = 0; index < nums.length; index++) {
        reslut.push(map.get(index))
    }
    return reslut;
};

// 504. 七进制数 基本逻辑 
/**
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function(num) {
    let isNegative = num < 0 ?  true : false
    num = Math.abs(num)
    let result = ''
    if(num == 0) {
        result = '0'
    }
    while(num != 0) {
      result = (num%7).toString() + result;
       num = Math.floor(num/7)
    }
    if(isNegative) {
       result = '-' + result;
    }
    return result;
};

// 506.相对名次 排序遍历最简单 还有种方式就是占坑法 比较快 但是会耗费空间
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var findRelativeRanks = function(nums) {
    var newNums = nums.concat();
    newNums.sort(compare);
    var result = [];
    for(num of nums) {
        var index = newNums.indexOf(num);
        if(index == 0) {
            result.push("Gold Medal");
        } else if(index == 1) {
            result.push("Silver Medal");
        } else if(index == 2) {
            result.push("Bronze Medal");
        } else {
            index++;
            result.push(index.toString());
        }
    }
    return result;
    function compare(x,y) {
        return y -x;
    }
};

// 508. 出现次数最多的子树元素和 基础逻辑题 用map记录  然后再遍历找出最大
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findFrequentTreeSum = function(root) {
    var mapBack = new Map();
    dfs(root);
    var max = 0;
    var result = [];
    for(let node of mapBack) {
        if(node[1] == max) {
            result.push(node[0])
        } else if(node[1] > max) {
            max = node[1];
            result = [node[0]]
        }
    }
    return result;

    function dfs(node) {
        if(node == null) {
            return 0;
        }
        var left = dfs(node.left);
        var right = dfs(node.right);
        let num = left + right + node.val;
        mapBack.set(num,mapBack.get(num) != null ? mapBack.get(num) + 1 : 1);
        return num;
    }
};

// 507. 完美数 穷举法
var checkPerfectNumber = function(num) {
    return num == 6 || num == 28 || num == 496 || num == 8128 || num == 33550336;
};

// 509.斐波那契数 循环 
/**
 * @param {number} N
 * @return {number}
 */
var fib = function(N) {
    if(N == 0) {
        return 0;
    } else {
        var back = 0;
        var now = 1;
        while(N > 1) {
            let tap = now;
            now = now + back;
            back = tap;
            N--;
        }
        return now;
    }
};

// 513. 找树左下角的值 二叉树的层序遍历
/**
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function(root) {
    let num = root.val;
    let backup =[root];
    while(backup.length > 0) {
        num = backup[0].val;
        let newBackup = [];
        for(let node of backup) {
            if(node.left) { newBackup.push(node.left)}
            if(node.right) {newBackup.push(node.right)}
        }
        backup = newBackup;
    }
    return num;
};

// 518. 零钱兑换 II  动态规划
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
    if(coins.length == 0 || amount <= 0) {
        return amount == 0 ? 1 : 0;
    }
    var backArray = Array(amount + 1).fill(0);
    backArray[0] = 1;
    for(let coin of coins) {
        for (let j = 1; j < backArray.length; j++) {
            if(j >= coin) {
                backArray[j] = backArray[j] + backArray[j-coin];
            }
        }
    }
    return backArray[amount];
};

// 520. 检测大写字母 基本逻辑题
/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function(word) {
    let upper = word.toLocaleUpperCase()
    if(upper == word) { return true}
    let lower = word.toLocaleLowerCase()
    if(lower  == word) {return true}
    let newWord =  upper.substr(0,1) + lower.substr(1)
    if(newWord == word) {return true}
    return false
};

// 523. 连续的子数组和 记录每次加后的余数 余数相等则表示中间一段相加为目标值
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function(nums, k) {
    if (null == nums || nums.length <= 1) {
        return false;
    }
    var set = [];
    var sum = nums[0];
    if (k != 0) {
        set.push(sum % k);
    } else {
        set.push(sum);
    }
    for (var i= 1; i < nums.length; i++) {
        sum += nums[i];
        if (k != 0) {
            if (sum % k == 0 || (set.indexOf(sum % k)!=-1 && set.indexOf(sum % k)!= set.length - 1)) {
                return true;
            }
            set.push(sum % k);
        } else {
            let num = nums[i] + nums[i-1]
            if (num == 0) {
                return true;
            }
        }
    }
    return false;  
 };

 // 525.连续数组 计算差值的思想
 /**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function(nums) {
    var backMap = new Map();
    var sum = 0;
    var max = 0;
    backMap.set(0,-1);
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        sum +=  element == 1 ? 1 : -1;
        if(backMap.get(sum) != null) {
            max = Math.max(max, index - backMap.get(sum));
        } else {
            backMap.set(sum,index);
        }
    }
    return max;
};

//  530. 二叉搜索树的最小绝对差 二叉树的中序遍历

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function(root) {
    let res = Infinity;
    let back = null;
    dfs(root);
    function dfs(node) {
        if(node == null) {return};
        dfs(node.left);
        if(back != null) {
            res = Math.min(res,node.val - back.val);
        }
        back = node;
        dfs(node.right);
    }
    return res;
};




//538.把二叉搜索树转换为累加树  递归调用
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function(root) {
    var  sum = 0;
    return BST(root)

    function BST(root) {
        if(root == null) {
            return root;
        }
        BST(root.right);
        root.val += sum;
        sum = root.val;
        BST(root.left);
        return root;
    }
};

// 539. 最小时间差 先转化为分数，在排序判断
/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function(timePoints) {
    let numPoint = timePoints.map(function(item, index,array){
        let numArray = item.split(':');
        return parseInt(numArray[0])*60 + parseInt(numArray[1])
    });
    numPoint.sort((a,b)=> a - b)
    let min = 24*60;
    for (let index = 0; index < numPoint.length -1; index++) {
        min = Math.min(min,numPoint[index + 1] - numPoint[index]);
    }
    min = Math.min(min,24*60-numPoint[numPoint.length -1] + numPoint[0]);
    return min;
};

// 540. 有序数组中的单一元素 有序的，就是个判断了
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function(nums) {
    var backNum = 1.1;
    var double = 1;
    for (let num of nums) {
        if (num == backNum) {
            backNum = 1.1;
            double = 1;
        }  else {
            if(double == 1) {
                backNum = num;
                double = 0;
            }  else {
                return backNum;
            }
        }
    }
    return nums[nums.length -1];
};

// 541. 反转字符串 II  基本逻辑题
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function(s, k) {
    var num = s.length;
    var start = 0;
    var result = "";
    while(start < num) {
        var str = s.substr(start,k);
        if(start/k%2 == 0){
            result = result + str.split('').reverse().join(''); 
        } else {
            result =  result + str;
        }
        start += k
    } 
    return result;
};

//543.二叉树的直径  递归
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
    var max = 0;
    distance(root);
    function distance(root) {
        if(root == null) {
            return 0;
        }
        var left = distance(root.left);
        var right = distance(root.right);
        max = Math.max(max,left+right);
        return Math.max(left,right) + 1;
    }
    return max;
};

// 547.朋友圈 Union-Find 算法
/**
 * @param {number[][]} M
 * @return {number}
 */
var findCircleNum = function(M) {
    class UF {
        constructor(num) {
            this.count = num;
            this.size = Array(num)
            this.parent = Array(num)
            for (let i = 0; i < num; i++) {
                this.parent[i] = i;
                this.size[i] = 1;
            }
        }
        union(p,q) {
            let rootP = this.find(p)
            let rootQ = this.find(q)
            if(rootP == rootQ) {
                return
            }
            if (this.size[rootP] > this.size[rootQ]) {
                this.parent[rootQ] = rootP;
                this.size[rootP] += this.size[rootQ];
            } else {
                this.parent[rootP] = rootQ;
                this.size[rootQ] += this.size[rootP];
            }
            this.count--
        }
        connected(p,q) {
            let rootP = this.find(p)
            let rootQ = this.find(q)
            return rootP == rootQ
        }
        find(x) {
            while(this.parent[x] != x) {
                // 进行路径压缩
                this.parent[x] = this.parent[this.parent[x]];
                x = this.parent[x];
            }
            return x;
        }
    }
    let n = M.length
    let uf = new UF(n);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (M[i][j] == 1)
                uf.union(i, j);
        }
    }
    return uf.count;
};
// 551. 学生出勤记录 I  基本逻辑题
/**
 * @param {string} s
 * @return {boolean}
 */
var checkRecord = function(s) {
    var nA = 0;
    var nL = 0;
    for (let index = 0; index < s.length; index++) {
        let char  =  s.substr(index,1);
        if(char == "A") {
            nA++;
            if(nA > 1) {
                return false;
            }
            nL = 0;
        } else if(char == "L") {
            nL++;
            if(nL > 2) {
                return false;
            } 
        } else {
            nL = 0;
        }
    }
    return true;
};

// 557.反转字符串中的单词3  循环就好了
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    var result = "";
    var word = "";
    for (let index = 0; index < s.length; index++) {
        let char = s[index];
        if(char  == " ") {
            result  += word + " "; 
            word = "";
        }  else {
            word =  char + word;
        }
    }
    if(word.length > 0) {
        result = result + word;
    }
    return result;
};

// 559. N叉树的最大深度  N叉数遍历
/**
 * @param {Node} root
 * @return {number}
 */
var maxDepth = function(root) {
    var max = 0;
    dfs(root,0);
    function dfs(node,num) {
        if(node == null) {return };
        num = num + 1;
        max = Math.max(max,num);
        for (let index = 0; index < node.children.length; index++) {
            dfs(node.children[index],num);
        }
    }
    return max;
};

// 560.和为K的子数组  题目中显示的是连续的子数组的个数。 所以可以用字典
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    var backMap = new Map();
    backMap.set(0,1);
    var sum = 0;
    var result = 0;
    for(num of nums) {
        sum += num;
        if(backMap.has(sum - k)) {
            result += backMap.get(sum - k);
        }
        backMap.set(sum,(backMap.get(sum) || 0)+ 1);
    }
    return result;
};

// 561. 数组拆分 I  基础逻辑题 先排序再处理
/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function(nums) {
    nums.sort((a,b) => a -b)
    let result = 0;
    for (let index = 0; index < nums.length; index +=2) {
        result += nums[index];   
    }
    return result;
};

// 563. 二叉树的坡度 递归
/**
 * @param {TreeNode} root
 * @return {number}
 */
var findTilt = function(root) {
    let result = 0;
    if(root == null) {return 0}
    dfs(root);
    function dfs(node) {
      if(node  == null) {return  0};
      let left  = dfs(node.left);
      let right =  dfs(node.right);
      result += Math.abs(left  - right);
      return node.val + left + right;
    }
    return result;
};

// 572.另一个树的子树  对比2个树是否相同
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
var isSubtree = function(s, t) {

    if(!s) { return false;}
    if(sameTree(s,t)) {return true;}
    return isSubtree(s.left,t) || isSubtree(s.right,t);

    function sameTree(tree1,tree2) {
        if(!tree1|| !tree2) {
            if(!tree1 && !tree2) {
                return true;
            } else {
                return false;
            }
        }
        if (tree1.val != tree2.val) {
            return false;
        }
        return sameTree(tree1.left,tree2.left) && sameTree(tree1.right,tree2.right);
    }
};

// 581.最短无序序列 寻找开始点与结束点遍历一次就可以找到了
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function(nums) {
    if(!nums || nums.length < 2) {
        return 0;
    }
    var max = nums[0];
    var min = nums[nums.length -1];
    var end = -1;
    var start = 0;
    for (let index = 0; index < nums.length; index++) {
        var max = Math.max(max,nums[index]);
        var min = Math.min(min,nums[nums.length - 1 - index]);
        if(nums[index] < max) {
            end = index;
        }
        if(nums[nums.length - 1 - index] > min) {
            start = nums.length - 1 - index;
        }
    }
    return  end - start + 1;
};

// 583.两个字符串的删除操作  动态规划
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    let m = word1.length
    let n = word2.length
    let backup = [];
    for (let index = 0; index <= m; index++) {
        backup.push(Array(n+1).fill(0))
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if(word1[i -1] == word2[j-1]) {
                backup[i][j] = backup[i -1][j -1] + 1;
            } else {
                backup[i][j] = Math.max(backup[i-1][j],backup[i][j-1]);
            }
        }
    }
    return m + n - 2*backup[m][n];
};

// 590. N叉树的后序遍历  递归
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var postorder = function(root) {

    var  result = [];
    dfs(root);
    return result;
    
    function dfs(node) {
        if(node == null) {return}
        if(node.children) {
            for(let sun of node.children) {
                dfs(sun)
            }
        }
        result.push(node.val);
    }
};





// 594.最长和谐子序列  先设置到map里 在做排序计算
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function(nums) {
    if(nums.length < 2) {
        return 0;
    }
    var myMap = new Map();
    for (let num of nums) {
        myMap.set(num,(myMap.get(num) || 0) + 1);
    }
    var keyArray = Array()
    for(let key of myMap) {
        keyArray.push(key[0]);
    }
    var newNums = keyArray.sort(compare);
    var beforeNum = newNums[0];
    var beforeCount = 0;
    var maxNum = 0;
    for(let num of newNums) {
        let nowConut = myMap.get(num);
        if((num - beforeNum) == 1) {
            maxNum = Math.max(maxNum,nowConut+beforeCount);
        } 
        beforeCount = nowConut;
        beforeNum = num;
    }
    return maxNum;
    function compare(value1, value2) {
        return value1 - value2;
    }
};

// 599. 两个列表的最小索引总和  基础逻辑题 空间换时间
/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
var findRestaurant = function(list1, list2) {
    let backMap = new Map();
    let newBack = new Map();
    for (let index = 0; index < list1.length; index++) {
        backMap.set(list1[index],index);
    }
    for (let index = 0; index < list2.length; index++) {
        if(backMap.get(list2[index]) != null) {
            newBack.set(list2[index],index + backMap.get(list2[index]));
        }
    }
    let min = list1.length + list2.length ;
    let result = [];
    for(let node of newBack) {
        if(node[1] < min) {
            min = node[1];
            result = [node[0]];
        } else if(node[1] == min) {
            result.push(node[0]);
        }
    }
    return result;
};

// 605.种花问题   循环一次
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function(flowerbed, n) {
   if(n == 0) {
        return true;
   }
   var checkNum = Math.floor((flowerbed.length + 1)/2)
   if(checkNum < n) {
       return false;
   } 
   var backbed = 1;
   var count = 0;
   for (let index = 0; index < flowerbed.length; index++) {
       let num = flowerbed[index];
       if(num) {
           backbed = 0;
       } else {
           backbed++;
           if(backbed == 3) {
               count++;
               backbed = 1;
               if (count == n) {
                   return true;
               }
           }
       }
   }
   if(backbed == 2) {
       count++;
   }
   return count == n;
};
// 606. 根据二叉树创建字符串  递归
var tree2str = function(t) {
    if (t == null) {return ""}
    let str = t.val.toString()
    let left = tree2str(t.left)
    let right = tree2str(t.right)
    if(left.length > 0 || right.length > 0) {
        str += "(" + left +")"
    }
    if( right.length > 0) {
        str += "(" + right +")"
    } 
    return str;
};

// 611.有效三角形的个数  排序，双指针
/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function(nums) {
    nums.sort((a,b)=> a - b);
    let result = 0;
    for (let i = nums.length -1; i > 1; i--) {
        let j = 0,k = i -1;
        while(j < k) {
            if(nums[j] + nums[k] > nums[i]) {
                result += k -j;
                k--;
            } else {
                j++;
            }
        }
    }
    return result;
};
// 617.合并二叉树
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
    if(!t1) {return t2;}
    if(!t2) {return t1;}
    var newT = new TreeNode(t1.val +t2.val);
    newT.left = mergeTrees(t1.left,t2.left);
    newT.right = mergeTrees(t1.right,t2.right);
    return newT;
};

// 621.任务调度器 扩充思想 考虑最大的情况贪心算法
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
    var  mapBackup = new Map();
    for(task of tasks) {
        
        mapBackup.set(task,(mapBackup.get(task) == null  ? 0 : mapBackup.get(task)) + 1);
    }
    var count = 1;
    var max = 0;
    for(map of mapBackup) {
        if(map[1] > max) {
            max = map[1];
            count = 1;
        } else if(map[1] == max) {
            count++;
        }
    }
    return Math.max((max - 1)*(n+1) + count ,tasks.length)
};

// 628. 三个数的最大乘积  找三个最大值 和两个最小值 逻辑题
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function(nums) {
    let max1 = -10000,max2 = -1000,max3 = -1000,min1 = 1000,min2 = 1000;
    for(let num of nums) {
        if (num > max1) {
            max3 = max2;
            max2 = max1;
            max1 = num;
        }  else if (num > max2) {
            max3 = max2;
            max2 = num;
        } else if(num > max3) {
            max3 = num;
        }
        if(num < min1) {
            min2 = min1;
            min1 = num;
        } else if(num < min2) {
            min2 = num;
        }
    }
    return Math.max(max1*max2*max3,max1*min1*min2);
};

// 633.平方数之和 左右指针
/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function(c) {
    var end =  Math.floor(Math.sqrt(c));
    var start = 0;
    while(start <= end) {
        let num = start*start + end*end;
        if(num == c) {
            return true;
        } else if (num < c) {
            start++;
        } else {
            end--;
        }
    }
    return false;
};

// 637.二叉树的层平均值 二叉树的层序遍历
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function(root) {
    var result = [];
    var backArray = [];
    if(root) {
        backArray.push(root);
    }
    while(backArray.length > 0) {
        var sum = 0;
        var newBack =[];
        for(let tip of backArray) {
            sum += tip.val;
            if(tip.left) { newBack.push(tip.left)};
            if(tip.right) { newBack.push(tip.right)}
        }
        let num =  sum / backArray.length;
        result.push(num);
        backArray = newBack;
    }
    return result;
};

//  643. 子数组最大平均数 I  基础逻辑题
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
    let result = -10000;
    let sum = 0;
    for (let index = 0; index < nums.length; index++) {
        sum += nums[index];
        if(index >= k) {
            sum -= nums[index - k];
        }
        if(index >= k - 1) {
            result = Math.max(sum/k,result);
        }
    }
    return result;
};

// 646.最长数对链  先排序 贪心算法
/**
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function(pairs) {
    pairs.sort((a,b)=> a[1] - b[1])
    var result = 1;
    var lastNum = pairs[0][1]
    for (let index = 1; index < pairs.length; index++) {
        if(pairs[index][0] > lastNum) {
            result++;
            lastNum = pairs[index][1]
        }
    }
    return result;
};

// 648. 单词替换 基础逻辑
/**
 * @param {string[]} dict
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function(dict, sentence) {
    let Objbanned = {}
    for(let i = 0;i<dict.length;i++){
        Objbanned[dict[i]]=0
    }
    let arr = sentence.split(' ')
    for (let i = 0; i < arr.length; i++) {
        let str = arr[i];
        for (let j = 0; j < str.length -1; j++) {
            let instr = str.substring(0,j+1);
            if(Objbanned.hasOwnProperty(instr)) {
                arr[i] = instr;
                break;
            }
        }
    }
    return arr.join(' ');

};

// 650. 只有两个键的键盘 递归
/**
 * @param {number} n
 * @return {number}
 */
var minSteps = function(n) {
    if(n == 1) {
        return 0;
    }
    if (n%2 == 0) {
        return minSteps(n/2) +2;
    }
    let i = 3;
    while(i*i <= n) {
        if(n%i == 0) {
            return minSteps(n/i) +i;
        }
        i+= 2;
    }
    return n;
};

// 653. 两数之和 IV - 输入 BST 二叉树遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function(root, k) {
    var backMap = new Map();
    var stack = Array();
    if(root) {
        stack.push(root);
    }
    while(stack.length > 0) {
       var last = stack[stack.length - 1];
       if (last.left) {
           stack.push(last.left);
           last.left = null;
       } else {
           stack.pop();
            if(backMap.get(last.val)) {
                return true;
            } else {
                backMap.set(k - last.val,"1");
            }
           if(last.right) {
            stack.push(last.right);
           }
       }
    }
    return false;
};

// 654.最大二叉树 递归
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function(nums) {
    if(nums.length == 0) {
        return null;
    }
    var max = nums[0];
    var index = 0;
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        if(num > max) {
            max = num;
            index = i;
        }
    }
    let root = new TreeNode(max);
    var leftNums =  nums.slice(0,index)
    var rightNums = nums.slice(index+1)
    root.left = constructMaximumBinaryTree(leftNums);
    root.right = constructMaximumBinaryTree(rightNums);
    return root;
};
// 655. 输出二叉树  在找到最大深度 在递归
/**
 * @param {TreeNode} root
 * @return {string[][]}
 */
var printTree = function(root) {
    let depth = maxDepth(root);
    let ans = []
    for (let i = 0; i < depth; i++) {

        ans.push(Array(Math.pow(2,depth) -1).fill(''))        
    }
    addNum(root,0,(ans[0].length -1)/2)
    return ans;
    function addNum(node,i,j) {
        if(!node) {
            return
        }
        ans[i][j] = node.val.toString()
        let num = Math.pow(2,depth - i-2)
        addNum(node.left,i+1,j-num)
        addNum(node.right,i+1,j+num)
    }
    function maxDepth(node) {
        if(!node) { return 0}
        return 1+ Math.max(maxDepth(node.left),maxDepth(node.right))
    }
 };
// 657. 机器人能否返回原点 逻辑题
/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function(moves) {
    var RL = 0;
    var UD = 0;
    for (let index = 0; index < moves.length; index++) {
        let char = moves.substr(index,1).toString();
        if(char == "R") {
            RL++;
        }else if(char == "L") {
            RL--;
        }else if (char == "U") {
            UD++;
        }else {
            UD--;
        }
    }
    return RL == 0 && UD == 0;  
};

// 662. 二叉树最大宽度  层序遍历 记录位置
var widthOfBinaryTree = function(root) {
    if(root == null) {return 0};
    let result = 1;
    let nodes = [root];
    let nums = [0];
    while(nodes.length >0) {
        let newNodes = [];
        let newNums = [];
        for (let index = 0; index < nodes.length; index++) {
            let node = nodes[index];
            let num = nums[index];
            if(node.left) {
                newNodes.push(node.left);
                newNums.push(num*2+1);
            }
            if(node.right) {
                newNodes.push(node.right);
                newNums.push(num*2+2);
            }
        }
        nodes = newNodes;
        nums = newNums;
        if(nums.length > 1) {
            result = Math.max(result,nums[nums.length -1] - nums[0] +1);
        }
    }
    return result;
};


// 665.非递减数列 一次递归 记录
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function(nums) {
    if(nums.length < 3) {
        return true;
    }
    var back = nums[0];
    var isfirst = true;
    for (let index = 1; index < nums.length; index++) {
        let num =  nums[index];
        if(num < back) {
            if(isfirst) {
                isfirst = false;
                if(index == 1) {
                    back = num;
                } else {
                    back = nums[index - 2] <= num ?  num : back;
                }
            }else {
                return false;
            }
        } else {
            back = num;
        }
        
    }
    return true;
};

// 667. 优美的排列 II  找规律  贪心算法 先满足条件 最后直接按i补入就好
var constructArray = function(n, k) {  
    let arr = [1]
    for (let i = 1; i < n; i++) {
      arr[i] = k > 0 ? i%2 !== 0 ? arr[i-1] + k-- : arr[i-1] - k-- : i+1
    }
    return arr
};

// 669.修剪二叉搜索树  递归
var trimBST = function(root, L, R) {
    if(root == null) return root;
    if(root.val > R) return trimBST(root.left,L,R);
    if(root.val < L) return trimBST(root.right,L,R);

    root.left = trimBST(root.left,L,R);
    root.right = trimBST(root.right,L,R);
    return root;
};

// 670.最大交换  排序对比
/**
 * @param {number} num
 * @return {number}
 */
var maximumSwap = function(num) {
    var numString = num.toString();
    var numArray = [];
    for (let index = 0; index < numString.length; index++) {
        var oneNum = parseInt(numString.substr(index,1))
        numArray.push(oneNum);
    }
    var start = 0;
    var end = -1;
    var backNum = 10;
    var backArray = numArray.slice();
    backArray.sort(compare);
    for (let index = 0; index < numString.length; index++) {
        var oneNum = parseInt(numString.substr(index,1))
        if(backNum == 10) {
            if(backArray[index] != oneNum) {
                start = index;
                backNum = backArray[index];
            }
        } else {
            if(oneNum == backNum) {
                end  = index;
            }
        }
    }
    
    if(end != -1) {
        var back =  numArray[start];
        numArray[start] = numArray[end];
        numArray[end] = back;
        var sum = 0;
        for (let index = 0; index < numArray.length; index++) {
            sum =  sum*10 + numArray[index];
        }
        return sum;
    } else {
        return num;
    }
 
    function compare(x,y) {
        return y - x;
    }
};

// 简化版本
var maximumSwap = function(num) {
    let result = num
    let numStr = (num + '').split('')
    for (let a = 0; a < numStr.length - 1; a++) {
      let  maxNum = Math.max.apply(null, numStr.slice(a + 1, numStr.length))
      if (parseInt(numStr[a]) < parseInt(maxNum)) {
        let item = numStr[a]
        numStr[a] = maxNum
        numStr[numStr.lastIndexOf(maxNum + '')] = item
        result = parseInt(numStr.join(''))
        break
      }
    }
    return result
  };
// 680. 验证回文字符串 2 双指针
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
    if(s.length < 3) {
        return true;
    }
    var start = 0;
    var end = s.length - 1;
    while(start < end ) {
        if(s.substr(start,1) != s.substr(end,1)) {
            return checkStr(s,start+1,end) || checkStr(s,start,end-1);
        }
        start++;
        end--;
    }
    return true;

    function checkStr (checkString,start, end) {
        while(start < end) {
            if(checkString.substr(start,1) != checkString.substr(end,1)) {
                return false;
            }
            start++;
            end--;
        }
        return true;
    }
};

// 671. 二叉树中第二小的节点 递归
var findSecondMinimumValue = function(root) {
    if(root == null || root.left == null) {
        return -1;
    }
    let left = root.left.val;
    let right = root.right.val;
    if(left == root.val) {
        left  =  findSecondMinimumValue(root.left);
    }
    if(right == root.val) {
        right  =  findSecondMinimumValue(root.right);
    }
    if(left != -1 && right != -1) {
        return Math.min(left,right);
    }
    return left == -1 ? right : left;
};

// 674. 最长连续递增序列 基本逻辑遍历
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function(nums) {
    if(nums.length == 0) { return  0} 
    let sum = 1;
    let num = nums[0];
    let result = 1;
    for (let index = 1; index < nums.length; index++) {
        let newNum = nums[index];
        if(newNum > num) {
            sum++;
        } else {
            result = Math.max(sum,result);
            sum =1;
        }
        num = newNum;
    }
    return Math.max(sum,result);
};

// 682. 棒球比赛  堆栈

/**
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function(ops) {
    var backArray = Array()
    for (let op of ops) {
        if(op == '+') {
            let num = backArray[backArray.length -1] + backArray[backArray.length -2];
            backArray.push(num);
        } else if(op == 'D') {
            let num = backArray[backArray.length -1]*2;
            backArray.push(num);
        }else if(op == 'C') {
            backArray.pop();
        } else {
            backArray.push(parseInt(op));
        }
    }
    var result = 0;
    for (let num of  backArray) {
        result += num; 
    }
    return result;
};

// 687. 最长同值路径 递归
/**
 * @param {TreeNode} root
 * @return {number}
 */
var longestUnivaluePath = function(root) {
    let ans = 0
    dfs(root)
    return ans

    function dfs(node) {
        if(node == null) return 0
        let left = dfs(node.left)
        let right = dfs(node.right)
        let arrowLeft = 0,arrowRight = 0
        if(node.left != null && node.left.val == node.val) {
            arrowLeft = left + 1
        }
        if(node.right != null && node.right.val == node.val) {
            arrowRight = right + 1
        }
        ans = Math.max(ans,arrowLeft + arrowRight)
        return Math.max(arrowLeft,arrowRight)
    }
};

// 692.前K个高频单词  字典排序
/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function(words, k) {
    var mapBack = new Map();
    var arrayBack = new Array();
    for (let index = 0; index < words.length; index++) {
        var key = words[index];
        if(mapBack.get(key) == null) {
            mapBack.set(key,1);
            arrayBack.push(key);
        } else {
            mapBack.set(key,mapBack.get(key) + 1)
        }
    }
    arrayBack.sort(compare)
    return arrayBack.slice(0,k);
    function compare (a,b) {
        if(mapBack.get(a) == mapBack.get(b)) {
            return a.localeCompare(b)
        } else {
            return  mapBack.get(b) - mapBack.get(a)
        }
    }
};

// 693. 交替位二进制数  简单逻辑题
/**
 * @param {number} n
 * @return {boolean}
 */
var hasAlternatingBits = function(n) {
    if(n < 3) {return true}
    var num = n%2;
    var newN = Math.floor(n/2);
    while(newN > 0) {
        var newNum = newN%2;
        if(newNum == num) { return false}
        num = newNum;
        newN = Math.floor(newN/2);
    }
    return true;
};
// 696.计数二进制子串 基础逻辑题
/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function(s) {
    let begain = 0,now = 1, start = s[0],result =0;
    for (let index = 1; index < s.length; index++) {
        if (start == s[index]) {
            now++;
        } else {
            start = s[index]
            result += Math.min(begain,now)
            begain = now
            now = 1
        }
    }
    result += Math.min(begain,now)
    return result;
};

// 697.数组的度 基本逻辑题
/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function(nums) {
    var backMap = new Map()
    for (let index = 0; index < nums.length; index++) {
        let num = nums[index];
        backMap.set(num,backMap.get(num) == null ? 1 : backMap.get(num) + 1);
    }
    var max = 0;
    var backArray = [];
    for(let map of backMap) {
        if(map[1] > max) {
            backArray = [map[0]];
            max = map[1];
        } else if (map[1] == max) {
            backArray.push(map[0])
        }
    }
    if(max == 1) { return 1}
    var min = nums.length;
    for(let num of backArray) {
        var start = 0;
        while(nums[start] != num) {
            start++;
        }
        var end = nums.length - 1;
        while(nums[end] != num) {
            end--;
        }
        min = Math.min(end - start + 1,min);
    }
    return min;
};
// 另外一种写法 少一次循环 用了对象内存开销大
var findShortestSubArray = function(nums) {
    let d = 0;
    let cache = {};
    nums.forEach((num, index) => {
      if (cache[num]) {
        cache[num].size++;
        cache[num].end = index;
      } else {
        cache[num] = {
          size: 1,
          start: index,
          end: index,
        }
      }
      d = Math.max(d, cache[num].size);
    });
    let min = nums.length;
    Object.keys(cache).forEach(item=>{
          let { size, start, end } = cache[item], depth = end - start + 1;
          if(size === d && depth < min){
              min = depth;
          }
    })
    return min;
  };

  // 700. 二叉搜索树中的搜索 递归
  /**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function(root, val) {
    if(root == null) {
        return null;
    }
    if(root.val == val) {
        return root;
    } else if(root.val > val) {
        return searchBST(root.left,val);
    } else {
        return searchBST(root.right,val);
    }
};

// 704. 二分查找  如题
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    var start = 0;
    var end = nums.length;
    while(start <= end) {
        let mid = Math.floor((end - start)/2) + start;
        var num = nums[mid]
        if(num == target) {
            return mid
        } else if (num < target) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return -1;
};
// 709. 转换成小写字母  可以使用ASCII
/**
 * @param {string} str
 * @return {string}
 */
var toLowerCase = function(str) {
    return str.toLowerCase()
};

// 714.买卖股票的最佳时机含手续费  贪心算法
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
    if(prices.length <2) {return 0;} 
    var max = prices[0];
    var min = prices[0];
    var sum = 0;
    var curSum =0;
    for (let index = 1; index < prices.length; index++) {
        const element = prices[index];
        min = Math.min(min,element);
        max = Math.max(max,element);
        curSum = Math.max(curSum,element - min - fee);
        if(max - element >= fee) {
            sum +=curSum;
            curSum = 0;
            max = element;
            min = element;
        } 
    }
    return sum + curSum; 
};

// 717.1比特与2比特字符  逻辑题
/**
 * @param {number[]} bits
 * @return {boolean}
 */
var isOneBitCharacter = function(bits) {
    if (bits.length == 0 ){
        return false;
    }
    if (bits[bits.length] == 1) {
        return false;
    }
    var index = 0;
    while (index < bits.length - 1) {
        if(bits[index] == 1) {
            index +=2;
        } else {
            index++;
        }
    }
    return index == bits.length - 1;
};

// 718.最长重复子数组 动态规划 公式为  D[i][j]=a[i]==b[j]?d[i-1][j-1]+1:0  二维变成一维数组记录即可
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var findLength = function(A, B) {
    var back = [];
    var max = 0;
    for (let index = 0; index < A.length; index++) {
        back.push(0);
    }
    for (let i = 1; i <= A.length; i++) {
        var backNum = back[0];
        for (let j = 1; j <= B.length; j++) {
            if(A[i-1]== B[j - 1]) {
                var num = back[j];
                back[j] = backNum + 1;
                backNum = num;
                max = Math.max(max,back[j]);
            } else {
                backNum  = back[j];
                back[j] = 0;
            }
        }
    }
    return max;
};
// 724.寻找数组的中心索引  基础逻辑遍历
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function(nums) {
    var backArray = [];
    var sum = 0;
    for(let num of nums) {
        sum += num;
        backArray.push(sum);
    }
    if(sum - nums[0] == 0) {return 0; }
    for (let index = 1; index < nums.length; index++) {
        if(backArray[index-1] == sum - backArray[index]) {
            return index;
        }
    }
    return -1;
};

// 725.分隔链表  基础逻辑题
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} root
 * @param {number} k
 * @return {ListNode[]}
 */
var splitListToParts = function(root, k) {
    let length = 0;
    let node = root;
    while(node) {
        length++;
        node = node.next;
    }
    let num  =  Math.floor(length/k);
    if(num == 0) { num++};
    let result = [];
    node = root;
    for (let index = 0; index < k; index++) {
        if(!node) {
            result.push(null);
        }else {
            let run = length - num*k - index > 0 ? num : num - 1;
            let head = node;
            while(run > 0) {
                run--;
                node = node.next;
            } 
            let stap = node.next;
            node.next = null;
            node = stap;
            result.push(head);

        }
    }
    return result;
};


// 728.自除数  逻辑题
/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var selfDividingNumbers = function(left, right) {
    var result = [];
    for (let index = left; index <= right; index++) {
        if(check(index)) {
            result.push(index);
        }
    }
    return result;

    function check (num) {
        var newCheck = num;
        while(newCheck > 0) {
            let tap =  newCheck%10;
            if (tap == 0 || num%tap != 0) {
                return false;
            }
            newCheck = Math.floor(newCheck/10);
        }
        return true;
    }
    
};

// 735.行星碰撞  堆栈 逻辑判断
/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function(asteroids) {
    var backArray = [];
    for(num of asteroids) {
        if(backArray.length == 0) {
            backArray.push(num);
        } else {
            let lastNum = backArray[backArray.length -1];
            if(lastNum > 0 && num < 0)  {
                while(backArray.length > 0 && backArray[backArray.length -1] < Math.abs(num) && backArray[backArray.length - 1] > 0) {
                    backArray.pop();
                }
                if(backArray.length > 0) {
                    if(backArray[backArray.length -1] == Math.abs(num)) {
                        backArray.pop();
                    } else if (backArray[backArray.length -1] < 0) {
                        backArray.push(num);
                    }
                } else {
                    backArray.push(num);
                }
            } else {
                backArray.push(num);
            }
        }
    }
    return backArray;
};


// 738.单调递增的数字 主要判断增减性
/**
 * @param {number} N
 * @return {number}
 */
var monotoneIncreasingDigits = function(N) {
    var newNum = N;
    var backArray = Array();
    while(newNum != 0) {
        var num = newNum%10;
        newNum = Math.floor(newNum/10);
        if(backArray.length == 0 || backArray[backArray.length - 1] >= num) {
            backArray.push(num);
        } else {
            num--;
            for (let index = 0; index < backArray.length; index++) {
                backArray[index] = 9;
            }
            backArray.push(num);
        }
    } 
    var result = 0;
    while(backArray.length >0) {
        result = result*10 + backArray.pop();
    }
    return result;
};

// 739.每日温度 堆栈记录
/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
    var result = Array();
    var backArray = Array();
    for (let index = 0; index < T.length; index++) {
        result.push(0);
        let num = T[index];
        while(backArray.length > 0) {
            let i = backArray[backArray.length -1];
            if(T[i] < num) {
                result[i] = index - i;
                backArray.pop();
            } else {
                break;
            }
        } 
        backArray.push(index);
    }
    return result;
};

// 740. 删除与获得点数  其实就是打家劫舍的思想
/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function(nums) {
    if(nums.length == 0) {return 0};
    var mapback = new Map();
    var newNums = [];
    for(let num of nums) {
        if(mapback.get(num)) {
            mapback.set(num,mapback.get(num)+num);
        } else {
            mapback.set(num,num);
            newNums.push(num);
        }
    }
    newNums.sort(compare);
    var have  = mapback.get(newNums[0]);
    var nohave = 0;
    for (let index = 1; index < newNums.length; index++) {
        var backnoHave = nohave;
        nohave = Math.max(have,nohave);
        if(newNums[index] - 1>newNums[index -1] ){
            have = nohave + mapback.get(newNums[index])
        } else {
            have = Math.max(backnoHave+mapback.get(newNums[index]),have);
        }
    }
    return Math.max(have, nohave);

    function compare(x,y) {
        return x - y;
    }
};

// 744. 寻找比目标字母大的最小字母 基础逻辑
/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function(letters, target) {
    let min = letters[0].charCodeAt();
    let tnum = target.charCodeAt();
    let isC = min <= tnum; 
    for (let index = 1; index < letters.length; index++) {
        let inNum = letters[index].charCodeAt();
        if(inNum > tnum) {
            if(isC) {
                min = inNum;
                isC = false;
            } else {
                min = Math.min(min,inNum);
            }
        } else {
            if(isC) {
                min = Math.min(min,inNum)
            } 
        }
    }
    return String.fromCharCode(min)
};

//  746. 使用最小花费爬楼梯 动态规划
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
    let last = cost[0];
    let now = cost[1];
    for (let index = 2; index < cost.length; index++) {
        let num = cost[index];
        num += Math.min(last,now);
        last = now;
        now = num;
    }
    return Math.min(last,now);
};

// 747.至少是其他数字两倍的最大数 循环一次记录
/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndex = function(nums) {
    if(nums.length < 2) {
        return 0;
    }
    var max1 = 0;
    var max2 = 0;
    var index1 = 0;
    if(nums[0] > nums[1]) {
        max1 = nums[0];
        max2 = nums[1];
    } else {
        max1 = nums[1];
        max2 = nums[0];
        index1 = 1;
    }
    for (let index = 2; index < nums.length; index++) {
        let num = nums[index];
        if(num > max1) {
            max2 = max1;
            max1 = num;   
            index1 =index
        } else if(num > max2) {
            max2 = num;
        }
    }
    if(max1 >= max2*2) {
        return index1;
    } else {
        return -1;
    }
};

// 748. 最短完整词  简单逻辑题
/**
 * @param {string} licensePlate
 * @param {string[]} words
 * @return {string}
 */
var shortestCompletingWord = function(licensePlate, words) {
    licensePlate = licensePlate.toLowerCase();
    let checkStr = "";
    for (let index = 0; index < licensePlate.length; index++) {
        let char = licensePlate[index];
        if( 90< char.charCodeAt() && char.charCodeAt() < 123) {
            checkStr += char;
        }
    }
    // 十六位 当标兵 题目描述单词最长15位
    let min = "xxxxxxxxxxxxxxxx";
    for(let word  of words) {
        if(word.length >= min.length) {
            continue;
        }
        let ishave = true;
        let checkWord = word;
        for (let index = 0; index < checkStr.length; index++) {
            let char = checkStr[index];
            let num = checkWord.indexOf(char);
            if(num == -1) {
                ishave = false;
                break;
            }
            checkWord = checkWord.substring(0,num) + checkWord.substring(num+1,checkWord.length);
        }
        if(ishave) {
            min = word;
        }
    }
    return min.length > 15 ? "" : min;
};



// 754.到达终点数字 找规律计算 先全加 再找一个数字减 可以只考虑正数的情况
/**
 * @param {number} target
 * @return {number}
 */
var reachNumber = function(target) {
    if(target < 0) {target = -target}
    var i = 0;
    sum = 0;
    while(sum < target) {
        i++;
        sum += i; 
    }
    if((sum - target)%2 == 0) {
        return i;
    }
    if(i%2 == 0) {
        return i+1;
    }
    return i+2;
};

// 762. 二进制表示中质数个计算置位 基础逻辑题 看1一共几个
/**
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
var countPrimeSetBits = function(L, R) {
    let result = 0;
    let backup = [0,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0];
    for (let i = L; i <= R; i++) {
        let checkNum = i
        let cnt = 0;
        while (checkNum != 0) {
            cnt++;
            checkNum &= (checkNum - 1)
        }
        result += backup[cnt]
    }
    return result
};

// 763. 划分字母区间 贪心算法 数组记录
/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function(S) {
    let backup = new Array(26).fill(0);
    for (let i = 0; i < S.length; i++) {
        let char =  S[i];
        backup[char.charCodeAt() - 97] = i;
    }
    let start = 0,end = 0,ans = [];
    for (let i = 0; i < S.length; i++) {
        end = Math.max(end,backup[S[i].charCodeAt() -97])
        if(end == i) {
            ans.push(end - start + 1);
            start = i +1;
        }
    }
    return ans;
};

// 767. 重构字符串 最大堆 贪心算法
/**
 * @param {string} S
 * @return {string}
 */
var reorganizeString = function(S) {
    let backup = Array(26).fill(0);
    for (let index = 0; index < S.length; index++) {
        backup[S[index].charCodeAt() -97]++;
    }
    let fort ='#'
    let result ='';
    for(i = 0;i< S.length;i++) {
        let max = 0;
        let index = -1;
        for (let j = 0; j < 26; j++) {
            if(String.fromCharCode(j+ 97) != fort && backup[j] > max) {
                index = j;
                max =  backup[index];
            }
        }
        if(index == -1) {
            return '';
        } 
        fort = String.fromCharCode(index+ 97);
        backup[index]--;
        result +=fort; 
    }
    return result;
};

// 769.最多能完成排序块  关键 左边最大 小于 右边最小 就可以分割 贪心算法
/**
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted = function(arr) {
    if(arr.length <= 1) {
        return arr.length;
    }
    var minBack = new Array(arr.length);
    minBack[arr.length - 1] = arr[arr.length -1];
    for (let index = arr.length -2; index >= 0; index--) {
        minBack[index] = Math.min(arr[index],minBack[index + 1]);
    }
    var  max = arr[0];
    var count = 1;
    for (let index = 1; index < arr.length; index++) {
        let num = arr[index];
        if(minBack[index] >= max) {
            count++;
            max = arr[index];
        } else {
            max = Math.max(max,arr[index]);
        }
    }
    return count;
};

// 数字是连续数字 可以更简单
var maxChunksToSorted = function(arr) {
    let count=0;
    for(let i=0,max=0;i<arr.length;count++){
        do{
            max=Math.max(max,arr[i++]);
        }while(i!=max+1)
    }
    return count;
};

// 771.宝石与石头 遍历判断就可以了
/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function(J, S) {
    var count = 0;
    for (let index = 0; index < S.length; index++) {
        let char = S.substr(index,1);
        if(J.indexOf(char) !=-1) {
            count++;
        }
    }
    return count;
};

//  777.在LR字符串中交换相邻字符   R只能网友L只能往左  细细思考下就可以了
/**
 * @param {string} start
 * @param {string} end
 * @return {boolean}
 */
var canTransform = function(start, end) {
    if(start.length != end.length) {return false} 
    var i = 0,j = 0;
    while(i<end.length && j< end.length) {
        while(start.substr(i,1) =="X") {
            i++;
        }
        while(end.substr(j,1) =="X") {
            j++;
        }
        if(start.substr(i,1) != end.substr(j,1)) {
            return false;
        }
        if(start.substr(i,1) == 'L' &&i<j) {
            return false;
        }
        if(start.substr(i,1) == 'R' &&i>j) {
            return false;
        }
        i++;
        j++;
    }
    return true;
};
// 779. 第K个语法符号  递归  后面一个数肯定是由前面一个数推断过来的 所以不需要知道完整的数列
/**
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
var kthGrammar = function(N, K) {
    if(N == 1) {
        return 0;
    }
    if(K%2 == 0) {
        return kthGrammar(N-1,K/2) == 0 ? 1 : 0;
    } else {
        return kthGrammar(N-1,(K + 1)/2) == 0 ? 0 : 1;
    }
 };

 // 781. 森林中的兔子  字典记录然后计算
/**
 * @param {number[]} answers
 * @return {number}
 */
var numRabbits = function(answers) {
    let backMap = new Map()
    for (let answer of answers) {
        backMap.set(answer, (backMap.get(answer) || 0) +1);
    }
    let result = 0;
    for (let sum of backMap) {
        let key = sum[0];
        let value = sum[1];
        if(key == 0) {
            result += value;
        } else {
            let num = Math.floor(value/(key+1));
            if(value%(key+1)!= 0) {
                num++;
            }
            result += num*(key+1);
        }
    }
    return result;
};

 // 783. 二叉搜索树结点最小距离 二叉树的中序遍历
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function(root) {
    var min = Number.MAX_VALUE;
    var pre = null;
    dfs(root);
    function dfs(node) {
        if(node ==null) return;
        dfs(node.left);
        if(pre) {
            min = Math.min(min, node.val - pre);
        }
        pre = node.val;
        dfs(node.right);
    }    
    return min;
};

// 784. 字母大小写全排列 基本逻辑
/**
 * @param {string} S
 * @return {string[]}
 */
var letterCasePermutation = function(S) {
    let result = [];
    dfs(0,"")
    function dfs(index,str) {
        if(index == S.length) {
            result.push(str);
            return;
        }
        let char = S.substr(index,1);
        let num = index +1
        if("1234567890".indexOf(char) == -1) {
            dfs(num,str + char.toLowerCase());
            dfs(num,str + char.toUpperCase());
        }else {
            dfs(num,str + char);
        }
    }
    return result;
};



// 788.旋转数字 简单的逻辑思考
/**
 * @param {number} N
 * @return {number}
 */
var rotatedDigits = function(N) {
    var array1 = [3,4,7];
    var array2 = [2,5,6,9];
    var num = 1; 
    var count = 0;
    while (num <= N) {
        var checkNum = num;
        var isHave = false;
        while(true) {
            if (checkNum == 0) {
                if(isHave) {
                    count++;
                }
                break;
            }
            var num1 = checkNum%10;
            checkNum = Math.floor(checkNum/10);
            if(array1.indexOf(num1) != -1) {
                break;
            }
            if(array2.indexOf(num1) != -1) {
                isHave = true;
            } 
        }
        num++;
    }
    return count;
};

// 791. 自定义字符串排序  基础逻辑题
/**
 * @param {string} S
 * @param {string} T
 * @return {string}
 */
var customSortString = function(S, T) {
    let result = "";
    let backArray =  new Array(S.length).fill(0);
    for (let index = 0; index < T.length; index++) {
        let char  = T[index];
        let num = S.indexOf(char);
        if(num > -1) {
            backArray[num] +=1;
        } else {
            result += char;
        }
    }
    for (let index = 0; index < backArray.length; index++) {
        let num = backArray[index];
        while(num > 0) {
            result += S[index];
            num--;
        }
    }
    return result;
};

// 795.区间子数数组个数
var numSubarrayBoundedMax = function(A, L, R) {
    var c_length = 0;  // 遍历位置
    var c_last_key_length = 0; // 最后一个满足条件的位置
    var sum = 0; //  总和
    for(let num of A) {
        if (num  > R) {
            c_length = 0;
            c_last_key_length = 0;
        } else if (num < L) {
            c_length++;
            sum += c_last_key_length;
        } else {
            c_length++;
            c_last_key_length = c_length;
            sum += c_last_key_length;
        }
    }
    return sum;
};

// 796. 旋转字符串  2个字符串拼接后是否包含另外一个字符串就可以了
/**
 * @param {string} A
 * @param {string} B
 * @return {boolean}
 */
var rotateString = function(A, B) {
    if (A.length !== B.length) {return false}
    return (B + B).includes(A)
};

// 804. 唯一摩尔斯密码词 基础逻辑题 
var uniqueMorseRepresentations = function (words) {
    return new Set(words.map(wordsItem => Array.from(wordsItem).reduce((org, wordItem) => org + [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."][wordItem.charCodeAt() - 97], ""))).size
};

// 806.写字符串需要的行数 基础逻辑
/**
 * @param {number[]} widths
 * @param {string} S
 * @return {number[]}
 */
var numberOfLines = function(widths, S) {
    let len = 1;
    let sum = 0;
    for(let node of S) {
        let num = widths[node.charCodeAt() - 97];
        if(sum + num > 100) {
            len++;
            sum = num;
        } else {
            sum += num;
        }
    }
    return [len,sum];
};

// 813.最大平均和的分组 首先要推出公示 dp[i][k] = dp[j][k-1] + sum(i-j)/(i-j)  也是规划递推
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var largestSumOfAverages = function(A, K) {
    var sum = Array();
    var ave = Array();
    sum.push(A[0]);
    ave.push(A[0]);
    for (let index = 1; index < A.length; index++) {
        const num = A[index];
        sum.push(sum[sum.length - 1] + num);
        let mid = sum[index]/(index+1);
        ave.push(mid);
    }
    var n = 1;
    while(n < K) {
        var tmp = Array();
        for (let index = 0; index < A.length; index++) {
            tmp.push(0);
        }
        for (let i = n; i < A.length; i++) {
            for (let j = n - 1; j < i; j++) {
                var ksum = ave[j] +(sum[i] -sum[j])/(i-j);
                tmp[i] = Math.max(tmp[i],ksum);
            }
        }
        ave = tmp;
        n++;
    }
    return ave.pop()
};

// 814.二叉树剪枝 递归
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
var pruneTree = function(root) {
    if(!root) {
        return null;
    }
    root.left = pruneTree(root.left);
    root.right = pruneTree(root.right);
    if(root.left == null && root.right == null && root.val == 0) {
        return null;
    } else {
        return root;
    }
};

// 819. 最常见的单词  基础逻辑，正则筛选
/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function(paragraph, banned) {
    const Objbanned = {}
    for(let i = 0;i<banned.length;i++){
        Objbanned[banned[i]]=0
    }
    const arr = paragraph.toLowerCase().replace(/\W/g,' ').split(' ').filter(x=> !Objbanned.hasOwnProperty(x) && x !=='')
    const obj = {}
    let max = 0
    let revl = ''
    for(let i=0;i<arr.length;i++){
        if(!obj.hasOwnProperty(arr[i])) {
            obj[arr[i]] = 1
        } else {
            obj[arr[i]]++
        }
        if(max<obj[arr[i]]){
           max = obj[arr[i]]
           revl = arr[i]
        }
        
    }
    return revl
};

// 821.字符的最短距离  先找出目标的位置，然后位置相减得到距离
/**
 * @param {string} S
 * @param {character} C
 * @return {number[]}
 */
var shortestToChar = function(S, C) {
    var backArray = Array();
    for (let index = 0; index < S.length; index++) {
        if(S.substr(index,1) == C) {
            backArray.push(index);
        }
    }
    var num = 0;
    var result = Array();
    for (let index = 0; index < S.length; index++) {
        if(index <= backArray[num]) {
            result.push(backArray[num] - index)
        } else {
            if(num < backArray.length - 1) {
                if(index < backArray[num+1]) {
                    result.push(Math.min(backArray[num + 1] - index,index - backArray[num]))
                } else {
                    num = num+1;
                    result.push(0);
                }
            } else {
                result.push(index - backArray[num])
            }
        }
    }
    return result;
};

// 824.山羊拉丁文  基础逻辑题
/**
 * @param {string} S
 * @return {string}
 */
var toGoatLatin = function(S) {
    let backup = S.split(' ')
    let check = 'AaEeIiOoUu'
    let result = "";
    for (let index = 0; index < backup.length; index++) {
        let char = backup[index];
        if(check.indexOf(char[0]) == -1) {
            char  =  char.slice(1) + char[0]
        }
        let num = index;
        char += 'ma';
        while(num >= 0) {
            char += 'a';
            num--;
        }
        result = result + ' ' + char;
    }
    return result.slice(1);
};

// 826.安排工作以达到最大收益 贪心算法 工作隐射
/**
 * @param {number[]} difficulty
 * @param {number[]} profit
 * @param {number[]} worker
 * @return {number}
 */
var maxProfitAssignment = function(difficulty, profit, worker) {
    var mapBack = new Map()
    for (let index = 0; index < difficulty.length; index++) {
        if(mapBack.get(difficulty[index]) != null) {
            mapBack.set(difficulty[index],Math.max(mapBack.get(difficulty[index]),profit[index]));
        } else {
            mapBack.set(difficulty[index],profit[index]);
        }
    }
    difficulty = difficulty.sort(compare);
    worker =  worker.sort(compare);
    var max = 0;
    var i = 0;
    var sum = 0;
    for (let index = 0; index < worker.length; index++) {
        let work = worker[index];
        while (difficulty[i] <= work && i < difficulty.length) {
            max = Math.max(max,mapBack.get(difficulty[i]))
            i++;
        }
        sum +=  max;
    }
    return sum;

    function compare(x,y) {
        return x - y; 
    }
};

// 830. 较大分组的位置 基础逻辑
/**
 * @param {string} S
 * @return {number[][]}
 */
var largeGroupPositions = function(S) {
    var backChar = "";
    var  backIndex = 0
    var result = []
    for (let index = 0; index < S.length; index++) {
        let char  = S.substr(index,1);
        if(backChar != char) {
            if(index - backIndex > 2) {
                result.push([backIndex,index -1])
            }
            backChar = char;
            backIndex = index;
        }
    }
    if(S.length - backIndex > 2 ){
        result.push([backIndex,S.length -1])
    }
    return result;
};

// 836. 矩形重叠 基础逻辑
/**
 * @param {number[]} rec1
 * @param {number[]} rec2
 * @return {boolean}
 */
var isRectangleOverlap = function(rec1, rec2) {
    return !(rec1[2] <= rec2[0] ||   // left
        rec1[3] <= rec2[1] ||   // bottom
        rec1[0] >= rec2[2] ||   // right
        rec1[1] >= rec2[3]);    // top
};

// 841. 钥匙和房间 数组记录
/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function(rooms) {
    if(rooms.length == 0) {return true}
    let backArray = new Array(rooms.length).fill(0);
    backArray[0] = 1;
    let keyArray = rooms[0];
    while(keyArray.length > 0) {
        var key = keyArray.pop();
        if(backArray[key] == 0) {
            keyArray =  keyArray.concat(rooms[key]);
            backArray[key] = 1;
        }
    }
    for (let num of backArray) {
        if(num != 1) {
            return false;
        }
    }
    return true;
};

// 845. 数组中的最长山脉  逻辑题，增加标识位
/**
 * @param {number[]} A
 * @return {number}
 */
var longestMountain = function(A) {
    let max = 1;
    let isHill = true;
    let length = 1;
    for (let index = 1; index < A.length; index++) {
        if(A[index] >A[index-1] && isHill) {
            length++;
        } else if (A[index] < A[index-1] && length > 1) {
            isHill = false;
            length++;
            max = Math.max(length,max);
        } else {
            if(!isHill) {
                index--;
            }
            isHill = true;
            length = 1;
        }
    }
    return max > 2 ? max : 0;
};


// 849.到最近的人的最大距离 逻辑题
/**
 * @param {number[]} seats
 * @return {number}
 */
var maxDistToClosest = function(seats) {
    var start = -1;
    var max = 0;
    for (let index = 0; index < seats.length; index++) {
        var num = seats[index];
        if(num == 1) {
            if(start == -1) {
                start = index;
                max = index;                
            } else {
                max = Math.max(max,Math.floor((index-start)/2));
                start = index;
            }
        }
    }
    max = Math.max(seats.length - start - 1, max)
    return max
};

// 856. 括号的分数 堆栈
/**
 * @param {string} S
 * @return {number}
 */
var scoreOfParentheses = function(S) {
    var backArray = [];
    for (let index = 0; index < S.length; index++) {
        let char  = S.substr(index,1);
        if(char == "(") {
            backArray.push("(")
        } else {
          var node =  backArray.pop()
          if(node == "(") {
              backArray.push(1);
          } else {
              var num = 0;
              while(node != "(") {
                  num += node;
                  node =  backArray.pop()
              }
              num = num*2;
              backArray.push(num)
          }
        }
    }
    var result = 0;
    for (let index = 0; index < backArray.length; index++) {
        result += backArray[index];        
    }
    return result;
};

//870. 优势洗牌 先排序 后判断 再取出 还可以字典优化 加快
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var advantageCount = function(A, B) {
    let backB = B.concat();
    A.sort(compare);
    B.sort(compare);
    
    var i = 0;
    var j =0;
    var arry1 = [];
    var arry2 = [];

    while(i < A.length) {
        if(A[i] >B[j]) {
            arry1.push(A[i]);
            i++;
            j++;
        }else {
            arry2.push(A[i]);
            i++;
        }
    }
    var newA = arry1.concat(arry2);
    var result = [];
    for(let num of backB) {
        var index = B.indexOf(num);
        result.push(newA[B.indexOf(num)])
        B.splice(index,1);
        newA.splice(index,1);
    }
    return result;

    function compare(x,y) {
        return x-y;
    }
};
// 字典隐射
var advantageCount = function(A, B) {
    let sortedA = A.clone();
    sortedA.sort((a, b)=>a-b);
    let sortedB = B.clone();
    sortedB.sort((a, b)=>a-b);
    
    let assigned = new Map();
    B.forEach(b=> assigned.set(b, []))
    
    let remaining = [];
    let j = 0;
    
    sortedA.forEach((a)=>{
        if(a > sortedB[j]) {
            assigned.get(sortedB[j++]).push(a)
        } else {
            remaining.push(a)
        }
    })
    
    let ans = new Array(B.length);
    
    for(let i=0; i<B.length; ++i){
        if(assigned.get(B[i]).length >0) {
            ans[i] = assigned.get(B[i]).pop()
        } else {
            ans[i] = remaining.pop();
        }
    }
    return ans;
};

Array.prototype.clone = function(){
    let newArr = JSON.parse(JSON.stringify(this));
    return newArr;
}


// 844.比较含退格的字符串 正序得出结果对比 更快的是反向对比，然后如果是# 跳过前面的字符。
/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function(S, T) {

    let newS = checkStr(S);
    let newT = checkStr(T);
    return newS == newT;

    function checkStr(Str) {
        var newStr = "";
        for (let index = 0; index < Str.length; index++) {
            let char = Str.substr(index,1);
            if(char != "#") {
                newStr = newStr + char.toString();
            } else {
                if(newStr.length >0) {
                    newStr = newStr.substr(0,newStr.length -1);
                }
            }
        }
        return newStr;
    }
};

var backspaceCompare = function(S, T) {

    let newS = checkStr(S);
    let newT = checkStr(T);
    return newS == newT;

    function checkStr(Str) {
        var newStr = "";
        for (let index = 0; index < Str.length; index++) {
            let char = Str.substr(index,1);
            if(char != "#") {
                newStr = newStr + char.toString();
            } else {
                if(newStr.length >0) {
                    newStr = newStr.substr(0,newStr.length -1);
                }
            }
        }
        return newStr;
    }
};



// 846.一手顺子  先排序 再删除判断
/**
 * @param {number[]} hand
 * @param {number} W
 * @return {boolean}
 */
var isNStraightHand = function(hand, W) {
    if(W == 1) { return true};
    if(hand.length %W != 0) {
        return false;
    }
    hand.sort(compare);

    while(hand.length > 0){
        var index = 0;
        var num = hand[0];
        var check = W - 1;
        hand.splice(0,1)
        while(index < hand.length && check > 0) {
            if(num == hand[index]) {
                index++
            } else if (num + 1 == hand[index]) {
                num = num +1;
                hand.splice(index,1);
                check--;
            } else {
                return false;
            }
        }
        if(check != 0) {return  false};
    }
    return true;
    function compare(value1, value2) {
        return value1 - value2;
    }
};

// 852.山脉数组的峰顶索引  二分法
/**
 * @param {number[]} A
 * @return {number}
 */
var peakIndexInMountainArray = function(A) {
    var start = 0; 
    var end = A.length;
    while(start + 1 < end) {
        var mid = Math.floor( (end - start)/2) + start;
        if(A[mid + 1] > A[mid]){
            start = mid + 1;
        } else {
            end = mid;
        }
    }
    return (start == A.length - 1 || A[start] > A[start +1]) ? start : end;
};

//853.车队 倒算 算时间
/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function(target, position, speed) {
    if(position.length == 0) {return 0;}
    var mapBack =new Map();
    for (let index = 0; index < position.length; index++) {
        mapBack.set(position[index],speed[index]);
    }
    position.sort(compare);
    var count = 1;
    var time  = (target - position[0])/mapBack.get(position[0]);
    for (let index = 1; index < position.length; index++) {
        var inTime = (target - position[index])/mapBack.get(position[index]);
        if(time < inTime) {
            count++;
            time = inTime;
        }
    }
    return count;
    function compare (x,y) {
        return y - x;
    }
};

// 859.亲密字符串 列举情况
/**
 * @param {string} A
 * @param {string} B
 * @return {boolean}
 */
var buddyStrings = function(A, B) {
    if(A.length != B.length) {return false}
    if(A == B) {
        var backMap = new Map()
        for (let index = 0; index < A.length; index++) {
            var char  =  A.substr(index,1);
            if(backMap.get(char) != null) {
                return true;
            } else {
                backMap.set(char,1);
            }
        }
        return false;
    } else {
        var first = -1;
        var second = -1;
        for (let index = 0; index < A.length; index++) {
            if(A.substr(index,1)!=B.substr(index,1)) {
                if(first == -1) {
                    first = index;
                } else if (second == -1) {
                    second = index;
                } else {
                    return false;
                }
            }
        }
        return second != -1 && A.substr(first,1) == B.substr(second,1) && B.substr(first,1) == A.substr(second,1)
    }
};

// 860.柠檬水找零 基本逻辑题
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
    var five = 0;
    var ten = 0;
    for(let bill of bills) {
        if(bill == 5) {
            five++;
        } else if(bill == 10) {
            if(five == 0 ) {return false};
            five--;
            ten++;
        } else {
            if(ten == 0) {
                if(five < 3) {return false};
                five -=3;
            } else {
                if(five == 0) {return false};
                five--;
                ten--;
            }
        }
    }
    return true;
};

// 868 二进制间距  位运算
/**
 * @param {number} N
 * @return {number}
 */
var binaryGap = function(N) {
    var k = N;
    var ans = 0;
    var  back = -1;
    while(k != 0) {
        if(k &1 == 1) {
            if(back < 0) {
                back = 1;
            } else {
                ans = Math.max(ans,back);
                back = 1;
            }
        } else {
            if(back > 0) {
                back++;
            }
        }
        k>>=1;
    }
    return ans;
};

// 872.叶子相似的树 遍历对比
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function(root1, root2) {
    var back1 = [];
    var back2 = []
    dfs(root1,back1);
    dfs(root2,back2);
    if(back1.length != back2.length) {return false};
    var num = 0;
    while(num <back1.length) {
        if(back1[num] !=back2[num]) {
            return false;
        }
        num++;
    }
    return true;
    function dfs(node,backArray) {
        if(!node) {return}
        if(!node.left && !node.right) {
            backArray.push(node.val);
        }
        dfs(node.left,backArray);
        dfs(node.right,backArray);
    }
};

//875.爱吃香蕉的珂珂 二分法
/**
 * @param {number[]} piles
 * @param {number} H
 * @return {number}
 */
var minEatingSpeed = function(piles, H) {
    var max = piles[0];
    for(let num of piles) {
        max = Math.max(max,num);
    }
    if(piles.length == H) {
        return max;
    }
    var min = 1;
    while(min < max) {
       var mid = Math.floor((max - min)/2) + min
       if(!check(mid)) {
           min = mid + 1;
       } else {
           max = mid;
       }
    }
    return min;

    function check(K) {
        var time = 0
        for(let num of piles) {
            time += Math.floor((num-1)/K) + 1;
            if(time > H) {
                return false;
            }
        }
        return true;
    }
};


// 876.链表的中间结点  快慢指针
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    var fast = head;
    var slow = head;
    while(fast && fast.next) {
        fast = fast.next;
        fast = fast.next;
        slow = slow.next;
    }
    return slow;
};

// 877. 石子游戏 脑筋急转弯
/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function(piles) {
    return true;
};


// 878.第N个神奇数字 给定一个数N,那么小于等于N的数字中，神奇数字的个数应该为N/A+N/B-N/AB的最小公倍数
/**
 * @param {number} N
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
var nthMagicalNumber = function(N, A, B) {
    var low = 0;
    var hight = N*A*B;
    let g = A*B/gcd(A,B);
    while(low< hight){
        let mid = Math.floor((low + hight)/2);
        let t =  Math.floor(mid/A) + Math.floor(mid/B) - Math.floor(mid/g)
        if(t < N) {
            low = mid +1;
        } else {
            hight = mid;
        }
    }
    while(hight%A !=0 && hight%B != 0){
        hight--;
    }
    return hight%1000000007
    function gcd(x,y) {
        while(true) {
            if((x = x%y) == 0) {
                return y;
            }
            if((y = y%x) == 0) {
                return x;
            }
        }
    }
};

// 880. 索引处的解码字符串 先计算size 再倒叙查找
/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var decodeAtIndex = function(S, K) {
    let numStr = '23456789';
    let size = 0;
    var backNum = S.length - 1;
    for (let index = 0; index < S.length; index++) {
        let char  = S.substr(index,1);
        if(numStr.indexOf(char) != -1) {
            size = size*parseInt(char);
        } else {
            size++;
        }
        if(size > K) {
            backNum = index;
            break;
        }
    }
    for (let index = backNum; index > -1; index--) {
        let char  = S.substr(index,1);
        K = K%size;
        if(K == 0 && numStr.indexOf(char) == -1) {
            return char;
        } 
        if(numStr.indexOf(char) != -1) {
            size = size/parseInt(char);
        } else {
            size = size -1;
        }
    }
};
// 881.救生艇
/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function(people, limit) {
    people = people.sort(compare);
    var backArray = Array();
    var count = 0;
    for (let index = 0; index < people.length; index++) {
        let weight = people[index];
        if(backArray.length > 0 && backArray[backArray.length -1] >= weight){
            backArray.pop();
        }else {
            count++;
            backArray.push(limit - weight);
        }
    } 
    return count;
    function compare(value1, value2) {
        return value2 - value1;
    }
};
// 双指针更快 还不需要存贮 
var numRescueBoats2 = function(people, limit) {
    var trip = 0;
    people.sort((a,b)=>a-b);
    for (let i = 0,j = people.length - 1;i <=j;j--) {
        if (people[i] + people[j] <= limit) {
            i++;
        }
        trip++;
    }
    return trip;
};

// 884.两句话中的不常见单子  空间换时间
/**
 * @param {string} A
 * @param {string} B
 * @return {string[]}
 */
var uncommonFromSentences = function(A, B) {
    let array1 = A.split(" ");
    let array2 = B.split(" ");
    var arrayAll = array1.concat(array2);
    var backMap = new Map();
    for(let str of arrayAll) {
        if(backMap.get(str) != null) {
            backMap.set(str,0);
        } else {
            backMap.set(str,1);
        }
    }
    var result = [];
    for(let kvs of backMap) {
        if(kvs[1] == 1) {
            result.push(kvs[0]);
        }
    }
    return result;
};

// 888. 公平的糖果交换  可以空间换时间
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var fairCandySwap = function(A, B) {
    var sumA = 0;
    var sumB = 0;
    var map = new Map()
    for(let num of A) { sumA += num}
    for(let num of B) { 
        sumB += num
        map.set(num,num);
    }
    var delta = (sumB - sumA)/2;  
    for(let num of A) {
        if(map.get(delta + num)) {
            return [num,delta + num];
        }
    }
    return [];
};
 
//  894. 所有可能的满二叉树 动态规划
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number} N
 * @return {TreeNode[]}
 */
var allPossibleFBT = function(N) {
    if(N%2 == 0) {return []; }
    var backArray = [];
    backArray.push([new TreeNode(0)]);
    var num = 3;
    while(num <= N) {
        var inArray = [];
        var backNum = (num - 1)/2;
        for (let index = 0; index < backNum; index++) {
            for (let nodeleft of backArray[index]) {
                for(let noderight of backArray[backNum - index - 1]) {
                    var node = new TreeNode(0);
                    node.left = nodeleft;
                    node.right = noderight;
                    inArray.push(node);
                }
            }
        }
        backArray.push(inArray);
        num += 2;
    }
    return backArray[backArray.length -1];
};

// 896. 单调数列   判断递增或者递减就好了
/**
 * @param {number[]} A
 * @return {boolean}
 */
var isMonotonic = function(A) {

    return inscreassing() || decreasing()
    function inscreassing() {
        for (let index = 0; index < A.length - 1; index++) {
            if(A[index] > A[index+1]) { return false};
        }
        return true;
    }

    function decreasing() {
        for (let index = 0; index < A.length - 1; index++) {
            if(A[index] < A[index+1]) { return false};
        }
        return true;
    }
};

// 897. 递增顺序查找树  递归遍历
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var increasingBST = function(root) {
    var head = new TreeNode(0);
    var next = head;
    dfs(root);
    function dfs(node) {
        if(node == null) {return};
        dfs(node.left);
        next.right = new TreeNode(node.val);
        next = next.right;
        dfs(node.right); 
    }
    return head.right;
};

// 904.水果成篮   动态规划 记录之前的值
/**
 * @param {number[]} tree
 * @return {number}
 */
var totalFruit = function(tree) {
    var fKey = 0,fNum = -1;
    var sKey = 0,sNum = -1;  
    var start = -1;
    var result = 0;
    for (let index = 0; index < tree.length; index++) {
        let fruit = tree[index];
        if(fNum == -1) {
            fNum = index;
            fKey = fruit;
        } else {
            if(fKey == fruit) {
                fNum = index;
            } else {
                var backKey = fKey;
                var backNum = fNum;
                fKey = fruit;
                fNum = index;
                if(sKey != fruit && sNum != -1) {
                    start = sNum;
                }
                sKey = backKey;
                sNum = backNum;
            }
        }
        result = Math.max(result,index - start);
    }
    return result;
};
// 905. 按奇偶排序数组 基本逻辑
var sortArrayByParity = function(A) {
    var index = 0;
    var end = A.length;
    while(index < end) {
        if(A[index]%2 == 0) {
            index++;
        } else {
            A.push(A[index])
            end--;
            A.splice(index,1);
        }
    }
    return A;
};


// 908. 最小差值 I  主要是题目难理解
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var smallestRangeI = function(A, K) {
    if (A.length == 0 ) {
        return 0;
    }
    var max = A[0];
    var min = A[0];
    for (let index = 0; index < A.length; index++) {
        let element = A[index];
        max = Math.max(max,element);
        min = Math.min(min,element);
    }
    let num =  max - min - 2*K;
    return  num > 0 ? num : 0;
};

// 思想一样 简写
var smallestRangeI2 = function(A, K) {
    var min = Math.min.apply(null, A);
    var max = Math.max.apply(null, A);
    return max - K > min + K ? max - min - 2 * K : 0;
};

// 910. 最小差值2 先排序 然后确定某个点之前的数全部加K 之后的数全部减少K  然后得出最大最小值做比较
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var smallestRangeII = function(A, K) {
    A.sort((a,b)=> a-b);
    let n = A.length;
    var res = A[n-1] - A[0]
    for (let index = 1; index < n; index++) {
        let min = Math.min(A[0] + K,A[index] - K)
        let max = Math.max(A[index- 1] + K,A[n -1] - K)
        res = Math.min(max - min, res)
    }
    return res
};

// 912. 排序数组   排序
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    return nums.sort((a,b) =>  a - b)
};

// 914.卡牌分组 找数字因子
/**
 * @param {number[]} deck
 * @return {boolean}
 */
var hasGroupsSizeX = function(deck) {
    if(deck.length < 2) {
        return false;
    }
    var myMap = new Map();
    for (let index = 0; index < deck.length; index++) {
        let num = deck[index];
        if (myMap.get(num) != null) {
            myMap.set(num, myMap.get(num)+1)
        } else {
            myMap.set(num, 1);
        }
    }

    var tag = myMap.get(deck[0]);
    var newNumArray = Array()
    for(var key of myMap) {
        tag = Math.min(tag, key[1]);
        newNumArray.push(key[1]);
    }
    if (tag < 2) {
        return false;
    }

    var sqrtNum = parseInt(Math.sqrt(tag))
    var backArray = Array();
    var setArray = Array();
    for (let index = 2; index <= sqrtNum; index++) {
        if (tag%index == 0) {
            backArray.push(index);
            setArray.push(tag/index);
        }
    }
    backArray = backArray.concat(setArray);
    backArray.push(tag);
    for(var factor of backArray) {
        var tag = 0;
        for(var key of newNumArray) {
            var num =  key%factor;
            if (num != 0) {
                break;
            }
            tag++;
        }
        if (tag == newNumArray.length) {
            return true;
        }
    }
    return false;
};

// 915.分割数组 两次遍历
/**
 * @param {number[]} A
 * @return {number}
 */
var partitionDisjoint = function(A) {
    var min = A[A.length -1];
    var backMin = []
    for (let index = A.length - 1; index > 0; index--) {
        let element = A[index];
        min = Math.min(min,element);
        backMin.unshift(min);
    }  
    var max = A[0];
    for (let index = 0; index < A.length; index++) {
        max  = Math.max(max,A[index]) 
        if(max<=backMin[index]){
            return index+1;
        }
    }
    return 0;
};


// 917. 仅仅反转字母
/**
 * @param {string} S
 * @return {string}
 */
var reverseOnlyLetters = function(S) {
    let start = 0;
    let end = S.length -1;
    while(start  < end) {
        if(!checkEng(S[start])) {
            start++;
        } else if(!checkEng(S[end])) {
            end--;
        } else {
            let char1 = S[start];
            let char2 = S[end];
            S = S.substr(0,start) + char2 + S.substr(start +1,end - start -1) + char1 + S.substr(end+1);
            start++;
            end--;
        }
    }
    return S;

    function checkEng(num) {
        var reg = /^[A-Za-z]+$/;
        return reg.test(num)
    }
};

// 921. 使括号有效的最少添加  逻辑判断题
/**
 * @param {string} S
 * @return {number}
 */
var minAddToMakeValid = function(S) {
    var result = 0;
    var back = 0;
    for (let index = 0; index < S.length; index++) {
        let char = S.substr(index,1);
        if(char == "(") {
            back++;
        }else {
            back--;
        }
        if(back < 0) {
            back = 0;
            result += 1;
        }
    }
    return result +back;
};

// 922. 按奇偶排序数组 II 基础逻辑
/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function(A) {
    var result = new Array(A.length);
    var odd = 1;
    var even = 0;
    for(let num of A) {
        if(num%2 == 0) {
            result[even] = num;
            even +=2;
        } else {
            result[odd] = num;
            odd +=2;
        }
    }
    return result;
};

// 925.长按键入 指针判断
/**
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */
var isLongPressedName = function(name, typed) {
    var l1 = name.length;
    var l2 = typed.length;
    if(l1 > l2) {return false};
    var i = 0;
    var j = 0;
    var back = "";
    while(i < l1 && j < l2) {
        var char1 = name.substr(i,1);
        var char2 = typed.substr(j,1);
        if(char1 == char2){
            i++;
            j++;
            back = char1;
        } else {
            if(char2 == back) {
                j++;
            } else {
                return false;
            }
        }
    }
    if(i < l1) { return false};
    if(j < l1) {
        var char2 = typed.sub(j,1);
        if(char2 != back) {
            return false;
        }
        j++;
    }
    return true;
};

//   清爽的写法 
var isLongPressedName = function(name, typed) {
    let n = 0
    let t = 0
    while (n < name.length || t < typed.length) {
        if (n < name.length && name[n] == typed[t]) {
            n++;t++
        }else if (name[n-1] == typed[t]) {
            t++
        }else {
            break;
        }
    }
    if (n == name.length && t == typed.length) {
        return true
    }else {
        return false
    }
};

// 926.将字符串反转到单调递增  正反考虑
/**
 * @param {string} S
 * @return {number}
 */
var minFlipsMonoIncr = function(S) {
    var backArray = [];
    var num = 0;
    backArray.push(0);
    for (let index = 0; index < S.length; index++) {
        let char = S.substr(index,1);
        if(char == "1") {
            num += 1;
        }
        backArray.push(num);
    }
    var min = backArray[S.length];
    num = 0;
    for (let index = S.length -1; index > -1; index--) {
        let char = S.substr(index,1);
        if(char == "0") {
            num += 1;
        }
        min = Math.min(min,backArray[index] + num);
    }
    return min;
};

// 929. 独特的电子邮件地址  基础逻辑题
/**
 * @param {string[]} emails
 * @return {number}
 */
var numUniqueEmails = function(emails) {
    let backup = new Map(),count = 0
    for (let i = 0; i < emails.length; i++) {
        let ans = '',email = emails[i],isA = false,isB = false
        for(let char of email) {
            if (isB) {
                ans += char
            } else {
                if (char == '@') {
                    isB = true
                    ans += char
                } else if (char == '+') {
                    isA = true
                } else if (char != '.') {
                    if (!isA) {
                        ans += char
                    }
                }
            }
        }
        if (!backup.get(ans) ) {
            backup.set(ans,1)
            count++
        }
    }
    return count
};
// 931.下降路径最小和 逐层计算
/**
 * @param {number[][]} A
 * @return {number}
 */
var minFallingPathSum = function(A) {
    var back = A[0];
    for (let index = 1; index < A.length; index++) {
        var inArray = A[index];
        var newArray = new Array(back.length);
        for (let i = 0; i < inArray.length; i++) {
            var onI = i -1;
            if(onI < 0 ) {onI = 0};
            var inI = i +1;
            if(inI > inArray.length - 1) {inI = inArray.length -1};
            newArray[i] = Math.min(back[onI],back[i],back[inI]) + inArray[i];
        }
        back = newArray;
    }
    var min = back[0];
    for(let num of back) {
        min = Math.min(num,min);
    }
    return min;
};

// 938. 二叉搜索树的范围和  二叉树的遍历
/**
 * @param {TreeNode} root
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
var rangeSumBST = function(root, L, R) {
    var result  =0;
    traverse(root);
    function traverse(root) {
        if(root) {
            traverse(root.left);
            if(root.val >= L && root.val <= R) {
                result += root.val;
            }
            traverse(root.right);
        }
    }
    return result;
};

// 941.有效的山脉数组 基本逻辑判断 精简代码
/**
 * @param {number[]} A
 * @return {boolean}
 */
var validMountainArray = function(A) {
    var len = A.length;
    if(len<3) return false;
    var i = 0;
    while(i < len -1 && A[i] < A[i+1]){ i++;}
    if(i===len-1 || i===0) return false;
    while(i < len -1 && A[i] > A[i+1]) { i++;}
    if(i!==len-1) return false;
    return true;

};

// 942. 增减字符串匹配 思考极限就好 
/**
 * @param {string} S
 * @return {number[]}
 */
var diStringMatch = function(S) {
    var start = 0;
    var end = S.length;
    var result = [];
    for (let index = 0; index < S.length; index++) {
        var str = S.substr(index,1);
        if(str == "I") {
            result.push(start);
            start++;
        }else {
            result.push(end);
            end--;
        }
    }
    result.push(start);
    return result;
};

// 944.删列造序 贪心算法
/**
 * @param {string[]} A
 * @return {number}
 */
var minDeletionSize = function(A) {
    let result =0;
    for (let i = 0; i < A[0].length; i++) {
        for (let j = 0; j < A.length -1; j++) {
            if(A[j][i] > A[j+1][i]) {
                result++;
                break;
            }
        }    
    }
    return result;
};

// 945. 使数组唯一的最小增量 排序阶梯计算
/**
 * @param {number[]} A
 * @return {number}
 */
var minIncrementForUnique = function(A) {
    if(A.length <=1) {return 0}
    let result = 0;
    A.sort((a,b)=>a-b)
    let step = A[0];
    for (let index = 1; index < A.length; index++) {
        let num = A[index]
        if(num > step) {
            step = num;
        } else {
            result = result + step - num + 1;
            step++;
        }
    }
    return result;
}
// 946. 验证栈序列  逻辑处理
/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function(pushed, popped) {
    var result = Array();
    var  i = 0;
    for(let num of pushed) {
        result.push(num);
        while(result.length > 0 && result[result.length - 1] == popped[i]) {
            result.pop();
            i++;
        }
    }
    return result.length == 0;
};

// 948.令牌放置，双指针 贪心算法
/**
 * @param {number[]} tokens
 * @param {number} P
 * @return {number}
 */
var bagOfTokensScore = function(tokens, P) {
    tokens = tokens.sort(compare);
    var start = 0;
    var end = tokens.length - 1;
    var num = 0;
    while(start <= end) {
        if(P >= tokens[start]) {
            num++;
            P = P - tokens[start];
            start++;
        } else {
            if(num > 0 && end - start > 1) {
                P = P + tokens[end] - tokens[start];
                start++;
                end--;
            } else {
                return num;
            }
        }
    }
    return num;
    function compare(x,y) {return x - y};
};

// 949. 给定数字能组成的最大时间  因为就4个数 所以穷举比逻辑处理更快
/**
 * @param {number[]} A
 * @return {string}
 */
var largestTimeFromDigits = function(A) {
    var  hours = -1;
    var  min = -1;
    check(A[0], A[1], A[2], A[3]);
    check(A[0], A[2], A[1], A[3]);
    check(A[0], A[3], A[1], A[2]);
    check(A[1], A[2], A[0], A[3]);
    check(A[1], A[3], A[0], A[2]);
    check(A[2], A[3], A[0], A[1]);
    function check(num1,num2,num3,num4) {
        let h = bset(num1,num2,24);
        let m  = bset(num3,num4,60);
        if(h > -1 && m > -1) {
            if(h > hours  || (hours == h && m > min)) {
                hours = h;
                min = m;
            }
        }
    }
    if(hours > -1) {
        var result =  hours > 9 ?  hours.toString() : "0" + hours.toString();
        result += ":";
        result += min > 9 ?  min.toString() : "0" + min.toString();
        return result;
    }else {
        return "";
    }
    function bset(num1,num2,rules) {
        var ans = Math.max(10*num1 + num2 < rules ? 10*num1 + num2 : -1,10*num2 + num1 < rules ? 10*num2 + num1 : -1)
        return ans;
    }
};

// 950. 按递增顺序显示卡牌  找规律倒推
/**
 * @param {number[]} deck
 * @return {number[]}
 */
var deckRevealedIncreasing = function(deck) {
    if (deck.length < 2){
        return deck;
    }
    deck.sort(compare);
    var result = [];
    result.unshift(deck.pop());
    result.unshift(deck.pop());
    while(deck.length > 0 ) {
        result.unshift(result.pop());
        result.unshift(deck.pop());
    }
    return result;

    function compare (x,y) {
        return x - y;
    }
};

// 951.反转等阶二叉树 逻辑判断
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var flipEquiv = function(root1, root2) {
    if(root1 == null && root2 == null) {
        return true;
    }
    if(root1 ==null){return false};
    if(root2 == null){return false};
    if(root1.val != root2.val) {return false};
    let bool1 = flipEquiv(root1.left,root2.left)  && flipEquiv(root1.right,root2.right)
    let bool2 = flipEquiv(root1.right,root2.left)  && flipEquiv(root1.left,root2.right)
    return  bool1 || bool2;
};

// 953. 验证外星语词典  基础逻辑题
/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function(words, order) {
    let backMap = new Map()
    for (let index = 0; index < order.length; index++) {
        backMap.set(order[index],index);
    }
    for (let index = 1; index < words.length; index++) {
        let began = words[index-1];
        let now = words[index];
        let i = 0;
        let min = Math.min(began.length,now.length);
        let isCheck = false;
        while( i< min && !isCheck) {
            if(backMap.get(began[i]) < backMap.get(now[i])) {
                isCheck = true;
            } else if(backMap.get(began[i]) == backMap.get(now[i])) {
                i++;
            } else {
                return false;
            }
        }
        if(!isCheck && now.length < began.length) {
            return false;
        }
    }
    return true;
};
// 954.二倍数对数组 基础逻辑处理
 /**
 * @param {number[]} A
 * @return {boolean}
 */
var canReorderDoubled = function(A) {
    A.sort((a,b)=> a-b);
    while(A.length > 0) {
        let num = A[0];
        A.splice(0,1);
        var checkNum =  num > 0 ?  2*num : num/2;
        if(A.indexOf(checkNum) == -1) {
            return false;
        }
        A.splice(A.indexOf(checkNum),1);
    }
    return true;
};

// 用字典提高转化效率
var canReorderDoubled = function(A) {
    //升序
    A.sort(function(a,b){
       return a-b; 
    });
    
    var dictionary=new Map();
    for(var key of A){
        if(dictionary.has(key)){
            dictionary.set(key,dictionary.get(key)+1);
        }
        else{
            dictionary.set(key,1);
        }
    }
    
    for(var i=0;i<A.length;i++){
        if(A[i]%2==0){
            if(dictionary.has(A[i])&&dictionary.has(A[i]/2)){
                dictionary.set(A[i],dictionary.get(A[i])-1);
                dictionary.set(A[i]/2,dictionary.get(A[i]/2)-1);
                if(dictionary.get(A[i])==0){
                    dictionary.delete(A[i]);
                }
                if(dictionary.get(A[i]/2)==0){
                    dictionary.delete(A[i]/2);
                }
            }
        }
    }
    return [...dictionary].length==0;
};

// 957.N天后的牢房  14天一个循环 规律
/**
 * @param {number[]} cells
 * @param {number} N
 * @return {number[]}
 */
var prisonAfterNDays = function(cells, N) {
    var num = N%14;
    num = num == 0? 14:num;
    while(num > 0) {
        cells = change(cells);
        num--;
    }
    return cells;

    function change(cells) {
        var newcell = [0];
        for (let index = 1; index < 7; index++) {
            newcell.push(cells[index-1] == cells[index+1] ? 1:0);
        }
        newcell.push(0);
        return newcell;
    }
  
};

// 958. 二叉树的完全性检验 层序遍历
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
var isCompleteTree = function(root) {
    var backArray = [];
    backArray.push(root);
    while(backArray[0] != null) {
        let node = backArray.shift();
        backArray.push(node.left);
        backArray.push(node.right);
    }
    while(backArray.length > 0) {
        let node = backArray.shift();
        if(node != null) {
            return false;
        }
    }
    return true;
};

// 961.重复N次的元素 简单的题目
/**
 * @param {number[]} A
 * @return {number}
 */
var repeatedNTimes = function(A) {
    if(A.length <2) {
        return 0;
    }
    var mapBack = new Map()
    for (let index = 0; index < A.length; index++) {
        if(mapBack.get(A[index])) {
            var newNum = mapBack.get(A[index]) + 1;
            if(newNum*2 == A.length){
                return A[index];
            }
            mapBack.set(A[index],newNum);
        } else {
            mapBack.set(A[index],1);
        }
    }
};

// 因为其他数都不同 只要找到重复数字就好了
var repeatedNTimes = function(A) {
    const tmp = [];
    for (let num of A) {
        if (tmp.includes(num)) {
            tmp.push(num);
            break;
        } else {
            tmp.push(num);
        }
    }
    return tmp[tmp.length - 1];
};
 
// 965.单值二叉树 二叉树的遍历
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
var isUnivalTree = function(root) {
    if(!root) { return true}
    let num = root.val;
    var backArray = [root];
    while(backArray.length > 0) {
        var newBack = [];
        for(let node of backArray) {
            if(node.val != num) {
                return false;
            }
            if(node.left) {
                newBack.push(node.left);
            } 
            if(node.right) {
                newBack.push(node.right);
            }
        }
        backArray = newBack;
    }
    return true;
};
// 还有中写法 递归写法
var isUnivalTree = function(root) {
    if(root===null) return true
    if(root.left !== null && root.left.val !== root.val){
    	return false 
    }
    if(root.right !== null && root.right.val !== root.val) {
    	return false 
    }
    return isUnivalTree(root.left) && isUnivalTree(root.right)
};

// 962.最大宽度坡 
/**
 * @param {number[]} A
 * @return {number}
 */
// 双循环 解法
var maxWidthRamp = function(A) {
    var max = 0;
    for (let i = A.length -1; i > max; i--) {
        for (let j = 0; j < i - max; j++) {
            if(A[i] >= A[j]) {
                max = i-j
            }
        }
    }
    return max 
};
// 递减栈 速度会快很多
var maxWidthRamp = function(A) {
    let ans = 0
    const arr = [[0, A[0]]]
    for (let i = 1; i < A.length; i++) {
      if (A[i] < arr[arr.length - 1][1]) {
        arr.push([i, A[i]])
        continue
      }
      let t = i
      for (let j = arr.length - 1; j >= 0; j--) {
        if (arr[j][1] > A[i]) {
          break
        }
        t = arr[j][0]
      }
      ans = Math.max(ans, i - t)
    }
    return ans
  }

// 969.煎饼排序 思路 每次把最后一个换到最后去
/**
 * @param {number[]} A
 * @return {number[]}
 */
var pancakeSort = function(A) {
    var copyA = A.concat();
    copyA.sort((a,b)=> a-b);
    var result = [];
    var index = copyA.length - 1;
    while(index >= 0 ) {
        for (let i = 0; i < A.length ; i++) {
            if(copyA[index] == A[i]) {
                if(index != i) {
                    result.push(i+1);
                    result.push(index+1);
                    A = A.slice(0,i+1).reverse().concat(A.slice(i+1,A.length));
                    A = A.slice(0,index+1).reverse().concat(A.slice(index+1,A.length));
                }
                index--;
                break;
            }
        }
    }
    return result;
};


  // 970. 强整数
  /**
 * @param {number} x
 * @param {number} y
 * @param {number} bound
 * @return {number[]}
 */
var powerfulIntegers = function(x, y, bound) {

    var result = [];
    cycleText(1,1);
    return result;

    function cycleText(x1,y1) {
        let num = x1 + y1;
        if(num <= bound) {
            if(result.indexOf(num) == -1) {
                result.push(num);
            } 
            if(x != 1 && x1*x != 1) {
                cycleText(x1*x,y1);
            }
            if (y != 1 && y1*y != 1) {
                cycleText(x1,y1*y);
            } 
        } 
    }
};

// 971.反转二叉树以匹配先序遍历 二叉树的先序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[]} voyage
 * @return {number[]}
 */
var flipMatchVoyage = function(root, voyage) {
    var backArray = [];
    var index = 0;
    dfs(root);
    if(backArray.length > 0 && backArray[backArray.length-1] == -1) {
        return [-1];
    }
    return backArray;
    function dfs(node) {
        if(node == null) {return};
        if(node.val != voyage[index++]) {
            backArray.push(-1);
            return;
        }
        if(index <voyage.length &&node.left != null && node.left.val != voyage[index]) {
            backArray.push(node.val);
            dfs(node.right);
            dfs(node.left);
        } else {
            dfs(node.left);
            dfs(node.right);
        }
    }
};
//973. 最接近原点的 K 个点 基础逻辑题
/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */
var kClosest = (points, K) => {
    const distance = (point) => Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2))
    return points.sort((a, b) => distance(a) - distance(b)).slice(0, K)
}
// 974. 和可被 K 整除的子数组  连续子数组 可以考虑累加 再处理
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var subarraysDivByK = function(A, K) {
    var P = [0];
    var sum = 0;
    for(let num of A) {
        sum += num;
        P.push(sum);
    }
    var backMap = new Map();
    for(let num of P) {
        var index = num%K
        if(index < 0) {
            index += K
        }
        if(backMap.get(index) == undefined) {
            backMap.set(index,1);
        } else {
            backMap.set(index,1+ backMap.get(index));
        }
    }
    var result = 0;
    for(let map of backMap){
        result += map[1]*(map[1] -1)/2;
    }
    return result;
};

//977. 有序数组的平方 双指针
/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function(A) {
    var j = 0;
    while(j < A.length && A[j] < 0) {
        j++;
    }
    var i = j - 1;
    var result = []
    while(i >= 0 && j<A.length) {
        if(A[i]*A[i] < A[j]*A[j]) {
            result.push(A[i]*A[i]);
            i--;
        }else {
            result.push(A[j]*A[j]);
            j++;
        }
    } 
    while(i >= 0) {
        result.push(A[i]*A[i]);
        i--;
    }
    while(j < A.length) {
        result.push(A[j]*A[j]);
        j++;
    }
    return result;
};

  // 976. 三角形的最大周长  三角形组成方式 两小边之和要大于第三边  所以排序就可以了
/**
 * @param {number[]} A
 * @return {number}
 */
var largestPerimeter = function(A) {
    A.sort((a,b)=> a-b);
    var num = A.length -3;
    while(num>=0) {
        if(A[num] + A[num +1] > A[num + 2]) {
            return A[num]+A[num +1]+A[num +2];
        }
        num--;
    }
    return 0;
};

// 979.在二叉树中分配硬币 dfs 深度遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var distributeCoins = function(root) {
    var num = 0;
    dfs(root);
    function dfs (node) {
        if(node == null) {return 0};
        var left = dfs(node.left);
        var right = dfs(node.right);
        num = num + Math.abs(left) + Math.abs(right)
        return node.val + left + right - 1;
    }
    return num;
};

//983.最低票价  动态规划
/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function(days, costs) {
    var memo = new Array(days.length);
    var backArray = [1,7,30];
    return dp(0);
    function dp(i) {
        if(i >= days.length) {
            return 0;
        }
        if(memo[i] != undefined) {
            return memo[i];
        }
        var ans = costs[2]*20;
        var j = i;
        for (let index = 0; index < 3; index++) {
            while(j <days.length && days[j] < days[i] +backArray[index]) {
                j++;
                ans = Math.min(ans,dp(j)+ costs[index]);
            }
        }
        memo[i] = ans;
        return ans;
    }
};
// 最直观的动态规划
var mincostTickets = function(days, costs) {
    const { length } = days;
    const set = new Set(days);
    const dp = Array(366).fill(0);
    for (let i = 1; i < 366; i += 1) {
      if (!set.has(i)) {
        dp[i] = dp[i - 1];
      } else {
        dp[i] = Math.min(
          dp[i - 1] + costs[0],
          7 <= i ? dp[i - 7] + costs[1] : costs[1],
          30 <= i ? dp[i - 30] + costs[2] : costs[2] 
        );
      }
    }
    return dp[days[length - 1]];
  };

  // 985. 查询后的偶数和  正常逻辑题 先全部加起来 在做增减
/**
 * @param {number[]} A
 * @param {number[][]} queries
 * @return {number[]}
 */
var sumEvenAfterQueries = function(A, queries) {
    var sum = 0;
    for(let num of A) {
        if(num%2 == 0) {
            sum += num;
        }
    }
    var result = [];
    for(let que of queries) {
        var val = que[0];
        var index = que[1];
        if(A[index]%2 == 0) {
            sum -= A[index];
        }
        A[index] = A[index] + val;
        if(A[index]%2 == 0) {
            sum += A[index];
        }
        result.push(sum);
    }
    return result;
};

// 986.区间列表的交集  基本逻辑题 
/**
 * @param {number[][]} A
 * @param {number[][]} B
 * @return {number[][]}
 */
var intervalIntersection = function(A, B) {
    let i = 0; 
    let j = 0;
    let result = [];
    while(i < A.length && j < B.length) {
        let lo = Math.max(A[i][0],B[j][0]);
        let hi = Math.min(A[i][1],B[j][1]);
        if(lo <= hi) {
            result.push([lo,hi]);
        }
        if(A[i][1] < B[j][1]) {
            i++;
        } else {
            j++;
        }
    }
    return result;
};

// 987. 二叉树的垂序遍历  二叉树层序遍历，在排序输出
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function(root) {
    if(!root) {return []}
    let backup = new Map(),backArray = [],ans = []
    let nodes = [root],nums = [0]
    while(nodes.length > 0) {
        let newNodes = [],newNums =[],newBackup = new Map()
        for (let i = 0; i < nodes.length; i++) {
            let key = nums[i],node = nodes[i]
            let value = newBackup.get(key);
            if (value) {
                value.push(node.val)
            } else {
                value = [node.val]
            }
            newBackup.set(key,value)
            if (node.left) {
                newNodes.push(node.left)
                newNums.push(key-1)
            }
            if (node.right) {
                newNodes.push(node.right)
                newNums.push(key+1)
            }
        }
        nodes = newNodes
        nums = newNums
        for (let item of newBackup) {
            let key = item[0]
            let newValue = item[1].sort((a,b) => a - b)
            let value = backup.get(key);
            if (value) {
                value = value.concat(newValue)
            } else {
                value = newValue
                backArray.push(key)
            }
            backup.set(key,value)
        }
    }
    backArray.sort((a,b)=> a - b)
    for(let num of backArray) {
        ans.push(backup.get(num))
    }
    return ans
};
// 989. 数组形式的整数加法  数组累加
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */
var addToArrayForm = function(A, K) {
    var back = 0;
    var index = A.length -1;
    while(index >= 0 &&(back > 0 || K > 0)) {
        var num = K%10 + back + A[index];
        back = Math.floor(num/10);
        num = num%10;
        K = Math.floor(K/10);
        A[index] = num;
        index--;
    }
    while(K>0 || back > 0) {
        var num = K%10 + back;
        back = Math.floor(num/10);
        num = num%10;
        K = Math.floor(K/10);
        A.unshift(num);
    }
    return A;
};

// 990. 等式方程的可满足性 Union-Find 算法
/**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function(equations) {
    class UF {
        constructor(num) {
            this.count = num;
            this.size = Array(num)
            this.parent = Array(num)
            for (let i = 0; i < num; i++) {
                this.parent[i] = i;
                this.size[i] = 1;
            }
        }
        union(p,q) {
            let rootP = this.find(p)
            let rootQ = this.find(q)
            if(rootP == rootQ) {
                return
            }
            if (this.size[rootP] > this.size[rootQ]) {
                this.parent[rootQ] = rootP;
                this.size[rootP] += this.size[rootQ];
            } else {
                this.parent[rootP] = rootQ;
                this.size[rootQ] += this.size[rootP];
            }
            this.count--
        }
        connected(p,q) {
            let rootP = this.find(p)
            let rootQ = this.find(q)
            return rootP == rootQ
        }
        find(x) {
            while(this.parent[x] != x) {
                // 进行路径压缩
                this.parent[x] = this.parent[this.parent[x]];
                x = this.parent[x];
            }
            return x;
        }
    }
    let uf = new UF(26)
    for (let i = 0; i < equations.length; i++) {
        let equation = equations[i];
        if(equation['1'] == '=') {
            uf.union(equation[0].charCodeAt() - 97,equation[3].charCodeAt() - 97)
        }
    }
    for (let i = 0; i < equations.length; i++) {
        let equation = equations[i];
        if(equation['1'] == '!' && uf.connected(equation[0].charCodeAt() - 97,equation[3].charCodeAt() - 97)) {
            return false
        }
    }
    return true
};

// 991. 坏了的计算器  贪心算法 多除 逆向计算
/**
 * @param {number} X
 * @param {number} Y
 * @return {number}
 */
var brokenCalc = function(X, Y) {
    var result = 0;
    while(Y>X) {
        result++;
        if(Y%2 == 1) {
            Y++;
        }else {
            Y /= 2;
        }
    }
    return result +X-Y;
};

// 993. 二叉树的堂兄弟节点  二叉树的遍历 如果多个比较可以用空间换时间
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function(root, x, y) {

    if(root == null || root.val == x || root.val == y)  {return false};
    var backArray = [];
    dfs(root,0);
    return  backArray[0][0] != backArray[1][0] &&backArray[0][1] == backArray[1][1];
    function dfs(node,deep) {
        if(node !=null) {
            if(node.left != null) {
                if(node.left.val == x || node.left.val == y) {
                    backArray.push([node.val,deep+1]);   
                } 
            }
            if(node.right != null) {
                if(node.right.val == x || node.right.val == y) {
                    backArray.push([node.val,deep+1]);   
                } 
            }
            dfs(node.left,deep+1);
            dfs(node.right,deep+1);
        }
    }
};

// 997.找到小镇的法官  数组记录 然后判断一下就好了 N 表示人编号
/**
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function(N, trust) {
    if(N == 1) {return 1}; 
    var trustNum = new Array(N + 1);
    var beTrust  = new Array(N +1);
    for (let index = 0; index < trust.length; index++) {
        trustNum[trust[index][0]] = 1;
        if(beTrust[trust[index][1]] == undefined) {
            beTrust[trust[index][1]] = 1;
        }else {
            beTrust[trust[index][1]] += 1;
        }
    }
    for (let index = 1; index < N+1; index++) {
        if(beTrust[index] == N-1) {
            if(trustNum[index] == 1) {
                return -1
            } else {
                return index;
            }
        }
    }
    return -1;
};
// 1002.查找常用字符  字母隐射到数组
/**
 * @param {string[]} A
 * @return {string[]}
 */
var commonChars = function(A) {
    var backArray = new Array(26).fill(100);
    for(let str of A) {
        var newBack = new Array(26).fill(0);
        for (let index = 0; index < str.length; index++) {
            var num = str.substr(index,1).charCodeAt() - 97;
            newBack[num] +=1;
        }
        for (let index = 0; index < backArray.length; index++) {
            backArray[index] = Math.min(backArray[index],newBack[index]);
        }
    }
    var result = [];
    for (let index = 0; index < backArray.length; index++) {
        var num = backArray[index];
        while(num > 0) {
            result.push(String.fromCharCode(97+index));
            num--;
        }
    }
    return result;
};


// 1004. 最大连续1的个数 III 双指针
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var longestOnes = function(A, K) {
    var li = 0;
    var lo = 0;
    var zero = 0;
    var res = 0;
    while(li < A.length) {
        if(A[li] ==0) {
            zero++;
        }
        while (zero > K) {
            if(A[lo] == 0) {
                zero--;
            }
            lo++;
        }
        res = Math.max(res,li-lo+1);
        li++;
    }
    return res;
};

// 1005. K 次取反后最大化的数组和 逻辑判断题
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var largestSumAfterKNegations = function(A, K) {
    A.sort((a,b)=> a-b);
    var index = 0;
    var backK = K;
    while(backK > 0) {
        if(A[index] < 0) {
            A[index] = A[index]*-1;
            index++;
            backK--;
            index = index == A.length ? index - 1 : index;
        } else {
            if(backK%2 != 0) {
                if(index == 0) {
                    A[index] = A[index]*-1;
                } else {
                    if(A[index -1] > A[index]){
                        A[index] = A[index]*-1;
                    } else {
                        A[index - 1] = A[index - 1]*-1;
                    }
                }
            } 
            backK = 0;
        }
    }
    var result = 0;
    for(let num of A) {
        result += num; 
    }
    return result;
};

// 1006.笨阶层 找规律 N+2>N*(N-1)/(N-2) > N+1;所以做地板除法时 N*(N-1)/(N-2) = N+1 （N>=4）；然后前后可以约掉。 
/**
 * @param {number} N
 * @return {number}
 */
var clumsy = function(N) {
    var backNum =[1,2,2,-1];
    return N > 4 ? N + backNum[N%4]: (N>2 ? N+3:N)
};

//  1008. 先序遍历构造二叉树 递归就可以了
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function(preorder) {
    if(preorder.length == 0) {
        return null;
    }
    var root = new TreeNode(preorder[0]);
    var left = [];
    var right = [];
    var index = 1;
    while(index < preorder.length) {
        if(preorder[index] < root.val) {
            left.push(preorder[index])
        } else {
            right.push(preorder[index])
        }
        index++;
    }
    root.left = bstFromPreorder(left);
    root.right = bstFromPreorder(right);
    return root;
};
// 1009. 十进制整数的反码 2^n-N-1; 
/**
 * @param {number} N
 * @return {number}
 */
var bitwiseComplement = function(N) {
    if(N == 0) {return 1};
    var num = 1;
    while (N >= num) {
        num = num*2;
    }
    return num - N  -1;
};

// 1010. 总持续时间可被 60 整除的歌曲 一个60的数组记录然后遍历一半统计就可以了
/**
 * @param {number[]} time
 * @return {number}
 */
var numPairsDivisibleBy60 = function(time) {
    var back = new Array(60).fill(0);
    for(let num of time) {
        var index = num%60;
        back[index] += 1;
    }
    var sum =0;
    for (let index = 1; index < 30; index++) {
        sum += back[index]*back[60-index];
    }
    sum += back[0]*(back[0] - 1)/2;
    sum += back[30]*(back[30] - 1)/2;
    return sum;
};

// 1011. 在 D 天内送达包裹的能力  确定区间二分搜索
/**
 * @param {number[]} weights
 * @param {number} D
 * @return {number}
 */
var shipWithinDays = function(weights, D) {
    var end = 0;
    var start = weights[0];
    for(let weight of weights) {
        start = Math.max(start,weight);
        end += weight; 
    }

    while(start < end) {
        var mid = Math.floor((end - start)/2) + start;
        if(checkNum(mid)) {
            end = mid;
        } else {
            start = mid +1;
        }
    }
    return start;
    
    function checkNum(num) {
        var sum = 0;
        var date = 1;
        for (let weight of weights) {
            if(sum + weight > num ) {
                date += 1;
                sum = weight;
            } else {
                sum += weight;
            }
            if(date > D) {
                return false;
            }
        }
        return true;
    }

};

// 1013. 将数组分成和相等的三个部分 基本逻辑题
/**
 * @param {number[]} A
 * @return {boolean}
 */
var canThreePartsEqualSum = function(A) {
    var sum = 0;
    for (let index = 0; index < A.length; index++) {
        sum += A[index];
    }
    if(sum%3 != 0) {return false}
    var score = sum/3;
    var sum = 0;
    // 记录到目标值的次数
    var back = 0;
    for (let index = 0; index < A.length; index++) {
        if (sum == score) {
            sum = 0;
            back++;
            if(back > 1) {
                return true;
            }
        }  
        sum += A[index];
    }
    return  false;
};

// 1014. 最佳观光组合 （A[i] + A[j] + i - j） 就是 A[i] + i  + A[j] -j
/**
 * @param {number[]} A
 * @return {number}
 */
var maxScoreSightseeingPair = function(A) {
    var left  = A[0];
    var result = 0;
    for (let index = 1; index < A.length; index++) {
        result = Math.max(result,left + A[index] - index);
        left = Math.max(left,A[index] + index)
    }
    return result;
};

// 1016. 子串能表示从 1 到 N 数字的二进制串  暴力解法
/**
 * @param {string} S
 * @param {number} N
 * @return {boolean}
 */
var queryString = function(S, N) {
    for (let index = 0; index <= N; index++) {
        if(S.indexOf(index.toString(2)) == -1) {
            return false;
        }
    }
    return true;
};

// 1017.负二进制转换 辗转相除法 向上取整保证余数不会是负数
/**
 * @param {number} N
 * @return {string}
 */
var baseNeg2 = function(N) {
    result = "";
    var n = N;
    while (n != 0) {
        result = (Math.abs(n%2)).toString() + result;
        n = Math.ceil(n/-2.0);
    }
    return result;
    
};


// 1018. 可被 5 整除的二进制前缀  只留余数防止越界
/**
 * @param {number[]} A
 * @return {boolean[]}
 */
var prefixesDivBy5 = function(A) {
    var num = 0;
    var result = [];
    for(let inNum of A) {
        var num = num*2 + inNum;
        result.push(num%5 == 0);
        num = num%10;
    }
    return result;
};

// 1019. 链表中的下一个更大节点 (用栈的思想)
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nextLargerNodes = function(head) {
    var backArray = [];
    var result = [];
    var back = [];
    var i = 0;
    while(head) {
        backArray.push(head.val);
        result.push(0);
        while(back.length !=0 && backArray[back[back.length -1]] < head.val) {
            var num = back.pop();
            result[num] =  head.val;
        }
        back.push(i);
        i++;
        head = head.next;
    }
    return result;
};

// 1021. 删除最外层的括号 逻辑题
/**
 * @param {string} S
 * @return {string}
 */
var removeOuterParentheses = function(S) {
    if(S.length < 4) {return ""}
    var left  = 1;
    var start = 0;
    var result = "";
    for (let index = 1; index < S.length; index++) {
        let char  = S.substr(index,1);
        if(char == "(") {
            left++;
        } else {
            left--;
        }
        if(left == 0) {
            result += S.substr(start+1,index - start - 1) 
            start = index + 1;
        }
    }
    return result;
};
// 1022. 从根到叶的二进制数之和 递归 当前节点的累加和 = 上层节点的累加和 * 2 + 当前节点值
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumRootToLeaf = function(root) {
    var  result = 0;
    getSum(root,0);

    function getSum(node,val) {
        if(node == null) {return }
        if(node.left == null && node.right == null) {
            result += val*2 + node.val; 
        } 
        getSum(node.left,val*2 + node.val) 
        getSum(node.right,val*2 + node.val) 
    }
    return result;
};

// 1024. 视频拼接  排序，动态规划
/**
 * @param {number[][]} clips
 * @param {number} T
 * @return {number}
 */
var videoStitching = function(clips, T) {
    if(T== 0) {return 0}
    if(clips.length == 0) {return  -1}
    clips.sort(function (a, b) {
        if(a[0] === b[0]) {
            return b[1] - a[1];
        } else {
            return a[0] - b[0];
        }
      });
    let backup = Array(T+1).fill(0);
    let first = clips[0];
    if(first[0] > 0 ) {
        return -1;
    }
   
    let inMax = first[1];
    for (let index = 0; index <  inMax +1 && index < T+1; index++) {
        backup[index] = 1;
    }
    for (let index = 1; index < clips.length && inMax < T; index++) {
        let clip = clips[index];
        if(clip[0] > inMax) {return -1};
        if(clip[1] > inMax) {
            let min = backup[clip[0]];
            for (let index = clip[0] ; index <=  inMax; index++) {
                min = Math.min(backup[index],min);
            }
            for (let index = inMax +1 ; index < clip[1]+1 && index < T+1; index++){
                backup[index] = min + 1;
            }
            inMax = clip[1];
        }
    }
    return backup[T] == 0 ? -1:backup[T];
};

// 1025. 除数博弈 逻辑题 因为先手为偶数的话，先手只需要让自己每步都保持偶数，那么他可以通过让对手得到的数为奇数，比如偶数-1就是奇数了，对手拿到奇数，那么能整除的只有奇数，奇数-奇数又回到了偶数，最后先手一定会得到最小的偶数2，然后-1让对手得到1，对手无解，必胜。

/**
 * @param {number} N
 * @return {boolean}
 */
var divisorGame = function(N) {
    return N%2 == 0 ? true : false;
};

// 1026. 节点与其祖先之间的最大差值  二叉树的递归
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxAncestorDiff = function(root) {
    let result = 0
    dfs(root)
    return result
    function dfs(node) {
        if (!node) {return null}
        let left = dfs(node.left)
        let right = dfs(node.right)
        if(left == null && right == null) {
            return [node.val,node.val]
        }
        let min = Math.min(left != null ? left[0] : right[0],right != null ? right[0]:left[0])
        let max = Math.max(left != null ? left[1] : right[1],right != null ? right[1]:left[1])
        result = Math.max(result,Math.abs(node.val-min),Math.abs(node.val-max))
        return [Math.min(node.val,min),Math.max(node.val,max)]
    }
};

// 1027. 最长等差数列 map记录 遍历找寻
/**
 * @param {number[]} A
 * @return {number}
 */
var longestArithSeqLength = function(A) {
    let backup = new Map(),ans = 2
    for (let i = 0; i < A.length; i++) {
        let key = A[i]
        let value = backup.get(key)
        if(value) {
            value.push(i)
        } else {
            value = [i]
        }
        backup.set(key,value)
    }
    for (let i = 0; i < A.length; i++) {
        for (let j = i+1; j < A.length + 1 - ans; j++) {
            let num = A[j]
            let dvalue = num -A[i];
            let nowCount = 2,nowI = j,isHave = true
            while(isHave && backup.get(dvalue + num)) {
                let iList = backup.get(dvalue + num)
                isHave = false
                for (let index of iList) {
                    if(index > nowI){
                        isHave = true
                        nowCount++
                        nowI = index
                        num += dvalue
                        break
                    }
                }
            }
            ans = Math.max(nowCount,ans)
        }
    }
    return ans;
};
// 1029.两地调度 贪心算法
/**
 * @param {number[][]} costs
 * @return {number}
 */
var twoCitySchedCost = function(costs) {
    costs.sort((a,b) => (a[0] - a[1]) - (b[0] - b[1]))
    var result = 0;
    for (let index = 0; index < costs.length; index++) {
        if(index < costs.length/2) {
            result += costs[index][0];
        }else {
            result += costs[index][1];
        }
    }
    return result;
};

// 1031. 两个非重叠子数组的最大和  动态规划+窗口
/**
 * @param {number[]} A
 * @param {number} L
 * @param {number} M
 * @return {number}
 */
var maxSumTwoNoOverlap = function(A, L, M) {
    let backup = [0],sum = 0, leftL = [], leftM = [],leftLMax = 0,leftMMax = 0;
    for (let index = 0; index < A.length; index++) {
        sum += A[index];
        backup.push(sum);
        if(index >= L -1) {
            leftLMax = Math.max(leftLMax,backup[index+1] - backup[index +1 -L]);
            leftL.push(leftLMax);
        }
        if(index >= M -1) {
            leftMMax = Math.max(leftMMax,backup[index+1] - backup[index +1 -M]);
            leftM.push(leftMMax);
        }
    }
    let result = 0;
    sum =0
    leftLMax = 0
    leftMMax = 0
    for (let index = A.length -1; index >= 0; index--) {
        if(A.length - index >= L && index >= M) {
            leftLMax = Math.max(leftLMax,backup[index + L] - backup[index])
            result = Math.max(result,leftLMax + leftM[index - M]);
        }
        if(A.length - index >= M && index >= L) {
            leftMMax = Math.max(leftMMax,backup[index + M] - backup[index])
            result = Math.max(result,leftMMax + leftL[index - L]);
        }
    }

    return result;
};

// 1033. 移动石子直到连续 基本逻辑题
/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number[]}
 */
var numMovesStones = function(a, b, c) {
    var max = Math.max(a,b,c);
    var min = Math.min(a,b,c);
    var mid = a + b + c - max - min;
    var result = max - min - 2;
    if (result == 0) {
        return [0,0]
    } else {
        if(max - mid < 3 || mid - min < 3) {
            return [1,result];
        } else {
            return [2,result];
        }
    }
};

// 1035. 不相交的线 动态规划
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var maxUncrossedLines = function(A, B) {
    let backup= []
    for (let index = 0; index <= A.length; index++) {
        let inArray = Array(B.length +1).fill(0);
        backup.push(inArray)
    }
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B.length; j++) {
            if(A[i] == B[j]) {
                backup[i+1][j+1] = backup[i][j] +1
            } else {
                backup[i+1][j+1] = Math.max(backup[i+1][j],backup[i][j+1]);
            }
        }
    }
    return backup[A.length][B.length];
};

//  1037. 有效的回旋镖 算斜率
/**
 * @param {number[][]} points
 * @return {boolean}
 */
var isBoomerang = function(points) {
    let x1 = points[0][0];
    let y1 = points[0][1];
    let x2 = points[1][0];
    let y2 = points[1][1];
    let x3 = points[2][0];
    let y3 = points[2][1];
    return (y2 - y1)*(x3 - x2) != (y3 - y2)*(x2 - x1);
};

// 1038. 从二叉搜索树到更大和树  递归二叉树的后续遍历
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var bstToGst = function(root) {
    var sum = 0;
    dfs(root);
    function dfs(node) {
        if(node == null) { return };
        dfs(node.right);
        sum += node.val;
        node.val = sum;
        dfs(node.left)
    }
    
    return root;
};

//  1040. 移动石子直到连续 II 逻辑思考题 
/**
 * @param {number[]} stones
 * @return {number[]}
 */
var numMovesStonesII = function(stones) {
    stones.sort((a,b)=> a - b)
    var n = stones.length
    var max = stones[n -1] - stones[0] + 1 - n;
    max = max - Math.min(stones[n-1] - stones[n-2]-1,stones[1]-stones[0]-1);
    var mi = max;
    var j = 0;
    for (let i = 0; i < n; i++) {
        // 找一个区域能能放下所有子的最小的
        while(j+1 < n && stones[j + 1] - stones[i] < n) {
            j++;
        }
        // 看看有多少空点在这个区域
        var cost = n -(j - i + 1);
        // 排除一情况 一排连续 多出一个点 需要两步 所以加一
        if(j - i === n - 2 && stones[j] - stones[i] === j - i) {
            cost++;
        }
        mi = Math.min(mi,cost);
    }
    return [mi,max];

};


// 1041.困余环中的机器人只有一次循环后 还向北 且不再远点 才能出去
/**
 * @param {string} instructions
 * @return {boolean}
 */
var isRobotBounded = function(instructions) {
    var x = 0,y = 0, dx = 0,dy = 1;
    for (let index = 0; index < instructions.length; index++) {
        var char = instructions.substr(index,1);
        if(char == 'L') {
            var bdy = dy;
            dy = dx;
            dx = -bdy;
        } else if(char == 'R') {
            var bdy = dy;
            dy = -dx;
            dx = bdy;
        } else {
            x = x + dx;
            y = y + dy;
        }
    }
    return (x == 0 && y == 0) || !(dx == 0 && dy == 1)
};

// 1043.分隔数组以得到最大和 动态规划
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var maxSumAfterPartitioning = function(A, K) {
    var backArray =  new Array(A.length).fill(0);
    for (let i = 0; i < A.length; i++) {
        var max =  A[i];
        for(let j = 1; j <= K &&  i - j + 1 >= 0;j++) {
            max = Math.max(max,A[i - j + 1]);
            backArray[i] = Math.max(backArray[i],(i-j<0 ? 0 : backArray[i-j]) + j*max);
        }
    }
    return backArray[A.length -1];
};

// 1046. 最后一块石头的重量 最大堆 二分查找
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
    stones.sort((a,b)=> b - a)
    while (stones.length > 1) {
        let num =  stones.shift() - stones.shift();
        addNum(num)
    }
    function addNum(num) {
        if(num == 0) {return} 
        var left = 0;
        var right = stones.length -1;
        while(left <= right) {
            let mid = Math.floor((right - left)/2)  + left;
            if(stones[mid]  > num) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        stones.splice(left,0,num);
    }
    
    return stones.length > 0 ? stones[0] : 0;
};

// 1047. 删除字符串中的所有相邻重复项  基础逻辑题
/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function(S) {
    var i = 0;
    while (i < (S.length - 1)) {
        if(S.substr(i,1) == S.substr(i+1,1)) {
            S = S.substr(0,i) + S.substr(i+2,S.length - 2 - i)
            if(i > 0) {
                i -= 1;
            }
        } else {
            i += 1;
        }
    }
    return S;
};

// 1049. 最后一块石头的重量 II  可以转化为背包问题，两堆数最接近的情况
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function(stones) {
    let sum = 0;
    let len = stones.length;
    for(let num of stones) {
        sum +=num;
    }
    let maxCapacity = Math.floor(sum/2);
    let back =  new Array(maxCapacity +1).fill(0);
    for (let index = 0; index < len; index++) {
        let num = stones[index];
        for (let j = maxCapacity; j >= num; j--) {
            back[j] = Math.max(back[j],back[j-num] + num);
            
        }       
    }
    return sum - back[maxCapacity]*2;
};

// 1051. 高度检查器  基础逻辑题
/**
 * @param {number[]} heights
 * @return {number}
 */
var heightChecker = function(heights) {
    var sortArray = heights.concat();
    sortArray.sort((a,b) => a - b);
    var result = 0;
    for (let index = 0; index < heights.length; index++) {
        if(sortArray[index] != heights[index]) {
            result++;
        }
    }
    return result;
};

//  1052. 爱生气的书店老板  窗口
/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} X
 * @return {number}
 */
var maxSatisfied = function(customers, grumpy, X) {
    var sum = 0;
    for (let index = 0; index < customers.length; index++) {
        sum += customers[index]*(1-grumpy[index]);
    }
    var delt = 0;
    for (let index = 0; index < X; index++) {
        delt += customers[index]*grumpy[index];
    }
    var dt = delt;
    for (let index = X; index < customers.length; index++) {
        dt += customers[index]*grumpy[index] - customers[index -X]*grumpy[index -X];
        delt = Math.max(dt,delt);
    }
    return sum + delt;
};

// 1053. 交换一次的先前排列  逻辑题
/**
 * @param {number[]} A
 * @return {number[]}
 */
var prevPermOpt1 = function(A) {
    for (let i = A.length -2 ; i > -1; i--) {
        if(A[i+1]< A[i]) {
            var back = i+1;
            var max  = A[i+1];
            for (let j = i+2; j < A.length; j++) {
                if(A[i] > A[j] && A[j] > max) {
                    back = j;
                    max = A[j]
                } else {
                    break;
                }
            }
            let num = A[back];
            A[back] = A[i];
            A[i] = num;
            break;
        }
    }
    return A;
};

// 1054. 距离相等的条形码 排序+贪心算法
/**
 * @param {number[]} barcodes
 * @return {number[]}
 */
var rearrangeBarcodes = function(barcodes) {
    let backup = new Map();
    let backupArray = [];
    for(let num of barcodes) {
        let count = backup.get(num)
        if(count) {
            backup.set(num,count+1)
        } else {
            backupArray.push(num);
            backup.set(num,1)
        }
    }
    backupArray.sort((a,b)=>backup.get(b) - backup.get(a)) 
    let ans = Array(barcodes.length)
    let index = 0
    for (let i = 0; i < barcodes.length; i= i+2) {
        let key = backupArray[index]
        ans[i] = key
        let num = backup.get(key);
        if(num == 1) {
            index++;
        } else {
            backup.set(key,num-1)
        }
    }
    for (let i = 1; i < barcodes.length; i= i+2) {
        let key = backupArray[index]
        ans[i] = key
        let num = backup.get(key);
        if(num == 1) {
            index++;
        } else {
            backup.set(key,num-1)
        }
    }
    return ans
};

// 1071. 字符串的最大公因子  相除法 
var gcdOfStrings = function(str1, str2) {
    let back = getSort(str1,str2);
    while(back[0]!= back[1]) {
        if(back[0].indexOf(back[1]) == -1) {
            return ''
        } else {
            let temp = back[0].replace(back[1],'');
            back = getSort(temp,back[1]);
        }
    }
    return back[1];

    function getSort(a,b) {
        return [a,b].sort((a,b) => b.length -a.length);
    }
};

// 1078. Bigram 分词 基础逻辑
/**
 * @param {string} text
 * @param {string} first
 * @param {string} second
 * @return {string[]}
 */
var findOcurrences = function(text, first, second) {
    let textArray = text.split(' ');
    let num = 0;
    let result = [];

    for (let index = 0; index < textArray.length; index++) {
        let str = textArray[index];
        if(num == 2 ) {
            result.push(str);
            num = 0;
        } 
        if(str == first) {
            num = 1;
        }  else if (str == second && num == 1) {
            num = 2;
        } else {
            num = 0;
        }
    }
    return result;
};

// 1079. 活字印刷 回朔算法
/**
 * @param {string} tiles
 * @return {number}
 */
var numTilePossibilities = function(tiles) {
    let backMap = new Map()
    for (let i = 0; i < tiles.length; i++) {
        if(backMap.get(tiles[i]) == null) {
            backMap.set(tiles[i],1);
        } else {
            backMap.set(tiles[i],1 + backMap.get(tiles[i]));
        }
    }
    let backArray = [];
    for(let map of backMap) {
        backArray.push(map[1])
    }
    let result = 0;
    // 回朔算法
    dfs();
    function dfs(counter) {
        for (let index = 0; index < backArray.length; index++) {
            if(backArray[index] == 0) { continue}
            result += 1;
            backArray[index] = backArray[index] -1;
            dfs();
            // 返回原样
            backArray[index] = backArray[index] +1;
        }
    }
    return result;
};

// 1080. 根到叶路径上的不足节点  二叉树遍历递归 逻辑题
/**
 * @param {TreeNode} root
 * @param {number} limit
 * @return {TreeNode}
 */
var sufficientSubset = function(root, limit) {
    if(root == null) {return null};
    if(root.left == null && root.right == null) {
        return root.val < limit ? null:root;
    }
    root.left = sufficientSubset(root.left, limit - root.val);
    root.right = sufficientSubset(root.right, limit - root.val);
    if(root.left == null && root.right == null) {
        return null
    } else {
        return root;
    }
};

// 1081. 不同字符的最小子序列  栈加贪心算法
/**
 * @param {string} text
 * @return {string}
 */
var smallestSubsequence = function(text) {
    let stack = [];
    for (let i = 0; i < text.length; i++) {
        let char =  text[i];
        if(stack.indexOf(char) != -1) {
            continue;
        }
        let nextStr = text.substr(i+1)
        while(stack.length > 0 && stack[stack.length -1] >= char  && text.substr(i).indexOf(stack[stack.length -1]) != -1) {
            stack.pop();
        }
        stack.push(char);
    }
    return stack.join("");
};

// 1089. 复写零 基础逻辑题
/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
var duplicateZeros = function(arr) {
    let num = arr.length;
    for (let index = 0; index < num; index++) {
        if(arr[index] == 0) {
            arr.splice(index,0,0);
            arr.length = num;
            index++;
        }
    }
};

// 1090. 受标签影响的最大值  贪心算法
 /**
 * @param {number[]} values
 * @param {number[]} labels
 * @param {number} num_wanted
 * @param {number} use_limit
 * @return {number}
 */
var largestValsFromLabels = function(values, labels, num_wanted, use_limit) {
    if(num_wanted == 0) {return 0}
    class LItem  {
        constructor(value,label) {
            this.value = value
            this.label = label
        }
    }
    let backArray = []
    for (let i = 0; i < values.length; i++) {
        let item = new LItem(values[i],labels[i])
        backArray.push(item)
    }
    backArray.sort((a,b)=> b.value - a.value)
    let num = 0,backMap = new Map(),ans = 0
    for (let i = 0; i < backArray.length; i++) {
        let item = backArray[i]
        let limit = backMap.get(item.label) || 0
        if(limit < use_limit) {
            ans += item.value
            num++
            backMap.set(item.label,limit+1)
            if(num ==  num_wanted) {
                return ans
            }
        
        }
    }
    return ans
};

// 1093.大样本统计 基础逻辑中位数求解麻烦
/**
 * @param {number[]} count
 * @return {number[]}
 */
var sampleStats = function(count) {
    let max = -1, min = -1,num = 0,maxNum = -1, sum = 0, sumNum = 0
    for (let i = 0; i < count.length; i++) {
        let inNum = count[i];
        if(inNum > 0) {
            if(min == -1) {
                min = i
            }
            max = i
            if(inNum > num) {
                maxNum = i
                num = inNum
            }
            sum += inNum; 
            sumNum += i*inNum;
        }
    }
    let num1 = -1,num2 = -1
    let checkNum1 = 0,checkNum2 = 0;
    if(sum%2 ==1) {
        checkNum1 = Math.floor(sum/2) +1
        checkNum2 = checkNum1;
    } else {
        checkNum1 = Math.floor(sum/2)
        checkNum2 = checkNum1 +1;
    }
    let newSum = 0;
    for (let i = 0; i < count.length; i++) {
        newSum += count[i];
        if(newSum >= checkNum1 && num1 == -1) {
            num1 = i;
        } 
        if(newSum >= checkNum2) {
            num2 = i;
            break;
        } 
    }
    return [min,max,sumNum/sum,(num1+num2)/2,maxNum];
};
//  1094. 拼车 基础逻辑，一个数组存在车上的人
/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function(trips, capacity) {
    trips.sort((a,b)=>a[1] - b[1]);
    let inCar = [];
    let carNum = 0;
    for (let trip of trips) {
        let nowAdd = trip[1];
        let  i = 0 ;
        while(i < inCar.length) {
            let inTrip = inCar[i];
            if(inTrip[2] <= nowAdd) {
                carNum = carNum - inTrip[0];
                inCar.splice(i,1);
            } else {
                i++
            }
        }
        carNum += trip[0];
        if(carNum > capacity) {
            return false;
        }
        inCar.push(trip);
    }
    return true;
};

// 1103. 分糖果 II 等差求和 逻辑题
/**
 * @param {number} candies
 * @param {number} num_people
 * @return {number[]}
 */
var distributeCandies = function(candies, num_people) {
    let num = Math.floor(Math.sqrt(candies*2));
    while(num*(num +1) > 2*candies) {
        num--;
    }
    let turn =  Math.floor(num/num_people);
    let result = [];
    for (let index = 0; index < num_people; index++) {
        let num = (index + 1 + num_people*(turn - 1) + index + 1)*turn/2;
        result.push(num);     
    }
    let last = num%num_people;
    for (let index = 0; index < last; index++) {
        result[index] += index + 1 + turn*num_people;  
    }
    result[last] +=  (candies - num*(num +1)/2);
    return result;
};

// 1104.二叉树寻路 基本逻辑题
/**
 * @param {number} label
 * @return {number[]}
 */
var pathInZigZagTree = function(label) {
    let result = [];
    while(label > 0) {
        result.unshift(label);
        label = Math.floor(label/2);
    }
    let flg = result.length%2;
    let base = 2;
    for (let index = 1; index < result.length; index++) {
        if(flg == index%2) {
            result[index] = base*3 - 1 - result[index];
        }
        base = base*2;
    }
    return result;
};
// 1106. 解析布尔表达式  递归 或者堆栈 都可以
/**
 * @param {string} expression
 * @return {boolean}
 */
var parseBoolExpr = function(expression) {
    if(expression.length < 3) {
        return expression[0] == "t" ? true : false;
    }
    let step = expression[0];
    let nums = getArray(expression.substr(2,expression.length - 3));
    if(step == "!") {
        return !nums[0];
    } else {
        for(let num of nums) {
            if(step == "&" && num == false) {
                return false;
            }
            if(step == "|" && num == true) {
                return true;
            }
        }
    }
    return step == "&" ?  true : false;

    function getArray(node) {
        let result = [];
        let i = 0;
        while(i < node.length) {
            let char  = node[i];
            if(char == "t") {
                result.push(true);
            } else if (char == "f") {
                result.push(false);
            }else {
                let newNode = char;
                let num = 0;
                while(!(node[i] ==")" && num == 0)){
                    i++;
                    newNode += node[i];
                    if(node[i] == "(") {
                        num++;
                    } else if(node[i] ==")") {
                        num--;
                    }
                }
                result.push(parseBoolExpr(newNode));
            }
            i +=2;
        }
        return result;
    }
};

var parseBoolExpr = function(expression) {
    var stack = [];
    var cache2;

    for (var i=0; i<expression.length; i++) {
        var medi2 = '';
        if (expression[i]==")") {
            var fSym = false;
            var tSym = false;
            var stop = stack.length-1;
            while (stack[stop] != "(") {
                var takon = stack.pop();
                if (!fSym && takon == "f") {
                    fSym = true;
                }
                if (!tSym && takon == "t") {
                    tSym = true;
                }
                stop -= 1;
            }
            var calSym = stack[stop-1];
            if (calSym == "!") {
               medi2 = fSym ? "true" : "false";
            } else {
                if (calSym == "&") {
                    medi2 = fSym ? "false" : "true";
                }
                if (calSym == "|") {
                    medi2 = tSym ? "true" : "false";
                }
            }
            stack.pop();
            stack.pop();
            stack.push(medi2=="true" ? "t" : "f");
        } else {
            if (expression[i]!=",") {
                stack.push(expression[i]);
            }
        }
    }
    return stack[0]=="t" ? true : false;
}
// 1108. IP 地址无效化 正则表达式
/**
 * @param {string} address
 * @return {string}
 */
var defangIPaddr = function(address) {
    return address.replace(/\./g,'[.]');
};

// 1110. 删点成林  二叉树的遍历，暴力解法
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function(root, to_delete) {
    if(root == null){return}
    let result = [root];
    for (let index = 0; index < to_delete.length; index++) {
        dNodes(to_delete[index]);
    }
    return result;

    function dNodes(num) {
       for (let index = 0; index < result.length; index++) {
           let node = result[index];
           if(node.val == num) {
               result.splice(index,1);
               addNode(node);
               return;
           }
           let stack = [node];
           while(stack.length > 0) {
               let inNode = stack.shift();
               if(inNode.left) {
                   if(inNode.left.val == num) {
                        addNode(inNode.left);
                        inNode.left = null;
                        return;
                   }
                   stack.push(inNode.left);
               }
               if(inNode.right) {
                    if(inNode.right.val == num) {
                        addNode(inNode.right);
                        inNode.right = null;
                        return;
                    }
                    stack.push(inNode.right);
               }               
           }
       } 
    }

    function addNode(node) {
        if(node.left) {
            result.push(node.left);
        }
        if(node.right) {
            result.push(node.right);
        }
    }

};

// 1109. 航班预订统计 扫描线法
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function(bookings, n) {
    let backMap = new Map();
    for (let booking of bookings) {
        backMap.set(booking[0],booking[2] + (backMap.get(booking[0]) ? backMap.get(booking[0]): 0));
        backMap.set(booking[1] + 1, -1*booking[2] + (backMap.get(booking[1] +1) ? backMap.get(booking[1] +1): 0));
    }
    let result = [];
    let back = 0;
    for (let index = 0; index < n; index++) {
        back = back + (backMap.get(index+1) ? backMap.get(index+1) : 0);
        result.push(back);
    }
    return result;
};

// 1111. 有效括号的嵌套深度  贪心算法
/**
 * @param {string} seq
 * @return {number[]}
 */
var maxDepthAfterSplit = function(seq) {
    let A = 0;
    let B = 0;
    let result = [];
    for (let index = 0; index < seq.length; index++) {
        if(seq[index] == "(") {
            if(A > B) {
                B++;
                result.push(1);
            } else {
                A++;
                result.push(0);
            }
        } else {
            if(A<B) {
                B--;
                result.push(1);
            } else {
                A--;
                result.push(0);
            }
        }
    }
    return result;
};

// 1122. 数组的相对排序  基础逻辑题
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function(arr1, arr2) {

    var backArray = Array(arr2.length).fill(0);
    var noArray = [];
    for(let num of  arr1)  {
        let index = arr2.indexOf(num);
        if(index > -1) {
            backArray[index] += 1;
        } else {
            noArray.push(num);
        }
    }
    let result = [];
    for (let index = 0; index < arr2.length; index++) {
        let num = arr2[index];
        let sum = backArray[index];
        while(sum > 0) {
            result.push(num);
            sum--;
        }
    }
    noArray.sort((a,b) => a-b);
    result = result.concat(noArray);
    return result;
};

//  1123.最深叶节点的最近公共祖先 后续遍历
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var lcaDeepestLeaves = function(root) {
    let ans = null,maxDepth = 0
    dfs(root,0) 
    return ans
    function dfs(node,depth) {
        if(node == null) { return depth}
        depth++;
        let left = dfs(node.left,depth)
        let right = dfs(node.right,depth)
        depth = Math.max(left, right);
         if(left == right && depth >= maxDepth) {
            ans = node
            maxDepth = depth
        }
        return depth
    }
};

// 1128. 等价多米诺骨牌对的数量 map 记录
/**
 * @param {number[][]} dominoes
 * @return {number}
 */
var numEquivDominoPairs = function(dominoes) {
    let backMap =  new Map();
    for (let index = 0; index < dominoes.length; index++) {
        let num = dominoes[index];
        let key  =  num[0] > num[1] ? num[1]*10 + num[0] : num[0]*10 + num[1];
        backMap.set(key,backMap.get(key) ?  (backMap.get(key) + 1) : 1)
    }
    let result = 0;
    for(let num of  backMap) {
        result += (num[1] - 1)*num[1]/2;
    }
    return result;
};

// 1131. 绝对值表达式的最大值 数学式展开 
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
var maxAbsValExpr = function(arr1, arr2) {
    let a = [arr1[0] + arr2[0],arr1[0] + arr2[0]];
    let b = [arr1[0] + arr2[0],arr1[0] + arr2[0]];
    let c = [arr1[0] - arr2[0],arr1[0] - arr2[0]];
    let d = [arr1[0] - arr2[0],arr1[0] - arr2[0]];
    for (let i = 1; i < arr1.length; i++){
        let x = arr1[i];
        let y = arr2[i];
        a[0] = Math.max(a[0],x+y+i);
        a[1] = Math.min(a[1],x+y+i);
        b[0] = Math.max(b[0],x+y-i);
        b[1] = Math.min(b[1],x+y-i);
        c[0] = Math.max(c[0],x-y+i);
        c[1] = Math.min(c[1],x-y+i);
        d[0] = Math.max(d[0],x-y-i);
        d[1] = Math.min(d[1],x-y-i);
    }
    return Math.max(a[0] - a[1],b[0] - b[1],c[0] - c[1],d[0] - d[1]);

};


 // 1137. 第 N 个泰波那契数 最基本的动态规划
/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function(n) {
    let n1 = 0,n2 = 0, n3 = 1,d = n;
    while((--n) > 0) {
        d = n1 + n2 + n3;
        n1 = n2; n2 = n3;n3 = d;
    }
    return d;
};

// 1140. 石子游戏 II 动态规划 i表示现在的位置，j表示M的值
/** 
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function(piles) {
    let len = piles.length;
    let sum = new Array(len);
    sum[len -1] = piles[len -1];
    for (let i = len - 2; i >= 0; i--) {
        sum[i] = sum[i+1] + piles[i];   
    }
    let dp = new Array(len);
    for (let i = 0; i < len; i++) {
        dp[i] = new Array(len).fill(0);
    }
    for (let i = len - 1; i >= 0; i--) {
        for (let j = 0; j < len; j++) {
            let  m = j+1;
            if(2*m >= len - i) {
                dp[i][j] = sum[i]
            } else {
                for (let k = 1; k <= 2*m; k++) {
                    dp[i][j] =  Math.max(dp[i][j],sum[i] - dp[i+k][Math.max(k,m) -1])
                }
            }
        }   
    }
    return dp[0][0];
};

// 1143.最长公共子序列 动态规划
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    let num1 = text1.length
    let num2 = text2.length
    let backup = []
    for (let index = 0; index < num1 + 1; index++) {
        backup.push(Array(num2+1).fill(0))        
    }
    for (let i = 1; i < num1 + 1; i++) {
        for (let j = 1; j < num2 + 1; j++) {
            if(text1[i -1] == text2[j-1]) {
                backup[i][j] = backup[i-1][j-1] + 1;
            } else {
                backup[i][j] = Math.max(backup[i-1][j],backup[i][j-1])
            }
            
        }
    }
    return backup[num1][num2]
};


// 1154. 一年中的第几天  基础逻辑题
/**
 * @param {string} date
 * @return {number}
 */
var dayOfYear = function(date) {
    let month = [31,28,31,30,31,30,31,31,30,31,30,31];
    let dateArray = date.split('-');
    let year = Number.parseInt(dateArray[0]);
    if(year%4 == 0) {
        month[1] = 29;
    }
    if(year%100 == 0 && year%400 != 0) {
        month[1] = 28;
    }
    let months = Number.parseInt(dateArray[1]);
    let days = 0;
    for (let index = 0; index < months -1; index++) {
        days += month[index];
    }
    days +=  Number.parseInt(dateArray[2]);
    return days;
}


// 1155. 掷骰子的N种方法  动态规划
/**
 * @param {number} d
 * @param {number} f
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function(d, f, target) {
    if(d*f < target) {return 0};
    if(d*f == target || d == 1) {return 1};
    let dp = Array(d).fill(0).map(x => Array(target+1).fill(0));
    for (let index = 1; index < f+1; index++) {
        dp[0][index] = 1;
    }
    for (let i = 1; i < d; i++) {
        for (let j = i; j <= target; j++) {
            for (let k = 1; j-k >=0 && k<= f ; k++) {
                dp[i][j] = (dp[i][j] + dp[i - 1][j - k])%1000000007;
            }
        }
    }
    return dp[d-1][target];
};

// 1160. 拼写单词  转ascii 数组记录
/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
var countCharacters = function(words, chars) {
    let backup = Array(26).fill(0);
    for(let char of chars) {
        backup[char.charCodeAt() - 97] += 1;
    }
    let result = 0;
    for(let word of words) {
        result += checkWord(word);
    }
    return result;

    function checkWord (word) {
        let inBackup = backup.concat();
        for (let wChar of word) {
            inBackup[wChar.charCodeAt() - 97] -= 1;
            if(inBackup[wChar.charCodeAt() - 97] < 0) {
                return 0;
            }
            
        }
        return word.length;
    }
};

// 1161. 最大层内元素和 二叉树循环
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxLevelSum = function(root) {
    if(!root) {return 1};
    let backup = [root];
    let num = 0;
    let max = root.val - 1;
    let result = 0;
    while(backup.length > 0) {
        num++;
        let sum = 0;
        let newBackup = [];
        for(let node of backup) {
            sum += node.val;
            if(node.left) {
                newBackup.push(node.left);
            }
            if(node.right) {
                newBackup.push(node.right);
            }
        }
        if(sum > max) {
            result = num;
            max = sum;
        }
        backup = newBackup;
    }
    return result;
};

// 1170. 比较字符串最小字母出现频次 二分查找
/**
 * @param {string[]} queries
 * @param {string[]} words
 * @return {number[]}
 */
var numSmallerByFrequency = function(queries, words) {

    let backup = []
    for (let index = 0; index < words.length; index++) {
        let num = minNum(words[index]);
        backup.push(num);
    }
    backup.sort((a,b)=> a-b);
    let result = [];
    for (let index = 0; index < queries.length; index++) {
        let num = minNum(queries[index]);
        let maxNum = dfs(num);
        result.push(maxNum);
    }
    return result;

    function minNum (word) {
        let num = word[0].charCodeAt();
        let sum = 1;
        for (let index = 1; index < word.length; index++) {
            let char = word[index].charCodeAt();
            if(char < num) {
                num = char;
                sum = 1;
            } else if (char == num) {
                sum++;
            }
        }
        return sum;
    }

    function  dfs(num) {
        let start = 0;
        let end = backup.length -1;
        while(start < end) {
            let mid = Math.floor((start + end)/2);
            if(backup[mid] <= num) {
                start = mid +1;   
            } else {
                end = mid -1;
            }
        }
        let sum = backup.length - start;
        if(backup[start] <= num) {
            sum --;
        } 
        return sum;
    } 
};

// 1171. 从链表中删去总和值为零的连续节点 转成数组判断和是否存在相等的点 然后再剔除
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeZeroSumSublists = function(head) {
    if(!head) { return null}; 
    let backup = [0];
    let num = [0];
    let next =  head;
    while(next) {
        let value = next.val;
        let sum = backup[backup.length -1] + value;
        num.push(value);
        if(backup.indexOf(sum) != -1) {
            let i = backup.indexOf(sum);
            num = num.slice(0,i+1);
            backup = backup.slice(0,i+1);
        }else {
            backup.push(sum);
        }
        next = next.next;
    }
    let newHead = new ListNode(0);
    next = newHead;
    for (let index = 1; index < num.length; index++) {
        next.next = new ListNode(num[index]); 
        next = next.next;
    }
    return newHead.next;
};

// 1174. 健身计划评估 基础逻辑题
/**
 * @param {number[]} calories
 * @param {number} k
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var dietPlanPerformance = function(calories, k, lower, upper) {
    let sum = 0;
    let score = 0;
    for (let index = 0; index < calories.length; index++) {
        sum += calories[index];
        if(index >= k) {
            sum -= calories[index -k];
        }
        if(index >= k - 1) {
            if(sum < lower) {
                score--;
            } else if(sum > upper) {
                score++;
            }
        }
    }
    return score;
};

// 1175. 质数排列  先判断质数，再做全排列
/**
 * @param {number} n
 * @return {number}
 */
var numPrimeArrangements = function(n) {
    let MOD = Math.pow(10,9) + 7;
    let p = 0;
    let np = 0;

    for (let index = 1; index <= n; index++) {
        if(isPrimeNumber(index)) {
            p++;
        } else {
            np++;
        }
    }
    let result = calculateNum(p,np);
    return result;

    function isPrimeNumber(num) {
        if(num < 2) return false;
        let checkNum = Math.floor(Math.sqrt(num)) + 1
        for (let i = 2; i < checkNum; i++) {
            if(num%i == 0) {return false}
        }
        return true;
    }

    function calculateNum (num,num2) {
        let result = 1;
        for (let index = 1; index <= num; index++) {
            result *=index;
            result = result%MOD;
        }
        for (let index = 1; index <= num2; index++) {
            result *=index;
            result = result%MOD;
        }
        return result;
    }
};
 
// 1184. 公交站间的距离  基础逻辑题 
/**
 * @param {number[]} distance
 * @param {number} start
 * @param {number} destination
 * @return {number}
 */
var distanceBetweenBusStops = function(distance, start, destination) {
    if(start ==  destination) {return 0};
    if(start > destination) {return distanceBetweenBusStops(distance,destination,start)}
    var num1 = 0;
    var num2 = 0;

    for (let index = 0; index < distance.length; index++) {
        if(index >= start && index < destination) {
            num1 += distance[index];
        } else {
            num2 += distance[index];
        }
    }
    return Math.min(num1,num2);
};

// 1185. 一周中的第几天  逻辑计算题 
/**
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @return {string}
 */
var dayOfTheWeek = function(day, month, year) {
    let weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let month_days = [31,28,31,30,31,30,31,31,30,31,30,31];
    let sum = 4;
    for (let i = 1971; i < year; i++) {
        if((i%4 == 0 && i%100 != 0) || (i%400==0)) {
            sum +=366
        } else {
            sum +=365
        }
    }
    for (let i = 0; i < month -1; i++) {
        sum += month_days[i];
        if(i==1 && ((year%4 == 0 && year%100 != 0) || (year%400==0))) {
            sum +=1;
        }
    }
    sum += day;
    return weeks[sum%7];
};

// 1189. “气球” 的最大数量 基础逻辑
/**
 * @param {string} text
 * @return {number}
 */
var maxNumberOfBalloons = function(text) {
    let backup =[0,0,0,0,0];
    for (let index = 0; index < text.length; index++) {
        let char = text[index];
        switch (char) {
            case 'a':
                backup[0] +=1;
                break;
            case 'b':
                    backup[1] +=1;
                    break;
            case 'n':
                    backup[2] +=1;
                    break;
            case 'l':
                    backup[3] +=1;
                    break;
            case 'o':
                    backup[4] +=1;
                    break;
            default:
                break;
        }
    }
    return Math.min(backup[0],backup[1],backup[2],Math.floor(backup[3]/2),Math.floor(backup[4]/2))
};

// 1190. 反转每对括号间的子串 堆栈
/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function(s) {
    let backup = [''];
    for (let char of s) {
        if(char == '(') {
            backup.push('');
        } else if(char ==')') {
            let last = backup.pop();
            backup[backup.length -1] = backup[backup.length -1] + last.split("").reverse().join("");
        } else {
            backup[backup.length -1] = backup[backup.length -1] + char;
        }
    }
    return backup[0];
};

// 1200. 最小绝对差 排序基本逻辑
/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function(arr) {
    let backup = arr.sort((a,b) => a -b);
    let result = [];
    let min = backup[1] - backup[0] + 1;
    for (let index = 1; index < backup.length; index++) {
        let num = backup[index];
        let bnum = backup[index -1];
        if(num -bnum < min) {
            min = num -bnum;
            result = [[bnum,num]]
        } else if (num -bnum == min) {
            result.push([bnum,num])
        }
    }
    return result;
};

// 1023. 驼峰式匹配  单个匹配 正则分割
/**
 * @param {string[]} queries
 * @param {string} pattern
 * @return {boolean[]}
 */
var camelMatch = function(queries, pattern) {
    let pBackup = ("T" + pattern).match(/[A-Z][a-z]{0,}/g)

    let result = []
    for (let node of queries) {
        result.push(checkString(node))
    }
    return result;
    function checkString (node){
        let nBackup = ("T" + node).match(/[A-Z][a-z]{0,}/g)
        if(pBackup.length != nBackup.length) {
            return false;
        }
        for (let index = 0; index < pBackup.length; index++) {
            let p = pBackup[index];
            let n = nBackup[index];
            let i = 0;j= 0;
            while(i < p.length && j < n.length) {
                if(p[i] == n[j]) {
                    i++
                    j++
                } else {
                    j++
                }
            }
            if(i <p.length) {
                return false;
            }
        }
        return true;
    }
};

// 1213. 三个有序数组的交集 基本逻辑题
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number[]} arr3
 * @return {number[]}
 */
var arraysIntersection = function(arr1, arr2, arr3) {
    let i = 0,j = 0,k = 0;
    let result = [];
    while(i < arr1.length && j < arr2.length && k < arr3.length) {
        let num1 = arr1[i], num2 = arr2[j],num3 = arr3[k];
        if(num1 == num2 && num2 == num3) {
            result.push(num1)
            i++
            j++
            k++
        } else {
            let max = Math.max(num1,num2,num3)
            max == num1 ? i:i++;
            max == num2 ? j:j++;
            max == num3 ? k:k++;
        }
    }
    return result;
};
 
// 1214. 查找两棵二叉搜索树之和  递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @param {number} target
 * @return {boolean}
 */
var twoSumBSTs = function(root1, root2, target) {

    if (root1 == null) {
        return false;
    }
    return find(root2,target-root1.val) || twoSumBSTs(root1.left,root2,target) || twoSumBSTs(root1.right,root2,target)

    function find(node,value) {
        if(node ==null) {
            return false;
        }
        if(node.val == value) {
            return true;
        } else if(node.val < value) {
            return find(node.right,value);
        }else {
            return find(node.left,value);
        }
    }
};

// 1207. 独一无二的出现次数 基本逻辑题
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function(arr) {
    let backMap = new Map()
    for (let num of arr) {
        backMap.get(num) == null ?  backMap.set(num,1) : backMap.set(num,backMap.get(num) + 1);
    }
    let backMap2 = new Map();
    for(let item of backMap) {
        if(backMap2.get(item[1]) != null) {
            return false;
        } else {
            backMap2.set(item[1],1)
        }
    }
    return true;
};
//  1209. 删除字符串中的所有相邻重复项 II  基础逻辑
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var removeDuplicates = function(s, k) {
    let num = 0, i = 0, backup = '',result = s
    while(i < result.length) {
        let char = result[i]
        if(backup == char) {
            num++;
        } else {
            num = 1;
            backup = char;
        }
        if(num == k) {
            result = result.substring(0,i - k + 1) + result.substring(i+1)
            i = (i - 2*k + 1) < 0 ?  0 : i - 2*k + 1 
            num = 0
            backup = ''
        } else {
            i++
        }
    }
    return result
};

// 1217. 玩筹码  逻辑题 其实就是求奇偶小的那个数
var minCostToMoveChips = function(chips) {
    let i = 0,j = 0
    for(let chip of chips) {
        if(chip%2 == 0) {
            i++;
        }else {
            j++;
        }
    }
    return Math.min(i,j);
};

// 1218.最长定差子序列  map记录
/**
 * @param {number[]} arr
 * @param {number} difference
 * @return {number}
 */
var longestSubsequence = function(arr, difference) {
    let map = new Map();
    let sum =0;
    for(let num of arr) {
        let count = map.get(num-difference) == null ? 1 : 1+map.get(num-difference);
        map.set(num,count);
        sum = Math.max(sum,count);
    }
    return sum;
}

// 1220. 统计元音字母序列的数目  动态规划
/**
 * @param {number} n
 * @return {number}
 */
var countVowelPermutation = function(n) {
    let back = [1,1,1,1,1]
    let check = 1000000007
    for (let index = 1; index < n; index++) {
        let newBack = [];
        newBack.push((back[1] + back[2] + back[4])%check)
        newBack.push((back[0] + back[2])%check)
        newBack.push((back[1] + back[3])%check)
        newBack.push(back[2])
        newBack.push((back[2] + back[3])%check)
        back = newBack;
    }
    return (back[0] + back[1] + back[2] + back[3] + back[4])%check;
};

// 1227. 飞机座位分配概率 逻辑思考题
/**
 * @param {number} n
 * @return {number}
 */
var nthPersonGetsNthSeat = function(n) {
    return  n == 1 ? 1 : 0.5
    
};

 // 1221. 分割平衡字符串  贪心算法
 /**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function(s) {
    let num = 0
    let result = 0
    for (let index = 0; index < s.length; index++) {
        let char = s[index];
        if(char == 'R') {
            num++
        } else {
            num--
        }
        if(num == 0) {
            result++;
        }
    }
    return result;
};

// 1228. 等差数列中缺失的数字 基础逻辑
/**
 * @param {number[]} arr
 * @return {number}
 */
var missingNumber = function(arr) {

    let sum = arr[1] - arr[0];
    for (let index = 2; index < arr.length; index++) {
        let newSum = arr[index] - arr[index -1]
        if(sum != newSum) {
            if(newSum*2  ==  sum) {
                return arr[0] + newSum;
            } else {
                return arr[index -1] + sum;
            }
        }
    }
    return arr[0];
};

// 1230.抛掷硬币 动态规划
/**
 * @param {number[]} prob
 * @param {number} target
 * @return {number}
 */
var probabilityOfHeads = function(prob, target) {
    let backup = [1-prob[0],prob[0]];
    for (let index = 1; index < prob.length; index++) {
        let num = prob[index];
        let newBackup = [backup[0]*(1-num)]
        for (let i = 1; i <= Math.min(target,index); i++) {
            let newNum = backup[i-1]*num + backup[i]*(1-num);
            newBackup.push(newNum);
        }
        newBackup.push(backup[backup.length-1]*num);
        backup = newBackup;
    }
    return backup[target];
};

// 1232. 缀点成线 精度问题用乘法代替除法
/**
 * @param {number[][]} coordinates
 * @return {boolean}
 */
var checkStraightLine = function(coordinates) {
    let x1 = coordinates[1][0] -  coordinates[0][0] 
    let y1 = coordinates[1][1] -  coordinates[0][1] 
    for (let index = 2; index < coordinates.length; index++) {
        let x2 = coordinates[index][0] -  coordinates[index-1][0] 
        let y2 = coordinates[index][1] -  coordinates[index-1][1] 
        if(x1*y2 != x2*y1) {
            return false;
        }
    } 

    return true;
};

//  1233. 删除子文件夹 排序 判断
/**
 * @param {string[]} folder
 * @return {string[]}
 */
var removeSubfolders = function(folder) {
    folder.sort()
    let result = [];
    let root = folder[0];
    result.push(root)
    root = root +'/'
    for (let index = 1; index < folder.length; index++) {
        let char  = folder[index];
        if(!char.startsWith(root)) {
            result.push(char);
            root = char + '/'
        }
    }
    return result;
};

// 1235. 规划兼职工作  动态规划 下面一个添加可以用二分法优化
/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
var jobScheduling = function(startTime, endTime, profit) {
    let res = 0;
    let data =[]
    for (let index = 0; index < startTime.length; index++) {
        data.push([startTime[index],endTime[index],profit[index]])
    }
    data.sort((a,b) => a[0] - b[0]);
    let backup = [[data[0][1],data[0][2]]];

    for (let index = 1; index < data.length; index++) {
        while(backup.length > 0 && backup[0][0] <= data[index][0]) {
            res = Math.max(res,backup[0][1]);
            backup.shift();
        }
        addNum([data[index][1],res+data[index][2]]);
    }
    for(let node of backup) {
        res = Math.max(node[1],res);
    }
    return res;
    // 添加元素
    function addNum(node) {
        let i = 0;
        while(i < backup.length && node[0] > backup[i][0]) {
            i++;
        }
        backup.splice(i,0,node)
    }
};

// 1239. 串联字符串的最大长度 回朔算法
/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function(arr) {
    let max = 0,backup = Array(26).fill(0)
    dfs(0,'',backup)
    function dfs(index,str,backup) {
        let char  = arr[index];
        if(index < arr.length - 1) {
            dfs(index+1,str,backup.concat())
        }
        let nstr = arr[index];
        for (let i = 0; i < nstr.length; i++) {
            let num = nstr[i].charCodeAt() - 97
            if(backup[num] == 1) {
                return
            } else {
                backup[num] = 1
            }
        }
        max = Math.max(max,(str + nstr).length)
        if(index < arr.length - 1) {
            dfs(index+1,str + nstr,backup.concat())
        }
    }
    return max
};

// 1243. 数组变换 基础逻辑
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var transformArray = function(arr) {
    if(arr.length < 3) {
        return;
    }
    let check = true
    while(check) {
        check = false;
        let newArray = [arr[0]]
        for (let index = 1; index < arr.length - 1; index++) {
            let num = arr[index];
            if(num < arr[index - 1] && num < arr[index + 1]) {
                num++
                check = true
            }
            if(num> arr[index - 1] && num > arr[index + 1]) {
               num--
               check = true
            }
            newArray.push(num)
        }
        newArray.push(arr[arr.length -1])
        arr = newArray
    }
    return arr;
};

// 1247. 交换字符使得字符串相同 基础逻辑
/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumSwap = function(s1, s2) {
    if(s1.length != s2.length) {return false}
    let xy = 0,yx =0
    for (let index = 0; index < s1.length; index++) {
        if(s1[index] !=s2[index]) {
            if(s1[index] == 'x') {
                xy++
            } else {
                yx++;
            }
        }
    }
    return (xy + yx)%2 != 0 ? -1 : ((xy+yx)/2 + xy%2)
};

// 1248.统计「优美子数组 计算
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numberOfSubarrays = function(nums, k) {
    let pre = -1;
    let backup = []
    for (let i = 0; i < nums.length; i++) {
        if(nums[i]%2 == 1) {
            backup.push(i-pre)
            pre = i 
        }
    }
    backup.push(nums.length-pre)
    let num = 0;
    for (let i = 0; i + k < backup.length; i++) {
        num += backup[i]*backup[i+k]
    }
    return num
};

// 1249. 移除无效的括号 堆栈
/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function(s) {
    let result = '';
    let backStr = [];
    let delNum = 0
    for (let i = 0; i < s.length; i++) {
        let char =s[i]
        if(char == '(') {
            backStr.push(i -delNum);
        } else if(char == ')') {
            if(backStr.length > 0) {
                backStr.pop()
            } else {
                delNum++
                continue;
            }
        }
        result += char;
    }

    while(backStr.length > 0) {
        let i = backStr.pop();
        result = result.substr(0,i) + result.substr(i+1);
    }
    return result;
};

// 1250. 检查「好数组」 计算最大公约数 如果不为1则肯定无法实现好数组 否则可以

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isGoodArray = function(nums) {
    let result = nums[0];
    for (let index = 1; index < nums.length; index++) {
        result = gcd(result,nums[index]);
    }
    return result == 1
    
    function gcd(a,b) {
        return b == 0 ? a : gcd(b,a%b);
    }
};

// 1252.奇数值单元格的数目 基础逻辑 
/**
 * @param {number} n
 * @param {number} m
 * @param {number[][]} indices
 * @return {number}
 */
var oddCells = function(n, m, indices) {
    let nBackup = Array(n).fill(0);
    let mBackup = Array(m).fill(0);
    for (let index = 0; index < indices.length; index++) {
        let nums = indices[index];
        nBackup[nums[0]]++;
        mBackup[nums[1]]++;
    }
    let result = 0
    for (let i = 0; i < nBackup.length; i++) {
        for (let j = 0; j < mBackup.length; j++) {
            result += (nBackup[i] +mBackup[j])%2
        }
    }
    return result;
};

// 1256. 加密数字 找规律
/**
 * @param {number} num
 * @return {string}
 */
var encode = function(num) {
    return   (num +1).toString(2).substring(1);
};

//  1260. 二维网格迁移 找到初始的点 开始重新排序

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var shiftGrid = function(grid, k) {
    let y = grid.length;
    let x = grid[0].length;
    let nums = x*y;
    let tk = k%nums;
    if(tk == 0) { return grid; }
    tk = nums - tk +1;
    let starty = Math.floor((tk -1)/x); 
    let startx = (tk -1)%x;
    let result = [];
    for (let i = 0; i < y; i++) {
        let  inArray = [];
        for (let j = 0; j < x; j++) {
            inArray.push(grid[starty][startx]) 
            startx++;
            if(startx == x) {
                starty++;
                startx = 0;
                if(starty == y) {
                    starty = 0;
                }
            }
        }
        result.push(inArray);
    }
    return result;
};

// 1262. 可被三整除的最大和 贪心算法
var maxSumDivThree = function(nums) {
    let backup1 = [];
    let backup2 = [];
    let result = 0;
    nums.sort((a,b) => a - b);
    for(let num of nums) {
        let index = num%3;
        result += num;
        if (index == 1) {
            backup1.push(num);
        } else if(index == 2) {
            backup2.push(num);
        }
    }
    if(result%3 == 1) {
        if(backup1.length > 0 && backup2.length > 1) {
            result = Math.max(result - backup1[0],result - backup2[0] -backup2[1]);
        } else if(backup1.length > 0) {
            result = result - backup1[0];
        } else {
            result = result -backup2[0] -backup2[1];
        }
    }

    if(result%3 == 2) {
        if(backup1.length > 1 && backup2.length > 0) {
            result = Math.max(result - backup2[0],result - backup1[0] -backup1[1]);
        } else if(backup2.length >0) {
            result = result - backup2[0];
        } else {
            result = result -backup1[0] -backup1[1];
        }
    }

    return result;
};

// 1266. 访问所有点的最小时间  xx 与yy中的绝对值相对大的那个就好了 因为要按照顺序执行
/**
 * @param {number[][]} points
 * @return {number}
 */
var minTimeToVisitAllPoints = function(points) {
    if(points.length < 2) {
        return 0;
    }
    let x = points[0][0],y = points[0][1],result = 0
    for (let index = 1; index < points.length; index++) {
        let point = points[index];
        result += Math.max(Math.abs(x - point[0]),Math.abs(y - point[1]))
        x = point[0],y = point[1]
    }
    return result;
};

// 1267. 统计参与通信的服务器  简单的计数法
/**
 * @param {number[][]} grid
 * @return {number}
 */
var countServers = function(grid) {
    if(grid.length == 0){return}
    let x = Array (grid.length).fill(0);
    let y = Array (grid[0].length).fill(0);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if(grid[i][j] == 1) {
                x[i] ++;
                y[j]++;
            }
        }
    }
    let result = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if(grid[i][j] == 1 &&(x[i] > 1 || y[j] > 1)) {
                result++;
            }
        }
    }
    return result;
};

// 1268. 搜索推荐系统  先排序 后处理
var suggestedProducts = function(products, searchWord) {
     let checkList = products.sort(),index = 0,result =[]
     while(checkList.length > 0 && index < searchWord.length) {
         let newList =[];
         for (let product of checkList) {
             if(product.substr(index,1) == searchWord.substr(index,1)) {
                 newList.push(product);
             }
         }
         result.push(newList.length > 3 ? [newList[0],newList[1],newList[2]] : newList);
         checkList = newList;
         index++;
     }
     while(index < searchWord.length) {
         result.push([]);
         index++;
     }
     return result;
};
//  1271. 十六进制魔术数字 基础逻辑
/**
 * @param {string} num
 * @return {string}
 */
var toHexspeak = function(num) {
    let chekNum = Number.parseInt(num) 
    let result = ""
    while (chekNum > 0) {
        let mod = chekNum%16
        if(mod == 0) {
            result = "O" + result
        } else if(mod == 1) {
            result = "I" + result
        } else if(mod >= 10) {
            result = String.fromCharCode(65 + mod -10) +result
        } else {
            return "ERROR"
        }
        chekNum = Math.floor(chekNum/16)
    }
    return result
};

// 1272. 删除区间 基础逻辑
/**
 * @param {number[][]} intervals
 * @param {number[]} toBeRemoved
 * @return {number[][]}
 */
var removeInterval = function(intervals, toBeRemoved) {
    let result = [];
    for (let i = 0; i < intervals.length; i++) {
        let interval = intervals[i];
        if(interval[0] >= toBeRemoved[1] || interval[1] <= toBeRemoved[0]) {
            result.push(interval);
        } else if (interval[0] < toBeRemoved[0] && interval[1] > toBeRemoved[1]) {
            result.push([interval[0],toBeRemoved[0]])
            result.push([toBeRemoved[1],interval[1]])   
        } else if (interval[0]< toBeRemoved[0]) {
            result.push([interval[0],toBeRemoved[0]])
        } else if(interval[1] > toBeRemoved[1]) {
            result.push([toBeRemoved[1],interval[1]])  
        }
    }
    return result;
};

// 1275. 找出井字棋的获胜者 逻辑题
/**
 * @param {number[][]} moves
 * @return {string}
 */
var tictactoe = function(moves) {
    let backup = []
    for (let i = 0; i < 3; i++) {
        backup.push([0,0,0])
    }

    if(moves.length < 5) {
        return "Pending"
    }
    for (let i = 0; i < moves.length; i++) {
        let num =  i%2 +1;
        backup[moves[i][0]][moves[i][1]] = num;
        let win = checkWin();
        if(win == 1) {
            return "A"
        } else if(win == 2) {
            return "B"
        }
    }
    return moves.length > 8 ? "Draw" : "Pending"

    function checkWin() {
        for (let i = 0; i < 3; i++) {
            if(backup[0][i] > 0 && backup[0][i] == backup[1][i] && backup[2][i] == backup[1][i]) {
                return backup[0][i]
            }
            if(backup[i][0] > 0 && backup[i][0] == backup[i][1] && backup[i][2] == backup[i][1]) {
                return backup[i][0] 
            }
        }
        if(backup[0][0] > 0 && backup[0][0] == backup[1][1] && backup[2][2] == backup[1][1]) {
            return backup[0][0];
        }
        if(backup[0][2] > 0 && backup[0][2] == backup[1][1] && backup[2][0] == backup[1][1]) {
            return backup[0][2];
        }
        return 0;
    }
};


// 1276. 不浪费原料的汉堡制作方案 二元一次方程求解
/**
 * @param {number} tomatoSlices
 * @param {number} cheeseSlices
 * @return {number[]}
 */
var numOfBurgers = function(tomatoSlices, cheeseSlices) {
    let num =  tomatoSlices - 2*cheeseSlices
    let result = []
    if(num % 2 == 0) {
        let x =  num/2
        let y =  cheeseSlices - x
        if(x >=0 && y>= 0) {
            result = [x,y]
        }
    }
    return result;
};

// 1281. 整数的各位积和之差 基本逻辑
/**
 * @param {number} n
 * @return {number}
 */
var subtractProductAndSum = function(n) {
    let product = 1;
    let sum = 0;
    let num = n;
    while(num > 0) {
        let node = num%10;
        sum += node
        product *= node
        num = Math.floor(num/10)
    }
    return product - sum;
};

// 1282. 用户分组 字典记录备份
/**
 * @param {number[]} groupSizes
 * @return {number[][]}
 */
var groupThePeople = function(groupSizes) {
    let backup = new Map();
    let result = [];
    for (let index = 0; index < groupSizes.length; index++) {
        let key  = groupSizes[index];
        let backArray = backup.get(key)
        if(backArray) {
            backArray.push(index)
        } else {
            backArray = [index];
        }
        if(backArray.length == key) {
            result.push(backArray);
            backArray = []
        }
        backup.set(key,backArray);
    }
    return result;
};

// 1283. 使结果不超过阈值的最小除数  二分查找 
/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var smallestDivisor = function(nums, threshold) {
    let maxNum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        maxNum = Math.max(maxNum,nums[i]);
    }
    let left = 1,right =maxNum;
    while(left  < right) {
        let mid = Math.floor((left + right)/2)
        let sum = 0;
        for(let num of nums) {
            sum += Math.ceil(num/mid);
        }
        if(sum > threshold) {
            left = mid + 1;
        }  else  {
            right = mid;
        }
    }
    return right;
};

// 1287. 有序数组中出现次数超过25%的元素 基础逻辑
/**
 * @param {number[]} arr
 * @return {number}
 */
var findSpecialInteger = function(arr) {
    let length = Math.floor(arr.length/4)+1;
    if(arr.length < 4) {
        return arr[0]
    }
    let num = arr[0]
    let sum = 1;
    for (let i = 1; i < arr.length; i++) {
        let inNum = arr[i];
        if(inNum == num) {
            sum++
            if(sum == length) {
                return num
            }
        } else {
            num = inNum
            sum = 1
        }
    }
    return 0
};

// 1288. 删除被覆盖区间 排序判断
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var removeCoveredIntervals = function(intervals) {
    intervals.sort((a,b) => {
        if(a[0] == b[0]) {
            return a[1] - b[1]
        } else {
            return a[0] -b[0]
        }
    })
    let backup = intervals[0]
    let num = 1;
    for (let i = 1; i < intervals.length; i++) {
        let interval = intervals[i];
        if(!(backup[0] <= interval[0] && backup[1] >= interval[1])) {
            num++;
            backup = interval;
        }

    }
    return num;
}

// 1289. 下降路径最小和  II  动态规划 主要是找到转移方程
/**
 * @param {number[][]} arr
 * @return {number}
 */
var minFallingPathSum = function(arr) {
    let backup = arr[0];
    for (let i = 1; i < arr.length; i++) {
        let inArr = arr[i];
        let min1 = Math.min(backup[0],backup[1])
        let min2 = Math.max(backup[0],backup[1]) 
        for (let index = 2; index < backup.length; index++) {
            let num = backup[index];        
            if(num < min1) {
                min2 = min1
                min1 = num
            } else if(num < min2) {
                min2 = num
            }
        }
        for (let index = 0; index < inArr.length; index++) {
            inArr[index] += backup[index] == min1 ? min2 : min1
        }
        backup = inArr;
    }
    let result = backup[0];
    for (let num of backup) {
        result = Math.min(result,num)
    }
    return result;
};

// 1290. 二进制链表转整数 基础逻辑
/**
 * @param {ListNode} head
 * @return {number}
 */
var getDecimalValue = function(head) {
    let str = ''
    let next = head
    while(next) {
        str += next.val
        next = next.next
    }
    return parseInt(str,2);
};

// 1291. 顺次数 穷举法
/**
 * @param {number} low
 * @param {number} high
 * @return {number[]}
 */
var sequentialDigits = function(low, high) {
    let backup = [12, 23, 34, 45, 56, 67, 78, 89,
        123, 234, 345, 456, 567, 678, 789,
        1234, 2345, 3456, 4567, 5678, 6789,
        12345, 23456, 34567, 45678, 56789,
        123456, 234567, 345678, 456789,
        1234567, 2345678, 3456789,
        12345678, 23456789,
        123456789]
    let result = []
    for (let i = 0; i < backup.length; i++) {
        let num = backup[i]
        if(num >= low && num <= high) {
            result.push(num);
        }
    }
    return result;
};

// 1295.统计位数为偶数的数字 转string 判断长度
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumbers = function(nums) {
    let result = 0
    for(let num of nums) {
        if(String(num).length%2 == 0) {
            result++
        }
    }
    return result;
};

// 1296.划分数组为连续数字的集合 map 计数
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var isPossibleDivide = function(nums, k) {
    if(nums.length%k != 0) {
        return false
    }
    nums.sort((a,b) => a - b)
    let backup = new Map()
    for(let num of nums) {
        backup.set(num, (backup.get(num)|| 0) + 1)
    }
    for(let num of nums) {
        let count = backup.get(num)
        if(count != 0) {
            for (let i = 0; i < k; i++) {
                let inCount = backup.get(num + i) || 0;
                if(inCount == 0) {
                    return false
                };
                backup.set(num+i,inCount -1)
            }
        }
    }
    return true;
};

// 1297. 子串的最大出现次数 窗口
/**
 * @param {string} s
 * @param {number} maxLetters
 * @param {number} minSize
 * @param {number} maxSize
 * @return {number}
 */
var maxFreq = function(s, maxLetters, minSize, maxSize) {
    let backup = Array(26).fill(0),count = 0;
    let backupMap = new Map()
    for (let i = 0; i < s.length; i++) {
        let num = s[i].charCodeAt() - 97;
        if(backup[num] == 0) {
            count++
        }
        backup[num] +=1
        if(i >= minSize) {
            num = s[i - minSize].charCodeAt() - 97;
            if(backup[num] == 1) {
                count--
            }
            backup[num] -=1
        }
        if(i >= minSize - 1) {
            if(count <=maxLetters) {
                let key = s.substr(i -minSize +1 ,minSize) 
                backupMap.set(key,(backupMap.get(key) || 0) +1)
            }
        }
    }
    let result = 0
    for (let item of backupMap) {
        result = Math.max(result,item[1])    
    }
    return result;
};

// 1304.和为零的N个唯一整数 基本逻辑
/**
 * @param {number} n
 * @return {number[]}
 */
var sumZero = function(n) {
    let num = Math.floor(n/2),ans = []
    for (let i = 1; i <= num; i++) {
        ans.push(i)
        ans.push(-i)
    }
    if(n%2 == 1) {
        ans.push(0)
    }
    return ans
};

// 1305.两棵二叉搜索树中的所有元素 二叉树的遍历与排序
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
var getAllElements = function(root1, root2) {

    let list1 = [],list2 = []
    dfs(root1,list1)
    dfs(root2,list2)
    let i =0,j = 0,ans =[];
    while(i< list1.length && j < list2.length) {
        if(list1[i] < list2[j]) {
            ans.push(list1[i]) 
            i++
        } else {
            ans.push(list2[j])
            j++
        }
    }
    while(i< list1.length) {
        ans.push(list1[i]) 
        i++
    }
    while(j < list2.length) {
        ans.push(list2[j])
        j++
    }
    return ans

    function dfs(node,list) {
        if(!node) {return}
        dfs(node.left,list);
        list.push(node.val)
        dfs(node.right,list);
    }

};

// 1306. 跳跃游戏 III  dfs backup记录走过的点
/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReach = function(arr, start) {
    let backup = Array(arr.length).fill(0)
    let length = arr.length
    let ans = false;
    dfs(start)
    function dfs(index) {
        let num =  arr[index];
        if(num == 0) {
            ans = true
            return
        }
        backup[index] = 1;
        if(index + num < length && backup[index + num] == 0) {
            dfs(index + num);
        } 
        if(-1 < index - num && backup[index - num] == 0) {
            dfs(index -num)
        }
    }
    return ans;
};

// 1309. 解码字母到整数映射 基本逻辑
/**
 * @param {string} s
 * @return {string}
 */
var freqAlphabets = function(s) {
    let ans = '';
    for (let i = 0; i < s.length; i++) {
        let str = s[i]
        if (s[i + 2] == '#') {
            str += s[i+1]
            i += 2
        }
        ans += String.fromCharCode(Number.parseInt(str) +96)
    }
    return ans
};

// 1310. 子数组异或查询   a^a = 0 a^b^c^a = b^c
/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
var xorQueries = function(arr, queries) {
    let backup = [];
    let num = 0;
    for (let i = 0; i < arr.length; i++) {
        num =  num ^ arr[i];
        backup.push(num);
    }
    let ans = []
    for (let i = 0; i < queries.length; i++) {
        let que = queries[i];
        let start = que[0] == 0 ?  0 : backup[que[0] -1]
        let end = backup[que[1]];
        ans.push(start^end)
    }
    return ans;
};

// 5238. 找出给定方程的正整数解 双指针
/**
 * @param {CustomFunction} customfunction
 * @param {integer} z
 * @return {integer[][]}
 */
var findSolution = function(customfunction, z) {
    let result = [],x = 1,y =1000
    while(x<=1000 && 1<= y) {
        if(customfunction.f(x,y) == z) {
            result.push([x,y])
            x++;
        } else if(customfunction.f(x,y) > z) {
            y--;
        } else {
            x++;
        }
    }
    return result;
};

// 1311.获取你好友已观看的视频 先深度遍历找好友，再找视频排序输出
/**
 * @param {string[][]} watchedVideos
 * @param {number[][]} friends
 * @param {number} id
 * @param {number} level
 * @return {string[]}
 */
var watchedVideosByFriends = function(watchedVideos, friends, id, level) {
    let backup = new Array(friends.length).fill(0)
    backup[id] = -1;
    for (let i = 0; i < watchedVideos.length; i++) {
        let watchedVideo = watchedVideos[i] 
        for(let video of watchedVideo) {
            if (video == 'aahqw') {
                console.log(i)
            }
        }
        
    }
    dfs(id,0)
    function dfs(num,nlevel) {
        if (nlevel >= level) {
            return 
        }
        let friend = friends[num]
        for (let index of friend) {
            if (backup[index] == 0) {
                backup[index] = nlevel +1;
            }
        }
        for (let index of friend) {
            if (backup[index] == nlevel +1) {
                dfs(index,nlevel +1)
            }
        }
    }
    let bMap = new Map()
    let ans = []
    for (let index = 0; index < backup.length; index++) {
        if (backup[index] == level) {
            let watchedVideo = watchedVideos[index];
            for(let video of watchedVideo) {
                let value = bMap.get(video)
                if (value) {
                    value++
                } else {
                    value = 1
                    ans.push(video)
                }
                bMap.set(video,value)
            }
        }
        
    }
    ans.sort((a,b)=>{
        let numa = bMap.get(a)
        let numb = bMap.get(b)
        if (numa == numb) {
            return a.localeCompare(b)
        } else {
            return numa - numb
        }
    })
    return ans;
};

// 1317. 将整数转换为两个无零整数的和  退位逻辑题 
/**
 * @param {number} n
 * @return {number[]}
 */
var getNoZeroIntegers = function(n) {
    let a = 0, b = n,p = 1
    while(b > 0) {
        if (b%10 == 0) {
            a += p
            b -= 10
        } else if(b%10 == 1) {
            if (Math.floor(b/10)) {
                a += p*2
                b -=10
            } else {
                a += p
            }
        } else {
            a +=p
        }
        b = Math.floor(b/10)
        p = p*10
    }
    return [a, n-a]
};

// 1318. 或运算的最小翻转次数  每位位运算
/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var minFlips = function(a, b, c) {
    let ans = 0
    while (c != 0 || a != 0 || b != 0) {
        let va = a & 1,vb = b & 1,vc = c & 1
        a >>=1
        b >>=1
        c >>=1
        if ((va| vb) == vc) {
            continue
        }
        if (vc == 1) {
            ans +=1;
        } else {
            ans += va
            ans += vb
        }
    }
    return ans;
};

//  1319. 连通网络的操作次数 Union-Find 算法
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function(n, connections) {
    if (n > connections.length + 1) {
        return -1
    }
    class UF {
        constructor(num) {
            this.count = num;
            this.size = Array(num)
            this.parent = Array(num)
            for (let i = 0; i < num; i++) {
                this.parent[i] = i;
                this.size[i] = 1;
            }
        }
        union(p,q) {
            let rootP = this.find(p)
            let rootQ = this.find(q)
            if(rootP == rootQ) {
                return
            }
            if (this.size[rootP] > this.size[rootQ]) {
                this.parent[rootQ] = rootP;
                this.size[rootP] += this.size[rootQ];
            } else {
                this.parent[rootP] = rootQ;
                this.size[rootQ] += this.size[rootP];
            }
            this.count--
        }
        connected(p,q) {
            let rootP = this.find(p)
            let rootQ = this.find(q)
            return rootP == rootQ
        }
        find(x) {
            while(this.parent[x] != x) {
                // 进行路径压缩
                this.parent[x] = this.parent[this.parent[x]];
                x = this.parent[x];
            }
            return x;
        }
    }
    let uf = new UF(n)
    for (let index = 0; index < connections.length; index++) {
        connection = connections[index];
        uf.union(connection[0],connection[1])
        if (uf.count == 1) {
            return 0
        }
    }
    return uf.count -1
    
};

// 1323. 6 和 9 组成的最大数字  基本逻辑
/**
 * @param {number} num
 * @return {number}
 */
var maximum69Number  = function(num) {
    return parseInt(String(num).replace('6','9'))
};

// 1324. 竖直打印单词 基本逻辑
/**
 * @param {string} s
 * @return {string[]}
 */
var printVertically = function(s) {
    let listArray = s.split(' ')
    let max = 0,ans = []
    for (let str of listArray) {
        max = Math.max(max,str.length)
    }
    for (let i = 0; i < max; i++) {
        let item = '', sItem = ''
        for (let str of listArray) {
            let char =  str[i] || ' '
            sItem += char
            if(char !=  ' ') {
                item += sItem
                sItem = ''
            }   
        }
        ans.push(item)
    }
    return ans
};

// 1325.删除给定值的叶子节点  递归
/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {TreeNode}
 */
var removeLeafNodes = function(root, target) {
    if(!root) {return null}
    root.left = removeLeafNodes(root.left,target)
    root.right = removeLeafNodes(root.right,target)
    if(root.left == null && root.right == null && root.val == target) {
        return null
    }
    return root
};
//  1326. 灌溉花园的最少水龙头数目 贪心算法，找出每个点能到的最远点 
/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
var minTaps = function(n, ranges) {
    let backup = new Array(n).fill(0);
    for (let i = 0; i < ranges.length; i++) {
        let l = Math.max(i-ranges[i],0)
        let r = Math.min(i+ranges[i],n)
        for (let j = l; j< r;j++) {
            backup[j] = Math.max(backup[j],r);
        }
    }
    let ans = 0,i = 0
    while(i < n) {
        if(backup[i] == 0) {
            return -1
        }
        i = backup[i]
        ans++
    }
    return ans
};

// LCP 1.猜数字 基础逻辑题
/**
 * @param {number[]} guess
 * @param {number[]} answer
 * @return {number}
 */
var game = function(guess, answer) {
    let count = 0
    for (let index = 0; index < guess.length; index++) {
        if(guess[index] == answer[index]) {
            count++
        }
    }
    return count
};

//LCP 2. 分式化简 找规律
var fraction = function(cont) {
    let up = cont.pop(),down = 1
    while(cont.length > 0 ) {
        let num = cont.pop()
        let newD = num*up + down
        down = up
        up = newD
    }
    return [up,down];
};