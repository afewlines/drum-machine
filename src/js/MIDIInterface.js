const MIDI_MESSAGES = {
  'on': 144,
  'off': 128,
};

const MIDI_NOTE_OFFSETS = {
  'on': 144,
  'off': 128,
};


class MIDIInterface {
  /**
   *
   */
  constructor() {
    this.access = null;
    this.inputs = null;
    this.outputs = null;
    this.input = null;
    this.output = null;
  }

  start(accessPromise) {
    // REQUEST MIDI ACCESS, STORE DATA ON PROMISE FULFILL
    accessPromise.then(function(access) {
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
        // setInterval(() => this.output.send(ev.data, ev.timestamp), 1000);
      }.bind(this);
    }.bind(this));
  }

  trySendMIDI(mode, note, velocity) {
    console.log(MIDI_MESSAGES.keys());
    if (MIDI_MESSAGES.keys()
      .includes(mode)) {
      mode = MIDI_MESSAGES[mode.toLowerCase()];
    } else {
      return;
    }


  }

  get started() {
    return this.access != null;
  }

  get midiSend() {
    if (!this.started) {
      return undefined;
    }
    return this.trySendMIDI;
  }

  set midiRecv(func) {
    if (!this.started) {
      return;
    }
    if (typeof(func) == "function") {
      this.input.onmidimessage = func;
    } else if (func == null) {
      this.input.onmidimessage = null;
    }
  }


}

export { MIDIInterface };