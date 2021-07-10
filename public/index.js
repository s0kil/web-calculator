import calculator from "./calculator.js"

function renderOutput(output) {
    const operationSymbols = {
        "/": "&#247;",
        "*": "&#215;",
        "-": "&#8722;",
        "+": "&#43;",
    }

    // Replace Arithmetic Operations With HTML Symbols
    const formattedOutput = [...String(output)].reduce((result, character) => {
        return (
            result +
            (character in operationSymbols
                ? operationSymbols[character]
                : character)
        )
    }, "")

    document.querySelector("#calculator-response-pane").innerHTML =
        formattedOutput
}

function initializeCalculator() {
    let currentValue = ""
    let lastCommand = null
    const lastCharIsOperationRegex = /([\/|\*|\-|\+])$/

    const calculatorItems = Array.from(
        document.querySelectorAll(".calculator-item"),
    )

    calculatorItems.forEach((calculatorItem) => {
        const itemDataset = calculatorItem.dataset
        const itemValue = calculatorItem.dataset.value
        calculatorItem.textContent = itemValue

        calculatorItem.onclick = () => {
            if ("function" in itemDataset) {
                const itemFunction = itemDataset.function
                if (itemFunction === "allClear") {
                    currentValue = ""
                    lastCommand = null
                    renderOutput("0")
                }

                return
            }

            if ("operation" in itemDataset) {
                // Operation Cannot Be First
                if (!currentValue) return

                let operation = itemDataset.operation

                if (operation === "equals") {
                    if (currentValue.match(lastCharIsOperationRegex)) {
                        // Operation Cannot Be Last
                        return
                    }

                    currentValue = calculator.solve(currentValue)
                    renderOutput(currentValue)
                    return
                }

                const operationsCommand = {
                    division: "/",
                    multiplication: "*",
                    subtraction: "-",
                    addition: "+",
                }

                const command = operationsCommand[operation]
                if (Object.values(operationsCommand).includes(lastCommand)) {
                    // Cannot Have More Than One Operation In Succession
                    currentValue = currentValue.replace(
                        lastCharIsOperationRegex,
                        command,
                    )
                    lastCommand = command
                    renderOutput(currentValue)
                    return
                }

                currentValue += command
                lastCommand = command
                renderOutput(currentValue)
            } else {
                currentValue += itemValue
                lastCommand = itemValue
                renderOutput(currentValue)
            }
        }
    })
}
initializeCalculator()
