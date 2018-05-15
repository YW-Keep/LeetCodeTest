/*
 编写一个高效的算法来搜索 m x n 矩阵中的一个目标值 target。该矩阵具有以下特性：
 
 每行的元素从左到右升序排列。
 每列的元素从上到下升序排列。
 例如，
 
 给定以下矩阵 matrix ：
 
 [
 [1,   4,  7, 11, 15],
 [2,   5,  8, 12, 19],
 [3,   6,  9, 16, 22],
 [10, 13, 14, 17, 24]
 [18, 21, 23, 26, 30]
 ]
 示例 1:
 
 输入: matrix, target = 5
 输出: true
 示例 2:
 
 输入: matrix, target = 20
 输出: false
 */

import Foundation
// 因为按顺序排列 所以减少不必要的 判断 （其实二分法 应该更快）
class Solution {
    func searchMatrix(_ matrix: [[Int]], _ target: Int) -> Bool {
        guard matrix.count > 0 else {
            return false
        }
        
        guard matrix[0].count > 0 else {
            return false
        }
        
        let iMax = matrix.count - 1
        var jMax = matrix[0].count - 1
        for i in 0...iMax {
            for j in 0...jMax {
                if matrix[i][j] == target {
                    return true
                }
                if matrix[i][j] > target {
                    if j == 0 {
                        return false
                    }
                    jMax = j - 1
                }
            }
        }
        return false
    }
}
