class Track {
  constructor(id) {
    this.id = id;
    this.volume = 1; // float, 0-1, can go higher
    this.activePattern = -1;
    this.patterns = [];
  }
  set pattern(target) {
    target -= 1;
    if (target < this.patterns.length) {
      this.activePattern = target;
      return true;
    } else {
      return false;
    }
  }
  get pattern() {
    return this.patterns[this.activePattern];
  }
}


class MIDITrack extends Track {
  constructor(id) {
    super(id);
  }
}

class MasterTrack extends Track {
  constructor(id) {
    super(id);
  }
}


export { Track, MIDITrack, MasterTrack }