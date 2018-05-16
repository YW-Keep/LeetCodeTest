/*
 给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。
 
 示例 1:
 
 输入: n = 12
 输出: 3
 解释: 12 = 4 + 4 + 4.
 示例 2:
 
 输入: n = 13
 输出: 2
 解释: 13 = 4 + 9.
 */

import Foundation
// 动态规划  backupArray[i] =  min(backupArray[i], backupArray[i - j*j] + 1)
class Solution {
    func numSquares(_ n: Int) -> Int {
        
        guard n > 1 else {
            return 1;
        }
        
        var backupArray: [Int] = [];
        for index in 0...n {
            backupArray.append(index);
        }
        for i in 2...n {
            for j in 1...i {
                guard j * j <= i else {
                    break
                }
                backupArray[i] =  min(backupArray[i], backupArray[i - j*j] + 1)
            }
        }
        
        return backupArray[n]
    }
}
