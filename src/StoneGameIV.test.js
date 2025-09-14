import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoneGameIV from './StoneGameIV';

function winnerSquareGame(n) {
    if (n === 0) return false;

    const dp = new Array(n + 1).fill(false);

    for (let i = 1; i <= n; i++) {
        dp[i] = false;

        for (let k = 1; k * k <= i; k++) {
            if (!dp[i - k * k]) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[n];
}

function getPerfectSquares(max) {
    const squares = [];
    for (let i = 1; i * i <= max; i++) {
        squares.push(i * i);
    }
    return squares;
}

function validateInput(input) {
    const num = parseInt(input);
    return !isNaN(num) && num >= 1 && num <= 100000;
}

describe('Stone Game IV - Core Logic Tests', () => {
    test('should return true for n = 1 (Alice can take 1 stone)', () => {
        expect(winnerSquareGame(1)).toBe(true);
    });

    test('should return false for n = 2 (Alice takes 1, Bob takes 1)', () => {
        expect(winnerSquareGame(2)).toBe(false);
    });

    test('should return true for n = 4 (Alice can take all 4 stones)', () => {
        expect(winnerSquareGame(4)).toBe(true);
    });

    test('should return true for n = 3 (Alice takes 1, Bob left with 2)', () => {
        expect(winnerSquareGame(3)).toBe(true);
    });

    test('should return true for n = 6 (Alice has winning strategy)', () => {
        expect(winnerSquareGame(6)).toBe(true);
    });

    test('should return true for n = 9 (perfect square)', () => {
        expect(winnerSquareGame(9)).toBe(true);
    });

    test('should return false for n = 15', () => {
        expect(winnerSquareGame(15)).toBe(false);
    });

    test('should return true for n = 16 (perfect square)', () => {
        expect(winnerSquareGame(16)).toBe(true);
    });

    test('should handle edge case n = 0', () => {
        expect(winnerSquareGame(0)).toBe(false);
    });

    test('should work for larger numbers like n = 100', () => {
        const result = winnerSquareGame(100);
        expect(typeof result).toBe('boolean');
    });
});

describe('Stone Game IV - Helper Functions', () => {
    test('should generate correct perfect squares for n = 10', () => {
        const squares = getPerfectSquares(10);
        expect(squares).toHaveLength(3);
        expect(squares).toEqual([1, 4, 9]);
    });

    test('should generate correct perfect squares for n = 16', () => {
        const squares = getPerfectSquares(16);
        expect(squares).toHaveLength(4);
        expect(squares).toEqual([1, 4, 9, 16]);
    });

    test('should return empty array for n = 0', () => {
        const squares = getPerfectSquares(0);
        expect(squares).toHaveLength(0);
    });

    test('should validate correct inputs', () => {
        expect(validateInput('1')).toBeTruthy();
        expect(validateInput('100')).toBeTruthy();
        expect(validateInput('100000')).toBeTruthy();
    });

    test('should reject invalid inputs', () => {
        expect(validateInput('0')).toBeFalsy();
        expect(validateInput('-1')).toBeFalsy();
        expect(validateInput('100001')).toBeFalsy();
        expect(validateInput('abc')).toBeFalsy();
        expect(validateInput('')).toBeFalsy();
    });
});

describe('Stone Game IV - React Component UI Tests with data-testid', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders all required elements with correct data-testid attributes', () => {
        render(<StoneGameIV />);

        expect(screen.getByTestId('stones-input')).toBeInTheDocument();
        expect(screen.getByTestId('calculate-button')).toBeInTheDocument();
        expect(screen.getByTestId('reset-button')).toBeInTheDocument();

        expect(screen.queryByTestId('result-display')).not.toBeInTheDocument();
        expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
        expect(screen.queryByTestId('analysis-steps')).not.toBeInTheDocument();
    });

    test('stones-input data-testid accepts valid numbers', () => {
        render(<StoneGameIV />);

        const input = screen.getByTestId('stones-input');
        fireEvent.change(input, { target: { value: '10' } });

        expect(input.value).toBe('10');
    });

    test('calculate-button data-testid is disabled when input is empty', () => {
        render(<StoneGameIV />);

        const calculateButton = screen.getByTestId('calculate-button');
        expect(calculateButton).toBeDisabled();
    });

    test('calculate-button data-testid is enabled when input has valid value', () => {
        render(<StoneGameIV />);

        const input = screen.getByTestId('stones-input');
        const calculateButton = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: '5' } });
        expect(calculateButton).toBeEnabled();
    });

    test('error-message data-testid shows for invalid input', async () => {
        render(<StoneGameIV />);

        const input = screen.getByTestId('stones-input');
        const calculateButton = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: '0' } });
        fireEvent.click(calculateButton);

        await waitFor(() => {
            expect(screen.getByTestId('error-message')).toBeInTheDocument();
            expect(screen.getByTestId('error-message')).toHaveTextContent(
                'Please enter a valid number between 1 and 100,000'
            );
        });
    });

    test('error-message data-testid shows for input too large', async () => {
        render(<StoneGameIV />);

        const input = screen.getByTestId('stones-input');
        const calculateButton = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: '100001' } });
        fireEvent.click(calculateButton);

        await waitFor(() => {
            expect(screen.getByTestId('error-message')).toBeInTheDocument();
        });
    });

    test('result-display data-testid shows for Alice winning case (n=1)', async () => {
        render(<StoneGameIV />);

        const input = screen.getByTestId('stones-input');
        const calculateButton = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: '1' } });
        fireEvent.click(calculateButton);

        await waitFor(() => {
            const resultDisplay = screen.getByTestId('result-display');
            expect(resultDisplay).toBeInTheDocument();
            expect(resultDisplay).toHaveTextContent('Alice Wins!');
            expect(resultDisplay).toHaveClass('alice-wins');
        });
    });

    test('result-display data-testid shows for Bob winning case (n=2)', async () => {
        render(<StoneGameIV />);

        const input = screen.getByTestId('stones-input');
        const calculateButton = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: '2' } });
        fireEvent.click(calculateButton);

        await waitFor(() => {
            const resultDisplay = screen.getByTestId('result-display');
            expect(resultDisplay).toBeInTheDocument();
            expect(resultDisplay).toHaveTextContent('Bob Wins!');
            expect(resultDisplay).toHaveClass('bob-wins');
        });
    });

    test('analysis-steps data-testid shows after calculation', async () => {
        render(<StoneGameIV />);

        const input = screen.getByTestId('stones-input');
        const calculateButton = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: '5' } });
        fireEvent.click(calculateButton);

        await waitFor(() => {
            expect(screen.getByTestId('analysis-steps')).toBeInTheDocument();
        });
    });

    test('reset-button data-testid clears all data and hides data-testid elements', async () => {
        render(<StoneGameIV />);

        const input = screen.getByTestId('stones-input');
        const calculateButton = screen.getByTestId('calculate-button');
        const resetButton = screen.getByTestId('reset-button');

        fireEvent.change(input, { target: { value: '3' } });
        fireEvent.click(calculateButton);

        await waitFor(() => {
            expect(screen.getByTestId('result-display')).toBeInTheDocument();
        });

        fireEvent.click(resetButton);

        expect(input.value).toBe('');
        expect(screen.queryByTestId('result-display')).not.toBeInTheDocument();
        expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
        expect(screen.queryByTestId('analysis-steps')).not.toBeInTheDocument();
    });

    test('calculate-button data-testid shows loading state during calculation', async () => {
        render(<StoneGameIV />);

        const input = screen.getByTestId('stones-input');
        const calculateButton = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: '100' } });
        fireEvent.click(calculateButton);

        expect(calculateButton).toHaveTextContent('Calculating...');
        expect(calculateButton).toBeDisabled();

        await waitFor(() => {
            expect(calculateButton).toHaveTextContent('Calculate Winner');
            expect(calculateButton).toBeEnabled();
        });
    });

    test('all data-testid elements work efficiently for large numbers', async () => {
        render(<StoneGameIV />);

        const input = screen.getByTestId('stones-input');
        const calculateButton = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: '1000' } });

        const startTime = Date.now();
        fireEvent.click(calculateButton);

        await waitFor(() => {
            expect(screen.getByTestId('result-display')).toBeInTheDocument();
            expect(screen.getByTestId('analysis-steps')).toBeInTheDocument();
        }, { timeout: 5000 });

        const endTime = Date.now();
        expect(endTime - startTime).toBeLessThan(3000);
    });

    test('stones-input data-testid validation works correctly', async () => {
        render(<StoneGameIV />);

        const input = screen.getByTestId('stones-input');
        const calculateButton = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: '1' } });
        expect(calculateButton).toBeEnabled();

        fireEvent.change(input, { target: { value: '100000' } });
        expect(calculateButton).toBeEnabled();

        fireEvent.change(input, { target: { value: '50000' } });
        fireEvent.click(calculateButton);

        await waitFor(() => {
            expect(screen.getByTestId('result-display')).toBeInTheDocument();
        });
    });

    test('perfect square detection works with data-testid elements', async () => {
        render(<StoneGameIV />);

        const input = screen.getByTestId('stones-input');
        const calculateButton = screen.getByTestId('calculate-button');

        const perfectSquares = [1, 4, 9, 16, 25];

        for (const square of perfectSquares) {
            fireEvent.change(input, { target: { value: square.toString() } });
            fireEvent.click(calculateButton);

            await waitFor(() => {
                const resultDisplay = screen.getByTestId('result-display');
                expect(resultDisplay).toBeInTheDocument();
                expect(resultDisplay).toHaveTextContent('Alice Wins!');
            });

            fireEvent.click(screen.getByTestId('reset-button'));
        }
    });
});

describe('Stone Game IV - Algorithm Performance Tests', () => {
    test('should handle edge cases correctly', () => {
        expect(winnerSquareGame(0)).toBe(false);
        expect(winnerSquareGame(1)).toBe(true);
        expect(winnerSquareGame(2)).toBe(false);
    });

    test('should be efficient for large inputs', () => {
        const start = Date.now();
        winnerSquareGame(10000);
        const end = Date.now();
        expect(end - start).toBeLessThan(1000); 
    });

    test('should handle all perfect squares correctly', () => {
        const perfectSquares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100];
        perfectSquares.forEach(n => {
            expect(winnerSquareGame(n)).toBe(true);
        });
    });
});