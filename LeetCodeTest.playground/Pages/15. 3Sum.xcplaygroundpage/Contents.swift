/*
 Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
 
 Note: The solution set must not contain duplicate triplets.
 
 For example, given array S = [-1, 0, 1, 2, -1, -4],
 
 A solution set is:
 [
 [-1, 0, 1],
 [-1, -1, 2]
 ]
 // 思想排序，先定一个数 在进行校验计算复杂度o(n2)
 */

import Foundation

class Solution {
    func threeSum(_ nums: [Int]) -> [[Int]] {
        let numArray = nums.sorted()
        var result:[[Int]] = []
        for (index, num) in numArray.enumerated() {
            guard index < (numArray.count - 2) else {
                break
            }
            guard !(index > 0 && numArray[index - 1] == num) else {
                continue
            }
         
            var start = index + 1
            var end = numArray.count - 1
            
            while start < end {
                let sum = numArray[start] + numArray[end] + num
                if (sum == 0) {
                    result.append([numArray[start],numArray[end],num])
                    //去重
                    while start < end && numArray[start + 1] == numArray[start] {
                        start = start + 1
                    }
                    while start < end && numArray[end - 1] == numArray[end] {
                        end = end - 1
                    }
                    start = start + 1
                    end = end - 1
                } else if (sum < 0) {
                    start = start + 1
                } else {
                    end = end - 1
                }
            }
        }
        return result
    }
}
