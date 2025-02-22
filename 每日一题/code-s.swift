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

// 1664. 生成平衡数组的方案数 动态规划
class Solution {
    func waysToMakeFair(_ nums: [Int]) -> Int {
        var odd1 = 0, even1 = 0,odd2 = 0, even2 = 0, res = 0
        for  (i,num) in nums.enumerated() {
            if i%2 == 0 {
                even2 += num
            } else {
                odd2 += num
            }
        }
        for (i,num) in nums.enumerated() {
            if i%2 == 0 {
                even2 -= num
            } else {
                odd2 -= num
            }
            if odd1 + even2 == odd2 + even1 {
                res += 1
            }
            if i%2 == 0 {
                even1 += num
            } else {
                odd1 += num
            }
        }
        return res
    }
}

// 2315. 统计星号  基础题
class Solution {
    func countAsterisks(_ s: String) -> Int {
        var num = 0, res  = 0
        for char in s {
            let s = String(char)
            if s == "|" {
                num += 1
            } else if(s == "*" && num%2 == 0) {
                res += 1
            }
        }
        return res
    }
}

// 1669. 合并两个链表 基础操作
 public class ListNode {
     public var val: Int
     public var next: ListNode?
     public init() { self.val = 0; self.next = nil; }
     public init(_ val: Int) { self.val = val; self.next = nil; }
     public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next; }
 }
class Solution {
    func mergeInBetween(_ list1: ListNode?, _ a: Int, _ b: Int, _ list2: ListNode?) -> ListNode? {
        guard list1 != nil, list2 != nil else {
            return nil
        }
        
        var curr1 = list1
        var curr2 = list2

        // 尾部
        for i in 0..<b {
            curr1 = curr1?.next
        }

        while curr2?.next != nil {
            curr2 = curr2?.next
        }
        
        curr2?.next = curr1?.next
        curr1?.next = nil

        // 头部
        curr1 = list1

        for i in 0..<a - 1 {
            curr1 = curr1?.next
        }

        curr1?.next = list2

        return list1
     }
}

// 2319. 判断矩阵是否是一个 X 矩阵 基础遍历
class Solution {
    func checkXMatrix(_ grid: [[Int]]) -> Bool {
        let n = grid.count
        for i in 0..<n {
            for j in 0..<n {
                if i == j || (i + j == n - 1) {
                    guard grid[i][j] != 0 else {return false}
                } else {
                    guard grid[i][j] == 0 else {return false}
                }
            }
        }
        return true
    }
}

// 2325. 解密消息 基础题
class Solution {
    func decodeMessage(_ key: String, _ message: String) -> String {
        let lowercases = [Character]("abcdefghijklmnopqrstuvwxyz")
        var map = [Character:Character]()
        var idx = 0
        for ch in key {
            guard ch != " " else {
                continue
            }
            if let _ = map[ch] {
                continue
            }
            map[ch] = lowercases[idx]
            idx += 1
            guard map.count < 26 else {break}
        }
        return  String(message.map {map[$0] ?? " "})
    }
}

// 2331. 计算布尔二叉树的值 递归
class Solution {
    func evaluateTree(_ root: TreeNode?) -> Bool {
        guard let root = root else {
            return false
        }
        
        if root.left == nil,
           root.right == nil {
            return root.val == 1
        }
        
        if root.val == 2 {
            return evaluateTree(root.left) || evaluateTree(root.right)
        }
        
        return evaluateTree(root.left) && evaluateTree(root.right)
    }
}

// 1233. 删除子文件夹 基础遍历
class Solution {
    func removeSubfolders(_ folder: [String]) -> [String] {
        guard folder.count > 0 else {
            return []
        }
        let newFolder = folder.sorted()
        var res = [String]()
        res.append(newFolder[0])
        for i in 1...(newFolder.count - 1) {
            let str1 = newFolder[i]
            let str2 = res[res.count-1]
            if !(str1 ==  str2 || str1.hasPrefix(str2 + "/")){
                res.append(newFolder[i])
            }
        }
        return res
    }
}

// 1234. 替换子串得到平衡字符串 双指针
class Solution {
    func balancedString(_ s: String) -> Int {
        var map: [Character : Int] = ["Q" : 0, "W" : 0, "E" : 0, "R" : 0], a = s.startIndex, b = s.startIndex, t = s.count / 4, m = Int.max
        for e in s { map[e]! += 1 }
        if map["Q"] == t && map["W"] == t && map["E"] == t { return 0 }
        while b < s.endIndex {
            map[s[b]]! -= 1
            s.formIndex(after: &b)
            // 直到所有字母都满足条件，不然字母过多，无法解决
            while map["Q"]! <= t && map["W"]! <= t && map["E"]! <= t && map["R"]! <= t {
                m = min(m, b.encodedOffset - a.encodedOffset)
                map[s[a]]! += 1
                s.formIndex(after: &a)
            }
        }
        return m
    }
}

// 1124. 表现良好的最长时间段 map 记录
class Solution {
    func longestWPI(_ hours: [Int]) -> Int {
        var map = [Int:Int]()
        var s = 0, res = 0
        for (i, num) in hours.enumerated() {
            s += (num > 8 ? 1 : -1)
            if (s > 0) {
                res = max(res, i + 1)
            } else if let j = map[s - 1]  {
                res = max(res,i - j)
            }
            if map[s] == nil {
                map.updateValue(i, forKey: s)
            }
        }
        return res
    }
}

// 1250. 检查「好数组」 最大公约数
class Solution {
    func isGoodArray(_ nums: [Int]) -> Bool {
        var divisor = nums[0]
        for num in nums {
            divisor = gcd(num1: divisor, num2: num)
            if divisor == 1 {
                break
            }
        }
        return divisor == 1

    }
    func gcd(num1: Int,num2: Int) -> Int {
        var n1 = num1, n2 = num2
        while(n2 != 0) {
            let temp = n1
            n1 = n2
            n2 =  temp%n2
        }
        return n1
    }
}

// 2341. 数组能形成多少数对 基础题
class Solution {
    func numberOfPairs(_ nums: [Int]) -> [Int] {
        var res = 0, map = [Int:Bool]()
        for num in nums {
            map.updateValue(!(map[num] ?? true), forKey: num)
            if map[num]! {
                 res += 1
            }
        }
        return [res, nums.count - res*2]
    }
}

// 2347. 最好的扑克手牌 基础逻辑
class Solution {
    func bestHand(_ ranks: [Int], _ suits: [Character]) -> String {
        if suits[0] == suits[1],
        suits[0] == suits[2],
        suits[0] == suits[3],
        suits[0] == suits[4] {
            return "Flush"
        }
        
        var res = "High Card"
        var map = [Int:Int]()
        
        for num in ranks {
            map.updateValue((map[num] ?? 0) + 1, forKey: num)
            if map[num] == 3 {
                res = "Three of a Kind"
                break
            } else if map[num] == 2 {
                res = "Pair"
            }
        }
        return res
    }
}

// 1326. 灌溉花园的最少水龙头数目 贪心
class Solution {
    func minTaps(_ n: Int, _ ranges: [Int]) -> Int {
        var rightMost = [Int](repeating: 0, count: n+1)
        for (i,range) in ranges.enumerated() {
            let left = max(0, i - range)
            let right = min(n, i + range)
            rightMost[left] = max(right, rightMost[left])
        }
        var last = 0, res = 0, cur = 0
        for i in 0...(n-1) {
            last = max(last, rightMost[i])
            if i == cur {
                if i == last {
                    return -1
                }
                cur = last
                res += 1
            }
        }
        return res
    }
}

// 1140. 石子游戏 II 动态规划
class Solution {
    func stoneGameII(_ piles: [Int]) -> Int {
        let len = piles.count
        var sum = 0
        var dp = [[Int]](repeating: [Int](repeating: 0, count: len + 1), count: len)
        for i in (0...(len - 1)).reversed() {
            sum += piles[i]
            for M in 1...len {
                if (i + 2*M) >= len {
                    dp[i][M] = sum
                } else {
                    for x in 1...(2*M) {
                        dp[i][M] = max(dp[i][M], sum - dp[i+x][max(M,x)])
                    }
                }
            }
        }
        return dp[0][1]
    }
}


// 1238. 循环码排列 位运算
class Solution {
    func circularPermutation(_ n: Int, _ start: Int) -> [Int] {
        var res = [Int]()
        for i in 0 ..< 1 << n {
            res.append(start ^ i ^ i >> 1)
        }
        return res 
    }
}

// 2357. 使数组中所有元素都等于零  不同数字的数目 集合
class Solution {
    func minimumOperations(_ nums: [Int]) -> Int {
        var set: Set<Int> = Set()
        for num in nums {
            if num != 0 {
                set.insert(num)
            }
        }   
            
        return set.count
    }
}

// 2363. 合并相似的物品 基础逻辑题
class Solution {
    func mergeSimilarItems(_ items1: [[Int]], _ items2: [[Int]]) -> [[Int]] {
        var map = [Int:Int]()
        for item in items1 {
            map.updateValue((map[item[0]] ?? 0) + item[1], forKey: item[0])
        }
        for item in items2 {
            map.updateValue((map[item[0]] ?? 0) + item[1], forKey: item[0])
        }
        var res = [[Int]]()
        for (key,value) in map {
            res.append([key,value])
        }
        
        return res.sorted { item1, item2 in
            return item1[0] > item2[0]
        }
    }
}

// 2373. 矩阵中的局部最大值 基础逻辑
class Solution {
    func largestLocal(_ grid: [[Int]]) -> [[Int]] {
        let n = grid.count
        var ans = [[Int]](repeating: [Int](repeating: 0, count: n - 2), count: n - 2)
        for i in 1 ..< n - 1 {
            for j in 1 ..< n - 1 {
                var maxNum = grid[i][j]
                for c in i - 1 ... i + 1 {
                    maxNum = max(maxNum, grid[c][j - 1 ... j + 1].max()!)
                }
                ans[i - 1][j - 1] = maxNum
            }
        }
        return ans
    }
}

// 1653. 使字符串平衡的最少删除次数 基础逻辑
class Solution {
    func minimumDeletions(_ s: String) -> Int {
        var leftB = 0, rightA = 0
        
        for char in s {
            if String(char) == "a" {
                rightA += 1
            }
        }
        var res = rightA
        for char in s {
            if String(char) == "a" {
                rightA -= 1
            } else {
                leftB += 1
            }
            res = min(res, leftB + rightA)
        }
        return res
    }
}

// 剑指 Offer 47. 礼物的最大价值  动态规划
class Solution {
    func maxValue(_ grid: [[Int]]) -> Int {
        var arr = [Int]()
        for (i, num)  in grid[0].enumerated() {
            arr.append(i > 0 ? (arr[i-1] + num) : num)
        }
        if grid.count > 1 {
            for i in 1...(grid.count - 1) {
                let nums = grid[i]
                for (i, num) in nums.enumerated() {
                    arr[i] = i > 0 ? (max(arr[i],arr[i-1]) + num) : (arr[i] + num)
                }
            }
        }
        
        return arr.last ?? 0
    }
}

// 2379. 得到 K 个黑块的最少涂色次数 窗口
class Solution {
    func minimumRecolors(_ blocks: String, _ k: Int) -> Int {
        var left = 0, right = 0, cnt = 0
        while right < k {
            let char = blocks[blocks.index(blocks.startIndex, offsetBy: right)]
            cnt += String(char) == "W" ? 1 : 0
            right += 1
        }
        var res = cnt
        while right < blocks.count {
            let leftChar = blocks[blocks.index(blocks.startIndex, offsetBy: left)]
            let rightChar = blocks[blocks.index(blocks.startIndex, offsetBy: right)]
            cnt += String(rightChar) == "W" ? 1 : 0
            cnt -= String(leftChar) == "W" ? 1 : 0
            res = min(res, cnt)
            right += 1
            left += 1
        }
        return res
    }
}
// 2383. 赢得比赛需要的最少训练时长 基础逻辑
class Solution {
    func minNumberOfHours(_ initialEnergy: Int, _ initialExperience: Int, _ energy: [Int], _ experience: [Int]) -> Int {
        var hours = 0
        var sum = 0
        for num in energy {
            sum += num
        }
        hours = initialEnergy > sum ? 0 : (sum - initialEnergy + 1)
        var nowExperience = initialExperience
        for num in experience {
            if nowExperience <= num {
                hours += (num - nowExperience + 1)
                nowExperience = num*2 + 1
            } else {
                nowExperience += num
            }
        }
        
        return hours
    }
}

// 1605. 给定行和列的和求可行矩阵 贪心
class Solution {
    func restoreMatrix(_ rowSum: [Int], _ colSum: [Int]) -> [[Int]] {
        var tRowSum = rowSum
        var tColSum = colSum
        // 创建数组
        var result:[[Int]] = Array(repeating: Array(repeating: 0, count: colSum.count), count: rowSum.count)
        
        for i in 0..<tRowSum.count {
            for j in 0..<tColSum.count {
                result[i][j] = min(tRowSum[i], tColSum[j])
                tRowSum[i] -= result[i][j]
                tColSum[j] -= result[i][j]
            }
        }
        return result
    }
}

// 1615. 最大网络秩 基础遍历
class Solution {
    func maximalNetworkRank(_ n: Int, _ roads: [[Int]]) -> Int {
        var graph = [Set<Int>](repeating: [], count: n)
        for road in roads {
            graph[road[0]].insert(road[1])
            graph[road[1]].insert(road[0])
        }
        var rank = 0
        for i in 0...n-2 {
            for j in i+1..<n {
                rank = max(rank, graph[i].count + graph[j].count - (graph[i].contains(j) ? 1 : 0))
            }
        }
        return rank
    }
}

// 2488. 统计中位数为 K 的子数组 问题转化
class Solution {
    func countSubarrays(_ nums: [Int], _ k: Int) -> Int {
        let n = nums.count
        var pos = 0
        while nums[pos] != k {
            pos += 1
        }
        var cnt :[Int: Int] = [:]
        cnt[0] = 1
        var c = 0
        for i in pos+1..<n {
            c += nums[i] > k ? 1: -1
            cnt[c] = ( cnt[c] ?? 0 ) + 1
        }
        var res = cnt[0]! + (cnt[1] ?? 0)
        c = 0
        for i in 0..<pos {
            let t = pos - 1 - i
            c += nums[t] < k ? 1 : -1
            res += (cnt[c] ?? 0) + (cnt[c+1] ?? 0)
        }
        return res
    }
}

