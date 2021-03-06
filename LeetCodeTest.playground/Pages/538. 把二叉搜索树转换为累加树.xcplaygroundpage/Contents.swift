/*
 
 给定一个二叉搜索树（Binary Search Tree），把它转换成为累加树（Greater Tree)，使得每个节点的值是原来的节点值加上所有大于它的节点值之和。
 
 例如：
 
 输入: 二叉搜索树:
   5
 /   \
 2     13
 
 输出: 转换为累加树:
  18
 /   \
 20     13
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

// 搜索二叉树，那不是只要后序遍历就累加就可以了
class Solution {
    
    var sum = 0
    func convertBST(_ root: TreeNode?) -> TreeNode? {
        guard root != nil else {
            return nil
        }
        convertBST(root!.right)
        root!.val += sum
        sum = root!.val
        convertBST(root!.left)
        return root
    }
}
