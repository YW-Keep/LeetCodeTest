/*
 Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).
 
 For example,
 S = "ADOBECODEBANC"
 T = "ABC"
 Minimum window is "BANC".
 
 Note:
 If there is no such window in S that covers all characters in T, return the empty string "".
 
 If there are multiple such windows, you are guaranteed that there will always be only one unique minimum window in S.
 */
import Foundation


class Solution {
    // 这个方法还是超时 尴尬
    func minWindow(_ s: String, _ t: String) -> String {
        var tCnt = [Int](repeating: 0, count: 256)
        var sCnt = [Int](repeating: 0, count: 256)
        
        
        for indx in t.unicodeScalars {
            tCnt[Int(indx.value)] += 1
        }
        
        var result = ""
        var hasFound = 0
        var start = -1
        for (i, indx) in s.unicodeScalars.enumerated() {
            
            // 不在目标列的不处理
            guard  tCnt[Int(indx.value)] > 0 else {
                continue
            }
            if start < 0 {
                start = i
            }
            sCnt[Int(indx.value)] += 1
            
            // 如果找到一个标记就加一
            if sCnt[Int(indx.value)] <= tCnt[Int(indx.value)] {
                hasFound += 1
            }
            
            // hasFound 如果跟目标数组一样长了 就说明全部找到了
            if t.count == hasFound {
                let newS = s[s.index(s.startIndex, offsetBy: start)...s.index(s.startIndex, offsetBy: i)]
                for value in newS.unicodeScalars {
                    
                    guard  tCnt[Int(value.value)] > 0 else {
                        start += 1
                        continue
                    }
                    sCnt[Int(value.value)] -= 1
                    if sCnt[Int(value.value)] < tCnt[Int(value.value)] {
                        hasFound -= 1
                        let num = i - start + 1
                        if result.count == 0 || result.count > num {
                            result = String(s[s.index(s.startIndex, offsetBy: start)...s.index(s.startIndex, offsetBy: i)])
                        }
                        start += 1
                        break
                    }
                    start += 1
                }
            }
        }
        
        return result
    }
    
    // 这个方法超时了 尴尬
    func minWindow2(_ s: String, _ t: String) -> String {
        var targetDic: [Character:Int] = [:]
        for char in t {
            if targetDic[char] != nil {
                targetDic[char]  = targetDic[char]! + 1
            } else {
                targetDic[char] = 1
            }
        }
        
        var findNum = targetDic.count
        var start = 0
        var result = ""
        for (index, char) in s.enumerated() {
            if targetDic[char] != nil {
                let num = targetDic[char]! - 1
                targetDic[char] = num
                if num == 0 {
                    findNum -= 1
                }
                if findNum == 0 {
                    while start <= index && findNum == 0{
                        let char = s[s.index(s.startIndex, offsetBy:start)] as Character
                        if targetDic[char] != nil {
                            let num = targetDic[char]! + 1
                            targetDic[char] = num
                            if num == 1 {
                                findNum += 1
                                let sonS = String(s[s.index(s.startIndex, offsetBy:start)...s.index(s.startIndex, offsetBy:index)])
                                if result.count == 0 || result.count > sonS.count {
                                    result = sonS
                                }
                            }
                        }
                        start += 1
                    }
                }
            }
        }
        return result
    }
}