// 2389. 和有限的最长子序列 二分查找
class Solution {
    func answerQueries(_ nums: [Int], _ queries: [Int]) -> [Int] {
        let sotred = nums.sorted(by:<)
        var sum = [Int]()
        var all = 0
        for num in sotred {
            all += num
            sum.append(all)
        }
        var res = [Int]()
        for querie in queries {
            var low = 0, high = sum.count
            while low < high {
                let mid  =  low + (high - low) / 2
                if sum[mid] > querie {
                    high = mid
                } else {
                    low = mid + 1
                }
            }
            res.append(low)
        }
        return res
    }
}

// 2469. 温度转换 基础逻辑
class Solution {
    func convertTemperature(_ celsius: Double) -> [Double] {
        return [celsius + 273.15, celsius * 1.80 + 32.00]
    }
}

// 1641. 统计字典序元音字符串的数目  数学题
class Solution {
    func countVowelStrings(_ n: Int) -> Int {
        return (n + 1) * (n + 2) * (n + 3) * (n + 4) / 24;
    }
}

// 1637. 两点之间不包含任何点的最宽垂直区域 排序
class Solution {
    func maxWidthOfVerticalArea(_ points: [[Int]]) -> Int {
        let newPoints = points.sorted { a, b in
            return (a[0] - b[0]) < 0
        }
        var mx = 0
        for i in 1...(newPoints.count-1) {
            mx = max(newPoints[i][0] - newPoints[i-1][0], mx)
        }
        return mx
    }
}

// 2367. 算术三元组的数目  集合数学题
class Solution {
    func arithmeticTriplets(_ nums: [Int], _ diff: Int) -> Int {
        var numsSet = Set<Int>()
        for num in nums {
            numsSet.update(with: num)
        }
        var res = 0
        for num in nums {
            if numsSet.contains(num + diff) && numsSet.contains(num + diff*2) {
                res += 1
            }
        }
        return res
    }
}

// 1053. 交换一次的先前排列 贪心
class Solution {
    func prevPermOpt1(_ arr: [Int]) -> [Int] {
        var newArr = arr
        for i in (0...(arr.count - 2)).reversed() {
            if arr[i] > arr[i+1] {
                var j = arr.count - 1
                while arr[j] >= arr[i] || (j > 0 && arr[j] == arr[j - 1]) {
                    j -= 1
                }
                newArr[i] = arr[j]
                newArr[j] = arr[i]
                break
            }
        }
        return newArr
    }
}

// 1019. 链表中的下一个更大节点 单调栈
class Solution {
    func nextLargerNodes(_ head: ListNode?) -> [Int] {
        var stack = [(Int,Int)]()
        var node = head
        var index = 0
        var result = [Int]()
        while let n = node {
            while let last = stack.last, last.0 < n.val {
                    stack.removeLast()
                    result[last.1] = n.val
            }
            stack.append((n.val,index))
            index += 1
            result.append(0)
            node = n.next
        }
        return result
    }
}

// 1041. 困于环中的机器人 基础逻辑题
class Solution {
    func isRobotBounded(_ instructions: String) -> Bool {
        let direc = [[0,1],[1,0],[0,-1],[-1,0]]
        var x = 0,y = 0,direcIndex = 0
        for instruction in instructions {
            let str = String(instruction)
            if str == "G" {
                x += direc[direcIndex][0]
                y += direc[direcIndex][1]
            } else if str  ==  "L" {
                direcIndex += 3
                direcIndex %= 4
            } else {
                direcIndex += 1
                direcIndex %= 4
            }
        }
        return direcIndex != 0 || (x == 0 && y == 0)
    }
}

// 2404. 出现最频繁的偶数元素 基础逻辑
class Solution {
    func mostFrequentEven(_ nums: [Int]) -> Int {
        var map = [Int:Int]()
        for num in nums {
            if num % 2  == 0 {
                map.updateValue((map[num] ?? 0) + 1, forKey: num)
            }
        }
        var res = -1, count = 0
        for (key, value) in map {
            if value > count || value == count &&  key < res {
                res = key
                count = value
            }
        }
        return res
    }
}

// 1023. 驼峰式匹配 双指针
class Solution {
    func camelMatch(_ queries: [String], _ pattern: String) -> [Bool] {
        var res = [Bool]()
        let arr = pattern.map{String($0)}
        for item in queries {
            var i = 0
            var itemRes = true
            for char in item  {
                let str = String(char)
                if i < pattern.count && str == arr[i] {
                    i += 1
                } else if str.uppercased() == str {
                    itemRes = false
                    break;
                }
            }
            if i < pattern.count {
                itemRes = false
            }
            res.append(itemRes)
        }
        return res
    }
}

// 2409. 统计共同度过的日子数  基础逻辑
class Solution {
    func countDaysTogether(_ arriveAlice: String, _ leaveAlice: String, _ arriveBob: String, _ leaveBob: String) -> Int {
        return max(0, min(getNum(leaveAlice),getNum(leaveBob)) - max(getNum(arriveAlice), getNum(arriveBob)) + 1)
    }
    func getNum(_ time: String) -> Int {
        let arr = time.components(separatedBy: "-")
        guard arr.count == 2 else {
            return 0
        }
        var res = Int(arr[1]) ?? 0
        let datesOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let num  = Int(arr[0]) ?? 0
        var i = 0
        while i < (num - 1) {
            res += datesOfMonths[i]
            i += 1
        }
        return res
    }
}

// 1026. 节点与其祖先之间的最大差值 递归
class Solution {
    func maxAncestorDiff(_ root: TreeNode?) -> Int {
        return dfs(root: root, mi: root?.val ?? 0, ma: root?.val ?? 0)
    }
    func dfs(root: TreeNode?, mi:Int, ma:Int) -> Int {
        guard let node = root else {
            return 0
        }
        var diff = max(abs(node.val - mi),abs(node.val - ma))
        let nmi = min(mi, node.val)
        let nma = max(ma, node.val)
        diff = max(diff, dfs(root: node.left, mi: nmi, ma: nma))
        diff = max(diff, dfs(root: node.right, mi: nmi, ma: nma))
        return diff
    }
}

// 2413. 最小偶倍数 数学题
class Solution {
    func smallestEvenMultiple(_ n: Int) -> Int {
        return (n & 0b1) == 1 ? 2 * n : n;
    }
}

// 1105. 填充书架 动态规划
class Solution {
    func minHeightShelves(_ books: [[Int]], _ shelfWidth: Int) -> Int {
        let num = books.count
        var dp = Array(repeating: 1000000, count: num + 1)
        dp[0] = 0
        for i in 0...(num-1) {
            var maxHeight = 0, curWidth = 0
            for j in (0...i).reversed() {
                curWidth += books[j][0]
                if curWidth > shelfWidth {
                    break
                }
                maxHeight = max(maxHeight, books[j][1])
                dp[i+1] = min(dp[i+1],dp[j] + maxHeight)
            }
        }
        return dp[num]
    }
}

// 2418. 按身高排序 基础逻辑
class Solution {
    func sortPeople(_ names: [String], _ heights: [Int]) -> [String] {
        var map = [Int: String]()
        for i in names.indices {
            map[heights[i]] = names[i]
        }
        let h = heights.sorted(by: >)
        var ans = [String]()
        for n in h {
            ans.append(map[n]!)
        }
        return ans
    }
}

// 1003. 检查替换后的词是否有效 栈 
class Solution {
    func isValid(_ s: String) -> Bool {
        if s.count < 3 || s.count%3 != 0 {
            return false
        }
        var stack = [Character]()
        for c in s {
            if c == "c" && stack.count >= 2{
                if stack[stack.count - 1] == "b" && stack[stack.count - 2] == "a" {
                    stack.removeLast()
                    stack.removeLast()
                } else {
                    stack.append(c)
                }
            } else {
                stack.append(c)
            }
        }
        if  stack.count == 0 {
            return true
        }
        return false
    }
}

// 2432. 处理用时最长的那个任务的员工  基础逻辑
class Solution {
    func hardestWorker(_ n: Int, _ logs: [[Int]]) -> Int {
        var ans = logs[0][0], maxCost = logs[0][1]
        for i in 1...(logs.count - 1) {
            let idx = logs[i][0], cost = logs[i][1] - logs[i - 1][1]
            if(cost > maxCost || (cost == maxCost && idx < ans)) {
                ans = idx
                maxCost = cost
            }
        }
        return ans
    }
}

// 1419. 数青蛙 基础逻辑
class Solution {
    func minNumberOfFrogs(_ croakOfFrogs: String) -> Int {
        guard croakOfFrogs.count % 5 == 0 else {
            return -1
        }
        var res = 0,frogNum = 0
        var cnt = [0,0,0,0]
        let map = ["c":0,"r":1,"o":2,"a":3,"k":4]
        for c in croakOfFrogs {
            let str =  String(c)
            if map[str] == nil {
                return -1
            }
            let num = map[str]!
            if num == 0 {
                cnt[num] += 1
                frogNum += 1;
                res = max(frogNum, res)
            } else {
                if cnt[num - 1] == 0 {
                    return -1
                }
                cnt[num - 1] -= 1
                if num == 4 {
                    frogNum -= 1
                }else {
                    cnt[num] += 1
                }
            }
        }
        return frogNum > 0 ? -1 : res
    }
}

// 1010. 总持续时间可被 60 整除的歌曲 基础逻辑
class Solution {
    func numPairsDivisibleBy60(_ time: [Int]) -> Int {
        var dic = [Int: Int]()
        var result = 0

        for song in time {
            let sMod = song % 60
            if let exist = dic[sMod] {
                result += exist
            }
            let pairMod = sMod == 0 ? 0 : 60 - sMod
            dic[pairMod, default: 0] += 1
        }
        return result 
    }
}

// 1015. 可被 K 整除的最小整数 基础逻辑
class Solution {
    func smallestRepunitDivByK(_ k: Int) -> Int {
        // 如果 k 是偶数或者是 5 的倍数，则无法整除，直接返回 -1
        if (k % 2 == 0 || k % 5 == 0) {
            return -1;
        }
        var resid = 1 % k, len = 1;
        while (resid != 0) {
            resid = (resid * 10 + 1) % k;
            len += 1;
        }
        return len
    }
}

// 1016. 子串能表示从 1 到 N 数字的二进制串 暴力破解
class Solution {
    func queryString(_ S: String, _ N: Int) -> Bool {
        for n in 1...N {
            if !S.contains(String(n, radix: 2)){
                return false
            }
        }
        return true
    }
}

// 1072. 按列翻转得到最大值等行数  找寻相同的本质行数
class Solution {
    func maxEqualRowsAfterFlips(_ matrix: [[Int]]) -> Int {
        var map = [String: Int](),res = 0
        for item in matrix {
            var key = "", isOne = true
            for i in 0...(item.count - 1) {
                if i == 0 && item[i] == 0 {
                    isOne = false
                }
                key = key + ((isOne && item[i] == 1 || !isOne && item[i] == 0) ? "1" : "0")
            }
            let vaule = (map[key] ?? 0) + 1
            res = max(res, vaule)
            map.updateValue(vaule, forKey: key)
        }
        return res
    }
}

// 2441. 与对应负数同时存在的最大正整数 基础题
class Solution {
    func findMaxK(_ nums: [Int]) -> Int {
        var dic = [Int: Int]()
        var set = Set<Int>.init()
        var res = -1
        for e in nums {
            if set.contains(e) {
                res = max(abs(e), res)
            } else {
                set.insert(-e)
            }
        }
        return res
    }
}

// 2446. 判断两个事件是否存在冲突 基础逻辑
class Solution {
    func haveConflict(_ event1: [String], _ event2: [String]) -> Bool {
       return !(event1[1] < event2[0] || event2[1] < event1[0]);
    }
}

// 1073. 负二进制数相加 基础逻辑
class Solution {
    func addNegabinary(_ arr1: [Int], _ arr2: [Int]) -> [Int] {
        var arr1 = [Int](arr1.reversed())
        var arr2 = [Int](arr2.reversed())
        var result:[Int] = [Int]()
        var carry:Int = 0
        var i:Int = 0
        while(i < arr1.count || i < arr2.count || carry != 0)
        {
            let num1:Int = i < arr1.count ? arr1[i] : 0
            let num2:Int = i < arr2.count ? arr2[i] : 0
            let x:Int =  num1 + num2 + carry
            result.append((x + 2) % 2)
            carry = (x - result.last!) / -2
            i += 1
        }
        while(result.count > 1 && result.last! == 0)
        {
            result.removeLast()
        }
        return result.reversed()
    }
}

//1080. 根到叶路径上的不足节点 深度优先搜索
class Solution {
    func sufficientSubset(_ root: TreeNode?, _ limit: Int) -> TreeNode? {
        let haveSufficient = checkSufficientLeaf(root, limit, 0);
        return haveSufficient ? root : nil
    }
    
    func checkSufficientLeaf(_ root: TreeNode?, _ limit: Int, _ sum: Int) -> Bool {
        guard let item = root else {
            return false
        }
        if (item.left == nil && item.right == nil) {
            return (item.val + sum) >= limit
        }
        let haveLeft = checkSufficientLeaf(item.left, limit, item.val + sum)
        if !haveLeft {
            item.left = nil
        }
        
        let haveRight = checkSufficientLeaf(item.right, limit, item.val + sum)
        if !haveRight {
            item.right = nil
        }
        return haveLeft || haveRight
    }
}

// 1090. 受标签影响的最大值 排序
class Solution {
    func largestValsFromLabels(_ values: [Int], _ labels: [Int], _ numWanted: Int, _ useLimit: Int) -> Int {
        let idx = [Int](0...(values.count - 1)).sorted { a, b in
            values[a] - values[b] > 0
        }
        var ans = 0, map = [Int:Int](), choose = 0
        for i in 0...(values.count - 1) {
            let label = labels[idx[i]]
            if map[label] ?? 0 == useLimit {
                continue
            }
            choose += 1
            ans += values[idx[i]]
            map.updateValue((map[label] ?? 0) + 1, forKey: label)
            if choose == numWanted {
                break
            }
        }
        return ans
    }
}

