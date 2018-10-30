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
    var reslut = 0;
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
            reslut  = reslut*10 + parseInt(char);
        } else {
            break;
        }
    }
    reslut = reslut*symbol;
    if(reslut > Math.pow(2,31) -1) {
        reslut = Math.pow(2,31) -1;
    }
    if(reslut < Math.pow(2,31)*-1) {
        reslut = Math.pow(2,31)*-1;
    }
    return reslut;
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
    var reslut = nums[0] + nums[1] + nums[2];
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
           reslut = Math.abs(reslut - target) < Math.abs(newTap - tap) ? reslut : newTap +newNums[index];
        }
    }
    return reslut;
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

//  43.字符串相乘
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    var length = num1.length + num2.length;
    var  reslut = "";
    for (let index = 0; index < length; index++) {
        reslut = reslut + "0";
    }

    for (let i = num1.length - 1; i > -1; i--) {
        var carry = 0;
        for (let j = num2.length - 1; j > -1; j--) {
            var sum = parseInt(reslut[i + j + 1]) + parseInt(num1[i])*parseInt(num2[j]) + carry;
            reslut = replacePos(reslut, i+j+2, String(sum%10));
            carry = parseInt(sum/10);
        }
        var carrySum = parseInt(reslut[i]) + carry;
        reslut = replacePos(reslut, i +1, String(carrySum));
    }
    while(reslut.length > 0 && reslut[0] == "0") {
        reslut = reslut.slice(1);
    }
    if(reslut.length == 0) {
        reslut = "0";
    }

    return reslut;

    function replacePos(strObj, pos, replacetext) {
        var str = strObj.substr(0, pos - 1) + replacetext + strObj.substring(pos, strObj.length);
        return str;
    }
};
// 这种方式应该稍微快一点
var multiply = function(num1, num2) {
    var maxLenght  =  num1.length + num2.length; 
    var reslut = "";
    var carray = 0;
    for (let i = 0; i < maxLenght - 1; i++) {
        let min = Math.max(i - num2.length + 1,0);
        var max  = Math.min(i,num1.length - 1);
        var sum = 0;
        for (let j = min; j <= max ; j++) {
            sum += num1[num1.length - 1 - j]*num2[num2.length - 1 - (i - j)]; 
        }
        sum += carray;
        reslut = String(sum%10) + reslut;
        carray = parseInt(sum/10);
    }
    if(carray > 0) {
        reslut = String(carray) + reslut;
    }
    while(reslut.length > 0 && reslut[0] == "0") {
        reslut = reslut.slice(1);
    }
    if(reslut.length == 0) {
        reslut = "0";
    }
    return reslut;
}


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

// 54.螺旋矩阵
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if(matrix.length == 0 || matrix[0].length == 0) {
        return [];
    }
    var reslut = Array();
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
                reslut.push(matrix[i][j])
                j++;
            }
            j--;
            yMin++;
            i++;
        }
        if (nowD == 1) {
            while(i < yMax) {
                reslut.push(matrix[i][j])
                i++;
            }
            i--;
            xMax--;
            j--;
        }
        if (nowD == 2) {
            while(xMin < j) {
                reslut.push(matrix[i][j])
                j--;
            }
            j++;
            yMax--;
            i--;
        }
        if (nowD == 3) {
            while(yMin < i) {
                reslut.push(matrix[i][j])
                i--;
            }
            i++;
            xMin++;
            j++;
        }
        direction++;
    }
    return reslut;
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

