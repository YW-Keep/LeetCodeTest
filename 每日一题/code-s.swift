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

// 895. 最大频率栈  哈希表和栈 
class FreqStack {
    var freq: [Int: Int]
    var group: [Int: [Int]]
    var maxFreq: Int
    init() {
        self.freq = [Int: Int]()
        self.group = [Int: [Int]]()
        self.maxFreq = 0
    }
    
    func push(_ val: Int) {
        var valFreq = (freq[val] ?? 0) + 1
        freq[val] = valFreq
        maxFreq = max(maxFreq, valFreq)
        var stack = group[valFreq] ?? []
        stack.append(val)
        group[valFreq] = stack
    }
    
    func pop() -> Int {
        guard let val = group[maxFreq]?.popLast() else {
            return -1
        }
        guard let valFreq = freq[val] else {
            return -1
        }
        if valFreq == 1 {
            freq[val] = nil
        } else {
            freq[val] = valFreq - 1
        }
        if group[maxFreq]?.count == 0 {
            maxFreq -= 1
        }
        return val
    }
}

// 1779. 找到最近的有相同 X 或 Y 坐标的点  基础遍历
class Solution {
    func nearestValidPoint(_ x: Int, _ y: Int, _ points: [[Int]]) -> Int {
        var res = -1
        var min = Int.max
        for (index, item) in points.enumerated() {
            if item[0] == x && abs(item[1] - y) < min {
                res = index
                min = abs(item[1] - y)
            }
            if item[1] == y && abs(item[0] - x) < min {
                res = index
                min = abs(item[0] - x)
            }
        }
        return res
    }
}

// 1769. 移动所有球到每个盒子所需的最小操作数 动态规划
class Solution {
   static func minOperations(_ boxes: String) -> [Int] {
        var left = 0, right = 0
        var res = [Int]()
        var item = 0
        for (index,char) in boxes.enumerated() {
            if String(char) == "1" {
                item += index
                if index != 0 {
                    right += 1
                } else {
                    left += 1
                }
            }
        }
        res.append(item)
        
        for i in 1..<boxes.count {
            let index = boxes.index(boxes.startIndex,offsetBy: i)
            item = item + left - right
            if String(boxes[index]) == "1" {
                left += 1
                right -= 1
            }
            res.append(item)
        }
        return res;
    }
}

// 1796. 字符串中第二大的数字 基础逻辑
class Solution {
    func secondHighest(_ s: String) -> Int {
        var sec = -1
        var max = -1

        for c in s {
            if c.isNumber {
                let n = Int(String(c))!
                if n > max {
                    sec = max 
                    max = n 
                }else if n < max && n > sec {
                    sec = n 
                }
            }
        }
        return sec 
    }
}

// 1805. 字符串中不同整数的数目 字符串处理 数组会越界
class Solution {
    func numDifferentIntegers(_ word: String) -> Int {
        var num = "", map = [String:Bool]()
        let newWord = word + "a"
        for char in newWord {
            if char.isNumber {
                if num == "0" {
                    if String(char) != "0" {
                        num = String(char)
                    }
                } else {
                    num = num + String(char)
                }
               
            } else {
                if num.count > 0 {
                    map.updateValue(true, forKey: num)
                    num = ""
                }
            }
        }
        return map.keys.count
    }
}

// 1775. 通过最少操作次数使数组的和相等 贪心 
class Solution {
    func minOperations(_ nums1: [Int], _ nums2: [Int]) -> Int {
        let n = nums1.count, m = nums2.count
        if 6*n < m || 6*m < n {
            return -1
        }
        var diff = 0;
        var cnt1 = [Int](repeating: 0, count: 7)
        var cnt2 = [Int](repeating: 0, count: 7)
        for num in nums1 {
            diff += num
            cnt1[num] += 1
        }
        
        for num in nums2 {
            diff -= num
            cnt2[num] += 1
        }
        if diff == 0 {
            return 0
        }
        var h1 = cnt2, h2 = cnt1
        if diff < 0 {
            h1 = cnt1
            h2 = cnt2
            diff = -diff
        }
        
        var h = [Int](repeating: 0, count: 7)
        for i in 1...6 {
            h[6 - i] += h1[i]
            h[i - 1] += h2[i]
        }
        var res = 0
       for index in 1...5 {
           let i =  6 - index
            let t = min((diff + i - 1)/i ,h[i])
            res += t
            diff -= t*i
            if diff <= 0 {
                return res
            }
        }
       return res
    }
}

