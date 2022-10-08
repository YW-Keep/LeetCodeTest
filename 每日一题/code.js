// 167. 两数之和 II - 输入有序数组  双指针
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let start = 0, end = numbers.length-1
    while(start < end) {
        let sum = numbers[start] + numbers[end]
        if(sum > target) {
            end--
        } else if(sum < target) {
            start++
        } else {
            return [start +1, end+1]
        }
    }
    return[]

};

// 95. 不同的二叉搜索树 II 递归
/** 
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
    function buildTree(start, end) {
      let ans = [];
      if (start > end) return [null];
      for (let i = start; i <= end; i++) {
        let leftNodes = buildTree(start, i - 1);
        let rightNodes = buildTree(i + 1, end);
        for (const leftNode of leftNodes) {
          for (const rightNode of rightNodes) {
            let cur = new TreeNode(i);
            cur.left = leftNode;
            cur.right = rightNode;
            ans.push(cur);
          }
        }
      }
      return ans;
    }
    if (n === 0) return [];
    return buildTree(1, n);
  };

// 剑指 Offer 11. 旋转数组的最小数字 二分法
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function(numbers) {
  let i = 0,j = numbers.length - 1
  while(i < j) {
      let mid = Math.floor((i + j)/2)
      if(numbers[mid] < numbers[j]) {
          j = mid
      } else if(numbers[mid] > numbers[j]) {
          i = mid + 1
      }  else {
          j--
      }
  }
  return numbers[i]
};

// 64. 最小路径和 动态规划
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  let backup = new Array(grid[0].length).fill(Number.MAX_VALUE)
  backup[0] = 0
  for (let i = 0; i < grid.length; i++) {
    let nums = grid[i]
    backup[0] +=  nums[0]
    for (let j = 1; j < nums.length; j++) {
      backup[j] =  Math.min(backup[j-1],backup[j]) + nums[j]
    }
  }
  return backup[backup.length -1]
};
// 392. 判断子序列 基础题
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
  if(s.length == 0) {return true}
  let i = 0;
  for (let j = 0; j < t.length; j++) {
    if(t[j] == s[i]) {
      i++
      if(i == s.length) {
        return true
      }
    }
  }
  return false
};

// 104. 二叉树的最大深度 二叉树层序遍历
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  if(!root) { return 0} 
  let arr = [root],res = 0
  while(arr.length > 0) {
    res++;
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
      let node = arr[i]
      if(node.left) {
        newArr.push(node.left)
      } 
      if(node.right) {
        newArr.push(node.right)
      }
    }
    arr = newArr
  }
  return res;
};

// 343. 整数拆分 基础题
/** 
 * @param {number} n
 * @return {number}
 */
var integerBreak = function(n) {
  if(n == 2) {return 1}
  if(n == 3) {return 2}
  let num = Math.floor(n/3)
  let res  = Math.pow(3,num)
  let remainder = n%3
  if(remainder == 1) {
    res = res/3*4
  } else if(remainder == 2) {
    res = res*2
  }
  return res
};

// 114. 二叉树展开为链表 循环
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
  let node = root;
  while(node != null) {
    if(node.left != null) {
      let rNode = node.left
      while(rNode.right != null) {
        rNode = rNode.right
      } 
      rNode.right = node.right;
      node.right = node.left;
      node.left = null
    }
    node = node.right
  }
};

// 415. 字符串相加  基础逻辑
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
  let l1 = num1.length - 1, l2 = num2.length - 1,add = 0,res = ''
  while(l1 >=0 || l2 >= 0 || add > 0) {
    let num = add + (l1 >= 0 ? Number.parseInt(num1[l1]) : 0) + (l2 >= 0 ? Number.parseInt(num2[l2]) : 0)
    add =  Math.floor(num/10)
    num = num%10;
    res = num.toString() + res;
    l1--;
    l2--;
  }
  return res;
};

// 面试题 08.03. 魔术索引 基础思考
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMagicIndex = function(nums) {
  for (let i = 0;i < nums.length;i++) {
    if(nums[i] == i) {
      return i
    } else if(nums[i] > i) {
      i = nums[i] - 1
    }
  }
  return -1
};

// 32. 最长有效括号  队列
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  let backup = [-1],max = 0
  for (let i = 0; i < s.length; i++) {
    let char  = s[i]
    if(char  == '(') {
      backup.push(i)
    } else {
      backup.pop();
      if(backup.length == 0) {
        backup.push(i)
      }
      max = Math.max(max,i - backup[backup.length -1])
    }
  }
  return max
};

// 207. 课程表 深度遍历
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  let mark = new Array(numCourses).fill(0)
  let backup = new Array()
  for (let i = 0; i < numCourses; i++) {
    backup.push(new Array())
  }
  for (let i = 0; i < prerequisites.length; i++) {
    backup[prerequisites[i][0]].push(prerequisites[i][1])  
  }
  console.log(backup)
  for (let i = 0; i < backup.length; i++) {
    for (let j = 0; j < backup[i].length; j++) {
      if(!check(backup[i][j])) {
        return false
      }
    }
  }
  return true

  function check(index) {
    if(backup[index].length == 0) {
      return true
    }
    if(mark[index] == -1) {
      return true
    }
    if(mark[index] == 1) {
      return false
    }
    mark[index] = 1
    for (let k = 0; k < backup[index].length; k++) {
      if(!check(backup[index][k])) {
        return false;
      }
    }
    // 回朔
    mark[index] = -1
    return true
  }
};

// 337. 打家劫舍 III 递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function(root) {
 // 分为不含节点与含节点 2种情况 0是包含当前节点，1是不包含当前节点的
 let res = dfs(root)
 return Math.max(res[0],res[1])

 function dfs(node) {
   if(!node) {
     return [0,0]
   }
   let left = dfs(node.left)
   let right = dfs(node.right)
   return[left[1] + right[1] + node.val, Math.max(left[0],left[1]) + Math.max(right[0],right[1])]
 }
};

// 100. 相同的树  递归基础题
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
  if(!p  && !q) {return true}
  if(!p || !q) {return false}
  return p.val == q.val && isSameTree(p.left,q.left) && isSameTree(p.right,q.right) 
};

// 99. 恢复二叉搜索树 二叉树的中序遍历
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */

var recoverTree = function(root) {
  const stack = [];
  let x = null, y = null, pred = null;

  while (stack.length || root !== null) {
    while (root !== null) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    if (pred !== null && root.val < pred.val) {
      y = root;
      if (x === null) {
          x = pred;
      }
      else break;
    }
    pred = root;
    root = root.right;
  }
  swap(x, y);

  function swap (x, y) {
    let temp = x.val;
    x.val = y.val;
    y.val = temp;
  }
};

// 696. 计数二进制子串  整合
/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function(s) {
  let backup = 0,start = '0',now = 0,result = 0
  for (let i = 0; i < s.length; i++) {
    if(start == s[i]) {
      now++
    } else {
      result += Math.min(backup,now)
      backup = now
      start = s[i]
      now = 1
    }
  }
  result += Math.min(backup,now)
  return result
};

// 130. 被围绕的区域 连通
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
  class UF {
      constructor(num) {
          this.count = num;
          this.size = Array(num)
          this.parent = Array(num)
          for (let i = 0; i < num; i++) {
              this.parent[i] = i;
              this.size[i] = 1;
          }
      }
      union(p,q) {
          let rootP = this.find(p)
          let rootQ = this.find(q)
          if(rootP == rootQ) {
              return
          }
          if (this.size[rootP] > this.size[rootQ]) {
              this.parent[rootQ] = rootP;
              this.size[rootP] += this.size[rootQ];
          } else {
              this.parent[rootP] = rootQ;
              this.size[rootQ] += this.size[rootP];
          }
          this.count--
      }
      connected(p,q) {
          let rootP = this.find(p)
          let rootQ = this.find(q)
          return rootP == rootQ
      }
      find(x) {
          while(this.parent[x] != x) {
              // 进行路径压缩
              this.parent[x] = this.parent[this.parent[x]];
              x = this.parent[x];
          }
          return x;
      }
  }
  if(board.length == 0) {return}
  let m = board.length,n = board[0].length
  let uf = new UF(m*n+1),dummy = m*n
  for (let i = 0; i < m; i++) {
      if(board[i][0] == 'O') {
          uf.union(i*n,dummy)
      }
      if(board[i][n-1] == 'O') {
          uf.union(i*n + n-1,dummy)
      }
  }
  for (let i = 0; i < n; i++) {
      if(board[0][i]== 'O') {
          uf.union(i,dummy)
      }
      if(board[m-1][i]== 'O') {
          uf.union(n * (m - 1) + i,dummy)
      }
  }
  let d = [[1,0],[0,1],[0,-1],[-1,0]]
  for (let i = 1; i < m-1; i++) {
      for (let j = 1; j < n-1; j++) {
          if(board[i][j] == 'O') {
              for (let k = 0; k < 4; k++) {
                  let x = i + d[k][0],y = j + d[k][1]
                  if(board[x][y] == 'O') {
                      uf.union(x * n + y, i * n + j);
                  }
              }
          }
          
      }
  }
  for (let i = 1; i < m-1; i++) {
      for (let j = 1; j < n-1; j++) {
          if (!uf.connected(dummy, i * n + j)) {
              board[i][j] = 'X'
          }
      }
  }
  return board;
};

// 93. 复原IP地址 回朔算法
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  let res = []
  dfs([],0)
  return res
  
  function dfs(subRes,start) {
    if(subRes.length == 4) {
      if(start == s.length) {
        res.push(subRes.join('.'))
      }
      return
    }
    for (let len = 1; len <= 3; len++) {
      if(start + len -1 >= s.length) {
        return
      }
      if (len != 1 && s[start] == '0') {
        return
      }
      let str = s.substring(start,start + len)
      if(len == 3  && Number.parseInt(str) > 255) {
        return
      }
      subRes.push(str);
      dfs(subRes,start +len)
      subRes.pop()
    }
  }
};

// 133. 克隆图  因为值唯一 所以backup记录就好 栈调用
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
  if(!node) {return null}
  let backup = new Map()
  let newNode = new Node(node.val,[])
  let stack = [node]
  backup.set(node.val,newNode)
  while(stack.length) {
    let _node = stack.pop()
    let _newNode = backup.get(_node.val)
    for (let i = 0; i < _node.neighbors.length; i++) {
      let subNode = _node.neighbors[i]
      let _subNewNode = backup.get(subNode.val)
      if(!_subNewNode) {
        stack.push(subNode)
        _subNewNode = new Node(subNode.val,[]);
        backup.set(subNode.val,_subNewNode)
      }
      _newNode.neighbors.push(_subNewNode)
    }
  }
  return newNode; 
};
// 43.字符串相乘 每个相乘再累加
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
  if(num1 == '0' || num2 == '0') {
    return '0'
  }
  let m = num1.length,n = num2.length,arr = new Array(m +n).fill(0)
  for (let i = m -1; i >= 0; i--) {
    let x = Number.parseInt(num1[i])
    for (let j = n -1; j >= 0; j --) {
      let y = Number.parseInt(num2[j])
      arr[i+j+1] += x*y
    }
  }
  for (let i = m +n -1; i > 0; i--) {
    arr[i -1] += Math.floor(arr[i]/10)
    arr[i] %=10 
  }
  if(arr[0] == 0) {
    arr.shift()
  } 
  return arr.join('')
};

// 20. 有效的括号
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  var key = {
      "(" : ")",
      "[" : "]",
      "{" : "}"
  };
  var queue = Array();
  for(i=0;i<s.length;i++) {
      var arr  = s[i];
      if (key[arr] != null) {
          queue.push(arr);
      } else {
         var last = queue.pop();
         if (key[last] != arr) {
             return false;
         }
      }
  }
  if (queue.length == 0) {
      return true;
  } else {
      return false;
  }
};

// 1450. 在既定时间做作业的学生人数 基础逻辑
/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number} queryTime
 * @return {number}
 */
var busyStudent = function(startTime, endTime, queryTime) {
  let res = 0
  for (let i = 0; i < startTime.length; i++) {
    if ( startTime[i] <= queryTime && queryTime <= endTime[i]) {
      res++
    }
  }
  return res

};

// 733. 图像渲染 栈存储 循环
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, newColor) {
  let old = image[sr][sc]
  if(old == newColor) {return image}
  let backup = [[sr,sc]]
  let m = image.length,n =image[0].length
  while(backup.length > 0) {
    let node = backup.shift()
    let i = node[0],j = node[1]
    image[i][j] = newColor;
    if(i - 1 >= 0 && image[i-1][j] == old) {
      backup.push([i - 1,j])
    }
    if(i + 1 < m && image[i+1][j] == old) {
      backup.push([i + 1,j])
    }
    if(j - 1 >= 0 && image[i][j-1] == old) {
      backup.push([i,j -1])
    }
    if(j + 1 < n && image[i][j+1] == old) {
      backup.push([i,j+1])
    }
  }
  return image;
};

// 110. 平衡二叉树 可以用-1代表报错
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {

  return getDeep(root) != -1
  function getDeep(node) {
    if(!node) {
      return 0
    }
    let left = getDeep(node.left)
    if(left == -1) {return -1}
    let right = getDeep(node.right)
    if(right == -1) {return -1}
    if(Math.abs(left -right) > 1) {
      return -1
    }
    return Math.max(left,right) +1;
  }
};

// 109. 有序链表转换二叉搜索树 链表转数组
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
  let backup = []
  let next =  head;
  while(next) {
    backup.push(next.val)
    next =  next.next
  }
  return arrToBST(backup)
  
  function arrToBST(arr) {
    if(arr.length == 0) {
      return null
    }
    let num = Math.floor(arr.length/2)
    let node = new TreeNode(arr[num])
    node.left = arrToBST(arr.slice(0,num))
    node.right = arrToBST(arr.slice(num+1))
    return node
  }
};
// 647. 回文子串 Manacher 算法
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
  let n = s.length;
  let t = ['$', '#'];
  for (let i = 0; i < n; ++i) {
      t.push(s[i]);
      t.push('#');
  }
  n = t.length;
  t.push('!');

  let f = new Array(n).fill(0);
  let iMax = 0, rMax = 0, ans = 0;
  for (let i = 2; i < n; i++) {
      f[i] = i < rMax ? Math.min(rMax - i + 1, f[2 * iMax - i]) : 1;
      while (t[i + f[i]] == t[i - f[i]]) {
          f[i]++;
      }
      if (i + f[i] - 1 > rMax) {
          iMax = i;
          rMax = i + f[i] - 1;
      }
      ans += Math.floor(f[i] / 2);
  }

  return ans;
};

// 529. 扫雷游戏 dfs
/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
var updateBoard = function(board, click) {
  let dx = [0,1,0,-1,1,1,-1,-1];
  let dy = [1,0,-1,0,1,-1,1,-1];
  let x = click[0],y = click[1]

  if(board[x][y] == 'M') {
    board[x][y] = 'X';
  } else {
    dfs(x,y)
  }
  return board


  function dfs(x,y) {
    let count = 0
    for (let i = 0; i < 8; i++) {
      let tx = x + dx[i]
      let ty = y + dy[i]
      if(tx < 0 || tx >= board.length || ty < 0 || ty >= board[0].length) {
        continue
      }
      if(board[tx][ty] == 'M') {
        count++
      }
    }
    if(count > 0) {
      board[x][y] = count.toString()
    } else {
      board[x][y] = 'B'
      for (let i = 0; i < 8; i++) {
        let tx = x + dx[i]
        let ty = y + dy[i]
        if(tx < 0 || tx >= board.length || ty < 0 || ty >= board[0].length || board[tx][ty] != 'E') {
          continue
        }
        dfs(tx,ty)
      }
    }
  }
};

// 111. 二叉树的最小深度  循环 递归都可以
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
  if(!root) {return 0}
  let res = 0,backup = [root]
  while(backup.length > 0) {
    res++
    let newBackup = [] 
    for (let i = 0; i < backup.length; i++) {
      let node = backup[i];
      if(!node.left && !node.right) {
        return res
      } 
      if(node.left) {
        newBackup.push(node.left)
      }
      if(node.right) {
        newBackup.push(node.right)
      }
    }
    backup = newBackup;
  }
  return res

};

// 679. 24 点游戏 穷举 4个里面选2个数有 12种可能 然后操作4  三个里挑2个有6中（有顺序的）再四个操作 在2个有顺序的  再四个操作
// 12x4x6x4x2x4 = 9216种 所以最多也就这么多  递归两个数变成一个数
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var judgePoint24 = function(nums) {
    const len = nums.length;
  if (len == 1) { // 递归的出口，剩一个数，处理一下精度丢失的问题
    const diff = nums[0] - 24;
    return Math.abs(diff) < 0.00001;
  }
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const copyNums = nums.slice(); // 拷贝一份原数组
      copyNums.splice(j, 1); // 先删除索引大的数字
      copyNums.splice(i, 1); // 这样才不会影响索引小的数字的位置

      let n1 = nums[i];
      let n2 = nums[j];
      let isValid = false; // 
      
      isValid = isValid || judgePoint24(copyNums.concat(n1 + n2));
      // 减与被减
      isValid = isValid || judgePoint24(copyNums.concat(n1 - n2));
      isValid = isValid || judgePoint24(copyNums.concat(n2 - n1));
      // 乘
      isValid = isValid || judgePoint24(copyNums.concat(n1 * n2));
      if (n2 !== 0) { // 除
        isValid = isValid || judgePoint24(copyNums.concat(n1 / n2));
      }
      if (n1 !== 0) { // 被除
        isValid = isValid || judgePoint24(copyNums.concat(n2 / n1));
      }
      if (isValid) return true; 
    }
  }
  return false;
};

// 459. 重复的子字符串  其实问题就变成了 s + s  能不能从1开始到s.length 中找个一个点正好s是s+s的子串
var repeatedSubstringPattern = function(s) {
  return (s + s).indexOf(s, 1) != s.length;
};

// 201. 数字范围按位与  因为是与所以 有0 就是0 所以只要计算开始结束2位的公共头
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var rangeBitwiseAnd = function(m, n) {
  let shift = 0
  while(m < n) {
    m = m >> 1
    n = n >> 1
    shift += 1
  }
  return m << shift

};

// 491. 递增子序列 递归去重 递归结束后再添加
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function(nums) {
  let res = []
  dfs(0,[]);
  return res;

  function dfs(i,backup) {
    if(i == nums.length ) {
      if(backup.length > 1) {
        res.push(backup.concat())
      }
      return;
    }
    if(backup.length == 0 || backup[backup.length -1 ] <= nums[i]) {
      backup.push(nums[i])
      dfs(i+1,backup)
      backup.pop()
    } 
    if(backup.length == 0 || backup[backup.length -1] != nums[i]) {
      dfs(i+1,backup)
    }
  }
};

// 17. 电话号码的字母组合  可以遍历 也可以回朔
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {

  if(digits.length == 0) {
       return []
   }
  let backup ={
    '2':['a','b','c'],
    '3':['d','e','f'],
    '4':['g','h','i'],
    '5':['j','k','l'],
    '6':['m','n','o'],
    '7':['p','q','r','s'],
    '8':['t','u','v'],
    '9':['w','x','y','z'],
  }
  let res = [],temp = []
  dfs(0)
  return res;

  function dfs(num) {
    if(num == digits.length) {
      res.push(temp.join(''))
      return;
    } 
    
    let arr = backup[digits[num]]
    for (let i = 0; i < arr.length; i++) {
      temp.push(arr[i])
      dfs(num+1)
      temp.pop()
    }
  }
};

// 332. 重新安排行程 Hierholzer 算法

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function(tickets) {
  let graph = getGraph(tickets)
  let ans = []
  dfs('JFK')
  return ans.reverse()
};
function dfs(cur){
  if(!graph.has(cur)) return
  const neighbors = graph.get(cur)
  while(neighbors.length) dfs(graph, neighbors.shift(), ans)
  ans.push(cur)
}
function getGraph(tickets){
  const map = new Map()
  for(let i = 0;i < tickets.length;i++){
      const from = tickets[i][0]
      const to = tickets[i][1]
      if(!map.has(from)) map.set(from, [])
      if(!map.has(to)) map.set(to, [])
      map.get(from).push(to)
  }
  for(let [key, value] of map){
      value.sort((a, b) => a < b ? -1 : a > b ? 1 : 0)
  }
  return map
}

// 657. 机器人能否返回原点 基础逻辑
/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function(moves) {
  let x = 0,y = 0
  for (let i = 0; i < moves.length; i++) {
    let char  = moves[i]
    switch (char) {
      case 'R':
        x++
        break;
      case 'L':
        x--
        break;
      case 'U':
        y++
        break;
      case 'D':
        y--
        break;
      default:
        break;
    }
  }
  return x == 0 && y == 0
};

// 557. 反转字符串中的单词 III 基础题
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  const ret = [];
  const length = s.length;
  let i = 0;
  while (i < length) {
      let start = i;
      while (i < length && s.charAt(i) != ' ') {
          i++;
      }
      for (let p = start; p < i; p++) {
          ret.push(s.charAt(start + i - 1 - p));
      }
      while (i < length && s.charAt(i) == ' ') {
          i++;
          ret.push(' ');
      }
  }
  return ret.join('');
};


// 841. 钥匙和房间 遍历
/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function(rooms) {
  let num = 0
  let backup = new Array(rooms.length).fill(false)
  let arr = [0];
  while(arr.length > 0) {
    let i = arr.pop()
    if(!backup[i]) {
      num++
      if (num == rooms.length) {
        return true
      }
      arr = arr.concat(rooms[i])
      backup[i] = true;
    }
  }
  return false
};

// 214. 最短回文串 KMP 算法 
/**
 * @param {string} s
 * @return {string}
 */
const shortestPalindrome = (s) => {
  const rev_s = s.split('').reverse().join('');
  const str = s + "#" + rev_s;
  const next = new Array(str.length).fill(0);
  // 抽出来，方便学习记忆，这是我写的模板
  const kmp = (next, str) => {
    next[0] = 0;
    let len = 0;
    let i = 1;
    while (i < str.length) {
      if (str[i] == str[len]) {
        len++;
        next[i] = len;
        i++;
      } else {
        if (len == 0) {
          next[i] = 0;
          i++;
        } else {
          len = next[len - 1];
        }
      }
    }
  };
  kmp(next, str);
  const maxLen = next[str.length - 1]; // 最长回文前缀的长
  const add = s.substring(maxLen).split('').reverse().join('');
  return add + s;
};

// 486. 预测赢家 动态规划
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var PredictTheWinner = function(nums) {
  let count = nums.length
  let backup = new Array(count).fill(new Array(count).concat())
  for (let i = 0; i < count; i++) {
    backup[i][i] = nums[i]
  }
  for (let i = count - 2; i > -1; i--) {
    for (let j = i + 1; j < count; j++) {
      backup[i][j] = Math.max(nums[i] - backup[i + 1][j],nums[j] - backup[i][j - 1])
    }
  }
  return backup[0][count -1] >= 0;
};

// 剑指 Offer 20. 表示数值的字符串 正则
/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
  return /^[+-]?(\d+(\.\d*)?|(\.\d+))(e[+-]?\d+)?$/i.test(s.trim());
};

// 51. N 皇后  遍历  可以回朔 我这里没有回朔
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  let result = [];
  backStart(0, []);
  return result;

  function backStart(k, arr) {
    if (k >= n) {
        let ar = [];
        arr.forEach(e => {//讲我们要的数据转换为需要的格式
            let str = '..............................';
            str=str.substring(0,n);
            str = `${str.substring(0, e)}Q${str.substring(e + 1)}`
            ar.push(str);
        })
        result.push(ar);
    } else {
        for (let i = 0; i < n; i++) {
            arr[k] = i;
            if (isBack(k, arr)) {
                backStart(k + 1, arr)
            }
        }
    }
  }
  function isBack(k, arr) {
    for (let i = 0; i < k; i++) {
        if (k - i == Math.abs(arr[i] - arr[k]) || arr[k] == arr[i]) {
            return false;
        }
    }
    return true;
  }
};

// 257. 二叉树的所有路径 回朔
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  let res = []
  let backArray = []
  if(root) {
    dfs(root)
  }
  return res;

  function dfs(node) {
    backArray.push(node.val);
    if(!node.left && !node.right) {
      res.push(backArray.join('->'))
    }
    if(node.left) {
      dfs(node.left)
    }
    if(node.right) {
      dfs(node.right);
    }
    backArray.pop()
  }
};

// 60. 第k个排列 按位计算 
var getPermutation = (n, k) => { 
  let nums = [];
  let factorial = 1;               

  for (let i = 1; i <= n; i++) {
    nums.push(i);                  
    factorial = factorial * i;   
  }

  k--;   
  let resStr = '';

  while (nums.length > 0) {              
    factorial = factorial / nums.length; 
    const index = k / factorial | 0;   
    resStr += nums[index];               
    nums.splice(index, 1);             
    k = k % factorial;                 
  }
  return resStr;
};

// 107. 二叉树的层次遍历 II 二叉树层序遍历
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
  if(!root) {return []}
  let backup = [root],res = [];
  while(backup.length > 0) {
    let inArray = []
    let newBackup = []
    for (let i = 0; i < backup.length; i++) {
      let node = backup[i]
      inArray.push(node.val);
      if(node.left) {
        newBackup.push(node.left)
      }     
      if(node.right) {
        newBackup.push(node.right)
      }  
    }
    res.unshift(inArray)
    backup = newBackup
  } 
  return res
};

// 347. 前 K 个高频元素 字典排序
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

var topKFrequent = function(nums, k) {
  var myMap = new Map();
  for (let index = 0; index < nums.length; index++) {
      const element = nums[index];
      myMap.set(element,(myMap.get(element)|| 0) +1)
  }

  var reslut = Array();
  for(var key of myMap) {
      reslut.push(key[0]);
  }
  var sortArray = reslut.sort(copare);
  function copare(x,y) {
      return myMap.get(y) - myMap.get(x);
  }
  return sortArray.slice(0,k);
};

// 77. 组合 遍历
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  if(n < k) {return []}
  let res = []
  dfs([],1);
  return res;

  function dfs(arr,i) {
    if(arr.length == k) {
      res.push(arr)
       return
    }
    if(i > n) {
      return
    }
    dfs(arr.concat(),i+1);
    arr.push(i) 
    dfs(arr.concat(),i+1);
  }
};

// 39. 组合总和 遍历看清楚是否能重复使用
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  let res = []
  dfs([],0,0);
  return res;
  function dfs(arr,i,sum) {
    if(sum == target) {
      res.push(arr)
    }
    if(i >= candidates.length || sum >= target) {
      return
    }
    dfs(arr.concat(),i+1,sum);
    arr.push(candidates[i]) 
    dfs(arr.concat(),i,sum + candidates[i]);
  }
};

// 40. 组合总和 II 排序 去重
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  candidates.sort()
  let backup = new Map(),res =[]
  dfs([],0,0);
  return res;
  function dfs(arr,i,sum) {
    if(sum == target) {
      let key = arr.join(',')
      if(!backup.get(key)) {
        res.push(arr)
        backup.set(key,'1')
      }
    }
    if(i >= candidates.length || sum >= target) {
      return
    }
    dfs(arr.concat(),i+1,sum);
    arr.push(candidates[i]) 
    dfs(arr.concat(),i+1,sum + candidates[i]);
  }
};

// 94. 二叉树的中序遍历
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  let res = []
  if(root) {
    dfs(root)
  }
  return res
  function dfs(node) {
    if(node.left) {
      dfs(node.left)
    }
    res.push(node.val)
    if(node.right) {
      dfs(node.right)
    }
  }
};

// 637. 二叉树的层平均值
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function(root) {
  if(!root) {
    return []
  }
  let backup = [root],res =[]
  while(backup.length > 0) {
    let sum = 0,newBackup = []
    for (let i = 0; i < backup.length; i++) {     
      let node = backup[i]
      sum += node.val
      if(node.left) (newBackup.push(node.left))
      if(node.right)(newBackup.push(node.right))
    }
    sum = sum/backup.length
    res.push(sum)
    backup = newBackup;
  }
  return res
};

// 216. 组合总和 III  dfs
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
  let res = []
  dfs(1,[],0)
  return res
  function  dfs(i,arr,sum) {
     if(arr.length == k && sum == n) {
       res.push(arr)
     }
     if(arr.length >= k  || i > 9 || (arr.length + (10-i)) < k) {
       return
     }
     dfs(i+1,arr.concat(),sum)
     arr.push(i)
     dfs(i+1,arr.concat(),sum + i)
   } 
};

// 79. 单词搜索  遍历
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  let h = board.length, w = board[0].length;
  let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  let visited = new Array(h);
  for (let i = 0; i < visited.length; ++i) {
      visited[i] = new Array(w).fill(false);
  }
  for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
          const flag = check(i, j, word, 0);
          if (flag) {
              return true;
          }
      }
  }
  function check(i, j, s, k) {
    if (board[i][j] != s.charAt(k)) {
        return false;
    } else if (k == s.length - 1) {
        return true;
    }
    visited[i][j] = true;
    let result = false;
    for (const [dx, dy] of directions) {
        let newi = i + dx, newj = j + dy;
        if (newi >= 0 && newi < h && newj >= 0 && newj < w) {
            if (!visited[newi][newj]) {
                const flag = check(newi, newj, s, k + 1);
                if (flag) {
                    result = true;
                    break;
                }
            }
        }
    }
    visited[i][j] = false;
    return result;
 } 
  return false;
};

// 1556. 千位分隔数  基础题
/**
 * @param {number} n
 * @return {string}
 */
var thousandSeparator = function(n) {
  if(n == 0) {return '0'}
  let res = '', backup = 0,num = n
  while(num > 0) {
    let last = num%10;
    num = Math.floor(num/10)
    res = last + res
    backup++
    if(num > 0 && backup%3 == 0) {
      res = '.' + res
    }
  }  
  return res
};

// 226. 翻转二叉树 递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  if(!root) {
    return root;
  }
  let left =  invertTree(root.right);
  let right = invertTree(root.left);
  root.left = left;
  root.right = right;
  return root;
};

// 1561. 你可以获得的最大硬币数目 排序
/**
 * @param {number[]} piles
 * @return {number}
 */
var maxCoins = function(piles) {
  piles.sort((a, b) => b - a)
  let num  = Math.floor(piles.length/3),res = 0
  for (let i = 0; i < num; i++) {
    res += piles[i*2 + 1]
  }
  return res
};

// 47. 全排列 II  回朔算法
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var permuteUnique = function(nums) {
  const ans = [];
  const vis = new Array(nums.length).fill(false);
  nums.sort((x, y) => x - y);
  backtrack([]);
  return ans;

  function backtrack(perm) {
    if(perm.length == nums.length) {
      ans.push(perm.slice())
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if(vis[i] || (i > 0 && nums[i] == nums[i-1] && !vis[i-1])) {
        continue;
      }
      perm.push(nums[i])
      vis[i] = true
      backtrack(perm);
      vis[i] = false
      perm.pop()
    }
  }
};

// 404. 左叶子之和 递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
  let res = 0
  if(!root) {return  res}
  if(root.left) {
    if(!root.left.left && !root.left.right) {
      res += root.left.val
    } else {
      res += sumOfLeftLeaves(root.left)
    }
  }
  res += sumOfLeftLeaves(root.right)
  return res
};

// 78. 子集 回朔
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  let res = []
  dfs([],0)
  function dfs(arr,i) {
    if(i == nums.length) {
      res.push(arr.slice())
      return
    }
    dfs(arr,i+1)
    arr.push(nums[i])
    dfs(arr,i+1)
    arr.pop()
  }
  return res;
};

// 538. 把二叉搜索树转换为累加树  反中序遍历
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function(root) {
  let sum = 0
  dfs(root);
  return root

  function dfs(node) {
    if(!node) {return}
    dfs(node.right)
    sum += node.val
    node.val = sum
    dfs(node.left)
  }

};

// 968. 监控二叉树  找到状态方程 递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minCameraCover = function(root) {
  const dfs = (root) => {
      if (!root) {
          return [Math.floor(Number.MAX_SAFE_INTEGER / 2), 0, 0];
      }
      const [la, lb, lc] = dfs(root.left);
      const [ra, rb, rc] = dfs(root.right);
      const a = lc + rc + 1;
      const b = Math.min(a, Math.min(la + rb, ra + lb));
      const c = Math.min(a, lb + rb);
      return [a, b, c];
  }

  return dfs(root)[1];
};

// 617. 合并二叉树  简单递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
  if(!t1) {
    return t2
  }
  if(!t2) {
    return t1
  }
  let newRoot = new TreeNode(t1.val + t2.val)
  newRoot.left =  mergeTrees(t1.left,t2.left)
  newRoot.right = mergeTrees(t1.right,t2.right)
  return newRoot
};
// 501. 二叉搜索树中的众数  递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function(root) {
  if(!root) {
    return [];
  }
  let res = [], num = root.val -1,numCount = 0,maxCount = 0
  dfs(root)
  if(numCount > maxCount) {
    maxCount = numCount 
    res = [num]
  } else if (numCount == maxCount) {
    res.push(num)
  }
  return res;

  function dfs(node)  {
    if(!node) {return }
    dfs(node.left)
    if(node.val == num) {
      numCount++
    } else {
      if(numCount > maxCount) {
        maxCount = numCount 
        res = [num]
      } else if (numCount == maxCount) {
        res.push(num)
      }
      numCount = 1
      num = node.val
    }
    dfs(node.right)
  }
};

//  106. 从中序与后序遍历序列构造二叉树 递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
  if(postorder.length == 0) {return null};
  let root =  new TreeNode(postorder[postorder.length -1]);
  let num = inorder.indexOf(root.val);
  let left = inorder.slice(0,num);
  let right = inorder.slice(num+1);
  root.left = buildTree(inorder.slice(0,num),postorder.slice(0,num));
  root.right = buildTree(inorder.slice(num+1),postorder.slice(num,inorder.length-1))
  return root;
};


// 235. 二叉搜索树的最近公共祖先 基础递归

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  if(!root || !p || !q) {
    return null
  }  
  if(p.val > q.val) {
    return lowestCommonAncestor(root,q,p)
  }
  if(p.val <= root.val && q.val >= root.val) {
    return root
  }  else if (root.val < p.val) {
    return lowestCommonAncestor(root.right,p,q)
  } else {
    return lowestCommonAncestor(root.left,p,q)
  }
};

// 113. 路径总和 II  回朔
/** 
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
  let backup= [],result = []

  dfs(root,0)
  return result

  function dfs(node, num) {
    if(!node) {
      return
    }
    backup.push(node.val) 
    num += node.val
    if(!node.left && !node.right && num == sum) {
      result.push(backup.concat())
    }
    dfs(node.left,num)
    dfs(node.right,num)
    backup.pop()
  }
};

// 145. 二叉树的后序遍历 递归
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  let result = []
  dfs(root)
  return result
  function dfs(node) {
    if(!node) {
      return
    }
    dfs(node.left)
    dfs(node.right)
    result.push(node.val)
  }
};
// 701. 二叉搜索树中的插入操作  递归 找位置
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function(root, val) {
  if(!root) {
    return new TreeNode(val)
  }
  dfs(root);
  return root;

  function dfs(node) {
    if(node.val > val) {
      if(node.left) {
        dfs(node.left) 
      } else {
        node.left = new TreeNode(val)
      }
    } else {
      if(node.right) {
        dfs(node.right)
      } else {
        node.right = new TreeNode(val)
      }
    }
  } 
};

// 141. 环形链表 快慢指针
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  if(!head || !head.next) {
    return false
  }
  let slow = head
  let fast = head.next;
  while(slow != fast) {
    if(!fast || !fast.next) {
      return false
    }
    slow = slow.next
    fast = fast.next.next

  }
  return true
};

// 142. 环形链表 II 与I 基本相同
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
  if (head === null) {
      return null;
  }
  let slow = head, fast = head;
  while (fast !== null) {
      slow = slow.next;
      if (fast.next !== null) {
          fast = fast.next.next;
      } else {
          return null;
      }
      if (fast === slow) {
        break;
      }
  }
  let ptr = head;
  while (ptr !== slow) {
      ptr = ptr.next;
      slow = slow.next;
  }
  return ptr;
};

// 530. 二叉搜索树的最小绝对差 二叉树中序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function(root) {
  let res = Infinity;
  let back = null;
  dfs(root);
  function dfs(node) {
      if(node == null) {return};
      dfs(node.left);
      if(back != null) {
          res = Math.min(res,node.val - back.val);
      }
      back = node;
      dfs(node.right);
  }
  return res;
};

// 416. 分割等和子集 动态规划
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  const n = nums.length;
  if (n < 2) {
      return false;
  }
  let sum = 0, maxNum = 0;
  for (const num of nums) {
      sum += num;
      maxNum = maxNum > num ? maxNum : num;
  }
  if (sum & 1) {
      return false;
  }
  const target = Math.floor(sum / 2);
  if (maxNum > target) {
      return false;
  }
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const num of nums) {
      for (let j = target; j >= num; --j) {
          dp[j] |= dp[j - num];
      }
  }
  return dp[target];
};

// 24. 两两交换链表中的节点 
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
  let root = new ListNode(1);
  root.next = head;
  let node = root;
  while(node.next && node.next.next) {
    let tem  = node.next
    node.next = node.next.next
    tem.next =  tem.next.next
    node.next.next = tem
    node = node.next.next
  }
  return root.next
};

// 1002. 查找常用字符 统计合并最小值
/**
 * @param {string[]} A
 * @return {string[]}
 */
var commonChars = function(A) {
  var backArray = new Array(26).fill(100);
  for(let str of A) {
      var newBack = new Array(26).fill(0);
      for (let index = 0; index < str.length; index++) {
          var num = str.substr(index,1).charCodeAt() - 97;
          newBack[num] +=1;
      }
      for (let index = 0; index < backArray.length; index++) {
          backArray[index] = Math.min(backArray[index],newBack[index]);
      }
  }
  var result = [];
  for (let index = 0; index < backArray.length; index++) {
      var num = backArray[index];
      while(num > 0) {
          result.push(String.fromCharCode(97+index));
          num--;
      }
  }
  return result;
};


// 116. 填充每个节点的下一个右侧节点指针 二叉树层序遍历
/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  if(!root) {
    return root
  }
  let backup = [root]
  while(backup.length > 0) {
    let next = null,newBackup = []
    for (let i = 0; i < backup.length; i++) {
      let node = backup[i]
      if(node.left) {
        newBackup.push(node.left)
      } 
      if(node.right) {
        newBackup.push(node.right)
      }
      if(next) {
        next.next = node;
      }
      next = node;
    }
    backup =newBackup;
  }
  return root
};

// 977. 有序数组的平方 双指针
/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function(A) {
  let negative = -1;
  for (let i = 0; i < A.length; i++) {
    if(A[i] < 0) {
      negative = i
    } else {
      break;
    }
  }
  let res = [], i = negative,j =negative +1
  while(i >= 0  || j < A.length) {
    if(i < 0) {
      res.push(A[j]*A[j])
      j++
    } else if(j >= A.length) {
      res.push(A[i]*A[i])
      i--
    } else if(A[i]*A[i] < A[j]*A[j]) {
      res.push(A[i]*A[i])
      i--
    } else {
      res.push(A[j]*A[j])
      j++
    }
  }
  return res
};


// 19. 删除链表的倒数第N个节点 双指针
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let begain = new ListNode(1);
  begain.next = head;
  let fast = begain,slow = begain
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }
  while(fast.next) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return begain.next
    
};

// 844. 比较含退格的字符串 基础题
/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function(S, T) {
  let newS = getrealStr(S)
  let newT = getrealStr(T)
  return newS == newT

  function getrealStr(str) {
    let res = []
    for (let i = 0; i < str.length; i++) {
      let char = str[i]
      if(char == '#') {
        res.pop()
      } else {
        res.push(char)
      }
    }
    return res.join('');
  }
};

// 143. 重排链表  数组存储
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
  if(!head) {return head}
  let backup = [],node = head;
  while(node.next) {
    backup.push(node.next);
    node = node.next
  }
  let isHead = false
  node = head
  while(backup.length > 0) {
    let inNode = null
    if(isHead) {
      inNode = backup.shift()
    } else {
      inNode = backup.pop()
    }
    inNode.next = null
    node.next = inNode
    node = node.next
    isHead = !isHead
  }
  return head;
};

// 925. 长按键入 双指针
/**
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */
var isLongPressedName = function(name, typed) {
  let i = 0,j = 0
  while(i < name.length || j < typed.length) {
    if(name[i] == typed[j]) {
      i++
      j++
    } else if(typed[j] == typed[j-1]) {
      j++
    } else {
      return false
    }
  }
  return i == name.length
};

// 763. 划分字母区间  map记录
/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function(S) {
  let backup = new Map()
  for (let i = 0; i < S.length; i++) {
    backup.set(S[i],i)
  }
  let res = [], start = -1, max = 0
  for (let i = 0; i < S.length; i++) {
    max = Math.max(max,backup.get(S[i]))
    if(max == i) {
      res.push(i - start)
      start = i
    }
  }
  return res;
};

// 234. 回文链表  双指针
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
  const vals = [];
  while (head !== null) {
      vals.push(head.val);
      head = head.next;
  }
  for (let i = 0, j = vals.length - 1; i < j; ++i, --j) {
      if (vals[i] !== vals[j]) {
          return false;
      }
  }
  return true;
};

// 1024. 视频拼接 动态规划，贪心算法更好
/**
 * @param {number[][]} clips
 * @param {number} T
 * @return {number}
 */
var videoStitching = function(clips, T) {
  let backup = new Array(T).fill(0)
  for (let i = 0; i < clips.length; i++) {
    let clip = clips[i]
    if(clip[0] < T) {
      backup[clip[0]] = Math.max(backup[clip[0]],clip[1])
    }
  }
  let last = 0,pre = 0,ret = 0
  for (let i = 0; i < T; i++) {
    last = Math.max(last,backup[i])
    if(i == last) {
      return -1
    }
    if(i == pre) {
      ret++
      pre = last;
    }
  }
  return ret
};

// 845. 数组中的最长山脉  先找到山峰 再计算
/**
 * @param {number[]} A
 * @return {number}
 */
var longestMountain = function (A) {
  let res = 0
  for(let i=1;i<A.length-1;i++) {
      if(A[i] > A[i-1] && A[i] > A[i+1]) {
          let len = i
          let count = 1
          while(A[len] > A[len-1] && len > 0) {
              count++
              len--
          }
          len = i
          while(A[len] > A[len+1] && len < A.length) {
              count++
              len++
          }
          res = res > count ? res : count
      }
  }
  return res
};

// 1365. 有多少小于当前数字的数字 基础题
/**
 * @param {number[]} A
 * @return {number}
 */
var smallerNumbersThanCurrent = function(nums) {
  const cnt = new Array(101).fill(0);
  const n = nums.length;
  for (let i = 0; i < n; ++i) {
      cnt[nums[i]] += 1;
  }
  for (let i = 1; i <= 100; ++i) {
      cnt[i] += cnt[i - 1];
  }
  const ret = [];
  for (let i = 0; i < n; ++i) {
      ret.push(nums[i] ? cnt[nums[i] - 1] : 0);
  }
  return ret;
};

// 144. 二叉树的前序遍历 基础逻辑
/** 
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  let res = []
  if(!root) {
    return res
  }
  let backup = [],node = root
  while(backup.length > 0 || node) {
    while(node != null) {
      res.push(node.val)
      backup.push(node)
      node = node.left
    }
    node = backup.pop()
    node = node.right
  }
  return res
};


// 1207. 独一无二的出现次数  基础题
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function(arr) {
  let backMap = new Map()
  for (let num of arr) {
     backMap.set(num,(backMap.get(num)||0) + 1);
  }
  let backMap2 = new Map();
  for(let item of backMap) {
      if(backMap2.get(item[1])) {
          return false;
      } 
      backMap2.set(item[1],1)
  }
  return true;
};

// 129. 求根到叶子节点数字之和
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
  let backup = [],res = 0
  if(!root) {
    return 0
  }
  dfs(root)
  return res
  function dfs(node) {
    backup.push(node.val)
    if(!node.left && !node.right) {
      res += Number.parseInt(backup.join(''))
    }
    if(node.left) {
      dfs(node.left)
    }
    if(node.right) {
      dfs(node.right)
    }
    backup.pop()
  }
};

// 463. 岛屿的周长  基本逻辑
/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function(grid) {
  let res = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if(grid[i][j] == 1) {
        res += 4;
        if( 0 <= (i-1) &&grid[i-1][j] == 1) {
          res--
        }
        if(grid.length > (i+1) &&grid[i+1][j] == 1) {
          res--
        }
        if( (j-1) >= 0 &&grid[i][j-1] == 1) {
          res--
        }
        if((j+1) < grid[i].length && grid[i][j+1] ==1) {
          res--
        }
      }
    }
  }
  return res
};

// 349. 两个数组的交集  基础题
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  let backup1 = new Map()
  for (let num  of nums1) {
    backup1.set(num,1)
  }
  let resBack = new Map(),res = []
  for (let num of nums2) {
    if(backup1.get(num)) {
      resBack.set(num,1)
    }
  }
  for (let item of resBack) {
    res.push(item[0])
  }
  return res
};

// LCP 07. 传递信息 动态规划
let numWays = (n, relation, k)=> {
  let dp = new Array(k+1).fill(0).map(()=>new Array(n+1).fill(0))
  dp[0][0] = 1
  for(let i=1; i<= k; i++){
      for(let r of relation){
          dp[i][r[1]] += dp[i - 1][r[0]]
      }
  }
  return dp[k][n - 1]
};

// 剑指 Offer 29. 顺时针打印矩阵  基础题
var spiralOrder = function(matrix) {
  if (matrix.length == 0) return [];
  const res = [];

  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) {
      res.push(matrix[top][i]);
    }
    top++;
    for (let i = top; i <= bottom; i++) {
      res.push(matrix[i][right]);
    }
    right--;

    if (top > bottom || left > right) break;

    for (let i = right; i >= left; i--) {
      res.push(matrix[bottom][i]);
    }
    bottom--;
    for (let i = bottom; i >= top; i--) {
      res.push(matrix[i][left]);
    }
    left++;
  }
  return res;
};

// 941. 有效的山脉数组 基础题
/**
 * @param {number[]} A
 * @return {boolean}
 */
var validMountainArray = function(A) {
  let N = A.length ,i = 0
  while(i+1 < N && A[i] < A[i+1]) {
    i++
  }
  if(i == 0 || i == N-1) {
    return false
  }
  while(i+1 < N && A[i] > A[i+1]) {
    i++
  }
  return i == (N-1)
};
// 57. 插入区间 逻辑题
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
  const res = [];
  let i = 0;
  const len = intervals.length;

  while (i < len && intervals[i][1] < newInterval[0]) { 
    res.push([intervals[i][0], intervals[i][1]]);
    i++;
  }
  while (i < len && intervals[i][0] <= newInterval[1]) { 
    newInterval[0] = Math.min(intervals[i][0], newInterval[0]); 
    newInterval[1] = Math.max(intervals[i][1], newInterval[1]); 
    i++;
  }
  res.push([newInterval[0], newInterval[1]]); 

  while (i < len) {               
    res.push([intervals[i][0], intervals[i][1]]);
    i++;
  }
  
  return res;
}
// 1603. 设计停车系统 基础题
/**
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */
var ParkingSystem = function(big, medium, small) {
  this.small = small
  this.medium = medium
  this.big = big
};

/** 
* @param {number} carType
* @return {boolean}
*/
ParkingSystem.prototype.addCar = function(carType) {
 switch(carType){
     case 1:
          this.big--
          return this.big >=0
      break;
     case 2:
          this.medium--
          return this.medium >=0
      break;
     case 3:
          this.small--
          return this.small >=0
      break; 
 }
};


// 1356. 根据数字二进制下 1 的数目排序 基础题
function sortByBits(arr) {
  function countBits(n) {
    let count = 0;
    while (n != 0) {
      count += (n & 1);
      n >>= 1;
    }
    return count;
  }

  arr.sort((a, b) => {
    return countBits(a) - countBits(b) || a - b;
  });
  return arr;
}

// 122. 买卖股票的最佳时机 II 贪心算法
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let ans = 0;
    for (let i = 0; i < prices.length -1; i++) {
      ans += Math.max(prices[i+1] - prices[i],0);
    }
    return ans
};


// 973. 最接近原点的 K 个点  基础题
var kClosest = function(points, K) {
  return points.map(ele => {
      return {
          after: ele[0] * ele[0] + ele[1] * ele[1],
          before: ele
      }
  }).sort((a, b) => {
      return a.after - b.after
  }).slice(0, K).map(ele => ele.before);
};

// 1491. 去掉最低工资和最高工资后的工资平均值 基础题

/**
 * @param {number[]} salary
 * @return {number}
 */
var average = function(salary) {
  let max = salary[0]
  let min = salary[1]
  let sum = 0
  for (let i = 0; i < salary.length; i++) {
    sum +=salary[i]
    max = Math.max(max,salary[i])
    min = Math.min(min,salary[i])
  }
  return (sum - max -min)/(salary.length -2)
};

// 31. 下一个排列  基础题
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
  let i = nums.length - 2
  while(i>= 0 && nums[i] >= nums[i+1]) {
    i--
  }
  if(i >= 0) {
    let j = nums.length -1 
    while(j>= 0 && nums[i] >= nums[j]) {
      j--;
    }
    swap(i,j)
  }
  reverse(i+1,nums.length)

  function reverse(i) {
    let left = i ,right = nums.length -1 
    while(left <right) {
      swap(left,right)
      left++
      right--
    }

  }
  function swap(i, j) {
    let t = nums[i];
    nums[i] = nums[j];
    nums[j] = t;
  }
};

// 1486. 数组异或操作
/**
 * @param {number} n
 * @param {number} start
 * @return {number}
 */
var xorOperation = function(n, start) {

};

// 1486. 数组异或操作 基础题
/**
 * @param {number} n
 * @param {number} start
 * @return {number}
 */
var xorOperation = function(n, start) {
  let ans = 0
  for (let i = 0; i < n; i++) {
    ans ^=(start + i*2)
  }
  return ans;
};

// 922. 按奇偶排序数组 II 基础题
/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function(A) {
  let res =  Array(A.length)
  let i = 0,j = 1;
  for (let index = 0; index < A.length; index++) {
    let num = A[index]
    if(num%2 == 0) {
      res[i] = num
      i += 2
    } else {
      res[j] = num
      j += 2
    }
  }
  return res
};

// 328. 奇偶链表  基础逻辑题 遍历
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
  let newhead1 = new ListNode(0)
  let newhead2 = new ListNode(0)
  let i = newhead1,j = newhead2, num = 0
  let next = head
  while(next) {
    let node =  next
     next = next.next;
     node.next = null
    if(num %2 == 0) {
      i.next = node;
      i = i.next
    } else {
      j.next = node
      j = j.next
    }
    num++
  }
  i.next = newhead2.next
  newhead2.next = null
  return newhead1.next;
};

// 1122. 数组的相对排序 基础题
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function(arr1, arr2) {

  let backup = new Map()
  for (let i = 0; i < arr2.length; i++) {
    backup.set(arr2[i],i)
  }
  arr1.sort((a,b) =>{
    if(backup.get(a) != null && backup.get(b) != null) {
      return backup.get(a) - backup.get(b)
    } else if(backup.get(a)!= null) {
      return -1
    } else if(backup.get(b)!= null) {
      return 1
    } else {
      return a - b 
    }
  })
  return arr1
};
 
//  402. 移掉K位数字 贪心算法
/** 
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function(num, k) {
  const stk = [];
  for (const digit of num) {
      while (stk.length > 0 && stk[stk.length - 1] > digit && k) {
          stk.pop();
          k -= 1;
      }
      stk.push(digit);
  }

  for (; k > 0; --k) {
      stk.pop();
  }

  let ans = "";
  let isLeadingZero = true;
  for (const digit of stk) {
      if (isLeadingZero && digit === '0') {
          continue;
      }
      isLeadingZero = false;
      ans += digit;
  }
  return ans === "" ? "0" : ans;
};

// 406. 根据身高重建队列 高到低然后一个个按照位置添加即可
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function(people) {
  let ans=[];
  if(!people||!people.length){return []}
  people.sort((a,b)=>{
      if(a[0]===b[0]){
          return a[1]-b[1]
      }else{
          return b[0]-a[0]
      }
  })
  people.forEach(item=>{
      ans.splice(item[1],0,item)
  })
  return ans;
};

// 1030. 距离顺序排列矩阵单元格 BFS
/**
 * @param {number} R
 * @param {number} C
 * @param {number} r0
 * @param {number} c0
 * @return {number[][]}
 */
var allCellsDistOrder = function (R, C, r0, c0) {
  const res = [];
  const visited = new Array(R);
  for (let i = 0; i < R; i++) {
      visited[i] = new Array(C).fill(false);
  }

  const queue = [[r0, c0]];
  visited[r0][c0] = true;

  while (queue.length) {
      const cur = queue.shift();
      const x = cur[0], y = cur[1];
      res.push(cur);

      if (x - 1 >= 0 && !visited[x - 1][y]) {
          queue.push([x - 1, y]);
          visited[x - 1][y] = true;
      }
      if (y - 1 >= 0 && !visited[x][y - 1]) {
          queue.push([x, y - 1]);
          visited[x][y - 1] = true;
      }
      if (x + 1 < R && !visited[x + 1][y]) {
          queue.push([x + 1, y]);
          visited[x + 1][y] = true;
      }
      if (y + 1 < C && !visited[x][y + 1]) {
          queue.push([x, y + 1]);
          visited[x][y + 1] = true;
      }
  }
  return res;
};


// 134. 加油站 逻辑题
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
  const n = gas.length;
  let i = 0;
  while (i < n) {
      let sumOfGas = 0, sumOfCost = 0;
      let cnt = 0;
      while (cnt < n) {
          const j = (i + cnt) % n;
          sumOfGas += gas[j];
          sumOfCost += cost[j];
          if (sumOfCost > sumOfGas) {
              break;
          }
          cnt++;
      }
      if (cnt === n) {
          return i;
      } else {
          i = i + cnt + 1;
      }
  }
  return -1;
};

// 283. 移动零 双指针
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let i = 0,j= 0,n = nums.length
  while(j < n) {
    if(nums[j] != 0) {
      swap(i,j)
      i++
    }
    j++
  }

  function swap(a,b) {
    let temp = nums[a]
    nums[a] = nums[b]
    nums[b] = temp
  }
};
// 147. 对链表进行插入排序 基础逻辑
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function(head) {
  if (head === null) {
      return head;
  }
  const dummyHead = new ListNode(0);
  dummyHead.next = head;
  let lastSorted = head, curr = head.next;
  while (curr !== null) {
      if (lastSorted.val <= curr.val) {
          lastSorted = lastSorted.next;
      } else {
          let prev = dummyHead;
          while (prev.next.val <= curr.val) {
              prev = prev.next;
          }
          lastSorted.next = curr.next;
          curr.next = prev.next;
          prev.next = curr;
      }
      curr = lastSorted.next;
  }
  return dummyHead.next;
};

// 148. 排序链表 递归
var sortList = function(head) {
  return toSortList(head, null);

  function toSortList (head, tail) {
    if (head === null) {
        return head;
    }
    if (head.next === tail) {
        head.next = null;
        return head;
    }
    let slow = head, fast = head;
    while (fast !== tail) {
        slow = slow.next;
        fast = fast.next;
        if (fast !== tail) {
            fast = fast.next;
        }
    }
    const mid = slow;
    return merge(toSortList(head, mid), toSortList(mid, tail));
  }

  function merge (head1, head2) {
    const dummyHead = new ListNode(0);
    let temp = dummyHead, temp1 = head1, temp2 = head2;
    while (temp1 !== null && temp2 !== null) {
        if (temp1.val <= temp2.val) {
            temp.next = temp1;
            temp1 = temp1.next;
        } else {
            temp.next = temp2;
            temp2 = temp2.next;
        }
        temp = temp.next;
    }
    if (temp1 !== null) {
        temp.next = temp1;
    } else if (temp2 !== null) {
        temp.next = temp2;
    }
    return dummyHead.next;
  }
};

// 242. 有效的字母异位词 map 记录
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  if(s.length != t.length) {return false};
  let backup = new Map();
  for (let index = 0; index < s.length; index++) {
      let key  = s[index];
      backup.set(key,backup.get(key)== null ? 1: backup.get(key) + 1)
  }
  for (let index = 0; index < t.length; index++) {
      let key  = t[index];
      let num = backup.get(key)
      if(num == null) {
          return false;
      } else if( num == 1) {
          backup.delete(key);
      }else {
          backup.set(key,num - 1);
      }
  }
  return true;
};


// 452. 用最少数量的箭引爆气球  排序+ 贪心算法
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
  if (!points.length ) {
      return 0;
  }

  points.sort((a, b) => a[1] - b[1]);
  let pos = points[0][1]
  let ans = 1;
  for (let balloon of points) {
      if (balloon[0] > pos) {
          pos = balloon[1];
          ans++;
      }
  }
  return ans;
};

// 222. 完全二叉树的节点个数  递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function(root) {
  if(!root) {
    return 0
  }
  return countNodes(root.left) + countNodes(root.right) + 1
};

// 1370. 上升下降字符串 基础逻辑来回遍历
/**
 * @param {string} s
 * @return {string}
 */
var sortString = function(s) {
  const num = new Array(26).fill(0);
  for (let ch of s) {
      num[ch.charCodeAt() - 'a'.charCodeAt()]++;
  }

  let ret = '';
  while (ret.length < s.length) {
      for (let i = 0; i < 26; i++) {
          if (num[i]) {
              ret += String.fromCharCode(i + 'a'.charCodeAt());
              num[i]--;
          }
      }
      for (let i = 25; i >= 0; i--) {
          if (num[i]) {
              ret += String.fromCharCode(i + 'a'.charCodeAt());
              num[i]--;
          }
      }
  }
  return ret;
};
// 164. 最大间距  排序 可以用 桶排序
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function(nums) {
    let n = nums.length;
    if(n < 2) return 0;
    nums = nums.sort((a,b) => a - b);
    let max = -1;
    for(let j = 1;j < n;j++){
        let val = nums[j] - nums[j-1];
        if(val > max){
            max = val;
        }
    }
    return max;
};

// 454. 四数相加 II 分两组计算 
var fourSumCount = function(A, B, C, D) {
  const countAB = new Map();
  A.forEach(u => B.forEach(v => countAB.set(u + v, (countAB.get(u + v) || 0) + 1)));
  let ans = 0; 
  for (let u of C) {
      for (let v of D) {
          if (countAB.has(-u - v)) {
              ans += countAB.get(-u - v);
          }
      }
  }
  return ans;
};

// 893. 特殊等价字符串组 基础逻辑
var numSpecialEquivGroups = function(A) {
  let arr = [];
  for(let i=0; i<A.length; i++) {
      let curOdd = [],
          curEven = [];
      for(let j=0; j<A[i].length; j++) {
          if(j%2 === 0) {
              curEven.push(A[i][j]);
          } else {
              curOdd.push(A[i][j]);
          }
      }
      curOdd.sort((a, b) => a.localeCompare(b))
      curEven.sort((a, b) => a.localeCompare(b))
      arr.push(curEven.join('')+curOdd.join(''))
  }
  return [...new Set(arr)].length
};

// 976. 三角形的最大周长 基础题  贪心
/**
 * @param {number[]} A
 * @return {number}
 */
var largestPerimeter = function(A) {
  A.sort((a, b) => a - b);
  for (let i = A.length - 1; i >= 2; --i) {
      if (A[i - 2] + A[i - 1] > A[i]) {
          return A[i - 2] + A[i - 1] + A[i];
      }
  }
  return 0;
};

// 767. 重构字符串 贪心算法
/**
 * @param {string} S
 * @return {string}
 */
var reorganizeString = function(S) {
    if (S.length < 2) {
        return S;
    }
    const counts = new Array(26).fill(0);
    let maxCount = 0;
    const length = S.length;
    for (let i = 0; i < length; i++) {
        const c = S.charAt(i);
        counts[getIdx(c)]++;
        maxCount = Math.max(maxCount, counts[getIdx(c)]);
    }
    if (maxCount > Math.floor((length + 1) / 2)) {
        return "";
    }
    const reorganizeArray = new Array(length);
    let evenIndex = 0, oddIndex = 1;
    const halfLength = Math.floor(length / 2);
    for (let i = 0; i < 26; i++) {
        const c = getAlpha('a'.charCodeAt() + i);
        while (counts[i] > 0 && counts[i] <= halfLength && oddIndex < length) {
            reorganizeArray[oddIndex] = c;
            counts[i]--;
            oddIndex += 2;
        }
        while (counts[i] > 0) {
            reorganizeArray[evenIndex] = c;
            counts[i]--;
            evenIndex += 2;
        }
    }
    return reorganizeArray.join('');

    function getIdx(c) {
      return c.charCodeAt() - 'a'.charCodeAt()
    } 
    function getAlpha(c) {
      return String.fromCharCode(c)
    }
};

// 34. 在排序数组中查找元素的第一个和最后一个位置 二分查找
var searchRange = function(nums, target) {
  let ans = [-1, -1];
  const leftIdx = binarySearch(nums, target, true);
  const rightIdx = binarySearch(nums, target, false) - 1;
  if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] === target && nums[rightIdx] === target) {
      ans = [leftIdx, rightIdx];
  } 
  return ans;

  function binarySearch (nums, target, lower)  {
    let left = 0, right = nums.length - 1, ans = nums.length;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > target || (lower && nums[mid] >= target)) {
            right = mid - 1;
            ans = mid;
        } else {
            left = mid + 1;
        }
    }
    return ans;
  }
};

// 999. 可以被一步捕获的棋子数 基础题 
var numRookCaptures = function(board) {
  let cnt = 0, st = 0, ed = 0;
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
          if (board[i][j] == 'R') {
              st = i;
              ed = j;
              break;
          }
      }
  }
  for (let i = 0; i < 4; ++i) {
      for (let step = 0;; ++step) {
          const tx = st + step * dx[i];
          const ty = ed + step * dy[i];
          if (tx < 0 || tx >= 8 || ty < 0 || ty >= 8 || board[tx][ty] == 'B') {
              break;
          }
          if (board[tx][ty] == 'p') {
              cnt++;
              break;
          }
      }
  }
  return cnt;
};
// 204. 计数质数 基础题
/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
  const isPrime = new Array(n).fill(1);
  const primes = [];
  for (let i = 2; i < n; ++i) {
      if (isPrime[i]) {
          primes.push(i);
      }
      for (let j = 0; j < primes.length && i * primes[j] < n; ++j) {
          isPrime[i * primes[j]] = 0;
          if (i % primes[j] === 0) {
              break;
          }
      }
  }
  return primes.length;
};
 
// 659. 分割数组为连续子序列 贪心
var isPossible = function(nums) {
  const countMap = new Map();
  const endMap = new Map();
  for (const x of nums) {
      const count = (countMap.get(x) || 0) + 1;
      countMap.set(x, count);
  }
  for (const x of nums) {
      const count = countMap.get(x) || 0;
      if (count > 0) {
          const prevEndCount = endMap.get(x - 1) || 0;
          if (prevEndCount > 0) {
              countMap.set(x, count - 1);
              endMap.set(x - 1, prevEndCount - 1);
              endMap.set(x, (endMap.get(x, 0) || 0) + 1);
          } else {
              const count1 = countMap.get(x + 1, 0);
              const count2 = countMap.get(x + 2, 0);
              if (count1 > 0 && count2 > 0) {
                  countMap.set(x, count - 1);
                  countMap.set(x + 1, count1 - 1);
                  countMap.set(x + 2, count2 - 1);
                  endMap.set(x + 2, (endMap.get(x + 2) || 0) + 1);
              } else {
                  return false;
              }
          }
      }
  }
  return true;
};

// 118. 杨辉三角 基础题
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  if(numRows == 0) {
    return []
  } 
  let backup = [1],start = 1,res = [[1]]
  while (start < numRows) {
    let newBackup  = [1]
    for (let i = 1; i < backup.length; i++) {
      newBackup.push(backup[i -1]+backup[i])
    }
    newBackup.push(1);
    res.push(newBackup)
    backup = newBackup;
    start++;
  }
  return res
};
// 621. 任务调度器 贪心
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
  let newBack = new Map()
  for (let i = 0; i < tasks.length; i++) {
    let key = tasks[i];
    newBack.set(key,(newBack.get(key) || 0)+1)
  }
  let maxNum = 0,maxCount = 1;
  for(let item of newBack) {
    let num = item[1]
    if(num >  maxNum) {
      maxNum = num;
      maxCount = 1
    } else if(num == maxNum) {
      maxCount++
    } 
  }
  return Math.max((maxNum -1)*(n+1)+ maxCount,tasks.length)

};

// 861. 翻转矩阵后的得分  贪心算法
/**
 * @param {number[][]} A
 * @return {number}
 */
var matrixScore = function(A) {
  const m = A.length, n = A[0].length;
  let ret = m * (1 << (n - 1));

  for (let j = 1; j < n; j++) {
      let nOnes = 0;
      for (let i = 0; i < m; i++) {
          if (A[i][0] === 1) {
              nOnes += A[i][j];
          } else {
              nOnes += (1 - A[i][j]); 
          }
      }
      const k = Math.max(nOnes, m - nOnes);
      ret += k * (1 << (n - j - 1));
  }
  return ret;
};

// 842. 将数组拆分成斐波那契序列  回朔 剪枝
var splitIntoFibonacci = function(S) {
  const list = new Array().fill(0);
  backtrack(list, S, S.length, 0, 0, 0);
  return list;
};

const backtrack2 = (list, S, length, index, sum, prev) => {
  if (index === length) {
      return list.length >= 3;
  }
  let currLong = 0;
  for (let i = index; i < length; i++) {
      if (i > index && S[index] === '0') {
          break;
      }
      currLong = currLong * 10 + S[i].charCodeAt() - '0'.charCodeAt();
      if (currLong > Math.pow(2, 31) - 1) {
          break;
      }
      let curr = currLong;
      if (list.length >= 2) {
          if (curr < sum) {
              continue;
          } else if (curr > sum) {
              break;
          }
      }
      list.push(curr);
      if (backtrack(list, S, length, i + 1, prev + curr, curr)) {
          return true;
      } else {
          list.splice(list.length - 1, 1);
      }
  }
  return false;
}

// 62. 不同路径 组合
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  let ans = 1;
  for (let x = n, y = 1; y < m; ++x, ++y) {
      ans = Math.floor(ans * x / y);
  }
  return ans;
};

// 860. 柠檬水找零  基础题
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
  let num1 = 0,num2 = 0
  for (let i = 0; i < bills.length; i++) {
    const bill = bills[i];
    if(bill == 5) {
      num1++;
    } else if(bill == 10) {
      if(num1 > 0) {
        num1--
        num2++
      } else {
        return false
      }
    } else if(bill == 20) {
      if(num2 > 0 && num1 > 0) {
        num1--;
        num2--;
      } else if(num1 > 2) {
        num1 = num1 -3
      } else {
        return false
      }
    } else {
      return false
    }
    
  }
  return true
};

// 649. Dota2 参议院 循环队列
/**
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function(senate) {
  const n = senate.length
  let Rarray = [],Darray = []
  for (let i = 0; i < senate.length; i++) {
    if(senate[i] == 'R') {
      Rarray.push(i)
    } else {
      Darray.push(i)
    }
  }
  while(Rarray.length  && Darray.length) {
    if(Rarray[0] < Darray[0]) {
      Rarray.push(Rarray[0] + n)
    } else {
      Darray.push(Darray[0] + n)
    }
    Darray.shift()
    Rarray.shift()
  }
  return Rarray.length ? "Radiant" : "Dire"
};

// 217. 存在重复元素 map映射
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    if(!map.get(num)) {
      map.set(num,true)
    } else {
      return true
    }
  }
  return false
};

// 49. 字母异位词分组 排序  或者哈希
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const map = new Map();
  for (let str of strs) {
      let array = Array.from(str);
      array.sort();
      let key = array.toString();
      let list = map.get(key) ? map.get(key) : new Array();
      list.push(str);
      map.set(key, list);
  }
  return Array.from(map.values());
};

// 376. 摆动序列  动态规划
/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function(nums) {
  const n = nums.length;
  if(n < 2) return n
  const up = new Array(n).fill(0)
  const down = new Array(n).fill(0)
  up[0] = down[0] = 1
  for (let i = 1; i < n; i++) {
    if(nums[i] > nums[i-1]) {
      up[i] = Math.max(up[i -1],down[i-1]+1)
      down[i] = down[i-1]
    } else if(nums[i] < nums[i-1]){
      up[i] = up[i -1]
      down[i] = Math.max(down[i-1],up[i-1]+1)
    } else {
      up[i] = up[i -1]
      down[i] = down[i-1]
    }
  }
  return Math.max(up[n -1],down[n-1])
};

// 738. 单调递增的数字  贪心算法
/**
 * @param {number} N
 * @return {number}
 */
var monotoneIncreasingDigits = function(N) {
  const strN = N.toString().split('').map(v => +v);
  let i = 1;
  while (i < strN.length && strN[i - 1] <= strN[i]) {
      i += 1;
  }
  if (i < strN.length) {
      while (i > 0 && strN[i - 1] > strN[i]) {
          strN[i - 1] -= 1;
          i -= 1;
      }
      for (i += 1; i < strN.length; ++i) {
          strN[i] = 9;
      }
  }
  return parseInt(strN.join(''));
};

// 290. 单词规律  双映射
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
  const word2ch = new Map();
  const ch2word = new Map();
  const words = s.split(' ');
  if (pattern.length !== words.length) {
      return false;
  }
  for (const [i, word] of words.entries()) {
      const ch = pattern[i];
      if (word2ch.has(word) && word2ch.get(word) != ch || ch2word.has(ch) && ch2word.get(ch) !== word) {
          return false;
      }
      word2ch.set(word, ch);
      ch2word.set(ch, word);
  }
  return true;
};

// 714. 买卖股票的最佳时机含手续  动态规划
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
  if(prices.length == 0) {
    return 0
  }
  let buy = -1*prices[0]
  let sell = 0
  for (let i = 1; i < prices.length; i++) {
    let newSell =  Math.max(sell,buy + prices[i] - fee)
    let newBuy = Math.max(buy,sell - prices[i])
    sell = newSell
    buy = newBuy
  }
  return sell;
};

// 389. 找不同  基础题
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
  let num = 0;
  for (let index = 0; index < t.length - 1; index++) {
      num = num + t[index].charCodeAt()  - s[index].charCodeAt();
  }
  num += t[t.length -1].charCodeAt();
  return String.fromCharCode(num);
};


// 48. 旋转图像 先水平翻转 再对角线翻转
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
  const n = matrix.length;
  // 水平翻转
  for (let i = 0; i < Math.floor(n / 2); i++) {
      for (let j = 0; j < n; j++) {
          [matrix[i][j], matrix[n - i - 1][j]] = [matrix[n - i - 1][j], matrix[i][j]];
      }
  }
  // 主对角线翻转
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < i; j++) {
          [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
      }
  }
};

// 316. 去除重复字母  贪心 + 栈
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function(s) {
  const vis = new Array(26).fill(0);
  const num = _.countBy(s);
  
  const sb = new Array();
  for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (!vis[ch.charCodeAt() - 'a'.charCodeAt()]) {
          while (sb.length > 0 && sb[sb.length - 1] > ch) {
              if (num[sb[sb.length - 1]] > 0) {
                  vis[sb[sb.length - 1].charCodeAt() - 'a'.charCodeAt()] = 0;
                  sb.pop();
              } else {
                  break;
              }
          }
          vis[ch.charCodeAt() - 'a'.charCodeAt()] = 1;
          sb.push(ch);
      }
      num[ch]--;
  }
  return sb.join('');
};

// 746. 使用最小花费爬楼梯 动态规划
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
  const n = cost.length;
  let prev = 0, curr = 0;
  for (let i = 2; i <= n; i++) {
      let next = Math.min(curr + cost[i - 1], prev + cost[i - 2]);
      prev = curr;
      curr = next;
  }
  return curr;
};

// 103. 二叉树的锯齿形层序遍历  层序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
  if(!root) {
    return []
  }
  let backup = [root],result = [], isObey = true
  while(backup.length > 0) {
    let  sub = [],newBackup = []
    for (let i = 0; i < backup.length; i++) {
      let node = backup[i]
      if(isObey) {
        sub.push(node.val)
      } else {
        sub.unshift(node.val)
      }
      if(node.left) {
        newBackup.push(node.left)
      }
      if(node.right) {
        newBackup.push(node.right)
      }
    }
    result.push(sub)
    isObey = !isObey
    backup = newBackup;
  }
  return result;
};

// 387. 字符串中的第一个唯一字符  基础题
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  let backup =  new Map()
  for (let i = 0; i < s.length; i++) {
    const key =  s[i]
    backup.set(key,(backup.get(key)||0) + 1)
  }
  for (let i = 0; i < s.length; i++) {
    const key =  s[i]
    if(backup.get(key)== 1) {
      return i
    }
  }
  return -1
};

// 135. 分发糖果 贪心 两遍遍历
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
  let leftArr = []
  for (let i = 0; i < ratings.length; i++) {
    if(i > 0 && ratings[i] > ratings[i-1]) {
      leftArr.push(leftArr[i-1] +1)
    } else {
      leftArr.push(1)
    }   
  }
  let right = 0,res = 0
  for (let i = ratings.length -1; i > -1 ;i--) {
    if(i< ratings.length -1 && ratings[i] > ratings[i+1]) {
      right++
    } else {
      right = 1;
    }
    res += Math.max(right,leftArr[i])
  }
  return res;
};
// 455. 分发饼干 排序 贪心算法
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
  g.sort((a,b) => a -b)
  s.sort((a,b) => a -b)
  let i = 0, j = 0,count = 0
  while(i<g.length && j < s.length) {
    if(s[j] >= g[i]) {
      i++;
      j++;
      count++;
    } else {
      j++
    }
  }
  return count;
};


// 1299. 将每个元素替换为右侧最大元素 反向遍历
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var replaceElements = function(arr) {
  let max = -1, res = [];

  for (let i = arr.length - 1; i >= 0; i--) {
      res[i] = max;
      max = Math.max(max,arr[i]);
  }
  return res;
};

//  205. 同构字符串 双map 
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
  const s2t = {};
  const t2s = {};
  const len = s.length;
  for (let i = 0; i < len; ++i) {
      const x = s[i], y = t[i];
      if ((s2t[x] && s2t[x] !== y) || (t2s[y] && t2s[y] !== x)) {
          return false;
      }
      s2t[x] = y;
      t2s[y] = x;
  }
  return true;
};

// 188. 买卖股票的最佳时机 IV  动态规划
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(k, prices) {
  if (!prices.length) {
      return 0;
  }

  const n = prices.length;
  k = Math.min(k, Math.floor(n / 2));
  const buy = new Array(k + 1).fill(0);
  const sell = new Array(k + 1).fill(0);

  [buy[0], sell[0]] = [-prices[0], 0]
  for (let i = 1; i < k + 1; ++i) {
      buy[i] = sell[i] = -Number.MAX_VALUE;
  }

  for (let i = 1; i < n; ++i) {
      buy[0] = Math.max(buy[0], sell[0] - prices[i]);
      for (let j = 1; j < k + 1; ++j) {
          buy[j] = Math.max(buy[j], sell[j] - prices[i]);
          sell[j] = Math.max(sell[j], buy[j - 1] + prices[i]); 
      }
  }

  return Math.max(...sell)
};

// 330. 按要求补齐数组  贪心算法
/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number}
 */
var minPatches = function(nums, n) {
  let patches = 0;
  let x = 1;
  const length = nums.length;
  let index = 0;
  while(x <= n) {
    if(index < length && nums[index] <= x) {
      x += nums[index];
      index++
    } else {
      x *=2;
      patches++;
    }
  }
  return patches;
};

// 1046. 最后一块石头的重量   基础题

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
  stones.sort((a, b) => a - b);
  while (stones.length > 1) {
      let newStone = Math.abs(stones[stones.length - 1] - stones[stones.length - 2]);
      stones = stones.slice(0, stones.length - 2);
      if (newStone) {
          stones.push(newStone);
      }
      for (let i = stones.length - 1; i > 0; i--) {
          if (stones[i] < stones[i - 1]) {
              const t = stones[i];
              stones[i] = stones[i - 1];
              stones[i - 1] = t;
          } else {
            break;
          }
      }
  }

  return stones[0] || 0;
};

// 435. 无重叠区间 贪心
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) { 
  if(!intervals.length) {
    return 0;
  }
  intervals.sort((a,b)=>a[1]-b[1]);
  const n = intervals.length
  let right = intervals[0][1]
  let ans = 1
  for (let i = 0; i < n; i++) {
    if(intervals[i][0] >= right) {
      ans++;
      right = intervals[i][1];
    }
  }
  return n - ans;
};

// 605. 种花问题 贪心
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function(flowerbed, n) {
  if(n == 0) {
    return true
  }
  let  lastNO = true,k = n
  flowerbed.push(0)
  for (let i = 0; i < flowerbed.length -1; i++) {
    if(lastNO && flowerbed[i] == 0 && flowerbed[i+1] == 0) {
      k--;
      if(k == 0) {
        return true
      }
      lastNO = false
    } else if(flowerbed[i] == 0) {
      lastNO = true
    } else if (flowerbed[i] == 1) {
      lastNO = false
    }
  }
  return false

};

// 86. 分隔链表  基础逻辑
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
  let bigHead = new ListNode(0),bigNext = bigHead
  let smallHead = new ListNode(0),smallNext =  smallHead
  let next = head;
  while(next) {
    if(next.val < x) {
      smallNext.next = next
      next = next.next
      smallNext =  smallNext.next
      smallNext.next = null
    } else {
      bigNext.next = next
      next = next.next
      bigNext =  bigNext.next
      bigNext.next = null
    }
  }
  smallNext.next = bigHead.next;
  return smallHead.next;
};

// 509. 斐波那契数  基础动态规划
var fib = function(n) {
  if (n < 2) {
      return n;
  }
  let p = 0, q = 0, r = 1;
  for (let i = 2; i <= n; i++) {
      p = q;
      q = r;
      r = p + q;
  }
  return r;
};

// 830. 较大分组的位置 遍历 基础题
/**
 * @param {string} s
 * @return {number[][]}
 */
var largeGroupPositions = function(s) {

  let num = 1,res = []
  for (let i = 1; i <= s.length; i++) {
    if(i ==s.length || s[i] != s[i-1]) {
      if(num > 2) {
        res.push([i-num,i-1])
      }
      num = 1;
    } else {
      num++
    }
  }
  return res
};

// 399. 除法求值  dfs
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function(equations, values, queries) {
  let ans = [],
      elen = equations.length,
      vlen = values.length,
      qlen = queries.length,
      matrix = [], // 矩阵
      map = {}; // 判断 queries 中的点是否存在于已知的图中
  
  // 创建有向图
  for (let i = 0; i < elen; i++) {
    let [start, end] = equations[i],
        val = values[i];
    
    if (matrix[start] === undefined) matrix[start] = [];
    if (matrix[end] === undefined) matrix[end] = [];
    
    matrix[start][end] = val;
    matrix[end][start] = 1 / val;
    
    if (map[ start ] === undefined) map[ start ] = 1;
    if (map[ end ] === undefined) map[ end ] = 1;
  }
  
  for (let i = 0; i < qlen; i++) {
    let [start, end] = queries[i];
    if (map[start] === undefined || map[end] === undefined) {
      ans.push( -1.0 );
      continue;
    }
    ans.push( dfs(start, end, []) );
  }
  
  // 搜索 A 到 B 的路径
  function dfs(A, B, visited) {
    if (A === B) return 1.0;
    
    visited[A] = 1
    
    let neighbors = matrix[A];
    
    let target = null;
    
    for (let key in neighbors) {
      let val = neighbors[key];
      if (visited[key] !== undefined) {
        continue;
      }
      
      let d = dfs(key, B, visited);
      
      if (d > 0) {
        target = d * matrix[A][key];
        break;
      }
    }
    
    return target || -1.0;
  }
  
  return ans;
}

// 547. 省份数量 连通
/**
 * @param {number[][]} M
 * @return {number}
 */
var findCircleNum = function(M) {
  class UF {
      constructor(num) {
          this.count = num;
          this.size = Array(num)
          this.parent = Array(num)
          for (let i = 0; i < num; i++) {
              this.parent[i] = i;
              this.size[i] = 1;
          }
      }
      union(p,q) {
          let rootP = this.find(p)
          let rootQ = this.find(q)
          if(rootP == rootQ) {
              return
          }
          if (this.size[rootP] > this.size[rootQ]) {
              this.parent[rootQ] = rootP;
              this.size[rootP] += this.size[rootQ];
          } else {
              this.parent[rootP] = rootQ;
              this.size[rootQ] += this.size[rootP];
          }
          this.count--
      }
      connected(p,q) {
          let rootP = this.find(p)
          let rootQ = this.find(q)
          return rootP == rootQ
      }
      find(x) {
          while(this.parent[x] != x) {
              // 进行路径压缩
              this.parent[x] = this.parent[this.parent[x]];
              x = this.parent[x];
          }
          return x;
      }
  }
  let n = M.length
  let uf = new UF(n);
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < i; j++) {
          if (M[i][j] == 1)
              uf.union(i, j);
      }
  }
  return uf.count;
};
// 547. 省份数量  递归 dfs 
var findCircleNum = function(isConnected) {
  const provinces = isConnected.length;
  const visited = new Set();
  let circles = 0;
  for (let i = 0; i < provinces; i++) {
      if (!visited.has(i)) {
          dfs(isConnected, visited, provinces, i);
          circles++;
      }
  }
  return circles;
};

const dfs = (isConnected, visited, provinces, i) => {
  for (let j = 0; j < provinces; j++) {
      if (isConnected[i][j] == 1 && !visited.has(j)) {
          visited.add(j);
          dfs(isConnected, visited, provinces, j);
      }
  }
};

// 1128. 等价多米诺骨牌对的数量  基础题
/**
 * @param {number[][]} dominoes
 * @return {number}
 */
var numEquivDominoPairs = function(dominoes) {
  let backup = new Map()
  let res = 0
  for (let i = 0; i < dominoes.length; i++) {
    const nums = dominoes[i]
    let key  = nums[0] < nums[1] ? nums[0]*10 + nums[1] : nums[0] + nums[1]*10;
    let before = backup.get(key) || 0
    res += before
    backup.set(key,before+1)
  }
  return res
};

// 674. 最长连续递增序列 基础题
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function(nums) {
  const num = nums.length;
  if(num < 2) {
    return num;
  }
  let res = 1, count = 1
  for (let i = 1; i < num; i++) {
    if(nums[i-1] < nums[i]) {
      count++
    } else {
      res = Math.max(res,count)
      count = 1
    }
  }
  res = Math.max(res,count)
  return res
};

// 724. 寻找数组的中心索引  基础题
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function(nums) {
  var backArray = [];
  var sum = 0;
  for(let num of nums) {
      sum += num;
      backArray.push(sum);
  }
  if(sum - nums[0] == 0) {return 0; }
  for (let index = 1; index < nums.length; index++) {
      if(backArray[index-1] == sum - backArray[index]) {
          return index;
      }
  }
  return -1;
};

// 1631. 最小体力消耗路径  二分查找
/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function(heights) {
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  const m = heights.length, n = heights[0].length;
  let left = 0, right = 999999, ans = 0;
  while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const queue = [[0, 0]];
      const seen = new Array(m * n).fill(0);
      seen[0] = 1;
      while (queue.length) {
          const [x, y] = queue.shift();
          for (let i = 0; i < 4; i++) {
              const nx = x + dirs[i][0];
              const ny = y + dirs[i][1];
              if (nx >= 0 && nx < m && ny >= 0 && ny < n && !seen[nx * n + ny] && Math.abs(heights[x][y] - heights[nx][ny]) <= mid) {
                  queue.push([nx, ny]);
                  seen[nx * n + ny] = 1;
              }
          }
      }
      if (seen[m * n - 1]) {
          ans = mid;
          right = mid - 1;
      } else {
          left = mid + 1;
      }
  }
  return ans;
};

// 888. 公平的糖果棒交换  基础题
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var fairCandySwap = function(A, B) {
  var sumA = 0;
  var sumB = 0;
  var map = new Map()
  for(let num of A) { sumA += num}
  for(let num of B) { 
      sumB += num
      map.set(num,num);
  }
  var delta = (sumB - sumA)/2;

  for(let num of A) {
      if(map.get(delta + num)) {
          return [num,delta + num];
      }
  }
  return [];
};

// 424. 替换后的最长重复字符 双指针  最大窗口
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
  const num = new Array(26).fill(0);
  const n = s.length;
  let maxn = 0, left = 0, right = 0;

  while (right < n) {
      num[s[right].charCodeAt() - 'A'.charCodeAt()]++;
      maxn = Math.max(maxn, num[s[right].charCodeAt() - 'A'.charCodeAt()])
      if (right - left + 1 - maxn > k) {
          num[s[left].charCodeAt() - 'A'.charCodeAt()]--;
          left++;
      }
      right++;
  }
  return right - left;
};

// 480. 滑动窗口中位数  二分查找
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var medianSlidingWindow = function (nums, k) {
  let isOdd = k % 2;
  let arr = [];
  let res = [];
  let add = function (num) {
    let left = 0;
    let right = arr.length;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] < num) {
        left = mid + 1
      } else {
        right = mid;
      }
    }
    arr.splice(left, 0, num);
  }
  let remove = function (num) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] < num) {
        left = mid + 1
      } else {
        right = mid;
      }
    }
    arr.splice(left, 1);
  }
  for (let i = 0; i < k - 1; ++i) {
    add(nums[i])
  }
  for (let i = k - 1, len = nums.length; i < len; ++i) {
    add(nums[i])
    if (isOdd) {
      res.push(arr[(k - 1) / 2])
    } else {
      res.push((arr[k / 2] + arr[k / 2 - 1]) / 2)
    }
    remove(nums[i - k + 1])
  }
  return res;
};

// 643. 子数组最大平均数 I  基础题
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
  let result = -10000;
  let sum = 0;
  for (let index = 0; index < nums.length; index++) {
      sum += nums[index];
      if(index >= k) {
          sum -= nums[index - k];
      }
      if(index >= k - 1) {
          result = Math.max(sum/k,result);
      }
  }
  return result;
};

// 1208. 尽可能使字符串相等 双指针
/**
 * @param {string} s
 * @param {string} t
 * @param {number} maxCost
 * @return {number}
 */
var equalSubstring = function(s, t, maxCost) {
  let n =  s.length
  let diff =  new Array()
  for (let i = 0; i < n; i++) {
    diff.push(Math.abs(s[i].charCodeAt() - t[i].charCodeAt()))
  }
  let res = 0,start = 0,end = 0,sum = 0
  while(end < n) {
    sum +=diff[end]
    while(sum > maxCost) {
      sum -= diff[start]
      start++
    }
    res = Math.max(res, end - start + 1);
    end++;
  }
  return res
  
};

// 665. 非递减数列 基础题
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function(nums) {
  const n = nums.length;
  let cnt = 0;
  for (let i = 0; i < n - 1; ++i) {
      const x = nums[i], y = nums[i + 1];
      if (x > y) {
          cnt++;
          if (cnt > 1) {
              return false;
          }
          if (i > 0 && y < nums[i - 1]) {
              nums[i + 1] = x;
          }
      }
  }
  return true;
};

// 1423. 可获得的最大点数  窗口
/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function(cardPoints, k) {

  let sum = 0, bSum =0, minSum = 0

  for (let i = 0; i < cardPoints.length; i++) {
    let num = cardPoints[i]
    sum += num;
    if(i < cardPoints.length - k) {
      bSum += num
      minSum = bSum
    } else  {
      bSum -= cardPoints[i -cardPoints.length + k]
      minSum  = Math.min(bSum,minSum)
    }
  }
  return sum - minSum
};

// 978. 最长湍流子数组 双指针

/**
 * @param {number[]} arr
 * @return {number}
 */
var maxTurbulenceSize = function(arr) {
  const n = arr.length;
  let ret = 1;
  let left = 0, right = 0;

  while (right < n - 1) {
      if (left == right) {
          if (arr[left] == arr[left + 1]) {
              left++;
          }
          right++;
      } else {
          if (arr[right - 1] < arr[right] && arr[right] > arr[right + 1]) {
              right++;
          } else if (arr[right - 1] > arr[right] && arr[right] < arr[right + 1]) {
              right++;
          } else {
              left = right;
          }
      }
      ret = Math.max(ret, right - left + 1);
  }
  return ret;
};

// 992. K 个不同整数的子数组 把问题转化为最多包含K个不同整数的子区间的个数
/**
 * @param {number[]} A
 * @param {number} K 
 * @return {number}
 */
var subarraysWithKDistinct = function(A, K) {

  return atMostKDistinct(A,K) -  atMostKDistinct(A,K-1)
  // 最多包含 K 个不同整数的子区间的个数
  function atMostKDistinct(A,K) {
    let left = 0,right = 0,count = 0,res = 0
    let freq = new Array(A.length +1).fill(0)
    while(right < A.length) {
      if(freq[A[right]] == 0) {
        count++
      }
      freq[A[right]]++
      right++
      while(count > K) {
        freq[A[left]]--
        if(freq[A[left]] == 0) {
          count--;
        }
        left++;
      }
      res += right - left 
    }
    return res
  }
};

// 995. K 连续位的最小翻转次数  贪心 窗口 从左往右  翻转
var minKBitFlips = function(A, K) {
  const n = A.length;
  const diff = new Array(n + 1).fill(0);
  let ans = 0, revCnt = 0;
  for (let i = 0; i < n; i++) {
      revCnt += diff[i];
      if ((A[i] + revCnt) % 2 === 0) {
          if ((i + K) > n) {
              return -1;
          }
          ++ans;
          ++revCnt;
          --diff[i + K]
      }
  }
  return ans;
};

// 1004. 最大连续1的个数 III  双指针 
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var longestOnes = function(A, K) {
  let left = 0, num = 0,ans = 0
  for (let i = 0; i < A.length; i++) {
    num += 1 - A[i]
    while(num >K) {
      if(A[left] == 0) {
        num --
      }
      left++
    }
    ans = Math.max(ans,i - left +1)
  }
  return ans;
};


// 697. 数组的度  哈希
/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function(nums) {
  let backup = new Map()
  for (let i = 0; i < nums.length; i++) {
    let key = nums[i]
    let arr = backup.get(key)
    if(arr) {
      backup.set(key,[arr[0]+1,arr[1],i])
    } else {
      backup.set(key,[1,i,i])
    }
  }
  let max = 0, res =0
  for(let item of backup.values()){
    if(item[0] > max) {
      max = item[0]
      res = item[2] -item[1] +1
    } else if(item[0] == max) {
      res = Math.min(res,item[2] -item[1] +1)
    }
  }
  return res
};

// 1052. 爱生气的书店老板  窗口
/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} X
 * @return {number}
 */

var maxSatisfied = function(customers, grumpy, X) {
  let total = 0;
  const n = customers.length;
  for (let i = 0; i < n; i++) {
      if (grumpy[i] === 0) {
          total += customers[i];
      }
  }
  let increase = 0;
  for (let i = 0; i < X; i++) {
      increase += customers[i] * grumpy[i];
  }
  let maxIncrease = increase;
  for (let i = X; i < n; i++) {
      increase = increase - customers[i - X] * grumpy[i - X] + customers[i] * grumpy[i];
      maxIncrease = Math.max(maxIncrease, increase);
  }
  return total + maxIncrease;
};

// 766. 托普利茨矩阵 遍历比对
var isToeplitzMatrix = function(matrix) {
  const m = matrix.length, n = matrix[0].length;
  for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
          if (matrix[i][j] != matrix[i - 1][j - 1]) {
              return false;
          }
      }
  }
  return true;
};

// 1438. 绝对差不超过限制的最长连续子数组  单调队列
var longestSubarray = function(nums, limit) {
  const n = nums.length;
  const maxQueue = [];
  const minQueue = [];
  let left = 0;
  let res = 0;
  for (let right = 0; right < n; right++) {
      while (maxQueue.length && maxQueue[maxQueue.length - 1] < nums[right]) {
          maxQueue.pop();
      }
      maxQueue.push(nums[right]);

      while (minQueue.length && minQueue[minQueue.length - 1] > nums[right]) {
          minQueue.pop();
      }
      minQueue.push(nums[right]);
      if (Math.abs(maxQueue[0] - minQueue[0]) > limit) {
          if (nums[left] === maxQueue[0]) {
              maxQueue.shift();
          }
          if (nums[left] === minQueue[0]) {
              minQueue.shift();
          }
          left++;
      }
      else {
          res = right - left + 1;
      }
  }
  return res;
};

// 832. 翻转图像 基础题
/**
 * @param {number[][]} A
 * @return {number[][]}
 */
var flipAndInvertImage = function(A) {
  let res = []
  for (let i = 0; i < A.length; i++) {
    let newItem = []
    let item = A[i]
    let count = item.length
    for (let j = 0; j < count; j++) {
      let num = item[count -1 -j]
      newItem.push(num == 0 ? 1: 0)
    }
    res.push(newItem)
  }
  return res
};
// 867. 转置矩阵  基础题
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var transpose = function(matrix) {
  let res = []
  for (let i = 0; i < matrix[0].length; i++) {
    let newItem = []
    for (let j = 0; j < matrix.length; j++) {
      newItem.push(matrix[j][i])
    }
    res.push(newItem)
  }
  return res
};

// 1178. 猜字谜  位运算
/**
 * @param {string[]} words
 * @param {string[]} puzzles
 * @return {number[]}
 */
var findNumOfValidWords = function(words, puzzles) {
  const frequency = new Map();

  for (const word of words) {
      let mask = 0;
      for (const ch of word) {
          mask |= (1 << (ch.charCodeAt() - 'a'.charCodeAt()));
      }
      if (CountOne(mask) <= 7) {
          frequency.set(mask, (frequency.get(mask) || 0) + 1);
      }
  }

  const ans = [];
  for (const puzzle of puzzles) {
      let total = 0;
      let mask = 0;
      for (let i = 1; i < 7; ++i) {
          mask |= (1 << (puzzle[i].charCodeAt() - 'a'.charCodeAt()));
      }
      let subset = mask;
      while (subset) {
          let s = subset | (1 << (puzzle[0].charCodeAt() - 'a'.charCodeAt()));
          if (frequency.has(s)) {
              total += frequency.get(s);
          }
          subset = (subset - 1) & mask;
      }
      // 在枚举子集的过程中，要么会漏掉全集 mask，要么会漏掉空集
      // 这里会漏掉空集，因此需要额外判断空集
      if (frequency.has(1 << (puzzle[0].charCodeAt() - 'a'.charCodeAt()))) {
          total += frequency.get(1 << (puzzle[0].charCodeAt() - 'a'.charCodeAt()));
      }
      ans.push(total);
  }
  return ans;
};

function CountOne(n) {
  const str = n.toString(2);
  let count = 0;
  for (const ch of str) {
      if (parseInt(ch) === 1) {
          count++;
      }
  }
  return count;
}

// 303. 区域和检索 - 数组不可变  基础题
/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    const n = nums.length;
    this.sums = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        this.sums[i + 1] = this.sums[i] + nums[i];
    }
};

NumArray.prototype.sumRange = function(i, j) {
    return this.sums[j + 1] - this.sums[i];
};

// 896. 单调数列 基础题
/**
 * @param {number[]} A
 * @return {boolean}
 */
var isMonotonic = function(A) {
    let inc = true, dec = true;
    const n = A.length;
    for (let i = 0; i < n - 1; ++i) {
        if (A[i] > A[i + 1]) {
            inc = false;
        }
        if (A[i] < A[i + 1]) {
            dec = false;
        }
    }
    return inc || dec;
};

// 395. 至少有 K 个重复字符的最长子串  分治
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function(s, k) {
    const n = s.length;
    return dfs(s, 0, n - 1, k);
}

const dfs = (s, l, r, k) => {
    const cnt = new Array(26).fill(0);
    for (let i = l; i <= r; i++) {
        cnt[s[i].charCodeAt() - 'a'.charCodeAt()]++;
    }

    let split = 0;
    for (let i = 0; i < 26; i++) {
        if (cnt[i] > 0 && cnt[i] < k) {
            split = String.fromCharCode(i + 'a'.charCodeAt());
            break;
        }
    }
    if (split == 0) {
        return r - l + 1;
    }

    let i = l;
    let ret = 0;
    while (i <= r) {
        while (i <= r && s[i] === split) {
            i++;
        }
        if (i > r) {
            break;
        }
        let start = i;
        while (i <= r && s[i] !== split) {
            i++;
        }

        const length = dfs(s, start, i - 1, k);
        ret = Math.max(ret, length);
    }
    return ret;
};

// 304. 二维区域和检索 - 矩阵不可变  基础题
/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
  const m = matrix.length;
  if (m > 0) {
      const n = matrix[0].length;
      this.sums = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
      for (let i = 0; i < m; i++) {
          for (let j = 0; j < n; j++) {
              this.sums[i + 1][j + 1] = this.sums[i][j + 1] + this.sums[i + 1][j] - this.sums[i][j] + matrix[i][j];
          }
      }
  }
};

NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
  return this.sums[row2 + 1][col2 + 1] - this.sums[row1][col2 + 1] - this.sums[row2 + 1][col1] + this.sums[row1][col1];
};

// 338. 比特位计数 动态规划 位运算
/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function(num) {
  let res = [0]
  for (let i = 1; i < num + 1; i++) {
        res.push(res[i>>1]+ (i&1))
  }
  return res;
};

// 354. 俄罗斯套娃信封问题  二分查找
/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function(envelopes) {
  if (envelopes.length === 0) {
      return 0;
  }
  
  const n = envelopes.length;
  envelopes.sort((e1, e2) => {
      if (e1[0] - e2[0]) {
          return e1[0] - e2[0];
      } else {
          return e2[1] - e1[1];
      }
  })

  const f = [envelopes[0][1]];
  for (let i = 1; i < n; ++i) {
      const num = envelopes[i][1];
      if (num > f[f.length - 1]) {
          f.push(num);
      } else {
          const index = binarySearch(f, num);
          f[index] = num;
      }
  }
  return f.length;

  function binarySearch(f, target)  {
    let low = 0, high = f.length - 1;
    while (low < high) {
        const mid = Math.floor((high - low) / 2) + low;
        if (f[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
  };
}

// 232. 用栈实现队列 基础逻辑
/**
 * Initialize your data structure here.
 */
var MyQueue = function() {
  this.inStack = [];
  this.outStack = [];
};

MyQueue.prototype.push = function(x) {
  this.inStack.push(x);
};

MyQueue.prototype.pop = function() {
  if (!this.outStack.length) {
      this.in2out();
  }
  return this.outStack.pop();
};

MyQueue.prototype.peek = function() {
  if (!this.outStack.length) {
      this.in2out();
  }
  return this.outStack[this.outStack.length - 1];
};

MyQueue.prototype.empty = function() {
  return this.outStack.length === 0 && this.inStack.length === 0;
};

MyQueue.prototype.in2out = function() {
  while (this.inStack.length) {
      this.outStack.push(this.inStack.pop());
  }
}

// 503. 下一个更大元素 II 单调栈
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(nums) {
  const n = nums.length;
  const ret = new Array(n).fill(-1);
  const stk = [];
  for (let i = 0; i < n * 2 - 1; i++) {
      while (stk.length && nums[stk[stk.length - 1]] < nums[i % n]) {
          ret[stk[stk.length - 1]] = nums[i % n];
          stk.pop();
      }
      stk.push(i % n);
  }
  return ret;
};

// 131. 分割回文串 晦朔 + 动态规划
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
  const dfs = (i) => {
      if (i === n) {
          ret.push(ans.slice());
          return;
      }
      for (let j = i; j < n; ++j) {
          if (f[i][j]) {
              ans.push(s.slice(i, j + 1));
              dfs(j + 1);
              ans.pop();
          }
      }
  }
  
  const n = s.length;
  const f = new Array(n).fill(0).map(() => new Array(n).fill(true));
  let ret = [], ans = [];
  
  for (let i = n - 1; i >= 0; --i) {
      for (let j = i + 1; j < n; ++j) {
          f[i][j] = (s[i] === s[j]) && f[i + 1][j - 1];
      }
  }
  dfs(0);
  return ret;
};

// 132. 分割回文串 II 动态规划  关键是预处理
/**
 * @param {string} s
 * @return {number}
 */
var minCut = function(s) {
  const n = s.length;
  const g = new Array(n).fill(0).map(() => new Array(n).fill(true));

  for (let i = n - 1; i >= 0; --i) {
      for (let j = i + 1; j < n; ++j) {
          g[i][j] = s[i] == s[j] && g[i + 1][j - 1];
      }
  }

  const f = new Array(n).fill(Number.MAX_SAFE_INTEGER);
  for (let i = 0; i < n; ++i) {
      if (g[0][i]) {
          f[i] = 0;
      } else {
          for (let j = 0; j < i; ++j) {
              if (g[j + 1][i]) {
                  f[i] = Math.min(f[i], f[j] + 1);
              }
          }
      }
  }

  return f[n - 1];
};


// 1047. 删除字符串中的所有相邻重复项 基础题
/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function(S) {
   let res = []
   for (const ch of S) {
     if(res.length && res[res.length-1] ==  ch) {
       res.pop()
     } else {
       res.push(ch)
     }
   }
   return res.join('')

};

// 224. 基本计算器 堆栈
/**
 * @param {string} s
 * @return {number}
 */
 var calculate = function(s) {
  const ops = [1];
  let sign = 1;

  let ret = 0;
  const n = s.length;
  let i = 0;
  while (i < n) {
      if (s[i] === ' ') {
          i++;
      } else if (s[i] === '+') {
          sign = ops[ops.length - 1];
          i++;
      } else if (s[i] === '-') {
          sign = -ops[ops.length - 1];
          i++;
      } else if (s[i] === '(') {
          ops.push(sign);
          i++;
      } else if (s[i] === ')') {
          ops.pop();
          i++;
      } else {
          let num = 0;
          while (i < n && !(isNaN(Number(s[i]))) && s[i] !== ' ') {
              num = num * 10 + s[i].charCodeAt() - '0'.charCodeAt();
              i++;
          }
          ret += sign * num;
      }
  }
  return ret;
};

// 331. 验证二叉树的前序序列化 判断槽位
/**
 * @param {string} preorder
 * @return {boolean}
 */

 var isValidSerialization = function(preorder) {
  const n = preorder.length;
  let i = 0;
  let slots = 1;
  while (i < n) {
      if (slots === 0) {
          return false;
      }
      if (preorder[i] === ',') {
          ++i;
      } else if (preorder[i] === '#') {
          --slots;
          ++i;
      } else {
          // 读一个数字
          while (i < n && preorder[i] !== ',') {
              ++i;
          }
          ++slots; // slots = slots - 1 + 2
      }
  }
  return slots === 0;
};

// 227. 基本计算器 II 基础逻辑题

/**
 * @param {string} s
 * @return {number}
 */
 var calculate = function(s) {
  s = s.trim();
  const stack = new Array();
  let preSign = '+';
  let num = 0;
  const n = s.length;
  for (let i = 0; i < n; ++i) {
      if (!isNaN(Number(s[i])) && s[i] !== ' ') {
          num = num * 10 + s[i].charCodeAt() - '0'.charCodeAt();
      }
      if (isNaN(Number(s[i])) || i === n - 1) {
          switch (preSign) {
              case '+':
                  stack.push(num);
                  break;
              case '-':
                  stack.push(-num);
                  break;
              case '*':
                  stack.push(stack.pop() * num);
                  break;
              default:
                  stack.push(stack.pop() / num | 0);
          }   
          preSign = s[i];
          num = 0;
      }
  }
  let ans = 0;
  while (stack.length) {
      ans += stack.pop();
  }
  return ans;
};

// 705. 设计哈希集合 哈希函数 ， 冲突处理， 扩容
/**
 * Initialize your data structure here.
 */
 var MyHashSet = function() {
  this.BASE = 769;
  this.data = new Array(this.BASE).fill(0).map(() => new Array());
};

MyHashSet.prototype.add = function(key) {
  const h = this.hash(key);
  for (const element of this.data[h]) {
      if (element === key) {
          return;
      }
  }
  this.data[h].push(key);
};

MyHashSet.prototype.remove = function(key) {
  const h = this.hash(key);
  const it = this.data[h];
  for (let i = 0; i < it.length; ++i) {
      if (it[i] === key) {
          it.splice(i, 1);
          return;
      }
  }
};

MyHashSet.prototype.contains = function(key) {
  const h = this.hash(key);
  for (const element of this.data[h]) {
      if (element === key) {
          return true;
      }
  }
  return false;
};

MyHashSet.prototype.hash = function(key) {
  return key % this.BASE;
}

// 706. 设计哈希映射  哈希函数 ， 冲突处理， 扩容
/**
 * Initialize your data structure here.
 */
var MyHashMap = function() {
  this.BASE = 769;
  this.data = new Array(this.BASE).fill(0).map(() => new Array());
};

MyHashMap.prototype.put = function(key, value) {
  const h = this.hash(key);
  for (const it of this.data[h]) {
      if (it[0] === key) {
          it[1] = value;
          return;
      }
  }
  this.data[h].push([key, value]);
};

MyHashMap.prototype.get = function(key) {
  const h = this.hash(key);
  for (const it of this.data[h]) {
      if (it[0] === key) {
          return it[1];
      }
  }
  return -1;
};

MyHashMap.prototype.remove = function(key) {
  const h = this.hash(key);
  for (const it of this.data[h]) {
      if (it[0] === key) {
          const idx = this.data[h].indexOf(it);
          this.data[h].splice(idx, 1);
          return;
      }
  }
};

MyHashMap.prototype.hash = function(key) {
  return key % this.BASE;
}

// 54. 螺旋矩阵  基础题
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
 var spiralOrder = function(matrix) {
  if (!matrix.length || !matrix[0].length) {
      return [];
  }
  const rows = matrix.length, columns = matrix[0].length;
  const visited = new Array(rows).fill(0).map(() => new Array(columns).fill(false));
  const total = rows * columns;
  const order = new Array(total).fill(0);

  let directionIndex = 0, row = 0, column = 0;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  for (let i = 0; i < total; i++) { 
      order[i] = matrix[row][column];
      visited[row][column] = true;
      const nextRow = row + directions[directionIndex][0], nextColumn = column + directions[directionIndex][1];
      if (!(0 <= nextRow && nextRow < rows && 0 <= nextColumn && nextColumn < columns && !(visited[nextRow][nextColumn]))) {
          directionIndex = (directionIndex + 1) % 4;
      }
      row += directions[directionIndex][0];
      column += directions[directionIndex][1];
  }
  return order;
};

// 59. 螺旋矩阵 II 基础题 处理螺旋判断
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
  const visited = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let directionIndex = 0, row = 0, column = 0;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  for (let i = 0; i < n*n; i++) { 
      visited[row][column] = i+1;
      const nextRow = row + directions[directionIndex][0], nextColumn = column + directions[directionIndex][1];
      if (!(0 <= nextRow && nextRow < n && 0 <= nextColumn && nextColumn < n && !(visited[nextRow][nextColumn]))) {
          directionIndex = (directionIndex + 1) % 4;
      }
      row += directions[directionIndex][0];
      column += directions[directionIndex][1];
  }
  return visited
};

// 115. 不同的子序列 动态规划 主要是找到转移方程
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
 var numDistinct = function(s, t) {
  const m = s.length, n = t.length;
  if (m < n) {
      return 0;
  }
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) {
      dp[i][n] = 1;
  }
  for (let i = m - 1; i >= 0; i--) {
      for (let j = n - 1; j >= 0; j--) {
          if (s[i] == t[j]) {
              dp[i][j] = dp[i + 1][j + 1] + dp[i + 1][j];
          } else {
              dp[i][j] = dp[i + 1][j];
          }
      }
  }
  return dp[0][0];
};

// 92. 反转链表 II 基础题
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
  // 设置 dummyNode 是这一类问题的一般做法
  const dummy_node = new ListNode(-1);
  dummy_node.next = head;
  let pre = dummy_node;
  for (let i = 0; i < left - 1; ++i) {
      pre = pre.next;
  }

  let cur = pre.next;
  for (let i = 0; i < right - left; ++i) {
      const next = cur.next;
      cur.next = next.next;
      next.next = pre.next;
      pre.next = next;
  }
  return dummy_node.next;
};

// 1603. 设计停车系统 基础题
/**
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */

var ParkingSystem = function(big, medium, small) {
  this.big = big;
  this.medium = medium;
  this.small = small;
};

ParkingSystem.prototype.addCar = function(carType) {
  if (carType === 1) {
      if (this.big > 0) {
          this.big--;
          return true;
      }
  } else if (carType === 2) {
      if (this.medium > 0) {
          this.medium--;
          return true;
      }
  } else if (carType === 3) {
      if (this.small > 0) {
          this.small--;
          return true;
      }
  }
  return false;
};

// 191. 位1的个数 基础题
var hammingWeight = function(n) {
  let ret = 0;
  while (n) {
      n &= n - 1;
      ret++;
  }
  return ret;
};

// 73. 矩阵置零 基础题
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
 var setZeroes = function(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const row = new Array(m).fill(false);
  const col = new Array(n).fill(false);
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          if (matrix[i][j] === 0) {
              row[i] = col[j] = true;
          }
      }
  }
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          if (row[i] || col[j]) {
              matrix[i][j] = 0;
          }
      }
  }
};

// 150. 逆波兰表达式求值  堆栈
/**
 * @param {string[]} tokens
 * @return {number}
 */
 var evalRPN = function(tokens) {
  const stack = [];
  const n = tokens.length;
  for (let i = 0; i < n; i++) {
      const token = tokens[i];
      if (isNumber(token)) {
          stack.push(parseInt(token));
      } else {
          const num2 = stack.pop();
          const num1 = stack.pop();
          if (token === '+') {
              stack.push(num1 + num2);
          } else if (token === '-') {
              stack.push(num1 - num2);
          } else if (token === '*') {
              stack.push(num1 * num2);
          } else if (token === '/') {
              stack.push(num1 / num2 > 0 ? Math.floor(num1 / num2) : Math.ceil(num1 / num2));
          }
      }
  }
  return stack.pop();

  function isNumber(token) {
    return !('+' === token || '-' === token || '*' === token || '/' === token );
  }
};

//  341. 扁平化嵌套列表迭代器 基础逻辑
var NestedIterator = function(nestedList) {
    this.stack = nestedList;
};

NestedIterator.prototype.hasNext = function() {
    while (this.stack.length !== 0) {
        if (this.stack[0].isInteger()) {
            return true;
        } else {
            let cur = this.stack[0].getList();
            this.stack.shift();
            this.stack.unshift(...cur);
        }
    }
};

NestedIterator.prototype.next = function() {
    return this.stack.shift().getInteger();
};

// 456. 132模式  堆栈 枚举

/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var find132pattern = function(nums) {
  const n = nums.length;
  const candidate_k = [nums[n - 1]];
  let max_k = -Number.MAX_SAFE_INTEGER;

  for (let i = n - 2; i >= 0; --i) {
      if (nums[i] < max_k) {
          return true;
      }
      while (candidate_k.length && nums[i] > candidate_k[candidate_k.length - 1]) {
          max_k = candidate_k[candidate_k.length - 1];
          candidate_k.pop();
      }
      if (nums[i] > max_k) {
          candidate_k.push(nums[i]);
      }
  }
  return false;
};

// 82. 删除排序链表中的重复元素 II 基础题
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    if (!head) {
        return head;
    }

    const dummy = new ListNode(0, head);
    let cur = dummy;
    while (cur.next && cur.next.next) {
        if (cur.next.val === cur.next.next.val) {
            const x = cur.next.val;
            while (cur.next && cur.next.val === x) {
                cur.next = cur.next.next;
            } 
        } else {
            cur = cur.next;
        }
    }
    return dummy.next;
};

// 83. 删除排序链表中的重复元素 基础题
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var deleteDuplicates = function(head) {
  if (!head) {
      return head;
  }

  let cur = head;
  while (cur.next) {
      if (cur.val === cur.next.val) {
          cur.next = cur.next.next;
      } else {
          cur = cur.next;
      }
  }
  return head;
};

// 74. 搜索二维矩阵  映射成一维数组  二分查找
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let low = 0, high = m * n - 1;
  while (low <= high) {
      const mid = Math.floor((high - low) / 2) + low;
      const x = matrix[Math.floor(mid / n)][mid % n];
      if (x < target) {
          low = mid + 1;
      } else if (x > target) {
          high = mid - 1;
      } else {
          return true;
      }
  }
  return false;
};

// 190. 颠倒二进制位  位运算
var reverseBits = function(n) {
  let rev = 0;
  for (let i = 0; i < 32 && n > 0; ++i) {
      rev |= (n & 1) << (31 - i);
      n >>>= 1;
  }
  return rev >>> 0;
};


// 61. 旋转链表 闭环 断裂

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
 var rotateRight = function(head, k) {
  if (k === 0 || !head || !head.next) {
      return head;
  }
  let n = 1;
  let cur = head;
  while (cur.next) {
      cur = cur.next;
      n++;
  }

  let add = n - k % n;
  if (add === n) {
      return head;
  }

  cur.next = head;
  while (add) {
      cur = cur.next;
      add--;
  }

  const ret = cur.next;
  cur.next = null;
  return ret;
};

// 173. 二叉搜索树迭代器  二叉树的中序遍历 
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
var BSTIterator = function(root) {
  this.idx = 0;
  this.arr = [];
  this.inorderTraversal(root, this.arr);
};

BSTIterator.prototype.next = function() {
  return this.arr[this.idx++];
};

BSTIterator.prototype.hasNext = function() {
  return this.idx < this.arr.length;
};

BSTIterator.prototype.inorderTraversal = function(root, arr) {
  if (!root) {
      return;
  }
  this.inorderTraversal(root.left, arr);
  arr.push(root.val);
  this.inorderTraversal(root.right, arr);
};

// 90. 子集 II  递归 
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var subsetsWithDup = function(nums) {
   nums.sort((a,b) => a -b);
   let t = [], ans = []
   dfs(false,0,nums);
   return ans

   function dfs(choosePre,cur) {
     if(cur == nums.length) {
       ans.push(t.slice())
       return;
     }
     dfs(false,cur+1)
     if(!choosePre && cur > 0 && nums[cur-1] == nums[cur]) {
       return;
     }
     t.push(nums[cur]);
     dfs(true,cur+1,nums)
     t.pop()
   }
};
 
//  1006. 笨阶乘  堆栈 数学解析
/**
 * @param {number} N
 * @return {number}
 */
 var clumsy = function(N) {
   const stack = [N--]
   let i = 0
   while(N > 0) {
     if(i%4 == 0) {
       stack.push(stack.pop()*N);
     } else if(i%4 == 1) {
       const cur = stack.pop();
       stack.push(cur > 0 ?Math.floor(cur / N) : Math.ceil(cur / N));
     } else if (i%4 ==2) {
       stack.push(N);
     }  else {
       stack.push(-N)
     }
     i++
     N--;
   }
   let sum = 0
   stack.forEach((element) => {
    sum += element;
   })
   return sum;
};

// 数学简化
var clumsy = function(N) {
  if (N === 1) {
      return 1;
  } else if (N === 2) {
      return 2;
  } else if (N === 3) {
      return 6;
  } else if (N === 4) {
      return 7;
  }

  if (N % 4 === 0) {
      return N + 1;
  } else if (N % 4 <= 2) {
      return N + 2;
  } else {
      return N - 1;
  }
};

//  面试题 17.21. 直方图的水量 双指针
/**
 * @param {number[]} height
 * @return {number}
 */
 var trap = function(height) {
   let left = 0,right =height.length - 1,lNum = 0,rNum =0,ans =0;

   while(left < right) {
    lNum = Math.max(lNum,height[left])
    rNum = Math.max(rNum,height[right])
    if(height[left] < height[right]) {
      ans += lNum - height[left];
      left++
    } else {
      ans += rNum - height[right]
      right--
    }
   }
   return ans
};

// 1143. 最长公共子序列   动态规划 
var longestCommonSubsequence = function(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
      const c1 = text1[i - 1];
      for (let j = 1; j <= n; j++) {
          const c2 = text2[j - 1];
          if (c1 === c2) {
              dp[i][j] = dp[i - 1][j - 1] + 1;
          } else {
              dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
      }
  }
  return dp[m][n];
};

// 优化内存
var longestCommonSubsequence = function(text1, text2) {
  const m = text1.length, n = text2.length;
  let dp = Array(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    let newdp = [0]
      const c1 = text1[i - 1];
      for (let j = 1; j <= n; j++) {
          const c2 = text2[j - 1];
          if (c1 === c2) {
            newdp.push(dp[j - 1] + 1);
          } else {
            newdp.push(Math.max(dp[j], newdp[j - 1]));
          }
      }
      dp = newdp;
  }
  return dp[n];
};

// 781. 森林中的兔子 贪心算法
/**
 * @param {number[]} answers
 * @return {number}
 */
 var numRabbits = function(answers) {
  const count = new Map();
  for (const y of answers) {
      count.set(y, (count.get(y) || 0) + 1);
  }
  let ans = 0;
  for (const [y, x] of count.entries()) {
      ans += Math.floor((x + y) / (y + 1)) * (y + 1);
  }
  return ans;
};

// 88. 合并两个有序数组  倒序双指针
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
 var merge = function(nums1, m, nums2, n) {
   let i = m -1,j = n -1,k = m +n -1
   var cur;
   while(j >= 0) {
     if(i == -1) {
       cur = nums2[j--]
     } else if(nums1[i] > nums2[j]) {
       cur = nums1[i--]
     } else {
       cur = nums2[j--]
     }
     nums1[k--] = cur
   } 
};
// 80. 删除有序数组中的重复项 II  双指针 快慢指针
/**
 * @param {number[]} nums
 * @return {number}
 */
 var removeDuplicates = function(nums) {
   let n = nums.length;
   if(n <= 2) {
     return n;
   }
   let slow = 2 ,fast = 2
   while(fast < n) {
     if(nums[slow -2] != nums[fast]) {
       nums[slow] = nums[fast]
       slow++;
     }
     fast++;
   }
   return slow;
};

// 81. 搜索旋转排序数组 II 二分查找
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function(nums, target) {
  const n = nums.length;
  if (n === 0) {
      return false;
  }
  if (n === 1) {
      return nums[0] === target;
  }
  let l = 0, r = n - 1;
  while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      if (nums[mid] === target) {
          return true;
      }
      if (nums[l] === nums[mid] && nums[mid] === nums[r]) {
          ++l;
          --r;
      } else if (nums[l] <= nums[mid]) {
          if (nums[l] <= target && target < nums[mid]) {
              r = mid - 1;
          } else {
              l = mid + 1;
          }
      } else {
          if (nums[mid] < target && target <= nums[n - 1]) {
              l = mid + 1;
          } else {
              r = mid - 1;
          }
      }
  }
  return false;
};

// 153. 寻找旋转排序数组中的最小值 二分查找
/**
 * @param {number[]} nums
 * @return {number}
 */
 var findMin = function(nums) {
   let i = 0, j = nums.length -1
   while(i < j) {
     let mid  = Math.floor((i +j)/2)
     if(nums[mid] <nums[j]) {
       j = mid
     } else {
       i = mid +1;
     }
   }
   return nums[i]
};

// 154. 寻找旋转排序数组中的最小值 II 二分查找
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let low = 0;
    let high = nums.length - 1;
    while (low < high) {
        const pivot = Math.floor((high + low) / 2);
        if (nums[pivot] < nums[high]) {
            high = pivot;
        } else if (nums[pivot] > nums[high]) {
            low = pivot + 1;
        } else {
            high -= 1;
        }
    }
    return nums[low];
};

// 179. 最大数 排序
/**
 * @param {number[]} nums
 * @return {string}
 */
 var largestNumber = function(nums) {
  nums.sort((x, y) => {
      let sx = 10, sy = 10;
      while (sx <= x) {
          sx *= 10;
      }
      while (sy <= y) {
          sy *= 10;
      }
      return '' + (sx * y + x) - ('' + (sy * x + y));
  })
  if (nums[0] === 0) {
      return '0';
  }
  return nums.join('');
};

// 263. 丑数 基础题

/**
 * @param {number} n
 * @return {boolean}
 */
 var isUgly = function(n) {
   if(n <= 0) {
     return false
   }
   let backup = [2,3,5], num = n
   for (let i = 0; i < 3; i++) {
     let item = backup[i]
     while(num%item == 0) {
       num = num/item
     }
   }
   return num == 1 
};

// 264. 丑数 II  基础题
 
/**
 * @param {number} n
 * @return {number}
 */
 var nthUglyNumber = function(n) {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  let p2 = 1, p3 = 1, p5 = 1;
  for (let i = 2; i <= n; i++) {
      const num2 = dp[p2] * 2, num3 = dp[p3] * 3, num5 = dp[p5] * 5;
      dp[i] = Math.min(Math.min(num2, num3), num5);
      if (dp[i] === num2) {
          p2++;
      }
      if (dp[i] === num3) {
          p3++;
      }
      if (dp[i] === num5) {
          p5++;
      }
  }
  return dp[n];
};

// 783. 二叉搜索树节点最小距离 二叉树的中序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function(root) {
    let ans = Number.MAX_SAFE_INTEGER, pre = -1;
    const dfs = (root) => {
        if (root === null) {
            return;
        }
        dfs(root.left);
        if (pre == -1) {
            pre = root.val;
        } else {
            ans = Math.min(ans, root.val - pre);
            pre = root.val;
        }
        dfs(root.right);
    }
    dfs(root);
    return ans;
};

// 208. 实现 Trie (前缀树)  字典树

var Trie = function() {
  this.children = {};
};

Trie.prototype.insert = function(word) {
  let node = this.children;
  for (const ch of word) {
      if (!node[ch]) {
          node[ch] = {};
      }
      node = node[ch];
  }
  node.isEnd = true;
};

Trie.prototype.searchPrefix = function(prefix) {
  let node = this.children;
  for (const ch of prefix) {
      if (!node[ch]) {
          return false;
      }
      node = node[ch];
  }
  return node;
}

Trie.prototype.search = function(word) {
  const node = this.searchPrefix(word);
  return node !== undefined && node.isEnd !== undefined;
};

Trie.prototype.startsWith = function(prefix) {
  return this.searchPrefix(prefix);
};

// 213. 打家劫舍 II 动态规划  如何保证第一个和最后一个只偷一个，剔除计算
/**
 * @param {number[]} nums
 * @return {number}
 */
 var rob = function(nums) {
   if(nums.length == 0) {
     return 0
   } else if(nums.length == 1) {
     return nums[0]
   } else if (nums.length == 2) {
     return Math.max(nums[0],nums[1])
   } else {
     return Math.max(rob1(1,nums.length -1),rob1(0,nums.length - 2))
   }
   function rob1(start,end) {
     let temp1 = 0 ,temp2 = 0
     for (let i = start; i <= end; i++) {
       let temp = temp2;
       temp2 = Math.max(temp1 + nums[i],temp2)
       temp1 = temp
     }
     return temp2
   }

};


// 剑指 Offer 68 - I. 二叉搜索树的最近公共祖先 基础题
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
 var lowestCommonAncestor = function(root, p, q) {
   let node = root
   while(true) {
     let value = node.val
     if(p.val < value && q.val < value) {
       node = node.left
     } else if (value < p.val && value < q.val) {
       node =  node.right
     } else {
       break;
     }
   }
   return node
};

// 26. 删除有序数组中的重复项 快慢指针
/**
 * @param {number[]} nums
 * @return {number}
 */
 var removeDuplicates = function(nums) {
   let n = nums.length
   if(n == 0) {
     return 0
   }
   let fast = 1,slow = 1
   while(fast < n) {
     if(nums[fast] != nums[fast -1]) {
       nums[slow] = nums[fast]
       slow++
     }
     fast++
   }
   return slow
};
// 220. 存在重复元素 III 桶
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
 var containsNearbyAlmostDuplicate = function(nums, k, t) {
  const n = nums.length;
  const mp = new Map();
  for (let i = 0; i < n; ++i) {
      const x = nums[i];
      const id = getID(x, t + 1);
      if (mp.has(id)) {
          return true;
      }
      if (mp.has(id - 1) && Math.abs(x - mp.get(id - 1)) <= t) {
          return true;
      }
      if (mp.has(id + 1) && Math.abs(x - mp.get(id + 1)) <= t) {
          return true;
      }
      mp.set(id, x);
      if (i >= k) {
          mp.delete(getID(nums[i - k], t + 1));
      }
  }
  return false;
};

const getID = (x, w) => {
  return x < 0 ? Math.floor((x + 1) / w) - 1 : Math.floor(x / w);
}

// 27. 移除元素 快慢指针
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
 var removeElement = function(nums, val) {
   let fast = 0,slow = 0,n = nums.length
   while(fast < n) {
     if(nums[fast] != val) {
       nums[slow] = nums[fast]
       slow++
     }
     fast++
   }
   return slow
};

// 28. 实现 strStr() KMP算法
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */

 var strStr = function(haystack, needle) {
  const n = haystack.length, m = needle.length;
  if (m === 0) {
      return 0;
  }
  const pi = new Array(m).fill(0);
  for (let i = 1, j = 0; i < m; i++) {
      while (j > 0 && needle[i] !== needle[j]) {
          j = pi[j - 1];
      }
      if (needle[i] == needle[j]) {
          j++;
      }
      pi[i] = j;
  }
  for (let i = 0, j = 0; i < n; i++) {
      while (j > 0 && haystack[i] != needle[j]) {
          j = pi[j - 1];
      }
      if (haystack[i] == needle[j]) {
          j++;
      }
      if (j === m) {
          return i - m + 1;
      }
  }
  return -1;
};

// 91. 解码方法 动态规划
/**
 * @param {string} s
 * @return {number}
 */
 var numDecodings = function(s) {
  const n = s.length;
  const f = new Array(n + 1).fill(0);
  f[0] = 1;
  for (let i = 1; i <= n; ++i) {
      if (s[i - 1] !== '0') {
          f[i] += f[i - 1];
      }
      if (i > 1 && s[i - 2] != '0' && ((s[i - 2] - '0') * 10 + (s[i - 1] - '0') <= 26)) {
          f[i] += f[i - 2];
      }
  }
  return f[n];
};

// 363. 矩形区域不超过 K 的最大数值和  遍历
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
 var maxSumSubmatrix = function(matrix, max) {
  let row = matrix.length // 行
  let column = matrix[0].length // 列
  let b = Array.from({length: column}, () => 0) // 存储每列之和
  let res = -Number.MAX_VALUE
  for(let i=0;i<row;i++) { // 遍历开始行
      for(let t=0;t<b.length;t++) b[t] = 0 // 开始行改变之后需要把每列之和置零
      for(let j=i;j<row;j++) {
          for(let k=0;k<column;k++) b[k] += matrix[j][k]
          // 把所有可能遍历出来
          for(let m=0;m<b.length;m++) {
              let sum = 0
              for(let n=m;n<b.length;n++){
                  sum += b[n]
                  if(sum <= max && sum > res) { // 只有小于max，且大于之前的值
                      res = sum
                      if(res == max) {
                        return max
                      }
                  }
              }
          }
      }
  }
  return res
};

// 368. 最大整除子集 动态规划 反向取值
/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var largestDivisibleSubset = function(nums) {
  const len = nums.length;
  nums.sort((a, b) => a - b);

  // 第 1 步：动态规划找出最大子集的个数、最大子集中的最大整数
  const dp = new Array(len).fill(1);
  let maxSize = 1;
  let maxVal = dp[0];
  for (let i = 1; i < len; i++) {
      for (let j = 0; j < i; j++) {
          // 题目中说「没有重复元素」很重要
          if (nums[i] % nums[j] === 0) {
              dp[i] = Math.max(dp[i], dp[j] + 1);
          }
      }

      if (dp[i] > maxSize) {
          maxSize = dp[i];
          maxVal = nums[i];
      }
  }

  // 第 2 步：倒推获得最大子集
  const res = [];
  if (maxSize === 1) {
      res.push(nums[0]);
      return res;
  }
  
  for (let i = len - 1; i >= 0 && maxSize > 0; i--) {
      if (dp[i] === maxSize && maxVal % nums[i] === 0) {
          res.push(nums[i]);
          maxVal = nums[i];
          maxSize--;
      }
  }
  return res;
};

// 897. 递增顺序搜索树 二叉树的中序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

 var increasingBST = function(root) {
  const res = [];
  inorder(root, res);

  const dummyNode = new TreeNode(-1);
  let currNode = dummyNode;
  for (const value of res) {
      currNode.right = new TreeNode(value);
      currNode = currNode.right;
  }
  return dummyNode.right;

  function inorder (node, res) {
    if (!node) {
        return;
    }
    inorder(node.left, res);
    res.push(node.val);
    inorder(node.right, res);
  }
};

// 377. 组合总和 Ⅳ 动态规划
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function(nums, target) {
    let backup = Array(target +1).fill(0);
    nums.sort((a,b) => a-b)
    backup[0] = 1;
    for (let i = 1; i <= target; i++) {
        for(let num of nums) {
            if ( num <= i) {
                backup[i] += backup[i - num];
            } else {
                break;
            }
        }
    }
    return backup[target];
};

// 1011. 在 D 天内送达包裹的能力 二分查找，确定左右边界
/**
 * @param {number[]} weights
 * @param {number} D
 * @return {number}
 */
 var shipWithinDays = function(weights, D) {
  let left = Math.max(...weights), right = weights.reduce((a, b) => a + b);
  while (left < right) {
      const mid = Math.floor((left + right) / 2);
      let need = 1, cur = 0;
      for (const weight of weights) {
          if (cur + weight > mid) {
              need++;
              cur = 0;
          } 
          cur += weight;
      }

      if (need <= D) {
          right = mid;
      } else {
          left = mid + 1;
      }
  }
  return left;
};

// 938. 二叉搜索树的范围和 中序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
 var rangeSumBST = function(root, low, high) {
   let sum = 0
   dfs(root)
   return sum

   function dfs (node) {
     if(!node) {
       return
     }
     if(node.left && node.val >= low) {
       dfs(node.left)
     }
     if(node.val >= low && node.val <= high) {
       sum += node.val
     }
     if(node.val <= high && node.right) {
       dfs(node.right)
     }
   }
};

// 633. 平方数之和 双指针
/**
 * @param {number} c
 * @return {boolean}
 */

 var judgeSquareSum = function(c) {
  let left = 0;
  let right = Math.floor(Math.sqrt(c));
  while (left <= right) {
      const sum = left * left + right * right;
      if (sum === c) {
          return true;
      } else if (sum > c) {
          right--;
      } else {
          left++;
      }
  }
  return false;
};

// 403. 青蛙过河  动态规划

/**
 * @param {number[]} stones
 * @return {boolean}
 */
 var canCross = function(stones) {
  const n = stones.length;
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
  dp[0][0] = true;
  for (let i = 1; i < n; ++i) {
      if (stones[i] - stones[i - 1] > i) {
          return false;
      }
  }
  
  for (let i = 1; i < n; ++i) {
      for (let j = i - 1; j >= 0; --j) {
          const k = stones[i] - stones[j];
          if (k > j + 1) {
              break;
          }
          dp[i][k] = dp[j][k - 1] || dp[j][k] || dp[j][k + 1];
          if (i === n - 1 && dp[i][k]) {
              return true;
          }
      }
  }
  return false;
};

// 137. 只出现一次的数字 II 状态转化
var singleNumber = function(nums) {
  let a = 0, b = 0;
  for (const num of nums) {
      b = ~a & (b ^ num);
      a = ~b & (a ^ num);
  }
  return b;
};

// 1720. 解码异或后的数组  基础题
/**
 * @param {number[]} encoded
 * @param {number} first
 * @return {number[]}
 */
var decode = function(encoded, first) {
  const n = encoded.length + 1;
  const arr = new Array(n).fill(0);
  arr[0] = first;
  for (let i = 1; i < n; i++) {
      arr[i] = arr[i - 1] ^ encoded[i - 1];
  }
  return arr;
};

// 690. 员工的重要性 遍历
/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
var GetImportance = function(employees, id) {
  const map = new Map();
  for (const employee of employees) {
      map.set(employee.id, employee);
  }
  const dfs = (id) => {
      const employee = map.get(id);
      let total = employee.importance;
      const subordinates = employee.subordinates;
      for (const subId of subordinates) {
          total += dfs(subId);
      }
      return total;
      
  }

  return dfs(id);
};

// 1486. 数组异或操作  数学题
/**
 * @param {number} n
 * @param {number} start
 * @return {number}
 */
var xorOperation = function(n, start) {
    let s = start >> 1, e = n & start & 1;
    let ret = sumXor(s - 1) ^ sumXor(s + n - 1);
    return ret << 1 | e;
};

const sumXor = (x) => {
    if (x % 4 === 0) {
        return x;
    }
    if (x % 4 === 1) {
        return 1;
    }
    if (x % 4 === 2) {
        return x + 1;
    }
    return 0;
}

// 554. 砖墙 统计最多的边缘  统计长度，看看哪个最多
/**
 * @param {number[][]} wall
 * @return {number}
 */
var leastBricks = function(wall) {
  let backup = new Map(),num = wall.length
  for (let i = 0; i < num; i++) {
    let sum = 0,nums = wall[i]
    for (let j = 0; j < nums.length -1; j++) {
      sum += nums[j]
      backup.set(sum,(backup.get(sum) || 0) +1)
    }
  }
  let max = 0
  backup.forEach(function(value,key){
    max = Math.max(max,value)
　}); 
  return num - max;
};

// 7. 整数反转 基础数学题
/**
 * @param {number} x
 * @return {number}
 */
 var reverse = function(x) {
  let rev = 0;
  while (x !== 0) {
      const digit = x % 10;
      x = ~~(x / 10);
      rev = rev * 10 + digit;
      if (rev < Math.pow(-2, 31) || rev > Math.pow(2, 31) - 1) {
          return 0;
      }
  }
  return rev;
};

// 1723. 完成所有工作的最短时间 二分查找
var minimumTimeRequired = function(jobs, k) {
    jobs.sort((a, b) => b - a);
    let l = jobs[0], r = jobs.reduce(function(prev, curr, idx, jobs){ return prev + curr });
    while (l < r) {
        const mid = Math.floor((l + r) >> 1);
        if (check(jobs, k, mid)) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return l;
};

const check = (jobs, k, limit) => {
    const workloads = new Array(k).fill(0);
    return backtrack(jobs, workloads, 0, limit);
}

const backtrack = (jobs, workloads, i, limit) => {
    if (i >= jobs.length) {
        return true;
    }
    let cur = jobs[i];
    for (let j = 0; j < workloads.length; ++j) {
        if (workloads[j] + cur <= limit) {
            workloads[j] += cur;
            if (backtrack(jobs, workloads, i + 1, limit)) {
                return true;
            }
            workloads[j] -= cur;
        }
        // 如果当前工人未被分配工作，那么下一个工人也必然未被分配工作
        // 或者当前工作恰能使该工人的工作量达到了上限
        // 这两种情况下我们无需尝试继续分配工作
        if (workloads[j] === 0 || workloads[j] + cur === limit) {
            break;
        }
    }
    return false;
}

// 872. 叶子相似的树 二叉树的遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
 var leafSimilar = function(root1, root2) {
   let seq1 = []
   dfs(root1,seq1);
   let seq2 = []
   dfs(root2,seq2);
   return seq1.toString() === seq2.toString();

  function dfs(node,seq) {
    if(!node) {return}
    if(!node.left && !node.right) {
      seq.push(node.val);
    } else {
      dfs(node.left,seq)
      dfs(node.right,seq)
    }
  }
};

// 1482. 制作 m 束花所需的最少天数 二分查找定位
/**
 * @param {number[]} bloomDay
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
var minDays = function(bloomDay, m, k) {
    if (m > bloomDay.length / k) {
        return -1;
    }
    let low = Math.min.apply(null, bloomDay), high = Math.max.apply(null, bloomDay);
    while (low < high) {
        const days = Math.floor((high - low) / 2) + low;
        if (canMake(bloomDay, days, m, k)) {
            high = days;
        } else {
            low = days + 1;
        }
    }
    return low;
};

const canMake = (bloomDay, days, m, k) => {
    let bouquets = 0;
    let flowers = 0;
    const length = bloomDay.length;
    for (let i = 0; i < length && bouquets < m; i++) {
        if (bloomDay[i] <= days) {
            flowers++;
            if (flowers == k) {
                bouquets++;
                flowers = 0;
            }
        } else {
            flowers = 0;
        }
    }
    return bouquets >= m;
}

// 1734. 解码异或后的排列 基础题
/**
 * @param {number[]} encoded
 * @return {number[]}
 */
var decode = function(encoded) {
  const n = encoded.length + 1;
  let total = 0;
  for (let i = 1; i <= n; i++) {
      total ^= i;
  }
  let odd = 0;
  for (let i = 1; i < n - 1; i += 2) {
      odd ^= encoded[i];
  }
  const perm = new Array(n).fill(0);
  perm[0] = total ^ odd;
  for (let i = 0; i < n - 1; i++) {
      perm[i + 1] = perm[i] ^ encoded[i];
  }
  return perm;
};


// 740. 删除并获得点数  打家劫舍变种
/**
 * @param {number[]} nums
 * @return {number}
 */
 var deleteAndEarn = function(nums) {
  let maxVal = 0;
  for (const val of nums) {
      maxVal = Math.max(maxVal, val);
  }
  const sum = new Array(maxVal + 1).fill(0);
  for (const val of nums) {
      sum[val] += val;
  }
  return rob(sum);

  function rob (nums) {
    const size = nums.length;
    let first = nums[0], second = Math.max(nums[0], nums[1]);
    for (let i = 2; i < size; i++) {
        let temp = second;
        second = Math.max(first + nums[i], second);
        first = temp;
    }
    return second;
  }
};

// 1310. 子数组异或查询 数学题
/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
 var xorQueries = function(arr, queries) {
  const n = arr.length;
  const xors = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
      xors[i + 1] = xors[i] ^ arr[i];
  }
  const m = queries.length;
  const ans = new Array(m).fill(0);
  for (let i = 0; i < m; i++) {
      ans[i] = xors[queries[i][0]] ^ xors[queries[i][1] + 1];
  }
  return ans;
};

// 剑指 Offer 16. 数值的整数次方 递归
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
 var myPow = function(x, n) {
  if(n === 0) return 1;
  if(n === 1) return x;
  if(n === -1) return 1/x;
  if(n%2===0){
      let a = myPow(x,n/2);
      return a * a
  }
  else{
      let b = myPow(x,(n-1)/2);
      return b*b*x
  }
};

// 1269. 停在原地的方案数 动态规划
/**
 * @param {number} steps
 * @param {number} arrLen
 * @return {number}
 */
 var numWays2 = function(steps, arrLen) {
  const MODULO = 1000000007;
  let maxColumn = Math.min(arrLen - 1, steps);
  let dp = new Array(maxColumn + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= steps; i++) {
      const dpNext = new Array(maxColumn + 1).fill(0);
      for (let j = 0; j <= maxColumn; j++) {
          dpNext[j] = dp[j];
          if (j - 1 >= 0) {
              dpNext[j] = (dpNext[j] + dp[j - 1]) % MODULO;
          }
          if (j + 1 <= maxColumn) {
              dpNext[j] = (dpNext[j] + dp[j + 1]) % MODULO;
          }
      }
      dp = dpNext;
  }
  return dp[0];
};

// 12. 整数转罗马数字  基础题  
/**
 * @param {number} num
 * @return {string}
 */
 var intToRoman = function(num) {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const valueSymbols = new Map();
  valueSymbols.set(1000, "M");
  valueSymbols.set(900, "CM");
  valueSymbols.set(500, "D");
  valueSymbols.set(400, "CD");
  valueSymbols.set(100, "C");
  valueSymbols.set(90, "XC");
  valueSymbols.set(50, "L");
  valueSymbols.set(40, "XL");
  valueSymbols.set(10, "X");
  valueSymbols.set(9, "IX");
  valueSymbols.set(5, "V");
  valueSymbols.set(4, "IV");
  valueSymbols.set(1, "I");
  const roman = [];
  for (const value of values) {
      const symbol = valueSymbols.get(value);
      while (num >= value) {
          num -= value;
          roman.push(symbol);
      }
      if (num == 0) {
          break;
      }
  }
  return roman.join('');
};

// 993. 二叉树的堂兄弟节点
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
 var isCousins = function(root, x, y) {
  // x 的信息
  let x_parent = null, x_depth = null, x_found = false;
  // y 的信息
  let y_parent = null, y_depth = null, y_found = false;
  
  const dfs = (node, depth, parent) => {
      if (!node) {
          return;
      }
      if (node.val === x) {
          [x_parent, x_depth, x_found] = [parent, depth, true];
      } else if (node.val === y) {
          [y_parent, y_depth, y_found] = [parent, depth, true];
      }

      // 如果两个节点都找到了，就可以提前退出遍历
      // 即使不提前退出，对最坏情况下的时间复杂度也不会有影响
      if (x_found && y_found) {
          return;
      }

      dfs(node.left, depth + 1, node);

      if (x_found && y_found) {
          return;
      }

      dfs(node.right, depth + 1, node);
  }
  dfs(root, 0, null);
  return x_depth === y_depth && x_parent !== y_parent;
};

// 13. 罗马数字转整数 基础题
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
  const symbolValues = new Map();
  symbolValues.set('I', 1);
  symbolValues.set('V', 5);
  symbolValues.set('X', 10);
  symbolValues.set('L', 50);
  symbolValues.set('C', 100);
  symbolValues.set('D', 500);
  symbolValues.set('M', 1000);  
  let ans = 0;
  const n = s.length;
  for (let i = 0; i < n; ++i) {
      const value = symbolValues.get(s[i]);
      if (i < n - 1 && value < symbolValues.get(s[i + 1])) {
          ans -= value;
      } else {
          ans += value;
      }
  }
  return ans;
};

// 421. 数组中两个数的最大异或值

/**
 * @param {number[]} arr
 * @return {number}
 */
var findMaximumXOR = function(nums) {
   let maxXOR = -Infinity;
   for(let i = 0;i<nums.length;i++) {
    for(let j = i;j<nums.length;j++) {
       maxXOR = Math.max(maxXOR,nums[i] ^ nums[j]);
    }
   }
   return maxXOR;
};

// 1442. 形成两个异或相等数组的三元组数目  优化，哈希表
/**
 * @param {number[]} arr
 * @return {number}
 */
var countTriplets = function(arr) {
    const cnt = new Map(), total = new Map();
    let ans = 0, s = 0;

    for (const [k, val] of arr.entries()) {
        const t = s ^ val;
        if (cnt.has(t)) {
            ans += cnt.get(t) * k - total.get(t);
        }
        cnt.set(s, (cnt.get(s) || 0) + 1);
        total.set(s, (total.get(s) || 0) + k);
        s = t;
    }
    return ans;
};

// 1738. 找出第 K 大的异或坐标值  先计算。再排序取值
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */

 var kthLargestValue = function(matrix, k) {
  const m = matrix.length, n = matrix[0].length;
  const pre = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  const results = [];
  for (let i = 1; i < m + 1; i++) {
      for (let j = 1; j < n + 1; j++) {
          pre[i][j] = pre[i - 1][j] ^ pre[i][j - 1] ^ pre[i - 1][j - 1] ^ matrix[i - 1][j - 1];
          results.push(pre[i][j]);
      }
  }
  results.sort((a, b) => b - a);
  return results[k - 1];
}

// 692. 前K个高频单词  哈希表 排序
/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function(words, k) {
  const cnt = new Map();
  for (const word of words) {
      cnt.set(word, (cnt.get(word) || 0) + 1);
  }
  const rec = [];
  for (const entry of cnt.keys()) {
      rec.push(entry);
  }
  rec.sort((word1, word2) => {
      return cnt.get(word1) === cnt.get(word2) ? word1.localeCompare(word2) : cnt.get(word2) - cnt.get(word1);
  })
  return rec.slice(0, k);
};

// 1035. 不相交的线 最长公共子序列  动态规划
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 var maxUncrossedLines = function(nums1, nums2) {
  const m = nums1.length, n = nums2.length;
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
      const num1 = nums1[i - 1];
      for (let j = 1; j <= n; j++) {
          const num2 = nums2[j - 1];
          if (num1 === num2) {
              dp[i][j] = dp[i - 1][j - 1] + 1;
          } else {
              dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
      }
  }
  return dp[m][n];
};

// 664. 奇怪的打印机 动态规划
/**
 * @param {string} s
 * @return {number}
 */
 var strangePrinter = function(s) {
  const n = s.length;
  const f = new Array(n).fill(0).map(() => new Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
      f[i][i] = 1;
      for (let j = i + 1; j < n; j++) {
          if (s[i] == s[j]) {
              f[i][j] = f[i][j - 1];
          } else {
              let minn = Number.MAX_SAFE_INTEGER;
              for (let k = i; k < j; k++) {
                  minn = Math.min(minn, f[i][k] + f[k + 1][j]);
              }
              f[i][j] = minn;
          }
      }
  }
  return f[0][n - 1];
};

// 810. 黑板异或游戏 数学题
/**
 * @param {number[]} nums
 * @return {boolean}
 */

 var xorGame = function(nums) {
  if (nums.length % 2 == 0) {
      return true;
  }
  let xor = 0;
  for (const num of nums) {
      xor ^= num;
  }
  return xor == 0;
};

// 1787. 使所有区间的异或结果为零 数学+动态规划
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var minChanges = function(nums, k) {
  // x 的范围为 [0, 2^10)
  const MAXX = 2**10;

  const n = nums.length;
  let f = new Array(MAXX).fill(Number.MAX_VALUE);
  // 边界条件 f(-1,0)=0
  f[0] = 0;

  for (let i = 0; i < k; i++) {
      // 第 i 个组的哈希映射
      const count = new Map();
      let size = 0;
      for (let j = i; j < n; j += k) {
          count.has(nums[j]) ? count.set(nums[j], count.get(nums[j]) + 1) : count.set(nums[j], 1);
          size++;
      }

      // 求出 t2
      const t2min = Math.min(...f);

      const g = new Array(MAXX).fill(t2min);
      for (let mask = 0; mask < MAXX; mask++) {
          // t1 则需要枚举 x 才能求出
          for (const [x, countx] of count.entries()) {
              g[mask] = Math.min(g[mask], f[mask ^ x] - countx);
          }
      }

      // 别忘了加上 size
      for (const [index, val] of g.entries()) {
          f[index] = val + size;
      }
  }

  return f[0];
};

// 剑指 Offer 68 - II. 二叉树的最近公共祖先  遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
 var lowestCommonAncestor = function(root, p, q) {
  let ans;
  const dfs = (root, p, q) => {
      if (root === null) return false;
      const lson = dfs(root.left, p, q);
      const rson = dfs(root.right, p, q);
      if ((lson && rson) || ((root.val === p.val || root.val === q.val) && (lson || rson))) {
          ans = root;
      } 
      return lson || rson || (root.val === p.val || root.val === q.val);
  }
  dfs(root, p, q);
  return ans;
};

// 1190. 反转每对括号间的子串 预处理
/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function(s) {
    const n = s.length;
    const pair = new Array(n).fill(0);
    const stack = [];
    for (let i = 0; i < n; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else if (s[i] == ')') {
            const j = stack.pop();
            pair[i] = j;
            pair[j] = i;
        }
    }

    const sb = [];
    let index = 0, step = 1;
    while (index < n) {
        if (s[index] === '(' || s[index] === ')') {
            index = pair[index];
            step = -step;
        } else {
            sb.push(s[index]);
        }
        index += step;
    }
    return sb.join('');
};

// 461. 汉明距离 基础题
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
 var hammingDistance = function(x, y) {
  let s = x ^ y, ret = 0;
  while (s != 0) {
      ret += s & 1;
      s >>= 1;
  }
  return ret;
};

// 342. 4的幂 基础题
/**
 * @param {number} n
 * @return {boolean}
 */
 var isPowerOfFour = function(n) {
  return n > 0 && (n & (n - 1)) === 0 && n % 3 === 1;
};

// 231. 2 的幂  基础题
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
    return n > 0 && (n & (n - 1)) === 0;
};

// 1744. 你能在你最喜欢的那天吃到你最喜欢的糖果吗？ 前缀和 基础题
var canEat = function(candiesCount, queries) {
  const n = candiesCount.length;
  
  // 前缀和
  const sum = new Array(n).fill(0);;
  sum[0] = candiesCount[0];
  for (let i = 1; i < n; ++i) {
      sum[i] = sum[i - 1] + candiesCount[i];
  }
  
  const q = queries.length;
  const ans = new Array(q).fill(0);
  for (let i = 0; i < q; ++i) {
      const query = queries[i];
      const favoriteType = query[0], favoriteDay = query[1], dailyCap = query[2];
      
      const x1 = favoriteDay + 1;
      const y1 = (favoriteDay + 1) * dailyCap;
      const x2 = favoriteType == 0 ? 1 : sum[favoriteType - 1] + 1;
      const y2 = sum[favoriteType];
      
      ans[i] = !(x1 > y2 || y1 < x2);
  }
  return ans;
};

// 523. 连续的子数组和 前缀 映射

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
 var checkSubarraySum = function(nums, k) {
   if(nums.length < 2) {
     return false;
   }
   let backup = new Map()
   backup.set(0,-1)
   let remainder = 0
   for (let i = 0; i < nums.length; i++) {
     remainder = (remainder + nums[i])%k
     if(backup.has(remainder)) {
       let prevI = backup.get(remainder)
       if(i - prevI  >= 2) {
         return true
       }
     } else {
       backup.set(remainder,i);
     }
   }
   return false
};

// 525. 连续数组 前缀 映射
/**
 * @param {number[]} nums
 * @return {number}
 */
 var findMaxLength = function(nums) {
  let backup = new Map()
  backup.set(0,-1)
  let remainder = 0,max = 0
  for (let i = 0; i < nums.length; i++) {
    if(nums[i] == 1) {
      remainder++
    } else {
      remainder--
    }
    if(backup.has(remainder)) {
      let prevI = backup.get(remainder)
      max = Math.max(max,i - prevI);
    } else {
      backup.set(remainder,i);
    }
  }
  return max
};

// 160. 相交链表 双指针
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
 var getIntersectionNode = function(headA, headB) {
  if (headA === null || headB === null) {
      return null;
  }
  let pA = headA, pB = headB;
  while (pA !== pB) {
      pA = pA === null ? headB : pA.next;
      pB = pB === null ? headA : pB.next;
  }
  return pA;
};


// 203. 移除链表元素 基础题
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
 var removeElements = function(head, val) {
   let temp = new ListNode(0,head)
   let next = temp
   while(next.next) {
     let node = next.next;
     if(node.val  == val) {
       next.next =  node.next
       node.next = null
     } else {
       next = node;
     }
   }
   return temp.next
};

// 494. 目标和 递归
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var findTargetSumWays = function(nums, S) {
  let n = 0;
  const loop = (idx, sum) => {
      if(nums.length > idx){
          loop(idx + 1, sum + nums[idx]);
          loop(idx + 1, sum - nums[idx]);
      }else{
          sum === S && n++;
      }
  }
  loop(0, 0);
  return n;
};


// 剑指 Offer 36. 二叉搜索树与双向链表 基础题
/**
 * // Definition for a Node.
 * function Node(val,left,right) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
 var treeToDoublyList = function(root) {

  //特殊情况的考虑
  if(!root) return null;

  //1.进行中序遍历,存入每个节点的指针
  let nodeSet=[];
  const inOrder=node=>{
      if(!node){
          return;
      }
      inOrder(node.left);
      let p=node;
      nodeSet.push(p);
      inOrder(node.right);
  };
  inOrder(root);

  //2.连接成循环双向链表
  if(nodeSet.length===1){
      nodeSet[0].left=nodeSet[0];
      nodeSet[0].right=nodeSet[0];
  }else{
      for(let i=1;i<nodeSet.length-1;i++){
          //首尾结点待会单独考虑
          nodeSet[i].left=nodeSet[i-1];
          nodeSet[i].right=nodeSet[i+1];
      }
      nodeSet[0].left=nodeSet[nodeSet.length-1];
      nodeSet[0].right=nodeSet[1];
      nodeSet[nodeSet.length-1].right=nodeSet[0];
      nodeSet[nodeSet.length-1].left=nodeSet[nodeSet.length-2];
  }
  return nodeSet[0];

};

//  1049. 最后一块石头的重量 II 动态规划

/**
 * @param {number[]} stones
 * @return {number}
 */
 var lastStoneWeightII = function(stones) {
  let sum = 0;
  for (const weight of stones) {
      sum += weight;
  }
  const m = Math.floor(sum / 2);
  const dp = new Array(m + 1).fill(false);
  dp[0] = true;
  for (const weight of stones) {
      for (let j = m; j >= weight; --j) {
          dp[j] = dp[j] || dp[j - weight];
      }
  }
  for (let j = m;; --j) {
      if (dp[j]) {
          return sum - 2 * j;
      }
  }
};


// 879. 盈利计划 动态规划
/**
 * @param {number} n
 * @param {number} minProfit
 * @param {number[]} group
 * @param {number[]} profit
 * @return {number}
 */
 var profitableSchemes = function(n, minProfit, group, profit) {
  const dp = new Array(n + 1).fill(0).map(() => new Array(minProfit + 1).fill(0));
  for (let i = 0; i <= n; i++) {
      dp[i][0] = 1;
  }
  const len = group.length, MOD = 1e9 + 7;
  for (let i = 1; i <= len; i++) {
      const members = group[i - 1], earn = profit[i - 1];
      for (let j = n; j >= members; j--) {
          for (let k = minProfit; k >= 0; k--) {
              dp[j][k] = (dp[j][k] + dp[j - members][Math.max(0, k - earn)]) % MOD;
          }
      }
  }
  return dp[n][minProfit];
};


// 518. 零钱兑换 II  动态规划
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
 var change = function(amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const coin of coins) {
      for (let i = coin; i <= amount; i++) {
          dp[i] += dp[i - coin];
      }
  }
  return dp[amount];
};

// 279. 完全平方数 动态规划 
/**
 * @param {number} n
 * @return {number}
 */
 var numSquares = function(n) {
  const f = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
      let minn = Number.MAX_VALUE;
      for (let j = 1; j * j <= i; j++) {
          minn = Math.min(minn, f[i - j * j]);
      }
      f[i] = minn + 1;
  }
  return f[n];
};

// 852. 山脉数组的峰顶索引 遍历枚举

var peakIndexInMountainArray = function(arr) {
  const n = arr.length;
  let ans = -1;

  for (let i = 1; i < n - 1; ++i) {
      if (arr[i] > arr[i + 1]) {
          ans = i;
          break;
      }
  }
  return ans;
};


// 65. 有效数字 状态机
var isNumber = function(s) {
  const State = {
      STATE_INITIAL : "STATE_INITIAL",
      STATE_INT_SIGN : "STATE_INT_SIGN",
      STATE_INTEGER : "STATE_INTEGER",
      STATE_POINT : "STATE_POINT",
      STATE_POINT_WITHOUT_INT : "STATE_POINT_WITHOUT_INT",
      STATE_FRACTION : "STATE_FRACTION",
      STATE_EXP : "STATE_EXP",
      STATE_EXP_SIGN : "STATE_EXP_SIGN",
      STATE_EXP_NUMBER : "STATE_EXP_NUMBER",
      STATE_END : "STATE_END"
  }

  const CharType = {
      CHAR_NUMBER : "CHAR_NUMBER",
      CHAR_EXP : "CHAR_EXP",
      CHAR_POINT : "CHAR_POINT",
      CHAR_SIGN : "CHAR_SIGN",
      CHAR_ILLEGAL : "CHAR_ILLEGAL"
  }

  const toCharType = (ch) => {
      if (!isNaN(ch)) {
          return CharType.CHAR_NUMBER;
      } else if (ch.toLowerCase() === 'e') {
          return CharType.CHAR_EXP;
      } else if (ch === '.') {
          return CharType.CHAR_POINT;
      } else if (ch === '+' || ch === '-') {
          return CharType.CHAR_SIGN;
      } else {
          return CharType.CHAR_ILLEGAL;
      }
  }   

  const transfer = new Map();
  const initialMap = new Map();
  initialMap.set(CharType.CHAR_NUMBER, State.STATE_INTEGER);
  initialMap.set(CharType.CHAR_POINT, State.STATE_POINT_WITHOUT_INT);
  initialMap.set(CharType.CHAR_SIGN, State.STATE_INT_SIGN);
  transfer.set(State.STATE_INITIAL, initialMap);
  const intSignMap = new Map();
  intSignMap.set(CharType.CHAR_NUMBER, State.STATE_INTEGER);
  intSignMap.set(CharType.CHAR_POINT, State.STATE_POINT_WITHOUT_INT);
  transfer.set(State.STATE_INT_SIGN, intSignMap);
  const integerMap = new Map();
  integerMap.set(CharType.CHAR_NUMBER, State.STATE_INTEGER);
  integerMap.set(CharType.CHAR_EXP, State.STATE_EXP);
  integerMap.set(CharType.CHAR_POINT, State.STATE_POINT);
  transfer.set(State.STATE_INTEGER, integerMap);
  const pointMap = new Map() 
  pointMap.set(CharType.CHAR_NUMBER, State.STATE_FRACTION);
  pointMap.set(CharType.CHAR_EXP, State.STATE_EXP);
  transfer.set(State.STATE_POINT, pointMap);
  const pointWithoutIntMap = new Map();
  pointWithoutIntMap.set(CharType.CHAR_NUMBER, State.STATE_FRACTION);
  transfer.set(State.STATE_POINT_WITHOUT_INT, pointWithoutIntMap);
  const fractionMap = new Map();
  fractionMap.set(CharType.CHAR_NUMBER, State.STATE_FRACTION);
  fractionMap.set(CharType.CHAR_EXP, State.STATE_EXP);
  transfer.set(State.STATE_FRACTION, fractionMap);
  const expMap = new Map(); 
  expMap.set(CharType.CHAR_NUMBER, State.STATE_EXP_NUMBER);
  expMap.set(CharType.CHAR_SIGN, State.STATE_EXP_SIGN);
  transfer.set(State.STATE_EXP, expMap);
  const expSignMap = new Map();
  expSignMap.set(CharType.CHAR_NUMBER, State.STATE_EXP_NUMBER);
  transfer.set(State.STATE_EXP_SIGN, expSignMap);
  const expNumberMap = new Map();
  expNumberMap.set(CharType.CHAR_NUMBER, State.STATE_EXP_NUMBER);
  transfer.set(State.STATE_EXP_NUMBER, expNumberMap);

  const length = s.length;
  let state = State.STATE_INITIAL;

  for (let i = 0; i < length; i++) {
      const type = toCharType(s[i]);
      if (!transfer.get(state).has(type)) {
          return false;
      } else {
          state = transfer.get(state).get(type);
      }
  }
  return state === State.STATE_INTEGER || state === State.STATE_POINT || state === State.STATE_FRACTION || state === State.STATE_EXP_NUMBER || state === State.STATE_END;
};


// 877. 石子游戏 先手必胜
/**
 * @param {number[]} piles
 * @return {boolean}
 */
 var stoneGame = function(piles) {
  return true;
};

// 483. 最小好进制  数学题
/**
 * @param {string} n
 * @return {string}
 */
 var smallestGoodBase = function(n) {
  const nVal = parseInt(n);
  const mMax = Math.floor(Math.log(nVal) / Math.log(2));
  for (let m = mMax; m > 1; m--) {
      const k = BigInt(Math.floor(Math.pow(nVal, 1.0 / m)));
      if (k > 1) {
          let mul = BigInt(1), sum = BigInt(1);
          for (let i = 1; i <= m; i++) {
              mul *= k;
              sum += mul;
          }
          if (sum === BigInt(n)) {
              return k + '';
          }
      }
  }
  return (BigInt(n) - BigInt(1)) + '';
};

// 1239. 串联字符串的最大长度 位运算+回溯
/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function(arr) {
    let ans = 0;
    const masks = [];
    for (const s of arr) {
        let mask = 0;
        for (let i = 0; i < s.length; ++i) {
            const ch = s[i].charCodeAt() - 'a'.charCodeAt();
            if (((mask >> ch) & 1) !== 0) { // 若 mask 已有 ch，则说明 s 含有重复字母，无法构成可行解
                mask = 0;
                break;
            }
            mask |= 1 << ch; // 将 ch 加入 mask 中
        }
        if (mask > 0) {
            masks.push(mask);
        }
    }

    const backtrack = (masks, pos, mask) => {
        if (pos === masks.length) {
            ans = Math.max(ans, mask.toString(2).split('0').join('').length);
            return;
        }
        if ((mask & masks[pos]) === 0) { // mask 和 masks[pos] 无公共元素
            backtrack(masks, pos + 1, mask | masks[pos]);
        }
        backtrack(masks, pos + 1, mask);
    }

    backtrack(masks, 0, 0);
    return ans;
};

// 401. 二进制手表 遍历
/**
 * @param {number} turnedOn
 * @return {string[]}
 */
 var readBinaryWatch = function(turnedOn) {
  const ans = [];
  for (let h = 0; h < 12; ++h) {
      for (let m = 0; m < 60; ++m) {
          if (h.toString(2).split('0').join('').length + m.toString(2).split('0').join('').length === turnedOn) {
              ans.push(h + ":" + (m < 10 ? "0" : "") + m);
          }
      }
  }
  return ans;
};

// 剑指 Offer 38. 字符串的排列 先排列，再回溯计算
/**
 * @param {string} s
 * @return {string[]}
 */
 var permutation = function(s) {
  const rec = [], vis = [];
  const n = s.length;
  const arr = Array.from(s).sort();
  const perm = [];
  const backtrack = (arr, i, n, perm) => {
      if (i === n) {
          rec.push(perm.toString());
          return;
      }
      for (let j = 0; j < n; j++) {
          if (vis[j] || (j > 0 && !vis[j - 1] && arr[j - 1] === arr[j])) {
              continue;
          }
          vis[j] = true;
          perm.push(arr[j]);
          backtrack(arr, i + 1, n, perm);
          perm.pop();
          vis[j] = false;
      }
  }

  backtrack(arr, 0, n, perm);
  const size = rec.length;
  const recArr = new Array(size).fill(0);
  for (let i = 0; i < size; i++) {
      recArr[i] = rec[i].split(',').join('');
  }
  return recArr;
};

// 剑指 Offer 15. 二进制中1的个数 基础题
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
 var hammingWeight = function(n) {
  let ret = 0;
  while (n) {
      n &= n - 1;
      ret++;
  }
  return ret;
};

// 149. 直线上最多的点数  算斜率 Map存储
/**
 * @param {number[][]} points
 * @return {number}
 */
 var maxPoints = function(points) {
  const n = points.length;
  if (n <= 2) {
      return n;
  }
  let ret = 0;
  for (let i = 0; i < n; i++) {
      if (ret >= n - i || ret > n / 2) {
          break;
      }
      const map = new Map();
      for (let j = i + 1; j < n; j++) {
          let x = points[i][0] - points[j][0];
          let y = points[i][1] - points[j][1];
          if (x === 0) {
              y = 1;
          } else if (y === 0) {
              x = 1;
          } else {
              if (y < 0) {
                  x = -x;
                  y = -y;
              }
              const gcdXY = gcd(Math.abs(x), Math.abs(y));
              x /= gcdXY;
              y /= gcdXY;
          }
          const key = y + x * 20001;
          map.set(key, (map.get(key) || 0)+ 1);
      }
      let maxn = 0;
      for (const num of map.values()) {
          maxn = Math.max(maxn, num + 1);
      }
      ret = Math.max(ret, maxn);
  }
  return ret;


  function gcd(a, b){
    return b != 0 ? gcd(b, a % b) : a;
  }

};

// 752. 打开转盘锁 广度优先搜索 
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
 var openLock = function(deadends, target) {
  if (target === '0000') {
      return 0;
  }

  const dead = new Set(deadends);
  if (dead.has("0000")) {
      return -1;
  }

  let step = 0;
  const queue = [];
  queue.push("0000");
  const seen = new Set();
  seen.add("0000");

  while (queue.length) {
      ++step;
      const size = queue.length;
      for (let i = 0; i < size; ++i) {
          const status = queue.shift();
          for (const nextStatus of get(status)) {
              if (!seen.has(nextStatus) && !dead.has(nextStatus)) {
                  if (nextStatus === target) {
                      return step;
                  }
                  queue.push(nextStatus);
                  seen.add(nextStatus);
              }
          }
      }
  }

  return -1;

  function numPrev(x) {
    return x === '0' ? '9' : (parseInt(x) - 1) + '';
  }
  
  function numSucc (x) {
    return x === '9' ? '0' : (parseInt(x) + 1) + '';
  }
  
  // 枚举 status 通过一次旋转得到的数字
  function get(status) {
    const ret = [];
    const array = Array.from(status);
    for (let i = 0; i < 4; ++i) {
        const num = array[i];
        array[i] = numPrev(num);
        ret.push(array.join(''));
        array[i] = numSucc(num);
        ret.push(array.join(''));
        array[i] = num;
    }
  
    return ret;
  }
};

// 909. 蛇梯棋 广度优先搜索
var snakesAndLadders = function(board) {
  const n = board.length;
  const vis = new Array(n * n + 1).fill(0);
  const queue = [[1, 0]];
  while (queue.length) {
      const p = queue.shift();
      for (let i = 1; i <= 6; ++i) {
          let nxt = p[0] + i;
          if (nxt > n * n) { // 超出边界
              break;
          }
          const rc = id2rc(nxt, n); // 得到下一步的行列
          if (board[rc[0]][rc[1]] > 0) { // 存在蛇或梯子
              nxt = board[rc[0]][rc[1]];
          }
          if (nxt === n * n) { // 到达终点
              return p[1] + 1;
          }
          if (!vis[nxt]) {
              vis[nxt] = true;
              queue.push([nxt, p[1] + 1]); // 扩展新状态
          }
      }
  }
  return -1;

  function id2rc(id, n) {
    let r = Math.floor((id - 1) / n), c = (id - 1) % n;
    if (r % 2 === 1) {
        c = n - 1 - c;
    }
    return [n - 1 - r, c];
  }
};


// 168. Excel表列名称 基础题
/**
 * @param {number} columnNumber
 * @return {string}
 */
 var convertToTitle = function(columnNumber) {
  const sb = [];
  while (columnNumber !== 0) {
      columnNumber--;
      sb.push(String.fromCharCode(columnNumber % 26 + 'A'.charCodeAt()));
      columnNumber = Math.floor(columnNumber / 26);
  }
  return sb.reverse().join('');
};

// 剑指 Offer 37. 序列化二叉树  基础逻辑

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    return rserialize(root, '');
};

var deserialize = function(data) {
    const dataArray = data.split(",");
    return rdeserialize(dataArray);
};

const rserialize = (root, str) => {
    if (root === null) {
        str += "None,";
    } else {
        str += root.val + '' + ",";
        str = rserialize(root.left, str);
        str = rserialize(root.right, str);
    }
    return str;
}

const rdeserialize = (dataList) => {
    if (dataList[0] === "None") {
        dataList.shift();
        return null;
    }

    const root = new TreeNode(parseInt(dataList[0]));
    dataList.shift();
    root.left = rdeserialize(dataList);
    root.right = rdeserialize(dataList);

    return root;
}
 
// LCP 07. 传递信息 动态规划

/**
 * @param {number} n
 * @param {number[][]} relation
 * @param {number} k
 * @return {number}
 */
 var numWays3 = function(n, relation, k) {
  let dp = new Array(n).fill(0);
  dp[0] = 1;
  for (let i = 0; i < k; i++) {
      const next = new Array(n).fill(0);
      for (const [src, dst] of relation) {
          next[dst] += dp[src];
      }
      dp = next;
  }
  return dp[n - 1];
};

// 1833. 雪糕的最大数量  排序
/**
 * @param {number[]} costs
 * @param {number} coins
 * @return {number}
 */
 var maxIceCream = function(costs, coins) {
  costs.sort((a, b) => a - b);
  let count = 0;
  const n = costs.length;
  for (let i = 0; i < n; i++) {
      const cost = costs[i];
      if (coins >= cost) {
          coins -= cost;
          count++;
      } else {
          break;
      }
  }
  return count;
};

// 451. 根据字符出现频率排序
/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
    const map = new Map();
    const length = s.length;
    for (let i = 0; i < length; i++) {
        const c = s[i];
        const frequency = (map.get(c) || 0) + 1;
        map.set(c, frequency);
    }
    const list = [...map.keys()];
    list.sort((a, b) => map.get(b) - map.get(a));
    const sb = [];
    const size = list.length;
    for (let i = 0; i < size; i++) {
        const c = list[i];
        const frequency = map.get(c);
        for (let j = 0; j < frequency; j++) {
            sb.push(c);
        }
    }
    return sb.join('');
};

// 645. 错误的集合 map
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function(nums) {
    const errorNums = new Array(2).fill(0);
    const n = nums.length;
    const map = new Map();
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    for (let i = 1; i <= n; i++) {
        const count = map.get(i) || 0;
        if (count === 2) {
            errorNums[0] = i;
        } else if (count === 0) {
            errorNums[1] = i;
        }
    }
    return errorNums;
};

// 726. 原子的数量 栈
/**
 * @param {string} formula
 * @return {string}
 */
var countOfAtoms = function(formula) {
    let i = 0;
    const n = formula.length;

    const stack = [new Map()];
    while (i < n) {
        const ch = formula[i];

        const parseAtom = () => {
            const sb = [];
            sb.push(formula[i++]); // 扫描首字母
            while (i < n && formula[i] >= 'a' && formula[i] <= 'z') {
                sb.push(formula[i++]); // 扫描首字母后的小写字母
            }
            return sb.join('');
        }

        const parseNum = () => {
            if (i === n || isNaN(Number(formula[i]))) {
                return 1; // 不是数字，视作 1
            }
            let num = 0;
            while (i < n && !isNaN(Number(formula[i]))) {
                num = num * 10 + formula[i++].charCodeAt() - '0'.charCodeAt(); // 扫描数字
            }
            return num;
        }

        if (ch === '(') {
            i++;
            stack.unshift(new Map()); // 将一个空的哈希表压入栈中，准备统计括号内的原子数量
        } else if (ch === ')') {
            i++;
            const num = parseNum(); // 括号右侧数字
            const popMap = stack.shift(); // 弹出括号内的原子数量
            const topMap = stack[0];
            for (const [atom, v] of popMap.entries()) {
                topMap.set(atom, (topMap.get(atom) || 0) + v * num); // 将括号内的原子数量乘上 num，加到上一层的原子数量中
            }
        } else {
            const atom = parseAtom();
            const num = parseNum();
            const topMap = stack[0];
            topMap.set(atom, (topMap.get(atom) || 0) + num); // 统计原子数量
            
        }
    }

    let map = stack.pop();
    map = Array.from(map);
    map.sort();
    const sb = [];
    for (const [atom, count] of map) {
        sb.push(atom);
        if (count > 1) {
            sb.push(count);
        }
    }
    return sb.join('');
};

// 1418. 点菜展示表 map
/**
 * @param {string[][]} orders
 * @return {string[][]}
 */
var displayTable = function(orders) {
  // 从订单中获取餐品名称和桌号，统计每桌点餐数量
  const nameSet = new Set();
  const foodsCnt = new Map();
  for (const order of orders) {
      nameSet.add(order[2]);
      const id = parseInt(order[1]);
      const map = foodsCnt.get(id) || new Map();
      map.set(order[2], (map.get(order[2]) || 0) + 1);
      foodsCnt.set(id, map);
  }

  // 提取餐品名称，并按字母顺序排列
  const n = nameSet.size;
  const names = [];
  for (const name of nameSet) {
      names.push(name);
  }
  names.sort();

  // 提取桌号，并按餐桌桌号升序排列
  const m = foodsCnt.size;
  const ids = [];
  for (const id of foodsCnt.keys()) {
      ids.push(id);
  }
  ids.sort((a, b) => a - b);

  // 填写点菜展示表
  const table = [];
  const header = [];
  header.push("Table");
  for (const name of names) {
      header.push(name);
  }
  table.push(header);
  for (let i = 0; i < m; ++i) {
      const id = ids[i];
      const cnt = foodsCnt.get(id);
      const row = [];
      row.push(id.toString());
      for (let j = 0; j < n; ++j) {
          row.push((cnt.get(names[j]) || 0).toString());
      }
      table.push(row);
  }
  return table;
};

// 1711. 大餐计数 map
/**
 * @param {number[]} deliciousness
 * @return {number}
 */
 var countPairs = function(deliciousness) {
  const MOD = 1000000007;
  let maxVal = 0;
  for (const val of deliciousness) {
      maxVal = Math.max(maxVal, val);
  }
  const maxSum = maxVal * 2;
  let pairs = 0;
  const map = new Map();
  const n = deliciousness.length;
  for (let i = 0; i < n; i++) {
      const val = deliciousness[i];
      for (let sum = 1; sum <= maxSum; sum <<= 1) {
          const count = map.get(sum - val) || 0;
          pairs = (pairs + count) % MOD;
      }
      map.set(val, (map.get(val) || 0) + 1);
  }
  return pairs;
};

// 930. 和相同的二元子数组 map 前缀树
/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
 var numSubarraysWithSum = function(nums, goal) {
   let backup = new Map()
   let sum = 0,ret = 0
   for (let i = 0; i < nums.length; i++) {
     backup.set(sum,(backup.get(sum)|| 0) +1)
     sum += nums[i]
     ret += (backup.get(sum - goal) || 0)
   }
   return ret;

};

// 面试题 17.10. 主要元素 Boyer-Moore投票算法
/**
 * @param {number[]} nums
 * @return {number}
 */
 var majorityElement = function(nums) {
  let candidate = -1;
  let count = 0;
  for (const num of nums) {
      if (count === 0) {
          candidate = num;
      }
      if (num === candidate) {
          count++;
      } else {
          count--;
      }
  }
  count = 0;
  const length = nums.length;
  for (const num of nums) {
      if (num === candidate) {
          count++;
      }
  }
  return count * 2 > length ? candidate : -1;
};

// 275. H 指数 II 二分查找
/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function(citations) {
  let n = citations.length;
  let left = 0, right = n - 1;
  while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (citations[mid] >= n - mid) {
          right = mid - 1;
      } else {
          left = mid + 1;
      }
  }
  return n - left;
};

// 274. H 指数 排序
/**
 * @param {number[]} citations
 * @return {number}
 */

var hIndex = function(citations) {
    citations.sort((a, b) => a - b);
    let h = 0, i = citations.length - 1; 
    while (i >= 0 && citations[i] > h) {
        h++; 
        i--;
    }
    return h;
};


// 218. 天际线问题 扫描线 
/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
 const arrSort=(arr)=>arr.sort((a,b)=>a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]); 

 const remove =(arr, tar)=>{ //删除选定的高度
   let idx = -1;
   arr.some((val,index)=>{if(val===tar){idx=index; return true}});
   arr.splice(idx, 1);
 };
 
 
 const getSkyline =(buildings)=>{
   let res = [], pq = [], pre = null;
   for(let b of buildings) {
       pq.push([b[0], -b[2]]); //左端点
       pq.push([b[1],  b[2]]);//右端点
   }
   arrSort(pq); //按照坐标大小进行排序
   let heights = [0]  //端点最低为0;
 
   for(let h of pq) {
       if(h[1] < 0) { heights.push(-h[1])} //加入左端点
       else {remove(heights, h[1]);}  // 删除右端点
       let maxHeight = Math.max(...heights);
       if(pre !== maxHeight) { 
         res.push([h[0], maxHeight]);
           pre = maxHeight;
       }
   }
   return res;
 };

 // 1818. 绝对差值和  二分查找
 var minAbsoluteSumDiff = function(nums1, nums2) {
  const MOD = 1000000007;
  const n = nums1.length;
  const rec = [...nums1];
  rec.sort((a, b) => a - b);
  let sum = 0, maxn = 0;
  for (let i = 0; i < n; i++) {
      const diff = Math.abs(nums1[i] - nums2[i]);
      sum = (sum + diff) % MOD;
      const j = binarySearch(rec, nums2[i]);
      if (j < n) {
          maxn = Math.max(maxn, diff - (rec[j] - nums2[i]));
      }
      if (j > 0) {
          maxn = Math.max(maxn, diff - (nums2[i] - rec[j - 1]));
      }
  }
  return (sum - maxn + MOD) % MOD;

  function binarySearch(rec, target) {
    let low = 0, high = rec.length - 1;
    if (rec[high] < target) {
        return high + 1;
    }
    while (low < high) {
        const mid = Math.floor((high - low) / 2) + low;
        if (rec[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
  }

};

// 1846. 减小和重新排列数组后的最大元素 排序
/**
 * @param {number[]} arr
 * @return {number}
 */
var maximumElementAfterDecrementingAndRearranging = function(arr) {
    const n = arr.length;
    arr.sort((a, b) => a - b);
    arr[0] = 1;
    for (let i = 1; i < n; ++i) {
        arr[i] = Math.min(arr[i], arr[i - 1] + 1);
    }
    return arr[n - 1];
};


// 剑指 Offer 53 - I. 在排序数组中查找数字 I 二分查找
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var search = function(nums, target) {
  let ans = 0;
  const leftIdx = binarySearch(nums, target, true);
  const rightIdx = binarySearch(nums, target, false) - 1;
  if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] === target && nums[rightIdx] === target) {
      ans = rightIdx - leftIdx + 1;
  } 
  return ans;
  function binarySearch(nums, target, lower) {
    let left = 0, right = nums.length - 1, ans = nums.length;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > target || (lower && nums[mid] >= target)) {
            right = mid - 1;
            ans = mid;
        } else {
            left = mid + 1;
        }
    }
    return ans;
  }

};

// 剑指 Offer 42. 连续子数组的最大和  动态规划
/**
 * @param {number[]} nums
 * @return {number}
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums) {
  let max = nums[0]
  for (let i = 1; i < nums.length; i++) {
      let num = nums[i]
      if(nums[i-1] > 0) {
          num += nums[i-1]
      }
      if(num > max) {
          max = num;
      }
      nums[i] = num
  }
  return max;
};

// 面试题 10.02. 变位词组 映射
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
 var groupAnagrams = function(strs) {
  let bp = new Map()
  for (let index = 0; index < strs.length; index++) {
      let str  = strs[index]
      let key = str.split('').sort(function(a,b){return b.localeCompare(a)}).join('')
      if(bp.get(key)) {
          bp.get(key).push(str)
      } else {
          bp.set(key,[str])
      }
  }
  let result = []
  for (let item of bp) {
      result.push(item[1])      
  }
  return result;
};

// 1838. 最高频元素的频数 排序 + 滑动窗口
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequency = function(nums, k) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let total = 0, res = 1, l = 0;

  for (let r = 1; r < n; r++) {
      total += (nums[r] - nums[r - 1]) * (r - l);
      while (total > k) {
          total -= nums[r] - nums[l];
          l += 1;
      }
      res = Math.max(res, r - l + 1);
  }
  return res;
};

// 1877. 数组中最大数对和的最小值 排序+贪心
/**
 * @param {number[]} nums
 * @return {number}
 */
 var minPairSum = function(nums) {
  const n = nums.length;
  let res = 0;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < Math.floor(n / 2); i++) {
      res = Math.max(res, nums[i] + nums[n - 1 - i]);
  }
  return res;
};

// 剑指 Offer 52. 两个链表的第一个公共节点 双指针
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
 var getIntersectionNode = function(headA, headB) {
  if (headA === null || headB === null) {
      return null;
  }
  let pA = headA, pB = headB;
  while (pA !== pB) {
      pA = pA === null ? headB : pA.next;
      pB = pB === null ? headA : pB.next;
  }
  return pA;
};


// 138. 复制带随机指针的链表  迭代 + 节点拆分
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
 var copyRandomList = function(head) {
  if (head === null) {
      return null;
  }
  for (let node = head; node !== null; node = node.next.next) {
      const nodeNew = new Node(node.val, node.next, null);
      node.next = nodeNew;
  }
  for (let node = head; node !== null; node = node.next.next) {
      const nodeNew = node.next;
      nodeNew.random = (node.random !== null) ? node.random.next : null;
  }
  const headNew = head.next;
  for (let node = head; node !== null; node = node.next) {
      const nodeNew = node.next;
      node.next = node.next.next;
      nodeNew.next = (nodeNew.next !== null) ? nodeNew.next.next : null;
  }
  return headNew;
};


// 1893. 检查是否区域内所有整数都被覆盖 差分数组
var isCovered = function(ranges, left, right) {
  const diff = new Array(52).fill(0); // 差分数组
  for (const [l, r] of ranges) {
      diff[l]++;
      diff[r + 1]--;
  }
  // 前缀和
  let curr = 0;
  for (let i = 1; i < 51; i++) {
      curr += diff[i];
      if (left <= i && i <= right && curr <= 0) {
          return false;
      }
  }
  return true;
};

// 1736. 替换隐藏数字得到的最晚时间  基础逻辑题
/**
 * @param {string} time
 * @return {string}
 */
 var maximumTime = function(time) {
  const arr = Array.from(time);
  if (arr[0] === '?') {
      arr[0] = ('4' <= arr[1] && arr[1] <= '9') ? '1' : '2';
  }
  if (arr[1] === '?') {
      arr[1] = (arr[0] == '2') ? '3' : '9';
  }
  if (arr[3] === '?') {
      arr[3] = '5';
  }
  if (arr[4] === '?') {
      arr[4] = '9';
  }
  return arr.join('');
};

// 1743. 从相邻元素对还原数组 哈希表
/**
 * @param {number[][]} adjacentPairs
 * @return {number[]}
 */
 var restoreArray = function(adjacentPairs) {
  const map = new Map();
  for (const adjacentPair of adjacentPairs) {
      map.get(adjacentPair[0]) ? map.get(adjacentPair[0]).push(adjacentPair[1]) : map.set(adjacentPair[0], [adjacentPair[1]]);
      map.get(adjacentPair[1]) ? map.get(adjacentPair[1]).push(adjacentPair[0]) : map.set(adjacentPair[1], [adjacentPair[0]]);
  }

  const n = adjacentPairs.length + 1;
  const ret = new Array(n).fill(0);
  for (const [e, adj] of map.entries()) {
      if (adj.length === 1) {
          ret[0] = e;
          break;
      }
  }

  ret[1] = map.get(ret[0])[0];
  for (let i = 2; i < n; i++) {
      const adj = map.get(ret[i - 1]);
      ret[i] = ret[i - 2] == adj[0] ? adj[1] : adj[0];
  }
  return ret;
};

// 1713. 得到子序列的最少操作次数 转化问题 变成 获取最长的递增序列
var minOperations = function(target, arr) {
  const n = target.length;
  const pos = new Map();
  for (let i = 0; i < n; ++i) {
      pos.set(target[i], i);
  }
  const d = [];
  for (const val of arr) {
      if (pos.has(val)) {
          const idx = pos.get(val);
          const it = binarySearch(d, idx);
          if (it !== d.length) {
              d[it] = idx;
          } else {
              d.push(idx);
          }
      }
  }
  return n - d.length;

  function binarySearch(d, target)  {
    const size = d.length;
    if (size === 0 || d[size - 1] < target) {
        return size;
    }
    let low = 0, high = size - 1;
    while (low < high) {
        const mid = Math.floor((high - low) / 2) + low;
        if (d[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
  }
};

// 671. 二叉树中第二小的节点  遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var findSecondMinimumValue = function(root) {
   let ans = -1;
   const rootValue = root.val
   dfs(root);
   return ans;

   function dfs(node) {
     if(node == null) {
       return null
     }
     if(ans !== -1 && node.val >= ans) {
       return;
     }
     if(node.val > rootValue) {
       ans = node.val
     }
     dfs(node.left)
     dfs(node.right)
   }

};

// 863. 二叉树中所有距离为 K 的结点  深度优先搜索 + 哈希表
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
 var distanceK = function(root, target, k) {
  const parents = new Map();
  const ans = [];

  const findParents = (node) => {
      if (node.left != null) {
          parents.set(node.left.val, node);
          findParents(node.left);
      }
      if (node.right != null) {
          parents.set(node.right.val, node);
          findParents(node.right);
      }
  }

  // 从 root 出发 DFS，记录每个结点的父结点
  findParents(root);

  const findAns = (node, from, depth, k) => {
      if (node == null) {
          return;
      }
      if (depth === k) {
          ans.push(node.val);
          return;
      }
      if (node.left !== from) {
          findAns(node.left, node, depth + 1, k);
      }
      if (node.right !== from) {
          findAns(node.right, node, depth + 1, k);
      }
      if (parents.get(node.val) !== from) {
          findAns(parents.get(node.val), node, depth + 1, k);
      }
  }
  // 从 target 出发 DFS，寻找所有深度为 k 的结点
  findAns(target, null, 0, k);

  return ans;
};

// 1104. 二叉树寻路 先考虑顺序排列，在对单数排做特殊处理
/**
 * @param {number} label
 * @return {number[]}
 */
 var pathInZigZagTree = function(label) {
  let result = [];
  while(label > 0) {
      result.unshift(label);
      label = Math.floor(label/2);
  }
  let flg = result.length%2;
  let base = 2;
  for (let index = 1; index < result.length; index++) {
      if(flg == index%2) {
          result[index] = base*3 - 1 - result[index];
      }
      base = base*2;
  }
  return result;
};

// 171. Excel 表列序号 基础逻辑题
/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function(columnTitle) {
  let number = 0;
  let multiple = 1;
  for (let i = columnTitle.length - 1; i >= 0; i--) {
      const k = columnTitle[i].charCodeAt() - 'A'.charCodeAt() + 1;
      number += k * multiple;
      multiple *= 26;
  }
  return number;
};

// 987. 二叉树的垂序遍历 映射 排序
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var verticalTraversal = function(root) {
  const nodes = [];
  dfs(root, 0, 0, nodes);
  nodes.sort((tuple1, tuple2) => {
      if (tuple1[0] !== tuple2[0]) {
          return tuple1[0] - tuple2[0];
      } else if (tuple1[1] !== tuple2[1]) {
          return tuple1[1] - tuple2[1];
      } else {
          return tuple1[2] - tuple2[2];
      }
  });

  const ans = [];
  let lastcol = -Number.MAX_VALUE;
  for (const tuple of nodes) {
      let col = tuple[0], row = tuple[1], value = tuple[2];
      if (col !== lastcol) {
          lastcol = col;
          ans.push([]);
      }
      ans[ans.length - 1].push(value);
  }
  return ans;


  function dfs(node, row, col, nodes) {
    if (node === null) {
        return;
    }
    nodes.push([col, row, node.val]);
    dfs(node.left, row + 1, col - 1, nodes);
    dfs(node.right, row + 1, col + 1, nodes);
  }
}

// 1337. 矩阵中战斗力最弱的 K 行
/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[]}
 */
var kWeakestRows = function (mat, k) {
  const map = new Map();
  mat.forEach((a, i) => map.set(a, i));
  mat.sort();
  return Array.from({ length: k }, (_, i) => map.get(mat[i]));
};

// 743. 网络延迟时间 Dijkstra 算法 没次取最近的点计算
/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
 var networkDelayTime = function(times, n, k) {
  const INF = Number.MAX_SAFE_INTEGER;
  const g = new Array(n).fill(INF).map(() => new Array(n).fill(INF));
  for (const t of times) {
      const x = t[0] - 1, y = t[1] - 1;
      g[x][y] = t[2];
  }

  const dist = new Array(n).fill(INF);
  dist[k - 1] = 0;
  const used = new Array(n).fill(false);
  for (let i = 0; i < n; ++i) {
      let x = -1;
      for (let y = 0; y < n; ++y) {
          if (!used[y] && (x === -1 || dist[y] < dist[x])) {
              x = y;
          }
      }
      used[x] = true;
      for (let y = 0; y < n; ++y) {
          dist[y] = Math.min(dist[y], dist[x] + g[x][y]);
      }
  }

  let ans = Math.max(...dist);
  return ans === INF ? -1 : ans;
};

// 581. 最短无序连续子数组 一次遍历
/**
 * @param {number[]} nums
 * @return {number}
 */
 var findUnsortedSubarray = function(nums) {
  const n = nums.length;
  let maxn = -Number.MAX_VALUE, right = -1;
  let minn = Number.MAX_VALUE, left = -1;
  for (let i = 0; i < n; i++) {
      if (maxn > nums[i]) {
          right = i;
      } else {
          maxn = nums[i];
      }
      if (minn < nums[n - i - 1]) {
          left = n - i - 1;
      } else {
          minn = nums[n - i - 1];
      }
  }
  return right === -1 ? 0 : right - left + 1;
};


// 611. 有效三角形的个数 双指针
/**
 * @param {number[]} nums
 * @return {number}
 */
 var triangleNumber = function(nums) {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  let ans = 0;
  for (let i = 0; i < n; ++i) {
      let k = i;
      for (let j = i + 1; j < n; ++j) {
          while (k + 1 < n && nums[k + 1] < nums[i] + nums[j]) {
              ++k;
          }
          ans += Math.max(k - j, 0);
      }
  }
  return ans;
};

//  802. 找到最终的安全状态 深度优先搜索 + 三色标记法
/**
 * @param {number[][]} graph
 * @return {number[]}
 */
 var eventualSafeNodes = function(graph) {
  const n = graph.length;
  const color = new Array(n).fill(0);
  const ans = [];
  for (let i = 0; i < n; ++i) {
      if (safe(graph, color, i)) {
          ans.push(i);
      }
  }
  return ans;


  function safe(graph, color, x) {
    if (color[x] > 0) {
        return color[x] === 2;
    }
    color[x] = 1;
    for (const y of graph[x]) {
        if (!safe(graph, color, y)) {
            return false;
        }
    }
    color[x] = 2;
    return true;
  }
};

// 面试题 16.14. 最佳直线 数学题
/**
 * @param {number[][]} points
 * @return {number[]}
 */
var bestLine = function (points) {
    var max=0;
    var res=[];
    var l=points.length;
    for(var i=0; i<l; i++){
        for(var j=i+1; j<l; j++){
            var count=2;
            for(var k=j+1; k<l; k++){
                if(
                        (points[j][0]-points[i][0])*(points[k][1]-points[j][1])==
                        (points[j][1]-points[i][1])*(points[k][0]-points[j][0])                    
                    ){
                        count++;
                }
            }
            if(count>max){
                max=count;
                res=[i,j];
            }
        }
    }
    return res;
}

// 457. 环形数组是否存在循环 双指针
/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var circularArrayLoop = function(nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
      if (nums[i] === 0) {
          continue;
      }
      let slow = i, fast = next(nums, i);
      // 判断非零且方向相同
      while (nums[slow] * nums[fast] > 0 && nums[slow] * nums[next(nums, fast)] > 0) {
          if (slow === fast) {
              if (slow !== next(nums, slow)) {
                  return true;
              } else {
                  break;
              }
          }
          slow = next(nums, slow);
          fast = next(nums, next(nums, fast));
      }
      let add = i;
      while (nums[add] * nums[next(nums, add)] > 0) {
          const tmp = add;
          add = next(nums, add);
          nums[tmp] = 0;
      }
  }
  return false;

  function next (nums, cur) {
    const n = nums.length;
    return ((cur + nums[cur]) % n + n) % n; // 保证返回值在 [0,n) 中
  }
}


// 1137. 第 N 个泰波那契数 动态规划
/**
 * @param {number} n
 * @return {number}
 */
 var tribonacci = function(n) {
  if (n === 0) {
      return 0;
  }
  if (n <= 2) {
      return 1;
  }
  let p = 0, q = 0, r = 1, s = 1;
  for (let i = 3; i <= n; ++i) {
      p = q;
      q = r;
      r = s;
      s = p + q + r;
  }
  return s;
};

// 313. 超级丑数 动态规划
/**
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 */
 var nthSuperUglyNumber = function(n, primes) {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  const m = primes.length;
  const pointers = new Array(m).fill(1);
  for (let i = 2; i <= n; i++) {
      const nums = new Array(m).fill(m);
      let minNum = Number.MAX_SAFE_INTEGER;
      for (let j = 0; j < m; j++) {
          nums[j] = dp[pointers[j]] * primes[j];
          minNum = Math.min(minNum, nums[j]);
      }
      dp[i] = minNum;
      for (let j = 0; j < m; j++) {
          if (minNum == nums[j]) {
              pointers[j]++;
          }
      }
  }
  return dp[n];
};

// 413. 等差数列划分 基础题
/**
 * @param {number[]} nums
 * @return {number}
 */
 var numberOfArithmeticSlices = function(nums) {
   let len = nums.length 
   if(len < 3) {
     return 0
   }
   let res = 0,count =0
   for (let i = 2; i < len; i++) {
     if(nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
       count++
       res += count
     } else {
       count = 0
     }
   }
   return res
};

// 446. 等差数列划分 II - 子序列 等差数列
/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfArithmeticSlices = function(nums) {
  let ans = 0;
  const n = nums.length;
  const f = new Map();
  for (let i = 0; i < n; ++i) {
      f[i] = new Map();
  }
  for (let i = 0; i < n; ++i) {
      for (let j = 0; j < i; ++j) {
          const d = nums[i] - nums[j];
          const cnt = f[j].get(d) || 0;
          ans += cnt;
          f[i].set(d, (f[i].get(d) || 0) + cnt + 1);
      }
  }
  return ans;
};

// 516. 最长回文子序列  动态规划
/**
 * @param {string} s
 * @return {number}
 */
 var longestPalindromeSubseq = function(s) {
  const n = s.length;
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
      dp[i][i] = 1;
      const c1 = s[i];
      for (let j = i + 1; j < n; j++) {
          const c2 = s[j];
          if (c1 === c2) {
              dp[i][j] = dp[i + 1][j - 1] + 2;
          } else {
              dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
          }
      }
  }
  return dp[0][n - 1];
};

// 233. 数字 1 的个数  每个位数分别计算
/**
 * @param {number} n
 * @return {number}
 */
 var countDigitOne = function(n) {
  // mulk 表示 10^k
  // 在下面的代码中，可以发现 k 并没有被直接使用到（都是使用 10^k）
  // 但为了让代码看起来更加直观，这里保留了 k
  let mulk = 1;
  let ans = 0;
  for (let k = 0; n >= mulk; ++k) {
      ans += (Math.floor(n / (mulk * 10))) * mulk + Math.min(Math.max(n % (mulk * 10) - mulk + 1, 0), mulk);
      mulk *= 10;
  }
  return ans;
};


// 412. Fizz Buzz 基础题
/**
 * @param {number} n
 * @return {string[]}
 */
 var fizzBuzz = function(n) {
  const answer = [];
  for (let i = 1; i <= n; i++) {
      const sb = [];
      if (i % 3 === 0) {
          sb.push("Fizz");
      }
      if (i % 5 === 0) {
          sb.push("Buzz");
      }
      if (sb.length === 0) {
          sb.push(i);
      }
      answer.push(sb.join(''));
  }
  return answer;
};

// 剑指 Offer II 069. 山峰数组的顶部 基础题
/**
 * @param {number[]} arr
 * @return {number}
 */
 var peakIndexInMountainArray = function(arr) {
  const n = arr.length;
  let ans = -1;

  for (let i = 1; i < n - 1; ++i) {
      if (arr[i] > arr[i + 1]) {
          ans = i;
          break;
      }
  }
  return ans;
};

// 476. 数字的补数 位运算
/**
 * @param {number} num
 * @return {number}
 */
 var findComplement = function(num) {
  // 计算num二进制数的长度
const len = num.toString(2).length;
// 构造长度为len、全为1的字符串
const str = new Array(len).fill(1).join('');
// 转化为二进制数
const N = parseInt(str, 2);
return N ^ num;

};

// 211. 添加与搜索单词 - 数据结构设计 字典数
var WordDictionary = function() {
  this.trieRoot = new TrieNode();
};

WordDictionary.prototype.addWord = function(word) {
  this.trieRoot.insert(word);
};

WordDictionary.prototype.search = function(word) {
  const dfs = (index, node) => {
      if (index === word.length) {
          return node.isEnd;
      }
      const ch = word[index];
      if (ch !== '.') {
          const child = node.children[ch.charCodeAt() - 'a'.charCodeAt()]
          if (child && dfs(index + 1, child)) {
              return true;
          }
      } else {
          for (const child of node.children) {
              if (child && dfs(index + 1, child)) {
                  return true;
              }
          }
      }
      return false;
  }
  
  return dfs(0, this.trieRoot);
};

class TrieNode {
  constructor() {
      this.children = new Array(26).fill(0);
      this.isEnd = false;
  }

  insert(word) {
      let node = this;
      for (let i = 0; i < word.length; i++) {
          const ch = word[i];
          const index = ch.charCodeAt() - 'a'.charCodeAt();
          if (node.children[index] === 0) {
              node.children[index] = new TrieNode();
          }
          node = node.children[index];
      }
      node.isEnd = true;
  }

  getChildren() {
      return this.children;
  }

  isEnd() {
      return this.isEnd;
  }
}

// 453. 最小操作次数使数组元素相等  n-1个加就是一个减  基础题
/**
 * @param {number[]} nums
 * @return {number}
 */
 var minMoves = function(nums) {
  const minNum = Math.min(...nums);
  let res = 0;
  for (const num of nums) {
      res += num - minNum;
  }
  return res;
};

// 66. 加一 基础题
/**
 * @param {number[]} digits
 * @return {number[]}
 */
 var plusOne = function(digits) {
  const n = digits.length;
  for (let i = n - 1; i >= 0; --i) {
      if (digits[i] !== 9) {
          ++digits[i];
          for (let j = i + 1; j < n; ++j) {
              digits[j] = 0;
          }
          return digits;
      }
  }

  // digits 中所有的元素均为 9
  const ans = new Array(n + 1).fill(0);
  ans[0] = 1;
  return ans;
};


// 229. 求众数 II 摩尔投票法
/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var majorityElement = function(nums) {
  let element1 = 0;
  let element2 = 0;
  let vote1 = 0;
  let vote2 = 0;

  for (const num of nums) {
      if (vote1 > 0 && num === element1) { //如果该元素为第一个元素，则计数加1
          vote1++;
      } else if (vote2 > 0 && num === element2) { //如果该元素为第二个元素，则计数加1
          vote2++;
      } else if (vote1 === 0) { // 选择第一个元素
          element1 = num;
          vote1++;
      } else if (vote2 === 0) { // 选择第二个元素
          element2 = num;
          vote2++;
      } else { //如果三个元素均不相同，则相互抵消1次
          vote1--;
          vote2--;
      }
  }

  let cnt1 = 0;
  let cnt2 = 0;
  for (const num of nums) {
      if (vote1 > 0 && num === element1) {
          cnt1++;
      }
      if (vote2 > 0 && num === element2) {
          cnt2++;
      }
  }
  // 检测元素出现的次数是否满足要求
  const ans = [];
  if (vote1 > 0 && cnt1 > Math.floor(nums.length / 3)) {
      ans.push(element1);
  }
  if (vote2 > 0 && cnt2 > Math.floor(nums.length / 3)) {
      ans.push(element2);
  }

  return ans;
};

// 492. 构造矩形 基础数学题
/**
 * @param {number} area
 * @return {number[]}
 */
 var constructRectangle = function(area) {
  let w = Math.floor(Math.sqrt(area));
  while (area % w !== 0) {
      --w;
  }
  return [Math.floor(area / w), w];
};

// 240. 搜索二维矩阵 II  z字查找法
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
 var searchMatrix = function(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let x = 0, y = n - 1;
  while (x < m && y >= 0) {
      if (matrix[x][y] === target) {
          return true;
      }
      if (matrix[x][y] > target) {
          --y;
      } else {
          ++x;
      }
  }
  return false;
};

//  496. 下一个更大元素 I 单调栈
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
 var nextGreaterElement = function(nums1, nums2) {
  const map = new Map();
  const stack = [];
  for (let i = nums2.length - 1; i >= 0; --i) {
      const num = nums2[i];
      while (stack.length && num >= stack[stack.length - 1]) {
          stack.pop();
      }
      map.set(num, stack.length ? stack[stack.length - 1] : -1);
      stack.push(num);
  }
  const res = new Array(nums1.length).fill(0).map((_, i) => map.get(nums1[i]));
  return res;
};

//  638. 大礼包 递归遍历
/**
 * @param {number[]} price
 * @param {number[][]} special
 * @param {number[]} needs
 * @return {number}
 */
 var shoppingOffers = function(price, special, needs) {
  const memo = new Map();

  // 记忆化搜索计算满足购物清单所需花费的最低价格 
  const dfs = (price, special, curNeeds, filterSpecial, n) => {
      if (!memo.has(curNeeds)) {
          let minPrice = 0;
          for (let i = 0; i < n; ++i) {
              minPrice += curNeeds[i] * price[i]; // 不购买任何大礼包，原价购买购物清单中的所有物品
          }
          for (const curSpecial of filterSpecial) {
              const specialPrice = curSpecial[n];
              const nxtNeeds = [];
              for (let i = 0; i < n; ++i) {
                  if (curSpecial[i] > curNeeds[i]) { // 不能购买超出购物清单指定数量的物品
                      break;
                  }
                  nxtNeeds.push(curNeeds[i] - curSpecial[i]);
              }
              if (nxtNeeds.length === n) { // 大礼包可以购买
                  minPrice = Math.min(minPrice, dfs(price, special, nxtNeeds, filterSpecial, n) + specialPrice);
              }
          }
          memo.set(curNeeds, minPrice);
      }
      return memo.get(curNeeds);
  }

  const n = price.length;

  // 过滤不需要计算的大礼包，只保留需要计算的大礼包
  const filterSpecial = [];
  for (const sp of special) {
      let totalCount = 0, totalPrice = 0;
      for (let i = 0; i < n; ++i) {
          totalCount += sp[i];
          totalPrice += sp[i] * price[i];
      }
      if (totalCount > 0 && totalPrice > sp[n]) {
          filterSpecial.push(sp);
      }
  }

  return dfs(price, special, needs, filterSpecial, n);
};

// 869. 重新排序得到 2 的幂 预处理所有可能的值再做同样处理匹配
/**
 * @param {number} n
 * @return {boolean}
 */


 var reorderedPowerOf2 = function(n) {
  const powerOf2Digits = new Set();

  for (let n = 1; n <= 1e9; n <<= 1) {
      powerOf2Digits.add(countDigits(n));
  }

  return powerOf2Digits.has(countDigits(n));

  function countDigits (n)  {
  const cnt = new Array(10).fill(0);
  while (n) {
      cnt[n % 10]++;
      n = Math.floor(n / 10);
  }
  return cnt.join('');
}
};


// 575. 分糖果 贪心算法
/** 
 * @param {number[]} candyType
 * @return {number}
 */
 var distributeCandies = function(candyType) {
  const set = new Set(candyType);
  return Math.min(set.size, candyType.length / 2);
};


// 237. 删除链表中的节点 脑静急转弯
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
 var deleteNode = function(node) {
  node.val = node.next.val
  node.next = node.next.next
};

// 42. 接雨水 双指针
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {

    var left = 0, right = height.length - 1;
    var maxLeft = 0, maxRight = 0;
    var ans = 0;
    while(left < right) {
        if(height[left] < height[right]) {
            height[left] >= maxLeft ? (maxLeft = height[left]) : (ans += (maxLeft - height[left]));
            left++;

        } else {
            height[right] >= maxRight ? (maxRight = height[right]) : (ans += (maxRight - height[right]));
            right--;
        }
    }
    return ans;
};

// 367. 有效的完全平方数  基础题
/**
 * @param {number} num
 * @return {boolean}
 */
 var isPerfectSquare = function(num) {
  let x = 1, square = 1;
  while (square <= num) {
      if (square === num) {
          return true;
      }
      ++x;
      square = x * x;
  }
  return false;
};


//1218. 最长定差子序列  map 记录前值
/**
 * @param {number[]} arr
 * @param {number} difference
 * @return {number}
 */
 var longestSubsequence = function(arr, difference) {
  let ans = 0;
  const dp = new Map();
  for (const v of arr) {
      dp.set(v, (dp.get(v - difference) || 0) + 1);
      ans = Math.max(ans, dp.get(v));
  }
  return ans;
};

// 268. 丢失的数字 基础题
/**
 * @param {number[]} nums
 * @return {number}
 */
 var missingNumber = function(nums) {
  const n = nums.length;
  let total = Math.floor(n * (n + 1) / 2);
  let arrSum = 0;
  for (let i = 0; i < n; i++) {
      arrSum += nums[i];
  }
  return total - arrSum;
};


// 598. 范围求和 II  算交集
/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} ops
 * @return {number}
 */
 var maxCount = function(m, n, ops) {
  let mina = m, minb = n;
  for (const op of ops) {
      mina = Math.min(mina, op[0]);
      minb = Math.min(minb, op[1]);
  }
  return mina * minb;
};


// 299. 猜数字游戏 数组记录
/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
 var getHint = function(secret, guess) {
  let bulls = 0;
  const cntS = new Array(10).fill(0);
  const cntG = new Array(10).fill(0);
  for (let i = 0; i < secret.length; ++i) {
      if (secret[i] == guess[i]) {
          ++bulls;
      } else {
          ++cntS[secret[i].charCodeAt() - '0'.charCodeAt()];
          ++cntG[guess[i].charCodeAt() - '0'.charCodeAt()];
      }
  }
  let cows = 0;
  for (let i = 0; i < 10; ++i) {
      cows += Math.min(cntS[i], cntG[i]);
  }
  return '' + bulls + "A" + '' + cows + "B";
};


// 495. 提莫攻击  基础题
/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
 var findPoisonedDuration = function(timeSeries, duration) {
   let res  = 0, max = 0
   for (let i = 0; i < timeSeries.length; i++) {
     let times = timeSeries[i]
     if (times + duration > max) {
       res += Math.min(times + duration -  max,duration)
       max = times + duration
     }
   }
   return res
};

//  629. K个逆序对数组 动态规划
/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
 var kInversePairs = function(n, k) {
  const MOD = 1000000007;
  const f = new Array(2).fill(0).map(() => new Array(k + 1).fill(0));
  f[0][0] = 1;
  for (let i = 1; i <= n; ++i) {
      for (let j = 0; j <= k; ++j) {
          const cur = i & 1, prev = cur ^ 1;
          f[cur][j] = (j - 1 >= 0 ? f[cur][j - 1] : 0) - (j - i >= 0 ? f[prev][j - i] : 0) + f[prev][j];
          if (f[cur][j] >= MOD) {
              f[cur][j] -= MOD;
          } else if (f[cur][j] < 0) {
              f[cur][j] += MOD;
          }
      }
  }
  return f[n & 1][k];
};

// 375. 猜数字大小 II  动态规划 f(1,n)= min(1~n) {x+max(f(1,x−1),f(x+1,n))}
/**
 * @param {number} n
 * @return {number}
 */
 var getMoneyAmount = function(n) {
  const f = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));
  for (let i = n - 1; i >= 1; i--) {
      for (let j = i + 1; j <= n; j++) {
          let minCost = Number.MAX_VALUE;
          for (let k = i; k < j; k++) {
              let cost = k + Math.max(f[i][k - 1], f[k + 1][j]);
              minCost = Math.min(minCost, cost);
          }
          f[i][j] = minCost;
      }
  }
  return f[1][n];
};

// 319. 灯泡开关 脑筋急转弯
/**
 * @param {number} n
 * @return {number}
 */
 var bulbSwitch = function(n) {
  return Math.floor(Math.sqrt(n + 0.5));
};


// 520. 检测大写字母 基础题
/**
 * @param {string} word
 * @return {boolean}
 */
 var detectCapitalUse = function(word) {
  // 若第 1 个字母为小写，则需额外判断第 2 个字母是否为小写
  if (word.length >= 2 && word[0] === word[0].toLowerCase() && word[1] === word[1].toUpperCase()) {
      return false;
  }
  
  // 无论第 1 个字母是否大写，其他字母必须与第 2 个字母的大小写相同
  for (let i = 2; i < word.length; ++i) {
      if (word[i] === word[i].toLowerCase() ^ word[1] === word[1].toLowerCase()) {
          return false;
      }
  }
  return true;
};


// 677. 键值映射 字典树

class TrieNode {
  constructor() {
      this.val = 0;
      this.next = new Array(26).fill(0);
  }
}

var MapSum = function() {
  this.root = new TrieNode();
  this.map = new Map();

};

MapSum.prototype.insert = function(key, val) {
  const delta = val - (this.map.get(key) || 0);
  this.map.set(key, val);
  let node = this.root;
  for (const c of key) {
      if (node.next[c.charCodeAt() - 'a'.charCodeAt()] === 0) {
          node.next[c.charCodeAt() - 'a'.charCodeAt()] = new TrieNode();
      }
      node = node.next[c.charCodeAt() - 'a'.charCodeAt()];
      node.val += delta;
  }
};

MapSum.prototype.sum = function(prefix) {
  let node = this.root;
  for (const c of prefix) {
      if (node.next[c.charCodeAt() - 'a'.charCodeAt()] === 0) {
          return 0;
      }
      node = node.next[c.charCodeAt() - 'a'.charCodeAt()];
  }
  return node.val;
};

// 391. 完美矩形  1.面积相加跟最大的一样  2.四个顶点出现一次 其他点出现2-4次
/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
 var isRectangleCover = function(rectangles) {
  const n = rectangles.length, record = new Set()
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity, sumArea = 0
  for (const [x1, y1, x2, y2] of rectangles) {
    minX = Math.min(minX, x1)
    minY = Math.min(minY, y1)
    maxX = Math.max(maxX, x2)
    maxY = Math.max(maxY, y2)
    sumArea += (x2 - x1) * (y2 - y1)
    const arr = [`${x1} ${y1}`, `${x1} ${y2}`, `${x2} ${y1}`, `${x2} ${y2}`]
    arr.forEach(k => record.has(k) ? record.delete(k) : record.add(k))
  }

  return sumArea === (maxX - minX) * (maxY - minY) && record.size === 4 && [`${minX} ${minY}`, `${minX} ${maxY}`, `${maxX} ${minY}`, `${maxX} ${maxY}`].every(k => record.has(k))
};

//  318. 最大单词长度乘积  Map 记录 位运算
/**
 * @param {string[]} words
 * @return {number}
 */
 var maxProduct = function(words) {
  const map = new Map();
  const length = words.length;
  for (let i = 0; i < length; i++) {
      let mask = 0;
      const word = words[i];
      const wordLength = word.length;
      for (let j = 0; j < wordLength; j++) {
          mask |= 1 << (word[j].charCodeAt() - 'a'.charCodeAt());
      }
      if (wordLength > (map.get(mask) || 0)) {
          map.set(mask, wordLength);
      }
  }
  let maxProd = 0;
  const maskSet = Array.from(map.keys());
  for (const mask1 of maskSet) {
      const wordLength1 = map.get(mask1);
      for (const mask2 of maskSet) {
          if ((mask1 & mask2) === 0) {
              const wordLength2 = map.get(mask2);
              maxProd = Math.max(maxProd, wordLength1 * wordLength2);
          }
      }
  }
  return maxProd;
};


// 563. 二叉树的坡度 递归遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var findTilt = function(root) {
  let ans = 0;

  const dfs = (node) => {
      if (!node) {
          return 0;
      }
      const sumLeft = dfs(node.left);
      const sumRight = dfs(node.right);
      ans += Math.abs(sumLeft - sumRight);
      return sumLeft + sumRight + node.val;
  }

  dfs(root);
  return ans;
};

// 397. 整数替换 贪心算法
/**
 * @param {number} n
 * @return {number}
 */

 var integerReplacement = function(n) {
  let ans = 0;
  while (n !== 1) {
      if (n % 2 === 0) {
          ++ans;
          n = Math.floor(n / 2);
      } else if (n % 4 === 1) {
          ans += 2;
          n = Math.floor(n / 2);
      } else {
          if (n === 3) {
              ans += 2;
              n = 1;
          } else {
              ans += 2;
              n = Math.floor(n / 2) + 1;
          }
      }
  }
  return ans;
};

// 594. 最长和谐子序列  哈希表
/**
 * @param {number[]} nums
 * @return {number}
 */
 var findLHS = function(nums) {
   let map = new Map(),res = 0
   for (let i = 0; i < nums.length; i++) {
     let num = nums[i]
     map.set(num,(map.get(num) || 0) +1)
   }

   for (let i = 0; i < nums.length; i++) {
    let num = nums[i]
    if(map.get(num+1)) {
      res = Math.max(res,map.get(num) + map.get(num+1))
    }
  }
  return res
};


// 559. N 叉树的最大深度 二叉树层序遍历
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number}
 */
 var maxDepth = function(root) {
  if (!root) {
      return 0;
  }
  const queue = [];
  queue.push(root);
  let ans = 0;
  while (queue.length) {
      let size = queue.length;
      while (size > 0) {
          const node = queue.shift();
          const children = node.children;
          for (const child of children) {
              queue.push(child);
          }
          size--;
      }
      ans++;
  }
  return ans;
};

// 384. 打乱数组 Fisher-Yates 洗牌算法
/**
 * @param {number[]} nums
 */
 var Solution = function(nums) {
  this.nums = nums;
  this.original = this.nums.slice();
};

Solution.prototype.reset = function() {
  this.nums = this.original.slice();
  return this.nums;
};

Solution.prototype.shuffle = function() {
  for (let i = 0; i < this.nums.length; ++i) {
      const j = Math.floor(Math.random() * (this.nums.length - i)) + i;
      const temp = this.nums[i];
      this.nums[i] = this.nums[j];
      this.nums[j] = temp;
  }
  return this.nums;
};

// 859. 亲密字符串  逻辑分类判断
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
 var buddyStrings = function(s, goal) {
  if (s.length != goal.length) {
      return false;
  }
  
  if (s === goal) {
      const count = new Array(26).fill(0);
      for (let i = 0; i < s.length; i++) {
          count[s[i].charCodeAt() - 'a'.charCodeAt()]++;
          if (count[s[i].charCodeAt() - 'a'.charCodeAt()] > 1) {
              return true;
          }
      }
      return false;
  } else {
      let first = -1, second = -1;
      for (let i = 0; i < s.length; i++) {
          if (s[i] !== goal[i]) {
              if (first === -1)
                  first = i;
              else if (second === -1)
                  second = i;
              else
                  return false;
          }
      }

      return (second !== -1 && s[first] === goal[second] && s[second] === goal[first]);
  }
};


// 423. 从英文中重建数字 逻辑分析
/**
 * @param {string} s
 * @return {string}
 */
 var originalDigits = function(s) {
  const c = new Map();
  for (const ch of s) {
      c.set(ch, (c.get(ch) || 0) + 1);
  }

  const cnt = new Array(10).fill(0);
  cnt[0] = c.get('z') || 0;
  cnt[2] = c.get('w') || 0;
  cnt[4] = c.get('u') || 0;
  cnt[6] = c.get('x') || 0;
  cnt[8] = c.get('g') || 0;

  cnt[3] = (c.get('h') || 0) - cnt[8];
  cnt[5] = (c.get('f') || 0) - cnt[4];
  cnt[7] = (c.get('s') || 0) - cnt[6];

  cnt[1] = (c.get('o') || 0) - cnt[0] - cnt[2] - cnt[4];

  cnt[9] = (c.get('i') || 0) - cnt[5] - cnt[6] - cnt[8];

  const ans = [];
  for (let i = 0; i < 10; ++i) {
      for (let j = 0; j < cnt[i]; ++j) {
          ans.push(String.fromCharCode(i + '0'.charCodeAt()));
      }
  }
  return ans.join('');
};


// 438. 找到字符串中所有字母异位词 map窗口
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
 var findAnagrams = function(s, p) {
  let pLength = p.length
   if(pLength > s.length) {
     return []
   }
   let bMap = new Map,res = []
   for (let i = 0; i < pLength; i++) {
     let char  =  p[i]
     bMap.set(char,(bMap.get(char) || 0) -1)
   }
   for (let i = 0; i < s.length; i++) {
    let char  =  s[i]
    bMap.set(char,(bMap.get(char) || 0) +1)
    if(bMap.get(char) == 0) {
      bMap.delete(char)
    }
    if (i >= pLength) {
      let inChar = s[i-pLength]
      bMap.set(inChar,(bMap.get(inChar) || 0) -1)
      if(bMap.get(inChar) == 0) {
        bMap.delete(inChar)
      }
    }
    if (bMap.size ==0) {
      res.push(i-pLength+1)
    }
   }
   return res
};
// 786. 第 K 个最小的素数分数 二分查找+双指针

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
 var kthSmallestPrimeFraction = function(arr, k) {
  const n = arr.length;
  let left = 0.0, right = 1.0;
  while (true) {
      const mid = (left + right) / 2;
      let i = -1, count = 0;
      // 记录最大的分数
      let x = 0, y = 1;
      
      for (let j = 1; j < n; ++j) {
          while (arr[i + 1] / arr[j] < mid) {
              ++i;
              if (arr[i] * y > arr[j] * x) {
                  x = arr[i];
                  y = arr[j];
              }
          }
          count += i + 1;
      }

      if (count === k) {
          return [x, y];
      }
      if (count < k) {
          left = mid;
      } else {
          right = mid;
      }
  }
};


// 519. 随机翻转矩阵 map
/**
 * @param {number} m
 * @param {number} n
 */
 var Solution = function(m, n) {
  this.m = m;
  this.n = n;
  this.total = m * n;
  this.map = new Map();
};

Solution.prototype.flip = function() {
  const x = Math.floor(Math.random() * this.total);
  this.total--;
  // 查找位置 x 对应的映射
  const idx = this.map.get(x) || x;
  // 将位置 x 对应的映射设置为位置 total 对应的映射
  this.map.set(x, this.map.get(this.total) || this.total);
  return [Math.floor(idx / this.n), idx % this.n];
};

Solution.prototype.reset = function() {
  this.total = this.m * this.n;
  this.map.clear();
};

// 400. 第 N 位数字 按照规律计算
/**
 * @param {number} n
 * @return {number}
 */
 var findNthDigit = function(n) {
  let d = 1, count = 9;
  while (n > d * count) {
      n -= d * count;
      d++;
      count *= 10;
  }
  const index = n - 1;
  const start = Math.floor(Math.pow(10, d - 1));
  const num = start + Math.floor(index / d);
  const digitIndex = index % d;
  const digit = Math.floor(num / Math.floor(Math.pow(10, d - digitIndex - 1))) % 10;
  return digit;
};

// 1446. 连续字符 基础逻辑
/**
 * @param {string} s
 * @return {number}
 */
 var maxPower = function(s) {
  let ans = 1, cnt = 1;
  for (let i = 1; i < s.length; ++i) {
      if (s[i] == s[i - 1]) {
          ++cnt;
          ans = Math.max(ans, cnt);
      } else {
          cnt = 1;
      }
  }
  return ans;
};

// 506. 相对名次 排序map记录
/**
 * @param {number[]} score
 * @return {string[]}
 */
 var findRelativeRanks = function(score) {
   let bMap = new Map()
   let n =  score.length
   for (let i = 0; i < n; i++) {
     bMap.set(score[i],i)
   }
   score.sort((a, b) => b - a)
   let ans =  Array(n).fill(0)
   let desc = ["Gold Medal", "Silver Medal", "Bronze Medal"]
   for (let i = 0; i < n; i++) {
     if (i < 3) {
       ans[bMap.get(score[i])] = desc[i]
     } else {
      ans[bMap.get(score[i])] = '' + (i + 1)
     }
    }
    return ans
};

// 1005. K 次取反后最大化的数组和  逻辑判断
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var largestSumAfterKNegations = function(A, K) {
  A.sort((a,b)=> a-b);
  var index = 0;
  var backK = K;
  while(backK > 0) {
      if(A[index] < 0) {
          A[index] = A[index]*-1;
          index++;
          backK--;
          index = index == A.length ? index - 1 : index;
      } else {
          if(backK%2 != 0) {
              if(index == 0) {
                  A[index] = A[index]*-1;
              } else {
                  if(A[index -1] > A[index]){
                      A[index] = A[index]*-1;
                  } else {
                      A[index - 1] = A[index - 1]*-1;
                  }
              }
          } 
          backK = 0;
      }
  }
  var result = 0;
  for(let num of A) {
      result += num; 
  }
  return result;
};

// 383. 赎金信 基础题
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
 var canConstruct = function(ransomNote, magazine) {
  if (ransomNote.length > magazine.length) {
      return false;
  }
  const cnt = new Array(26).fill(0);
  for (const c of magazine) {
      cnt[c.charCodeAt() - 'a'.charCodeAt()]++;
  }
  for (const c of ransomNote) {
      cnt[c.charCodeAt() - 'a'.charCodeAt()]--;
      if(cnt[c.charCodeAt() - 'a'.charCodeAt()] < 0) {
          return false;
      }
  }
  return true;
};

// 1816. 截断句子 基础题
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
 var truncateSentence = function(s, k) {
  const n = s.length;
  let end = 0, count = 0;
  for (let i = 1; i <= n; i++) {
      if (i === n || s[i] === ' ') {
          count++;
          if (count === k) {
              end = i;
              break;
          }
      }
  }
  return s.slice(0, end);
};

//  1034. 边界着色 深度遍历
/**
 * @param {number[][]} grid
 * @param {number} row
 * @param {number} col
 * @param {number} color
 * @return {number[][]}
 */
 var colorBorder = function(grid, row, col, color) {
  const m = grid.length, n = grid[0].length;
  const visited = new Array(m).fill(0).map(() => new Array(n).fill(0));
  const borders = [];
  const originalColor = grid[row][col];
  visited[row][col] = true;
  dfs(grid, row, col, visited, borders, originalColor);
  for (let i = 0; i < borders.length; i++) {
      const x = borders[i][0], y = borders[i][1];
      grid[x][y] = color;
  }
  return grid;
};

const dfs = (grid, x, y, visited, borders, originalColor) => {
  const m = grid.length, n = grid[0].length;
  let isBorder = false;
  const direc = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  for (let i = 0; i < 4; i++) {
      const nx = direc[i][0] + x, ny = direc[i][1] + y;
      if (!(nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] === originalColor)) {
          isBorder = true;
      } else if (!visited[nx][ny]){
          visited[nx][ny] = true;
          dfs(grid, nx, ny, visited, borders, originalColor);
      }                
  }
  if (isBorder) {
      borders.push([x, y]);
  }
}

// 689. 三个无重叠子数组的最大和 窗口
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 const maxSumOfThreeSubarrays = (nums, k) => {
  const ans = [0, 0, 0];
  let sum1 = 0, maxSum1 = 0, maxSum1Idx = 0;
  let sum2 = 0, maxSum12 = 0, maxSum12Idx1 = 0, maxSum12Idx2 = 0;
  let sum3 = 0, maxTotal = 0;
  for (let i = k * 2; i < nums.length; ++i) {
      sum1 += nums[i - k * 2];
      sum2 += nums[i - k];
      sum3 += nums[i];
      if (i >= k * 3 - 1) {
          if (sum1 > maxSum1) {
              maxSum1 = sum1;
              maxSum1Idx = i - k * 3 + 1;
          }
          if (maxSum1 + sum2 > maxSum12) {
              maxSum12 = maxSum1 + sum2;
              maxSum12Idx1 = maxSum1Idx;
              maxSum12Idx2 = i - k * 2 + 1;
          }
          if (maxSum12 + sum3 > maxTotal) {
              maxTotal = maxSum12 + sum3;
              ans[0] = maxSum12Idx1;
              ans[1] = maxSum12Idx2;
              ans[2] = i - k + 1;
          }
          sum1 -= nums[i - k * 3 + 1];
          sum2 -= nums[i - k * 2 + 1];
          sum3 -= nums[i - k + 1];
      }
  }
  return ans;
}

// 794. 有效的井字游戏  分情况枚举
/**
 * @param {string[]} board
 * @return {boolean}
 */
 var validTicTacToe = function(board) {
  let xCount = 0, oCount = 0;
  for (const row of board) {
      for (const c of row) {
          xCount = (c === 'X') ? (xCount + 1) : xCount;
          oCount = (c === 'O') ? (oCount + 1) : oCount;
      }
  }
  if (oCount != xCount && oCount !== xCount - 1) {
      return false;
  }
  if (win(board, 'X') && oCount !== xCount - 1) {
      return false;
  }
  if (win(board, 'O') && oCount !== xCount) {
      return false;
  }
  return true;

  function win (board, p) {
    for (let i = 0; i < 3; ++i) {
        if (p === board[0][i] && p === board[1][i] && p === board[2][i]) {
            return true;
        }
        if (p === board[i][0] && p === board[i][1] && p === board[i][2]) {
            return true;
        }
    }
    if (p === board[0][0] && p === board[1][1] && p === board[2][2]) {
        return true;
    }
    if (p === board[0][2] && p === board[1][1] && p === board[2][0]) {
        return true;
    }
    return false;
  }

};

// 748. 最短补全词 遍历
/**
 * @param {string} licensePlate
 * @param {string[]} words
 * @return {string}
 */
 var shortestCompletingWord = function(licensePlate, words) {
  const cnt = new Array(26).fill(0);
  for (const ch of licensePlate) {
      if (/^[a-zA-Z]+$/.test(ch)) {
          ++cnt[ch.toLowerCase().charCodeAt() - 'a'.charCodeAt()];
      }
  }
  let min= "xxxxxxxxxxxxxxxx";
  for (let i = 0; i < words.length; ++i) {
      if (words[i].length >= min.length) {
        continue
      }
      const c = Array(26).fill(0);
      for (let j = 0; j < words[i].length; ++j) {
          const ch = words[i][j];
          ++c[ch.charCodeAt() - 'a'.charCodeAt()];
      }
      let ok = true;
      for (let j = 0; j < 26; ++j) {
          if (c[j] < cnt[j]) {
              ok = false;
              break;
          }
      }
      if (ok) {
        min = words[i]
      }
  }
  return min;
};

// 807. 保持城市天际线 贪心算法
/**
 * @param {number[][]} grid
 * @return {number}
 */
 var maxIncreaseKeepingSkyline = function(grid) {
  const n = grid.length;
  const rowMax = new Array(n).fill(0);
  const colMax = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
          rowMax[i] = Math.max(rowMax[i], grid[i][j]);
          colMax[j] = Math.max(colMax[j], grid[i][j]);
      }
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
          ans += Math.min(rowMax[i], colMax[j]) - grid[i][j];
      }
  }
  return ans;
};

// 709. 转换成小写字母 基础题 
/**
 * @param {string} s
 * @return {string}
 */
 var toLowerCase = function(s) {
  return s.toLowerCase();
};

// 911. 在线选举  二分查找
/**
 * @param {number[]} persons
 * @param {number[]} times
 */
 var TopVotedCandidate = function(persons, times) {
  this.tops = [];
  this.voteCounts = new Map();
  this.voteCounts.set(-1, -1);
  this.times = times;
  let top = -1;
  for (let i = 0; i < persons.length; ++i) {
      const p = persons[i];
      if (!this.voteCounts.has(p)) {
          this.voteCounts.set(p, 0);
      } else {
          this.voteCounts.set(p, this.voteCounts.get(p) + 1);
      }
      if (this.voteCounts.get(p) >= this.voteCounts.get(top)) {
          top = p;
      }
      this.tops.push(top);
  }
};

TopVotedCandidate.prototype.q = function(t) {
  let l = 0, r = this.times.length - 1;
  // 找到满足 times[l] <= t 的最大的 l
  while (l < r) {
      const m = l + Math.floor((r - l + 1) / 2);
      if (this.times[m] <= t) {
          l = m;
      } else {
          r = m - 1;
      }
  }

  return this.tops[l];
};

// 630. 课程表 III  最大堆
/**
 * @param {number[][]} courses
 * @return {number}
 */
 function scheduleCourse(courses) {
  courses.sort((a, b) => a[1] - b[1]);
  const pq = new MaxPriorityQueue({ priority: p => p });
  let startTime = 0;
  for (const [duration, lastDay] of courses) {
    if (startTime + duration <= lastDay) {
      startTime += duration;
      pq.enqueue(duration);
    } else if (pq.size() && pq.front().element > duration) {
      startTime += duration - pq.dequeue().element;
      pq.enqueue(duration);
    }
  }
  return pq.size();
}

// 851.喧闹和富有 深度优先搜索
/**
 * @param {number[][]} richer
 * @param {number[]} quiet
 * @return {number[]}
 */
 var loudAndRich = function(richer, quiet) {
  const n = quiet.length;
  const g = new Array(n).fill(0);
  for (let i = 0; i < n; ++i) {
      g[i] = [];
  }
  for (const r of richer) {
      g[r[1]].push(r[0]);
  }

  const ans = new Array(n).fill(-1);
  for (let i = 0; i < n; ++i) {
      dfs(i);
  }

  function dfs (x) {
  if (ans[x] !== -1) {
      return;
  }
  ans[x] = x;
  for (const y of g[x]) {
      dfs(y);
      if (quiet[ans[y]] < quiet[ans[x]]) {
          ans[x] = ans[y];
      }
  }
}

  return ans;
};


// 1610. 可见点的最大数目  窗口

/**
 * @param {number[][]} points
 * @param {number} angle
 * @param {number[]} location
 * @return {number}
 */
 var visiblePoints = function(points, angle, location) {
  let sameCnt = 0;
  const polarDegrees = [];
  let locationX = location[0];
  let locationY = location[1];
  for (let i = 0; i < points.length; ++i) {
      const x = points[i][0];
      const y = points[i][1];
      if (x === locationX && y === locationY) {
          sameCnt++;
          continue;
      }
      const degree = Math.atan2(y - locationY, x - locationX);
      polarDegrees.push(degree);
  }
  polarDegrees.sort((a, b) => a - b);

  const m = polarDegrees.length;
  for (let i = 0; i < m; ++i) {
      polarDegrees.push(polarDegrees[i] + 2 * Math.PI);
  }

  let maxCnt = 0;
  let right = 0;
  const toDegree = angle * Math.PI / 180;
  for (let i = 0; i < m; ++i) {
      const curr = polarDegrees[i] + toDegree;
      while (right < polarDegrees.length && polarDegrees[right] <= curr) {
          right++;
      }
      maxCnt = Math.max(maxCnt, right - i);
  }
  return maxCnt + sameCnt;
};


// 1518. 换酒问题  数学题
/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
 var numWaterBottles = function(numBottles, numExchange) {
  return numBottles + Math.floor((numBottles - 1) / (numExchange - 1))
};

// 419. 甲板上的战舰  遍历
/**
 * @param {character[][]} board
 * @return {number}
 */
 var countBattleships = function(board) {
  const row = board.length;
  const col = board[0].length;
  let ans = 0;
  for (let i = 0; i < row; ++i) {
      for (let j = 0; j < col; ++j) {
          if (board[i][j] === 'X') {
              board[i][j] = '.';
              for (let k = j + 1; k < col && board[i][k] === 'X'; ++k) {
                  board[i][k] = '.';
              }                    
              for (let k = i + 1; k < row && board[k][j] === 'X'; ++k) {
                  board[k][j] = '.';
              }
              ans++;
          }
      }
  }
  return ans;
};

// 997. 找到小镇的法官 图入度和出度概念
/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
 var findJudge = function(n, trust) {
  const inDegrees = new Array(n + 1).fill(0);
  const outDegrees = new Array(n + 1).fill(0);
  for (const edge of trust) {
      const x = edge[0], y = edge[1];
      ++inDegrees[y];
      ++outDegrees[x];
  }
  for (let i = 1; i <= n; ++i) {
      if (inDegrees[i] === n - 1 && outDegrees[i] === 0) {
          return i;
      }
  }
  return -1;
};

// 475. 供暖器 双指针
/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */

 var findRadius = function(houses, heaters) {
  houses.sort((a, b) => a - b);
  heaters.sort((a, b) => a - b);
  let ans = 0;
  for (let i = 0, j = 0; i < houses.length; i++) {
      let curDistance = Math.abs(houses[i] - heaters[j]);
      while (j < heaters.length - 1 && Math.abs(houses[i] - heaters[j]) >= Math.abs(houses[i] - heaters[j + 1])) {
          j++;
          curDistance = Math.min(curDistance, Math.abs(houses[i] - heaters[j]));
      }
      ans = Math.max(ans, curDistance);
  }
  return ans;
};

// 1154. 一年中的第几天 基础逻辑题 
/**
 * @param {string} date
 * @return {number}
 */
 var dayOfYear = function(date) {
  const year = +date.slice(0, 4);
  const month = +date.slice(5, 7);
  const day = +date.slice(8);

  const amount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
      ++amount[1];
  }

  let ans = 0;
  for (let i = 0; i < month - 1; ++i) {
      ans += amount[i];
  }
  return ans + day;
};

// 686. 重复叠加字符串匹配 基础题
/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
 var repeatedStringMatch = function(a, b) {
  const l = Math.ceil(b.length/a.length)
  if(a.repeat(l).includes(b))
      return l
  if(a.repeat(l+1).includes(b))
      return l + 1
  return -1
};

// 1044. 最长重复子串 二分查找 + Rabin-Karp 字符串编码
/**
 * @param {string} s
 * @return {string}
 */
 var longestDupSubstring = function(S) {
  let R=26,MOD=1e9+7;
  let lo=0,hi=S.length-1,res='';
  while(lo<hi){
    let len=Math.ceil((lo+hi)/2);
    let sub=rabinKarp(S,len);
    if(sub!==''){
      lo=len;
      res=sub;
    }else{
      hi=len-1;
    }
  }
  return res;

  function rabinKarp(str,len){
    let RM=1
    // 等价于RM=Math.pow(R,M-1) % MOD
    // 由于JS精度问题拆解计算
    for(let i=1;i<len;i++){
      RM=(RM*R) % MOD;
    }
    let map=new Map();
    let num=0;
    // 计算前len个字符串的散列值
    for(let i=0;i<len;i++){
      let code=str.charCodeAt(i)-97;
      num=(num*R + code) % MOD;
    }
    map.set(num,0);
    // 后续计算散列值
    for(let i=0;i<str.length-len;i++){
      let preCode=str.charCodeAt(i)-97,
          curCode=str.charCodeAt(i+len)-97;
      num=(num+MOD-(preCode*RM % MOD)) % MOD;
      num=(num*R + curCode) % MOD;
      if(map.has(num)){
        let sub=str.substring(i+1,i+1+len);
        let preId=map.get(num),
            preSub=str.substring(preId,preId+len);
        if(sub===preSub)return sub;
      }
      map.set(num,i+1);
    }
    return '';
  }
};

// 1705. 吃苹果的最大数目  队列 这里还可以用二分查找优化
/**
 * @param {number[]} apples
 * @param {number[]} days
 * @return {number}
 */

 var eatenApples = function(apples, days) {
  let alen = apples.length;
  let dlen = days.length;
  let eat = 0;
  let queue = [];
  let i = 0;
  while (i < alen || queue.length > 0) {
    // 如果今天有长出苹果，先放入苹果，按照腐烂度排序，快烂的放前面先吃
    if (i < alen && apples[i] > 0) {
      let j = queue.length - 1;
      while (j >= 0 && ( (i + days[i]) < (queue[j] + days[queue[j]]) )) {
        queue[j+1] = queue[j]
        j--;
      }
      queue[j+1] = i;
    }
    // 把吃完的或者烂掉的清理掉
    while (
      queue.length > 0 && 
      (
        apples[queue[0]] <= 0 || (queue[0] + days[queue[0]] <= i)
      )
    ) {
      queue.shift();
    }
    // 吃苹果
    if (queue.length > 0) {
      apples[queue[0]]--;
      eat++;
    }
    i++;
  }
  return eat;
};

// 825. 适龄的朋友 逻辑题
/**
 * @param {number[]} ages
 * @return {number}
 */
 var numFriendRequests = function(ages) {
  const n = ages.length;
  ages.sort((a, b) => a - b);
  let left = 0, right = 0, ans = 0;
  for (const age of ages) {
      if (age < 15) {
          continue;
      }
      while (ages[left] <= 0.5 * age + 7) {
          ++left;
      }
      while (right + 1 < n && ages[right + 1] <= age) {
          ++right;
      }
      ans += right - left;
  }
  return ans;
};

// 1078. Bigram 分词 基础题
/**
 * @param {string} text
 * @param {string} first
 * @param {string} second
 * @return {string[]}
 */
 var findOcurrences = function(text, first, second) {
  const words = text.split(" ");
  const list = [];
  for (let i = 2; i < words.length; i++) {
      if (words[i - 2] === first && words[i - 1] === second) {
          list.push(words[i]);
      }
  }
  return list;
};

// 1609. 奇偶树 遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
 var isEvenOddTree = function(root) {
  const queue = [];
  queue.push(root);
  let level = 0;
  while (queue.length) {
      const size = queue.length;
      let prev = level % 2 == 0 ? -Number.MAX_VALUE : Number.MAX_VALUE;
      for (let i = 0; i < size; i++) {
          const node = queue.shift();
          const value = node.val;
          if (level % 2 === value % 2) {
              return false;
          }
          if ((level % 2 === 0 && value <= prev) || (level % 2 === 1 && value >= prev)) {
              return false;
          }
          prev = value;
          if (node.left) {
              queue.push(node.left);
          }
          if (node.right) {
              queue.push(node.right);
          }
      }
      level++;
  }
  return true;
};

// 472. 连接词 集合+遍历
/**
 * @param {string[]} words
 * @return {string[]}
 */
 var findAllConcatenatedWordsInADict = function (words) {
  let set = new Set();
  let res = [];
  let getWord = function (word, start) {
    for (let str = '', len = word.length - 1; start <= len; ++start) {
      str += word[start]
      if (set.has(str) && (start === len || getWord(word, start + 1))) {
        return true;
      }
    }
    return false;
  }
  words.sort((a, b) => a.length - b.length);
  set.add(words[0]);
  for (let i = 1, len = words.length; i < len; ++i) {
    if (getWord(words[i], 0)) {
      res.push(words[i])
    } else {
      set.add(words[i])
    }
  }
  return res;
};

// 1995. 统计特殊四元组 map基础题
/**
 * @param {number[]} nums
 * @return {number}
 */
 var countQuadruplets = function(nums) {
  const cnts = new Map()
  let ans = 0
  for(let i=1;i<nums.length-2;i++){
      for(let j=0;j<i;j++)
          if(cnts.has(nums[i] + nums[j]))
              cnts.set(nums[i] + nums[j], cnts.get(nums[i] + nums[j]) + 1)
          else
              cnts.set(nums[i] + nums[j], 1)
      for(let j=i+2;j<nums.length;j++)
          if(cnts.has(nums[j] - nums[i+1]))
              ans += cnts.get(nums[j] - nums[i+1])
  }
  return ans
};

// 846. 一手顺子  排序 map映射
/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
 var isNStraightHand = function(hand, groupSize) {
  const n = hand.length;
  if (n % groupSize !== 0) {
      return false;
  }
  hand.sort((a, b) => a - b);
  const cnt = new Map();
  for (const x of hand) {
      cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  for (const x of hand) {
      if (!cnt.has(x)) {
          continue;
      }
      for (let j = 0; j < groupSize; j++) {
          const num = x + j;
          if (!cnt.has(num)) {
              return false;
          }
          cnt.set(num, cnt.get(num) - 1);
          if (cnt.get(num) == 0) {
              cnt.delete(num);
          }
      }
  }
  return true;
};

// 507.完美数 穷举
/**
 * @param {number} num
 * @return {boolean}
 */
 var checkPerfectNumber = function(num) {
  return num === 6 || num === 28 || num === 496 || num === 8128 || num === 33550336;
};


// 2022. 将一维数组转变成二维数组 基础题
/**
 * @param {number[]} original
 * @param {number} m
 * @param {number} n
 * @return {number[][]}
 */
 var construct2DArray = function(original, m, n) {
  if (original.length !== m * n) {
      return [];
  }
  const ans = new Array(m).fill(0).map(() => new Array(n).fill(0));
  for (let i = 0; i < original.length; i += n) {
      ans[Math.floor(i / n)].splice(0, n, ...original.slice(i, i + n)) 
  }
  return ans;
};

// 1576. 替换所有的问号 基础题

/**
 * @param {string} s
 * @return {string}
 */
 var modifyString = function(s) {
  const n = s.length;
  const arr = [...s];
  for (let i = 0; i < n; ++i) {
      if (arr[i] === '?') {
          for (let j = 0; j < 3; ++j) {
              if ((i > 0 && arr[i - 1] === String.fromCharCode('a'.charCodeAt() + j)) || (i < n - 1 && arr[i + 1] === String.fromCharCode('a'.charCodeAt() + j))) {
                  continue;
              }
              arr[i] = String.fromCharCode('a'.charCodeAt() + j);
              break;
          }
      }
  }
  return arr.join('');
};

// 71. 简化路径 栈
/**
 * @param {string} path
 * @return {string}
 */
 var simplifyPath = function(path) {
  const names = path.split("/");
  const stack = [];
  for (const name of names) {
      if (name === "..") {
          if (stack.length) {
              stack.pop();
          } 
      } else if (name.length && name !== ".") {
          stack.push(name);

      }
  }
  
  return "/" + stack.join("/");
};

// 1614. 括号的最大嵌套深度 基础遍历
/**
 * @param {string} s
 * @return {number}
 */
 var maxDepth = function(s) {
  let ans = 0, size = 0;
  for (let i = 0; i < s.length; ++i) {
      const ch = s[i];
      if (ch === '(') {
          ++size;
          ans = Math.max(ans, size);
      } else if (ch === ')') {
          --size;
      }
  }
  return ans;
};

//  306. 累加数 穷举
/**
 * @param {string} num
 * @return {boolean}
 */
 var isAdditiveNumber = function(num) {
  const n = num.length;
  for (let secondStart = 1; secondStart < n - 1; ++secondStart) {
      if (num[0] === '0' && secondStart !== 1) {
          break;
      }
      for (let secondEnd = secondStart; secondEnd < n - 1; ++secondEnd) {
          if (num[secondStart] === '0' && secondStart !== secondEnd) {
              break;
          }
          if (valid(secondStart, secondEnd, num)) {
              return true;
          }
      }
  }
  return false;
};

const valid = (secondStart, secondEnd, num) => {
  const n = num.length;
  let firstStart = 0, firstEnd = secondStart - 1;
  while (secondEnd <= n - 1) {
      const third = stringAdd(num, firstStart, firstEnd, secondStart, secondEnd);
      const thirdStart = secondEnd + 1;
      const thirdEnd = secondEnd + third.length;
      if (thirdEnd >= n || num.slice(thirdStart, thirdEnd + 1) !== third) {
          break;
      }
      if (thirdEnd === n - 1) {
          return true;
      }
      firstStart = secondStart;
      firstEnd = secondEnd;
      secondStart = thirdStart;
      secondEnd = thirdEnd;
  }
  return false;
}

const stringAdd = (s, firstStart, firstEnd, secondStart, secondEnd) => {
  const third = [];
  let carry = 0, cur = 0;
  while (firstEnd >= firstStart || secondEnd >= secondStart || carry !== 0) {
      cur = carry;
      if (firstEnd >= firstStart) {
          cur += s[firstEnd].charCodeAt() - '0'.charCodeAt();
          --firstEnd;
      }
      if (secondEnd >= secondStart) {
          cur += s[secondEnd].charCodeAt() - '0'.charCodeAt();
          --secondEnd;
      }
      carry = Math.floor(cur / 10);
      cur %= 10;
      third.push(String.fromCharCode(cur + '0'.charCodeAt()));
  }
  third.reverse();
  return third.join('');
}

// 89. 格雷编码 位运算
/**
 * @param {number} n
 * @return {number[]}
 */

 var grayCode = function(n) {
  const ret = [0];
  for (let i = 1; i <= n; i++) {
      const m = ret.length;
      for (let j = m - 1; j >= 0; j--) {
          ret.push(ret[j] | (1 << (i - 1)));
      }
  }
  return ret;
};

// 1629. 按键持续时间最长的键 遍历
/**
 * @param {number[]} releaseTimes
 * @param {string} keysPressed
 * @return {character}
 */
 var slowestKey = function(releaseTimes, keysPressed) {
  const n = releaseTimes.length;
  let ans = keysPressed[0];
  let maxTime = releaseTimes[0];
  for (let i = 1; i < n; i++) {
      const key = keysPressed[i];
      const time = releaseTimes[i] - releaseTimes[i - 1];
      if (time > maxTime || (time === maxTime && key > ans)) {
          ans = key;
          maxTime = time;
      }
  }
  return ans;
};


// 334. 递增的三元子序列 贪心算法
/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var increasingTriplet = function(nums) {
  const n = nums.length;
  if (n < 3) {
      return false;
  }
  let first = nums[0], second = Number.MAX_VALUE;
  for (let i = 1; i < n; i++) {
      const num = nums[i];
      if (num > second) {
          return true;
      } else if (num > first) {
          second = num;
      } else {
          first = num;
      }
  }
  return false;
};

// 747. 至少是其他数字两倍的最大数  找出第一大和第二大的数
/**
 * @param {number[]} nums
 * @return {number}
 */
 var dominantIndex = function(nums) {
  let m1 = -1, m2 = -1;
  let index = -1;
  for (let i = 0; i < nums.length; i++) {
      if (nums[i] > m1) {
          m2 = m1;
          m1 = nums[i];
          index = i;
      } else if (nums[i] > m2) {
          m2 = nums[i];
      }
  }
  return m1 >= m2 * 2 ? index : -1;
};

//  373. 查找和最小的K对数字 二分查找 
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
 var kSmallestPairs = function(nums1, nums2, k) {
  m = nums1.length
  n = nums2.length
  /*二分查找第 k 小的数对和的大小*/
  let left = nums1[0] + nums2[0];
  let right = nums1[m - 1] + nums2[n - 1];
  let pairSum = right;
  while (left <= right) {
      const mid = left + ((right - left) >> 1);
      let cnt = 0;
      let start = 0;
      let end = n - 1;
      while (start < m && end >= 0) {
          if (nums1[start] + nums2[end] > mid) {
              end--;
          } else {
              cnt += end + 1;
              start++;
          }
      }
      if (cnt < k) {
          left = mid + 1;
      } else {
          pairSum = mid;
          right = mid - 1;
      }
  }

  const ans = [];
  let pos = n - 1;
  /*找到小于目标值 pairSum 的数对*/
  for (let i = 0; i < m; i++) {
      while (pos >= 0 && nums1[i] + nums2[pos] >= pairSum) {
          pos--;
      }
      for (let j = 0; j <= pos && k > 0; j++, k--) {
          const list = [];
          list.push(nums1[i]);
          list.push(nums2[j]);
          ans.push(list);
      }
  }

  /*找到等于目标值 pairSum 的数对*/
  pos = n - 1;
  for (let i = 0; i < m && k > 0; i++) {
      while (pos >= 0 && nums1[i] + nums2[pos] > pairSum) {
          pos--;
      }
      for (let j = i; k > 0 && j >= 0 && nums1[j] + nums2[pos] == pairSum; j--, k--) {
          const list = [];
          list.push(nums1[i]);
          list.push(nums2[pos]);
          ans.push(list);
      }
  }
  return ans;
}

// 1716. 计算力扣银行的钱 等差数列求和
/**
 * @param {number} n
 * @return {number}
 */
 var totalMoney = function(n) {
  // 所有完整的周存的钱
  const weekNumber = Math.floor(n / 7);
  const firstWeekMoney = Math.floor((1 + 7) * 7 / 2);
  const lastWeekMoney = firstWeekMoney + 7 * (weekNumber - 1);
  const weekMoney = Math.floor((firstWeekMoney + lastWeekMoney) * weekNumber / 2);
  // 剩下的不能构成一个完整的周的天数里存的钱
  const dayNumber = n % 7;
  const firstDayMoney = 1 + weekNumber;
  const lastDayMoney = firstDayMoney + dayNumber - 1;
  const dayMoney = Math.floor((firstDayMoney + lastDayMoney) * dayNumber / 2);
  return weekMoney + dayMoney;
};


// 1220. 统计元音字母序列的数目 动态规划
/**
 * @param {number} n
 * @return {number}
 */
 var countVowelPermutation = function(n) {
  const mod = 1000000007;
  const dp = new Array(5).fill(0);
  const ndp = new Array(5).fill(0);
  for (let i = 0; i < 5; ++i) {
      dp[i] = 1;
  }
  for (let i = 2; i <= n; ++i) {
      /* a前面可以为e,u,i */
      ndp[0] = (dp[1] + dp[2] + dp[4]) % mod;
      /* e前面可以为a,i */
      ndp[1] = (dp[0] + dp[2]) % mod;
      /* i前面可以为e,o */
      ndp[2] = (dp[1] + dp[3]) % mod;
      /* o前面可以为i */
      ndp[3] = dp[2];
      /* u前面可以为i,o */
      ndp[4] = (dp[2] + dp[3]) % mod;
      dp.splice(0, 5, ...ndp);
  }
  let ans = 0;
  for (let i = 0; i < 5; ++i) {
      ans = (ans + dp[i]) % mod;
  }
  return ans;
};

// 382. 链表随机节点 转Array再取随机数
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 */
 var Solution = function(head) {
  this.list = [];
  while (head != null) {
      this.list.push(head.val);
      head = head.next;
  }
};

Solution.prototype.getRandom = function() {
  return this.list[Math.floor(Math.random() * this.list.length)];
};


// 219. 存在重复元素 II 基础题
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
 var containsNearbyDuplicate = function(nums, k) {
   let map = new Map()
   for (let i = 0; i < nums.length; i++) {
     let num = nums[i]
     if(map.get(num)!= null && (i - map.get(num)) <= k) {
       return true
     }   
     map.set(num,i)
   }
  return false

};

// 539. 最小时间差  排序判断
/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function(timePoints) {
  timePoints.sort();
  let ans = Number.MAX_VALUE;
  let t0Minutes = getMinutes(timePoints[0]);
  let preMinutes = t0Minutes;
  for (let i = 1; i < timePoints.length; ++i) {
      const minutes = getMinutes(timePoints[i]);
      ans = Math.min(ans, minutes - preMinutes); // 相邻时间的时间差
      preMinutes = minutes;
  }
  ans = Math.min(ans, t0Minutes + 1440 - preMinutes); // 首尾时间的时间差

  function getMinutes(t) {
    return ((t[0].charCodeAt() - '0'.charCodeAt()) * 10 + (t[1].charCodeAt() - '0'.charCodeAt())) * 60 + (t[3].charCodeAt() - '0'.charCodeAt()) * 10 + (t[4].charCodeAt() - '0'.charCodeAt());
  }

  return ans;
};
 
// 2029. 石子游戏 IX 逻辑分析与总结
/**
 * @param {number[]} stones
 * @return {boolean}
 */
 var stoneGameIX = function(stones) {
  let cnt0 = 0, cnt1 = 0, cnt2 = 0;
  for (const val of stones) {
      const type = val % 3;
      if (type === 0) {
          ++cnt0;
      } else if (type === 1) {
          ++cnt1;
      } else {
          ++cnt2;
      }
  }
  if (cnt0 % 2 === 0) {
      return cnt1 >= 1 && cnt2 >= 1;
  }
  return cnt1 - cnt2 > 2 || cnt2 - cnt1 > 2;
};


// 1345. 跳跃游戏 IV dfs
/**
 * @param {number[]} arr
 * @return {number}
 */
 var minJumps = function(arr) {
  const l = arr.length;
  const map = new Map();
  for (let i = 0; i < l; i++) {
      if (map.has(arr[i])) {
          map.get(arr[i]).push(i);
      } else {
          map.set(arr[i], [i]);
      }
  }
  let queue = [0];
  let steps = 0;
  while (queue.length !== 0) {
      const m = queue.length;
      const newQueue = [];
      for (let i = 0; i < m; i++) {
          const index = queue[i];
          if (index === l - 1) {
              return steps;
          }
          const num = arr[index];
          arr[index] = null;
          if (index - 1 > 0 && arr[index-1] !== null) {
              newQueue.push(index - 1);
          }
          if ( arr[index+1] !== null) {
              newQueue.push(index + 1);
          }
          if (map.has(num)) {
              map.get(num).forEach(ind=>{
                  if ( arr[ind] !== null) {
                      newQueue.push(ind);
                  }
              })
              map.delete(num);
          }
      }
      queue = newQueue;
      steps++;
  }
};


// 1332. 删除回文子序列 就是判断是不是回文序列
/**
 * @param {string} s
 * @return {number}
 */
 var removePalindromeSub = function(s) {
  const n = s.length;
  for (let i = 0; i < Math.floor(n / 2); ++i) {
      if (s[i] !== s[n - 1 - i]) {
          return 2;
      }
  }
  return 1;
};

// 2045. 到达目的地的第二短时间  先求第二段路径 在算时间
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} time
 * @param {number} change
 * @return {number}
 */
 var secondMinimum = function(n, edges, time, change) {
  const graph = new Array(n + 1).fill(0).map(() => new Array());
  for (const edge of edges) {
      graph[edge[0]].push(edge[1]);
      graph[edge[1]].push(edge[0]);
  }

  // path[i][0] 表示从 1 到 i 的最短路长度，path[i][1] 表示从 1 到 i 的严格次短路长度
  const path = new Array(n + 1).fill(0).map(() => new Array(2).fill(Number.MAX_VALUE));
  path[1][0] = 0;
  const queue = [];
  queue.push([1, 0]);
  while (path[n][1] === Number.MAX_VALUE) {
      const [cur, len] = queue.shift();
      for (const next of graph[cur]) {
          if (len + 1 < path[next][0]) {
              path[next][0] = len + 1;
              queue.push([next, len + 1]);
          } else if (len + 1 > path[next][0] && len + 1 < path[next][1]) {
              path[next][1] = len + 1;
              queue.push([next, len + 1]);
          }
      }
  }

  let ret = 0;
  for (let i = 0; i < path[n][1]; i++) {
      if (ret % (2 * change) >= change) {
          ret = ret + (2 * change - ret % (2 * change));
      }
      ret = ret + time;
  }
  return ret;
};

// 1688. 比赛中的配对次数  每次比赛淘汰一人 ，最后决出一人，脑经急转弯
/**
 * @param {number} n
 * @return {number}
 */

 var numberOfMatches = function(n) {
  return n - 1
};

// 2013. 检测正方形  基础题 map记录
var DetectSquares = function() {
  this.cnt = new Map();
};

DetectSquares.prototype.add = function(point) {
  const x = point[0], y = point[1];
  if (!this.cnt.has(y)) {
      this.cnt.set(y, new Map());
  }
  const yCnt = this.cnt.get(y);
  yCnt.set(x, (yCnt.get(x) || 0) + 1);
};

DetectSquares.prototype.count = function(point) {
  let res = 0;
  let x = point[0], y = point[1];
  if (!this.cnt.has(y)) {
      return 0;
  }
  const yCnt = this.cnt.get(y);
  const entries = this.cnt.entries();
  for (const [col, colCnt] of entries) {
      if (col !== y) {
          // 根据对称性，这里可以不用取绝对值
          let d = col - y;
          res += (colCnt.get(x) || 0) * (yCnt.get(x + d) || 0) * (colCnt.get(x + d) || 0);
          res += (colCnt.get(x) || 0) * (yCnt.get(x - d) || 0) * (colCnt.get(x - d) || 0);
      }
  }
  return res;
};

// 2047. 句子中的有效单词数 逻辑判断题
/**
 * @param {string} sentence
 * @return {number}
 */
 var countValidWords = function(sentence) {
  const n = sentence.length;
  let l = 0, r = 0;
  let ret = 0;
  while (true) {
      while (l < n && sentence[l] === ' ') {
          l++;
      }
      if (l >= n) {
          break;
      }
      r = l + 1;
      while (r < n && sentence[r] != ' ') {
          r++;
      }
      if (isValid(sentence.slice(l, r))) { // 判断根据空格分解出来的 token 是否有效
          ret++;
      }
      l = r + 1;
  }
  return ret;

  function isValid(word) {
    const n = word.length;
    let hasHyphens = false;
    for (let i = 0; i < n; i++) {
        if (word[i] >= '0' && word[i] <= '9') {
            return false;
        } else if (word[i] === '-') {
            if (hasHyphens === true || i === 0 || i === n - 1 || !isLetter(word[i - 1]) || !isLetter(word[i + 1])) {
                return false;
            }
            hasHyphens = true;
        } else if (word[i] === '!' || word[i] === '.' || word[i] === ',') {
            if (i !== n - 1) {
                return false;
            }
        }
    }
    return true;

    function isLetter(ch) {
    if (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z') {
        return true;
    }
    return false;
    }
  }
};

// 1996. 游戏中弱角色的数量 排序
/**
 * @param {number[][]} properties
 * @return {number}
 */
 var numberOfWeakCharacters = function(properties) {
  properties.sort((o1, o2) => {
      return o1[0] === o2[0] ? (o1[1] - o2[1]) : (o2[0] - o1[0]);
  });
  let maxDef = 0;
  let ans = 0;
  for (const p of properties) {
      if (p[1] < maxDef) {
          ans++;
      } else {
          maxDef = p[1];
      }
  }
  return ans;
};


// 1405. 最长快乐字符串  贪心算法
/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {string}
 */
 var longestDiverseString = function(a, b, c) {
  const res = [];
  const arr = [[a, 'a'], [b, 'b'], [c, 'c']];
  
  while (true) {
      arr.sort((a, b) => b[0] - a[0]);
      let hasNext = false;
      for (const [i, [c, ch]] of arr.entries()) {
          if (c <= 0) {
              break;
          }
          const m = res.length;
          if (m >= 2 && res[m - 2] === ch && res[m - 1] === ch) {
              continue;
          }
          hasNext = true;
          res.push(ch);
          arr[i][0]--;
          break;
      }
      if (!hasNext) {
          break;
      }
  }
  
  return res.join('');
};

// 1001. 网格照明 map记录 灯位置 和灯光横纵对角线
/**
 * @param {number} n
 * @param {number[][]} lamps
 * @param {number[][]} queries
 * @return {number[]}
 */
 var gridIllumination = function(n, lamps, queries) {
  const row = new Map();
  const col = new Map();
  const diagonal = new Map();
  const antiDiagonal = new Map();
  const points = new Set();
  for (const lamp of lamps) {
      if (points.has(hash(lamp[0], lamp[1]))) {
          continue;
      }
      points.add(hash(lamp[0], lamp[1]));
      row.set(lamp[0], (row.get(lamp[0]) || 0) + 1);
      col.set(lamp[1], (col.get(lamp[1]) || 0) + 1);
      diagonal.set(lamp[0] - lamp[1], (diagonal.get(lamp[0] - lamp[1]) || 0) + 1);
      antiDiagonal.set(lamp[0] + lamp[1], (antiDiagonal.get(lamp[0] + lamp[1]) || 0) + 1);
  }
  const ret = new Array(queries.length).fill(0);
  for (const [i, [r, c]] of queries.entries()) {
      if (row.get(r) || col.get(c) || diagonal.get(r - c) || antiDiagonal.get(r + c)) {
          ret[i] = 1;
      }
      for (let x = r - 1; x < r + 2; x++) {
          for (let y = c - 1; y < c + 2; y++) {
              if (x < 0 || y < 0 || x >= n || y >= n || !points.has(hash(x, y))) {
                  continue;
              }
              points.delete(hash(x, y));
              row.set(x, row.get(x) - 1);
              col.set(y, col.get(y) - 1);
              diagonal.set(x - y, diagonal.get(x - y) - 1);
              antiDiagonal.set(x + y, antiDiagonal.get(x + y) - 1);
          }
      }
  }
  return ret;

  function  hash(x,y) {
      return  '' + x + y;
  }
}

// 2006. 差的绝对值为 K 的数对数目 map记录
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var countKDifference = function(nums, k) {
  let res = 0, n = nums.length;
  const cnt = new Map();
  for (let j = 0; j < n; ++j) {
      res += (cnt.get(nums[j] - k) || 0) + (cnt.get(nums[j] + k) || 0);
      cnt.set(nums[j], (cnt.get(nums[j]) || 0) + 1);
  }
  return res;
};

// 1447. 最简分数 基础题
/**
 * @param {number} n
 * @return {string[]}
 */
 var simplifiedFractions = function(n) {
  let result = [];
  for(let i = 1; i <= n-1; i++) {
      for(let j = i+1; j <= n; j++) {
          if(gcd(j, i) === 1) {
              result.push(`${i}/${j}`);
          }
      }
  }
  return result;
  function gcd(a, b) {
      while(b > 0) {
          return gcd(b, a%b);
      }
      return a;
  }
};

// 1984. 学生分数的最小差值 排序
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var minimumDifference = function(nums, k) {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  let ans = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < n - k + 1; i++) {
      ans = Math.min(ans, nums[i + k - 1] - nums[i]);
  }
  return ans;
};


// 540. 有序数组中的单一元素  二分查找
/**
 * @param {number[]} nums
 * @return {number}
 */
 var singleNonDuplicate = function(nums) {
  let low = 0, high = nums.length - 1;
  while (low < high) {
      const mid = Math.floor((high - low) / 2) + low;
      if (nums[mid] === nums[mid ^ 1]) {
          low = mid + 1;
      } else {
          high = mid;
      }
  }
  return nums[low];
};

// 1189. “气球” 的最大数量 基础题
/**
 * @param {string} text
 * @return {number}
 */
 var maxNumberOfBalloons = function(text) {
  let backup =[0,0,0,0,0];
  for (let index = 0; index < text.length; index++) {
      let char = text[index];
      switch (char) {
          case 'a':
              backup[0] +=1;
              break;
          case 'b':
                  backup[1] +=1;
                  break;
          case 'n':
                  backup[2] +=1;
                  break;
          case 'l':
                  backup[3] +=1;
                  break;
          case 'o':
                  backup[4] +=1;
                  break;
          default:
              break;
      }
  }
  return Math.min(backup[0],backup[1],backup[2],Math.floor(backup[3]/2),Math.floor(backup[4]/2))
};


// 1020. 飞地的数量 深度优先搜索 把相连的陆地标记好
/**
 * @param {number[][]} grid
 * @return {number}
 */
var numEnclaves = function(grid) {
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const m = grid.length;
  const n = grid[0].length;
  const visited = new Array(m).fill(0).map(() => new Array(n).fill(false));

  const dfs = (row, col) => {
      if (row < 0 || row >= m || col < 0 || col >= n || grid[row][col] == 0 || visited[row][col]) {
          return;
      }
      visited[row][col] = true;
      for (const dir of dirs) {
          dfs(row + dir[0], col + dir[1]);
      }
  };

  for (let i = 0; i < m; i++) {
      dfs(i, 0);
      dfs(i, n - 1);
  }
  for (let j = 1; j < n - 1; j++) {
      dfs(0, j);
      dfs(m - 1, j);
  }
  let enclaves = 0;
  for (let i = 1; i < m - 1; i++) {
      for (let j = 1; j < n - 1; j++) {
          if (grid[i][j] === 1 && !visited[i][j]) {
              enclaves++;
          }
      }
  }
  return enclaves;
}

// 1380. 矩阵中的幸运数  预处理
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
 var luckyNumbers  = function(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const minRow = new Array(m).fill(Number.MAX_SAFE_INTEGER);
  const maxCol = new Array(n).fill(0);
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          minRow[i] = Math.min(minRow[i], matrix[i][j]);
          maxCol[j] = Math.max(maxCol[j], matrix[i][j]);
      }
  }
  const ret = [];
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          if (matrix[i][j] === minRow[i] && matrix[i][j] === maxCol[j]) {
              ret.push(matrix[i][j]);
          }
      }
  }
  return ret;
};


// 面试题 17.16. 按摩师  动态规划 
/**
 * @param {number[]} nums
 * @return {number}
 */
 var massage = function(nums) {
  const len = nums.length;
  if (!len) return 0;
  const dp = [nums[0], Math.max(nums[0], nums[1])];
  for (let i = 2; i < len; i++) {
      dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }
  return dp[len - 1];
};
 
// 688. 骑士在棋盘上的概率  动态规划
/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
 
 var knightProbability = function(n, k, row, column) {
     const dirs = [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2]];
     const dp = new Array(k + 1).fill(0).map(() => new Array(n).fill(0).map(() => new Array(n).fill(0)));
     for (let step = 0; step <= k; step++) {
         for (let i = 0; i < n; i++) {
             for (let j = 0; j < n; j++) {
                 if (step === 0) {
                     dp[step][i][j] = 1;
                 } else {
                     for (const dir of dirs) {
                         const ni = i + dir[0], nj = j + dir[1];
                         if (ni >= 0 && ni < n && nj >= 0 && nj < n) {
                             dp[step][i][j] += dp[step - 1][ni][nj] / 8;
                         }
                     }
                 }
             }
         }
     }
     return dp[k][row][column];
 };


// 1791. 找出星型图的中心节点  基础题
/**
 * @param {number[][]} edges
 * @return {number}
 */
var findCenter = function(edges) {
  const n = edges.length + 1;
  const degrees = new Array(n + 1).fill(0);
  for (const edge of edges) {
      degrees[edge[0]]++;
      degrees[edge[1]]++;
  }
  for (let i = 1; i <= n; i++) {
      if (degrees[i] === n - 1) {
          return i;
      }
  }
  return 0;
};


// 717. 1 比特与 2 比特字符  基础题
/**
 * @param {number[]} bits
 * @return {boolean}
 */
 var isOneBitCharacter = function(bits) {
  let i = 0, n = bits.length;
  while (i < n - 1) {
      i += bits[i] + 1;
  }
  return i === n - 1;
};


// 969. 煎饼排序 每2次能把一个数调换到最好
/**
 * @param {number[]} arr
 * @return {number[]}
 */
 var pancakeSort = function(arr) {
  const ret = [];
  for (let n = arr.length; n > 1; n--) {
      let index = 0;
      for (let i = 1; i < n; i++) {
          if (arr[i] >= arr[index]) {
              index = i;
          }
      }
      if (index === n - 1) {
          continue;
      }
      reverse(arr, index);
      reverse(arr, n - 1);
      ret.push(index + 1);
      ret.push(n);
  }
  return ret;
  function reverse(arr, end) {
      for (let i = 0, j = end; i < j; i++, j--) {
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
      }
  };
}

// 838. 推多米诺 模拟
/**
 * @param {string} dominoes
 * @return {string}
 */
 var pushDominoes = function(dominoes) {
  const s = [...dominoes];
  let n = s.length, i = 0;
  let left = 'L';
  while (i < n) {
      let j = i;
      while (j < n && s[j] == '.') { // 找到一段连续的没有被推动的骨牌
          j++;
      }
      const right = j < n ? s[j] : 'R';
      if (left === right) { // 方向相同，那么这些竖立骨牌也会倒向同一方向
          while (i < j) {
              s[i++] = right;
          }
      } else if (left === 'R' && right === 'L') { // 方向相对，那么就从两侧向中间倒
          let k = j - 1;
          while (i < k) {
              s[i++] = 'R';
              s[k--] = 'L';
          }
      }
      left = right;
      i = j + 1;
  }
  return s.join('');
};

// 917. 仅仅反转字母 双指针
/**
 * @param {string} s
 * @return {string}
 */
 var reverseOnlyLetters = function(s) {
  const n = s.length;
  const arr = [...s];
  let left = 0, right = n - 1;
  while (left < right) {
      while (left < right && !(/^[a-zA-Z]+$/.test(s[left]))) { // 判断左边是否扫描到字母
          left++;
      }
      while (right > left && !(/^[a-zA-Z]+$/.test(s[right]))) { // 判断右边是否扫描到字母
          right--;
      }
      swap(arr, left, right);
      left++;
      right--;
  }
  return arr.join('');

  function swap(arr, left, right){
      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
  }
};

// 1706. 球会落何处 模拟
/**
 * @param {number[][]} grid
 * @return {number[]}
 */
 var findBall = function(grid) {
  const n = grid[0].length;
  const ans = new Array(n).fill(-1);
  for (let j = 0; j < n; j++) {
      let col = j;  // 球的初始列
      for (const row of grid) {
          const dir = row[col];
          col += dir;  // 移动球
          if (col < 0 || col === n || row[col] !== dir) {  // 到达侧边或 V 形
              col = -1;
              break;
          }
      }
      if (col >= 0) {  // 成功到达底部
          ans[j] = col;
      }
  }
  return ans;
};

// 537. 复数乘法 模拟
var complexNumberMultiply = function(num1, num2) {
  const complex1 = [num1.split("+")[0], num1.split("+")[1].split("i")[0]];
  const complex2 = [num2.split("+")[0], num2.split("+")[1].split("i")[0]];
  const real1 = parseInt(complex1[0]);
  const imag1 = parseInt(complex1[1]);
  const real2 = parseInt(complex2[0]);
  const imag2 = parseInt(complex2[1]);
  return '' + real1 * real2 - imag1 * imag2 + '+' + (real1 * imag2 + imag1 * real2) + 'i';
};

// 2016. 增量元素之间的最大差值 基础题
/**
 * @param {number[]} nums
 * @return {number}
 */
 var maximumDifference = function(nums) {
  const n = nums.length;
  let ans = -1, premin = nums[0];
  for (let i = 1; i < n; ++i) {
      if (nums[i] > premin) {
          ans = Math.max(ans, nums[i] - premin);
      } else {
          premin = nums[i];
      }
  }
  return ans;
};

// 553. 最优除法 贪心算法

/**
 * @param {number[]} nums
 * @return {string}
 */
 var optimalDivision = function(nums) {
  const ans = [], n = nums.length
  ans.push(nums[0])
  if(n > 1) {
      ans.push("/")
      if(n > 2)
          ans.push("(")
      ans.push(nums[1])
      for(let i = 2; i < n; i++) {
          ans.push("/")
          ans.push(nums[i])
      }
      if(n > 2)
          ans.push(")")
  }
  return ans.join("")
};

// 1601. 最多可达成的换楼请求数目 选或者不选 遍历 
/**
 * @param {number} n
 * @param {number[][]} requests
 * @return {number}
 */
 var maximumRequests = function(n, requests) {
  const delta = new Array(n).fill(0);
  let zero = n, ans = 0, cnt = 0;
  const dfs = (requests, pos) => {
      if (pos === requests.length) {
          if (zero === n) {
              ans = Math.max(ans, cnt);
          }
          return;
      }

      // 不选 requests[pos]
      dfs(requests, pos + 1);

      // 选 requests[pos]
      let z = zero;
      ++cnt;
      const r = requests[pos];
      let x = r[0], y = r[1];
      zero -= delta[x] == 0 ? 1 : 0;
      --delta[x];
      zero += delta[x] == 0 ? 1 : 0;
      zero -= delta[y] == 0 ? 1 : 0;
      ++delta[y];
      zero += delta[y] == 0 ? 1 : 0;
      dfs(requests, pos + 1);
      --delta[y];
      ++delta[x];
      --cnt;
      zero = z;
  }
  dfs(requests, 0);
  return ans;
};

// 6. Z 字形变换 数组记录 轮训添加
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
 var convert = function(s, numRows) {
  const n = s.length, r = numRows;
  if (r === 1 || r >= n) {
      return s;
  }
  const mat = new Array(r).fill(0);
  for (let i = 0; i < r; ++i) {
      mat[i] = [];
  }
  for (let i = 0, x = 0, t = r * 2 - 2; i < n; ++i) {
      mat[x].push(s[i]);
      if (i % t < r - 1) {
          ++x;
      } else {
          --x;
      }
  }
  const ans = [];
  for (const row of mat) {
      ans.push(row.join(''));
  }
  return ans.join('');
};

// 258. 各位相加  数学题
/**
 * @param {number} num
 * @return {number}
 */
 var addDigits = function(num) {
  return (num - 1) % 9 + 1;
};

// 2104. 子数组范围和 模拟遍历
/**
 * @param {number[]} nums
 * @return {number}
 */
 var subArrayRanges = function(nums) {
  let result = 0;
  const len = nums.length;
  for (var i = 0; i < len; i++) {
      let min = nums[i], max = min;
      for (var j = i + 1; j < len; j++) {
          min = Math.min(nums[j], min);
          max = Math.max(nums[j], max);
          result += max - min;
      }
  }
  return result;
};

// 504. 七进制数 基础题
/**
 * @param {number} num
 * @return {string}
 */
 var convertToBase7 = function(num) {
  if (num === 0) {
      return "0";
  }
  let negative = num < 0;
  num = Math.abs(num);
  const digits = [];
  while (num > 0) {
      digits.push(num % 7);
      num = Math.floor(num / 7);
  }
  if (negative) {
      digits.push('-');
  }
  return digits.reverse().join('');
};


// 521. 最长特殊序列 Ⅰ  脑筋急转弯
/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */

 var findLUSlength = function(a, b) {
  return a !== b ? Math.max(a.length, b.length) : -1;
};

// 2100. 适合打劫银行的日子 先算出每天递增递减天数，在进行判断
/**
 * @param {number[]} security
 * @param {number} time
 * @return {number[]}
 */
 var goodDaysToRobBank = function(security, time) {
  const n = security.length;
  const left = new Array(n).fill(0);
  const right = new Array(n).fill(0);
  for (let i = 1; i < n; i++) {
      if (security[i] <= security[i - 1]) {
          left[i] = left[i - 1] + 1;
      }
      if (security[n - i - 1] <= security[n - i]) {
          right[n - i - 1] = right[n - i] + 1;
      }
  }

  const ans = [];
  for (let i = time; i < n - time; i++) {
      if (left[i] >= time && right[i] >= time) {
          ans.push(i);    
      }
  }
  return ans;
};

//  2055. 蜡烛之间的盘子 基础题 预处理
/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
 var platesBetweenCandles = function(s, queries) {
  const n = s.length;
  const preSum = new Array(n).fill(0);
  for (let i = 0, sum = 0; i < n; i++) {
      if (s[i] === '*') {
          sum++;
      }
      preSum[i] = sum;
  }
  const left = new Array(n).fill(0);;
  for (let i = 0, l = -1; i < n; i++) {
      if (s[i] === '|') {
          l = i;
      }
      left[i] = l;
  }
  const right = new Array(n).fill(0);;
  for (let i = n - 1, r = -1; i >= 0; i--) {
      if (s[i] === '|') {
          r = i;
      }
      right[i] = r;
  }
  const ans = new Array(queries.length).fill(0);
  for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      const x = right[query[0]], y = left[query[1]];
      ans[i] = x === -1 || y === -1 || x >= y ? 0 : preSum[y] - preSum[x];
  }
  return ans;
};

// 798. 得分最高的最小轮调 差分
/**
 * @param {number[]} nums
 * @return {number}
 */
 var bestRotation = function(nums) {
  const n = nums.length;
  const diffs = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
      const low = (i + 1) % n;
      const high = (i - nums[i] + n + 1) % n;
      diffs[low]++;
      diffs[high]--;
      if (low >= high) {
          diffs[0]++;
      }
  }
  let bestIndex = 0;
  let maxScore = 0;
  let score = 0;
  for (let i = 0; i < n; i++) {
      score += diffs[i];
      if (score > maxScore) {
          bestIndex = i;
          maxScore = score;
      }
  }
  return bestIndex;
};

// 589. N 叉树的前序遍历 递归调用
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
 var preorder = function(root) {
   let res = []
   dfs(root)
   return res;
   
   function dfs(node) {
     if(node) {
       res.push(node.val)
     }
     if(node && node.children) {
       for (let i = 0; i < node.children.length; i++) {
         dfs(node.children[i])
       }
     }
   }
    
};


// 2049. 统计最高分的节点数目  深度遍历
/**
 * @param {number[]} parents
 * @return {number}
 */
 var countHighestScoreNodes = function(parents) {
  const n = parents.length;
  const children = new Array(n).fill(0);
  let maxScore = 0;
  let cnt = 0;
  for (let i = 0; i < n; i++) {
      children[i] = [];
  }
  for (let i = 0; i < n; i++) {
      const p = parents[i];
      if (p !== -1) {
          children[p].push(i);
      }
  }

  const dfs = (node) => {
      let score = 1;
      let size = n - 1;
      for (const c of children[node]) {
          let t = dfs(c);
          score *= t;
          size -= t;
      }
      if (node !== 0) {
          score *= size;
      }
      if (score === maxScore) {
          cnt++;
      } else if (score > maxScore) {
          maxScore = score;
          cnt = 1;
      }
      return n - size;
  }

  dfs(0);
  return cnt;
};

// 720. 词典中最长的单词  集合
/**
 * @param {string[]} words
 * @return {string}
 */
 var longestWord = function(words) {
  words.sort((a, b) => {
      if (a.length !== b.length) {
          return a.length - b.length;
      } else {
          return b.localeCompare(a);
      }
  })
  let longest = "";
  let set = new Set();
  set.add("");
  const n = words.length;
  for (let i = 0; i < n; i++) {
      const word = words[i];
      if (set.has(word.slice(0, word.length - 1))) {
          set.add(word);
          longest = word;
      }
  }
  return longest;
};

// 2043. 简易银行系统 模拟
/**
 * @param {number[]} balance
 */
 var Bank = function(balance) {
  this.balance = balance;
};

Bank.prototype.transfer = function(account1, account2, money) {
  if (account1 > this.balance.length || account2 > this.balance.length || this.balance[account1 - 1] < money) {
      return false;
  }
  this.balance[account1 - 1] -= money;
  this.balance[account2 - 1] += money;
  return true;
};

Bank.prototype.deposit = function(account, money) {
  if (account > this.balance.length) {
      return false;
  }
  this.balance[account - 1] += money;
  return true;
};

Bank.prototype.withdraw = function(account, money) {
  if (account > this.balance.length || this.balance[account - 1] < money) {
      return false;
  }
  this.balance[account - 1] -= money;
  return true;
};


// 653. 两数之和 IV - 输入 BST 遍历存贮
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
 var findTarget = function(root, k) {
  const set = new Set();
  const helper = (root, k) => {
      if (!root) {
          return false;
      }
      if (set.has(k - root.val)) {
          return true;
      }
      set.add(root.val);
      return helper(root.left, k) || helper(root.right, k);
  }
  return helper(root, k);
};

// 2038. 如果相邻两个颜色均相同则删除当前颜色 贪心统计操作次数
/**
 * @param {string} colors
 * @return {boolean}
 */
 var winnerOfGame = function(colors) {
  const freq = [0, 0];
  let cur = 'C';
  let cnt = 0;
  for (let i = 0; i < colors.length; i++) {
      const c = colors[i];
      if (c !== cur) {
          cur = c;
          cnt = 1;
      } else {
          cnt += 1;
          if (cnt >= 3) {
              freq[cur.charCodeAt() - 'A'.charCodeAt()] += 1;
          }
      }
  }            
  return freq[0] > freq[1];
};


// 606. 根据二叉树创建字符串  递归
/**
 * @param {TreeNode} root
 * @return {string}
 */
 var tree2str = function(root) {
  if (!root) {
      return "";
  }
  if (!root.left && !root.right) {
      return '' + root.val;
  }
  if (!root.right) {
      return root.val + '(' + tree2str(root.left) + ')';
  }
  return root.val + '(' + tree2str(root.left) + ')(' + tree2str(root.right) + ')';
};

// 2039. 网络空闲的时刻 广度遍历
/**
 * @param {number[][]} edges
 * @param {number[]} patience
 * @return {number}
 */
 var networkBecomesIdle = function(edges, patience) {
  const grah = new Map // 构造无向图
  for (const [x, y] of edges) { 
    grah.get(x) ? grah.get(x).push(y) : grah.set(x, [y])
    grah.get(y) ? grah.get(y).push(x) : grah.set(y, [x])
  }
  const queue = [0], visited = new Set([0])
  let index = 0, distance = 0, maxIdleTime = 0
  while (index < queue.length) { // 广度优先搜索，移动 index 指针，提高性能
    distance++
    const length = queue.length
    while (index < length) {
      const tmp = grah.get(queue[index++])
      for (const child of tmp) {
        if(visited.has(child)) continue // 记录已访问过的节点，避免重复遍历
        visited.add(child)
        const idleTime = ((2 * distance - 1) / patience[child] | 0) * patience[child] + 2 * distance + 1
        if (idleTime > maxIdleTime) maxIdleTime = idleTime // 计算空闲时间，更新最大值
        queue.push(child)
      }
    }
  }
  return maxIdleTime
};


// 440. 字典序的第K小数字 问题是给你一个数，找其中还有多少数字
/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
 var findKthNumber = function(n, k) {
  let curr = 1;
  k--;
  while (k > 0) {
      const steps = getSteps(curr, n);
      if (steps <= k) {
          k -= steps;
          curr++;
      } else {
          curr = curr * 10;
          k--;
      }
  }
  return curr;

  function getSteps (curr, n) {
      let steps = 0;
      let first = curr;
      let last = curr;
      while (first <= n) {
          steps += Math.min(last, n) - first + 1;
          first = first * 10;
          last = last * 10 + 9;
      }
      return steps;
  };
}

// 661. 图片平滑器  模拟
/**
 * @param {number[][]} img
 * @return {number[][]}
 */
 var imageSmoother = function(img) {
  const m = img.length, n = img[0].length;
  const ret = new Array(m).fill(0).map(() => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          let num = 0, sum = 0;
          for (let x = i - 1; x <= i + 1; x++) {
              for (let y = j - 1; y <= j + 1; y++) {
                  if (x >= 0 && x < m && y >= 0 && y < n) {
                      num++;
                      sum += img[x][y];
                  }
              }
          }
          ret[i][j] = Math.floor(sum / num);
      }
  }
  return ret;
};

// 172. 阶乘后的零 基础数学题
/**
 * @param {number} n
 * @return {number}
 */
 var trailingZeroes = function(n) {
  let ans = 0;
  while (n !== 0) {
      n = Math.floor(n / 5);
      ans += n;
  }
  return ans;
};

//  682. 棒球比赛 模拟
/**
 * @param {string[]} ops
 * @return {number}
 */
 var calPoints = function(ops) {
  let ret = 0;
  const points = [];
  for (const op of ops) {
      const n = points.length;
      switch (op[0]) {
          case '+':
              ret += points[n - 1] + points[n - 2];
              points.push(points[n - 1] + points[n - 2]);
              break;
          case 'D':
              ret += 2 * points[n - 1];
              points.push(2 * points[n - 1]);
              break;
          case 'C':
              ret -= points[n - 1];
              points.pop();
              break;
          default:
              ret += parseInt(op);
              points.push(parseInt(op));
              break;
      }
  }
  return ret;
};

// 693. 交替位二进制数  位运算
/**
 * @param {number} n
 * @return {boolean}
 */
 var hasAlternatingBits = function(n) {
  const a = n ^ (n >> 1);
  return (a & (a + 1)) === 0;
};

// 2028. 找出缺失的观测数据  基础题
/**
 * @param {number[]} rolls
 * @param {number} mean
 * @param {number} n
 * @return {number[]}
 */
 var missingRolls = function(rolls, mean, n) {
  const m = rolls.length;
  const sum = mean * (n + m);
  let missingSum = sum;
  for (const roll of rolls) {
      missingSum -= roll;
  }
  if (missingSum < n || missingSum > 6 * n) {
      return [];
  }
  const quotient = Math.floor(missingSum / n), remainder = missingSum % n;
  const missing = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
      missing[i] = quotient + (i < remainder ? 1 : 0);
  }
  return missing;
};

// 2024. 考试的最大困扰度  窗口
/**
 * @param {string} answerKey
 * @param {number} k
 * @return {number}
 */
 var maxConsecutiveAnswers = function(answerKey, k) {
  return Math.max(maxConsecutiveChar(answerKey, k, 'T'), maxConsecutiveChar(answerKey, k, 'F'));
  function maxConsecutiveChar(answerKey, k, ch) {
  const n = answerKey.length;
  let ans = 0;
  for (let left = 0, right = 0, sum = 0; right < n; right++) {
      sum += answerKey.charAt(right) !== ch ? 1 : 0;
      while (sum > k) {
          sum -= answerKey[left++] !== ch ? 1 : 0;
      }
      ans = Math.max(ans, right - left + 1);
  }
  return ans;
};
}

//  728. 自除数 基础逻辑
/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
 var selfDividingNumbers = function(left, right) {
  const ans = [];
  for (let i = left; i <= right; i++) {
      if (isSelfDividing(i)) {
          ans.push(i);
      }
  }
  return ans;

  function isSelfDividing (num)  {
      let temp = num;
      while (temp > 0) {
          const digit = temp % 10;
          if (digit === 0 || num % digit !== 0) {
              return false;
          }
          temp = Math.floor(temp / 10);
      }
      return true;
  };
}

// 954. 二倍数对数组 排序+map
/**
 * @param {number[]} arr
 * @return {boolean}
 */
 var canReorderDoubled = function(arr) {
  const cnt = new Map();
  for (const x of arr) {
      cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  if ((cnt.get(0) || 0) % 2 !== 0) {
      return false;
  }

  const vals = [];
  for (const x of cnt.keys()) {
      vals.push(x);
  }
  vals.sort((a, b) => Math.abs(a) - Math.abs(b));

  for (const x of vals) {
      if ((cnt.get(2 * x) || 0) < cnt.get(x)) { // 无法找到足够的 2x 与 x 配对
          return false;
      }
      cnt.set(2 * x, (cnt.get(2 * x) || 0) - cnt.get(x));
  }
  return true;
};

// 420. 强密码检验器
/**
 * @param {string} password
 * @return {number}
 */
 var strongPasswordChecker = function(password) {
  const n = password.length;
  let hasLower = 0, hasUpper = 0, hasDigit = 0;
  for (let i = 0; i < n; ++i) {
      const ch = password[i];
      if (isLowerCase(ch)) {
          hasLower = 1;
      } else if (isUpperCase(ch)) {
          hasUpper = 1;
      } else if (isDigit(ch)) {
          hasDigit = 1;
      }
  }
  const categories = hasLower + hasUpper + hasDigit;

  if (n < 6) {
      return Math.max(6 - n, 3 - categories);
  } else if (n <= 20) {
      let replace = 0;
      let cnt = 0;
      let cur = '#';

      for (let i = 0; i < n; ++i) {
          const ch = password[i];
          if (ch === cur) {
              ++cnt;
          } else {
              replace += Math.floor(cnt / 3);
              cnt = 1;
              cur = ch;
          }
      }
      replace += Math.floor(cnt / 3);
      return Math.max(replace, 3 - categories);
  } else {
      // 替换次数和删除次数
      let replace = 0, remove = n - 20;
      // k mod 3 = 1 的组数，即删除 2 个字符可以减少 1 次替换操作
      let rm2 = 0;
      let cnt = 0;
      let cur = '#';

      for (let i = 0; i < n; ++i) {
          const ch = password[i];
          if (ch === cur) {
              ++cnt;
          } else {
              if (remove > 0 && cnt >= 3) {
                  if (cnt % 3 === 0) {
                      // 如果是 k % 3 = 0 的组，那么优先删除 1 个字符，减少 1 次替换操作
                      --remove;
                      --replace;
                  } else if (cnt % 3 === 1) {
                      // 如果是 k % 3 = 1 的组，那么存下来备用
                      ++rm2;
                  }
                  // k % 3 = 2 的组无需显式考虑
              }
              replace += Math.floor(cnt / 3);
              cnt = 1;
              cur = ch;
          }
      }
      if (remove > 0 && cnt >= 3) {
          if (cnt % 3 === 0) {
              --remove;
              --replace;
          } else if (cnt % 3 === 1) {
              ++rm2;
          }
      }
      replace += Math.floor(cnt / 3);

      // 使用 k % 3 = 1 的组的数量，由剩余的替换次数、组数和剩余的删除次数共同决定
      const use2 = Math.min(Math.min(replace, rm2), Math.floor(remove / 2));
      replace -= use2;
      remove -= use2 * 2;
      // 由于每有一次替换次数就一定有 3 个连续相同的字符（k / 3 决定），因此这里可以直接计算出使用 k % 3 = 2 的组的数量
      const use3 = Math.min(replace, Math.floor(remove / 3));
      replace -= use3;
      remove -= use3 * 3;
      return (n - 20) + Math.max(replace, 3 - categories);
  }

  function isLowerCase(ch) {
      return 'a' <= ch && ch <= 'z';
  }

  function isUpperCase(ch) {
      return 'A' <= ch && ch <= 'Z';
  }

  function isDigit(ch) {
      return parseFloat(ch).toString() === "NaN" ? false : true;
  }
};

// 744. 寻找比目标字母大的最小字母  二分查找
/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
 var nextGreatestLetter = function(letters, target) {
  const length = letters.length;
  if (target >= letters[length - 1]) {
      return letters[0];
  }
  let low = 0, high = length - 1;
  while (low < high) {
      const mid = Math.floor((high - low) / 2) + low;
      if (letters[mid] > target) {
          high = mid;
      } else {
          low = mid + 1;
      }
  }
  return letters[low];
};


// 310. 最小高度树  深度遍历
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
 var findMinHeightTrees = function(n, edges) {
  const ans = [];
  if (n === 1) {
      ans.push(0);
      return ans;
  }
  const adj = new Array(n).fill(0).map(() => new Array());
  for (const edge of edges) {
      adj[edge[0]].push(edge[1]);
      adj[edge[1]].push(edge[0]);
  }

  const parent = new Array(n).fill(-1);
  /* 找到与节点 0 最远的节点 x */
  const x = findLongestNode(0, parent, adj);
  /* 找到与节点 x 最远的节点 y */
  let y = findLongestNode(x, parent, adj);
  /* 求出节点 x 到节点 y 的路径 */
  const path = [];
  parent[x] = -1;
  while (y !== -1) {
      path.push(y);
      y = parent[y];
  }
  const m = path.length;
  if (m % 2 === 0) {
      ans.push(path[Math.floor(m / 2) - 1]);
  }
  ans.push(path[Math.floor(m / 2)]);
  return ans;
  
  function findLongestNode (u, parent, adj) {
      const n = adj.length;
      const queue = [];
      const visit = new Array(n).fill(false);
      queue.push(u);
      visit[u] = true;
      let node = -1;

      while (queue.length) {
          const curr = queue.shift();
          node = curr;
          for (const v of adj[curr]) {
              if (!visit[v]) {
                  visit[v] = true;
                  parent[v] = curr;
                  queue.push(v);
              }
          }
      }
      return node;
  };
}


// 796. 旋转字符串长  长度相等A+A 包含A 就可以了
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
 var rotateString = function(s, goal) {
  return s.length === goal.length && (s + s).indexOf(goal) !== -1;
};

// 307. 区域和检索 - 数组可修改 树状数组
/**
 * @param {number[]} nums
 */
 var NumArray = function(nums) {
  this.tree = new Array(nums.length + 1).fill(0);
  this.nums = nums;
  for (let i = 0; i < nums.length; i++) {
      this.add(i + 1, nums[i]);
  }
};

NumArray.prototype.update = function(index, val) {
  this.add(index + 1, val - this.nums[index]);
  this.nums[index] = val;
};

NumArray.prototype.sumRange = function(left, right) {
  return this.prefixSum(right + 1) - this.prefixSum(left);
};

NumArray.prototype.lowBit = function(x) {
  return x & -x;
}

NumArray.prototype.add = function(index, val) {
  while (index < this.tree.length) {
      this.tree[index] += val;
      index += this.lowBit(index);
  }
}

NumArray.prototype.prefixSum = function(index) {
  let sum = 0;
  while (index > 0) {
      sum += this.tree[index];
      index -= this.lowBit(index);
  }
  return sum;
}

//  429. N 叉树的层序遍历 循环
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
 var levelOrder = function(root) {
  if (!root) {
      return [];
  }

  const ans = [];
  const queue = [root];

  while (queue.length) {
      const cnt = queue.length;
      const level = [];
      for (let i = 0; i < cnt; ++i) {
          const cur = queue.shift();
          level.push(cur.val);
          for (const child of cur.children) {
              queue.push(child);
          }
      }
      ans.push(level);
  }

  return ans;
};

// 762. 二进制表示中质数个计算置位 基础题
/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
 var countPrimeSetBits = function(left, right) {
  let ans = 0;
  for (let x = left; x <= right; ++x) {
      if (isPrime(bitCount(x))) {
          ++ans;
      }
  }
  return ans;

  function isPrime(x) {
      if (x < 2) {
          return false;
      }
      for (let i = 2; i * i <= x; ++i) {
          if (x % i === 0) {
              return false;
          }
      }
      return true;
  }

  function bitCount(x) {
      return x.toString(2).split('0').join('').length;
  }
};

// 780. 到达终点 反向操作
/**
 * @param {number} sx
 * @param {number} sy
 * @param {number} tx
 * @param {number} ty
 * @return {boolean}
 */
 var reachingPoints = function(sx, sy, tx, ty) {
  while (tx > sx && ty > sy && tx != ty) {
      if (tx > ty) {
          tx %= ty;
      } else {
          ty %= tx;
      }
  }
  if (tx === sx && ty === sy) {
      return true;
  } else if (tx === sx) {
      return ty > sy && (ty - sy) % tx === 0;
  } else if (ty === sy) {
      return tx > sx && (tx - sx) % ty === 0;
  } else {
      return false;
  }
};

// 804. 唯一摩尔斯密码词 map
/**
 * @param {string[]} words
 * @return {number}
 */

 var uniqueMorseRepresentations = function(words) {
  const MORSE = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
  const seen = new Set();
  for (const word of words) {
      let code = '';
      for (const ch of word) {
          code += (MORSE[ch.charCodeAt() - 'a'.charCodeAt()]);
      }
      seen.add(code);
  }
  return seen.size;
}

// 357. 统计各位数字都不同的数字个数 数学题
/**
 * @param {number} n
 * @return {number}
 */
 var countNumbersWithUniqueDigits = function(n) {
  if (n === 0) {
      return 1;
  }
  if (n === 1) {
      return 10;
  }
  let res = 10, cur = 9;
  for (let i = 0; i < n - 1; i++) {
      cur *= 9 - i;
      res += cur;
  }
  return res;
};

//  806. 写字符串需要的行数 基础题
var numberOfLines = function(widths, s) {
  let lines = 1;
  let width = 0;
  for (let i = 0; i < s.length; i++) {
      const need = widths[s[i].charCodeAt() - 'a'.charCodeAt()];
      width += need;
      if (width > 100) {
          lines++;
          width = need;
      }
  }
  return [lines, width];
};


// 380. O(1) 时间插入、删除和获取随机元素 基础题
var RandomizedSet = function() {
  this.nums = [];
  this.indices = new Map();
};

RandomizedSet.prototype.insert = function(val) {
  if (this.indices.has(val)) {
      return false;
  }
  let index = this.nums.length;
  this.nums.push(val);
  this.indices.set(val, index);
  return true;
};

RandomizedSet.prototype.remove = function(val) {
  if (!this.indices.has(val)) {
      return false;
  }
  let id = this.indices.get(val);
  this.nums[id] = this.nums[this.nums.length - 1];
  this.indices.set(this.nums[id], id);
  this.nums.pop();
  this.indices.delete(val);
  return true;
};

RandomizedSet.prototype.getRandom = function() {
  const randomIndex = Math.floor(Math.random() * this.nums.length);
  return this.nums[randomIndex];
};


// 1672. 最富有客户的资产总量 基础遍历题
/**
 * @param {number[][]} accounts
 * @return {number}
 */

 var maximumWealth = function(accounts) {
  let maxWealth = -Number.MAX_VALUE;
  for (const account of accounts) {
      maxWealth = Math.max(maxWealth, account.reduce((a, b) => a + b));
  }
  return maxWealth;
};

// 385. 迷你语法分析器  基础遍历题
/**
 * @param {string} s
 * @return {NestedInteger}
 */
 var deserialize = function(s) {
  let index = 0;
  const dfs = (s) => {
      if (s[index] === '[') {
          index++;
          const ni = new NestedInteger();
          while (s[index] !== ']') {
              ni.add(dfs(s));
              if (s[index] === ',') {
                  index++;
              }
          }
          index++;
          return ni;
      } else {
          let negative = false;
          if (s[index] === '-') {
              negative = true;
              index++;
          }
          let num = 0;
          while (index < s.length && isDigit(s[index])) {
              num = num * 10 + s[index].charCodeAt() - '0'.charCodeAt();
              index++;
          }
          if (negative) {
              num *= -1;
          }
          return new NestedInteger(num);
      }
  }
  return dfs(s);
  function isDigit(ch) {
      return parseFloat(ch).toString() === "NaN" ? false : true;
  }
};
 
// 386. 字典序排数 基础题
/**
 * @param {number} n
 * @return {number[]}
 */
 var lexicalOrder = function(n) {
  const ret = [];
  let number = 1;
  for (let i = 0; i < n; i++) {
      ret.push(number);
      if (number * 10 <= n) {
          number *= 10;
      } else {
          while (number % 10 === 9 || number + 1 > n) {
              number = Math.floor(number / 10);
          }
          number++;
      }
  }
  return ret;
};

// 479. 最大回文数乘积 枚举
/**
 * @param {number} n
 * @return {number}
 */
 var largestPalindrome = function(n) {
  if (n === 1) {
      return 9;
  }
  const upper = 10 ** n - 1;
  for (let left = upper; left > upper / 10; left--) {
      let right = String(left).split('').reverse().join('');
      let p = BigInt(String(left) + right)    //得到回文数
      let x = BigInt(upper);
      while (x * x >= p) {
          if (p % x === BigInt(0)) { // x 是 p 的因子
              return p % BigInt(1337);
          }
          x--;
      }
  }
};


// 819. 最常见的单词  集合映射
/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
 var mostCommonWord = function(paragraph, banned) {
  const bannedSet = new Set();
  for (const word of banned) {
      bannedSet.add(word);
  }
  let maxFrequency = 0;
  const frequencies = new Map();
  let sb = '';
  const length = paragraph.length;
  for (let i = 0; i <= length; i++) {
      if (i < length && isLetter(paragraph[i])) {
          sb = sb + paragraph[i].toLowerCase();
      } else if (sb.length > 0) {
          if (!bannedSet.has(sb)) {
              const frequency = (frequencies.get(sb) || 0) + 1;
              frequencies.set(sb, frequency);
              maxFrequency = Math.max(maxFrequency, frequency);
          }
          sb = '';
      }
  }
  let mostCommon = "";
  for (const [word, frequency] of frequencies.entries()) {
      if (frequency === maxFrequency) {
          mostCommon = word;
          break;
      }
  }
  return mostCommon;
  function isLetter(ch) {
      return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
  }
};

// 821. 字符的最短距离 两次 遍历
/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
 var shortestToChar = function(s, c) {
  const n = s.length;
  const ans = new Array(n).fill(0);

  for (let i = 0, idx = -n; i < n; ++i) {
      if (s[i] === c) {
          idx = i;
      }
      ans[i] = i - idx;
  }

  for (let i = n - 1, idx = 2 * n; i >= 0; --i) {
      if (s[i] == c) {
          idx = i;
      }
      ans[i] = Math.min(ans[i], idx - i);
  }
  return ans;
};

// 388. 文件的最长绝对路径 遍历
/**
 * @param {string} input
 * @return {number}
 */
 var lengthLongestPath = function(input) {
  const n = input.length;
  let pos = 0;
  let ans = 0;
  const level = new Array(n + 1).fill(0);

  while (pos < n) {
      /* 检测当前文件的深度 */
      let depth = 1;
      while (pos < n && input[pos] === '\t') {
          pos++;
          depth++;
      }
      /* 统计当前文件名的长度 */   
      let len = 0; 
      let isFile = false;     
      while (pos < n && input[pos] !== '\n') {
          if (input[pos] === '.') {
              isFile = true;
          }
          len++;
          pos++;
      }
      /* 跳过换行符 */
      pos++;

      if (depth > 1) {
          len += level[depth - 1] + 1;
      }
      if (isFile) {
          ans = Math.max(ans, len);
      } else {
          level[depth] = len;
      }
  }
  return ans;
}

// 824. 山羊拉丁文 模拟
/**
 * @param {string} sentence
 * @return {string}
 */
 var toGoatLatin = function(sentence) {
  const vowels = new Set();
  vowels.add('a');
  vowels.add('e');
  vowels.add('i');
  vowels.add('o');
  vowels.add('u');
  vowels.add('A');
  vowels.add('E');
  vowels.add('I');
  vowels.add('O');
  vowels.add('U');
  return sentence.split(" ").map((i, idx) => {
      const res = new Array()
      if(vowels.has(i.charAt(0))) {
          res.push(i)
      } else {
          res.push(i.substring(1))
          res.push(i.substring(0, 1))
      }
      res.push("ma")
      for(let j = 0; j <= idx; j++)
          res.push("a")
      return res.join("")
  }).join(" ")
};


//  396. 旋转函数 迭代
/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxRotateFunction = function(nums) {
  let f = 0, n = nums.length, numSum = _.sum(nums);
  for (let i = 0; i < n; i++) {
      f += i * nums[i];
  }
  let res = f;
  for (let i = n - 1; i > 0; i--) {
      f += numSum - n * nums[i];
      res = Math.max(res, f);
  }
  return res;
};

// 868. 二进制间距 基础位运算
/**
 * @param {number} n
 * @return {number}
 */
 var binaryGap = function(n) {
  let last = -1, ans = 0;
  for (let i = 0; n != 0; ++i) {
      if ((n & 1) === 1) {
          if (last !== -1) {
              ans = Math.max(ans, i - last);
          }
          last = i;
      }
      n >>= 1;
  }
  return ans;
};

// 883. 三维形体投影面积 基础计算
/**
 * @param {number[][]} grid
 * @return {number}
 */
 var projectionArea = function(grid) {
  const n = grid.length;
  let xyArea = 0, yzArea = 0, zxArea = 0;
  for (let i = 0; i < n; i++) {
      let yzHeight = 0, zxHeight = 0;
      for (let j = 0; j < n; j++) {
          xyArea += grid[i][j] > 0 ? 1 : 0;
          yzHeight = Math.max(yzHeight, grid[i][j]);
          zxHeight = Math.max(zxHeight, grid[j][i]);
      }
      yzArea += yzHeight;
      zxArea += zxHeight;
  }
  return xyArea + yzArea + zxArea;
};

// 398. 随机数索引  哈希表
/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
  this.pos = new Map();
  for (let i = 0; i < nums.length; ++i) {
      if (!this.pos.has(nums[i])) {
          this.pos.set(nums[i], []);
      }
      
      this.pos.get(nums[i]).push(i);
  }
};

Solution.prototype.pick = function(target) {
  const indices = this.pos.get(target);
  return indices[Math.floor(Math.random() * indices.length)];
};

// 417. 太平洋大西洋水流问题 深度遍历搜索
/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
 var pacificAtlantic = function(heights) {
  let dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  m = heights.length;
  n = heights[0].length;
  const pacific = new Array(m).fill(0).map(() => new Array(n).fill(0));
  const atlantic = new Array(m).fill(0).map(() => new Array(n).fill(0));

  const dfs = (row, col, ocean) => {
      if (ocean[row][col]) {
          return;
      }
      ocean[row][col] = true;
      for (const dir of dirs) {
          const newRow = row + dir[0], newCol = col + dir[1];
          if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && heights[newRow][newCol] >= heights[row][col]) {
              dfs(newRow, newCol, ocean);
          }
      }
  };

  for (let i = 0; i < m; i++) {
      dfs(i, 0, pacific);
  }
  for (let j = 1; j < n; j++) {
      dfs(0, j, pacific);
  }
  for (let i = 0; i < m; i++) {
      dfs(i, n - 1, atlantic);
  }
  for (let j = 0; j < n - 1; j++) {
      dfs(m - 1, j, atlantic);
  }
  const result = [];
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          if (pacific[i][j] && atlantic[i][j]) {
              const cell = [];
              cell.push(i);
              cell.push(j);
              result.push(cell);
          }
      }
  }
  return result;
}

// 905. 按奇偶排序数组 双指针
/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var sortArrayByParity = function(nums) {
  const n = nums.length;
  const res = new Array(n).fill(0);
  let left = 0, right = n - 1;
  for (const num of nums) {
      if (num % 2 === 0) {
          res[left++] = num;
      } else {
          res[right--] = num;
      }
  }
  return res;
};

// 713. 乘积小于 K 的子数组  滑动窗口
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var numSubarrayProductLessThanK = function(nums, k) {
  let n = nums.length, ret = 0;
  let prod = 1, i = 0;
  for (let j = 0; j < n; j++) {
      prod *= nums[j];
      while (i <= j && prod >= k) {
          prod /= nums[i];
          i++;
      }
      ret += j - i + 1;
  }
  return ret;
};

// 933. 最近的请求次数 基础题
var RecentCounter = function() {
  this.queue = [];
};

RecentCounter.prototype.ping = function(t) {
  this.queue.push(t);
  while (this.queue[0] < t - 3000) {
      this.queue.shift();
  }
  return this.queue.length;
};

// 433. 最小基因变化 广度优先搜索
/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */
 var minMutation = function(start, end, bank) {
  const cnt = new Set();
  const visited = new Set();
  const keys = ['A', 'C', 'G', 'T'];
  for (const w of bank) {
      cnt.add(w);
  }
  if (start === end) {
      return 0;
  }
  if (!cnt.has(end)) {
      return -1;
  }
  const queue = [start];
  visited.add(start);
  let step = 1;
  while (queue.length) {
      const sz = queue.length;
      for (let i = 0; i < sz; i++) {
          const curr = queue.shift();
          for (let j = 0; j < 8; j++) {
              for (let k = 0; k < 4; k++) {
                  if (keys[k] !== curr[j]) {
                      const sb = [...curr];
                      sb[j] = keys[k];
                      const next = sb.join('');
                      if (!visited.has(next) && cnt.has(next)) {
                          if (next === end) {
                              return step;
                          }
                          queue.push(next);
                          visited.add(next);
                      }
                  }
              }
          }
      }
      step++;
  }
  return -1;
};

// 942. 增减字符串匹配 贪心
/**
 * @param {string} s
 * @return {number[]}
 */
 var diStringMatch = function(s) {
  let n = s.length, lo = 0, hi = n;
  const perm = new Array(n + 1).fill(0);
  for (let i = 0; i < n; ++i) {
      perm[i] = s[i] === 'I' ? lo++ : hi--;
  }
  perm[n] = lo; // 最后剩下一个数，此时 lo == hi
  return perm;
};

// 442. 数组中重复的数据 正负标记法
/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var findDuplicates = function(nums) {
  const n = nums.length;
  const ans = [];
  for (let i = 0; i < n; ++i) {
      const x = Math.abs(nums[i]);
      if (nums[x - 1] > 0) {
          nums[x - 1] = -nums[x - 1];
      } else {
          ans.push(x);
      }
  }
  return ans;
}

// 449. 序列化和反序列化二叉搜索树 后续遍历
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
 var serialize = function(root) {
  const list = [];

  const postOrder = (root, list) => {
      if (!root) {
          return;
      }
      postOrder(root.left, list);
      postOrder(root.right, list);
      list.push(root.val);
  }

  postOrder(root, list);
  const str = list.join(',');
  return str;
};

var deserialize = function(data) {
  if (data.length === 0) {
      return null;
  }
  let arr = data.split(',');
  const length = arr.length;
  const stack = [];
  for (let i = 0; i < length; i++) {
      stack.push(parseInt(arr[i]));
  }

  const construct = (lower, upper, stack) => {
      if (stack.length === 0 || stack[stack.length - 1] < lower || stack[stack.length - 1] > upper) {
          return null;
      }
      const val = stack.pop();
      const root = new TreeNode(val);
      root.right = construct(val, upper, stack);
      root.left = construct(lower, val, stack);
      return root;
  }

  return construct(-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, stack);
};

// 944. 删列造序 基础遍历
/**
 * @param {string[]} strs
 * @return {number}
 */
 var minDeletionSize = function(strs) {
  const row = strs.length;
  const col = strs[0].length;
  let ans = 0;
  for (let j = 0; j < col; ++j) {
      for (let i = 1; i < row; ++i) {
          if (strs[i - 1][j] > strs[i][j]) {
              ans++;
              break;
          }
      }
  }
  return ans;
};

// 面试题 01.05. 一次编辑 分类讨论
/**
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
 var oneEditAway = function(first, second) {
  const m = first.length, n = second.length;
  if (n - m === 1) {
      return oneInsert(first, second);
  } else if (m - n === 1) {
      return oneInsert(second, first);
  } else if (m === n) {
      let foundDifference = false;
      for (let i = 0; i < m; i++) {
          if (first[i] != second[i]) {
              if (!foundDifference) {
                  foundDifference = true;
              } else {
                  return false;
              }
          }
      }
      return true;
  } else {
      return false;
  }
  function oneInsert(shorter, longer) {
      const length1 = shorter.length, length2 = longer.length;
      let index1 = 0, index2 = 0;
      while (index1 < length1 && index2 < length2) {
          if (shorter[index1] == longer[index2]) {
              index1++;
          }
          index2++;
          if (index2 - index1 > 1) {
              return false;
          }
      }
      return true;
  };
}

//  面试题 04.06. 后继者 中序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
 var inorderSuccessor = function(root, p) {
  const stack = [];
  let prev = null, curr = root;
  while (stack.length || curr) {
      while (curr) {
          stack.push(curr);
          curr = curr.left;
      }
      curr = stack.pop();
      if (prev === p) {
          return curr;
      }
      prev = curr;
      curr = curr.right;
  }
  return null;
};

// 953. 验证外星语词典  模拟
/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
 var isAlienSorted = function(words, order) {
  const index = new Array(26).fill(0);
  for (let i = 0; i < order.length; ++i) {
      index[order[i].charCodeAt() - 'a'.charCodeAt()] = i;
  }
  for (let i = 1; i < words.length; i++) {
      let valid = false;
      for (let j = 0; j < words[i - 1].length && j < words[i].length; j++) {
          let prev = index[words[i - 1][j].charCodeAt() - 'a'.charCodeAt()];
          let curr = index[words[i][j].charCodeAt() - 'a'.charCodeAt()];
          if (prev < curr) {
              valid = true;
              break;
          } else if (prev > curr) {
              return false;
          }
      }
      if (!valid) {
          /* 比较两个字符串的长度 */
          if (words[i - 1].length > words[i].length) {
              return false;
          }
      }
  }
  return true;
};

// 668. 乘法表中第k小的数 二分查找
/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
 var findKthNumber = function(m, n, k) {
  let left = 1, right = m * n;
  while (left < right) {
      const x = left + Math.floor((right - left) / 2);
      let count = Math.floor(x / n) * n;
      for (let i = Math.floor(x / n) + 1; i <= m; ++i) {
          count += Math.floor(x / i);
      }
      if (count >= k) {
          right = x;
      } else {
          left = x + 1;
      }
  }
  return left;
};


// 462. 最少移动次数使数组元素相等 II 中位数均移动
/**
 * @param {number[]} nums
 * @return {number}
 */
 var minMoves2 = function(nums) {
  nums.sort((a, b) => a - b);
  let n = nums.length, ret = 0, x = nums[Math.floor(n / 2)];
  for (let i = 0; i < n; i++) {
      ret += Math.abs(nums[i] - x);
  }
  return ret;
};

// 436. 寻找右区间 二分查找
/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
 var findRightInterval = function(intervals) {
  const n = intervals.length;
  const startIntervals = new Array(n).fill(0).map(() => new Array(2).fill(0));
  for (let i = 0; i < n; i++) {
      startIntervals[i][0] = intervals[i][0];
      startIntervals[i][1] = i;
  }
  startIntervals.sort((o1, o2) => o1[0] - o2[0]);

  const ans = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
      let left = 0;
      let right = n - 1;
      let target = -1;
      while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          if (startIntervals[mid][0] >= intervals[i][1]) {
              target = startIntervals[mid][1];
              right = mid - 1;
          } else {
              left = mid + 1;
          }
      }
      ans[i] = target;
  }
  return ans;
};

// 961. 在长度 2N 的数组中找出重复 N 次的元素 哈希表                                                                                                                                            
/**
 * @param {number[]} nums
 * @return {number}
 */
 var repeatedNTimes = function(nums) {
  const found = new Set();
  for (const num of nums) {
      if (found.has(num)) {
          return num;
      }
      found.add(num);
  }
  // 不可能的情况
  return -1;
};

// 965. 单值二叉树  遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isUnivalTree = function(root) {
  if (!root) {
      return true;
  }
  if (root.left) {
      if (root.val !== root.left.val || !isUnivalTree(root.left)) {
          return false;
      }
  }
  if (root.right) {
      if (root.val !== root.right.val || !isUnivalTree(root.right)) {
          return false;
      }
  }
  return true;
};

// 467. 环绕字符串中唯一的子字符串 动态规划
/**
 * @param {string} p
 * @return {number}
 */
 var findSubstringInWraproundString = function(p) {
  const dp = new Array(26).fill(0);
  let k = 0;
  for (let i = 0; i < p.length; ++i) {
      if (i > 0 && (p[i].charCodeAt() - p[i - 1].charCodeAt() + 26) % 26 === 1) { // 字符之差为 1 或 -25
          ++k;
      } else {
          k = 1;
      }
      dp[p[i].charCodeAt() - 'a'.charCodeAt()] = Math.max(dp[p[i].charCodeAt() - 'a'.charCodeAt()], k);
  }
  return _.sum(dp);
};

// 699. 掉落的方块 暴力循环
/**
 * @param {number[][]} positions
 * @return {number[]}
 */
 var fallingSquares = function(positions) {
  const n = positions.length;
  const heights = [];
  for (let i = 0; i < n; i++) {
      let left1 = positions[i][0], right1 = positions[i][0] + positions[i][1] - 1;
      let height = positions[i][1];
      for (let j = 0; j < i; j++) {
          let left2 = positions[j][0], right2 = positions[j][0] + positions[j][1] - 1;
          if (right1 >= left2 && right2 >= left1) {
              height = Math.max(height, heights[j] + positions[i][1]);
          }
      }
      heights.push(height);
  }
  for (let i = 1; i < n; i++) {
      heights.splice(i, 1, Math.max(heights[i], heights[i - 1]));
  }
  return heights;
};

// 面试题 17.11. 单词距离 遍历记录
/**
 * @param {string[]} words
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
 var findClosest = function(words, word1, word2) {
  const length = words.length;
  let ans = length;
  let index1 = -1, index2 = -1;
  for (let i = 0; i < length; i++) {
      const word = words[i];
      if (word === word1) {
          index1 = i;
      } else if (word === word2) {
          index2 = i;
      }
      if (index1 >= 0 && index2 >= 0) {
          ans = Math.min(ans, Math.abs(index1 - index2));
      }
  }
  return ans;
};


// 1022. 从根到叶的二进制数之和 二叉树后续遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var sumRootToLeaf = function(root) {
  const dfs = (root, val) => {
      if (!root) {
          return 0;
      }
      val = (val << 1) | root.val;
      if (!root.left&& !root.right) {
          return val;
      }
      return dfs(root.left, val) + dfs(root.right, val);
  }
  return dfs(root, 0);
};

//  1021. 删除最外层的括号 栈
/**
 * @param {string} s
 * @return {string}
 */
 var removeOuterParentheses = function(s) {
  let res = '';
  const stack = [];
  for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (c === ')') {
          stack.pop();
      }
      if (stack.length) {
          res += c;
      }
      if (c === '(') {
          stack.push(c);
      }
  }
  return res;
};

// 468. 验证IP地址 基础逻辑判断
/**
 * @param {string} queryIP
 * @return {string}
 */
 var validIPAddress = function(queryIP) {
  if (queryIP.indexOf('.') >= 0) {
      // IPv4
      let last = -1;
      for (let i = 0; i < 4; ++i) {
          const cur = (i === 3 ? queryIP.length : queryIP.indexOf('.', last + 1));
          if (cur < 0) {
              return "Neither";
          }
          if (cur - last - 1 < 1 || cur - last - 1 > 3) {
              return "Neither";
          }
          let addr = 0;
          for (let j = last + 1; j < cur; ++j) {
              if (!isDigit(queryIP[j])) {
                  return "Neither";
              }
              addr = addr * 10 + (queryIP[j].charCodeAt() - '0'.charCodeAt());
          }
          if (addr > 255) {
              return "Neither";
          }
          if (addr > 0 && queryIP[last + 1].charCodeAt() === '0'.charCodeAt()) {
              return "Neither";
          }
          if (addr === 0 && cur - last - 1 > 1) {
              return "Neither";
          }
          last = cur;
      }
      return "IPv4";
  } else {
      // IPv6
      let last = -1;
      for (let i = 0; i < 8; ++i) {
          const cur = (i === 7 ? queryIP.length : queryIP.indexOf(':', last + 1));
          if (cur < 0) {
              return "Neither";
          }
          if (cur - last - 1 < 1 || cur - last - 1 > 4) {
              return "Neither";
          }
          for (let j = last + 1; j < cur; ++j) {
              if (!isDigit(queryIP[j]) && !('a' <= queryIP[j].toLowerCase() && queryIP[j].toLowerCase() <= 'f')) {
                  return "Neither";
              }
          }
          last = cur;
      }
      return "IPv6";
  }
  function isDigit(ch) {
      return parseFloat(ch).toString() === "NaN" ? false : true;
  }
};


// 473. 火柴拼正方形 动态规划
/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
 var makesquare = function(matchsticks) {
  const totalLen = _.sum(matchsticks);
  if (totalLen % 4 !== 0) {
      return false;
  }
  const len = Math.floor(totalLen / 4), n = matchsticks.length;
  const dp = new Array(1 << n).fill(-1);
  dp[0] = 0;
  for (let s = 1; s < (1 << n); s++) {
      for (let k = 0; k < n; k++) {
          if ((s & (1 << k)) === 0) {
              continue;
          }
          const s1 = s & ~(1 << k);
          if (dp[s1] >= 0 && dp[s1] + matchsticks[k] <= len) {
              dp[s] = (dp[s1] + matchsticks[k]) % len;
              break;
          }
      }
  }
  return dp[(1 << n) - 1] === 0;
}

// 450. 删除二叉搜索树中的节点 迭代
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
 var deleteNode = function(root, key) {
  let cur = root, curParent = null;
  while (cur && cur.val !== key) {
      curParent = cur;
      if (cur.val > key) {
          cur = cur.left;
      } else {
          cur = cur.right;
      }
  }
  if (!cur) {
      return root;
  }
  if (!cur.left && !cur.right) {
      cur = null;
  } else if (!cur.right) {
      cur = cur.left;
  } else if (!cur.left) {
      cur = cur.right;
  } else {
      let successor = cur.right, successorParent = cur;
      while (successor.left) {
          successorParent = successor;
          successor = successor.left;
      }
      if (successorParent.val === cur.val) {
          successorParent.right = successor.right;
      } else {
          successorParent.left = successor.right;
      }
      successor.right = cur.right;
      successor.left = cur.left;
      cur = successor;
  }
  if (!curParent) {
      return cur;
  } else {
      if (curParent.left && curParent.left.val === key) {
          curParent.left = cur;
      } else {
          curParent.right = cur;
      }
      return root;
  }
};

// 875. 爱吃香蕉的珂珂 二分查找
/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
 var minEatingSpeed = function(piles, h) {
  let low = 1;
  let high = 0;
  for (const pile of piles) {
      high = Math.max(high, pile);
  }
  let k = high;
  while (low < high) {
      const speed = Math.floor((high - low) / 2) + low;
      const time = getTime(piles, speed);
      if (time <= h) {
          k = speed;
          high = speed;
      } else {
          low = speed + 1;
      }
  }
  return k;

  function getTime (piles, speed) {
      let time = 0;
      for (const pile of piles) {
          const curTime = Math.floor((pile + speed - 1) / speed);
          time += curTime;
      }
      return time;
  };
}

// 929. 独特的电子邮件地址  哈希表
/**
 * @param {string[]} emails
 * @return {number}
 */
 var numUniqueEmails = function(emails) {
  const emailSet = new Set();
  for (const email of emails) {
      const i = email.indexOf('@');
      let local = email.slice(0, i).split("+")[0]; // 去掉本地名第一个加号之后的部分
      local = local.replaceAll(".", ""); // 去掉本地名中所有的句点
      emailSet.add(local + email.slice(i));
  }
  return emailSet.size;
};

// 1037. 有效的回旋镖  判断不在一条直线上
/**
 * @param {number[][]} points
 * @return {boolean}
 */
 var isBoomerang = function(points) {
  const v1 = [points[1][0] - points[0][0], points[1][1] - points[0][1]];
  const v2 = [points[2][0] - points[0][0], points[2][1] - points[0][1]];
  return v1[0] * v2[1] - v1[1] * v2[0] != 0;
};


// 926. 将字符串翻转到单调递增  动态规划
/** 
 * @param {string} s
 * @return {number}
 */
 var minFlipsMonoIncr = function(s) {
  const n = s.length;
  let dp0 = 0, dp1 = 0;
  for (let i = 0; i < n; i++) {
      const c = s[i];
      let dp0New = dp0, dp1New = Math.min(dp0, dp1);
      if (c === '1') {
          dp0New++;
      } else {
          dp1New++;
      }
      dp0 = dp0New;
      dp1 = dp1New;
  }
  return Math.min(dp0, dp1);
};

// 1051. 高度检查器 排序
/**
 * @param {number[]} heights
 * @return {number}
 */
 var heightChecker = function(heights) {
  let n = heights.length, ans = 0;
  const expected = new Array(n).fill(0);
  expected.splice(0, n, ...heights);
  expected.sort((a, b) => a - b);
  for (let i = 0; i < n; ++i) {
      if (heights[i] !== expected[i]) {
          ++ans;
      }
  }
  return ans;
};

// 890. 查找和替换模式 检测
/**
 * @param {string[]} words
 * @param {string} pattern
 * @return {string[]}
 */
 var findAndReplacePattern = function(words, pattern) {
  const ans = [];
  for (const word of words) {
      if (match(word, pattern) && match(pattern, word)) {
          ans.push(word);
      }
  }
  return ans;


  function match(word, pattern) {
      const map = new Map();
      for (let i = 0; i < word.length; ++i) {
          const x = word[i], y = pattern[i];
          if (!map.has(x)) {
              map.set(x, y);
          } else if (map.get(x) !== y) { 
              return false;
          }
      }
      return true;
  }
};

// 498. 对角线遍历  寻找规律
/**
 * @param {number[][]} mat
 * @return {number[]}
 */
 var findDiagonalOrder = function(mat) {
  const m = mat.length;
  const n = mat[0].length;
  const res = new Array(m * n).fill(0);
  let pos = 0;
  for (let i = 0; i < m + n - 1; i++) {
      if (i % 2 === 1) {
          let x = i < n ? 0 : i - n + 1;
          let y = i < n ? i : n - 1;
          while (x < m && y >= 0) {
              res[pos] = mat[x][y];
              pos++;
              x++;
              y--;
          }
      } else {
          let x = i < m ? i : m - 1;
          let y = i < m ? 0 : i - m + 1;
          while (x >= 0 && y < n) {
              res[pos] = mat[x][y];
              pos++;
              x--;
              y++;
          }
      }
  }
  return res;
};


// 719. 找出第 K 小的数对距离 二分查找
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var smallestDistancePair = function(nums, k) {
  nums.sort((a, b) => a - b);
  let n = nums.length, left = 0, right = nums[n - 1] - nums[0];
  while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      let cnt = 0;
      for (let i = 0, j = 0; j < n; j++) {
          while (nums[j] - nums[i] > mid) {
              i++;
          }
          cnt += j - i;
      }
      if (cnt >= k) {
          right = mid - 1;
      } else {
          left = mid + 1;
      }
  }
  return left;
}

// 532. 数组中的 k-diff 数对  集合存储
 
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var findPairs = function(nums, k) {
  const visited = new Set();
  const res = new Set();
  for (const num of nums) {
      if (visited.has(num - k)) {
          res.add(num - k);
      }
      if (visited.has(num + k)) {
          res.add(num);
      }
      visited.add(num);
  }
  return res.size;
};

// 1089. 复写零 双指针 倒序赋值
/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
 var duplicateZeros = function(arr) {
  const n = arr.length;
  let top = 0;
  let i = -1;
  while (top < n) {
      i++;
      if (arr[i] !== 0) {
          top++;
      } else {
          top += 2;
      }
  }
  let j = n - 1;
  if (top === n + 1) {
      arr[j] = 0;
      j--;
      i--;
  } 
  while (j >= 0) {
      arr[j] = arr[i];
      j--;
      if (arr[i] === 0) {
          arr[j] = arr[i];
          j--;
      } 
      i--;
  }
};


// 508. 出现次数最多的子树元素和  遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var findFrequentTreeSum = function(root) {
  const cnt = new Map();
  let maxCnt = 0;

  const dfs = (node) => {
      if (!node) {
          return 0;
      }
      const sum = node.val + dfs(node.left) + dfs(node.right);
      cnt.set(sum, (cnt.get(sum) || 0) + 1);
      maxCnt = Math.max(maxCnt, cnt.get(sum));
      return sum;
  }

  dfs(root);
  const list = [];
  for (const [s, c] of cnt.entries()) {
      if (c === maxCnt) {
          list.push(s);
      }
  }
  return list;
};

// 1108. IP 地址无效化  基础替换
/**
 * @param {string} address
 * @return {string}
 */
 var defangIPaddr = function(address) {
  return address.replaceAll('\.', '[.]');
};

// 513. 找树左下角的值 层序遍历
/** 
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var findBottomLeftValue = function(root) {
  let num = root.val;
  let backup =[root];
  while(backup.length > 0) {
      num = backup[0].val;
      let newBackup = [];
      for(let node of backup) {
          if(node.left) { newBackup.push(node.left)}
          if(node.right) {newBackup.push(node.right)}
      }
      backup = newBackup;
  }
  return num;
};


// 30. 串联所有单词的子串 滑动窗口
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
 var findSubstring = function(s, words) {
  const res = [];
  const m = words.length, n = words[0].length, ls = s.length;
  for (let i = 0; i < n; i++) {
      if (i + m * n > ls) {
          break;
      }
      const differ = new Map();
      for (let j = 0; j < m; j++) {
          const word = s.substring(i + j * n, i + (j + 1) * n);
          differ.set(word, (differ.get(word) || 0) + 1);
      }
      for (const word of words) {
          differ.set(word, (differ.get(word) || 0) - 1);
          if (differ.get(word) === 0) {
              differ.delete(word);
          }
      }
      for (let start = i; start < ls - m * n + 1; start += n) {
          if (start !== i) {
              let word = s.substring(start + (m - 1) * n, start + m * n);
              differ.set(word, (differ.get(word) || 0) + 1);
              if (differ.get(word) === 0) {
                  differ.delete(word);
              }
              word = s.substring(start - n, start);
              differ.set(word, (differ.get(word) || 0) - 1);
              if (differ.get(word) === 0) {
                  differ.delete(word);
              }
              word = s.substring(start - n, start);
          }
          if (differ.size === 0) {
              res.push(start);
          }
      }
  }
  return res;
};

// 515. 在每个树行中找最大值 层序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var largestValues = function(root) {
  let res = [];
  let backup =[];
  if(root) {backup.push(root)}
  while(backup.length > 0) {
      let max = backup[0].val;
      let newBackup = [];
      for(let node of backup) {
          max = Math.max(max,node.val)
          if(node.left) { newBackup.push(node.left)}
          if(node.right) {newBackup.push(node.right)}

      }
      res.push(max)
      backup = newBackup;
  }
  return res;

};

// 剑指 Offer II 091. 粉刷房子  动态规划
/**
 * @param {number[][]} costs
 * @return {number}
 */
 var minCost = function(costs) {
  const n = costs.length;
  let dp = new Array(3).fill(0);
  for (let j = 0; j < 3; j++) {
      dp[j] = costs[0][j];
  }
  for (let i = 1; i < n; i++) {
      const dpNew = new Array(3).fill(0);
      for (let j = 0; j < 3; j++) {
          dpNew[j] = Math.min(dp[(j + 1) % 3], dp[(j + 2) % 3]) + costs[i][j];
      }
      dp = dpNew;
  }
  return parseInt(_.min(dp));
};

// 324. 摆动排序 II 排序
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var wiggleSort = function(nums) {
  const arr = nums.slice();
  arr.sort((a, b) => a - b);
  const n = nums.length;
  const x = Math.floor((n + 1) / 2);
  for (let i = 0, j = x - 1, k = n - 1; i < n; i += 2, j--, k--) {
      nums[i] = arr[j];
      if (i + 1 < n) {
          nums[i + 1] = arr[k];
      }
  }
};
// 535. TinyURL 的加密与解密 基础映射
/**
 * Encodes a URL to a shortened URL.
 *
 * @param {string} longUrl
 * @return {string}
 */
 var encode = function(longUrl) {
  this.dataBase = new Map();
  this.id = 0;
  this.id++;
  this.dataBase.set(this.id, longUrl);
  return "http://tinyurl.com/" + this.id;
};

var decode = function(shortUrl) {
  const p = shortUrl.lastIndexOf('/') + 1;
  const key = parseInt(shortUrl.substring(p));
  return this.dataBase.get(key);
};


// 1175. 质数排列  数学题
/**
 * @param {number} n
 * @return {number}
 */
 const MOD = 1000000007;
 var numPrimeArrangements = function(n) {
     let MOD = Math.pow(10,9) + 7;
     let p = 0;
     let np = 0;
 
     for (let index = 1; index <= n; index++) {
         if(isPrimeNumber(index)) {
             p++;
         } else {
             np++;
         }
     }
     let result = calculateNum(p,np);
     return result;
 
     function isPrimeNumber(num) {
         if(num < 2) return false;
         let checkNum = Math.floor(Math.sqrt(num)) + 1
         for (let i = 2; i < checkNum; i++) {
             if(num%i == 0) {return false}
         }
         return true;
     }
 
     function calculateNum (num,num2) {
         let result = 1;
         for (let index = 1; index <= num; index++) {
             result *=index;
             result = result%MOD;
         }
         for (let index = 1; index <= num2; index++) {
             result *=index;
             result = result%MOD;
         }
         return result;
     }
 };

 // 1200. 最小绝对差 排序
 /**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function(arr) {
  const n = arr.length;
  arr.sort((a, b) => a - b);

  let best = Number.MAX_VALUE;
  let ans = [];
  for (let i = 0; i < n - 1; ++i) {
      let delta = arr[i + 1] - arr[i];
      if (delta < best) {
          best = delta;
          ans = [];
          const pair = [];
          pair.push(arr[i]);
          pair.push(arr[i + 1]);
          ans.push(pair);
      } else if (delta === best) {
          const pair = [];
          pair.push(arr[i]);
          pair.push(arr[i + 1]);
          ans.push(pair);
      }
  }

  return ans;
};

// 729. 我的日程安排表 I  直接查找
var MyCalendar = function() {
  this.booked = [];
};

MyCalendar.prototype.book = function(start, end) {
  for (const arr of this.booked) {
      let l = arr[0], r = arr[1];
      if (l < end && start < r) {
          return false;
      }
  }
  this.booked.push([start, end]);
  return true;
};


//  648. 单词替换 哈希
/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
 var replaceWords = function(dictionary, sentence) {
  const dictionarySet = new Set();
  for (const root of dictionary) {
      dictionarySet.add(root);
  }
  const words = sentence.split(" ");
  for (let i = 0; i < words.length; i++) {
      const word = words[i];
      for (let j = 0; j < word.length; j++) {
          if (dictionarySet.has(word.substring(0, 1 + j))) {
              words[i] = word.substring(0, 1 + j);
              break;
          }
      }
  }
  return words.join(' ');
};

// 1217. 玩筹码 贪心，基偶性
/**
 * @param {number[]} position
 * @return {number}
 */

 var minCostToMoveChips = function(position) {
  let even = 0, odd = 0;
  for (const pos of position) {
      if ((pos & 1) !== 0) {
          odd++;
      } else {
          even++;
      }
  }
  return Math.min(odd, even);
};

// 873. 最长的斐波那契子序列的长度 动态规划 
/**
 * @param {number[]} arr
 * @return {number}
 */
 var lenLongestFibSubseq = function(arr) {
  const indices = new Map();
  const n = arr.length;
  for (let i = 0; i < n; i++) {
      indices.set(arr[i], i);
  }
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let ans = 0;
  for (let i = 0; i < n; i++) {
      for (let j = n - 1; j >= 0; j--) {
          if (arr[j] * 2 <= arr[i]) {
              break;
          }
          if (indices.has(arr[i] - arr[j])) {
              const k = indices.get(arr[i] - arr[j]);
              dp[j][i] = Math.max(dp[k][j] + 1, 3);
              ans = Math.max(ans, dp[j][i]);
          }
      }
  }
  return ans;
};

// 1252. 奇数值单元格的数目 奇偶判断
/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} indices
 * @return {number}
 */
 var oddCells = function(m, n, indices) {
  const rows = new Array(m).fill(0);
  const cols = new Array(n).fill(0);
  for (const index of indices) {
      rows[index[0]]++;
      cols[index[1]]++;
  }
  let oddx = 0, oddy = 0;
  for (let i = 0; i < m; i++) {
      if ((rows[i] & 1) !== 0) {
          oddx++;
      }
  }
  for (let i = 0; i < n; i++) {
      if ((cols[i] & 1) !== 0) {
          oddy++;
      }
  }
  return oddx * (n - oddy) + (m - oddx) * oddy;
};

// 735. 行星碰撞 栈
var asteroidCollision = function(asteroids) {
  const stack = [];
  for (const aster of asteroids) {
      let alive = true;
      while (alive && aster < 0 && stack.length > 0 && stack[stack.length - 1] > 0) {
          alive = stack[stack.length - 1] < -aster; // aster 是否存在
          if (stack[stack.length - 1] <= -aster) {  // 栈顶行星爆炸
              stack.pop();
          }
      }
      if (alive) {
          stack.push(aster);
      }
  }
  const size = stack.length;
  const ans = new Array(size).fill(0);
  for (let i = size - 1; i >= 0; i--) {
      ans[i] = stack.pop();
  }
  return ans;
};

// 745. 前缀和后缀搜索 哈希 
/**
 * @param {string[]} words
 */
 var WordFilter = function(words) {
  this.dictionary = new Map();
  for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const m = word.length;
      for (let prefixLength = 1; prefixLength <= m; prefixLength++) {
          for (let suffixLength = 1; suffixLength <= m; suffixLength++) {
              this.dictionary.set(word.substring(0, prefixLength) + "#" + word.substring(m - suffixLength), i);
          }
      }
  }
};

WordFilter.prototype.f = function(pref, suff) {
  if (this.dictionary.has(pref + "#" + suff)) {
      return this.dictionary.get(pref + "#" + suff);
  }
  return -1;
};


// 558. 四叉树交集 分治
/**
 * // Definition for a QuadTree node.
 * function Node(val,isLeaf,topLeft,topRight,bottomLeft,bottomRight) {
 *    this.val = val;
 *    this.isLeaf = isLeaf;
 *    this.topLeft = topLeft;
 *    this.topRight = topRight;
 *    this.bottomLeft = bottomLeft;
 *    this.bottomRight = bottomRight;
 * };
 */

/**
 * @param {Node} quadTree1
 * @param {Node} quadTree2
 * @return {Node}
 */
 var intersect = function(quadTree1, quadTree2) {
  if (quadTree1.isLeaf) {
      if (quadTree1.val) {
          return new Node(true, true);
      }
      return new Node(quadTree2.val, quadTree2.isLeaf, quadTree2.topLeft, quadTree2.topRight, quadTree2.bottomLeft, quadTree2.bottomRight);
  }
  if (quadTree2.isLeaf) {
      return intersect(quadTree2, quadTree1);
  }
  const o1 = intersect(quadTree1.topLeft, quadTree2.topLeft);
  const o2 = intersect(quadTree1.topRight, quadTree2.topRight);
  const o3 = intersect(quadTree1.bottomLeft, quadTree2.bottomLeft);
  const o4 = intersect(quadTree1.bottomRight, quadTree2.bottomRight);
  if (o1.isLeaf && o2.isLeaf && o3.isLeaf && o4.isLeaf && o1.val === o2.val && o1.val === o3.val && o1.val === o4.val) {
      return new Node(o1.val, true);
  }
  return new Node(false, false, o1, o2, o3, o4);
};

// 剑指 Offer II 041. 滑动窗口的平均值 基础题
/**
 * Initialize your data structure here.
 * @param {number} size
 */
 var MovingAverage = function(size) {
  this.queue = [];
  this.size = size;
  this.sum = 0;
};

MovingAverage.prototype.next = function(val) {
  if (this.queue.length === this.size) {
      this.sum -= this.queue.shift();
  }
  this.queue.push(val);
  this.sum += val;
  return this.sum / this.queue.length;
};

// 731. 我的日程安排表 II 直接遍历
var MyCalendarTwo = function() {
  this.booked = [];
  this.overlaps = [];
};

MyCalendarTwo.prototype.book = function(start, end) {
  for (const arr of this.overlaps) {
      let l = arr[0], r = arr[1];
      if (l < end && start < r) {
          return false;
      }
  }
  for (const arr of this.booked) {
      let l = arr[0], r = arr[1];
      if (l < end && start < r) {
          this.overlaps.push([Math.max(l, start), Math.min(r, end)]);
      }
  }
  this.booked.push([start, end]);
  return true;
};

// 1260. 二维网格迁移 变成一维数组处理
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
 var shiftGrid = function(grid, k) {
  const m = grid.length, n = grid[0].length;
  const ret = [];
  for (let i = 0; i < m; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
          row.push(0);
      }
      ret.push(row);
  }
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          const index1 = (i * n + j + k) % (m * n);
          ret[Math.floor(index1 / n)].splice(index1 % n, 1, grid[i][j]);
      }
  }
  return ret;
};

// 814. 二叉树剪枝 递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
 var pruneTree = function(root) {
  if (!root) {
      return null;
  }
  root.left = pruneTree(root.left);
  root.right = pruneTree(root.right);
  if (!root.left && !root.right&& root.val === 0) {
      return null;
  }
  return root;
};


// 757. 设置交集大小至少为2 贪心
/**
 * @param {number[][]} intervals
 * @return {number}
 */
 var intersectionSizeTwo = function(intervals) {
  const n = intervals.length;
  let res = 0;
  let m = 2;
  intervals.sort((a, b) => {
      if (a[0] === b[0]) {
          return b[1] - a[1];
      }
      return a[0] - b[0];
  });
  const temp = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
      temp[i] = [];
  }

  const help = (intervals, temp, pos, num) => {
      for (let i = pos; i >= 0; i--) {
          if (intervals[i][1] < num) {
              break;
          }
          temp[i].push(num);
      }
  }

  for (let i = n - 1; i >= 0; i--) {
      for (let j = intervals[i][0], k = temp[i].length; k < m; j++, k++) {
          res++;
          help(intervals, temp, i - 1, j);
      }
  }
  return res;
};

// 1184. 公交站间的距离  正反计算
/**
 * @param {number[]} distance
 * @param {number} start
 * @param {number} destination
 * @return {number}
 */
 var distanceBetweenBusStops = function(distance, start, destination) {
  if (start > destination) {
      const temp = start;
      start = destination;
      destination = temp;
  }
  let sum1 = 0, sum2 = 0;
  for (let i = 0; i < distance.length; i++) {
      if (i >= start && i < destination) {
          sum1 += distance[i];
      } else {
          sum2 += distance[i];
      }
  }
  return Math.min(sum1, sum2);
};

// 592. 分数加减运算 模拟
/**
 * @param {string} expression
 * @return {string}
 */
 var fractionAddition = function(expression) {
  let denominator = 0, numerator = 1; // 分子，分母
  let index = 0, n = expression.length;
  while (index < n) {
      // 读取分子
      let denominator1 = 0, sign = 1;
      if (expression[index] === '-' || expression[index] === '+') {
          sign = expression[index] === '-' ? -1 : 1;
          index++;
      }
      while (index < n && isDigit(expression[index])) {
          denominator1 = denominator1 * 10 + expression[index].charCodeAt() - '0'.charCodeAt();
          index++;
      }
      denominator1 = sign * denominator1;
      index++;

      // 读取分母
      let numerator1 = 0;
      while (index < n && isDigit(expression[index])) {
          numerator1 = numerator1 * 10 + expression[index].charCodeAt() - '0'.charCodeAt();
          index++;
      }

      denominator = denominator * numerator1 + denominator1 * numerator;
      numerator *= numerator1;
  }
  if (denominator === 0) {
      return "0/1";
  }
  const g = gcd(Math.abs(denominator), numerator); // 获取最大公约数
  return Math.floor(denominator / g) + "/" + Math.floor(numerator / g);

  function gcd(a, b) {
      let remainder = a % b;
      while (remainder !== 0) {
          a = b;
          b = remainder;
          remainder = a % b;
      }
      return b;
  };

  function isDigit(ch) {
      return parseFloat(ch).toString() === "NaN" ? false : true;
  }

}

// 1331. 数组序号转换 排序 映射
/**
 * @param {number[]} arr
 * @return {number[]}
 */
 var arrayRankTransform = function(arr) {
  const sortedArr = new Array(arr.length).fill(0);
  sortedArr.splice(0, arr.length, ...arr);
  sortedArr.sort((a, b) => a - b);
  const ranks = new Map();
  const ans = new Array(arr.length).fill(0);
  for (const a of sortedArr) {
      if (!ranks.has(a)) {
          ranks.set(a, ranks.size + 1);
      }
  }
  for (let i = 0; i < arr.length; i++) {
      ans[i] = ranks.get(arr[i]);
  }
  return ans;
};

// 593. 有效的正方形 逻辑判断
/**
 * @param {number[]} p1
 * @param {number[]} p2
 * @param {number[]} p3
 * @param {number[]} p4
 * @return {boolean}
 */
 var validSquare = function(p1, p2, p3, p4) {
  if (_.isEqual(p1, p2)) {
      return false;
  }
  if (help(p1, p2, p3, p4)) {
      return true;
  }
  if (_.isEqual(p1, p3)) {
      return false;
  }
  if (help(p1, p3, p2, p4)) {
      return true;
  }
  if (_.isEqual(p1, p4)) {
      return false;
  }
  if (help(p1, p4, p2, p3)) {
      return true;
  }
  return false;

  function help(p1, p2, p3, p4) {
      const v1 = [p1[0] - p2[0], p1[1] - p2[1]];
      const v2 = [p3[0] - p4[0], p3[1] - p4[1]];
      if (checkMidPoint(p1, p2, p3, p4) && checkLength(v1, v2) && calCos(v1, v2)) {
          return true;
      } 
      return false;
  }

  function checkLength(v1, v2) {
      return (v1[0] * v1[0] + v1[1] * v1[1]) === (v2[0] * v2[0] + v2[1] * v2[1]);
  }

  function checkMidPoint (p1, p2, p3, p4) {
      return (p1[0] + p2[0]) === (p3[0] + p4[0]) && (p1[1] + p2[1]) === (p3[1] + p4[1]);
  }

  function calCos (v1, v2) {
      return (v1[0] * v2[0] + v1[1] * v2[1]) === 0;
  };
}

// 1374. 生成每种字符都是奇数个的字符串 脑筋急转弯
/**
 * @param {number} n
 * @return {string}
 */
 var generateTheString = function(n) {
  const sb = '';
  if (n % 2 === 1) {
      return sb + 'a'.repeat(n);;
  }
  return sb + 'a'.repeat(n - 1) + 'b';
};

// 622. 设计循环队列 基础
/**
 * @param {number} k
 */
var MyCircularQueue = function(k) {
    this.capacity = k + 1;
    this.elements = new Array(this.capacity).fill(0);
    this.rear = 0;
    this.front = 0;
};

MyCircularQueue.prototype.enQueue = function(value) {
    if (this.isFull()) {
        return false;
    }
    this.elements[this.rear] = value;
    this.rear = (this.rear + 1) % this.capacity;
    return true;
};

MyCircularQueue.prototype.deQueue = function() {
    if (this.isEmpty()) {
        return false;
    }
    this.front = (this.front + 1) % this.capacity;
    return true;
};

MyCircularQueue.prototype.Front = function() {
    if (this.isEmpty()) {
        return -1;
    }
    return this.elements[this.front];
};

MyCircularQueue.prototype.Rear = function() {
    if (this.isEmpty()) {
        return -1;
    }
    return this.elements[(this.rear - 1 + this.capacity) % this.capacity];
};

MyCircularQueue.prototype.isEmpty = function() {
    return this.rear == this.front;
};

MyCircularQueue.prototype.isFull = function() {
    return ((this.rear + 1) % this.capacity) === this.front;
};


// 899. 有序队列  区分k 为1  和>1的情况
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
 var orderlyQueue = function(s, k) {
  if (k === 1) {
      let ans = s;
      for (let i = 0; i < s.length - 1; ++i) {
          const n = s.length;
          s = s.substring(1, n) + s[0];
          ans = ans < s ? ans : s;
      }
      return ans;
  }
  return [...s].sort().join('');
};

// 1403. 非递增顺序的最小子序列 排序 贪心
/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var minSubsequence = function(nums) {
  const total = _.sum(nums);
  nums.sort((a, b) => a - b);
  const ans = [];
  let curr = 0;
  for (let i = nums.length - 1; i >= 0; --i) {
      curr += nums[i];
      ans.push(nums[i]);
      if (total - curr < curr) {
          break;
      }
  }
  return ans;
};

// 623. 在二叉树中增加一行 递归
/**
 * @param {TreeNode} root
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
 var addOneRow = function(root, val, depth) {
  if (!root) {
      return null;
  }
  if (depth === 1) {
      return new TreeNode(val, root, null);
  }
  if (depth === 2) {
      root.left = new TreeNode(val, root.left, null);
      root.right = new TreeNode(val, null, root.right);
  } else {
      root.left = addOneRow(root.left, val, depth - 1);
      root.right = addOneRow(root.right, val, depth - 1);
  }
  return root;
};

// 1408. 数组中的字符串匹配  暴力拆解
/**
 * @param {string[]} words
 * @return {string[]}
 */
 var stringMatching = function(words) {
  const ret = [];
  for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < words.length; j++) {
          if (i !== j && words[j].search(words[i]) !== -1) {
              ret.push(words[i]);
              break;
          }
      }
  }
  return ret;
};

// 1413. 逐步求和得到正数的最小值  取最小值
/**
 * @param {number[]} nums
 * @return {number}
 */
 var minStartValue = function(nums) {
  let accSum = 0, accSumMin = 0;
  for (const num of nums) {
      accSum += num;
      accSumMin = Math.min(accSumMin, accSum);
  }
  return -accSumMin + 1;
};

// 640. 求解方程  逻辑计算
/**
 * @param {string} equation
 * @return {string}
 */
 var solveEquation = function(equation) {
  let factor = 0, val = 0;
  let index = 0, n = equation.length, sign1 = 1; // 等式左边默认系数为正
  while (index < n) {
      if (equation[index] === '=') {
          sign1 = -1; // 等式右边默认系数为负
          index++;
          continue;
      }

      let sign2 = sign1, number = 0;
      let valid = false; // 记录 number 是否有效
      if (equation[index] === '-' || equation[index] === '+') { // 去掉前面的符号
          sign2 = (equation[index] === '-') ? -sign1 : sign1;
          index++;
      }
      while (index < n && isDigit(equation[index])) {
          number = number * 10 + (equation[index].charCodeAt() - '0'.charCodeAt());
          index++;
          valid = true;
      }

      if (index < n && equation[index] === 'x') { // 变量
          factor += valid ? sign2 * number : sign2;
          index++;
      } else { // 数值
          val += sign2 * number;
      }
  }

  if (factor === 0) {
      return val === 0 ? "Infinite solutions" : "No solution";
  }
  if (val % factor !== 0) {
      return "No solution";
  }
  return "x=" + (-val / factor);

  function isDigit(ch) {
      return parseFloat(ch).toString() === "NaN" ? false : true;
  }
};

// 1417. 重新格式化字符串  双指针
/**
 * @param {string} s
 * @return {string}
 */
 var reformat = function(s) {
  let sumDigit = 0;
  for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (isDigit(c)) {
          sumDigit++;
      }
  }
  let sumAlpha = s.length - sumDigit;
  if (Math.abs(sumDigit - sumAlpha) > 1) {
      return "";
  }
  let flag = sumDigit > sumAlpha;
  const arr = [...s];
  for (let i = 0, j = 1; i < s.length; i += 2) {
      if (isDigit(arr[i]) !== flag) {
          while (isDigit(arr[j]) !== flag) {
              j += 2;
          }
          [arr[i], arr[j]] = [arr[j], arr[i]];
      }
  }
  return arr.join('');
  function isDigit(ch) {
    return parseFloat(ch).toString() === "NaN" ? false : true;
  }
}


// 1282. 用户分组 map
/**
 * @param {number[]} groupSizes
 * @return {number[][]}
 */
 var groupThePeople = function(groupSizes) {
  const groups = new Map();
  const n = groupSizes.length;
  for (let i = 0; i < n; i++) {
      const size = groupSizes[i];
      if (!groups.has(size)) {
          groups.set(size, []);
      }
      groups.get(size).push(i);
  }
  const groupList = [];
  for (const [size, people] of groups.entries()) {
      const groupCount = Math.floor(people.length / size);
      for (let i = 0; i < groupCount; i++) {
          const group = [];
          const start = i * size;
          for (let j = 0; j < size; j++) {
              group.push(people[start + j]);
          }
          groupList.push(group);
      }
  }
  return groupList;
};

// 1656. 设计有序流 基础题
/**
 * @param {number} n
 */
 var OrderedStream = function(n) {
  this.ptr = 1;
  this.mStream = [];
};

/** 
* @param {number} id 
* @param {string} value
* @return {string[]}
*/
OrderedStream.prototype.insert = function(id, value) {
  this.mStream[id] = value;
  var res = [];
  //只有当前插入得id等于ptr才可能返回有序流，否则不会返回
  if(id===this.ptr){
      //ptr依次往后走，直到在数组中找不到这个key为止
      while(this.ptr in this.mStream){
          res.push(this.mStream[this.ptr++]);
      }
  }
  return res;
};

// 1302. 层数最深叶子节点的和 层序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var deepestLeavesSum = function(root) {
  let sum = 0;
  const queue = [];
  queue.push(root);
  while (queue.length) {
      sum = 0;
      const size = queue.length;
      for (let i = 0; i < size; i++) {
          const node = queue.shift();
          sum += node.val;
          if (node.left) {
              queue.push(node.left);
          }
          if (node.right) {
              queue.push(node.right);
          }
      }
  }
  return sum;
};

// 1450. 在既定时间做作业的学生人数 基础题
/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number} queryTime
 * @return {number}
 */

 var busyStudent = function(startTime, endTime, queryTime) {
  const n = startTime.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
      if (startTime[i] <= queryTime && endTime[i] >= queryTime) {
          ans++;
      }
  }
  return ans;
};

// 655. 输出二叉树 深度优先搜索
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[][]}
 */
 var printTree = function(root) {
  const calDepth = (root) => {
      let h = 0;
      if (root.left) {
          h = Math.max(h, calDepth(root.left) + 1);
      }
      if (root.right) {
          h = Math.max(h, calDepth(root.right) + 1);
      }
      return h;
  }

  const dfs = (res, root, r, c, height) => {
      res[r][c] = root.val.toString();
      if (root.left) {
          dfs(res, root.left, r + 1, c - (1 << (height - r - 1)), height);
      }
      if (root.right) {
          dfs(res, root.right, r + 1, c + (1 << (height - r - 1)), height);
      }
  }

  const height = calDepth(root);
  const m = height + 1;
  const n = (1 << (height + 1)) - 1;
  const res = new Array(m).fill(0).map(() => new Array(n).fill(''));
  dfs(res, root, 0, Math.floor((n - 1) / 2), height);
  return res;
};

// 1460. 通过翻转子数组使两个数组相等 map映射
/**
 * @param {number[]} target
 * @param {number[]} arr
 * @return {boolean}
 */

 var canBeEqual = function(target, arr) {
  const counts1 = new Map();
  const counts2 = new Map();
  for (const num of target) {
      counts1.set(num, (counts1.get(num) || 0) + 1);
  }
  for (const num of arr) {
      counts2.set(num, (counts2.get(num) || 0) + 1);   
  }
  if (counts1.size !== counts2.size) {
      return false;
  }
  for (const [key, value] of counts1.entries()) {
      if (!counts2.has(key) || counts2.get(key) !== value) {
          return false;
      }
  }
  return true;
};


// 658. 找到 K 个最接近的元素 二分查找
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
 var findClosestElements = function(arr, k, x) {
  let right = binarySearch(arr, x);
  let left = right - 1;
  while (k-- > 0) {
      if (left < 0) {
          right++;
      } else if (right >= arr.length) {
          left--;
      } else if (x - arr[left] <= arr[right] - x) {
          left--;
      } else {
          right++;
      }
  }
  const ans = [];
  for (let i = left + 1; i < right; i++) {
      ans.push(arr[i]);
  }
  return ans;

  function binarySearch(arr, x) {
      let low = 0, high = arr.length - 1;
      while (low < high) {
          const mid = low + Math.floor((high - low) / 2);
          if (arr[mid] >= x) {
              high = mid;
          } else {
              low = mid + 1;
          }
      }
      return low;
  }
}

// 1470. 重新排列数组 基础题
var shuffle = function(nums, n) {
  const ans = new Array(2 * n).fill(0);
  for (let i = 0; i < n; i++) {
      ans[2 * i] = nums[i];
      ans[2 * i + 1] = nums[i + n];
  }
  return ans;
};

// 998. 最大二叉树 II 遍历右子节点
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
 var insertIntoMaxTree = function(root, val) {
  let parent = null;
  let cur = root;
  while (cur) {
      if (val > cur.val) {
          if (!parent) {
              return new TreeNode(val, root, null);
          }
          let node = new TreeNode(val, cur, null);
          parent.right = node;
          return root;
      } else {
          parent = cur;
          cur = cur.right;
      }
  }
  parent.right = new TreeNode(val);
  return root;
};

// 946. 验证栈序列 模拟
/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
 var validateStackSequences = function(pushed, popped) {
  const stack = [];
  const n = pushed.length;
  for (let i = 0, j = 0; i < n; i++) {
      stack.push(pushed[i]);
      while (stack.length && stack[stack.length - 1] == popped[j]) {
          stack.pop();
          j++;
      }
  }
  return stack.length === 0;
};

// 1475. 商品折扣后的最终价格 单调栈
/**
 * @param {number[]} prices
 * @return {number[]}
 */
 var finalPrices = function(prices) {
  const n = prices.length;
  const ans = new Array(n).fill(0);
  const stack = [];
  for (let i = n - 1; i >= 0; i--) {
      while (stack.length && stack[stack.length - 1] > prices[i]) {
          stack.pop();
      }
      ans[i] = stack.length === 0 ? prices[i] : prices[i] - stack[stack.length - 1];
      stack.push(prices[i]);
  }
  return ans;
};  

//  687. 最长同值路径  深度遍历计算
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var longestUnivaluePath = function(root) {
  let res = 0;
  const dfs = (root) => {
      if (!root) {
          return 0;
      }
      let left = dfs(root.left), right = dfs(root.right);
      let left1 = 0, right1 = 0;
      if (root.left && root.left.val === root.val) {
          left1 = left + 1;
      }
      if (root.right && root.right.val === root.val) {
          right1 = right + 1;
      }
      res = Math.max(res, left1 + right1);
      return Math.max(left1, right1);
  }
  dfs(root);
  return res;
};


// 646. 最长数对链 贪心算法
/**
 * @param {number[][]} pairs
 * @return {number}
 */
 var findLongestChain = function(pairs) {
  let curr = -Number.MAX_VALUE, res = 0;
  pairs.sort((a, b) => a[1] - b[1]);
  for (const p of pairs) {
      if (curr < p[0]) {
          curr = p[1];
          res++;
      }
  }
  return res;
}

// 652. 寻找重复的子树 序列化
/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
 var findDuplicateSubtrees = function(root) {
  const seen = new Map();
  const repeat = new Set();
  const dfs = (node) => {
      if (!node) {
          return "";
      }
      let sb = '';
      sb += node.val;
      sb += "(";
      sb += dfs(node.left);
      sb += ")(";
      sb += dfs(node.right);
      sb += ")";
      if (seen.has(sb)) {
          repeat.add(seen.get(sb));
      } else {
          seen.set(sb, node);
      }
      return sb;
  }
  dfs(root);
  return [...repeat];
};

// 828. 统计子串中的唯一字符  分别计算每个字符的贡献
/**
 * @param {string} s
 * @return {number}
 */
 var uniqueLetterString = function(s) {
  const index = new Map();
      for (let i = 0; i < s.length; i++) {
          const c = s[i];
          if (!index.has(c)) {
              index.set(c, []);
              index.get(c).push(-1);
          }
          index.get(c).push(i);
      }
      let res = 0;
      for (const [_, arr] of index.entries()) {
          arr.push(s.length);
          for (let i = 1; i < arr.length - 1; i++) {
              res += (arr[i] - arr[i - 1]) * (arr[i + 1] - arr[i]);
          }
      }
      return res;
};

// 1592. 重新排列单词间的空格 模拟
/**
 * @param {string} text
 * @return {string}
 */
 var reorderSpaces = function(text) {
  const length = text.length;
  const words = [];
  text.split(' ').forEach(e => {
      if (e.length > 0) {
          words.push(e);
      }
  });
  let cntSpace = length;
  for (const word of words) {
      if (word.length) {
          cntSpace -= word.length;
      }
  }
  let sb = '';
  if (words.length === 1) {
      sb += words[0];
      for (let i = 0; i < cntSpace; i++) {
          sb += ' ';
      }
      return sb;
  }
  const perSpace = Math.floor(cntSpace / (words.length - 1));
  const restSpace = cntSpace % (words.length - 1);
  for (let i = 0; i < words.length; i++) {
      if (i > 0) {
          for (let j = 0; j < perSpace; j++) {
              sb += ' ';
          }
      }
      sb += words[i];
  }
  for (let i = 0; i < restSpace; i++) {
      sb += ' ';
  }
  return sb;
};

// 667. 优美的排列 II 基础逻辑
/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */

 var constructArray = function(n, k) {
  const answer = new Array(n).fill(0);
  let idx = 0;
  for (let i = 1; i < n - k; ++i) {
      answer[idx] = i;
      ++idx;
  }
  for (let i = n - k, j = n; i <= j; ++i, --j) {
      answer[idx] = i;
      ++idx;
      if (i !== j) {
          answer[idx] = j;
          ++idx;
      }
  }
  return answer;
};

// 1598. 文件夹操作日志搜集器  模拟
/**
 * @param {string[]} logs
 * @return {number}
 */
 var minOperations = function(logs) {
  let depth = 0;
  for (const log of logs) {
      if ('./' === log) {
          continue;
      } else if ('../' === log) {
          if (depth > 0) {
              depth--;
          }
      } else {
          depth++;
      }
  }
  return depth;
};

// 670. 最大交换  贪心算法
/**
 * @param {number} num
 * @return {number}
 */
 var maximumSwap = function(num) {
  const charArray = [...'' + num];
  const n = charArray.length;
  let maxIdx = n - 1;
  let idx1 = -1, idx2 = -1;
  for (let i = n - 1; i >= 0; i--) {
      if (charArray[i] > charArray[maxIdx]) {
          maxIdx = i;
      } else if (charArray[i] < charArray[maxIdx]) {
          idx1 = i;
          idx2 = maxIdx;
      }
  }
  if (idx1 >= 0) {
      swap(charArray, idx1, idx2);
      return parseInt(charArray.join(''));
  } else {
      return num;
  }
  function swap(charArray, i, j) {
      const temp = charArray[i];
      charArray[i] = charArray[j];
      charArray[j] = temp;
  };
}

// 1619. 删除某些元素后的数组均值 排序求和
/**
 * @param {number[]} arr
 * @return {number}
 */
 var trimMean = function(arr) {
  const n = arr.length;
  arr.sort((a, b) => a - b);
  let partialSum = 0;
  for (let i = n / 20; i < 19 * n / 20; i++) {
      partialSum += arr[i];
  }
  return partialSum / (n * 0.9);
};

// 672. 灯泡开关 Ⅱ 找规律
/**
 * @param {number} n
 * @param {number} presses
 * @return {number}
 */
 var flipLights = function(n, presses) {
  if(presses == 0) {
      return 1;
  }
  if(n == 1) {
      return 2;
  } else if (n == 2) {
      return presses == 1 ? 3 : 4 ;
  } else {
      return presses == 1 ? 4 : presses == 2 ? 7 : 8;
  }


};

// 1624. 两个相同字符之间的最长子字符串 遍历记录
/**
 * @param {string} s
 * @return {number}
 */
 var maxLengthBetweenEqualCharacters = function(s) {
  const firstIndex = new Array(26).fill(-1);
  let maxLength = -1;
  for (let i = 0; i < s.length; i++) {
      if (firstIndex[s[i].charCodeAt() - 'a'.charCodeAt()] < 0) {
          firstIndex[s[i].charCodeAt() - 'a'.charCodeAt()] = i;
      } else {
          maxLength = Math.max(maxLength, i - firstIndex[s[i].charCodeAt() - 'a'.charCodeAt()] - 1);
      }
  }
  return maxLength;
};

// 1636. 按照频率将数组升序排序 模拟排序
/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var frequencySort = function(nums) {
  const cnt = new Map();
  for (const num of nums) {
      cnt.set(num, (cnt.get(num) || 0) + 1);
  }
  const list = [...nums];
  list.sort((a, b) => {
      const cnt1 = cnt.get(a), cnt2 = cnt.get(b);
      return cnt1 !== cnt2 ? cnt1 - cnt2 : b - a;
  });

  return list;
};

// 1640. 能否连接形成数组  哈希表
/**
 * @param {number[]} arr
 * @param {number[][]} pieces
 * @return {boolean}
 */
 var canFormArray = function(arr, pieces) {
  const n = arr.length, m = pieces.length;
  const index = new Map();
  for (let i = 0; i < m; i++) {
      index.set(pieces[i][0], i);
  }
  for (let i = 0; i < n;) {
      if (!index.has(arr[i])) {
          return false;
      }
      const j = index.get(arr[i]), len = pieces[j].length;
      for (let k = 0; k < len; k++) {
          if (arr[i + k] != pieces[j][k]) {
              return false;
          }
      }
      i = i + len;
  }
  return true;
};

// 面试题 01.02. 判定是否互为字符重排  哈希表
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
 var CheckPermutation = function(s1, s2) {
  if (s1.length !== s2.length) {
      return false;
  }
  const table = new Array(128).fill(0);
  for (let i = 0; i < s1.length; ++i) {
      table[s1.codePointAt(i)]++;
  }
  for (let i = 0; i < s2.length; ++i) {
      table[s2.codePointAt(i)]--;
      if (table[s2.codePointAt(i)] < 0) {
          return false;
      }
  }
  return true;
};

// 面试题 01.08. 零矩阵 基础题
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
 var setZeroes = function(matrix) {
  const m = matrix.length, n = matrix[0].length;
  let flagCol0 = false;
  for (let i = 0; i < m; i++) {
      if (matrix[i][0] === 0) {
          flagCol0 = true;
      }
      for (let j = 1; j < n; j++) {
          if (matrix[i][j] === 0) {
              matrix[i][0] = matrix[0][j] = 0;
          }
      }
  }
  for (let i = m - 1; i >= 0; i--) {
      for (let j = 1; j < n; j++) {
          if (matrix[i][0] === 0 || matrix[0][j] === 0) {
              matrix[i][j] = 0;
          }
      }
      if (flagCol0) {
          matrix[i][0] = 0;
      }
  }
};

// 870. 优势洗牌 贪心
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

 var advantageCount = function(nums1, nums2) {
  const n = nums1.length;
  const idx1 = new Array(n).fill(0);
  const idx2 = new Array(n).fill(0);
  for (let i = 0; i < n; ++i) {
      idx1[i] = i;
      idx2[i] = i;
  }
  idx1.sort((i, j) => nums1[i] - nums1[j]);
  idx2.sort((i, j) => nums2[i] - nums2[j]);

  const ans = new Array(n).fill(0);
  let left = 0, right = n - 1;
  for (let i = 0; i < n; ++i) {
      if (nums1[idx1[i]] > nums2[idx2[left]]) {
          ans[idx2[left]] = nums1[idx1[i]];
          ++left;
      } else {
          ans[idx2[right]] = nums1[idx1[i]];
          --right;
      }
  }
  return ans;
};
