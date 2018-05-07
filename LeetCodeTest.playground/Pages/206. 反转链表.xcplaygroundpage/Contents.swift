/*
 反转一个单链表。
 
 示例:
 
 输入: 1->2->3->4->5->NULL
 输出: 5->4->3->2->1->NULL
 进阶:
 你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
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

// 非递归第一版
class Solution {
    func reverseList(_ head: ListNode?) -> ListNode? {
        guard head != nil else {
            return head
        }
        var newHead = ListNode(head!.val)
        var inHead = head?.next
        
        while inHead != nil {
            let myHead = ListNode(inHead!.val)
            myHead.next = newHead
            newHead = myHead
            inHead = inHead?.next
        }
        return newHead
    }
}

// 非递归第二版 考虑只是反转 不需要创建
class Solution2 {
    func reverseList(_ head: ListNode?) -> ListNode? {
        guard head != nil else {
            return head
        }
        var inHead = head?.next
        var newHead = head
        newHead?.next = nil
        
        while inHead != nil {
            let myHead = inHead
            inHead = inHead?.next
            myHead?.next = newHead
            newHead = myHead
        }
        return newHead
    }
}

// 递归版本
class Solution3 {
    func reverseList(_ head: ListNode?) -> ListNode? {
        guard head != nil && head?.next != nil else {
            return head
        }
        let newhead = reverseList(head?.next)
        head?.next?.next = head
        head?.next = nil
        return newhead
    }
    
}

