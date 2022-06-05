const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const timeLeftDisplaylvl2 = document.querySelector('#time-leftlvl2')
const resultDisplaylvl2 = document.querySelector('#resultlvl2')
const startButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const squareslvl2 = document.querySelectorAll('.grid2 div')
const button = document.querySelector('.button')
const result = document.querySelector('.result')
const buttonLvl2 = document.querySelector('.Startbutton-lvl2')
const grid = document.querySelector('.grid')
let currentIndex = 76
let currentIndexlvl2 = 76
const width = 9
const logsleft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

const logsleftlvl2 = document.querySelectorAll('.log-leftlvl2')
const logsRightlvl2 = document.querySelectorAll('.log-rightlvl2')
const carsLeftlvl2 = document.querySelectorAll('.car-leftlvl2')
const carsRightlvl2 = document.querySelectorAll('.car-rightlvl2')
const background = document.querySelector('.background')
let timeleft = 20
let timeleftanotherlvl = 20
let timeleftlvl2
let time = 20
let score = 0
let timerId
let timerIdlvl2
let clearTime
let outcomeTimerID
let outcomeTimerIDlvl2


buttonLvl2.disabled = true



console.log(squares)
function moveFrog(e) {
    squares[currentIndex].classList.remove('frog')

    switch(e.key) {
    
        case 'ArrowLeft' :
            console.log('Moved left')
            if(currentIndex % width !==0) currentIndex -= 1
            break
        case 'ArrowRight' :
            console.log('Moved Right')
            if(currentIndex % width < width -1 ) currentIndex += 1
            break
        case 'ArrowUp' :
            console.log('Moved Up')
            if(currentIndex - width >= 0  ) currentIndex -= width
            break
        case 'ArrowDown' :
            console.log('Moved Down')
            if(currentIndex + width < width * width) currentIndex += width
            break
    }

    squares[currentIndex].classList.add('frog')
}


function checkOutcomes() {
    lose()
    win()
}



function autoMoveElements() {
    timeleft--
    timeLeftDisplay.textContent = timeleft
    logsleft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
    
}

function hideBoard() {
    Array.from(squares).forEach((squares) =>{
    if(squares.style.display === 'none') {
        squares.style.display = 'block'
    } else {
        squares.style.display = 'none'
    }
})
}



function moveLogLeft(logLeft) {
    switch(true) {
        case logLeft.classList.contains('l1') :
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2') 
            break
        case logLeft.classList.contains('l2') :
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3') 
            break
        case logLeft.classList.contains('l3') :
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4') 
            break
        case logLeft.classList.contains('l4') :
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5') 
            break
        case logLeft.classList.contains('l5') :
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1') 
            break
    }
}

function moveLogRight(logRight) {
    switch(true) {
        case logRight.classList.contains('l1') :
            logRight.classList.remove('l1')
            logRight.classList.add('l5') 
            break
        case logRight.classList.contains('l2') :
            logRight.classList.remove('l2')
            logRight.classList.add('l1') 
            break
        case logRight.classList.contains('l3') :
            logRight.classList.remove('l3')
            logRight.classList.add('l2') 
            break
        case logRight.classList.contains('l4') :
            logRight.classList.remove('l4')
            logRight.classList.add('l3') 
            break
        case logRight.classList.contains('l5') :
            logRight.classList.remove('l5')
            logRight.classList.add('l4') 
            break
    }
}

function moveCarLeft(carLeft) {
    switch(true) {
        case carLeft.classList.contains('c1') :
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2') 
            break
        case carLeft.classList.contains('c2') :
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3') 
            break
        case carLeft.classList.contains('c3') :
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1') 
            break
        
    }
}

function moveCarRight(carRight) {
    switch(true) {
        case carRight.classList.contains('c1') :
            carRight.classList.remove('c1')
            carRight.classList.add('c3') 
            break
        case carRight.classList.contains('c2') :
            carRight.classList.remove('c2')
            carRight.classList.add('c1') 
            break
        case carRight.classList.contains('c3') :
            carRight.classList.remove('c3')
            carRight.classList.add('c2') 
            break
        
    }
}

function lose() {
    if (
        squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        timeleft <= 0
        ) {
        resultDisplay.textContent = score
        clearInterval(timerId)
        clearInterval(outcomeTimerID)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog )
        startButton.disabled = true
        timeLeftDisplay.textContent = time
        result.textContent = 'You Lose! Try again'
    }
}

