/*
 
 Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.
 
 Note: You may not slant the container and n is at least 2.
 
 水池蓄水，先用最大宽进行计算，然后移动较小的边（减小宽），时间复杂度为o(n)
 */

import Foundation

class Solution {
    func maxArea(_ height: [Int]) -> Int {
        var area = 0
        var left = 0
        var right = height.count - 1
        while left < right {
           area = max(min(height[left], height[right]) * (right - left), area)
            if height[left] < height[right] {
                left = left + 1
            } else {
                right = right - 1
            }
        }
        
        return area
    }
}