// 2451. 差值数组不同的字符串  基础比对
class Solution {
    func oddString(_ words: [String]) -> String {
        let diff0 = diffStr(words[0])
        let diff1 = diffStr(words[1])
        if diff0 == diff1 {
            for i in 2...(words.count - 1) {
                if diff0 != diffStr(words[i]) {
                    return words[i]
                }
            }
        }
        return diff0 == diffStr(words[2]) ? words[1] : words[0]
    }
    func diffStr(_ str: String) -> String {
        var diff = [String]()
        for i in 1...(str.count - 1)  {
            let last = Int(str[str.index(str.startIndex, offsetBy: i - 1)].asciiValue ?? 0)
            let now = Int(str[str.index(str.startIndex, offsetBy: i)].asciiValue ?? 0)
            diff.append(String(now - last) + ",")
        }
        return diff.joined()
    }
}
// 1091. 二进制矩阵中的最短路径 广度优先搜索 
class Solution {
    func shortestPathBinaryMatrix(_ grid: [[Int]]) -> Int {
        let directions = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[-1,1],[1,-1],[-1,-1]], m = grid.count-1, n = grid[0].count-1
        var visited = grid, que = [[0,0,1]], i = 0

        while i >= 0, i < que.count {
            let v = que[i]

            if visited[v[0]][v[1]] == 0 {
                visited[v[0]][v[1]] = 1
                
                if v[0] == m, v[1] == n {
                    return v[2]
                }

                for d in directions {
                    let nv = [v[0]+d[0], v[1]+d[1]]
                    if nv[0] >= 0, nv[1] >= 0, nv[0] <= m, nv[1] <= n, visited[nv[0]][nv[1]] == 0 {
                        que.append(nv + [v[2]+1])
                    }
                }
            }
            i+=1
        }

        return -1
    }
}

// 2455. 可被三整除的偶数的平均值 基本逻辑
class Solution {
    func averageValue(_ nums: [Int]) -> Int {
        var total = 0;
        var k = 0;
        for num in nums {
            if (num % 6 == 0) {
                total += num;
                k += 1;
            }
        }
        return k > 0 ? Int(total / k) : 0
    }
}

// 1110. 删点成林 遍历
class Solution {
    func delNodes(_ root: TreeNode?, _ to_delete: [Int]) -> [TreeNode?] {
        var result = [TreeNode?]()
        delNodesHelper(root, to_delete, &result, false)
        return result
    }
    func delNodesHelper(_ root: TreeNode?, _ to_delete: [Int],_ result: inout [TreeNode?],_ boolDel: Bool) -> Bool{
        var del = false
        guard let root = root else { return del }
        del = to_delete.contains(root.val)
        if delNodesHelper(root.left, to_delete, &result, !del) {
            root.left = nil
        }
        if delNodesHelper(root.right, to_delete, &result, !del) {
            root.right = nil
        }
        if !del && !boolDel {
            result.append(root)
        }
        return del
    }
}

// 1130. 叶值的最小代价生成树 数学逻辑
class Solution {
    func mctFromLeafValues(_ arr: [Int]) -> Int {
        var res = 0
        var stack = [Int]()
        for num in arr  {
            while(stack.count > 0 && stack[stack.count - 1] < num) {
                let y = stack.popLast()!
                if stack.count == 0 || stack[stack.count - 1] > num {
                    res += y*num
                } else {
                    res += stack[stack.count - 1]*y
                }
            }
            stack.append(num)
        }
        while stack.count >= 2 {
            let num = stack.popLast()!
            res += stack[stack.count - 1]*num
        }
        return res
    }
}

//  2517. 礼盒的最大甜蜜度 贪心+二分查找
class Solution {
    private func check(_ sortedPrice: [Int], _ k: Int, _ tastiness: Int) -> Bool {
        var prev = Int.min / 2
        var count = 0
        
        for price in sortedPrice {
            if price - prev >= tastiness {
                count += 1
                prev = price
            }
        }
        
        return count >= k
    }
    
    func maximumTastiness(_ price: [Int], _ k: Int) -> Int {
        let sortedPrice = price.sorted()
        
        var left: Int = 0
        var right = sortedPrice.last! - sortedPrice.first!
        
        while left < right {
            let tastiness = (left + right + 1) / 2
            if self.check(sortedPrice, k, tastiness) {
                left = tastiness
            } else {
                right = tastiness - 1
            }
        }
        
        return left
    }
}

// 2559. 统计范围内的元音字符串数 基础逻辑
class Solution {
    func vowelStrings(_ words: [String], _ queries: [[Int]]) -> [Int] {
        var sum = [Int](repeating: 0, count: words.count + 1)
        var res = [Int]()
        for i in 0...(words.count - 1) {
            let value = isVowelString(words[i]) ? 1 : 0
            sum[i+1] = sum[i] + value
        }
        for i in 0...(queries.count - 1) {
            res.append(sum[queries[i][1]+1] - sum[queries[i][0]])
        }
        return res
    }
    func isVowelString(_ word: String) -> Bool {
        return isVowelLetter(String(word[word.startIndex])) && isVowelLetter(String(word[word.index(before: word.endIndex)]))
    }
    
    func isVowelLetter(_ str: String) -> Bool {
        return str == "a" || str == "e" || str == "i" || str == "o" || str == "u";
    }
}

// 2460. 对数组执行操作 基础逻辑
class Solution {
    func applyOperations(_ nums: [Int]) -> [Int] {
        var vNums = nums
        vNums.append(0)
        var res = [Int](repeating: 0, count: nums.count)
        var j = 0
        for i in 0...(vNums.count - 2) {
             var num = vNums[i]
            if vNums[i] == vNums[i + 1] {
                num = num*2
                vNums[i+1] = 0
            }
            if num > 0 {
                res[j] = num
                j += 1
            }
            
        }
        return res
    }
}

// 2352. 相等行列对 map 映射
class Solution {
    func equalPairs(_ grid: [[Int]]) -> Int {
        var map = [String:Int]()
        var res = 0
        for nums in grid {
            var str = ""
            for num in nums {
                str += (String(num) + ",")
            }
            map.updateValue((map[str] ?? 0) + 1, forKey: str)
        }
        for i in 0...(grid[0].count - 1) {
            var str = ""
            for j in 0...(grid.count - 1) {
                str += (String(grid[j][i]) + ",")
            }
            res += (map[str] ?? 0)
        }
        return res
    }
}

// 2611. 老鼠和奶酪 贪心
class Solution {
    func miceAndCheese(_ reward1: [Int], _ reward2: [Int], _ k: Int) -> Int {
      
        var ans = 0
        var diffs = [Int]()
        for i in 0...(reward1.count - 1) {
            ans += reward2[i]
            diffs.append(reward1[i] -  reward2[i])
        }
        diffs = diffs.sorted()
        if k > 0 {
            for i in 0...(k-1) {
                ans += diffs[diffs.count - 1 - i]
            }
        }
        
        return ans
    }
}

// 1375. 二进制字符串前缀一致的次数 脑筋急转弯
class Solution {
    func numTimesAllBlue(_ flips: [Int]) -> Int {
        var ans = 0 ,right = 0
        for i in 0...(flips.count - 1) {
            right = max(right, flips[i])
            if right == (i + 1) {
                ans += 1
            }
        }
        return ans
    }
}

//  1262. 可被三整除的最大和 动态规划
class Solution {
    func maxSumDivThree(_ nums: [Int]) -> Int {
        var result = [Int](repeating: 0, count: 3)
        for i in 0..<nums.count {
            //累加元素持续求和
            let a = result[0] + nums[i]
            let b = result[1] + nums[i]
            let c = result[2] + nums[i]
            result[a%3] = max(result[a%3], a)
            result[b%3] = max(result[b%3], b)
            result[c%3] = max(result[c%3], c)
        }
        return result[0]
    }
}

// 1401. 圆和矩形是否有重叠  
class Solution {
    func checkOverlap(_ radius: Int, _ x_center: Int, _ y_center: Int, _ x1: Int, _ y1: Int, _ x2: Int, _ y2: Int) -> Bool {
        let dx = x1 > x_center ? x1 - x_center : x2 < x_center ? x_center - x2 : 0;
        let dy = y1 > y_center ? y1 - y_center : y2 < y_center ? y_center - y2 : 0;
        return dx * dx + dy * dy <= radius * radius;
    }
}

// 2485. 找出中枢整数 数学题
class Solution {
    func pivotInteger(_ n: Int) -> Int {
        let t = (n*n + n)/2
        let x =  Int(sqrt(Double(t)))
        if x * x == t {
            return x
        }
        return -1
    }
}

// 1186. 删除一次得到子数组最大和 动态规划
class Solution {
    func maximumSum(_ arr: [Int]) -> Int {
        guard arr.count > 1 else {
            return arr[0]
        }
        var dp0 = arr[0], dp1 = 0, res = arr[0]
        for i in 1...(arr.count - 1) {
            dp1 = max(dp0, dp1 + arr[i])
            dp0 = max(dp0, 0) + arr[i]
            res = max(res, max(dp0, dp1))
        }
        return res
    }
}

// 1253. 重构 2 行二进制矩阵 基础逻辑
class Solution {
    func reconstructMatrix(_ upper: Int, _ lower: Int, _ colsum: [Int]) -> [[Int]] {
        var sum = 0
        var twoNum = 0
        for num in colsum {
            sum += num
            if num == 2 {
                twoNum += 1
            }
        }
        guard sum == (upper +  lower), min(upper, lower) >= twoNum else {
            return []
        }
        var res = [[Int]](repeating: [Int](repeating: 0, count: colsum.count), count: 2)
        var nUpper = upper - twoNum
        var nLower = lower - twoNum
        for i in 0...(colsum.count - 1) {
            if colsum[i] == 2 {
                res[0][i] = 1
                res[1][i] = 1
            } else if colsum[i] == 1 {
                if nUpper > 0 {
                    res[0][i] = 1
                    nUpper -= 1
                } else {
                    res[1][i] = 1
                    nLower -= 1
                }
            }
        }
        
        return res
    }
}

// 445. 两数相加 II 栈
class Solution {
   
