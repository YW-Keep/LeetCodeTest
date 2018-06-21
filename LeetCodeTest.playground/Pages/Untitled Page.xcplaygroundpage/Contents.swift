//: [Previous](@previous)

import Foundation

var str = "Hello, playground"



func getWays(_ count: Int) -> Int {
    guard count > 0 else {
        return 0
    }
    if count == 1 { return 1 }
    if count == 2 { return 2 }
    var a = 1
    var b = 2
    var result = 0
    for _ in 3...count {
        result = a + b
        a = b
        b = result
    }
    return result
}

func getMostGold(_ people: Int,_ mines: [(gold: Int, people: Int)]) -> Int {
    
    guard mines.count > 0 && people > 0 else {
        return 0
    }
    
    var record: [Int] = Array(repeating: 0, count: people + 1)
    for mine in mines {
        var newRecord: [Int] = []
        for row in 0...people {
            if row < mine.1 {
                newRecord.append(record[row])
            } else {
                newRecord.append(max(record[row], record[row - mine.1] + mine.0))
            }
        }
        record = newRecord
    }
    return record.last!
}

