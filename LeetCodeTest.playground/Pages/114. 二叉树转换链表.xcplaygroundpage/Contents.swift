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
// 前序遍历方式获取
class Solution {
    func flatten(_ root: TreeNode?) {
        var note = root
        var stack: [TreeNode] = []
        var listStack: [Int] = []
        while !(note == nil && stack.isEmpty) {
            while let inRoot = note {
                listStack.append(inRoot.val)
                stack.append(inRoot)
                note = inRoot.left
            }
            if !stack.isEmpty {
                note = stack.last
                stack.removeLast()
                note = note?.right
            }
        }
        var Pointer: TreeNode? = nil
        if listStack.count > 1 {
            for num in listStack {
                if Pointer == nil {
                    Pointer = root
                    Pointer?.left = nil
                } else {
                    Pointer?.right = TreeNode(num)
                    Pointer = Pointer?.right
                }
            }
        }
    }
}
// 网上找的方法 代码更简单 思路要把右边的树挂到左边（前序遍历的最后一个数，即最右边的数上）循环做
class Solution2 {
    func flatten(_ root: TreeNode?) {
        var node = root
        while(node != nil){
            if node!.left != nil {
                var cur  = node!.left
                while(cur!.right != nil){
                    cur = cur!.right
                }
                cur!.right = node!.right
                node!.right = node!.left
                node!.left = nil;
            }
            node = node!.right

        }
    }
}