    func addTwoNumbers(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {
 
      var stack1 = [Int]()
      var stack2 = [Int]()
    
      var l1 = l1
      var l2 = l2
      while l1 != nil {
        stack1.append(l1!.val)
        l1 = l1!.next
      }
    
      while l2 != nil {
        stack2.append(l2!.val)
        l2 = l2!.next
      }
      var carry = 0
      var resNode:ListNode? = nil
    
      while !stack1.isEmpty || !stack2.isEmpty || carry != 0 {
       var tempNumber = carry
       if !stack1.isEmpty {
         tempNumber += stack1.popLast()!
       }
       if !stack2.isEmpty {
         tempNumber += stack2.popLast()!
       }
       
       carry = tempNumber / 10
       tempNumber = tempNumber % 10
       let currentNode = ListNode.init(tempNumber)
       currentNode.next = resNode
       resNode = currentNode
      }
      return resNode
    }
}

// 2679. 矩阵中的和 排序
class Solution {
    func matrixSum(_ nums: [[Int]]) -> Int {
        let newNums = nums.map { items in
            items.sorted()
        }
        var res = 0
        for j in (0...(newNums[0].count - 1)) {
            var num = 0
            for i in (0...(newNums.count - 1)) {
                num = max(num, newNums[i][j])
            }
            res += num
        }
        return res
    }
}

// 2600. K 件物品的最大和 贪心
class Solution {
    func kItemsWithMaximumSum(_ numOnes: Int, _ numZeros: Int, _ numNegOnes: Int, _ k: Int) -> Int {
        if k <= numOnes  {
            return k
        } else if k <= (numOnes + numZeros) {
            return numOnes
        } else {
            return numOnes - (k - numOnes - numZeros)
        }
    }
}

// 2178. 拆分成最多数目的正偶数之和 贪心
class Solution {
    func maximumEvenSplit(_ finalSum: Int) -> [Int] {
        var res = [Int]()
        guard finalSum % 2 == 0 else {
            return res
        }
        var newSum = finalSum
        var num = 2
        while (newSum >= num) {
            res.append(num)
            newSum -= num
            num += 2
        }
        res[res.count - 1] += newSum
        return res
        
    }
}

//  16. 最接近的三数之和 双指针
class Solution {
    func threeSumClosest(_ nums: [Int], _ target: Int) -> Int {
        guard nums.count >= 3 else { return 0 }

        var best = nums[0] + nums[1] + nums[2]

        //排序
        let newNums = nums.sorted { value1, value2 in
            return value1 < value2
        }
        for (index, item) in newNums.enumerated() {
            var left = index + 1
            var right = newNums.count - 1
            
            while left < right {
                let sum = newNums[left] + newNums[right] + item

                if sum == target {
                    return target
                }

                if abs(sum - target) < abs(best - target) {
                    best = sum
                }
                
                if sum > target {
                    right -= 1
                } else {
                    left += 1
                }
            }
        }
        return best
    }
}

// 2544. 交替数字和 基础题
class Solution {
    func alternateDigitSum(_ n: Int) -> Int {
        var res = 0, sign = 1, newN = n
        while (newN > 0) {
            res += newN % 10 * sign
            sign = -sign
            newN /= 10
        }
        res = res * -sign
        return res
    }
}

// 931. 下降路径最小和 动态规划
class Solution {
    func minFallingPathSum(_ matrix: [[Int]]) -> Int {
        let length = matrix.count
        var sums = [[Int]](repeating: [Int](repeating: 0, count: length), count: 2)
        sums[0] = matrix[0]
        var result = Int.max
        for row in 1..<length {
            for col in 0..<length {
                var minSum = sums[(row - 1) & 1][col]
                if col + 1 < length {
                    minSum = min(minSum, sums[(row - 1) & 1][col + 1])
                }
                if col > 0 {
                    minSum = min(minSum, sums[(row - 1) & 1][col - 1])
                }
                sums[row & 1][col] = minSum + matrix[row][col]
                if row == length - 1 { // 最后一行顺便求一下结果
                    result = min(result, sums[row & 1][col])
                }
            }
        }
        return length == 1 ? matrix[0][0] : result
    }
}

// 979. 在二叉树中分配硬币 深度优先搜索
class Solution {
    func distributeCoins(_ root: TreeNode?) -> Int {
        var result = 0
        dfs(root,&result)
        return result
    }
    func dfs(_ root: TreeNode?,_ result:inout Int) -> Int {
        guard let root = root else { return 0 }
        
        let left = dfs(root.left,&result)
        let right = dfs(root.right,&result)
        result += (abs(left) + abs(right))
        return root.val + left + right - 1
        
    }
}

// 415. 字符串相加 模拟
class Solution {
    func addStrings(_ num1: String, _ num2: String) -> String {
        var arr1 = num1.map{ String($0) }
        var arr2 = num2.map{ String($0) }
        arr2 = arr2.reversed()
        arr1 = arr1.reversed()
        
        let count = max(arr1.count, arr2.count)
        var carry = 0
        var res = [Int]()
        
        print(arr2)
        for i in 0..<count {
            let a1 = (i < arr1.count) ? Int(arr1[i])! : 0
            let a2 = (i < arr2.count) ? Int(arr2[i])! : 0
            let sum = a1 + a2 + carry
            res.append(sum % 10)
            carry = sum / 10
        }
        
        if carry > 0 {
            res.append(carry)
        }
        
        var str = ""
        for num in res.reversed() {
            str += "\(num)"
        }
        
        return str

    }
}

// 918. 环形子数组的最大和 动态规划
class Solution 
{
    func maxSubarraySumCircular(_ nums: [Int]) -> Int 
    {
        var totalSum = 0, maxSum = nums[0], currentMaxSum = 0, minSum = nums[0], currentMinSum = 0
        // 遍历nums数组
        nums.forEach { num in 
            // 求最大子数组之和，即题目子数组最大和的解法
            currentMaxSum = max(currentMaxSum + num, num)
            maxSum = max(maxSum, currentMaxSum)
            // 求最小子数组之和
            currentMinSum = min(currentMinSum + num, num)
            minSum = min(minSum, currentMinSum)
            totalSum += num
        }
        // 判断——maxSum是否为负数。如果为负数，则直接输出maxSum，因为minSum就是整个数组之和
        return maxSum > 0 ? max(maxSum, totalSum - minSum) : maxSum
    }
}

// 1499. 满足不等式的最大值  栈
class Solution {
    func findMaxValueOfEquation(_ points: [[Int]], _ k: Int) -> Int {
        var res = Int.min
        var queue = [(Int,Int)]()
        for point in points {
            let x = point[0], y = point[1];
            while(queue.count != 0 && x - queue[0].1 > k) {
                queue.removeFirst()
            }
            if (queue.count != 0) {
                res = max(res, x + y + queue[0].0)
            }
            while(queue.count != 0 && y - x > queue[queue.count - 1].0) {
                queue.removeLast()
            }
            queue.append((y - x, x))
        }
        return res
    }
}

// 860. 柠檬水找零 基础逻辑
class Solution {
    func lemonadeChange(_ bills: [Int]) -> Bool {
        var five = 0, ten = 0

        for item in bills {
            if item == 5 {
                five += 1
            }
            if item == 10 {
                if five <= 0 { return false }
                five -= 1
                ten += 1
            }

            if item == 20 {
                if ten > 0 && five > 0{
                    ten -= 1
                    five -= 1
                }else if five >= 3 {
                    five -= 3
                }else {
                    return false
                }
            }
        }
        return true
    }
}

// 771. 宝石与石头 基础逻辑题
class Solution {
    func numJewelsInStones(_ jewels: String, _ stones: String) -> Int {
        var dict = [Character: Bool]()
        var result = 0
        for c in jewels {
            dict[c] = true
        }
        for c in stones {
            if dict[c] == true {
                result += 1
            }
        }
        return result
    }
}

// 2208. 将数组和减半的最少操作次数 二分查找
class Solution {
    func halveArray(_ nums: [Int]) -> Int {
        var changeNum = nums.map { num in
            Double(num)
        }.sorted()
        let sum = Double(nums.reduce(0, +)) / 2.0
        var res = 0
        var subSum = 0.0
        // 如果最小数大于最大数一半  那肯定是 数组长度次数
        if (changeNum[0] > changeNum[changeNum.count - 1] / 2.0) {
            return changeNum.count
        }
        
        while(subSum < sum) {
            let num = changeNum.removeLast() / 2.0
            subSum += num
            res += 1
            
            // 这里需要通过二分插入数据
            var l = 0
            var r = changeNum.count - 1
            while l < r {
                let i = (l + r) / 2
                if changeNum[i] < num {
                    l = i + 1
                } else {
                    r = i
                }
            }
            if changeNum.count > 0 && changeNum[l] < num {
                l += 1
            }
            changeNum.insert(num, at: l)
        }
        return res
    }
}

// 2500. 删除每行中的最大值 排序遍历
class Solution {
    func deleteGreatestValue(_ grid: [[Int]]) -> Int {
        let newGrid = grid.map { nums in
            return nums.sorted()
        }
        var res = 0
        for j in 0...(newGrid[0].count - 1) {
            var maxNum = 0
            for i in 0...(newGrid.count - 1) {
                maxNum = max(newGrid[i][j], maxNum)
            }
            res += maxNum
        }
        return res
    }
}

// 143. 重排链表
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init() { self.val = 0; self.next = nil; }
 *     public init(_ val: Int) { self.val = val; self.next = nil; }
 *     public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next; }
 * }
 */
class Solution {
    func reorderList(_ head: ListNode?) {
        if head == nil || head?.next == nil{
            return
        }
        var slowNode = head
        var fastNode = head
        //先快慢指针找到中间指针
        while fastNode != nil && fastNode?.next != nil {
            fastNode = fastNode?.next?.next
            slowNode = slowNode?.next
        }
        
        //再将后半部分的链表反转
        var reveNode = slowNode?.next
        var pre:ListNode? = nil
        slowNode?.next = nil
        
        while reveNode != nil {
            let val = reveNode!.val
            let node = ListNode.init(val)
            node.next = pre
            pre = node
            reveNode = reveNode?.next
        }
        var newNode = head
        while newNode != nil && pre != nil {
            let temp = pre
            pre = pre?.next
            temp?.next = newNode?.next
            newNode?.next = temp
            newNode = newNode?.next?.next
        }
    }
}

// 2681. 英雄的力量 动态规划
class Solution {
    func sumOfPower(_ nums: [Int]) -> Int {
        let mod = Int(1e9 + 7)
        var dp = 0, pre_sum = 0,res  = 0
        for num in nums.sorted() {
            dp = (num + pre_sum) % mod
            pre_sum = (dp + pre_sum) % mod
            res = (res +  num * num % mod * dp % mod) % mod
        }
        return res
    }
}

// 822. 翻转卡片游戏 基础逻辑
class Solution {
    func flipgame(_ fronts: [Int], _ backs: [Int]) -> Int {
        var same = Set<Int>()
        for i in 0...(fronts.count - 1) {
            if fronts[i] ==  backs[i] {
                same.update(with: fronts[i])
            }
        }
        var res = 3000
        for i in 0...(fronts.count - 1) {
            let front = fronts[i]
            let back = backs[i]
            if front < res && !same.contains(front){
                res = front
            }
            if back < res && !same.contains(back){
                res = back
            }
        }
        return res % 3000
    }
}
// 722. 删除注释 基础逻辑
class Solution {
    func removeComments(_ source: [String]) -> [String] {
        //合并成一个 字符串
        var sourceCode = ""
        for s in source {
            sourceCode += s
            // "#" : 作为原始分行的结尾
            sourceCode += "#"
        }
        var sourceCodeWithoutComments = ""
        while !sourceCode.isEmpty {
            if sourceCode.hasPrefix("//") {
                sourceCode.removeFirst(2)
                while !sourceCode.hasPrefix("#") {
                    sourceCode.removeFirst()
                }
            } else if sourceCode.hasPrefix("/*") {
                sourceCode.removeFirst(2)
                while !sourceCode.hasPrefix("*/") {
                    sourceCode.removeFirst()
                }
                sourceCode.removeFirst(2)
            } else {
                sourceCodeWithoutComments.append(sourceCode.removeFirst())
            }
        }
        //拆分成不同的行
        let lines = sourceCodeWithoutComments.split(separator: "#")
        var ans =  [String]()
        for line in lines {
            if  !line.isEmpty {
                ans.append(String(line))
            }
        }
        return ans
    }
}

// 344. 反转字符串 双指针 - 元组
class Solution {
    func reverseString(_ s: inout [Character]) {
        var l = 0;
        var r = s.count - 1;
        while l < r {
            (s[l], s[r]) = (s[r], s[l])
            l += 1
            r -= 1
        }
    }
}

// 1749. 任意子数组和的绝对值的最大值  动态规划
class Solution {
    func maxAbsoluteSum(_ nums: [Int]) -> Int {
        var positiveMax = 0, negativeMin = 0
        var positiveSum = 0, negativeSum = 0
        for num in nums {
            positiveSum += num
            positiveMax = max(positiveMax, positiveSum)
            positiveSum = max(0, positiveSum)
            negativeSum += num
            negativeMin = min(negativeMin, negativeSum)
            negativeSum = min(0, negativeSum)

        }
        
        return max(positiveMax, -negativeMin)
    }
}

// 1281. 整数的各位积和之差 基础题
class Solution {
    func subtractProductAndSum(_ n: Int) -> Int {
        var m = 1, s = 0, num = n
        while num > 0 {
            let x = num % 10
            num = num / 10
            m *= x
            s += x
        }
        return m - s
    }
}

// 1289. 下降路径最小和 II 动态规划
class Solution {
    func minFallingPathSum(_ grid: [[Int]]) -> Int {
        let n  = grid.count
        var fmin = 0, smin = 0, findx = -1
        for i in 0...(n - 1) {
            var nfmin = Int.max, nsmin = Int.max, nfindex = -1
            for j in 0...(n - 1) {
               var nsum =  grid[i][j]
                if j != findx {
                    nsum += fmin
                } else {
                    nsum += smin
                }
                if nsum < nfmin {
                    nsmin = nfmin
                    nfmin = nsum
                    nfindex = j
                } else if  nsum < nsmin {
                    nsmin = nsum
                }
            }
            fmin = nfmin
            smin = nsmin
            findx = nfindex
        }
        
        return fmin
    }
}

// 617. 合并二叉树 递归
class Solution {
    func mergeTrees(_ root1: TreeNode?, _ root2: TreeNode?) -> TreeNode? {
        if root1 == nil {
            return root2
        }

        if root2 == nil {
            return root1
        }

        var mergeNode = TreeNode(root1!.val + root2!.val)
        mergeNode.left = mergeTrees(root1!.left, root2!.left)
        mergeNode.right = mergeTrees(root1!.right, root2!.right)

        return mergeNode
    }
}

// 833. 字符串中的查找与替换 映射基础逻辑
class Solution {
    func findReplaceString(_ s: String, _ indices: [Int], _ sources: [String], _ targets: [String]) -> String {
        var ops = [Int:Int]()
        for i in 0...(indices.count - 1) {
            ops.updateValue(i, forKey: indices[i])
        }
        var i = 0, res = ""
        while i < s.count {
            if let j = ops[i] {
                let source = sources[j]
                let range = s.index(s.startIndex, offsetBy: i)...s.index(s.startIndex, offsetBy: i + source.count - 1)
                if s[range] == source {
                    res += targets[j]
                    i += source.count
                    continue
                }
            }
            res += String(s[s.index(s.startIndex, offsetBy: i)])
            i += 1
        }
    
        return res
    }
}

// 2682. 找出转圈游戏输家  基础模拟
class Solution {
    func circularGameLosers(_ n: Int, _ k: Int) -> [Int] {
        var map = [Int: Bool]()
        var j = 0, i = k
        while (map[j] == nil) {
            map.updateValue(true, forKey: j)
            j = (j + i) % n
            i += k
        }
        var res = [Int]()
        for i in 0...(n - 1) {
            if map[i] == nil {
                res.append(i + 1)
            }
        }
        return res
    }
}

// 849. 到最近的人的最大距离 双指针
class Solution {
    func maxDistToClosest(_ seats: [Int]) -> Int {
        var res = 0, l = 0
        while(l < seats.count && seats[l] == 0) {
            l += 1
        }
        res = max(res, l)
        while (l < seats.count) {
            var r = l + 1
            while(r < seats.count && seats[r] == 0) {
                r += 1
            }
            if r == seats.count {
                res = max(res, r - l - 1)
            } else {
                res = max(res, Int((r - l) / 2))
            }
            l = r
        }
        return res
        
    }
}

// 1267. 统计参与通信的服务器 基础逻辑
class Solution {
    func countServers(_ grid: [[Int]]) -> Int {
        var rows = [Int: Int]()
        var cols = [Int: Int]()
        for i in  0...(grid.count - 1) {
            for j in 0...(grid[i].count - 1) {
                if grid[i][j] == 1 {
                    rows.updateValue((rows[i] ?? 0) + 1, forKey: i)
                    cols.updateValue((cols[j] ?? 0) + 1, forKey: j)
                }
            }
        }
        var res = 0
        for i in  0...(grid.count - 1) {
            for j in 0...(grid[i].count - 1) {
                if grid[i][j] == 1 && ((rows[i] ?? 0) > 1 || (cols[j] ?? 0) > 1) {
                    res += 1
                }
            }
        }
        return res
    }
}
//1448. 统计二叉树中好节点的数目 深度遍历
class Solution {
    var res = 0

    func goodNodes(_ root: TreeNode?) -> Int {
        dfs(root, root!.val)
        return res
    }

    func dfs(_ root: TreeNode?, _ max: Int) {
        guard let root = root else { return }

        var max = max
        if root.val >= max {
            res += 1
            max = root.val
        }
        dfs(root.left, max)
        dfs(root.right, max)
    }
}

// 57. 插入区间 基础逻辑
class Solution {
    func insert(_ intervals: [[Int]], _ newInterval: [Int]) -> [[Int]] {
        var results = [[Int]]()
        var left = newInterval[0], right = newInterval[1]
        var overlap = false
        
        for interval in intervals {
            if interval[0] > right {
                // 情形一
                if !overlap {
                    results.append([left, right])
                    overlap = true
                }
                
                results.append(interval)
            } else if interval[1] < left {
                // 情形二
                results.append(interval)
            } else {
                // 情形三：有重叠区间
                left = min(interval[0], left)
                right = max(interval[1], right)
            }
        }
        
        // 如果遍历完overlap仍为false，说明没有重叠区间，把新区间直接加到结果中
        if !overlap {
            results.append([left, right])
        }
        
        return results
    }
}


