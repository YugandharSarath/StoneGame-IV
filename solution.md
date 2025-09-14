# Stone Game IV - Solution

## Step-by-Step Explanation

### Understanding the Problem
This is a **game theory** problem where we need to determine if the first player (Alice) has a winning strategy. The key insight is that this is an **impartial game** - both players have the same moves available at any position.

### Dynamic Programming Approach

The solution uses the **Sprague-Grundy theorem** concept where:
- A position is **winning** if the current player can move to at least one **losing** position for the opponent
- A position is **losing** if all possible moves lead to **winning** positions for the opponent

### Algorithm Implementation

```javascript
function winnerSquareGame(n) {
    if (n === 0) return false; // Base case: no moves available
    
    // dp[i] = true if current player can win with i stones
    const dp = new Array(n + 1).fill(false);
    
    // Build up solution for all positions from 1 to n
    for (let i = 1; i <= n; i++) {
        dp[i] = false; // Assume losing position initially
        
        // Try all possible square moves
        for (let k = 1; k * k <= i; k++) {
            const square = k * k;
            
            // If taking 'square' stones leaves opponent in losing position
            if (!dp[i - square]) {
                dp[i] = true; // Current player wins
                break; // Found winning move, no need to check others
            }
        }
    }
    
    return dp[n];
}
```

## Dry Run Example: n = 7

Let's trace through the algorithm for n = 7:

### Step-by-step execution:

**i = 1:**
- Possible moves: take 1² = 1 stone
- After taking 1: opponent has 0 stones → dp[0] = false (opponent loses)
- Since opponent loses, dp[1] = true ✅

**i = 2:**
- Possible moves: take 1² = 1 stone
- After taking 1: opponent has 1 stone → dp[1] = true (opponent wins)
- All moves lead to opponent winning, so dp[2] = false ❌

**i = 3:**
- Possible moves: take 1² = 1 stone
- After taking 1: opponent has 2 stones → dp[2] = false (opponent loses)
- Since opponent loses, dp[3] = true ✅

**i = 4:**
- Possible moves: take 1² = 1 or 2² = 4 stones
- Take 1: opponent has 3 stones → dp[3] = true (opponent wins)
- Take 4: opponent has 0 stones → dp[0] = false (opponent loses) ✅
- Found winning move, dp[4] = true ✅

**i = 5:**
- Possible moves: take 1² = 1 or 2² = 4 stones
- Take 1: opponent has 4 stones → dp[4] = true (opponent wins)
- Take 4: opponent has 1 stone → dp[1] = true (opponent wins)
- All moves lead to opponent winning, so dp[5] = false ❌

**i = 6:**
- Possible moves: take 1² = 1 or 2² = 4 stones
- Take 1: opponent has 5 stones → dp[5] = false (opponent loses) ✅
- Found winning move, dp[6] = true ✅

**i = 7:**
- Possible moves: take 1² = 1 or 2² = 4 stones
- Take 1: opponent has 6 stones → dp[6] = true (opponent wins)
- Take 4: opponent has 3 stones → dp[3] = true (opponent wins)
- All moves lead to opponent winning, so dp[7] = false ❌

**Result:** dp[7] = false, so Bob wins with optimal play.

## Optimal Strategy for n = 7

Alice's dilemma:
- If Alice takes 1 stone → 6 stones remain (Bob wins)
- If Alice takes 4 stones → 3 stones remain (Bob wins)

No matter what Alice does, Bob can force a win!

## Complete JavaScript Solution

```javascript
/**
 * Determines if Alice (first player) can win the Stone Game IV
 * @param {number} n - Number of stones initially
 * @return {boolean} - True if Alice wins, false if Bob wins
 */
function winnerSquareGame(n) {
    // Edge case: no stones means current player loses
    if (n === 0) return false;
    
    // dp[i] represents whether current player can win with i stones
    const dp = new Array(n + 1).fill(false);
    
    // Base case: dp[0] = false (no moves available)
    dp[0] = false;
    
    // Fill dp table for all positions
    for (let stones = 1; stones <= n; stones++) {
        dp[stones] = false; // Assume losing position
        
        // Try all possible perfect square moves
        for (let k = 1; k * k <= stones; k++) {
            const squareMove = k * k;
            const remaining = stones - squareMove;
            
            // If this move leaves opponent in losing position
            if (!dp[remaining]) {
                dp[stones] = true; // Current player wins
                break; // Found winning move, exit early
            }
        }
    }
    
    return dp[n];
}

// Helper function to get all perfect squares up to n
function getPerfectSquares(n) {
    const squares = [];
    for (let i = 1; i * i <= n; i++) {
        squares.push(i * i);
    }
    return squares;
}
```

## Time and Space Complexity Analysis

### Time Complexity: O(n√n)
- **Outer loop**: Iterate from 1 to n → O(n)
- **Inner loop**: For each i, check all perfect squares k² ≤ i
  - Maximum value of k is √i, so inner loop runs O(√i) times
  - For i = n, this is O(√n)
- **Total**: O(n × √n) = O(n√n)

### Space Complexity: O(n)
- **DP array**: Size n+1 to store winning/losing status for each position
- **Additional space**: O(1) for variables
- **Total**: O(n)

## Edge Cases Handled

1. **n = 0**: No moves available → losing position
2. **n = 1**: Only move is take 1 → winning position  
3. **Perfect squares**: Can take all stones in one move → winning position
4. **Large n**: Algorithm handles up to 10⁵ efficiently
5. **Small values**: Correctly handles base cases and small game trees

## Optimization Notes

1. **Early termination**: Break inner loop when first winning move is found
2. **Perfect square generation**: Only compute squares up to √n
3. **Memory usage**: Could optimize to O(√n) space using different approach
4. **Pattern recognition**: For some ranges, mathematical patterns might exist