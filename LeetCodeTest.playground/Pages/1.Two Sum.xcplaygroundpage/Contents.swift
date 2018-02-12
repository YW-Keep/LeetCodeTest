/*
 Given an array of integers, return indices of the two numbers such that they add up to a specific target.
 
 You may assume that each input would have exactly one solution, and you may not use the same element twice.
 
 Example:
 Given nums = [2, 7, 11, 15], target = 9,
 
 Because nums[0] + nums[1] = 2 + 7 = 9,
 return [0, 1].
 */
import UIKit

// 思路 竟然要获得位置  那么以位置为值 计算数为键 做计算
class Solution {
    func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
        var cacheDic = [Int:Int]()
        for (index, num) in nums.enumerated() {
            guard let pairedIndex = cacheDic[target - num] else {
                cacheDic[num] = index
                continue
            }
            return [pairedIndex,index]
        }
        return [-1,-1]
    }
}

let solution = Solution()
solution.twoSum([6,2,5,1], 8)
