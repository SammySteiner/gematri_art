function hello() {
  return alert("hello")
}

var printButton = document.getElementById('submit')

printButton.addEventListener('click', function(event){
  event.preventDefault()
  var word = getWord()
  wordToArt(word)
  clearInput()
})

function getWord() {
  return document.getElementById('word').value
}

function clearInput() {
  document.getElementById('word').value = ""
}

function wordToArt(word) {
  var coordinatesForAllLetters = wordToCoords(word)
  var linesForAllLetters = coordsToLines(coordinatesForAllLetters)
  document.getElementById('art-svg').innerHTML = linesForAllLetters
}

function wordToCoords(word) {

}

function letterToAngle(letter) {
  return (letter.charCodeAt(0) -96) * 6.88
}

function angleToCoords(angle, xMax, yMax) {

}

function findMidpoint(xMax, yMax) {

}

function coordsToLines() {

}







// when a user hits submit:
// 1. prevent refresh
// 2. grab the input
// 3. assume only one word
// 4. build svg for word
// 5. display svg (delete old svg)

// the work. loop over word, look at each letter (convert to lower case) and get an angle from the lookup, convert that into 5 lines on a 100/100 grid, add those to the svg, return the svg with all the lines.

// +. create lookup hash for letter into angle.
// +. create function to take size of grid, angle of line, number of lines, and return an array of x1/y1/x2/y2 coords.
// +. check input if one or more words
