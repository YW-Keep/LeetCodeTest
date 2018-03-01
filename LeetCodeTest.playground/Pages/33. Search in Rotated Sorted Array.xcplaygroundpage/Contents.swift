/*
 Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.
 
 (i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).
 
 You are given a target value to search. If found in the array return its index, otherwise return -1.
 
 You may assume no duplicate exists in the array.
 */
import Foundation

var str = "Hello, playground"

//: [Next](@next)
class Solution {
    func search(_ nums: [Int], _ target: Int) -> Int {
        var min = 0, max = nums.count - 1, mid = 0
        while min <= max {
            mid = (min + max) / 2
            if nums[mid] == target {
                return mid
            }
            if nums[min] <= nums[mid] {
                if nums[min] <= target && target < nums[mid] {
                    max = mid - 1
                } else {
                    min = mid + 1
                }
            } else {
                if nums[mid] < target && target <= nums[max] {
                    min = mid + 1
                } else {
                    max = mid - 1
                }
            }
        }
        return -1
    }
}