// 1812. 判断国际象棋棋盘中一个格子的颜色 基础题
class Solution {
    func squareIsWhite(_ coordinates: String) -> Bool {
        (Int(coordinates.first!.asciiValue! - 96) + coordinates.last!.wholeNumberValue!) % 2 != 0
    }
}

// 1780. 判断一个数字是否可以表示成三的幂的和 数学题
class Solution {
    func checkPowersOfThree(_ n: Int) -> Bool {
        var temp = n
        while temp > 0 {
            if temp % 3 == 2 { return false }
            temp /= 3
        }
        return true
    }
}


// 1781. 所有子字符串美丽值之和 基础逻辑
class Solution {
    func beautySum(_ s: String) -> Int {
        let chars = Array(s)
        let n = chars.count
        var ans = 0
        
        for i in 0 ..< n {
            var cnt: [Int] = Array(repeating: 0, count: 26)
            var maxCount = 0
            for j in i ..< n {
                let c = chars[j]
                let index = Int(c.asciiValue!) - 97
                cnt[index] += 1
                maxCount = max(maxCount, cnt[index])
                var minCount = Int.max
                for m in cnt where m != 0 {
                    minCount = min(minCount, m)
                }
                ans += maxCount - minCount
            }
        }
        
        return ans
    }
}

// 1832. 判断句子是否为全字母句 map
class Solution {
    func checkIfPangram(_ sentence: String) -> Bool {
        var map = [Int](repeating: 0, count: 26), cnt = 0
        for e in sentence {
            let i = Int(e.asciiValue!) - 97
            if map[i] == 0 {
                if cnt == 25 { return true }
                cnt += 1
            }
            map[i] += 1
        }
        return false
    }
}

// 1827. 最少操作使数组递增 贪心
class Solution {
    func minOperations(_ nums: [Int]) -> Int {
        guard nums.count > 0 else {
            return 0;
        }
        
        var res = 0, last = nums[0] - 1
        for num in nums {
            if num > last {
                last = num
            } else {
                last += 1
                res += last - num
            }
        }
        return res
    }
}

// 1945. 字符串转化后的各位数字之和 基础逻辑
class Solution {
    func getLucky(_ s: String, _ k: Int) -> Int {

        var numWord = "", c = k
        for i in s.unicodeScalars {
            numWord += String(i.value - 96)
        }
       
        while c > 0 {
            numWord = cal(numWord)
            c -= 1
        }
        
        return Int(numWord) ?? 0
    }
    
    func cal(_ send: String) -> String {
        
        var res = 0
        
        for i in send {
            res += Int(String(i))!
        }
        
        return String(res)
    }
}


// 1785. 构成特定和需要添加的最少元素 基础逻辑
class Solution {
    func minElements(_ nums: [Int], _ limit: Int, _ goal: Int) -> Int {
       var sum = 0;
       for item in nums {
           sum = sum + item;
       }
       let sub = goal - sum;
       let count = Double(abs(sub)) / Double(abs(limit));
       return Int(ceil(count));
    }
}

// 1971. 寻找图中是否存在路径 查并集
class Solution {
    func validPath(_ n: Int, _ edges: [[Int]], _ source: Int, _ destination: Int) -> Bool {
        if destination ==  source {
            return true
        }
        var map = [Int:[Int]]()
        for edge in edges {
            var arr1 = [Int]()
            if let arr = map[edge[0]] {
                arr1 = arr
            }
            arr1.append(edge[1])
            map.updateValue(arr1, forKey: edge[0])
            var arr2 = [Int]()
            if let arr = map[edge[1]] {
                arr2 =  arr
            }
            arr2.append(edge[0])
            map.updateValue(arr2, forKey: edge[1])
        }
        var v = [Bool](repeating: false, count: n)
        v[source] = true
        var len = map[source]
       while (len != nil && len!.count > 0) {
            let num = len!.removeFirst()
            if num == destination {
                return true
            }
            v[num] = true
            for num in map[num] ?? [] {
                if !v[num] {
                    len?.append(num)
                }
            }
        }
        
        return false
    }
}

