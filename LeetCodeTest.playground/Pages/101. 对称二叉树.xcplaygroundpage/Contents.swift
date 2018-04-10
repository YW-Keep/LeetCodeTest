// 备注 LeetCode 有中文官网，现在开始中文更新
/*
 给定一个二叉树，检查它是否是它自己的镜像（即，围绕它的中心对称）。
 
 例如，这个二叉树 [1,2,2,3,4,4,3] 是对称的。
 
 1
 / \
 2   2
 / \ / \
 3  4 4  3
 
 
 但是下面这个 [1,2,2,null,3,null,3] 则不是:
 
 1
 / \
 2   2
 \   \
 3    3
 
 
 说明:
 
 如果你可以递归地和迭代地解决它就奖励你点数。
 */

import Foundation

var str = "Hello, playground"
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
    func isSymmetric(_ root: TreeNode?) -> Bool {
        
    }
}

