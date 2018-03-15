/*
 Given an array of strings, group anagrams together.
 
 For example, given: ["eat", "tea", "tan", "ate", "nat", "bat"],
 Return:
 
 [
 ["ate", "eat","tea"],
 ["nat","tan"],
 ["bat"]
 ]
 Note: All inputs will be in lower-case.
 */

import Foundation

class Solution {
    func groupAnagrams(_ strs: [String]) -> [[String]] {
        var listArray: [String:[String]] = [:]
        for str in strs {
            let key = String(str.sorted())
            if listArray[key] != nil {
                listArray[key] = listArray[key]! + [str]
            } else {
                listArray[key] = [str]
            }
        }
        return listArray.map({ (_, array) -> [String] in
            return array
        })
    }
}
