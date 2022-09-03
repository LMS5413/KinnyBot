const { DefaultQueue } = require('vulkava');

module.exports = class Queue extends DefaultQueue {
  constructor() {
    super();
  }

  peek(type) {
     console.log(this.tracks)
     if (type === "actual") return this.tracks[0]
     return this.tracks
  }
}