// 59 螺旋矩形2
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    if(n < 1) {
        return [];
    }
    var reslut = Array();
    var inArray = Array();
    for (let index = 0; index < n; index++) {
        inArray.push(0);
    }
    for (let index = 0; index < n; index++) {
        reslut.push(inArray.concat());
    }
    var xMin = -1;
    var xMax = reslut[0].length;
    var yMin = -1;
    var yMax = reslut.length;
    var direction = 0;
    var i = 0,j = 0;
    var num = 1;
    while (xMin < xMax - 1 && yMin < yMax - 1) {
        var nowD = direction%4;
        if (nowD == 0) {
            while(j < xMax) {
                reslut[i][j] = num++;
                j++;
            }
            j--;
            yMin++;
            i++;
        }
        if (nowD == 1) {
            while(i < yMax) {
                reslut[i][j] = num++;
                i++;
            }
            i--;
            xMax--;
            j--;
        }
        if (nowD == 2) {
            while(xMin < j) {
                reslut[i][j] = num++;
                j--;
            }
            j++;
            yMax--;
            i--;
        }
        if (nowD == 3) {
            while(yMin < i) {
                reslut[i][j] = num++;
                i--;
            }
            i++;
            xMin++;
            j++;
        }
        direction++;
    }
    return reslut;
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
    var reslut = 1;
    for (let index = 1; index < min; index++) {
        reslut = all*reslut;
        all--;
        reslut = reslut/index
    }
    return reslut;
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
    var reslut = [0,1];
    var stap = 1;
    while(stap < n) {
        var num =  Math.pow(2,stap) - 1;
        while(num > -1) {
            reslut.push(reslut[num] + Math.pow(2,stap))
            num--;
        }
        stap++;
    }
    return reslut;
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
    var reslut  = Array();
    traverse(root);
    function traverse(root) {
        if(root) {
            traverse(root.left);
            reslut.push(root.val);
            traverse(root.right);
        }
    }
    return reslut;
};
// 94. 二叉树的中序遍历  迭代写法 其实递归就是一个堆栈
var inorderTraversal2 = function(root) {
    var reslut = Array()
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
           reslut.push(last.val);
           if(last.right) {
            stack.push(last.right);
           }
       }
    }
    return reslut;
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
    var reslut = Array()
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
           if( reslut.length > 0 && reslut[reslut.length -1] >= last.val) {
               return false;
           }
           reslut.push(last.val);
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
    var reslut = Array();
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
        reslut.push(rowArray);
    }
    return reslut;
};

//  104. 二叉树的最大深度
var maxDepth = function(root) {
    if (root == null) {
        return 0;
    }
    var stack = [root];
    var reslut = 1;
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
        reslut++;
    }
    return reslut;
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
    var reslut = 0;
    for (let index = 1; index < prices.length; index++) {
        reslut += Math.max(0,prices[index] - prices[index -1]);
    }
    return reslut;
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

// 152. 乘积最大子序列 负负得正 所以要记录最大正数 以及最小负数 （题目默认至少有一个数）
var maxProduct = function(nums) {
    var conMax = 1, conMin = 1, reslut = nums[0];
    for (var num of nums) {
       var inMax = Math.max(num, num*conMax, num*conMin);
       var inMin = Math.min(num, num*conMax, num*conMin);
       conMax = inMax;
       conMin = inMin;
        reslut = Math.max(conMax, reslut);
    }
    return reslut;
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
    var reslutArray = Array();
    var backupNum = 1;
    for (num of nums) {
        reslutArray.push(backupNum);
        backupNum *= num;
    }
    backupNum = nums[nums.length - 1];
    for (let index = nums.length - 2; index  > -1; index--) {
        reslutArray[index] *= backupNum;
        backupNum *= nums[index]; 
    }
    return reslutArray;
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

// 344.反转字符串 反向循环
/**
 * @param {string} s
 * @return {string}
 */
var reverseString = function(s) {
    var reslut = "";
    for (let index = 0; index < s.length; index++) {
       reslut += s[s.length - index - 1];
    }
    return reslut;
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

    var reslut = Array();
    for(var key of myMap) {
        reslut.push(key[0]);
    }
    var sortArray = reslut.sort(copare);
    function copare(x,y) {
        return myMap.get(y) - myMap.get(x);
    }
    return sortArray.slice(0,k);
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

    var relsut = "";
    for (let index = 0; index < heap.length; index++) {
        const element = heap[index];
        relsut += element;
    }
    return relsut;

    function isNum(x) {
        var numString = "0123456789";
        return numString.indexOf(x) != -1;
    }
};
// 406.根据身高重建队列  小数不会影响K
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function(people) {
    var sortArray = people.sort(compare);
    var reslut = Array();
    for (let index = 0; index < sortArray.length; index++) {
        const element = sortArray[index];
        if(element[1] >= reslut.count) {
            reslut.push(element);
        } else {
            reslut.splice(element[1],0,element);
        }
    }
    return reslut;
    function compare(x,y) {
        if (y[0] == x[0]) {
            return x[1] - y[1];
        } else {
            return y[0] - x[0];
        }
    }
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
    var relsutArray = Array();
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        if (element > 0) {
            relsutArray.push(index + 1);
        }
    }
    return relsutArray;
};

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
    var reslut = 0;
    for(num of nums) {
        sum += num;
        if(backMap.has(sum - k)) {
            reslut += backMap.get(sum - k);
        }
        backMap.set(sum,(backMap.get(sum) || 0)+ 1);
    }
    return reslut;
};

subarraySum([1,1,1],2);


// 557.反转字符串中的单词3  循环就好了
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    var reslut = "";
    var word = "";
    for (let index = 0; index < s.length; index++) {
        let char = s[index];
        if(char  == " ") {
            reslut  += word + " "; 
            word = "";
        }  else {
            word =  char + word;
        }
    }
    if(word.length > 0) {
        reslut = reslut + word;
    }
    return reslut;
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