// 823. 带因子的二叉树 动态规划
class Solution {
    func numFactoredBinaryTrees(_ arr: [Int]) -> Int {
        let nums = arr.sorted()
        var dp: [Int: Int] = [:]
        let kMode = 1000000007

        for i in 0 ..< nums.count {
            dp[nums[i]] = 1
            for j in 0 ..< i where nums[i] % nums[j] == 0 && dp[nums[i] / nums[j]] != nil {
                dp[nums[i]]! += (dp[nums[j]]! * dp[nums[i] / nums[j]]!) % kMode
            }
        }
        
        var ans = 0
        
        for (_, val) in dp {
            ans += val
        }

        return ans % kMode
    }
}

// 2240. 买钢笔和铅笔的方案数 基础逻辑
class Solution {
    func waysToBuyPensPencils(_ total: Int, _ cost1: Int, _ cost2: Int) -> Int {
        if (cost1 < cost2) {
            return waysToBuyPensPencils(total, cost2, cost1)
        }
        var res = 0, cnt = 0
        while (cnt * cost1 <= total) {
            res += Int((total - cnt * cost1) / cost2) + 1
            cnt += 1
            
        }
        return res
    }
}

// 2605. 从两个数字数组里生成最小数字  
class Solution {
    func minNumber(_ nums1: [Int], _ nums2: [Int]) -> Int {
        var map = [Int: Bool]()
        for num in nums1 {
            map.updateValue(true, forKey: num)
        }
        
        var minNum = 10
        for num in nums2 {
            if map[num] != nil && num < minNum {
                minNum = num
            }
        }
        if minNum < 10 {
            return minNum
        }
        let x = nums1.sorted()[0]
        let y = nums2.sorted()[0]
        return min(x * 10 + y, y*10 + x)
    }
}

// 1123. 最深叶节点的最近公共祖先 递归
class Solution {
    func lcaDeepestLeaves(_ root: TreeNode?) -> TreeNode? {
        if lcaDeepestLeavesHeight(root?.left) == lcaDeepestLeavesHeight(root?.right) {
            return root
        }else if lcaDeepestLeavesHeight(root?.left) > lcaDeepestLeavesHeight(root?.right) {
            return lcaDeepestLeaves(root?.left)
        }
        return lcaDeepestLeaves(root?.right)
    }
    func lcaDeepestLeavesHeight(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }
        return max(lcaDeepestLeavesHeight(root.left), lcaDeepestLeavesHeight(root.right)) + 1
    }
}

// 2594. 修车的最少时间 二分查找
class Solution {
    func repairCars(_ ranks: [Int], _ cars: Int) -> Int {
        var l = 1, r = ranks[0] * cars * cars
        while (l < r) {
            let time = (l + r) >> 1
            if check(ranks, cars, time) {
                r = time
            } else {
                l = time + 1
            }
        }
        return l
    }
    func check(_ ranks: [Int], _ cars: Int, _ time: Int) -> Bool {
        var cnt = 0
        for rank in ranks {
            cnt += Int(floor(sqrt(Double(time) / Double(rank))))
        }
        return cnt >= cars
    }
}

// 2651. 计算列车到站时间 基础题
class Solution {
    func findDelayedArrivalTime(_ arrivalTime: Int, _ delayedTime: Int) -> Int {
        return (arrivalTime + delayedTime) % 24
    }
}

// LCP 50. 宝石补给 基础题
class Solution {
    func giveGem(_ gem: [Int], _ operations: [[Int]]) -> Int {
        var gem2 = gem
        for nums in operations {
             let half = gem2[nums[0]] / 2
            gem2[nums[0]] -= half
            gem2[nums[1]] += half
        }
       return gem2.max()! - gem2.min()!
    }
}

// 337. 打家劫舍 III 动态规划
class Solution {
    
    func rob(_ root: TreeNode?) -> Int {
        let res = dfs(root)
        return max(res.0, res.1)
    }
    
    func dfs(_ root: TreeNode?) -> (Int, Int) {
        guard root != nil else {
            return (0, 0)
        }
        let left = dfs(root!.left)
        let right = dfs(root!.right)
        return (left.1 + right.1 + root!.val, max(left.0, left.1) + max(right.0, right.1))
    }
}

// 2560. 打家劫舍 IV 二分查找
class Solution {
    func minCapability(_ nums: [Int], _ k: Int) -> Int {
        var lower = nums.min()!
        var upper = nums.max()!
        while lower <= upper {
            let mid = (lower + upper) / 2
            var count = 0
            var visited = false
            for num in nums {
                if num <= mid && !visited {
                    count += 1
                    visited = true
                } else {
                    visited = false
                }
            }
            if count >= k {
                upper = mid - 1
            } else {
                lower = mid + 1
            }
        }
        return lower
    }
}

// LCP 06. 拿硬币 基础题
class Solution {
    func minCount(_ coins: [Int]) -> Int {
      var resCount = 0
      for coin in coins {
        resCount += (coin / 2) + (coin % 2)
      }
      return resCount
    }
}

// 2582. 递枕头 基础题
class Solution {
    func passThePillow(_ n: Int, _ time: Int) -> Int {
        let newTime = time % ((n - 1) * 2)
        return newTime < n ? newTime + 1 : n * 2 - newTime - 1
    }
}

// 1333. 餐厅过滤器 筛选
class Solution {
  func filterRestaurants(_ restaurants: [[Int]], _ veganFriendly: Int, _ maxPrice: Int, _ maxDistance: Int) -> [Int] {
      restaurants
          .filter { (veganFriendly == 0 || $0[2] == veganFriendly) && $0[3] <= maxPrice && $0[4] <= maxDistance }
          .sorted { $0[1] == $1[1] ? $0[0] > $1[0] : $0[1] > $1[1] }
          .map { $0[0] }
  }
}

// 901. 股票价格跨度 单调栈
class StockSpanner {
    var dq = Array<(Int,Int)>()
    var cur = 0

    init() {

    }
    
    func next(_ price: Int) -> Int {
        while !dq.isEmpty && dq.last!.1 <= price{
            dq.removeLast()
        }

        let pre = dq.isEmpty ? -1 : dq.last!.0
        let res = cur - pre
        dq.append((cur,price))
        cur += 1

        return res
    }
}

// 2034. 股票价格波动 基础题
class StockPrice {
    var stockpriceDic : [Int:Int]
    var currentTimestamp: Int = 0

    //用元组记录最大值，最小值与时间戳
    var miniPrice: (Int,Int) = (0,0)
    var maxiPrice: (Int,Int) = (0,0)
    
    init() {
        stockpriceDic = [Int:Int]()
    }
    
    func update(_ timestamp: Int, _ price: Int) {
        stockpriceDic[timestamp] = price
        currentTimestamp = max(currentTimestamp, timestamp)
        if timestamp == miniPrice.0 || timestamp == maxiPrice.0 {
            //如果是更新一个数据，且这个数据是最大值或者是最小值所在的时间点，就刷新最大值最小值
            var min = stockpriceDic.first!
            var max = stockpriceDic.first!
            for (k,v) in stockpriceDic {
                if v < min.value {
                    min.key = k
                    min.value = v
                }
                if v > max.value {
                    max.key = k
                    max.value = v
                }
            }
            miniPrice = (min.key,min.value)
            maxiPrice = (max.key,max.value)
        }
        else {
            if stockpriceDic.count == 1 {
                maxiPrice = (timestamp,price)
                miniPrice = (timestamp,price)
            }
            if price > maxiPrice.1 {
                maxiPrice = (timestamp,price)
            }
            else if price < miniPrice.1 {
                miniPrice = (timestamp,price)
            }
        }
    }
    
    func current() -> Int {
        return stockpriceDic[currentTimestamp]!
    }
    
    func maximum() -> Int {
        return self.maxiPrice.1
    }

    func minimum() -> Int {
        return self.miniPrice.1
    }
}

// 2578. 最小和分割 基础题
class Solution {
    func splitNum(_ num: Int) -> Int {
        let cs = Array(String(num))
        let sortedCs = cs.sorted()
        var a = [Int](repeating: 0, count: 2)
        for i in 0..<sortedCs.count {
            a[i % 2] = a[i % 2] * 10 + Int(String(sortedCs[i]))!
        }
        return a[0] + a[1]
    }
}

// 2731. 移动机器人 脑筋急转弯
class Solution {
    func sumDistance(_ nums: [Int], _ s: String, _ d: Int) -> Int {
        var n = nums
        let arrS = Array(s)
        for i in 0..<nums.count {
            n[i] += arrS[i] == "R" ? d : -d
        }
        n.sort()

        var ans = 0, sum = 0
        for i in 0..<nums.count {
            ans = (ans + i*n[i] - sum) % (Int(1e9)+7)
            sum += n[i]
        }
        return ans
    }
}

// 2512. 奖励最顶尖的 K 名学生  字典映射
class Solution {
    func topStudents(_ positive_feedback: [String], _ negative_feedback: [String], _ report: [String], _ student_id: [Int], _ k: Int) -> [Int] {
        var map = [String: Int]()
        for word in positive_feedback {
            map.updateValue(3, forKey: word)
        }
        for word in negative_feedback {
            map.updateValue(-1, forKey: word)
        }
        var backup = [(Int, Int)]()
        for i in 0 ..< report.count {
            let words = report[i]
            var score = 0
            for word in words.components(separatedBy: " ") {
                score += map[word] ?? 0
            }
            backup.append((score, student_id[i]))
        }
       let res = backup.sorted { student1, student2 in
            if student1.0 == student2.0 {
                return student1.1 < student2.1
            }
            return student1.0 > student2.0
        }.map { student1 in
            student1.1
        }.prefix(k)
        return Array(res)
    }
}

// 2562. 找出数组的串联值 基础逻辑
class Solution {
    func findTheArrayConcVal(_ nums: [Int]) -> Int {
        var i = 0 , j = nums.count - 1, res = 0
        while i <= j {
            if i == j {
                res += nums[i]
            } else {
                res += (Int(String(nums[i]) + String(nums[j])) ?? 0)
            }
            i += 1
            j -= 1
        }
        return res
    }
}

// 260. 只出现一次的数字 III 字典
class Solution {
    func singleNumber(_ nums: [Int]) -> [Int] {
        var backup = [Int: Bool]()
        for num in nums {
            if let have = backup[num] {
                backup.removeValue(forKey: num)
            } else {
                backup.updateValue(true, forKey: num)
            }
        }
        var res = [Int]()
        
        for (key, _) in backup {
            res.append(key)
        }
        
        return res
    }
}

// 2652. 倍数求和  数学题
class Solution {
    func sumOfMultiples(_ n: Int) -> Int {
        var ans = 0
        func f(_ m: Int, _ a: Int) -> Int {
            let n = m / a
            let d = a
            return n * a + n * (n - 1) * d / 2
        }
        return f(n, 3) + f(n, 5) + f(n, 7) - f(n, 3 * 5) - f(n, 3 * 7) - f(n, 5 * 7) + f(n, 3 * 5 * 7)
    }
}

// 1726. 同积元组 基础题目
class Solution {
    func tupleSameProduct(_ nums: [Int]) -> Int {
        var map = [Int: Int]()
        for i in 0...(nums.count - 2) {
            for j in (i+1)...(nums.count - 1) {
                let key = nums[i] * nums[j]
                map.updateValue((map[key] ?? 0) + 1, forKey: key)
            }
        }
        var res = 0
        for (_, value) in map {
            res += (value - 1) * value * 4
        }
        return res
    }
}

// 2525. 根据规则将箱子分类 基础题
class Solution {
    func categorizeBox(_ length: Int, _ width: Int, _ height: Int, _ mass: Int) -> String {
        let maxd = max(length, width, height)
        let vol = length * width  * height
        let isBulky = (maxd >= 10000 || vol >= Int(1e9))
        let isHeavy = (mass >= 100)
        if (isBulky && isHeavy) {
             return "Both"
          } else if (isBulky) {
              return "Bulky"
          } else if (isHeavy) {
              return "Heavy"
          } else {
              return "Neither"
          }
    }
}

// 2678. 老人的数目 基础逻辑
class Solution {
    func countSeniors(_ details: [String]) -> Int {
        var count = 0
        for info in details {
            let index1 = info.index(info.startIndex, offsetBy: 11) 
            let index2 = info.index(info.startIndex, offsetBy: 12) 
            if let age = Int(info[index1...index2]), age > 60 {
                count += 1
            }
        }
        return count
    }
}

// 1155. 掷骰子等于目标和的方法数 动态规划
class Solution {
    func numRollsToTarget(_ d: Int, _ f: Int, _ target: Int) -> Int {
        var dp = Array.init(repeating:(Array.init(repeating:0,count:target + 1)),count:d + 1)
        dp[0][0] = 1
        let MOD:Int = Int(1e9) + 7;
        for i in (1...d){
            for j in (1...target){
                var k = 1
                //k <= f是核心，即一次骰一个骰子，不会出现增减大于f的数
                while(k<=j && k<=f){
                    dp[i][j] = (dp[i][j] + dp[i - 1][j - k]) % MOD
                    k += 1
                }
            }
        }
        return dp[d][target]
    }
}

// 2698. 求一个整数的惩罚数 暴力破解
class Solution {
    func punishmentNumber(_ n: Int) -> Int {
        let nums = [1, 9, 10, 36, 45, 55, 82, 91, 99, 100, 235, 297, 369, 370, 379, 414, 657, 675, 703, 756, 792, 909, 918, 945, 964, 990, 991, 999, 1000].filter { num in
            num <= n
        }
        
        var res = 0
        for num in nums {
            res += num * num
        }
        return res
    }
}

// 2520. 统计能整除数字的位数 基础题
class Solution {
    func countDigits(_ num: Int) -> Int {
        var t = num, res = 0
        while t > 0 {
            if num % ( t % 10) == 0 {
                res +=  1
            }
            t  = t / 10
        }
        
        return res
    }
}

