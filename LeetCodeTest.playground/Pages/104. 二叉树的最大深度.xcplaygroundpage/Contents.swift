/*
 
 给定一个二叉树，找出其最大深度。
 
 二叉树的深度为根节点到最远叶节点的最长路径上的节点数。
 
 案例：
 给出二叉树 [3,9,20,null,null,15,7]，
 
 3
 / \
 9  20
 /  \
 15   7
 返回最大深度为 3 。
 

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
    func maxDepth(_ root: TreeNode?) -> Int {
        guard let index = root else {
            return 0
        }
        return max(maxDepth(index.left), maxDepth(index.right)) + 1
    }
}
