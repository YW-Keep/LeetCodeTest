/*
 
 假设有打乱顺序的一群人站成一个队列。 每个人由一个整数对(h, k)表示，其中h是这个人的身高，k是排在这个人前面且身高大于或等于h的人数。 编写一个算法来重建这个队列。
 
 注意：
 总人数少于1100人。
 
 示例
 
 输入:
 [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]
 
 输出:
 [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]

 */

import Foundation

// 思路： 首先想到的肯定是排序 k 是在这个人前面升高大于或等于这个人的个数 而h是身高。 那么如果后面的数都小于前面的数，按理论上操纵后面的数对前面的数的K 不会有影响。 所以按照这个思路，我们就可以先对其进行排序了
// 另外出题的人 其实对swift 不了解 因为我们知道swift有一种数据结构元祖，这里用元祖可能会好一些
class Solution {
    func reconstructQueue(_ people: [[Int]]) -> [[Int]] {
        
        var newPeople = people
        // 利用系统方法排序
        newPeople.sort { (first, second) -> Bool in
            if first[0] == second[0] {
                return first[1] < second[1]
            } else {
                return first[0] > second[0]
            }
        }
        var reslut: [[Int]] = []
        for person in newPeople {
            if person[1] >= reslut.count {
                reslut.append(person)
            } else {
                reslut.insert(person, at: person[1])
            }
        }
        return reslut
    }
}
