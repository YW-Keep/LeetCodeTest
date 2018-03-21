/*
 A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
 
 The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
 
 How many possible unique paths are there?
 */

import Foundation

class Solution {
    func uniquePaths(_ m: Int, _ n: Int) -> Int {
        var all = m + n - 2
        let down = m - 1
        let right  = n - 1
        guard down > 0 && right > 0 else {
            return 1
        }
        let count = min(down, right)
        var reslut = 1
        for num in 1...count {
            reslut = reslut * all
            all -= 1
            reslut = reslut / num
        }
        return reslut
    }
}
