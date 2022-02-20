function borra () {
    if (pieza == 3) {
        tablero[altura * 5 + (desviacion + 1)] = 0
        tablero[altura * 5 + (desviacion + 2)] = 0
        tablero[altura * 5 + (desviacion + 3)] = 0
    } else if (pieza == 2) {
        tablero[altura * 5 + (desviacion + 1)] = 0
        tablero[altura * 5 + (desviacion + 2)] = 0
    } else {
        tablero[altura * 5 + (desviacion + 1)] = 0
    }
}
function nueva () {
    desviacion = 0
    altura = 0
    color = randint(1, 2)
    pieza = randint(1, 3)
    puntuacion += 1
    pinta()
    juego = 1
}
input.onButtonPressed(Button.A, function () {
    if (juego == 1) {
        if (desviacion >= 0) {
            borra()
            desviacion += -1
            pinta()
            display()
        }
    }
})
function gover () {
    juego = 0
    basic.showString("G.OVER! Sc: ")
    basic.showNumber(puntuacion)
    inicio()
}
function pinta () {
    if (pieza == 3) {
        tablero[altura * 5 + (desviacion + 1)] = color
        tablero[altura * 5 + (desviacion + 2)] = color
        tablero[altura * 5 + (desviacion + 3)] = color
    } else if (pieza == 2) {
        tablero[altura * 5 + (desviacion + 1)] = color
        tablero[altura * 5 + (desviacion + 2)] = color
    } else {
        tablero[altura * 5 + (desviacion + 1)] = color
    }
}
function inicio () {
    juego = 0
    puntuacion = 0
    velocidad = 500
    Limpia()
    nueva()
}
function display () {
    for (let fila = 0; fila <= 4; fila++) {
        for (let columna = 0; columna <= 4; columna++) {
            pixel = tablero[fila * 5 + columna]
            if (pixel == 1) {
                led.plotBrightness(columna, fila, 200)
            } else if (pixel == 2) {
                led.plotBrightness(columna, fila, 20)
            } else {
                led.plotBrightness(columna, fila, 0)
            }
        }
    }
}
input.onButtonPressed(Button.B, function () {
    if (juego == 1) {
        if (desviacion < 4 - pieza) {
            borra()
            desviacion += 1
            pinta()
            display()
        }
    }
})
function Limpia () {
    tablero = [0]
    for (let index = 0; index < 24; index++) {
        tablero.push(0)
    }
}
function gravedad () {
    juego = 0
    if (altura < 4) {
        if (pieza == 3) {
            if (tablero[altura * 5 + (desviacion + 6)] + (tablero[altura * 5 + (desviacion + 7)] + tablero[altura * 5 + (desviacion + 8)]) != 0) {
                if (altura == 0) {
                    gover()
                } else {
                    bingo(altura)
                    nueva()
                }
            } else {
                borra()
                altura += 1
                pinta()
            }
        } else if (pieza == 2) {
            if (tablero[altura * 5 + (desviacion + 6)] + tablero[altura * 5 + (desviacion + 7)] != 0) {
                if (altura == 0) {
                    gover()
                } else {
                    bingo(altura)
                    nueva()
                }
            } else {
                borra()
                altura += 1
                pinta()
            }
        } else {
            if (tablero[altura * 5 + (desviacion + 6)] != 0) {
                if (altura == 0) {
                    gover()
                } else {
                    bingo(altura)
                    nueva()
                }
            } else {
                borra()
                altura += 1
                pinta()
            }
        }
    } else {
        bingo(altura)
        nueva()
    }
    juego = 1
}
function bingo (pos: number) {
    linea = tablero[pos * 5 + 0] * (tablero[pos * 5 + 1] * (tablero[pos * 5 + 2] * (tablero[pos * 5 + 3] * tablero[pos * 5 + 4])))
    if (linea != 0) {
        if (linea == 1 || linea == 32) {
            basic.showLeds(`
                # . . . .
                # . . . .
                # . . . .
                # . . . .
                # . . . .
                `)
            basic.showLeds(`
                . # . . .
                . # . . .
                . # . . .
                . # . . .
                . # . . .
                `)
            basic.showLeds(`
                . . # . .
                . . # . .
                . . # . .
                . . # . .
                . . # . .
                `)
            basic.showLeds(`
                . . . # .
                . . . # .
                . . . # .
                . . . # .
                . . . # .
                `)
            basic.showLeds(`
                . . . . #
                . . . . #
                . . . . #
                . . . . #
                . . . . #
                `)
            basic.clearScreen()
            puntuacion += 25
            if (velocidad > 5) {
                velocidad += -5
            }
            Limpia()
            nueva()
        } else {
            for (let index = 0; index < 2; index++) {
                led.plotBrightness(0, pos, 255)
                led.plotBrightness(1, pos, 255)
                led.plotBrightness(2, pos, 255)
                led.plotBrightness(3, pos, 255)
                led.plotBrightness(4, pos, 255)
                basic.pause(100)
                led.plotBrightness(0, pos, 0)
                led.plotBrightness(1, pos, 0)
                led.plotBrightness(2, pos, 0)
                led.plotBrightness(3, pos, 0)
                led.plotBrightness(4, pos, 0)
                basic.pause(100)
            }
            puntuacion += 5
            if (velocidad > 1) {
                velocidad += -1
            }
            indice = pos
            while (indice > 0) {
                tablero[indice * 5 + 0] = tablero[indice * 5 - 5]
                tablero[indice * 5 + 1] = tablero[indice * 5 - 4]
                tablero[indice * 5 + 2] = tablero[indice * 5 - 3]
                tablero[indice * 5 + 3] = tablero[indice * 5 - 2]
                tablero[indice * 5 + 4] = tablero[indice * 5 - 1]
                indice += -1
            }
            tablero[0] = 0
            tablero[1] = 0
            tablero[2] = 0
            tablero[3] = 0
            tablero[4] = 0
            display()
        }
    }
}
let indice = 0
let linea = 0
let pixel = 0
let velocidad = 0
let juego = 0
let puntuacion = 0
let color = 0
let desviacion = 0
let altura = 0
let tablero: number[] = []
let pieza = 0
inicio()
basic.forever(function () {
    display()
    basic.pause(velocidad)
    gravedad()
})
