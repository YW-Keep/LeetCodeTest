/*
 
 给定一个大小为 n 的数组，找到其中的众数。众数是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
 
 你可以假设数组是非空的，并且数组中的众数永远存在。
 */
// 因为超过半数 所以排序后中位数 肯定是它  只要排序就好了
import Foundation

class Solution {
    func majorityElement(_ nums: [Int]) -> Int {
        var newNums = nums
        newNums.sort()
        return newNums[nums.count / 2]
    }
}
