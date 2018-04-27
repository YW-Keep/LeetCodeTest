/*
 你是一个专业的强盗，计划抢劫沿街的房屋。每间房都藏有一定的现金，阻止你抢劫他们的唯一的制约因素就是相邻的房屋有保安系统连接，如果两间相邻的房屋在同一晚上被闯入，它会自动联系警方。
 
 给定一个代表每个房屋的金额的非负整数列表，确定你可以在没有提醒警方的情况下抢劫的最高金额。

 */

import Foundation

class Solution {
    func rob(_ nums: [Int]) -> Int {
        guard nums.count > 0 else {
            return 0
        }
        guard nums.count > 1 else {
            return nums[0]
        }
        
        guard nums.count > 2 else {
            return max(nums[0], nums[1])
        }
        var beforeMax = nums[0]
        var nowMax = max( nums[1],  nums[0])
        for indx  in 2...(nums.count - 1) {
            let num = nums[indx];
            let maxNum = max(beforeMax + num, nowMax)
            beforeMax = nowMax
            nowMax = maxNum
        }
        
        return nowMax
    }
}
