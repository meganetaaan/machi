'use strict'

class Queue {
  constructor () {
    this._queue = []
  }

  enqueue (obj) {
    this._queue.push(obj)
    return this
  }

  get queue () {
    // TODO: make it read only
    return this._queue
  }

  dequeue () {
    if (this._queue.length === 0) {
      return null
    }
    return this._queue.splice(0, 1)[0]
  }
}
export default Queue
