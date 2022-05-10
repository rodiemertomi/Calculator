class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.previousOperand = ''
    this.currentOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    if (number === '.' && this.currentOperand === '') {
      this.currentOperand = `0${number}`
      return
    }
    if (number === '0' && this.currentOperand === '0') return
    // if (number === '0' && this.currentOperand.includes('.0')) return
    this.currentOperand = `${this.currentOperand}${number}`
  }

  chooseOperation(operation) {
    if (this.currentOperand.includes('.')) {
      while (
        this.currentOperand.charAt(this.currentOperand.length - 1) === '0' ||
        this.currentOperand.charAt(this.currentOperand.length - 1) === '.'
      ) {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
      }
    }
    if (this.currentOperand === '' && this.operation) {
      this.operation = undefined
      this.operation = operation
      this.previousOperand = this.previousOperand.toString().slice(0, -1)
      this.previousOperand = `${this.previousOperand} ${operation}`
      return
    }
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = `${this.currentOperand} ${operation}`
    this.currentOperand = ''
  }

  compute() {
    if (this.previousOperand === '') return
    let computedValue
    switch (this.operation) {
      case '+':
        computedValue = parseFloat(this.previousOperand) + parseFloat(this.currentOperand)
        break
      case '-':
        computedValue = parseFloat(this.previousOperand) - parseFloat(this.currentOperand)
        break
      case '*':
        computedValue = parseFloat(this.previousOperand) * parseFloat(this.currentOperand)
        break
      case '÷':
        computedValue = parseFloat(this.previousOperand) / parseFloat(this.currentOperand)
        break
    }
    this.currentOperand = computedValue.toString()
    this.previousOperand = ''
    this.operation = undefined
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand

    this.previousOperandTextElement.innerText = this.previousOperand
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})