// 1465. 切割后面积最大的蛋糕  贪心
class Solution {
    func maxArea(_ h: Int, _ w: Int, _ horizontalCuts: [Int], _ verticalCuts: [Int]) -> Int {
        let hList = horizontalCuts.sorted()
        let wList = verticalCuts.sorted()
        var last = 0, hMax = 0, wMax = 0
        for num in hList {
            hMax = max(num - last, hMax)
            last = num
        }
        hMax = max(hMax, h - (hList.last ?? 0))
        last = 0
        for num in wList {
            wMax = max(num - last, wMax)
            last = num
        }
        wMax = max(wMax, w - (wList.last ?? 0))
        return  hMax*wMax % 1000000007
    }
}

// 275. H 指数 II 二分查找
class Solution {
    func hIndex(_ citations: [Int]) -> Int {
        var left = 0
        var right = citations.count
        while left<right {
            let mid = (left+right)/2
            if citations[mid] < citations.count - mid {
                left = mid+1
            }else{
                right = mid
            }
        }
        return citations.count - left
    }
}

// 2103. 环和杆 位运算
class Solution {
    func countPoints(_ rings: String) -> Int {
        var backup = Array(repeating: 0, count: 10)
        let ringsArray = rings.map { c in String(c) }
        for i in 0...(ringsArray.count - 1) where i % 2 == 0 {
            let j = Int(ringsArray[i + 1]) ?? 0
            if ringsArray[i] == "R" {
                backup[j] |= 1
            } else if ringsArray[i] == "G" {
                backup[j] |= 2
            } else {
                backup[j] |= 4
            }
        }
        var res = 0
        for num in backup {
            if num == 7 {
                res += 1
            }
        }
        return res
    }
}

//  117. 填充每个节点的下一个右侧节点指针 II 二叉树层序遍历
class Solution {
    func connect(_ root: Node?) -> Node? {
        // 表示一层
        var queue = [Node]()
        if let node = root { queue.append(node) }
        while !queue.isEmpty {
            let count = queue.count
            var current, previous: Node!
            for i in 0 ..< count {
                if i == 0 {
                    previous = queue.removeFirst()
                    current = previous
                } else {
                    current = queue.removeFirst()
                    previous.next = current
                    previous = current
                }

                if let node = current.left { queue.append(node) }
                if let node = current.right { queue.append(node) }
            }
            previous.next = nil
        }

        return root
    }
    
}

// 318. 最大单词长度乘积 位运算
class Solution {
    func maxProduct(_ words: [String]) -> Int {
      var mask = [Int](repeating: 0, count: words.count)
      for i in 0..<words.count {
        let word = words[i]
        for ch in word {
          mask[i] |= 1 << (ch.asciiValue! - 97)
        }
      }
    
      var masProd = 0
      for i in 0..<words.count {
        for j in i+1..<words.count {
          if mask[i] & mask[j] == 0 {
            masProd = max(masProd, words[i].count * words[j].count)
          }
        }
      }
      return masProd
    }
}

// 2586. 统计范围内的元音字符串数 基本逻辑
class Solution {
    func vowelStrings(_ words: [String], _ left: Int, _ right: Int) -> Int {
        var res = 0
        let map = ["a": true, "e": true, "i": true, "o": true, "u": true,]
        for i in left...right {
            let word = words[i] 
            if map[String(word.first!)] != nil && map[String(word.last!)] != nil {
                res += 1
            }
        }
        return res
    }
}

// 2609. 最长平衡子字符串
class Solution {
    func findTheLongestBalancedSubstring(_ s: String) -> Int {
        let n = s.count
        var idx = 0
        var ans = 0
        while idx < n {
            var a = 0
            var b = 0
            while idx < n && s[s.index(s.startIndex, offsetBy: idx)] == "0" {
                a += 1
                idx += 1
            }
            while idx < n && s[s.index(s.startIndex, offsetBy: idx)] == "1" {
                b += 1
                idx += 1
            }
            ans = max(ans, min(a, b) * 2)
        }
        return ans
    }
}

// 2656. K 个元素的最大和 基础题
class Solution {
    func maximizeSum(_ nums: [Int], _ k: Int) -> Int {
        var maxNum = nums[0]
        for num in nums {
            maxNum = max(num, maxNum)
        }
        return (2 * maxNum + k - 1) * k / 2
    }
}

// 2760. 最长奇偶子数组 窗口
class Solution {
    func longestAlternatingSubarray(_ nums: [Int], _ threshold: Int) -> Int {
        var res: Int = 0
        var (left, right) = (0, 0)
        
        while right < nums.count {
            let insertNum = nums[right]
            if insertNum % 2 == 1 || insertNum > threshold { right += 1 }
            else {
                left = right
                right += 1
                while right < nums.count && nums[right] <= threshold && nums[right] % 2 != nums[right-1] % 2 {
                    right += 1
                }
                res = max(res, right - left)
            }
        }
        return res
    }
}

// 53. 最大子数组和 动态规划
class Solution {
    func maxSubArray(_ nums: [Int]) -> Int {
        var max = nums[0]
        var sum = 0
        
        for num in nums {
            sum = sum + num
            if max < sum {
                max = sum
            }
            if sum < 0 {
                sum = 0
            }
        }
        return max
    }
}

// 2216. 美化数组的最少删除数 基础逻辑
class Solution {
    func minDeletion(_ nums: [Int]) -> Int {
        var ans = 0, check = true
        if nums.count == 1 {
            return 1
        }
        for i in 0...(nums.count - 2) {
            if nums[i] == nums[i + 1] && check {
                ans += 1
            } else {
                check = !check
            }
        }
        if (nums.count - ans) % 2 == 1 {
            ans += 1
        }
        return ans
        
    }
}

// 2824. 统计和小于目标的下标对数目  基础逻辑
class Solution {
    func countPairs(_ nums: [Int], _ target: Int) -> Int {
        let sortNums = nums.sorted()
        var res = 0
        var i = 0 , j = sortNums.count - 1
        while(i < j) {
            while (i < j && (sortNums[i] + sortNums[j]) >= target) {
                j -= 1
            }
            res += (j - i)
            i += 1
        }
        return res
    }
}
// 907. 子数组的最小值之和 模拟
class Solution {
    func sumSubarrayMins(_ arr: [Int]) -> Int {
        var idx = 0 
        var res = 0 
        var nums = [Int]()
        let mod = 1000000007
        while idx < arr.count {
            let n = arr[idx] 
            var sub = idx + 1
            var value = n 
            while sub < arr.count {
                let s = arr[sub]
                if s < value {
                    value = s 
                }
                res = res+value
                sub += 1 
            }
            res = (res + n) % mod
            idx += 1 
        }
        return res
    }
}

// 1670. 设计前中后队列 基础逻辑
class FrontMiddleBackQueue {

    var arr:[Int] = []

    init() {
        arr = []
    }
    
    func pushFront(_ val: Int) {
        arr.insert(val, at:0)
    }
    
    func pushMiddle(_ val: Int) {
        let mid = arr.count/2
        arr.insert(val, at:mid)
    }
    
    func pushBack(_ val: Int) { // 1432
        arr.append(val)
    }
    
    func popFront() -> Int {
        return arr.count == 0 ? -1 : arr.removeFirst()
    }
    
    func popMiddle() -> Int {
        let mid = arr.count/2 + (arr.count % 2 == 0 ? -1 : 0)
        return arr.count == 0 ? -1 : arr.remove(at: mid)
    }
    
    func popBack() -> Int {
        return arr.count == 0 ? -1 : arr.removeLast()
    }
}

// 2697. 字典序最小回文串 双指针
class Solution {
    func makeSmallestPalindrome(_ s: String) -> String {
        var array = s.map { char in
            return String(char)
        }
        var left = 0, right = array.count - 1
        while left < right {
            if array[left] != array[right] {
                if array[left] < array[right] {
                    array[right] = array[left]
                } else {
                    array[left] = array[right]
                }
            }
            left += 1
            right -= 1
        }
        
        return array.joined()
    }
}

// 162. 寻找峰值 找最大值
class Solution {
    func findPeakElement(_ nums: [Int]) -> Int {
        var res = 0
        for index in 0...(nums.count - 1) {
            if nums[index] > nums[res] {
                res = index
            }
        }
        return res
    }
}

// 1901. 寻找峰值 II 二分查找
class Solution {
    func findPeakGrid(_ mat: [[Int]]) -> [Int] {
        var top = 0
        var down = mat.count - 1

        while top <= down {
            let mid = top + (down-top)/2
            let midMaxCol = rowMaxIndex(mat, mid)

            if top == down {
                return [mid,midMaxCol]
            }

            let preMaxCol = rowMaxIndex(mat, mid-1)
            let nextMaxCol = rowMaxIndex(mat, mid+1)

            let v1 = mid - 1 >= 0 ? mat[mid - 1][preMaxCol] : -1
            let v2 = mat[mid][midMaxCol];
            let v3 = mid + 1 < mat.count ? mat[mid + 1][nextMaxCol] : -1

            if v2 > v3 && v2 > v1 {
                return [mid,midMaxCol]
            }

            if v1 >= v2 && v1 > v3 {
                down = mid - 1
            } else {
                top = mid + 1
            }
        }

        return []
    }

    private func rowMaxIndex(_ mat: [[Int]], _ row: Int) -> Int {
        guard row >= 0 && row < mat.count else { return -1 }

        var col = 0

        for i in 1..<mat[row].count {
            if mat[row][i] > mat[row][col] {
                col = i
            }
        }

        return col
    }
}
// 2828. 判别首字母缩略词 基础逻辑
class Solution {
    func isAcronym(_ words: [String], _ s: String) -> Bool {
        if words.count != s.count {
            return false
        }
        let sArray = s.map { String($0)}
        for i in 0...(words.count - 1) {
            if words[i].map({ String($0)})[0] != sArray[i] {
                return false
            }
        }
        return true
    }
}

// 1276. 不浪费原料的汉堡制作方案 二元一次方程
class Solution {
    func numOfBurgers(_ tomatoSlices: Int, _ cheeseSlices: Int) -> [Int] {
        guard tomatoSlices % 2 == 0, tomatoSlices >= cheeseSlices * 2, tomatoSlices <= cheeseSlices * 4 else {
            return []
        }
        let num1 = (tomatoSlices - cheeseSlices * 2) / 2
        let num2 = cheeseSlices -  num1
        return [num1, num2]
    }
}

// 2660. 保龄球游戏的获胜者 基础题
class Solution {
    func isWinner(_ player1: [Int], _ player2: [Int]) -> Int {
        let score1 = score(player1)
        let score2 = score(player2)
        return score1 == score2 ?  0 : (score1 > score2 ? 1 : 2)
    }
    
    func score(_ player: [Int]) -> Int {
        var res = 0
        for (i,num) in player.enumerated() {
            res += num
            if ((i > 0) && player[i-1] == 10) || ((i > 1) && player[i-2] == 10) {
                res += num
            }
        }
        
        return res
    }

}

// 2487. 从链表中移除节点 递归
public class ListNode {
  public var val: Int
  public var next: ListNode?
  public init() { self.val = 0; self.next = nil; }
  public init(_ val: Int) { self.val = val; self.next = nil; }
  public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next; }
}

class Solution {
    func removeNodes(_ head: ListNode?) -> ListNode? {
        guard let head = head else {
            return head
        }
        head.next =  removeNodes(head.next)
        
        if let next = head.next, head.val < next.val {
            return next
        } else {
            return head
        }
        
    }
}

// 2696. 删除子串后的字符串最小长度 栈
class Solution {
    func minLength(_ s: String) -> Int {
        var stack = [Character]()
        for c in s {
            if (c == "B" && stack.last == "A") || (c == "D" && stack.last == "C") {
                stack.removeLast()
            }
            else {
                stack.append(c)
            }
        }
        return stack.count 
    }
}

// 2085. 统计出现过一次的公共字符串 基础逻辑
class Solution {
    func countWords(_ words1: [String], _ words2: [String]) -> Int {
        var map = [String: Int]()
        for w in words1 {
            map[w] = (map[w] ?? 0) + 1 // 统计
        }
        for w in words2 {
            map[w] = (map[w] == 1 ? 0 : -1) // 个数 1 的标 0，其余 -1
        }
        var ans = 0
        for v in map.values {
            if v == 0 { // 计算 0 的数量即为答案
                ans += 1
            }
        }
        return ans
    }
}
 public class ListNode {
     public var val: Int
     public var next: ListNode?
     public init() { self.val = 0; self.next = nil; }
     public init(_ val: Int) { self.val = val; self.next = nil; }
     public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next; }
 }

// 82. 删除排序链表中的重复元素 II 基础逻辑
class Solution {
    func deleteDuplicates(_ head: ListNode?) -> ListNode? {
        var newHead : ListNode? = ListNode() 
        newHead?.next = head
        var cur = newHead
        while cur?.next != nil && cur?.next?.next != nil{
            if cur!.next!.val == cur!.next!.next!.val{
                var tmp = cur!.next!.val
                while cur!.next != nil && cur!.next!.val == tmp{
                    cur?.next = cur?.next?.next
                }
            }else{
                cur = cur?.next
            }
            
        }
        return newHead?.next
    }
}

// 2744. 最大字符串配对数目 基础题
class Solution {
    func maximumNumberOfStringPairs(_ words: [String]) -> Int {
        var map = [String: Bool]()
        var res = 0
        for word in words {
            let key = String(word.reversed())
            if map[key] != nil {
                res += 1
            }
            map.updateValue(true, forKey: word)
        }
        return res
    }
}

// 2171. 拿出最少数目的魔法豆 数学题
class Solution {
    func minimumRemoval(_ beans: [Int]) -> Int {
        var ans = Int.max
        var beans = beans.sorted()
        var sum = beans.reduce(.zero,+)

        for i in 0..<beans.count {
            ans = min(ans, sum - beans[i] * (beans.count - i))
        }

        return ans
    }
}

// 670. 最大交换 基础逻辑
class Solution {
    func maximumSwap(_ num: Int) -> Int {
        var arr = Array(String(num)).map{ Int(String($0))! }
        let sortedArray = arr.sorted(by:>)
        var idx = 0, n = -1

        for i in 0..<arr.count {
            let val = arr[i]
            let m = sortedArray[i]
            if m > val {
                idx = i 
                n = m 
                break
            }
        }
        if n == -1 { return num }
        for i in 0..<arr.count {
            let j = arr.count-1-i 
            let val = arr[j] 
            if val == n {
                arr.swapAt(idx,j)
                break
            }
        }

        let ans = arr.reduce(0) { (result, digit) in
            return result * 10 + digit
        }

        return ans 
    }
}

