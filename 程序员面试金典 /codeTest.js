//01.01 如果用2的26次方的数字（或者26位数字）也一样可以解决问题。
/**
 * @param {string} astr
 * @return {boolean}
 */
var isUnique = function(astr) {
    let backArray = new Array(26).fill(false);
    for (let index = 0; index < astr.length; index++) {
        let char = astr[index].charCodeAt() - '97'
        if(backArray[char]) {
            return false
        } else {
            backArray[char] = true
        }
    }
    return true
};

//01.02. 判定是否互为字符重排 数组记录
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var CheckPermutation = function(s1, s2) {
    let backArray = new Array(26).fill(0);
    for (let index = 0; index < s1.length; index++) {
        let char = s1[index].charCodeAt() - '97'
        backArray[char] = backArray[char] +1
    }
    for (let index = 0; index < s2.length; index++) {
        let char = s2[index].charCodeAt() - '97'
        if(backArray[char] == 0) {
            return false;
        }
        backArray[char] = backArray[char] - 1
    }
    for (let index = 0; index < backArray.length; index++) {
        if(backArray[index] != 0) {return false}
    }
    return true
};
 
// 面试题 01.03. URL化 基本逻辑
/**
 * @param {string} S
 * @param {number} length
 * @return {string}
 */
var replaceSpaces = function(S, length) {
    let result = '';
    for (let index = 0; index < length; index++) {
        result += S[index] == ' ' ?  '%20' : S[index]
    }  
    return result
};

// 面试题 01.04. 回文排列 map记录
/**
 * @param {string} s
 * @return {boolean}
 */
var canPermutePalindrome = function(s) {
    let backMap = new Map();
    let single = 0
    for (let index = 0; index < s.length; index++) {
        let key = s[index]
        backMap.set(key,(backMap.get(key) || 0)+1)
    }
    let isFirst = false;
    for(let item of backMap) {
        if(item[1]%2  == 1) {
            if(!isFirst) {
                isFirst = true
            } else {
                return false
            }
        }
    }
    return true

};