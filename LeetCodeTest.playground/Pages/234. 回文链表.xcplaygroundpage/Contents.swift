/*
 请判断一个链表是否为回文链表。
 
 示例 1:
 
 输入: 1->2
 输出: false
 示例 2:
 
 输入: 1->2->2->1
 输出: true
 进阶：
 你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
 */

// 回文就要想到获取一半，如何获取一般，第一个最先想到的是数组，堆栈，但是需要空间复杂度为0 所以需要考虑到快慢指针  获取一般后需要逆转链表
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
    func isPalindrome(_ head: ListNode?) -> Bool {
        guard head != nil else {
            return true
        }
        var slow = head
        var fast = head
        while fast != nil && fast?.next != nil {
            slow = slow?.next
            fast = fast?.next?.next
        }
        if (fast != nil) {
            slow = slow?.next
        }
        slow = reverseList(slow)
        var varHead = head
        
        while (slow != nil) {
            if slow?.val != varHead?.val {
                return false
            }
            slow = slow?.next
            varHead = varHead?.next
        }
        return true
    }
    
    // 前面做过链表反转方法
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
