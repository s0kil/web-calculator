import calculator from "./calculator.js"

function renderOutput(output) {
    const operationSymbols = {
        "/": "&#247;",
        "*": "&#215;",
        "-": "&#8722;",
        "+": "&#43;",
    }

    document.querySelector("#calculator-response-pane").textContent =
        String(output)
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
                    // Cannot Have More Than One Operation
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
                if (isNaN(itemValue)) return

                currentValue += itemValue
                lastCommand = itemValue
                renderOutput(currentValue)
            }
        }
    })
}
initializeCalculator()
