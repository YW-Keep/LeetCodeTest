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
        var result = Int.min
        getRootMax(&result, root)
        return result
    }
    
    func getRootMax(_ reslut: inout Int,_ root: TreeNode?) -> Int {
        guard root != nil else {
            return 0
        }
        let left = max(getRootMax(&reslut, root!.left), 0)
        let right = max(getRootMax(&reslut, root!.right), 0)
        reslut = max(reslut, left + right + root!.val)
        return max(left, right) + root!.val
    }
}
