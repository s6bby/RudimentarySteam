package com.simplysurge.notlazycalc

import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState

fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "NotLazyCalc",
        state = rememberWindowState(width = 400.dp, height = 700.dp)
    ) {
        App()
    }
}