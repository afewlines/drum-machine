// TODO: literally everything

class BaseSequencer {
  constructor(divisions = 4, fill = 0) {
    this.divisions = divisions;
    this.mspm = -1; // milliseconds per measure
    this.timedTriggers = [];
    this.triggers = [];
    for (let i = 0; i < this.divisions; i++) {
      this.triggers.push(fill);
    }
  }
  updateTime(length) {
    this.mspm = length;
    this.timedTriggers = [];
    for (var i = 0; i < this.divisions; i++) {
      if (this.triggers[i] > 0) {
        this.timedTriggers.push((i * this.mspm) / this.divisions);
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
  constructor(divisions) {
    super(divisions, 1)
  }
  playAt() {

  }
}

class GraphicalSequencer extends BaseSequencer {
  constructor(divisions) {
    super(divisions)
    this.newTemp(); // load a bogus sequence
  }
  newTemp() {
    this.triggers = [];
    for (var i = 0; i < this.divisions; i++) {
      this.triggers.push(Math.floor(Math.random() * 2));
    }
  }
}


export { MasterSequencer, GraphicalSequencer }