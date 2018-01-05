class Linifier {
  constructor(letter, board = {width: 180, height: 360}) {
    [this.letter, this.board] = [letter, board]
  }

  // partial solution. solution isn't working right for letters until f and letters after u (not stretching from border to boarder). Letters in the middle of the alphabet aren't getting all 18 lines.


  letterToManyCoords(desnsity = 20) {
    let coord = this.letterToCoord()
    let manyCoords = []
    if (coord.y1 > this.board.height || coord.y1 < 0) {
      let offset = this.board.width/desnsity
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
      let offset = this.board.height/desnsity
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

  letterToCoord() {
    let midpoint = this.findMidpoint(this.board)
    let coord = {x1: 0}
    let confinedAngle = this.letterToAngle() % 360
    if (confinedAngle == 90 || confinedAngle == 270) {
      coord.x1 = midpoint.x
      coord.x2 = midpoint.x
      coord.y1 = 0
      coord.y2 = this.board.height
    } else {
      let distribution = (midpoint.x/Math.sin((90-confinedAngle) * (Math.PI/180)))*Math.sin((confinedAngle)* (Math.PI/180))
      coord.x2 = this.board.width;
      coord.y1 = midpoint.y + distribution;
      coord.y2 = midpoint.y - distribution;
    }
    debugger
    return coord
  }

  findMidpoint(board) {
    var x = this.board.width/2
    var y = this.board.height/2
    return {'x': x, 'y': y}
  }

  letterToAngle() {
    return (this.letter.charCodeAt(0) -96) * 6.88
  }
}
