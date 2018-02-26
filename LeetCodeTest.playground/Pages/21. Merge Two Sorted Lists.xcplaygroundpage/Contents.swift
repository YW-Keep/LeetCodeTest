/*
 Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.
 
 Example:
 
 Input: 1->2->4, 1->3->4
 Output: 1->1->2->3->4->4
 
 链表的合并，没什么难度时间复杂度为o(n)
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
    func mergeTwoLists(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {
        
        guard l1 != nil else {
            return l2
        }
        
        guard l2 != nil else {
            return l1
        }
        
        var inl1 = l1
        var inl2 = l2
        var topTag: ListNode?
        var nowTag: ListNode?
        while inl1 != nil && inl2 != nil {
            let isl1Min  = inl1!.val < inl2!.val
            let min = isl1Min ? inl1!.val : inl2!.val
            if topTag != nil {
                nowTag?.next = ListNode(min)
                nowTag = nowTag?.next
            } else {
                topTag = ListNode(min)
                nowTag = topTag
            }
            if isl1Min {
                inl1 = inl1?.next
            } else {
                inl2 = inl2?.next
            }
        }
        
        if inl1 != nil {
            nowTag?.next = inl1
        }
        
        if inl2 != nil {
            nowTag?.next = inl2
        }
        
        return topTag
    }
}

let not = ListNode(1)
not.next = ListNode(2)

let solution = Solution()
solution.mergeTwoLists(not, not)
