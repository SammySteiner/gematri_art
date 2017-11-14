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
  var angles = []
  var coords = []
  for (var i = 0; i < word.length; i++) {
    angles.push(letterToAngle(word[i].toLowerCase()))
  }
  for (var i = 0; i < angles.length; i++) {
    coords.push(angleToCoords(angles[i]))
  }
  return coords
}

function letterToAngle(letter) {
  return (letter.charCodeAt(0) -96) * 6.88
}

function angleToCoords(angle, xMax = 180, yMax = 180) {

}

function singleCoordsToManyCoords(coords, number, xMax = 180, yMax = 180) {

}


function findMidpoint(xMax = 180, yMax = 180) {
  var x = xMax/2
  var y = yMax/2
  return {'x': x, 'y': y}
}

function coordsToLines(coords) {
  var lines = []
  for (var i = 0; i < coords.length; i++) {
    lines.push(coordToLine(coords[i]))
  }
  return lines
}

function coordToLine(coord) {
  return `<line x1="${coord.x1}" y1="${coord.y1}" x2="${coord.x2}" y2="${coord.y2}" style="stroke:rgb(0,0,0);stroke-width:2"/>`
}


// coords = {x1: #, y1: #, x2: #, y2: #, color:rgb(#,#,#)}

// OO if i need the xMax and xMin of the svg, that should be a function on the Canvas object



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
