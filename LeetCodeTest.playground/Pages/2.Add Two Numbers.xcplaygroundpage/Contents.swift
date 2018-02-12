/*
 You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
 
 You may assume the two numbers do not contain any leading zero, except the number 0 itself.
 
 Example
 
 Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
 Output: 7 -> 0 -> 8
 Explanation: 342 + 465 = 807.
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
    // 思路 考虑进位即可
    func addTwoNumbers(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {
        
        if l1 == nil {
            return l1
        }
        
        if l2 == nil {
            return l2
        }
        
        var l1Next = l1
        var l2Next = l2
        
        var head:ListNode? = nil
        var tail:ListNode? = nil
        
        var carry = 0
        while !(l1Next == nil && l2Next == nil) {
            let sum = (l1Next?.val ?? 0) + (l2Next?.val ?? 0) + carry
            carry = sum / 10
            let node = ListNode(sum % 10)
            
            if head == nil {
                head = node
            } else {
                tail!.next = node
            }
            tail = node
            
            l2Next = l2Next?.next
            l1Next = l1Next?.next
        }
        if carry != 0 {
            tail?.next = ListNode(carry)
        }
        
        return head
    }
}
