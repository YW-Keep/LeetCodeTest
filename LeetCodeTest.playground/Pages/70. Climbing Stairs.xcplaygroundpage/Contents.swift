//: [Previous](@previous)

import Foundation

class Solution {
    func climbStairs(_ n: Int) -> Int {
        guard n > 1 else {
            return 1
        }
        guard n > 2 else {
            return 2
        }
        let num = n - 2
        var stap1 = 1
        var stap2 = 2
        var result = 0
        for _ in 1...num {
            result = stap1 + stap2
            stap1 = stap2
            stap2 = result
        }
        return result
    }
}
