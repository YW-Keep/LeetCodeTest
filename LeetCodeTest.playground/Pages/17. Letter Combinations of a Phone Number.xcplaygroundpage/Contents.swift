/*
 Given a digit string, return all possible letter combinations that the number could represent.
 
 A mapping of digit to letters (just like on the telephone buttons) is given below.
 
 2->abc 3->def 4->ghi 5->jkl 6->mno 7->pqrs 8->tuv 9->wxyz
 
 Input:Digit string "23"
 Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
 // 好像也没有什么很好的方式 用了swift的map方法进行拼接
 */

import Foundation

class Solution {
    func letterCombinations(_ digits: String) -> [String] {
        var result: [String] = []
        let mapArray = ["","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"]
        for char  in digits {
            let num = Int(String(char)) ?? 0
            let getStr = mapArray[num]
            
            // 拼接
            if result.count == 0 {
                for char in getStr {
                    result.append(String(char))
                }
            } else {
                var newArray: [String] = []
                for listChar in getStr {
                    newArray = result.map({ (str) -> String in
                        str + String(listChar)
                    }) + newArray
                }
                if newArray.count > 0 {
                    result = newArray
                }
            }
   
        }
        return result
    }
}