// 1760. 袋子里最少数目的球 二分查找
class Solution {
    func minimumSize(_ nums: [Int], _ maxOperations: Int) -> Int {
        var left = 1, right = nums.max()!
        var ans = 0
        while(left <= right) {
            let y = Int((left + right) / 2);
            var ops = 0
            for num in nums {
                ops += Int((num - 1) / y)
            }
            if ops <= maxOperations {
                ans = y
                right = y - 1
            } else {
                left = y + 1
            }
        }
        return ans
    }
}

class Solution {
    func minimumSize(_ nums: [Int], _ maxOperations: Int) -> Int {
        var left = 1, right = nums.max()!
        var ans = 0
        while(left <= right) {
            let y = Int((left + right) / 2);
            var ops = 0
            for num in nums {
                ops += Int((num - 1) / y)
            }
            if ops <= maxOperations {
                ans = y
                right = y - 1
            } else {
                left = y + 1
            }
        }
        return ans
    }
}

// 1753. 移除石子的最大得分 贪心
class Solution {
  func maximumScore(_ a: Int, _ b: Int, _ c: Int) -> Int {
      let sum =  a + b + c
      let max =  max(a,b,c)
      return min(sum - max, sum/2)
  }
}

// 2042. 检查句子中的数字是否递增 基础题
class Solution {
    func areNumbersAscending(_ s: String) -> Bool {
        var last = -1
        var num = ""
        for char in s + " " {
            if char.isNumber {
                num =  num + String(char)
            } else if num.count > 0 {
                if last >= Int(num)! {
                    return  false
                }
                last = Int(num)!
                num = ""
            }
        }
        return true
    }
}

// 2351. 第一个出现两次的字母  基础题
class Solution {
    func repeatedCharacter(_ s: String) -> Character {
        var map = [Character:Bool]()
        for char in s {
            if map[char] != nil {
                return char
            }
            map.updateValue(true, forKey: char)
        }
        return Character("")
    }
}

// 2180. 统计各位数字之和为偶数的整数个数  数学题
class Solution {
    func countEven(_ num: Int) -> Int {
        var y: Int = num/10
        var x = num%10
        var res = y*5
        var ySum = 0
        while(y != 0) {
            ySum += y%10
            y = y/10
        }
        if ySum%2 == 0 {
            res += x/2 + 1
        } else {
            res += (x+1)/2
        }
        return res - 1
    }
}

// 2185. 统计包含给定前缀的字符串  基础题
class Solution {
    func prefixCount(_ words: [String], _ pref: String) -> Int {
        var num = 0
        for word in words {
            if word.hasPrefix(pref) {
                num += 1
            }
        }
        return num
    }
}

// 1658. 将 x 减到 0 的最小操作数 窗口
class Solution {
    func minOperations(_ nums: [Int], _ x: Int) -> Int {
        let sum = nums.reduce(0, +)
        guard sum >= x else {
            return  -1
        }
        let n = nums.count
        var ans = n + 1
        var lsum = 0
        var rsum = sum
        var right = 0
        for left in -1...(n - 1) {
            if left != -1 {
                lsum += nums[left]
            }
            while right < n && lsum + rsum > x {
                rsum -= nums[right]
                right += 1
            }
            if (lsum + rsum) == x {
                ans = min(ans, (left + 1) + (n - right))
            }
        }
        
        return ans > n ? -1 : ans;
    }
}

// 2283. 判断一个数的数字计数是否等于数位的值 基础题
class Solution {
    func digitCount(_ num: String) -> Bool {
        var map = [Int:Int]()
        for char in num {
            let key = Int(String(char))!
            map.updateValue((map[key] ?? 0) + 1, forKey: key)
        }
        for (i,char) in num.enumerated() {
            let key = Int(String(char))!
            let value = map[i] ?? 0
            if key != value {
                return false
            }
        }
        return true
    }
}

