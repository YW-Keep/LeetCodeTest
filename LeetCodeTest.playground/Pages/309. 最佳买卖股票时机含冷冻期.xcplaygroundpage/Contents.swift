/*
 
 给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。
 
 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
 
 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
 示例:
 
 输入: [1,2,3,0,2]
 输出: 3
 解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
 */

import Foundation
// 动态规划 ，规划的时候需要考虑三种状态 s0休息期（冷冻的） s1买入期 s2卖出期 那么可以得到下面的地推公式：1.s0[i] = max(s2[i - 1], s0[i - 1]) 2.s1 = max(s1[i - 1],s0[i - 1] - price,3.s2 = s1[i - 1] + price
class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        guard prices.count > 1 else {
            return 0
        }
        var s0: [Int] = [0], s1: [Int] = [-prices[0]], s2: [Int] = [0]
        for index in 1...(prices.count - 1) {
            let price = prices[index]
            s0.append(max(s0[index - 1], s2[index - 1]))
            s1.append(max(s1[index - 1], s0[index - 1] - price))
            s2.append(s1[index - 1] + price)
        }
        
        return max(s0[prices.count - 1], s2[prices.count - 1])
    }
}
