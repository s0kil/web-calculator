function solveEasy(string) {
    // Is This Cheating?
    return Number(eval(string))
}

function solve(expression) {
    function evaluator(firstNumber, operation, secondNumber) {
        const isSafe = (number) => {
            if (Number.isSafeInteger(Number.parseInt(number, 10))) {
                return number
            }

            if (number === Infinity) return "Undefined"

            return "Error"
        }

        switch (operation) {
            case "/":
                return isSafe(firstNumber / secondNumber)
            case "*":
                return isSafe(firstNumber * secondNumber)
            case "+":
                return isSafe(firstNumber + secondNumber)
            case "-":
                return isSafe(firstNumber - secondNumber)
        }
    }

    function multiplicationDivisionPass(expression) {
        const matchResult = new RegExp(
            /(?<left>(\-?\d+\.?\d*))(?<operation>[\*|\/])(?<right>(\-?\d+\.?\d*))/g,
        ).exec(expression)
        if (!matchResult) return null
        else {
            const matchString = matchResult[0]
            return {
                string: matchString,
                ...matchResult.groups,
            }
        }
    }

    function additionSubtractionPass(expression) {
        const matchResult = new RegExp(
            /(?<left>(\-?\d+\.?\d*))(?<operation>[\+|\-])(?<right>(\-?\d+\.?\d*))/g,
        ).exec(expression)
        if (!matchResult) return null
        else {
            const matchString = matchResult[0]
            return {
                string: matchString,
                ...matchResult.groups,
            }
        }
    }

    // Multiplication And Division Pass
    while (multiplicationDivisionPass(expression) !== null) {
        const { string, left, operation, right } =
            multiplicationDivisionPass(expression)
        expression = expression.replace(
            string,
            evaluator(Number(left), operation, Number(right)),
        )
    }

    // Addition And Subtraction Pass
    while (additionSubtractionPass(expression) !== null) {
        const { string, left, operation, right } =
            additionSubtractionPass(expression)
        expression = expression.replace(
            string,
            evaluator(Number(left), operation, Number(right)),
        )
    }

    return expression
}

function testSolver() {
    const tests = [
        { expression: "23.5+7", solution: "30.5" },
        { expression: "2+3-17", solution: "-12" },
        { expression: "2+3*8", solution: "26" },
        { expression: "2/0", solution: "Undefined" },
        { expression: "20000*99999*9", solution: "17999820000" },
        {
            expression: "9*9*9*9*9*9*9*9*9*9*9*9*9*9*9*9",
            solution: "1853020188851841",
        },
        {
            expression: "9*9*9*9*9*9*9*9*9*9*9*9*9*9*9*9*9",
            solution: "Error",
        },
    ]

    tests.forEach((testCase) => {
        const solution = solve(testCase.expression)
        console.table([
            ["Expression:", testCase.expression],
            ["Expected:", testCase.solution],
            ["Got:", solution],
        ])
    })
}
testSolver()

export default { solve: solve }
