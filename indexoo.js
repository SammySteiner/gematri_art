var printButton = document.getElementById('submit')
printButton.addEventListener('click', function(event){
  event.preventDefault()
  var word = getInputs()
  wordToArt(word)
  clearInputs()
})


function getInputs() {
  var word = document.getElementById('word').value
  var width = parseInt(document.getElementById('width').value)
  var height = parseInt(document.getElementById('height').value)
  return {word: word, width: width, height: height}
}

function clearInputs() {
  document.getElementById('word').value = ""
  document.getElementById('width').value = ""
  document.getElementById('height').value = ""
}

function wordToArt(inputs) {
  var board = new ArtBoard(inputs.width, inputs.height)
  var parsedString = new StringParser(inputs.word)
  var stringArr = parsedString.stringToLettersArr()

  // 1. convert arr to an angle.
  // 2. use the angle to get two points that pass through the center of my board.

  // 3. use that line to create many coords for lines

  // 4. convert those sets of coords into svg lines

  var coordinatesForAllLetters = wordToCoords(word)
  var linesForAllLetters = coordsToLines(coordinatesForAllLetters)
  // don't forget to interpolate the width and height here
  document.getElementById('art-svg').innerHTML = `<rect x="0" y="0" width="180" height="360" style="fill-opacity:0;stroke-width:1;stroke:rgb(0,0,0)"/>` + linesForAllLetters
}

function wordToCoords(word) {
  var angles = []
  var manyCoords = []
  for (var i = 0; i < word.length; i++) {
    angles.push(letterToAngle(word[i].toLowerCase()))
  }
  for (var i = 0; i < angles.length; i++) {
    manyCoords.push(angleToManyCoords(angles[i]))
  }
  return manyCoords
}

function letterToAngle(letter) {
  return (letter.charCodeAt(0) -96) * 6.88
}

function angleToCoord(angle, xMax = 180, yMax = 180) {
  let midpoint = findMidpoint(xMax, yMax)
  let coord = {x1: 0}
  let confinedAngle = angle % 360
  if (confinedAngle == 90 || confinedAngle == 270) {
    coord.x1 = midpoint.x
    coord.x2 = midpoint.x
    coord.y1 = 0
    coord.y2 = yMax
  } else {
    let distribution = (midpoint.x/Math.sin((90-confinedAngle) * (Math.PI/180)))*Math.sin((confinedAngle)* (Math.PI/180))
    coord.x2 = xMax;
    coord.y1 = midpoint.y + distribution;
    coord.y2 = midpoint.y - distribution;
  }
  return coord
}

function angleToManyCoords(angle, desnsity = 20, xMax = 180, yMax = 360) {
  let coord = angleToCoord(angle, xMax, yMax)
  let manyCoords = []
  if (coord.y1 > yMax || coord.y1 < 0) {
    let offset = xMax/desnsity
    for (var i = 0; i < desnsity; i++) {
      let newCoord = Object.assign({}, coord)
      newCoord.x1 += (offset * i)
      newCoord.x2 += (offset * i)
      manyCoords.push(newCoord)
    }
    for (var i = 0; i < desnsity; i++) {
      let newCoord = Object.assign({}, coord)
      newCoord.x1 -= (offset * i)
      newCoord.x2 -= (offset * i)
      manyCoords.push(newCoord)
    }
  } else {
    let offset = yMax/desnsity
    for (var i = 0; i < desnsity; i++) {
      let newCoord = Object.assign({}, coord)
      newCoord.y1 += (offset * i)
      newCoord.y2 += (offset * i)
      manyCoords.push(newCoord)
    }
    for (var i = 0; i < desnsity; i++) {
      let newCoord = Object.assign({}, coord)
      newCoord.y1 -= (offset * i)
      newCoord.y2 -= (offset * i)
      manyCoords.push(newCoord)
    }
  }
  return manyCoords
}

function findMidpoint(xMax = 180, yMax = 180) {
  var x = xMax/2
  var y = yMax/2
  return {'x': x, 'y': y}
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


// partial solution. solution isn't working right for letters until f and letters after u (not stretching from border to boarder). Letters in the middle of the alphabet aren't getting all 18 lines.
