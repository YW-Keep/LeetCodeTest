/*
 Given n, how many structurally unique BST's (binary search trees) that store values 1...n?
 
 For example,
 Given n = 3, there are a total of 5 unique BST's.
 */

import Foundation

class Solution {
    func numTrees(_ n: Int) -> Int {
        guard n > 1 else {
            return 1
        }
        var index: [Int] = [Int](repeating: 0, count: n + 1)
        index[0] = 1
        index[1] = 1
        for i in 2...n {
            for j in 0...(i - 1) {
                index[i] += index[j] * index[i - j - 1]
            }
        }
        return index[n]
    }
}
