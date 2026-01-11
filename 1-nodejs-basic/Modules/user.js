const events = require("events");

// Class

//  this class should inherit form the event emitter class.
module.exports = class extends events.EventEmitter {

    //  create constructor 
    constructor() {
        // inside constructor we going to call constructor of base class : here base calss is EventEmitter class
        // to call the constructor of this event emitter class we can simply use the "SUPER()" keyword
        super()  // its going to call constructor of base calss

    }
}