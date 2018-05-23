/*
 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
 
 示例 1:
 
 输入: coins = [1, 2, 5], amount = 11
 输出: 3
 解释: 11 = 5 + 5 + 1
 示例 2:
 
 输入: coins = [2], amount = 3
 输出: -1
 说明:
 你可以认为每种硬币的数量是无限的。
 */

import Foundation

class Solution {
    func coinChange(_ coins: [Int], _ amount: Int) -> Int {
        guard amount > 0  else {
            return 0
        }
        var record: [Int] = Array.init(repeating: Int.max, count: amount + 1)
        record[0] = 0
        for i in 1...amount {
            var minNum = record[i]
            for coin in coins {
                guard i >= coin && record[i - coin] != Int.max else {
                    continue
                }
                minNum = min(minNum, record[i - coin] + 1)
            }
            record[i] = minNum
        }
        return record[amount] == Int.max ? -1 : record[amount]
    }
}
