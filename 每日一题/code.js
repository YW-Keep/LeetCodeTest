// 167. 两数之和 II - 输入有序数组  双指针
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let start = 0, end = numbers.length-1
    while(start < end) {
        let sum = numbers[start] + numbers[end]
        if(sum > target) {
            end--
        } else if(sum < target) {
            start++
        } else {
            return [start +1, end+1]
        }
    }
    return[]

};

// 95. 不同的二叉搜索树 II 递归
/** 
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
    function buildTree(start, end) {
      let ans = [];
      if (start > end) return [null];
      for (let i = start; i <= end; i++) {
        let leftNodes = buildTree(start, i - 1);
        let rightNodes = buildTree(i + 1, end);
        for (const leftNode of leftNodes) {
          for (const rightNode of rightNodes) {
            let cur = new TreeNode(i);
            cur.left = leftNode;
            cur.right = rightNode;
            ans.push(cur);
          }
        }
      }
      return ans;
    }
    if (n === 0) return [];
    return buildTree(1, n);
  };

// 剑指 Offer 11. 旋转数组的最小数字 二分法
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