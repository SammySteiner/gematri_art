var printButton = document.getElementById('submit')
printButton.addEventListener('click', function(event){
  event.preventDefault()
  var inputs = getInputs()
  if (validateInputs(inputs)) {
    wordToArt(inputs)
    clearInputs()
  }
})

function getInputs() {
  var word = document.getElementById('word').value
  var width = parseInt(document.getElementById('width').value)
  var height = parseInt(document.getElementById('height').value)
  var density = parseInt(document.getElementById('density').value)
  return {word: word, width: width, height: height, density: density}
}

function validateInputs(inputs){
  validator = new Validator(inputs)
  return validator.validateInputs
}

function clearInputs() {
  document.getElementById('word').value = ""
  document.getElementById('width').value = ""
  document.getElementById('height').value = ""
  document.getElementById('density').value = ""
}

function wordToArt(inputs) {
  var board = new ArtBoard(inputs.width, inputs.height, inputs.density)
  var parsedString = new StringParser(inputs.word)
  var stringArr = parsedString.stringToLettersArr()
  var coordinatesForAllLetters = wordToCoords(stringArr, board)
  var linesForAllLetters = coordsToLines(coordinatesForAllLetters)
  var svg = composeSVG(board, linesForAllLetters)
  document.getElementById('art').innerHTML = svg
}

function wordToCoords(stringArr, board) {
  var manyCoords = []
  for (var i = 0; i < stringArr.length; i++) {
    let letterToLinify = new Linifier(stringArr[i], board)
    let coords = letterToLinify.letterToManyCoords()
    manyCoords.push(coords)
  }
  return manyCoords
}

function coordsToLines(arrayOfCoordArrays) {
  var lines = ""
  for (var i = 0; i < arrayOfCoordArrays.length; i++) {
    for (var j = 0; j < arrayOfCoordArrays[i].length; j++) {
      lines += coordToLine(arrayOfCoordArrays[i][j])
    }
  }
  return lines
}

function coordToLine(coord) {
  return `<line x1="${coord.x1}" y1="${coord.y1}" x2="${coord.x2}" y2="${coord.y2}" style="stroke:rgb(0,0,0);stroke-width:1"/>`
}

function composeSVG(board, linesForAllLetters){
  return `<svg id="art-svg" width="${board.width}" height="${board.height}"><rect x="0" y="0" width="${board.width}" height="${board.height}" style="fill-opacity:0;stroke-width:1;stroke:rgb(0,0,0)"/>` + linesForAllLetters + `</svg>`
}
