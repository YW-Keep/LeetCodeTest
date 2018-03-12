/*
 Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.
 
 For example,
 Given [0,1,0,2,1,0,1,3,2,1,2,1], return 6.
 
 
 The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped. Thanks Marcos for contributing this image!
 */

// 思路 两端开始遍历，每一格子计算
import Foundation

class Solution {
    func trap(_ height: [Int]) -> Int {
        var left = 0, right = height.count - 1 , max_left = 0, max_right = 0, ans = 0
        while left < right {
            if height[left] < height[right] {
                height[left] >= max_left ? (max_left = height[left]) : (ans = (max_left - height[left]) + ans)
                left += 1
            } else {
                height[right] >= max_right ? (max_right = height[right]) : (ans = (max_right - height[right]) + ans)
                right -= 1
            }
        }
        return ans
    }
}
