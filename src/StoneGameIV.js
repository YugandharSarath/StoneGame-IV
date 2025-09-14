import React from 'react';

function StoneGameIV() {
    const [n, setN] = React.useState('');
    const [result, setResult] = React.useState(null);
    const [gameSteps, setGameSteps] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const winnerSquareGame = (n) => {
        if (n === 0) return false;

        const dp = new Array(n + 1).fill(false);
        const steps = [];

        for (let i = 1; i <= n; i++) {
            dp[i] = false;

            for (let k = 1; k * k <= i; k++) {
                const square = k * k;

                if (!dp[i - square]) {
                    dp[i] = true;
                    steps.push({
                        stones: i,
                        canWin: true,
                        optimalMove: square,
                        reasoning: `With ${i} stones, take ${square} stones. Opponent left with ${i - square} stones (losing position)`
                    });
                    break;
                }
            }

            if (!dp[i]) {
                steps.push({
                    stones: i,
                    canWin: false,
                    reasoning: `With ${i} stones, all moves lead to opponent winning positions`
                });
            }
        }

        return { canWin: dp[n], steps };
    };

    const handleCalculate = () => {
        setError('');
        setResult(null);
        setGameSteps([]);

        const num = parseInt(n);

        if (isNaN(num) || num < 1 || num > 100000) {
            setError('Please enter a valid number between 1 and 100,000');
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            try {
                const gameResult = winnerSquareGame(num);
                setResult(gameResult.canWin);
                setGameSteps(gameResult.steps.slice(-10)); 
                setIsLoading(false);
            } catch (err) {
                setError('An error occurred during calculation');
                setIsLoading(false);
            }
        }, 100);
    };

    const handleReset = () => {
        setN('');
        setResult(null);
        setGameSteps([]);
        setError('');
    };

    const getPerfectSquares = (max) => {
        const squares = [];
        for (let i = 1; i * i <= max; i++) {
            squares.push(i * i);
        }
        return squares;
    };

    return React.createElement(
        'div',
        { className: 'stone-game-container' },

        React.createElement(
            'div',
            { className: 'header' },
            React.createElement('h1', null, 'Stone Game IV'),
            React.createElement('p', { className: 'description' }, 
                'Alice and Bob take turns removing square numbers of stones. Alice goes first. Who wins with optimal play?'
            )
        ),

        React.createElement(
            'div',
            { className: 'input-section' },
            React.createElement(
                'div',
                { className: 'input-group' },
                React.createElement('label', { htmlFor: 'stones-input' }, 'Number of stones (n):'),
                React.createElement('input', {
                    id: 'stones-input',
                    'data-testid': 'stones-input',
                    type: 'number',
                    value: n,
                    onChange: (e) => setN(e.target.value),
                    placeholder: 'Enter number of stones (1-100000)',
                    min: 1,
                    max: 100000
                })
            ),
            React.createElement(
                'div',
                { className: 'button-group' },
                React.createElement(
                    'button',
                    {
                        'data-testid': 'calculate-button',
                        onClick: handleCalculate,
                        disabled: isLoading || !n,
                        className: 'calculate-btn'
                    },
                    isLoading ? 'Calculating...' : 'Calculate Winner'
                ),
                React.createElement(
                    'button',
                    {
                        'data-testid': 'reset-button',
                        onClick: handleReset,
                        className: 'reset-btn'
                    },
                    'Reset'
                )
            )
        ),

        error && React.createElement(
            'div',
            { className: 'error', 'data-testid': 'error-message' },
            error
        ),

        result !== null && React.createElement(
            'div',
            { className: 'result-section' },
            React.createElement(
                'div',
                { 
                    className: `result ${result ? 'alice-wins' : 'bob-wins'}`,
                    'data-testid': 'result-display'
                },
                React.createElement('h2', null, result ? 'Alice Wins!' : 'Bob Wins!'),
                React.createElement('p', null, 
                    result 
                        ? 'Alice has a winning strategy with optimal play.'
                        : 'Bob has a winning strategy with optimal play.'
                )
            ),

            n && React.createElement(
                'div',
                { className: 'perfect-squares' },
                React.createElement('h3', null, 'Available moves (perfect squares ≤ ', n, '):'),
                React.createElement(
                    'div',
                    { className: 'squares-list' },
                    getPerfectSquares(parseInt(n)).map(square =>
                        React.createElement('span', { key: square, className: 'square' }, square)
                    )
                )
            )
        ),

        gameSteps.length > 0 && React.createElement(
            'div',
            { className: 'analysis-section' },
            React.createElement('h3', null, 'Game Analysis (Dynamic Programming Steps)'),
            React.createElement(
                'div',
                { className: 'steps-container', 'data-testid': 'analysis-steps' },
                gameSteps.map((step, index) =>
                    React.createElement(
                        'div',
                        { 
                            key: step.stones, 
                            className: `step ${step.canWin ? 'winning' : 'losing'}` 
                        },
                        React.createElement(
                            'div',
                            { className: 'step-header' },
                            React.createElement('strong', null, `${step.stones} stones: `),
                            React.createElement(
                                'span',
                                { className: step.canWin ? 'win' : 'lose' },
                                step.canWin ? 'WIN' : 'LOSE'
                            )
                        ),
                        React.createElement('p', null, step.reasoning),
                        step.optimalMove && React.createElement(
                            'p',
                            { className: 'optimal-move' },
                            `Optimal move: Take ${step.optimalMove} stones`
                        )
                    )
                )
            )
        ),

        React.createElement(
            'div',
            { className: 'explanation-section' },
            React.createElement('h3', null, 'How it works'),
            React.createElement(
                'div',
                { className: 'explanation' },
                React.createElement('p', null, 
                    '1. This is a classic game theory problem solved using Dynamic Programming.'
                ),
                React.createElement('p', null,
                    '2. For each number of stones i, we check if the current player can win.'
                ),
                React.createElement('p', null,
                    '3. The current player wins if they can make a move that leaves the opponent in a losing position.'
                ),
                React.createElement('p', null,
                    '4. We try all possible square moves (1, 4, 9, 16, ...) and check if any leads to opponent losing.'
                ),
                React.createElement('p', null,
                    '5. Time Complexity: O(n√n), Space Complexity: O(n)'
                )
            )
        )
    );
}

export default StoneGameIV;