// 1807. 替换字符串中的括号内容 基础逻辑处理
class Solution {
    func evaluate(_ s: String, _ knowledge: [[String]]) -> String {
        var map = [String:String]()
        for item in knowledge {
            map.updateValue(item[1], forKey: item[0])
        }
        var isKey = false
        var key = ""
        var result = ""
        
        for char in s  {
            let str = String(char)
            if str == "(" {
                isKey = true
            } else if str == ")" {
                isKey = false
                result += map[key] ?? "?"
                key = ""
            } else {
                if isKey {
                    key += str
                } else {
                    result += str
                }
            }
        }
        return result
    }
}

// 2287. 重排字符形成目标字符串 map 对比
class Solution {
    func rearrangeCharacters(_ s: String, _ target: String) -> Int {
        var sArr = [Int](repeating: 0, count: 26);
        var tArr = [Int](repeating: 0, count: 26);
        let firstChar: Character = "a"
        for char in s  {
            sArr[Int(char.asciiValue! - firstChar.asciiValue!)] += 1
        }
        for char in target  {
            tArr[Int(char.asciiValue! - firstChar.asciiValue!)] += 1
        }
        var res = Int.max
        for (i,num) in tArr.enumerated() {
            if (num > 0) {
                let sNum = sArr[i]
                if sNum == 0 {
                    return 0
                }
                res = min(res, sNum/num)
            }
        }
        
        return res
    }
}

// 1813. 句子相似性 III  双指针
class Solution {
    func areSentencesSimilar(_ sentence1: String, _ sentence2: String) -> Bool {
        let arr1 =  sentence1.components(separatedBy: " ")
        let arr2 =  sentence2.components(separatedBy: " ")
        var i = 0,j = 0,num1 = arr1.count, num2 = arr2.count
        while i < num1 && i < num2 && arr1[i] == arr2[i] {
            i +=  1
        }
        while j < num1  - i && j < num2 - i && arr1[num1 - 1 - j] == arr2[num2 - 1 - j] {
            j += 1
        }
        return i + j == min(num1,num2)
    }
}

// 1814. 统计一个数组中好对子的数目 基础分析
class Solution {
    func countNicePairs(_ nums: [Int]) -> Int {
        let MOD = 1000000007 
        var res = 0
        var map = [Int:Int]()
        for i in nums {
            var temp = i, j = 0
            while temp > 0 {
                j =  j*10 + temp%10
                temp = temp/10
            }
            res = (res + (map[i-j] ?? 0)) % MOD
            map.updateValue((map[i-j] ?? 0) + 1, forKey: i-j)
        }
        
        return res
    }
}

// 2293. 极大极小游戏 模拟
class Solution {
    func minMaxGame(_ nums: [Int]) -> Int {
        var nums = nums
        while nums.count > 1 {
            var new: [Int] = []
            for i in 0 ..< nums.count / 2 {
                if i % 2 == 0 {
                    new.append(min(nums[2 * i], nums[2 * i + 1]))
                } else {
                    new.append(max(nums[2 * i], nums[2 * i + 1]))
                }
            }
            nums = new
        }
        
        return nums[0]
    }
}

// 2299. 强密码检验器 II 基础逻辑
class Solution {
    func strongPasswordCheckerII(_ password: String) -> Bool {
        if password.count < 8 {
            return false
        }
        
        let passwordArr = password.map { $0 }
        
        var hasLowercase = false
        var hasUppercase = false
        var hasDigit = false
        var hasSpecialCharacter = false
        
        
        let specialCharacter = "!@#$%^&*()-+"
        
        for (i, char) in passwordArr.enumerated() {
            
            // 是否有小写
            if char.asciiValue! >= Character("a").asciiValue! && char.asciiValue! <= Character("z").asciiValue! {
                hasLowercase = true
            }
            
            // 是否有大写
            if char.asciiValue! >= Character("A").asciiValue! && char.asciiValue! <= Character("Z").asciiValue! {
                hasUppercase = true
            }
            
            // 是否包含数字
            if char.asciiValue! >= Character("0").asciiValue! && char.asciiValue! <= Character("9").asciiValue! {
                hasDigit = true
            }
            
            // 是否包含特殊字符
            if specialCharacter.contains(char) {
                hasSpecialCharacter = true
            }
            
            // 是否包含2个相同字符
            if i < (password.count - 1) {
                if passwordArr[i] == passwordArr[i + 1] {
                    return false
                }
            }
            
        }
        
        return hasLowercase && hasUppercase && hasDigit && hasSpecialCharacter
    }
}
