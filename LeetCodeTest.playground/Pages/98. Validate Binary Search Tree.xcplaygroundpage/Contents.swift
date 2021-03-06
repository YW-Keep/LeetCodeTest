/*
 Given a binary tree, determine if it is a valid binary search tree (BST).
 
 Assume a BST is defined as follows:
 
 The left subtree of a node contains only nodes with keys less than the node's key.
 The right subtree of a node contains only nodes with keys greater than the node's key.
 Both the left and right subtrees must also be binary search trees.

 */
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
    func isValidBST(_ root: TreeNode?) -> Bool {
        var result: [Int] = []
        self.traverse(root, &result)
        guard result.count > 1 else {
            return true
        }
        for indx in 1...(result.count - 1) {
            if result[indx] <= result[indx - 1] {
            return false
            }
        }
        return true
    }
    func traverse(_ root: TreeNode?,_ result: inout [Int]) {
        guard let indx = root else {
            return
        }
        
        self.traverse(indx.left, &result)
        result.append(indx.val)
        self.traverse(indx.right, &result)
    }
}
