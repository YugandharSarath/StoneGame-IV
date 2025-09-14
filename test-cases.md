# Stone Game IV - Test Cases

## Basic Test Cases

### Test Case 1: Minimum Value
- **Input**: `n = 1`
- **Expected Output**: `true`
- **Explanation**: Alice takes 1 stone (1²), Bob has no moves left. Alice wins.
- **Category**: Edge case, minimum input

### Test Case 2: Simple Losing Case
- **Input**: `n = 2`
- **Expected Output**: `false`
- **Explanation**: Alice can only take 1 stone, leaving Bob with 1 stone. Bob takes it and wins.
- **Category**: Basic case, small input

### Test Case 3: Perfect Square
- **Input**: `n = 4`
- **Expected Output**: `true`
- **Explanation**: Alice takes 4 stones (2²) in one move and wins immediately.
- **Category**: Perfect square case

### Test Case 4: Small Winning Case
- **Input**: `n = 3`
- **Expected Output**: `true`
- **Explanation**: Alice takes 1 stone, leaving Bob with 2 stones (losing position). Alice wins.
- **Category**: Basic case, optimal play

### Test Case 5: Another Losing Case
- **Input**: `n = 6`
- **Expected Output**: `true`
- **Explanation**: Alice takes 1 stone, leaving Bob with 5 stones (losing position). Alice wins.
- **Category**: Medium case

## Advanced Test Cases

### Test Case 6: Larger Perfect Square
- **Input**: `n = 9`
- **Expected Output**: `true`
- **Explanation**: Alice takes 9 stones (3²) in one move and wins immediately.
- **Category**: Perfect square, medium size

### Test Case 7: Complex Case
- **Input**: `n = 7`
- **Expected Output**: `false`
- **Explanation**: Alice's moves: take 1 → Bob has 6 (winning), take 4 → Bob has 3 (winning). Bob wins.
- **Category**: Complex optimal play

### Test Case 8: Medium Losing Case
- **Input**: `n = 15`
- **Expected Output**: `false`
- **Explanation**: All of Alice's possible moves lead to winning positions for Bob.
- **Category**: Medium complexity

### Test Case 9: Large Perfect Square
- **Input**: `n = 16`
- **Expected Output**: `true`
- **Explanation**: Alice takes 16 stones (4²) in one move and wins immediately.
- **Category**: Perfect square, larger size

### Test Case 10: Moderately Large Case
- **Input**: `n = 31`
- **Expected Output**: `true`
- **Explanation**: Alice has a winning strategy with optimal play.
- **Category**: Larger input, complex analysis

## Edge Cases

### Test Case 11: Large Value
- **Input**: `n = 100`
- **Expected Output**: `true`
- **Explanation**: Alice has a winning strategy. Tests algorithm efficiency.
- **Category**: Performance test, large input

### Test Case 12: Very Large Value
- **Input**: `n = 1000`
- **Expected Output**: `true`
- **Explanation**: Tests algorithm performance on larger inputs.
- **Category**: Performance test, very large input

### Test Case 13: Near Maximum
- **Input**: `n = 99999`
- **Expected Output**: `false`
- **Explanation**: Tests algorithm on very large input near constraint limit.
- **Category**: Stress test, maximum range

## Pattern Testing Cases

### Test Case 14: Small Range Pattern
- **Inputs**: `n = 5, 6, 7, 8`
- **Expected Outputs**: `false, true, false, true`
- **Explanation**: Tests pattern recognition in small ranges.
- **Category**: Pattern analysis

### Test Case 15: Perfect Square Sequence
- **Inputs**: `n = 1, 4, 9, 16, 25`
- **Expected Outputs**: `true, true, true, true, true`
- **Explanation**: All perfect squares should be winning positions.
- **Category**: Perfect square validation

## Performance Test Cases

### Test Case 16: Algorithm Efficiency
- **Input**: `n = 10000`
- **Expected**: Should complete within reasonable time (<1 second)
- **Category**: Performance benchmark

### Test Case 17: Memory Usage
- **Input**: `n = 50000`
- **Expected**: Should not cause memory overflow
- **Category**: Memory stress test

## Error Handling Test Cases

### Test Case 18: Invalid Input - Zero
- **Input**: `n = 0`
- **Expected Behavior**: Should handle gracefully (return false or show error)
- **Category**: Input validation

### Test Case 19: Invalid Input - Negative
- **Input**: `n = -5`
- **Expected Behavior**: Should show appropriate error message
- **Category**: Input validation

### Test Case 20: Invalid Input - Too Large
- **Input**: `n = 100001`
- **Expected Behavior**: Should show constraint violation error
- **Category**: Input validation

### Test Case 21: Invalid Input - Non-numeric
- **Input**: `n = "abc"`
- **Expected Behavior**: Should show "invalid number" error
- **Category**: Input validation

### Test Case 22: Invalid Input - Empty
- **Input**: `n = ""`
- **Expected Behavior**: Should show "please enter a number" error
- **Category**: Input validation

## UI-Specific Test Cases

### Test Case 23: Button State
- **Scenario**: Enter valid input and check button states
- **Expected**: Calculate button enabled, proper loading state
- **Category**: UI behavior

### Test Case 24: Result Display
- **Scenario**: Calculate result and verify display format
- **Expected**: Clear winner announcement with proper styling
- **Category**: UI display

### Test Case 25: Analysis Steps
- **Scenario**: Calculate for small n and verify analysis steps shown
- **Expected**: DP steps displayed clearly with reasoning
- **Category**: Educational feature

## Summary

- **Total Test Cases**: 25
- **Basic Cases**: 5
- **Advanced Cases**: 5
- **Edge Cases**: 3
- **Pattern Cases**: 2
- **Performance Cases**: 2
- **Error Handling**: 6
- **UI Cases**: 3

These test cases cover:
- ✅ Correctness of core algorithm
- ✅ Edge cases and constraints
- ✅ Performance and scalability  
- ✅ Input validation and error handling
- ✅ UI behavior and user experience
- ✅ Pattern recognition and mathematical properties