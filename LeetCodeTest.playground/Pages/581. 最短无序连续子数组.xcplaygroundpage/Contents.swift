/*
 给定一个整数数组，你需要寻找一个连续的子数组，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。
 
 你找到的子数组应是最短的，请输出它的长度。
 
 示例 1:
 
 输入: [2, 6, 4, 8, 10, 9, 15]
 输出: 5
 解释: 你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。
 说明 :
 
 输入的数组长度范围在 [1, 10,000]。
 输入的数组可能包含重复元素 ，所以升序的意思是<=。
*/
import Foundation

var str = "Hello, playground"

// 考虑到升序排列就一种情况，所以说其实就是排序问题了（偷懒用的系统的排序方法 哈哈）
class Solution {
    func findUnsortedSubarray(_ nums: [Int]) -> Int {
        var newNums = nums
        newNums.sort(){$0 < $1}
        var index = 0
        var reslut = nums.count
        while index < nums.count && newNums[index] == nums[index]  {
            index += 1
            reslut -= 1
        }
        if index == nums.count {
            return 0
        }
        index = nums.count - 1
        while newNums[index] == nums[index] {
            index -= 1
            reslut -= 1
        }
        return reslut
    }
}
