
---

## Stone Game IV

### Requirements

* Determine if Alice (the first player) can win if both players play optimally.
* Players take turns removing a **perfect square number** of stones (1, 4, 9, 16...).
* A player loses if no move is possible (when 0 stones remain).
* Alice always goes first.

### Edge Cases & Constraints

* **n = 1** → Alice wins by taking 1 stone.
* **n = 2 or 3** → Alice loses because Bob can force a win.
* **n is a perfect square** → Alice can take all stones in one move and win.
* Large `n` (up to 100,000) → Solution must be efficient.
* Must consider all possible moves (all perfect squares ≤ n).

### data-testid Attributes

* `stones-input` → Input for number of stones.
* `calculate-button` → Button to calculate winner.
* `reset-button` → Button to reset form.
* `result-display` → Area showing winner result.
* `error-message` → Area showing validation errors.
* `analysis-steps` → Section showing DP/logic steps.

---

