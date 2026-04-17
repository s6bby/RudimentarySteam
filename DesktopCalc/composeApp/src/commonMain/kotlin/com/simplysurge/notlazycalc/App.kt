package com.simplysurge.notlazycalc

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.foundation.layout.Box
import androidx.compose.animation.core.*
import androidx.compose.runtime.LaunchedEffect

@Composable
fun App() {
    val logic = remember { CalculatorLogic() }
    val spacing = 10.dp

    MaterialTheme {
        Surface(modifier = Modifier.fillMaxSize(), color = Color(0xFFAEE3F8)) {
            Column(modifier = Modifier.padding(spacing)) {
                Column(
                    modifier = Modifier.fillMaxWidth().weight(2f).padding(horizontal = 16.dp),
                    horizontalAlignment = Alignment.End,
                    verticalArrangement = Arrangement.Center
                ) {
                    Box(modifier = Modifier.height(40.dp), contentAlignment = Alignment.CenterEnd) {
                        AutoResizeText(
                            text = logic.operationText,
                            maxFontSize = 24.sp,
                            color = Color(0xFF1B2F59).copy(alpha = 0.6f)
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Box(
                        modifier = Modifier.height(100.dp),
                        contentAlignment = Alignment.CenterEnd
                    ) {
                        AutoResizeText(
                            text = logic.displayText,
                            maxFontSize = 80.sp,
                            color = Color(0xFF1B2F59),
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
                Column(
                    modifier = Modifier.weight(4f),
                    verticalArrangement = Arrangement.spacedBy(spacing)
                ) {
                    CalcRow(listOf("AC", "+/-", "%", "÷"), logic, spacing, Modifier.weight(1f))
                    CalcRow(listOf("7", "8", "9", "×"), logic, spacing, Modifier.weight(1f))
                    CalcRow(listOf("4", "5", "6", "-"), logic, spacing, Modifier.weight(1f))
                    CalcRow(listOf("1", "2", "3", "+"), logic, spacing, Modifier.weight(1f))
                    CalcRow(listOf(".", "0", "⌫", "="), logic, spacing, Modifier.weight(1f))
                }
            }
        }
    }
}

@Composable
fun CalcRow(
    buttons: List<String>,
    logic: CalculatorLogic,
    spacing: androidx.compose.ui.unit.Dp,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(spacing)
    ) {
        buttons.forEach { label ->
            Box(modifier = Modifier.weight(1f).fillMaxHeight()) {
                CalculatorButton(label, logic)
            }
        }
    }
}

@Composable
fun CalculatorButton(label: String, logic: CalculatorLogic) {
    val rightButtonColor = Color(0xFF1B2F59)
    val topButtonColor = Color(0x696CB2FB)
    val innerButtonColor = Color(0x69114F92)

    val containerColor = when {
        label in listOf("÷", "×", "-", "+", "=") -> rightButtonColor
        label in listOf("AC", "+/-", "%") -> topButtonColor
        else -> innerButtonColor
    }

    Button(
        onClick = {
            when (label) {
                "AC" -> logic.clearAll()
                "+/-" -> logic.plusOrMinusPressed()
                "⌫" -> logic.backspacePressed()
                "=" -> logic.equalsPressed()
                "." -> logic.decimalPressed()
                "÷", "×", "-", "+" -> logic.onOperatorClick(label)
                "%", -> logic.percentPressed()
                else -> logic.onNumClick(label)
            }
        },
        modifier = Modifier.fillMaxSize(),
        shape = CircleShape,
        colors = ButtonDefaults.buttonColors(
            containerColor = containerColor,
            contentColor = Color.White
        ),
        contentPadding = PaddingValues(0.dp)
    ) {
        Text(text = label, fontSize = 24.sp, fontWeight = FontWeight.Normal)
    }
}

@Composable
fun AutoResizeText(
    text: String,
    modifier: Modifier = Modifier,
    color: Color = Color.White,
    fontWeight: FontWeight = FontWeight.Light,
    textAlign: TextAlign = TextAlign.End,
    maxFontSize: TextUnit = 64.sp
) {
    var fontSizeValue by remember { mutableStateOf(maxFontSize) }
    var readyToDraw by remember(text) { mutableStateOf(false) }

    LaunchedEffect(text) {
        if (text.length <= 1 || text == "0") {
            fontSizeValue = maxFontSize
        }
    }

    val minFontSize = 12.sp

    val alpha by animateFloatAsState(
        targetValue = if (readyToDraw) 1f else 0f,
        animationSpec = tween(durationMillis = 50)
    )

    Text(
        text = text,
        color = color,
        modifier = modifier.graphicsLayer(alpha = alpha),
        fontSize = fontSizeValue,
        fontWeight = fontWeight,
        textAlign = textAlign,
        maxLines = 1,
        softWrap = false,
        onTextLayout = { result ->
            if (result.didOverflowWidth && fontSizeValue > minFontSize) {
                fontSizeValue = fontSizeValue * 0.9f
                readyToDraw = false
            } else {
                readyToDraw = true
            }
        }
    )
}

