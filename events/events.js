const EventEmitter = require("events");

class TaskEvents extends EventEmitter {}

// Singleton EventEmitter instance for task lifecycle events
const taskEvents = new TaskEvents();

module.exports = taskEvents;

