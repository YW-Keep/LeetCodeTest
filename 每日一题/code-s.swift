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
