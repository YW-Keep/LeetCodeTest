/*
 Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.
 3个思想
 1.存入数组中排序再创建新的数组
 2.每次判断然后归并最小的 不断循环
 3.分治归并思想 两两归并
 */
import Foundation

public class ListNode {
    public var val: Int
    public var next: ListNode?
    public init(_ val: Int) {
        self.val = val
        self.next = nil
    }
}
class Solution {
    // 超时了   找时间优化
    func mergeKLists(_ lists: [ListNode?]) -> ListNode? {
        var varlist = lists.filter { (node) -> Bool in
            return node != nil
        }
        let headNode = ListNode(0)
        var nextNode = headNode
        while varlist.count > 1 {
            var min: ListNode? = nil
            var num = 0
            for (index, value) in varlist.enumerated() {
                
                if min == nil {
                    min = value
                }
                if min!.val > value!.val {
                    min = value
                    num = index
                }
            }
            nextNode.next = ListNode(min!.val)
            nextNode = nextNode.next!
            min = min?.next
            if min != nil {
                varlist[num] = min
            } else {
                varlist.remove(at: num)
            }
        }
        if varlist.count == 1 {
            nextNode.next = varlist[0]
        }
        return headNode.next
    }
    // 这个空间复杂度较高 竟然过了 哈哈哈
    func mergeKLists2(_ lists: [ListNode?]) -> ListNode? {
        var listArray: [ListNode] = []
        
        for value in lists {
            var inValue = value
            while inValue != nil {
                listArray.append(ListNode(inValue!.val))
                inValue = inValue!.next
            }
        }
        listArray.sort { (node1, node2) -> Bool in
            return node2.val > node1.val
        }
        let headNode = ListNode(0)
        var nextNode = headNode
        for value in listArray {
            nextNode.next = ListNode(value.val)
            nextNode = nextNode.next!
        }
        return headNode.next
    }
}
let solution = Solution()
solution.mergeKLists([ListNode(1)])
