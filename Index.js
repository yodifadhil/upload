function clickButton(event) {
$(".item").click(function(event) {
var thingClicked = this.innerHTML
console.log("0. this is: ", this)
console.log("0. you clicked: ", thingClicked)
var playerOne = getPlayerOne()
var gameStyle = getGameStyle()
console.log('FIX THIS: ***** clickButton gameStyle: ', gameStyle)

if ((playerOne === "X") && (gameStyle === "classic")) {
$(this).addClass("blue")
$(this).html("X")
}
if ((playerOne === "X") && (gameStyle === "goth")) {
$(this).addClass("blue")
$(this).html("☠️")
}
if ((playerOne === "X") && (gameStyle === "weapons")) {
$(this).addClass("blue")
$(this).html("⚔️")
}

if ((playerOne === "O") && (gameStyle === "classic")) {
$(this).addClass("blue")
$(this).html("O")
}
if ((playerOne === "O") && (gameStyle === "goth")) {
$(this).addClass("blue")
$(this).html("💀")
}
if ((playerOne === "O") && (gameStyle === "weapons")) {
$(this).addClass("blue")
$(this).html("💣")
}

playGame() //call playGame after every click, to check for winner & whose turn
})
}
clickButton(event)


function checkWhoseTurn() { //for this game, playerOne goes first
var currentTurn
var redCount = getRedCount()
var blueCount = getBlueCount()
var playerOneTurn = !blueCount || redCount > blueCount || blueCount && redCount == blueCount
var computerTurn = redCount < blueCount
if (playerOneTurn) {
console.log("checkWhoseTurn: it is playerOne's turn")
var notBlueOrRed = document.querySelectorAll("div.item:not(.blue):not(.red)")
$(notBlueOrRed).removeClass('unclickable')
$("#compTurn").removeClass('yellow orangeBorder')
$("#yourTurn").addClass('yellow orangeBorder')
currentTurn = "playerOneTurn"
return currentTurn
}
if (computerTurn) {
console.log("checkWhoseTurn: it is computer's turn")
var allItems = document.querySelectorAll("div.item")
$(allItems).addClass('unclickable') //need to remove this on playerOne's turn
$("#yourTurn").removeClass('yellow orangeBorder')
$("#compTurn").addClass('yellow orangeBorder')
setTimeout(computerTakeTurn, 1000) //call after 1 second...
currentTurn = "computerTurn"
return currentTurn
}
}


function computerTakeTurn() {
var computer = getComputer()
console.log('computerTakeTurn: computer is: ', computer)
var notBlueOrRed = document.querySelectorAll("div.item:not(.blue):not(.red)")
console.log('computerTakeTurn: notBlueOrRed: ', notBlueOrRed)
//choose one at random
var randomItem = notBlueOrRed[Math.floor(Math.random() * notBlueOrRed.length)]
console.log('computerTakeTurn: randomItem is: ', randomItem)
//addClass red to that random item and show computer chose it
$(randomItem).addClass("red unclickable")
$(randomItem).html(computer)
console.log('computerTakeTurn: computer clicked: ', randomItem)
playGame()
}


function setGameStyle() {
$("#playerForm #group1 input").on("change", function() {
var gameStyle = $("input[name='group1']:checked", "#playerForm").val()
console.log(`game style selected: ${gameStyle}`)
$("#gameStyle").html(gameStyle)
changeStyle()
})
}
setGameStyle()

function getGameStyle() {
if (document.getElementById("gameStyle") != null) {
var gameStyle = document.getElementById("gameStyle").innerHTML
console.log("gameStyle is:::: ", gameStyle)
return gameStyle
}
}

function setPlayerOne() {
$("#playerForm #group2 input").on("change", function() {
var playerOne = $("input[name='group2']:checked", "#playerForm").val()
console.log(`player selected: ${playerOne}`)
$("#playerForm").addClass("displayNone")
$("#playerOne").html(`You are: <span id="playerOneSpan" class="yellow">${playerOne}</span>`)
$("#gameInfo, #resetButton, #gameGrid").removeClass("displayNone")
})
}
setPlayerOne()


function getPlayerOne() {
if (document.getElementById("playerOneSpan") != null) {
var playerOne = document.getElementById("playerOneSpan").innerHTML
return playerOne
}
}


function getComputer() {
var playerOne = getPlayerOne()
var gameStyle = getGameStyle()
//var computer = (playerOne === "X") ? ("O") : ("X")

var computer
if (gameStyle === "classic") {
computer = (playerOne === "X") ? ("O") : ("X")
}
if (gameStyle === "goth") {
computer = (playerOne === "X") ? ("💀") : ("☠️")
}
if (gameStyle === "weapons") {
computer = (playerOne === "X") ? ("💣") : ("⚔️")
}

console.log("getComputer: computer is: ", computer)
return computer
}


