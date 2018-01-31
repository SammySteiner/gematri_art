class Linifier {
  constructor(coord, board = {width: 180, height: 360}) {
    [this.coord, this.board] = [coord, board]
  }
  // partial solution. solution isn't working right for letters until f and letters after u (not stretching from border to boarder). Letters in the middle of the alphabet aren't getting all 18 lines.

  coordToManyCoords() {
    let manyCoords = []
    if (this.coord.y1 > this.board.height || this.coord.y1 < 0) {
      let offset = this.board.width/this.board.density
      for (var i = 0; i < this.board.density; i++) {
        let newCoord = Object.assign({}, this.coord)
        newCoord.x1 += (offset * i)
        newCoord.x2 += (offset * i)
        manyCoords.push(newCoord)
      }
      for (var i = 0; i < this.board.density; i++) {
        let newCoord = Object.assign({}, this.coord)
        newCoord.x1 -= (offset * i)
        newCoord.x2 -= (offset * i)
        manyCoords.push(newCoord)
      }
    } else {
      let offset = this.board.height/this.board.density
      for (var i = 0; i < this.board.density; i++) {
        let newCoord = Object.assign({}, this.coord)
        newCoord.y1 += (offset * i)
        newCoord.y2 += (offset * i)
        manyCoords.push(newCoord)
      }
      for (var i = 0; i < this.board.density; i++) {
        let newCoord = Object.assign({}, this.coord)
        newCoord.y1 -= (offset * i)
        newCoord.y2 -= (offset * i)
        manyCoords.push(newCoord)
      }
    }
    return manyCoords
  }

}
