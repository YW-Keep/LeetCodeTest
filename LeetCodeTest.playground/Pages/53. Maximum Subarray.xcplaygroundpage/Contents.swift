/*
 Find the contiguous subarray within an array (containing at least one number) which has the largest sum.
 
 For example, given the array [-2,1,-3,4,-1,2,1,-5,4],
 the contiguous subarray [4,-1,2,1] has the largest sum = 6.
 */
import Foundation

class Solution {
    func maxSubArray(_ nums: [Int]) -> Int {
        var max = nums[0]
        var sum = 0
        
        for num in nums {
            sum = sum + num
            if max < sum {
                max = sum
            }
            if sum < 0 {
                sum = 0
            }
        }
        return max
    }
}
