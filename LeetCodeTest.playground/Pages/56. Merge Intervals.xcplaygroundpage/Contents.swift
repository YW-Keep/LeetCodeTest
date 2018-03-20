/*
 Given a collection of intervals, merge all overlapping intervals.
 
 For example,
 Given [1,3],[2,6],[8,10],[15,18],
 return [1,6],[8,10],[15,18].
 */

import Foundation

public class Interval {
    public var start: Int
    public var end: Int
    public init(_ start: Int, _ end: Int) {
        self.start = start
        self.end = end
    }
}
 
class Solution {
    func merge(_ intervals: [Interval]) -> [Interval] {
        let listArray = intervals.sorted { (value1, value2) -> Bool in
            value1.start < value2.start
        }
        var result: [Interval] = []
        for interval in listArray {
            guard result.count > 0 else {
                result.append(interval)
                continue
            }
            let lastInterval = result.last!
            if lastInterval.end < interval.start {
                result.append(interval)
            } else {
                lastInterval.end = max(lastInterval.end, interval.end)
            }
        }
        return result
    }
}
