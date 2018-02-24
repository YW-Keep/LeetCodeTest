/*
 
 Given a linked list, remove the nth node from the end of list and return its head.
 
 For example,
 
 Given linked list: 1->2->3->4->5, and n = 2.
 
 After removing the second node from the end, the linked list becomes 1->2->3->5.
 Note:
 Given n will always be valid.
 Try to do this in one pass.
 2个思路
 1.放进数组中
 2.快慢指针
 这里就实现下快慢指针 时间复杂度o(n)
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
    func removeNthFromEnd(_ head: ListNode?, _ n: Int) -> ListNode? {
        var fast = head
        var slow = head
        var lenght = 0
        while fast != nil {
            if lenght > n {
                slow = slow?.next
            } else {
                lenght = lenght + 1
            }
            fast = fast?.next
        }
        if lenght < n {
            return head
        } else if lenght == n {
            return head?.next
        } else {
            slow?.next = slow?.next?.next
            return head
        }
    }
}
