//emit is used to trigger an event
//on is used to add a call back function, that going to be executed when the event is triggered.

const { EventEmitter } = require("events");

class MyEmitter extends EventEmitter {
  constructor() {
    super();
  }
  greet(name) {
    this.emit("sayHello", name);
  }
}

const myEvents = new MyEmitter();

myEvents.on("sayHello", function (name) {
  console.log(`hello ${name}.`);
});

myEvents.greet("Rahul");
