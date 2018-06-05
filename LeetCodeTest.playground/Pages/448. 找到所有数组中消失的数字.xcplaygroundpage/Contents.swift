/*
 给定一个范围在  1 ≤ a[i] ≤ n ( n = 数组大小 ) 的 整型数组，数组中的元素一些出现了两次，另一些只出现一次。
 
 找到所有在 [1, n] 范围之间没有出现在数组中的数字。
 
 您能在不使用额外空间且时间复杂度为O(n)的情况下完成这个任务吗? 你可以假定返回的数组不算在额外空间内。
 
 示例:
 
 输入:
 [4,3,2,7,8,2,3,1]
 
 输出:
 [5,6]
 */
import Foundation

// 取负法 如果是负数表示已经访问过，最后把正值遍历出来输出 因为swift传入的数组不能直接修改，所以就有点尴尬。
class Solution {
    func findDisappearedNumbers(_ nums: [Int]) -> [Int] {
        guard nums.count > 0 else {
            return []
        }
        
        var varNums = nums
        for num in varNums {
            let index = abs(num) - 1
            if varNums[index] > 0 {
                varNums[index] = -varNums[index]
            }
        }
        
        var reslut: [Int] = []
        for index in 0...(nums.count - 1) {
            if varNums[index] > 0 {
                reslut.append(index + 1)
            }
        }
        return reslut
    }
}
