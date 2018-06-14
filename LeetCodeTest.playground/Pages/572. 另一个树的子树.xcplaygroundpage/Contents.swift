/*
 
 给定两个非空二叉树 s 和 t，检验 s 中是否包含和 t 具有相同结构和节点值的子树。s 的一个子树包括 s 的一个节点和这个节点的所有子孙。s 也可以看做它自身的一棵子树。
 
 示例 1:
 给定的树 s:
 
    3
   / \
   4   5
  / \
 1   2
 给定的树 t：
 
   4
  / \
 1   2
 返回 true，因为 t 与 s 的一个子树拥有相同的结构和节点值。
 
 示例 2:
 给定的树 s：
 
  3
 / \
  4   5
 / \
 1   2
 /
 0
 给定的树 t：
 
  4
 / \
 1   2
 返回 false。
 

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

// 思路，每个节点去和目标树比较 递归算法。
class Solution {
    func isSubtree(_ s: TreeNode?, _ t: TreeNode?) -> Bool {
        guard s != nil && t != nil else {
            return false
        }
        if isSameTree(s, t) {
            return true
        } else {
            return  isSubtree(s!.left,t) || isSubtree(s!.right,t)
        }
    }
    func isSameTree(_ s: TreeNode?, _ t: TreeNode?) -> Bool {
        if s == nil && t == nil {
            return true
        }
        guard s != nil && t != nil else {
            return false
        }
        if s!.val != t!.val {
            return false
        } else {
            return isSameTree(s!.left , t!.left) && isSameTree(s!.right , t!.right)
        }
    }
}
