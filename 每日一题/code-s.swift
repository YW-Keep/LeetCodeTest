// 1704. 判断字符串的两半是否相似 基础遍历
class Solution {
    func halvesAreAlike(_ s: String) -> Bool {
        if s.count % 2 != 0 {
            return false
        }
        
        let lists:[Character] = ["a", "e","i","o","u","A","E","I","O","U"]
        let charts = Array(s)
        var n = 0
        for i in 0..<charts.count/2 {
            if lists.contains(charts[i])  {
                n += 1
            }
            if lists.contains(charts[charts.count/2 + i]) {
                n -= 1
            }
        }
        
        return n == 0
    }
}


// 791. 自定义字符串排序 字典
class Solution791 {
    func customSortString(_ order: String, _ s: String) -> String {
        var dic = [Character:Int]()
        for c in s {
            dic[c] = (dic[c] ?? 0) + 1 
        }

        var res = ""

        for c in order {
            if let num = dic[c] {
                res += String(repeating: String(c), count: num)
                dic[c] = nil 
            }else{
                break 
            }
        }
        for (key, value) in dic {
            res += String(repeating: String(key), count: value)
        }


        return res 

    }
}

// 1710. 卡车上的最大单元数 排序贪心
class Solution {
    func maximumUnits(_ boxTypes: [[Int]], _ truckSize: Int) -> Int {
        let nBox = boxTypes.sorted { (list1, list2) -> Bool in
            return list1[1] > list2[1]
        }
        
        var result = 0
        var n = 0
        for list in nBox {
            if n + list[0] <= truckSize {
                n += list[0]
                result += list[0] * list[1]
            } else {
                result += (truckSize - n) * list[1]
                n = truckSize
                break;
            }
        }
        return result
    }
}

// 775. 全局倒置与局部倒置 维护最小值
class Solution {
    func isIdealPermutation(_ nums: [Int]) -> Bool {
        let n = nums.count
        guard n > 2 else {
            return true
        }
        var minNum = nums[n-1]
        for i in (0...n-3).reversed(){
            if nums[i] > minNum {
                return false
            }
            minNum = min(minNum, nums[i+1])
        }
        return true
    }
}

// 792. 匹配子序列的单词数 多指针
class Solution {
    func numMatchingSubseq(_ s: String, _ words: [String]) -> Int {
        var map = [[(Int,Int)]](repeating: [], count: 26);
        let firstChar: Character = "a"
        for i in 0...(words.count-1) {
            let word = words[i]
            let char = word[word.startIndex]
            let index = Int(char.asciiValue! - firstChar.asciiValue!)
            map[index].append((i,0))
        }
        var res = 0
        for char in s {
            let index = Int(char.asciiValue! - firstChar.asciiValue!)
            guard map[index].count > 0 else {
                continue
            }
            var len = map[index].count
            while (len > 0) {
                let item = map[index].remove(at: 0)
                if item.1 == words[item.0].count - 1 {
                    res += 1
                } else {
                    let word = words[item.0]
                    let char = word[word.index(word.startIndex, offsetBy: item.1+1)]
                    let index = Int(char.asciiValue! - firstChar.asciiValue!)
                    map[index].append((item.0,item.1+1))
                }
                len -= 1
            }
        }
        return res
    }
}

// 1742. 盒子中小球的最大数量 哈希表
class Solution {
    func countBalls(_ lowLimit: Int, _ highLimit: Int) -> Int {
      var dict = [Int:Int]()
      var maxCount = 0
      for i in lowLimit...highLimit {
        var num = i 
        var key = 0
        while num > 0 {
          key += num % 10
          num /= 10
        }

        dict[key] = (dict[key] ?? 0) + 1
        maxCount = max(maxCount, dict[key]!)
      }
      return maxCount
    }
}

// 795. 区间子数组个数 逻辑题
class Solution {
    func numSubarrayBoundedMax(_ nums: [Int], _ left: Int, _ right: Int) -> Int {
        var res = 0, last1 = -1, last2 = -1
        for (i, num) in nums.enumerated() {
            if num >= left && num <= right {
                last1 = i
            } else if num > right {
                last2 = i
                last1 = -1
            }
            if(last1 != -1) {
                res += last1 - last2
            }
        }
        return res
    }
}

// 1758. 生成交替二进制字符串的最少操作数 基础题
class Solution {
    func minOperations(_ s: String) -> Int {
        var change = 0
        for num in 0..<s.count {
            let char = String(s[s.index(s.startIndex,offsetBy: num)])
            if num%2 == Int(char) {
                change += 1
            }
        }
        return min(change, s.count - change)
    }
}