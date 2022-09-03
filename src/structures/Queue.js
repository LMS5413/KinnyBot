const { DefaultQueue } = require('vulkava');

module.exports = class Queue extends DefaultQueue {
  constructor() {
    super();
  }

  peek() {
     return this.tracks
  }
}