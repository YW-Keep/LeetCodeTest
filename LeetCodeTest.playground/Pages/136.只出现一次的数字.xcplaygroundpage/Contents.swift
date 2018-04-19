/*
 
 给定一个整数数组，除了某个元素外其余元素均出现两次。请找出这个只出现一次的元素。
 
 
 
 备注：
 
 你的算法应该是一个线性时间复杂度。 你可以不用额外空间来实现它吗？
 */

// 实现 异或操作符 两个一样的数两次后为0
import Foundation

class Solution {
    func singleNumber(_ nums: [Int]) -> Int {
        var reslut = 0
        for num in nums {
            reslut ^= num
        }
        return reslut
    }
}