function win() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        score += 1
        resultDisplay.textContent = score
        timeLeftDisplay.textContent = time
        clearInterval(timerId)
        clearInterval(outcomeTimerID)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog )        
        hideBoard()
        startButton.disabled = true
        buttonLvl2.disabled = false
        result.textContent = 'Gratulation! You Completed First level!'
    }
}


function changeColor() {
    background.classList.toggle('background1')
}


startButton.addEventListener('click', () => {
   if(timerId) {
       clearInterval(timerId)
       clearInterval(outcomeTimerID)
       outcomeTimerID = null
       document.removeEventListener('keyup', moveFrog)
       timerId = null
       
   } else {
        timerId = setInterval(autoMoveElements, 1000)
        outcomeTimerID = setInterval(checkOutcomes, 50)
        document.addEventListener('keyup', moveFrog)
        
   }
})


button.addEventListener('click', changeColor )



function moveFrog2(e) {
    squareslvl2[currentIndexlvl2].classList.remove('frog')

    switch(e.key) {
    
        case 'ArrowLeft' :
            console.log('Moved left')
            if(currentIndexlvl2 % width !==0) currentIndexlvl2 -= 1
            break
        case 'ArrowRight' :
            console.log('Moved Right')
            if(currentIndexlvl2 % width < width -1 ) currentIndexlvl2 += 1
            break
        case 'ArrowUp' :
            console.log('Moved Up')
            if(currentIndexlvl2 - width >= 0  ) currentIndexlvl2 -= width
            break
        case 'ArrowDown' :
            console.log('Moved Down')
            if(currentIndexlvl2 + width < width * width) currentIndexlvl2 += width
            break
    }

    squareslvl2[currentIndexlvl2].classList.add('frog')
}



function hideBoard2() {
    Array.from(squareslvl2).forEach((squares) =>{
    if(squares.style.display === 'none') {
        squares.style.display = 'block'
    } else {
        squares.style.display = 'none'
    }
})
}

function hideboardlvl2(){
    Array.from(squareslvl2).forEach((squares)=>{
        squares.style.display === 'none'
    })
}

buttonLvl2.addEventListener('click', () => {
    if(timerIdlvl2 ) {
        clearInterval(timerIdlvl2)
        clearInterval(outcomeTimerIDlvl2)
        clearInterval(timeleftlvl2)
        outcomeTimerIDlvl2 = null
        document.removeEventListener('keyup', moveFrog2)
        timerIdlvl2 = null

        
    } else {
         timerIdlvl2 = setInterval(autoMoveElementslvl2, 500)
         timeleftlvl2 = setInterval(timeLeftlvl2, 1000)
         outcomeTimerIDlvl2 = setInterval(checkOutcomeslvl2, 50)
         document.addEventListener('keyup', moveFrog2)
    }
 })



function winlvl2() {
    if (squareslvl2[currentIndexlvl2].classList.contains('ending-block')) {        
        score+=1
        clearInterval(timerIdlvl2)
        clearInterval(outcomeTimerIDlvl2)
        squareslvl2[currentIndexlvl2].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog2 )                
        clearInterval(timeleftlvl2)
        buttonLvl2.disabled = true
        resultDisplay.textContent = score
        result.textContent = 'Gratulation! You Completed Second Level!'
    }
}


function loselvl2() {
    if (
        squareslvl2[currentIndexlvl2].classList.contains('c1') ||
        squareslvl2[currentIndexlvl2].classList.contains('l4') ||
        squareslvl2[currentIndexlvl2].classList.contains('l5') ||
        timeleftanotherlvl <= 0
        ) {
        
        clearInterval(timerIdlvl2)
        clearInterval(outcomeTimerIDlvl2)
        squareslvl2[currentIndexlvl2].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog2 )       
        clearInterval(timeleftlvl2)
        buttonLvl2.disabled = true
        result.textContent = 'You Lose! Try again'
    }
}


function autoMoveElementslvl2() {    
    logsleftlvl2.forEach(logLeft => moveLogLeft(logLeft))
    logsRightlvl2.forEach(logRight => moveLogRight(logRight))
    carsLeftlvl2.forEach(carLeft => moveCarLeft(carLeft))
    carsRightlvl2.forEach(carRight => moveCarRight(carRight))
    
}

function timeLeftlvl2() {
    timeleftanotherlvl--
    timeLeftDisplay.textContent = timeleftanotherlvl
}

function checkOutcomeslvl2() {
    loselvl2()
    winlvl2()
}