/*
 
 给定一个二叉树，使用原地算法将它 “压扁” 成链表。
 
 
 
 示例：
 
 给出：
 
 1
 / \
 2   5
 / \   \
 3   4   6
 压扁后变成如下：
 
 1
 \
 2
 \
 3
 \
 4
 \
 5
 \
 6
 
 
 提示:
 
 如果您细心观察该扁平树，则会发现每个节点的右侧子节点是以原二叉树前序遍历的次序指向下一个节点的。
 
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
    func flatten(_ root: TreeNode?) {
        
    }
}
