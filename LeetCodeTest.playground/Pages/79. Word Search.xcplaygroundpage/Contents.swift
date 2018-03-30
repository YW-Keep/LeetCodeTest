/*
 Given a 2D board and a word, find if the word exists in the grid.
 
 The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.
 
 For example,
 Given board =
 
 [
 ['A','B','C','E'],
 ['S','F','C','S'],
 ['A','D','E','E']
 ]
 word = "ABCCED", -> returns true,
 word = "SEE", -> returns true,
 word = "ABCB", -> returns false.
 */

import Foundation

class Solution {
    func exist(_ board: [[Character]], _ word: String) -> Bool {
        
        guard word.count > 0 else {
            return true
        }
        
        let head = word[word.index(word.startIndex, offsetBy: 0)]
        for (i, array) in board.enumerated() {
            for (j,char) in array.enumerated() {
                if  char == head {
                    // 回溯算法计算
                    var newWord = word
                    newWord.remove(at: newWord.startIndex)
                    let record = String(i) + "," + String(j)
                    if self.findString(board, newWord, (i, j),[record]) {
                        return true
                    }
                }
            }
        }
        return false
    }
    
    func findString(_ board: [[Character]], _ word: String, _ indx:(Int,Int), _ records:[String]) -> Bool {
        
        guard word.count > 0 else {
            return true
        }
        
        func judge(_ indx: (Int,Int)) -> Bool {
            let record = String(indx.0) + "," + String(indx.1)
            guard !records.contains(record) else
            {
                return false
            }
            let head = word[word.index(word.startIndex, offsetBy: 0)]
            if board[indx.0][indx.1] == head {
                var newWord = word
                newWord.remove(at: newWord.startIndex)
                if (self.findString(board, newWord, indx, records + [record])) {
                    return true
                }
            }
            return false
        }
        
        if 0 <= (indx.0 - 1) && judge((indx.0 - 1, indx.1)) {
            return true
        }
        if 0 <= (indx.1 - 1) && judge((indx.0, indx.1 - 1)) {
            return true
        }
        if(indx.0 + 1) < board.count && judge((indx.0 + 1, indx.1)) {
            return true
        }
        if(indx.1 + 1) < board[indx.0].count && judge((indx.0, indx.1 + 1)) {
            return true
        }
        return false
    }
}
