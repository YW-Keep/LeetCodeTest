/*
 
 给定一棵树的前序遍历与中序遍历，依据此构造二叉树。
 
 注意:
 你可以假设树中没有重复的元素。
 
 例如，给出
 
 前序遍历 = [3,9,20,15,7]
 中序遍历 = [9,3,15,20,7]
 返回如下的二叉树：
 
 3
 / \
 9  20
 /  \
 15   7
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

//这种方式 在大数据的情况下 内存会炸 因为需要保存递归过程中的所有数组
class Solution {
    
    func buildTree(_ preorder: [Int], _ inorder: [Int]) -> TreeNode? {
        guard preorder.count > 0 && inorder.count > 0 else {
            return nil
        }
        let rootNode = TreeNode(preorder.first!)
        guard let index = inorder.index(of: preorder.first!) else {
            return nil
        }

        if index == 0 {
             rootNode.right = buildTree(Array(preorder[1...(preorder.count - 1)]), Array(inorder[1...(inorder.count - 1)]))
        } else if index == (inorder.count - 1) {
            rootNode.left = buildTree(Array(preorder[1...(preorder.count - 1)]), Array(inorder[0...(inorder.count - 2)]))
        } else {
            let leftInorder = inorder[0...(index - 1)]
            let rightInorder = inorder[(index + 1)...(inorder.count - 1)]
            let leftPreorder = preorder[1...leftInorder.count]
            let rightPreorder = preorder[(leftInorder.count + 1)...(preorder.count - 1)]
            rootNode.left = buildTree(Array(leftPreorder), Array(leftInorder))
            rootNode.right = buildTree(Array(rightPreorder), Array(rightInorder))
        }
        
        return rootNode
    }
}

// 这种方式内存不会炸 因为只存了 递归过程中 数据在数组中的位置
class Solution2 {
    var preorder: [Int]!
    var inorder: [Int]!
    
    func buildTree(_ preorder: [Int], _ inorder: [Int]) -> TreeNode? {
        guard preorder.count > 1 && inorder.count > 1 else {
            return preorder.count > 0 ? TreeNode(preorder.first!) : nil
        }
        
        self.preorder = preorder
        self.inorder = inorder
        
        
        
        return buildTree((0, preorder.count - 1), (0, inorder.count - 1))
    }
    
    func buildTree(_ preorderIndx: (Int, Int), _ inorderIndx: (Int, Int)) -> TreeNode? {
        
        guard preorderIndx.0 >= 0 && preorderIndx.1 < preorder.count && preorderIndx.0 <= preorderIndx.1 else {
            return nil
        }
        
        guard inorderIndx.0 >= 0 && inorderIndx.1 < inorder.count && inorderIndx.0 <= inorderIndx.1 else {
            return nil
        }
        let inPreorder = Array(preorder[preorderIndx.0...preorderIndx.1])
        let inInorder =  Array(inorder[inorderIndx.0...inorderIndx.1])
        let rootNode = TreeNode(inPreorder.first!)
        guard let index = inInorder.index(of: inPreorder.first!) else {
            return nil
        }
        
        rootNode.left = buildTree((preorderIndx.0 + 1,preorderIndx.0 + index), (inorderIndx.0, inorderIndx.0 + index - 1))
        rootNode.right = buildTree((preorderIndx.0 + index + 1, preorderIndx.1), (inorderIndx.0 + index + 1, inorderIndx.1))
        
        return rootNode
    }
}

