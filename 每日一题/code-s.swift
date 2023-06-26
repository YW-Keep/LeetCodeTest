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