// 2765. 最长交替子数组 基本逻辑
class Solution {
    func alternatingSubarray(_ nums: [Int]) -> Int {
        var res = -1
        var firstIndex = 0
        for i in 1...(nums.count - 1) {
            let length = i - firstIndex + 1
            if (nums[i] - nums[firstIndex]) == ((length - 1) % 2) {
                res = max(res, length)
            } else if nums[i] - nums[i - 1] == 1 {
                firstIndex = i - 1
                res = max(res, 2)
            } else {
                firstIndex = i
            }
        }
        return res
    }
}

// 2859. 计算 K 置位下标对应元素的和 函数调用
class Solution {
    func sumIndicesWithKSetBits(_ nums: [Int], _ k: Int) -> Int {
        var ans = 0
        for i in 0..<nums.count {
            if i.nonzeroBitCount == k {
                ans += nums[i]
            }
        }
        return ans
    }
}

// 2670. 找出不同元素数目差数组 基础逻辑
class Solution {
    func distinctDifferenceArray(_ nums: [Int]) -> [Int] {
        var st = Set<Int>()
        var sufCnt = [Int]()
        sufCnt.append(0)
        for num in nums.reversed() {
            st.insert(num)
            sufCnt.append(st.count)
        }
        
        sufCnt = sufCnt.reversed()
        
        st.removeAll()
        var res = [Int]()
        for (idex, num) in nums.enumerated() {
            st.insert(num)
            res.append(st.count - sufCnt[idex + 1]);
        }
        return res
    }
}

// 1686. 石子游戏 VI 基础逻辑
class Solution {
    func stoneGameVI(_ aliceValues: [Int], _ bobValues: [Int]) -> Int {
        var nums = [(Int, Int, Int)]()
        for (i,num) in aliceValues.enumerated() {
            nums.append((num + bobValues[i],num,bobValues[i]))
        }
        nums = nums.sorted(by: { i, j in
            return i.0 - j.0 > 0
        })
        var aliceSum = 0, bobSum = 0
        for (i,num) in nums.enumerated() {
            if i % 2 == 0 {
                aliceSum += num.1
            } else {
                bobSum += num.2
            }
        }
        return aliceSum == bobSum ? 0 : (aliceSum > bobSum ? 1 : -1)
    }
}

// 292. Nim 游戏 脑筋急转弯
class Solution {
    func canWinNim(_ n: Int) -> Bool {
       return n % 4 != 0
    }
}

// LCP 30. 魔塔游戏 最小堆
class Solution {
    func magicTower(_ nums: [Int]) -> Int {
        var res = 0
        var hp = 1
        var arr = [Int]()
        var delay = 0
        for num in nums {
            if num < 0 {
                arr.append(num)
            }
            hp += num
            if hp <= 0 {
                arr =  arr.sorted()
                let minNum = arr.removeFirst()
                hp -= minNum
                delay += minNum
                res += 1
            }
        }
        return hp + delay > 0 ? res : -1
    }
}

// 589. N 叉树的前序遍历 基础题
class Solution {
    func preorder(_ root: Node?) -> [Int] {
    	var res = [Int]()
        pre(root, &res)
        return res
    }
    func pre(_ root: Node?, _ res: inout [Int]) {
        guard let root = root else { return }
        res.append(root.val)
        for node in root.children {
            pre(node, &res)
        }
    }
}

// 590. N 叉树的后序遍历 
class Solution {
    func postorder(_ root: Node?) -> [Int] {
    	guard let root = root else { return [] }
        var ans = [Int]()
        dfs(root, &ans)
        return ans
    }

    func dfs(_ node: Node, _ ans: inout [Int]) {
        for child in node.children {
            dfs(child, &ans)
        }
        ans.append(node.val)
    }
}

// 105. 从前序与中序遍历序列构造二叉树
class Solution {
    func buildTree(_ preorder: [Int], _ inorder: [Int]) -> TreeNode? {

        // 将中序遍历顺序放到Map里， 省去了后面递归重复遍历过程
        var dict: [Int: Int] = [:]
        for i in 0..<inorder.count {
            dict[inorder[i]] = i
        }
        return resultTree(preorder, 0, preorder.count - 1, dict, 0, inorder.count - 1)
    }

    // 为啥要构造一个新的函数，  是因为我们要把递归用到的参数都补上
    func resultTree(_ preorder: [Int], _ preLeft: Int, _ preRight: Int, _ map: [Int: Int], _ inLeft: Int, _ inRight: Int) -> TreeNode? {
        if preLeft > preRight || inLeft > inRight { return nil }

        let roorVal = preorder[preLeft]
        // 这里直接就可以获取到pIndex了。。
        let pIndex = map[roorVal]! 
        var node = TreeNode(roorVal)

        // 具体这几个边界值， 不行就提前在草稿纸上计算出来
        node.left = resultTree(preorder, preLeft + 1, preLeft + pIndex - inLeft, map, inLeft, pIndex - 1)
        node.right = resultTree(preorder, preLeft + pIndex - inLeft + 1, preRight, map, pIndex + 1, inRight)
        return node
    }
}

// 889. 根据前序和后序遍历构造二叉树 基础逻辑
class Solution {
    func constructFromPrePost(_ preorder: [Int], _ postorder: [Int]) -> TreeNode? {
        return myBuildTree(preorder, postorder, 0, preorder.count-1, 0, postorder.count-1)
    }

    func myBuildTree(_ preorder: [Int], _ postorder: [Int], _ preLeft: Int, _ preRight: Int, _ postLeft: Int, _ postRight: Int) -> TreeNode? {
        if preLeft > preRight || postLeft > postRight { return nil }

        var root = TreeNode(preorder[preLeft])
        if preLeft == preRight { return root }

        var index = postLeft //通过前序遍历中的左子树第一个点，在后续遍历中找到对应点的位置index
        while preorder[preLeft+1] != postorder[index] {
            index += 1
        }
        //左子树总共数目
        let leftSubCount = index-postLeft

        //递归更新调用创建左右子树，注意左右边界的计算方式
        root.left = myBuildTree(preorder, postorder, preLeft+1, preLeft+1+leftSubCount, postLeft, index)
        root.right = myBuildTree(preorder, postorder, preLeft+1+leftSubCount+1, preRight, index+1, postRight-1)

        return root
    }
}

// 938. 二叉搜索树的范围 基础题
class Solution {
    func rangeSumBST(_ root: TreeNode?, _ low: Int, _ high: Int) -> Int {
        if root == nil {
            return 0
        }
        if root!.val > high {
            return rangeSumBST(root?.left, low, high)
        } else if root!.val < low {
            return rangeSumBST(root?.right, low, high)
        } else {
            return root!.val + rangeSumBST(root?.left, low, high) + rangeSumBST(root?.right, low, high)
        }
    }
}

// 2369. 检查数组是否存在有效划分 动态规划
class Solution {
    func validPartition(_ nums: [Int]) -> Bool {
        var dp = [Bool](repeating: false, count: nums.count + 1)
        dp[0] = true
        for i in 2...nums.count {
           dp[i] = dp[i-2] && validTwo(num1: nums[i-2], num2: nums[i-1])
            if !dp[i], i > 2 {
                dp[i] = dp[i-3] && validThree(num1: nums[i-3], num2: nums[i-2], num3: nums[i-1])
            }
        }
        
        return dp[nums.count]
    }
    
    func validTwo(num1: Int, num2:Int) -> Bool {
        return num1 == num2
    }
    
    func validThree(num1: Int, num2:Int, num3:Int) -> Bool {
        return (num1 == num2 && num1 == num3) || (num1 + 1 == num2 && num2 + 1 == num3)
    }
    
}

// 232. 用栈实现队列 基础逻辑
class MyQueue {
    var inStack: [Int]
    
    init() {
        inStack = []
    }
    
    func push(_ x: Int) {
        inStack.append(x)
    }
    
    func pop() -> Int {
       
        return inStack.isEmpty ? 0 : inStack.removeFirst()
    }
    
    func peek() -> Int {
        return inStack.isEmpty ? 0 : inStack.first!
    }
    
    func empty() -> Bool {
        return inStack.isEmpty
    }
}

// 2917. 找出数组中的 K-or 值 基础题
class Solution {
    func findKOr(_ nums: [Int], _ k: Int) -> Int {
        var res = 0
        let n = nums.count

        for i in 0..<32 {
            var count = 0
            
            for j in 0..<n {
                if (nums[j] & (1 << i)) != 0{
                    count += 1
                }

                if count >= k{
                    res |= (1 << i)
                    break
                }
            } 
        }   
        return res
    }
}

// 2575. 找出字符串的可整除数组 基础逻辑
class Solution {
    func divisibilityArray(_ word: String, _ m: Int) -> [Int] {
        var stringArr = Array(word)
        var cur = 0
        var div = Array(repeating: 0, count: word.count)
        for index in 0..<word.count {
            var string = String(stringArr[index])
            var num = Int(string)!
            var p = (cur * 10 + num) % m
            if p > 0 {
                cur = p
            } else {
                cur = 0
                div[index] = 1
            }
        }
        return div
    }
}

// 2834. 找出美丽数组的最小和 数学题
class Solution {
    func minimumPossibleSum(_ n: Int, _ target: Int) -> Int {
        let mod = 1000000007
        let m = target / 2
        if n <= m {
            return ((1 + n) * n / 2 ) % mod
        } else {
           return (((1 + m) * m / 2) + (((target + target + (n - m) - 1) * (n - m) / 2))) % mod
        }
    }
}

// 2129. 将标题首字母大写 基础逻辑
class Solution {
    func capitalizeTitle(_ title: String) -> String {
        let words = title.split(separator: " ")
        var res = [String]()

        for word in words{
            if word.count <= 2{
                res.append(word.lowercased())
            }
            else{
                res.append(word.lowercased().capitalized)
            }
        }
        return res.joined(separator: " ")
    }
}

// 1261. 在受污染的二叉树中查找元素 基础题
class FindElements {

    var list = [Int]()
    init(_ root: TreeNode?) {
        guard let root = root else {
            return
        }
        func dfs(_ node: TreeNode?,_ val: Int) {
            guard let node = node else {
                return
            }
            node.val = val
            list.append(val)
            dfs(node.left,2 * node.val + 1)
            dfs(node.right,2 * node.val + 2)
        }
        dfs(root,0)
    }
    
    func find(_ target: Int) -> Bool {
        return list.contains(target)
    }
}

// 2864. 最大二进制奇数 基础逻辑
class Solution {
    func maximumOddBinaryNumber(_ s: String) -> String {
        var cnt = 0
        for char in s {
            if String(char) ==  "1" {
                cnt += 1
            }
        }
        return String(repeating: "1", count: cnt - 1) + String(repeating: "0", count: s.count - cnt) + "1"
    }
}

// 2789. 合并后数组中的最大元素 
class Solution {
    func maxArrayValue(_ nums: [Int]) -> Int {
        var sum = nums.last!
        guard nums.count > 1 else {
            return sum
        }
        for i in (0...(nums.count - 2)).reversed() {
            sum = (nums[i] <= sum) ?  (nums[i] + sum) : nums[i]
        }
        return sum
    }
}

// 303. 区域和检索 - 数组不可变 基础逻辑
class NumArray {
    var preSum:[Int]
    init(_ nums: [Int]) {
        preSum = [Int](repeating:0, count:nums.count+1)
        
        for i in 0..<nums.count {
            preSum[i+1] = preSum[i] + nums[i]
        }

    }
    
    func sumRange(_ left: Int, _ right: Int) -> Int {
        return preSum[right+1] - preSum[left]
    }
}

// 518. 零钱兑换 II 背包问题
class Solution {
    func change(_ amount: Int, _ coins: [Int]) -> Int {
        var dp = Array(repeating: 0, count: amount + 1)
        dp[0] = 1
        for coin in coins {
            for j in 0 ... amount {
                if (j >= coin) {
                    dp[j] += dp[j - coin]
                }
            }
        }
        return dp[amount]
    }
}

// 2908. 元素和最小的山形三元组 I 双头遍历
class Solution {
    func minimumSum(_ nums: [Int]) -> Int {
        var res = 1000
        var leftMin = [1000]
        for i in 1...(nums.count - 1) {
            leftMin.append(min(leftMin[i-1], nums[i-1]))
       
        }
        var minRight = nums.last!
        for i in (1...(nums.count - 2)).reversed() {
            if leftMin[i] < nums[i], nums[i] > minRight {
                res = min(res, leftMin[i] + nums[i] + minRight)
            }
            minRight = min(minRight, nums[i])
         }
        
        return res < 1000 ? res : -1
    }
}

// 2810. 故障键盘 基础逻辑
class Solution {
    func finalString(_ s: String) -> String {
        var head = false
        var res = ""
        for char in s {
            let lastStr = String(char)
            if lastStr != "i" {
                if head {
                    res = lastStr + res
                } else {
                    res = res + lastStr
                }
            } else {
                head = !head
            }
        }
        return head ? String(res.reversed()) : res
    }
}

// 2529. 正整数和负整数的最大计数 基础逻辑
class Solution {
    func maximumCount(_ nums: [Int]) -> Int {
        var pos = 0, neg = 0
        for  num in nums {
            if num > 0 {
                pos += 1
            } else if num < 0 {
                neg += 1
            }
        }
        return max(pos, neg)
    }
}

// 1052. 爱生气的书店老板 滑动窗口
class Solution {
    func maxSatisfied(_ customers: [Int], _ grumpy: [Int], _ minutes: Int) -> Int {
        var total = 0
        for i in 0...(customers.count - 1) {
            if grumpy[i] == 0 {
                total += customers[i]
            }
        }
        var increase = 0
        for i in 0...(minutes - 1) {
            increase += grumpy[i] * customers[i]
        }
        var maxIncrease = increase
        if minutes <= customers.count - 1 {
            for i in minutes...(customers.count - 1) {
                increase = increase - customers[i - minutes] * grumpy[i - minutes] + customers[i] * grumpy[i]
                maxIncrease = max(increase,maxIncrease)
            }
        }
        return total + maxIncrease
    }
}

