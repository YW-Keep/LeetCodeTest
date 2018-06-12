/*
 给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。
 
 示例 1 :
 
 输入:nums = [1,1,1], k = 2
 输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。
 说明 :
 
 数组的长度为 [1, 20,000]。
 数组中元素的范围是 [-1000, 1000] ，且整数 k 的范围是 [-1e7, 1e7]。
 */

import Foundation
// 复杂度为n*n 但是竟然能过
class Solution {
    func subarraySum(_ nums: [Int], _ k: Int) -> Int {
        
        guard nums.count > 0 else {
            return 0
        }
        
        let count = nums.count
        var reslut = 0
        
        for i in 0...(count - 1) {
            var sum = 0
            for j in i...(count - 1) {
                sum = sum + nums[j]
                if sum == k {
                    reslut += 1
                }
            }
        }
        return reslut
    }
}

// 这是一种从网上看来比较精妙的算法 时间复杂度空间复杂度均为n.
class Solution2 {
    func subarraySum(_ nums: [Int], _ k: Int) -> Int {
        var reslut = 0
        var dic: [Int:Int] = [0:1]
        var sum = 0
        for num in nums {
            sum += num
            if let count = dic[sum - k] {
                reslut += count
            }
            if let count = dic[sum] {
                dic[sum] = count + 1
            } else {
                dic[sum] = 1
            }
        }
        return reslut
    }
}
