const Task1 = require('./task1.js')

class Task extends Task1.Task {
  handle (data) {
    const basins = this.findLowPoints(data)
      .map(([x, y]) => this.findBasinSize(x, y, { [x]: { [y]: true } }, data))
      .sort((a, b) => b - a)

    console.log('The size of the three biggest basins is', basins[0] * basins[1] * basins[2])
  }

  findBasinSize (x, y, seen, data) {
    let size = 1
    const adj = this.findAdj(x, y)
    for (let i = 0; i < adj.length; i++) {
      if (!seen[adj[i].x]) {
        seen[adj[i].x] = {}
      } else if (seen[adj[i].x][adj[i].y]) {
        continue
      }
      seen[adj[i].x][adj[i].y] = true
      if (data[adj[i].x] === undefined || data[adj[i].x][adj[i].y] === undefined) {
        continue
      } else if (data[adj[i].x][adj[i].y] < 9) {
        size += this.findBasinSize(adj[i].x, adj[i].y, seen, data)
      }
    }
    return size
  }
}

exports.Task = Task