function hardResetOnclick(event) { //returns user to form, asking X or O
$("#resetButton").click(function(event) {
console.log("hardResetOnclick: resetting game...")
$("#playerForm").removeClass("displayNone")
document.getElementById("playerForm").reset()
styleClassic()
$("#playerOne, #gameResult, #congratsOrSorry").html("")
$("#gameInfo, #gameGrid, #congratsOrSorry").addClass("displayNone")
$(".item").removeClass("blue red gray unclickable")
$(".item").html("X/O")
})
}
hardResetOnclick()


function reset() { //resets game for new game
console.log("reset: resetting game, for new game...")
$("#gameInfo").removeClass("displayNone")
$("#gameResult, #congratsOrSorry").addClass("displayNone")
$(".item").removeClass("blue red gray unclickable")
$(".item").html("X/O")
}


function getRedCount() {
var redCount = $('#gameGrid .red').length
return redCount
}

function getBlueCount() {
var blueCount = $('#gameGrid .blue').length
return blueCount
}


function checkForWinner() {
console.log("checking for winner...")
var winner

var eightWinningCombos = [
"#one.COLOR, #two.COLOR, #three.COLOR",
"#four.COLOR, #five.COLOR, #six.COLOR",
"#seven.COLOR, #eight.COLOR, #nine.COLOR",
"#one.COLOR, #four.COLOR, #seven.COLOR",
"#two.COLOR, #five.COLOR, #eight.COLOR",
"#three.COLOR, #six.COLOR, #nine.COLOR",
"#one.COLOR, #five.COLOR, #nine.COLOR",
"#seven.COLOR, #five.COLOR, #three.COLOR"
]

var blueWinArray = getWinningArray(eightWinningCombos, "blue")
var redWinArray = getWinningArray(eightWinningCombos, "red")
var blueWins = blueWinArray.includes(true)
var redWins = redWinArray.includes(true)
var fullGrid = getRedCount() + getBlueCount()
var draw = (fullGrid === 9) && (!blueWins) && (!redWins)

if (blueWins) { //playerOne is always blue
playerOneWins()
return winner = blueWins
}
if (redWins) { //red is computer
computerWins()
return winner = redWins
}
if (draw) {
drawGame()
return winner = draw
} else {
console.log('game on...')
}
}

function getWinningArray(array, string) {
return array.map(function(combo) {
var eachCombo = combo.replace(/COLOR/g, string)
return eachCombo = $(eachCombo).length === 3
})
}

function playerOneWins() {
var playerOne = getPlayerOne()
console.log(`${playerOne} wins!`)
$("#gameResult").html(`<span class='yellowBig'>${playerOne} wins!</span>`)
$("#congratsOrSorry").html("<span class='yellow'>Congratulations! You won!</span>")
winLoseOrDraw()
}

function computerWins() {
var computer = getComputer()
console.log(`${computer} wins!`)
$("#gameResult").html(`<span class='redBig'>${computer} wins!</span>`)
$("#congratsOrSorry").html("<span class='red'>Sorry, you lost.</span>")
winLoseOrDraw()
}

function drawGame() {
console.log('Draw game!')
$("#gameResult").html(`<span class='redBig'>Game is a draw.</span>`)
$("#congratsOrSorry").html("<span>Game ended in a draw.</span>")
winLoseOrDraw()
}

function winLoseOrDraw() {
$("#gameResult, #congratsOrSorry").removeClass("displayNone")
$("#gameInfo").addClass("displayNone")
disableRemainingItems()
}

function disableRemainingItems() {
var notBlueOrRed = document.querySelectorAll("div.item:not(.blue):not(.red)")
$(notBlueOrRed).addClass("gray")
$(notBlueOrRed).html("🤷")
$(notBlueOrRed).addClass("unclickable")
return
}


//use gradients for backgrounds instead of simple colors...
function changeStyle() {
var body = document.body
var gameStyle = getGameStyle()
if (gameStyle === "classic") {
styleClassic()
}
if (gameStyle === "goth") {
styleGoth()
}
if (gameStyle === "weapons") {
styleWeapons()
}
}
changeStyle()


function styleClassic() {
var body = document.body
$("#gameStyle").html("classic")
$("#header").addClass("classicHeader").removeClass("gothHeader weaponsHeader")
$(body).addClass("bodyClassic").removeClass("bodyGoth bodyWeapons")
}

function styleGoth() {
var body = document.body
$("#gameStyle").html("goth")
$("#header").addClass("gothHeader").removeClass("classicHeader weaponsHeader")
$(body).addClass("bodyGoth").removeClass("bodyClassic bodyWeapons")
}

function styleWeapons() {
var body = document.body
$("#gameStyle").html("weapons")
$("#header").addClass("weaponsHeader").removeClass("classicHeader gothHeader")
$(body).addClass("bodyWeapons").removeClass("bodyGoth bodyClassic")
}

function playGame() {
console.log('play game!')
var winner = checkForWinner()
if (!winner) {
console.log('no winner yet...')
checkWhoseTurn()
}
if (winner) {
console.log('game over, resetting game')
setTimeout(reset, 3000) //call reset after 3 seconds...
}
}
playGame()