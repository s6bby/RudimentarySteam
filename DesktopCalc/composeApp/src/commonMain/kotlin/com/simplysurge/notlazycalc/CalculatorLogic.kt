package com.simplysurge.notlazycalc

import java.math.BigDecimal
import java.math.RoundingMode
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.mutableStateListOf

class CalculatorLogic {
    val tokens = mutableStateListOf<String>()

    var operationText by mutableStateOf("")
    var displayText by mutableStateOf("0")

    private fun syncDisplay() {
        val current = tokens.joinToString(" ")
        displayText = current.ifEmpty { "0" }
    }

    fun onNumClick(digit: String) {
        if (tokens.isNotEmpty() && tokens.last().toBigDecimalOrNull() != null) {
            val lastIndex = tokens.size - 1
            val lastToken = tokens[lastIndex]

            if (lastToken == "0") {
                tokens[lastIndex] = digit
            } else {
                tokens[lastIndex] = lastToken + digit
            }
        } else {
            tokens.add(digit)
        }
        syncDisplay()
    }

    fun onOperatorClick(operator: String) {
        if (tokens.isNotEmpty()) {
            if (tokens.last() in listOf("+", "-", "×", "÷")) {
                tokens[tokens.size - 1] = operator
            } else {
                tokens.add(operator)
            }
        }
        syncDisplay()
    }

    fun clearAll() {
        tokens.clear()
        operationText = ""
        displayText = "0"
    }

    fun plusOrMinusPressed() {
        if (tokens.isEmpty()) return
        val lastIndex = tokens.size - 1
        val lastToken = tokens[lastIndex]
        val number = lastToken.toBigDecimalOrNull()

        if (number != null) {
            tokens[lastIndex] = if (lastToken.startsWith("-")) {
                lastToken.substring(1)
            } else {
                "-$lastToken"
            }
        }
        syncDisplay()
    }

    fun backspacePressed() {
        if (tokens.isEmpty()) return
        val lastIndex = tokens.size - 1
        val lastToken = tokens[lastIndex]

        if (lastToken.length > 1) {
            tokens[lastIndex] = lastToken.dropLast(1)
        } else {
            tokens.removeAt(lastIndex)
        }
        syncDisplay()
    }

    fun decimalPressed() {
        if (tokens.isEmpty() || tokens.last() in listOf("+", "-", "×", "÷")) {
            tokens.add("0.")
        } else {
            val lastToken = tokens.last()
            if (!lastToken.contains(".")) {
                val lastIndex = tokens.size - 1
                tokens[lastIndex] = "$lastToken."
            }
        }
        syncDisplay()
    }

    fun percentPressed() {
        if (tokens.isEmpty()) return
        val lastIndex = tokens.size - 1
        val lastToken = tokens[lastIndex]
        val number = lastToken.toBigDecimalOrNull()

        if (number != null) {
            val percentValue = number.divide(BigDecimal("100.0"), 4, RoundingMode.HALF_UP)
            tokens[lastIndex] = percentValue.stripTrailingZeros().toPlainString()
        }
        syncDisplay()
    }

    fun equalsPressed() {
        if (tokens.isEmpty()) return
        try {
            val rpn = shunt(tokens)
            val result = evalRPN(rpn)
            if (result is java.math.BigDecimal) {
                val formattedResult = result.stripTrailingZeros().toPlainString()

                operationText = tokens.joinToString(" ") + " ="

                tokens.clear()
                tokens.add(formattedResult)
                syncDisplay()
            }
        } catch (e: Exception) {
            displayText = "Error"
            tokens.clear()
        }
    }

    private fun shunt(tokens: List<String>): List<String> {
        val outputQueue = ArrayDeque<String>()
        val operatorStack = ArrayDeque<String>()
        val precedence = mapOf("+" to 1, "-" to 1, "×" to 2, "÷" to 2)

        for (token in tokens) {
            when {
                token.toBigDecimalOrNull() != null -> outputQueue.addLast(token)
                token in precedence.keys -> {
                    while (operatorStack.isNotEmpty() && (precedence[operatorStack.last()] ?: 0) >= precedence[token]!!) {
                        outputQueue.addLast(operatorStack.removeLast())
                    }
                    operatorStack.addLast(token)
                }
            }
        }
        while (operatorStack.isNotEmpty()) outputQueue.addLast(operatorStack.removeLast())
        return outputQueue
    }

    private fun evalRPN(rpn: List<String>): Any {
        val stack = ArrayDeque<BigDecimal>()
        for (token in rpn) {
            val number = token.toBigDecimalOrNull()
            if (number != null) {
                stack.addLast(number)
            } else {
                if (stack.size < 2) return "Error"
                val second = stack.removeLast()
                val first = stack.removeLast()
                val result = when (token) {
                    "+" -> first.add(second)
                    "-" -> first.subtract(second)
                    "×" -> first.multiply(second)
                    "÷" -> if (second != BigDecimal("0.0")) first.divide(second, 8, RoundingMode.HALF_UP) else BigDecimal("0.0")
                    else -> BigDecimal("0.0")
                }
                stack.addLast(result)
            }
        }
        return if (stack.isNotEmpty()) stack.last() else BigDecimal("0.0")
    }
}