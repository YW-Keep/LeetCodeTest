/*
 Given an array of non-negative integers, you are initially positioned at the first index of the array.
 
 Each element in the array represents your maximum jump length at that position.
 
 Determine if you are able to reach the last index.
 
 For example:
 A = [2,3,1,1,4], return true.
 
 A = [3,2,1,0,4], return false.
 

 */
import Foundation

class Solution {
    func canJump(_ nums: [Int]) -> Bool {
        var right = 0
        for (index, num) in nums.enumerated() {
            right = max(right, index + num)
            if right >= (nums.count - 1) {
                return true
            }
            if right <= index {
                return false
            }
        }
        return true
    }
}
