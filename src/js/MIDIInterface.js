// FOUND MIDI DATA
var MIDI_DATA = {};

// REQUEST MIDI ACCESS, STORE DATA ON PROMISE FULFILL
navigator.requestMIDIAccess()
  .then(function(access) {
    // SET MIDI DATA VARS
    this.access = access;
    this.inputs = [...this.access.inputs.values()];
    this.outputs = [...this.access.outputs.values()];

    // SELECT INPUT AND OUTPUTS
    this.input = this.inputs[1];
    this.output = this.outputs[3];

    // OPEN OUTPUT STREAM
    this.output.open();

    // ON INPUT RECV, REPEAT NOTE EVERY SECOND TO OUT
    this.input.onmidimessage = function(ev) {
      console.log(ev.data);
      setInterval(() => this.output.send(ev.data, ev.timestamp), 1000);
    }.bind(this);
  }.bind(MIDI_DATA));

export { MIDI_DATA };