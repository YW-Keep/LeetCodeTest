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