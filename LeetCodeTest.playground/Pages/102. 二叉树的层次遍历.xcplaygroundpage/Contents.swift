/*
 给定一个二叉树，返回其按层次遍历的节点值。 （即zhu'ceng'de，从左到右访问）。
 
 例如:
 给定二叉树: [3,9,20,null,null,15,7],
 
 3
 / \
 9  20
 /  \
 15   7
 返回其层次遍历结果为：
 
 [
 [3],
 [9,20],
 [15,7]
 ]
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
    func levelOrder(_ root: TreeNode?) -> [[Int]] {
        guard let node = root else {
            return []
        }
        var layer = [node]
        var reslut: [[Int]] = []
        while layer.count > 0 {
            var layerNum: [Int] = []
            var nextLayer: [TreeNode] = []
            for node in layer {
                layerNum.append(node.val)
                if let left = node.left {
                    nextLayer.append(left)
                }
                if let right = node.right {
                    nextLayer.append(right)
                }
            }
            reslut.append(layerNum)
            layer = nextLayer
        }
        return reslut
    }
}
