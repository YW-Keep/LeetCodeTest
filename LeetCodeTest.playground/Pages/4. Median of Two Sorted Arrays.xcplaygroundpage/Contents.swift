/*
 There are two sorted arrays nums1 and nums2 of size m and n respectively.
 
 Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
 
 Example 1:
 nums1 = [1, 3]
 nums2 = [2]
 
 The median is 2.0
 Example 2:
 nums1 = [1, 2]
 nums2 = [3, 4]
 
 The median is (2 + 3)/2 = 2.5
 ps:两个数组都是排序好的(审题要清楚！)
 */

import Foundation

// 思路 二分 夹住逼
class Solution {
    func findMedianSortedArrays(_ nums1: [Int], _ nums2: [Int]) -> Double {
        let medianNum = (nums1.count + nums2.count) / 2
        if (nums1.count + nums2.count) % 2 > 0 {
            return Double(findValueInSortedArrays(medianNum,nums1,nums2))
            
        } else {
            let lowerMedian = Double(findValueInSortedArrays(medianNum -  1,nums1,nums2))
            let higherMedian = Double(findValueInSortedArrays(medianNum,nums1,nums2))
             return (lowerMedian + higherMedian) / 2.0
        }
    }
    // 获取 K 位置的值
    func findValueInSortedArrays(_ k: Int,_ nums1: [Int], _ nums2: [Int]) -> Int {
        
        guard nums1.count <= nums2.count else {
            return findValueInSortedArrays(k, nums2, nums1)
        }
        
        guard nums1.count > 0 else {
            return nums2[k]
        }
        
        guard k > 0 else {
            return min(nums1[0],nums2[0])
        }
        
        let index1 = min((k - 1)/2,nums1.count - 1)
        let index2 = min((k - 1)/2,nums2.count - 1)
        
        if nums1[index1] < nums2[index2] {
            let newKey = (k - index1  - 1) < 0 ? 0 : (k - index1  - 1)
            return findValueInSortedArrays(newKey,Array(nums1[(index1 + 1) ..< nums1.count]),nums2)
        } else {
            let newKey = (k - index2  - 1) < 0 ? 0 : (k - index2  - 1)
            return findValueInSortedArrays(newKey,Array(nums2[(index2 + 1) ..< nums2.count]),nums1)
        }
    }
}
let solution = Solution()
solution.findValueInSortedArrays(7,[1,2,3,6,8],[1,2,3])

