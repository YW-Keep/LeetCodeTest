/*
 小偷又发现一个新的可行窃的地点。 这个地区只有一个入口，称为“根”。 除了根部之外，每栋房子有且只有一个父房子。 一番侦察之后，聪明的小偷意识到“这个地方的所有房屋形成了一棵二叉树”。 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。
 
 在不触动警报的情况下，计算小偷一晚能盗取的最高金额。
 
 示例 1:
 
 3
 / \
 2   3
 \   \
 3   1
 能盗取的最高金额 = 3 + 3 + 1 = 7.
 
 示例 2:
 
 3
 / \
 4   5
 / \   \
 1   3   1
 能盗取的最高金额 = 4 + 5 = 9.
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

// 递归 思路是 根节点 抢了子节点不能抢 根节点不抢子节点可抢可不抢
class Solution {
    
    func rob(_ root: TreeNode?) -> Int {
        let res = dfs(root)
        return max(res.0, res.1)
    }
    
    func dfs(_ root: TreeNode?) -> (Int, Int) {
        guard root != nil else {
            return (0, 0)
        }
        let left = dfs(root!.left)
        let right = dfs(root!.right)
        return (left.1 + right.1 + root!.val, max(left.0, left.1) + max(right.0, right.1))
    }
}


// 这种思路错误，因为有种可能 一排下面没有左右就可以选
class Solution2 {
    func rob(_ root: TreeNode?) -> Int {
        guard root != nil else {
            return 0
        }
        
        var before = 0 , now = 0
        var list: [[TreeNode]] = [[root!]]
        while list.count != 0 {
            var inList: [TreeNode] = []
            var sum = 0
            for tree in list.first! {
                sum = sum + tree.val
                if tree.left != nil {
                    inList.append(tree.left!)
                }
                if tree.right != nil {
                    inList.append(tree.right!)
                }
            }
            if inList.count > 0 {
                list.append(inList)
            }
            list.removeFirst()
            let nowMax =  max(before + sum, now)
            before = now
            now = nowMax
        }
        return now
    }
}
