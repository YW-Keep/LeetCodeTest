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