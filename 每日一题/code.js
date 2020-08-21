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