// 2798. 满足目标工作时长的员工数目 基础题
class Solution {
    func numberOfEmployeesWhoMetTarget(_ hours: [Int], _ target: Int) -> Int {
        let e = hours.filter { h in return h >= target }
        return e.count
    }
}

// 2079. 给植物浇水 基础逻辑
class Solution {
    func wateringPlants(_ plants: [Int], _ capacity: Int) -> Int {
        var ans = 0
        var rest = capacity
        for i in 0...(plants.count - 1) {
            if rest >= plants[i] {
                ans += 1
                rest -= plants[i]
            } else {
                ans += i*2 + 1
                rest = capacity - plants[i]
            }
        }
        return ans
        
    }
}

// 2960. 统计已测试设备 模拟
class Solution {
    func countTestedDevices(_ batteryPercentages: [Int]) -> Int {
        var ans = 0
        var c = 0
        for i in 0..<batteryPercentages.count {
            if batteryPercentages[i] - c > 0 {
                c += 1
                ans += 1
            }
        }
        return ans
    }
}

// 2244. 完成所有任务需要的最少轮数 基础逻辑
class Solution {
    func minimumRounds(_ tasks: [Int]) -> Int {
        var map = [Int: Int]()
        for i in tasks {
            map[i, default: 0] += 1
        }
        var ans = 0
        for (k, v) in map {
            if v <= 1 {
                return -1
            }
            if v % 3 == 0 {
                ans += v / 3
            } else {
                if v % 3 == 2 {
                    ans += (v - 2) / 3 + 1
                    continue
                }
                if v % 3 == 1 {
                    ans += (v - 4) / 3 + 2
                }
            }
        }
        return ans
    }
}

// 2769. 找出最大的可达成数字 基础逻辑
class Solution {
    func theMaximumAchievableX(_ num: Int, _ t: Int) -> Int {
          return num + 2 * t
    }
}

// 2028. 找出缺失的观测数据 基础逻辑
class Solution {
    func missingRolls(_ rolls: [Int], _ mean: Int, _ n: Int) -> [Int] {
        let m = rolls.count
        var sum = mean * ( n + m)
        for roll in rolls {
            sum -= roll
        }
        if sum < n || sum > 6*n {
            return []
        }
        var quotient: Int =  sum / n
        var remainder = sum % n
        var result: [Int] = []
        for i in  0...(n - 1) {
            let num = i < remainder ? 1 : 0
            result.append(quotient + num)
        }
        return result
    }
}

// 2951. 找出峰值 基础逻辑
class Solution {
    func findPeaks(_ mountain: [Int]) -> [Int] {
        guard mountain.count > 2 else {
            return []
        }
        var result = [Int]()
        for i in 1...(mountain.count - 2) {
            if mountain[i-1] < mountain[i], mountain[i] > mountain[i+1] {
                result.append(i)
            }
        }
        return result
    }
}

// 2965. 找出缺失和重复的数字 基础逻辑
class Solution {
    func findMissingAndRepeatedValues(_ grid: [[Int]]) -> [Int] {
        let cont = grid.count
        let nums  = cont * cont
        var result = [Int]()
        var sum = (1 + nums) * nums / 2
        var map = [Int: Bool]()
        for i in 0...(cont - 1) {
            for j in 0...(cont - 1) {
                let num = grid[i][j]
                if map[num] == nil {
                    sum -= num
                    map.updateValue(true, forKey: num)
                } else {
                    result.append(num)
                }
            }
        }
        result.append(sum)
        return result
    }
}

// 1103. 分糖果 II  数学题
class Solution {
    func distributeCandies(_ candies: Int, _ num_people: Int) -> [Int] {
      let p = Int(sqrt(Double(2*candies)+0.25) - 0.5)
      let remaining = candies - Int(p + 1) * p/2
  
      let rows = p/num_people
      let cols = p%num_people
    
      var res = [Int](repeating: 0, count: num_people)
    
      for i in 0..<num_people {
        res[i] = (i+1)*rows + (rows * (rows-1)/2) * num_people
        if i < cols {
          res[i] += i + 1 + rows * num_people
        }
      }
    
      res[cols] += remaining
   
      return res
    }
}

// 3038. 相同分数的最大操作数目 I 模拟
class Solution {
    func maxOperations(_ nums: [Int]) -> Int {
        let sum = nums[0] + nums[1]
        var res = 0
        for i in stride(from: 1, through: nums.count - 1, by: 2) {
            if (nums[i] + nums[i - 1]) == sum {
                res += 1
            } else {
                break
            }
        }
        return res
    }
}

// 419. 甲板上的战舰 基础逻辑
class Solution {
    func countBattleships(_ board: [[Character]]) -> Int {
        var ans = 0
        for i in 0 ..< board.count {
            for j in 0 ..< board[0].count {
                if board[i][j] == "X", i <= 0 || board[i - 1][j] == ".", j <= 0 || board[i][j - 1] == "." {
                    ans += 1
                }
            }
        }
        return ans
    }
}

// 2806. 取整购买后的账户余额 基础逻辑
class Solution {
    func accountBalanceAfterPurchase(_ purchaseAmount: Int) -> Int {
        let num =  purchaseAmount % 10
        let newPurchaseAmount =  num < 5 ?  purchaseAmount - num : purchaseAmount + 10 - num
        return 100 - newPurchaseAmount
    }
}

// 3115. 质数的最大距离  基础逻辑
class Solution {
    func maximumPrimeDifference(_ nums: [Int]) -> Int {
        let primes = Set<Int>([2, 3, 5, 7, 11,13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97])
        var first = -1, ans = 0
        for i in 0...(nums.count - 1) {
            if primes.contains(nums[i]) {
                if first != -1 {
                    ans = i - first
                } else {
                    first = i
                }
            }
        }
        return ans
    }
}

// 
class Solution {
    func sumOfTheDigitsOfHarshadNumber(_ x: Int) -> Int {
        var num = x, sum = 0
        while num > 0 {
            sum += num%10
            num = num / 10
        }
        return x % sum == 0 ?  sum : -1
    }
}
// 3033. 修改矩阵 基础逻辑
class Solution {
    func modifiedMatrix(_ matrix: [[Int]]) -> [[Int]] {
        var resoult = matrix
        let n = matrix.count
        let m = matrix[0].count
        for j in 0...(m - 1) {
            var maxNum = -1
            for i in 0...(n - 1) {
                maxNum = max(maxNum, matrix[i][j])
            }
            for i in 0...(n - 1) {
                if resoult[i][j] == -1 {
                    resoult[i][j] = maxNum
                }
            }
        }
        return resoult
    }
}

// 724. 寻找数组的中心下标 基础逻辑
class Solution {
    func pivotIndex(_ nums: [Int]) -> Int {
        var (leftSum, rightSum) = (0, nums.reduce(0, +))
        for (i, num) in nums.enumerated() {
            rightSum -= num
            if leftSum == rightSum { return i }
            leftSum += num
        }
        return -1
    }
}

// 2974. 最小数字游戏 基础逻辑
class Solution {
  func numberGame(_ nums: [Int]) -> [Int] {
      var newNums = nums.sorted()
      for i in 0...(nums.count / 2 - 1) {
          (newNums[2*i], newNums[2*i + 1]) = (newNums[2*i + 1], newNums[2*i])
      }
      return newNums
  }
}

// 2956. 找到两个数组中的公共元素 字典
class Solution {
    func findIntersectionValues(_ nums1: [Int], _ nums2: [Int]) -> [Int] {
        var s1 = Set(nums1)
        var s2 = Set(nums2)
        var res = Array(repeating: 0, count: 2)
        for x in nums1 {
            if s2.contains(x) {
                res[0] += 1
            }
        }
        for x in nums2 {
            if s1.contains(x) {
                res[1] += 1
            }
        }
        return res
    }
}


// 3096. 得到更多分数的最少关卡数目 基础逻辑
class Solution {
    func minimumLevels(_ possible: [Int]) -> Int {
        let n = possible.count
        var sum = 0
        for i in 1...n {
            let t = possible[i - 1] == 0 ? -1 : 1
            sum += t
        }
        var tep = 0
        for i in 1..<n {
            let t = possible[i - 1] == 0 ? -1 : 1
            tep += t
            if tep * 2 > sum {
                return i
            }
        }
        return -1
    }
}

// 2766. 重新放置石块 基础逻辑
class Solution {
    func relocateMarbles(_ nums: [Int], _ moveFrom: [Int], _ moveTo: [Int]) -> [Int] {
        var numSet = Set(nums)
        for i in 0..<moveFrom.count {
            numSet.remove(moveFrom[i])
            numSet.insert(moveTo[i])
        }
        return Array(numSet).sorted()
        
    }
}

// 682. 棒球比赛 模拟
class Solution {
    func calPoints(_ ops: [String]) -> Int {
        var sum = 0
        var stack : [Int] = []
        for e in ops {
            switch e {
            case "+":
                let v = stack[stack.count - 1] + stack[stack.count - 2]
                stack.append(v)
                sum += v
            case "D":
                let v = stack[stack.count - 1] * 2
                stack.append(v)
                sum += v
            case "C":
                let v = stack.popLast()!
                sum -= v
            default:
                let v = Int(e)!
                stack.append(v)
                sum += v
            }
        }
        return sum
    }

}

// 3111. 覆盖所有点的最少矩形数目 基础逻辑
class Solution {
    func minRectanglesToCoverPoints(_ points: [[Int]], _ w: Int) -> Int {
        let newPoints = points.sorted { a, b in
            return a[0] - b[0] < 0
        }
        var res = 0
        var bound = -1
        for p in newPoints {
            if p[0] > bound {
                bound = p[0] + w
                res += 1
            }
        }
        
        return res
    }
}

// 3151. 特殊数组 I 基础逻辑
class Solution {
    func isArraySpecial(_ nums: [Int]) -> Bool {
        if nums.count < 2 {
            return true
        }
        for i in 1...(nums.count - 1) {
            if nums[i] % 2 == nums[i - 1] % 2 {
                return false
            }
        }
        return true
    }
}

// 3152. 特殊数组 II 基础逻辑
class Solution {
    func isArraySpecial(_ nums: [Int], _ queries: [[Int]]) -> [Bool] {
        var dp = Array(repeating: 1, count: nums.count)
        for i in 1..<nums.count {
           if nums[i] % 2 != nums[i - 1] % 2 {
               dp[i] = dp[i - 1] + 1
           }
        }
        var res = [Bool]()
        for query in queries {
            let x = query[0], y = query[1]
            res.append(dp[y] >= (y - x + 1))
        }
        return res
    }
}

// 3142. 判断矩阵是否满足条件 基础逻辑
class Solution {
    func satisfiesConditions(_ grid: [[Int]]) -> Bool {
        for  i in 0..<grid.count {
            for j in 0..<grid[i].count {
                if i + 1 < grid.count, grid[i][j] != grid[i+1][j] {
                    return false
                }
                if j + 1 < grid[i].count, grid[i][j] == grid[i][j+1] {
                    return false
                }
            }
        }
        return true
    }
}

// 2024. 考试的最大困扰度 滑动窗口
class Solution {
    func maxConsecutiveAnswers(_ answerKey: String, _ k: Int) -> Int {
        let chars = Array(answerKey)
        var tCnt = 0, fCnt = 0
        var i = 0, j = 0
        var ans = 0
        while i < chars.count {
            while min(tCnt, fCnt) <= k {
                ans = max(ans, abs(j - i))
                if j >= chars.count { break}
                chars[j] == "T" ? (tCnt += 1) : (fCnt += 1)
                j += 1
            }
            chars[i] == "T" ? (tCnt -= 1) : (fCnt -= 1)
            i += 1
        }
        return ans
    }
}

// 3174. 清除数字 基础逻辑
class Solution {
    func clearDigits(_ s: String) -> String {
        var result = ""
        for c in s {
            if c.isNumber {
                result.removeLast()
            } else {
                result.append(c)
            }
        }
        return result
    }
}

// 2414. 最长的字母序连续子字符串的长度 基础逻辑
class Solution {
    func longestContinuousSubstring(_ s: String) -> Int {
        var res = 1, cur = 1
        var last = s.first ?? Character("")
        for char in s {
            if char.asciiValue! == last.asciiValue! + 1 {
                cur += 1
            } else {
                cur = 1
            }
            last = char
            res = max(cur, res)
        }
        return res
    }
}

// 2207. 字符串中最多数目的子序列 基础逻辑
class Solution {
    func maximumSubsequenceCount(_ text: String, _ pattern: String) -> Int {
        var res = 0, cnt1 = 0, cnt2 = 0
        for char in text {
            if char == pattern.last! {
                res += cnt1
                cnt2 += 1
            }
            if char == pattern.first! {
                cnt1 += 1
            }
        }
        return res + max(cnt1, cnt2)
    }
}

// 2535. 数组元素和与数字和的绝对差 基础逻辑
class Solution {
    func differenceOfSum(_ nums: [Int]) -> Int {
        var ans = 0
        for num in nums {
            ans += num
            var newNum = num
            while newNum > 0 {
                ans -= newNum % 10
                newNum = newNum / 10
            }
        }
        return ans

    }
}

// 2073. 买票需要的时间 基础逻辑
class Solution {
    func timeRequiredToBuy(_ tickets: [Int], _ k: Int) -> Int {
        var res = 0,  ticket = tickets[k]
        for i in 0...(tickets.count - 1) {
            if i <= k {
                res += min(tickets[i], ticket)
            } else {
                res += min(tickets[i], ticket - 1)
            }
        }
        return res
    }
}

// 3194. 最小元素和最大元素的最小平均值 基础逻辑
class Solution {
    func minimumAverage(_ nums: [Int]) -> Double {
        guard nums.count > 1 else {
            return 0
        }
        let newNums = nums.sorted()
        var i = 0, j = nums.count - 1
        var res = Double(newNums.first! + newNums.last!) / 2.0
        while i < j {
            res = min(res, Double(newNums[i] + newNums[j]) / 2.0)
            i += 1
            j -= 1
        }
        return res
    }
}

// 3185. 构成整天的下标对数目 II 基础逻辑
class Solution {
    func countCompleteDayPairs(_ hours: [Int]) -> Int {
        var map = [Int:Int]()
        var ans = 0
        for hour in hours {
            ans += map[(24 - hour % 24) % 24] ?? 0
            map[hour%24, default: 0] += 1
        }
        return ans
    }
}
