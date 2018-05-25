/*
 给定一个非负整数 num。 对于范围 0 ≤ i ≤ num 中的每个数字 i ，计算其二进制数中的1的数目并将它们作为数组返回。
 
 示例：
 比如给定 num = 5 ，应该返回 [0,1,1,2,1,2].
 
 进阶：
 
 给出时间复杂度为O(n * sizeof(integer)) 的解答非常容易。 但是你可以在线性时间O(n)内用一次遍历做到吗？
 要求算法的空间复杂度为O(n)。
 你能进一步完善解法吗？ 在c ++或任何其他语言中不使用任何内置函数（如c++里的 __builtin_popcount）来执行此操作。
 */

import Foundation

//分析：首先是一个数减1，对应二进制的变化就是最右的一个1变为0，而这个1右边的所有0变为1，即相当于包括最后一个1在内的右边所有位取反，例如12（1100）减1，得到11（1011），然后再与变化前的数12（1100）进行与&运算，得到8（1000），可以看出经过这样一个运算之后这个数的1的个数减少了一个，所以可以利用这个原理，得到res[i]=res[i&(i-1)]+1  想到的人 真厉害
class Solution {
    func countBits(_ num: Int) -> [Int] {
        guard num > 0 else {
            return [0]
        }
        var res = Array.init(repeating: 0, count: num + 1)
        for index in 1...num {
            res[index] = res[index&(index - 1)] + 1
        }
        return res
    }
}
