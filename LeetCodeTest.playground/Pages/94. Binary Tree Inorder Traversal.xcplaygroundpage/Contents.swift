//: [Previous](@previous)

import Foundation

public class TreeNode {
    public var val: Int
    public var left: TreeNode?
    public var right: TreeNode?
    public init(_ val: Int) {
        self.val = val
        self.left = nil
        self.right = nil
    }
}

class Solution {
    // 递归实现
    func inorderTraversal(_ root: TreeNode?) -> [Int] {
        var result: [Int] = []
        self.traverse(root, &result)
        return result
    }
    func traverse(_ root: TreeNode?,_ result: inout [Int]) {
        guard let indx = root else {
            return
        }
       
        self.traverse(indx.left, &result)
        result.append(indx.val)
        self.traverse(indx.right, &result)
    }
    
    // 非递归实现
    func inorderTraversal2(_ root: TreeNode?) -> [Int] {
        var stack: [TreeNode] = []
        var note = root
        var result: [Int] = [];
        while !(note == nil && stack.isEmpty) {
            while let root = note {
                stack.append(root)
                note = root.left
            }
            if !stack.isEmpty {
                note = stack.last
                stack.removeLast()
                result.append(note!.val)
                note = note?.right
            }
        }
        return result
    }
    
}
