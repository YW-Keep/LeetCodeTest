//: [Previous](@previous)

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
    func inorderTraversal(_ root: TreeNode?) -> [Int] {
        var result: [Int] = []
        self.traverse(root, &result)
        return result
    }
    func traverse(_ root: TreeNode?,_ result: inout [Int]) {
        guard let indx = root else {
            return
        }
       
        self.traverse(indx.left, &result)
        result.append(indx.val)
        self.traverse(indx.right, &result)
    }
}
