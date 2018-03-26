/*
 Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.
 
 Note: You can only move either down or right at any point in time.
 
 Example 1:
 [[1,3,1],
 [1,5,1],
 [4,2,1]]
 Given the above grid map, return 7. Because the path 1→3→1→1→1 minimizes the sum.
 */

import Foundation
class Solution {
    func minPathSum(_ grid: [[Int]]) -> Int {
        var last: [Int] = []
        for (line, sunArray) in grid.enumerated() {
            for(list, value) in sunArray.enumerated() {
                guard line > 0 else {
                    if list == 0 {
                        last.append(value)
                    } else {
                        last.append(value + last[list - 1])
                    }
                    continue
                }
                guard list > 0 else {
                    last[0] = last[0] + value
                    continue
                }
                last[list] = min(last[list], last[list - 1]) + value
            }
        }
        var minValue: Int = 0
        for (index, value) in last.enumerated() {
            guard index > 0 else {
                minValue = value
                continue
            }
            minValue = min(value, last[index - 1] + grid.last![index])
        }
        
        return minValue
    }
}
