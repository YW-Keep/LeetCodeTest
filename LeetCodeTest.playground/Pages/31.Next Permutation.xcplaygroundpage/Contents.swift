/*
 Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.
 
 If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).
 
 The replacement must be in-place, do not allocate extra memory.
 
 Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.
 1,2,3 → 1,3,2
 3,2,1 → 1,2,3
 1,1,5 → 1,5,1
 */

import Foundation

class Solution {
    func nextPermutation(_ nums: inout [Int]) {
        var i = nums.count - 2
        while i >= 0 && nums[i + 1] <= nums[i] {
            i = i - 1
        }
        if i >= 0 {
            var j = nums.count - 1;
            while(j >= 0 && nums[j] <= nums[i]) {
                j = j - 1
            }
            nums.swapAt(i, j)
        }
        revrse(&nums, start: i + 1)
    }
    func revrse(_ nums: inout [Int], start: Int) {
        var i = start , j = nums.count - 1
        while i < j {
            nums.swapAt(i, j)
            i += 1
            j -= 1
        }
    }
}

