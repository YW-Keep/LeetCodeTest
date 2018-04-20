/*
 给定一个未排序的整数数组，找出最长连续序列的长度。
 
 例如，
 给出 [100, 4, 200, 1, 3, 2]，
 最长连续序列是 [1, 2, 3, 4]。返回其长度 4。
 
 要求算法的时间复杂度为 O(n)。
 */
import Foundation

class Solution {
    func longestConsecutive(_ nums: [Int]) -> Int {
        var myDic: [Int: Int] = [:]
        for num in nums {
            myDic[num] = num
        }
        var result = 0
        for num in nums {
            guard myDic[num] != nil else {
                continue
            }
            myDic.removeValue(forKey: num)
            var len = 1
            var left = num - 1
            while myDic[left] != nil {
                myDic.removeValue(forKey: left)
                len += 1
                left -= 1
            }
            var right = num + 1
            while myDic[right] != nil {
                myDic.removeValue(forKey: right)
                len += 1
                right += 1
            }
            result = max(result, len)
        }
        return result
    }
}
