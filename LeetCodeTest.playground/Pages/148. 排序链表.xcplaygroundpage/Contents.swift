/*
 
 在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。
 
 示例 1:
 
 输入: 4->2->1->3
 输出: 1->2->3->4
 示例 2:
 
 输入: -1->5->3->4->0
 输出: -1->0->3->4->5
 */
// 因为空间复杂度是常数，而时间复杂度是 O(n log n) 所以第一个想法就是分治归并的思想，果然可以
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
    func sortList(_ head: ListNode?) -> ListNode? {
        
        guard head != nil && head?.next != nil else {
            return head
        }
        var slow = head
        var fast = head?.next?.next
        while fast != nil {
            slow = slow?.next
            fast = fast?.next?.next
        }
        let tail = slow?.next
        slow?.next = nil
        let headNew = sortList(head)
        let tailNew = sortList(tail)
        
        return merge(headNew, tailNew)
    }
    func merge(_ l1:ListNode?, _ l2:ListNode?) -> ListNode? {
        
        guard l1 != nil else {
            return l2
        }
        
        guard l2 != nil else {
            return l1
        }
        
        var inl1 = l1
        var inl2 = l2
        let topTag = ListNode(0)
        var nowTag = topTag
        while inl1 != nil && inl2 != nil {
            let isl1Min  = inl1!.val < inl2!.val
            let min = isl1Min ? inl1!.val : inl2!.val
            nowTag.next = ListNode(min)
            nowTag = nowTag.next!
            if isl1Min {
                inl1 = inl1?.next
            } else {
                inl2 = inl2?.next
            }
        }
        
        if inl1 != nil {
            nowTag.next = inl1
        }
        
        if inl2 != nil {
            nowTag.next = inl2
        }
        
        return topTag.next
    }
}
