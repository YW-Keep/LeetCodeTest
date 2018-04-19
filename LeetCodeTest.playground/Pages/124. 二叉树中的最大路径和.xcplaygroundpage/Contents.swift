/*
 二叉树中的最大路径和
 
 给出一棵二叉树，寻找一条路径使其路径和最大。
 
 对于这个问题，路径被定义为从树中任意节点连接任意节点的序列。该路径必须至少包含一个节点，并且不需要经过根节点。
 
 例如：
 
 给出一棵二叉树：
 
 1
 / \
 2   3
 返回 6。
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
//

class Solution {
    func maxPathSum(_ root: TreeNode?) -> Int {
        return 1
    }
}
