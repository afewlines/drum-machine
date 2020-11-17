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

  start(accessPromise, prompt) {
    // REQUEST MIDI ACCESS, STORE DATA ON PROMISE FULFILL
    accessPromise.then(function(access) {
      // SET MIDI DATA VARS
      this.access = access;
      this.inputs = [...this.access.inputs.values()];
      this.outputs = [...this.access.outputs.values()];

      // SELECT INPUT AND OUTPUTS

      let res = -1
      while (res < 0) {
        res = prompt(`Select MIDI In: ${this.inputs.map((x)=>x.name).join(", ")}`);
        if (res.length < 1) {
          this.access = null;
          return;
        }
        res = this.inputs.map((x) => x.name)
          .indexOf(res);
      }
      this.input = this.inputs[res];

      res = -1
      while (res < 0) {
        res = prompt(`Select MIDI Out: ${this.inputs.map((x)=>x.name).join(", ")}`);
        if (res.length < 1) {
          this.access = null;
          return;
        }
        res = this.inputs.map((x) => x.name)
          .indexOf(res);
      }
      this.output = this.outputs[res];

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