/*
 Given two words word1 and word2, find the minimum number of steps required to convert word1 to word2. (each operation is counted as 1 step.)
 
 You have the following 3 operations permitted on a word:
 
 a) Insert a character
 b) Delete a character
 c) Replace a character
 */
import Foundation

class Solution {
    func minDistance(_ word1: String, _ word2: String) -> Int {
        let num1 = Int(word1.count)
        let num2 = Int(word2.count)
        
        guard num1 > 0 else {
            return num2
        }
        
        guard num2 > 0 else {
            return num1
        }
        
        var record: [[Int]] = [[Int]](repeating: [Int](repeating: -1, count: num2 + 1), count: num1 + 1)
        for indx in 0...num1 {
            record[indx][0] = indx
        }
        
        for indx in 0...num2 {
            record[0][indx] = indx
        }
        
        for row in 1...num1 {
            for index in 1...num2 {
                let char1 = word1[word1.index(word1.startIndex, offsetBy: row - 1)]
                let char2 = word2[word2.index(word2.startIndex, offsetBy: index - 1)]
                if char1 == char2 {
                    record[row][index] = record[row - 1][index - 1]
                } else {
                    record[row][index] = min(record[row - 1][index - 1] + 1, record[row][index - 1] + 1,record[row - 1][index] + 1)
                }
            }
        }
        
        return record[num1][num2]
    }
}
