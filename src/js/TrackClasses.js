import { MasterSequencer, GraphicalSequencer } from '@/js/SequencerClasses.js'

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

  get patternCount() {
    return this.patterns.length;
  }

  get data() {
    // get the data of the active pattern for preview, etc
    return this.pattern;
  }

  set patternIndex(target) {
    // set pattern directly to number
    if (target >= 0 && target < this.patterns.length) {
      this.activePattern = target;
    }
  }

  patternRelative(target) {
    // inc/dec pattern
    let result = this.patternIndex = target + this.activePattern
    return result >= 0 && result < this.patterns.length;
  }

  newPattern() {
    // make-a da baby (random)
    // TODO: make not random, make work right
    this.patterns.push(new GraphicalSequencer(3 + Math.floor(Math.random() * 12)));
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

  updateTime(length) {
    if (this.activePattern >= 0) {
      this.pattern.updateTime(length);
    }
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
  playAt(last, next) {
    // if (this.activePattern >= 0) {
    //   this.pattern.playAt(last, next);
    // }
  }
  newPattern() {
    this.patterns.push(new MasterSequencer(4));
    this.activePattern = this.patterns.length - 1;
    return true;
  }
  updateTime(x) {
    return false;
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
    this.instrument = null;
  }
  setInstrument(target) {
    this.instrument = target;
    return this.instrument.load_sample();
  }
  playAt(last, next) {
    if (this.activePattern >= 0 && this.pattern.playAt(last, next)) {
      this.instrument.play();
    }
  }

}


export { TrackTypes, Track, MIDITrack, MasterTrack }