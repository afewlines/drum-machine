const TrackTypes = {
  // cheeky js enum
  BASE: "base",
  MASTER: "master",
  MIDI: "midi",
}

class Track {
  constructor(id) {
    this.id = id; // track's id, darnit
    this.type = TrackTypes.BASE;
    this.volume = 1; // float, 0-1, can go higher
    this.patterns = []; // da paterns
    this.activePattern = -1; // currently active pattern
  }

  get pattern() {
    // get the active pattern
    return this.patterns[this.activePattern];
  }

  get data() {
    // get the data of the active pattern for preview, etc
    return this.pattern;
  }

  set patternIndex(target) {
    // set pattern directly to number
    if (target >= 0 && target < this.patterns.length) {
      this.activePattern = target;
      return true;
    } else {
      return false;
    }
  }

  set patternRelative(target) {
    // inc/dec pattern
    target += this.activePattern
    return this.patternIndex = target;
  }

  newPattern() {
    // make-a da baby (random)
    // TODO: make not random, make work right
    let patt = [];
    for (var i = 0; i < 2 + Math.floor(Math.random() * 7); i++) {
      patt.push(Math.floor(Math.random() * 2));
    }
    this.patterns.push(patt);
    this.activePattern = this.patterns.length - 1;
    return true;
  }

  deletePattern() {
    // remove a patern
    // TODO: should be fine
    if (this.patterns.length > 1) {
      this.patterns.splice(this.activePattern, 1, );
      return true;
    } else if (this.patterns.length > 0) {
      this.patterns.splice(this.activePattern, 1, );
      this.activePattern = -1;
      return true;
    }
    return false;
  }

}

// TODO: this bad boy
// keep track of bpm
// patterns will just be # of beats at whatever bpm
class MasterTrack extends Track {
  constructor() {
    super(0);
    this.type = TrackTypes.MASTER;
  }
}

// TODO: also this bad boy
// uhhhhhhhhhhhhhh
// at this point just a list of {time, mididata}
// dunno exactly what mididata is yet, put like an empty {}
class MIDITrack extends Track {
  constructor(id) {
    super(id);
    this.type = TrackTypes.MIDI;
  }
}


export { TrackTypes, Track, MIDITrack, MasterTrack }