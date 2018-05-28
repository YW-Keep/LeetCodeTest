/*
 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。
 
 例如，
 
 给定数组 [1,1,1,2,2,3] , 和 k = 2，返回 [1,2]。
 
 注意：
 
 你可以假设给定的 k 总是合理的，1 ≤ k ≤ 数组中不相同的元素的个数。
 你的算法的时间复杂度必须优于 O(n log n) , n 是数组的大小。

 */

import Foundation

// 其实先隐射一个字典，在用一个数组存所有的key,key的排序方式是出现的次数，用二分法排序。(这里偷懒了用系统的方法排序了哈哈)
class Solution {
    func topKFrequent(_ nums: [Int], _ k: Int) -> [Int] {
        guard k > 0 && nums.count > 0 else {
            return []
        }
        var keyDic: [Int:Int] = [:]
        var keyArray: [Int] = []
        for num in nums {
            if let number = keyDic[num] {
                keyDic[num] = number + 1
            } else {
                keyDic[num] = 1
                keyArray.append(num)
            }
        }
        keyArray.sort { (fist, second) -> Bool in
            return keyDic[fist]! > keyDic[second]!
        }
        return Array(keyArray[0...(k - 1)])
    }
}
