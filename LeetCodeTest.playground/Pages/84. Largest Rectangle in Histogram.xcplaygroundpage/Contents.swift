/*
 Given n non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.
 
 
 Above is a histogram where width of each bar is 1, given height = [2,1,5,6,2,3].
 
 
 The largest rectangle is shown in the shaded area, which has area = 10 unit.
 
 For example,
 Given heights = [2,1,5,6,2,3],
 return 10.
 */

import Foundation

class Solution {
    func largestRectangleArea(_ heights: [Int]) -> Int {
        var stack: [Int] = []
        var max_area = 0
        var i = 0
        while i < heights.count {
            if(stack.isEmpty || heights[stack.last!] <= heights[i]) {
                stack.append(i)
                i += 1
            } else {
                let tp = stack.last!
                stack.removeLast()
                let topArea = heights[tp] * (stack.count == 0 ? i : i -  stack.last! - 1)
                max_area = max(max_area, topArea)
            }
        }
       
        while stack.count > 0 {
            let tp = stack.last!
            stack.removeLast()
            let topArea = heights[tp] * (stack.count == 0 ? i : i -  stack.last! - 1)
            max_area = max(max_area, topArea)
        }
        return max_area
    }
}
