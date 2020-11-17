// TODO: literally everything

class BaseSequencer {
  constructor(divisions = 4, fill = 0) {
    this.divisions = divisions;
    this.mspm = -1; // milliseconds per measure
    this.timedTriggers = [];
    this.triggers = [];
    this.type = "base";
    for (let i = 0; i < this.divisions; i++) {
      this.triggers.push(fill);
    }
  }
  updateTime() {
    this.timedTriggers = [];
    for (var i = 0; i < this.divisions; i++) {
      if (this.triggers[i] > 0) {
        this.timedTriggers.push(i / this.divisions);
      }
    }
  }
  playAt(last, next) {
    for (var trigger of this.timedTriggers) {
      if (trigger < last) {
        continue;
      }
      if (trigger >= next) {
        return false;
      }
      return true;
    }
  }
}


class MasterSequencer extends BaseSequencer {
  constructor(divisions, bpm = 120) {
    super(divisions, 1);
    this.type = "master";
    this.bpm = bpm;
  }
  playAt() {
    // not called atm
  }

}

class GraphicalSequencer extends BaseSequencer {
  constructor(divisions) {
    super(divisions);
    this.type = "graphical";
    this.newTemp(); // load a bogus sequence
  }
  newTemp() {
    this.triggers = [];
    for (var i = 0; i < this.divisions; i++) {
      this.triggers.push(Math.floor(Math.random() * 2));
    }
  }
  toggleTrigger(index) {
    //this function will toggle the triggers
    this.triggers[index] = !this.triggers[index];
    this.updateTime();
  }
}

class MIDISequencer extends BaseSequencer {
  constructor(divisions) {
    super(divisions);
    this.type = "midi";
    this.triggers = [];
    this.recStart = -1;
    this.recLength = -1;
    this.recLast = -1;
  }
  updateTime() {
    return;
  }
  newRecording(length, overdub) {
    this.recStart = performance.now();
    this.recLength = length;
    this.recLast = 0;
    this.timedTriggers = overdub ? this.timedTriggers : [];
    var handler = null;
    if (overdub) {
      handler = function(note) {
        if (note.data[0] == 144) {
          let spot = ((performance.now() - this.recStart) % this.recLength) / this.recLength;
          this.timedTriggers.push(spot);
          this.timedTriggers = this.timedTriggers.sort();
        }
      };
    } else {
      handler = function(note) {
        if (note.data[0] == 144) {

          let spot = ((performance.now() - this.recStart) % this.recLength) / this.recLength;
          this.recLast = spot;
          this.timedTriggers.push(spot);
          this.timedTriggers = this.timedTriggers.filter((x) => x >= 0)
            .sort();

        }
      };
    }

    return handler.bind(this);
  }
}


export { MasterSequencer, GraphicalSequencer, MIDISequencer }