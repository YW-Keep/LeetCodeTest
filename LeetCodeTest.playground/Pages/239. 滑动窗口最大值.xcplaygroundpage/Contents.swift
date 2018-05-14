/*
 
 给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口 k 内的数字。滑动窗口每次只向右移动一位。
 
 返回滑动窗口最大值。
 
 示例:
 
 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
 输出: [3,3,5,5,6,7]
 解释:
 
 滑动窗口的位置                最大值
 ---------------               -----
 [1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
 注意：
 
 你可以假设 k 总是有效的，1 ≤ k ≤ 输入数组的大小，且输入数组不为空。
 */
//  开始思考动态规划，发现有点繁琐，然后看到了双向队列，应该是最优解了吧，主要问题在于1.怎么去除移除框内的元素 2.怎么加入一个元素
import Foundation

class Solution {
    func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {
        guard nums.count > 1 else {
            return nums;
        }
        var deque: [Int] = []
        var result: [Int] = []
        for index in 0...(nums.count - 1) {
            if !deque.isEmpty && deque.first! == index - k{
                deque.removeFirst()
            }
            while !deque.isEmpty && nums[deque.last!] < nums[index] {
                deque.removeLast()
            }
            deque.append(index)
            if (index + 1) >= k {
                result.append(nums[deque.first!])
            }
        }
        return result
    }
}
