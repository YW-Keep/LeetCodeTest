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
    var maxLenght  =  num1.length + num2.length; 
    var result = "";
    var carray = 0;
    for (let i = 0; i < maxLenght - 1; i++) {
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
    var maxLenght = Math.max(a.length,b.length);
    var result = "";
    var back = 0;
    for (let index = 0; index < maxLenght; index++) {
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

addBinary("1010","1011");

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

// 136. 只出现一次的数字 想到运算符 就很简单 与运算 2个一样的数就被抵消了 留下来的就是只出现一次的
var singleNumber = function(nums) {
    var result = 0;
    for (var num of nums) {
        result ^= num;
    }
    return result;
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
    if (this.listArray.lenght == 0) {
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
    if (this.listArray.lenght == 0) {
        return nil;
    }
    return this.listArray[this.listArray.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    if (this.listArray.lenght == 0) {
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


// 292.Nim游戏 其实4是一个基数 一定能达到的数（即最大值加最小值）
/**
 * @param {number} n
 * @return {boolean}
 */
var canWinNim = function(n) {
    return n%4 > 0 ;
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
dominantIndex([0,0,0,1])

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

// 914. 卡牌分组 找数字因子
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