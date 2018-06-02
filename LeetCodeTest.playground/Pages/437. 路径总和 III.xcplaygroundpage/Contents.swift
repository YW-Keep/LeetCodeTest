/*
 
 给定一个二叉树，它的每个结点都存放着一个整数值。
 
 找出路径和等于给定数值的路径总数。
 
 路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
 
 二叉树不超过1000个节点，且节点数值范围是 [-1000000,1000000] 的整数。
 
 示例：
 
 root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8
 
 10
 /  \
 5   -3
 / \    \
 3   2   11
 / \   \
 3  -2   1
 
 返回 3。和等于 8 的路径有:
 
 1.  5 -> 3
 2.  5 -> 2 -> 1
 3.  -3 -> 11
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


// 思路 每个点都有可能开始，那就从每个点开始都进行一次深度遍历dfs。递归计算总和
class Solution {
    func pathSum(_ root: TreeNode?, _ sum: Int) -> Int {
        
        guard root != nil else {
            return 0
        }
        
        return dfs(root, sum) + pathSum(root?.left, sum) + pathSum(root?.right, sum)
    }
    func dfs(_ root: TreeNode?, _ sum: Int) -> Int {
        
        guard root != nil else {
            return 0
        }
        
        var count = 0
        if root!.val == sum {
            count = 1
        }
        count += dfs(root!.left, sum - root!.val)
        count += dfs(root!.right, sum - root!.val)
        
        return count
    }
}
