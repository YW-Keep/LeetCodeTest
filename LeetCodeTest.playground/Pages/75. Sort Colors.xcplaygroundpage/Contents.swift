/*
 
 Given an array with n objects colored red, white or blue, sort them so that objects of the same color are adjacent, with the colors in the order red, white and blue.
 
 Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.
 
 Note:
 You are not suppose to use the library's sort function for this problem.
 
 click to show follow up.
 

 */
import Foundation

class Solution {
    func sortColors(_ nums: inout [Int]) {
        var min = 0, indx = 0,  max = nums.count - 1
        while indx <= max  {
            if nums[indx] == 0 {
                nums.swapAt(min, indx)
                min += 1
                indx += 1
            } else if nums[indx] == 2 {
                nums.swapAt(max, indx)
                max -= 1
            } else {
                indx += 1
            }
        }
    }
}
