class DrumSample {
  constructor(path, kit, source) {
    this.id = DrumSample.count++;
    this.path = path;
    this.name = path.split('/');
    this.name = this.name[this.name.length - 1];
    this.source = source;
    this.kit = kit;
    this.element = null;
  }
  load_sample() {
    let el = document.createElement("audio");
    el.src = this.path;
    el.id = "sample" + this.id;
    el.type = 'audio/mpeg';
    this.element = el;
    return this.element;
  }
  play() {
    if (this.element) {
      this.element.currentTime = 0;
      this.element.play();
    }
  }
}
DrumSample.count = 0;

var audios = {};


function registerDrumSample(source, kit, sample) {
  if (!(source in audios)) {
    audios[source] = {};
  }
  if (!(kit in audios[source])) {
    audios[source][kit] = [];
  }

  audios[source][kit].push(new DrumSample(sample, kit, source));
}

function registerDrumKit(source, name, samples) {
  for (var sample of samples) {
    registerDrumSample(source, name, sample);
  }
}

let elphnt707 = ["samples/ELPHNT_707/Ride R3.mp3",
  "samples/ELPHNT_707/Kick 1 R3.mp3",
  "samples/ELPHNT_707/Clap R1.mp3",
  "samples/ELPHNT_707/Kick 1 R2.mp3",
  "samples/ELPHNT_707/Ride R2.mp3",
  "samples/ELPHNT_707/Hat Closed R4.mp3",
  "samples/ELPHNT_707/Clap R3.mp3",
  "samples/ELPHNT_707/Clap R2.mp3",
  "samples/ELPHNT_707/Kick 1 R1.mp3",
  "samples/ELPHNT_707/Ride R1.mp3",
  "samples/ELPHNT_707/Hat Closed R1.mp3",
  "samples/ELPHNT_707/Kick 1 R4.mp3",
  "samples/ELPHNT_707/Ride R4.mp3",
  "samples/ELPHNT_707/Hat Closed R2.mp3",
  "samples/ELPHNT_707/Clap R4.mp3",
  "samples/ELPHNT_707/Hat Closed R3.mp3",
  "samples/ELPHNT_707/Snare 2 R3.mp3",
  "samples/ELPHNT_707/Snare 2 R2.mp3",
  "samples/ELPHNT_707/Hat Open R4.mp3",
  "samples/ELPHNT_707/Tom 2 R1.mp3",
  "samples/ELPHNT_707/Tom 2 R3.mp3",
  "samples/ELPHNT_707/Crash R4.mp3",
  "samples/ELPHNT_707/Tambourine R4.mp3",
  "samples/ELPHNT_707/Snare 2 R1.mp3",
  "samples/ELPHNT_707/Tom 2 R2.mp3",
  "samples/ELPHNT_707/Hat Open R3.mp3",
  "samples/ELPHNT_707/Crash R1.mp3",
  "samples/ELPHNT_707/Tambourine R1.mp3",
  "samples/ELPHNT_707/Snare 2 R4.mp3",
  "samples/ELPHNT_707/Hat Open R2.mp3",
  "samples/ELPHNT_707/Crash R2.mp3",
  "samples/ELPHNT_707/Tambourine R2.mp3",
  "samples/ELPHNT_707/Tambourine R3.mp3",
  "samples/ELPHNT_707/Crash R3.mp3",
  "samples/ELPHNT_707/Hat Open R1.mp3",
  "samples/ELPHNT_707/Tom 2 R4.mp3",
  "samples/ELPHNT_707/Rim R3.mp3",
  "samples/ELPHNT_707/Kick 2 R4.mp3",
  "samples/ELPHNT_707/Rim R2.mp3",
  "samples/ELPHNT_707/Cowbell R4.mp3",
  "samples/ELPHNT_707/Rim R1.mp3",
  "samples/ELPHNT_707/Kick 2 R2.mp3",
  "samples/ELPHNT_707/Kick 2 R3.mp3",
  "samples/ELPHNT_707/Cowbell R1.mp3",
  "samples/ELPHNT_707/Rim R4.mp3",
  "samples/ELPHNT_707/Cowbell R3.mp3",
  "samples/ELPHNT_707/Kick 2 R1.mp3",
  "samples/ELPHNT_707/Cowbell R2.mp3",
  "samples/ELPHNT_707/Snare 1 R4.mp3",
  "samples/ELPHNT_707/Tom 3 R2.mp3",
  "samples/ELPHNT_707/Tom 3 R3.mp3",
  "samples/ELPHNT_707/Tom 1 R4.mp3",
  "samples/ELPHNT_707/Tom 3 R1.mp3",
  "samples/ELPHNT_707/Snare 1 R2.mp3",
  "samples/ELPHNT_707/Tom 1 R1.mp3",
  "samples/ELPHNT_707/Tom 3 R4.mp3",
  "samples/ELPHNT_707/Snare 1 R3.mp3",
  "samples/ELPHNT_707/Snare 1 R1.mp3",
  "samples/ELPHNT_707/Tom 1 R2.mp3",
  "samples/ELPHNT_707/Tom 1 R3.mp3",
];
let elphntLM1 = ["samples/ELPHNT_LM-1/DX Mid Tom 1.mp3",
  "samples/ELPHNT_LM-1/HiHat 11.mp3",
  "samples/ELPHNT_LM-1/HiHat Open 8.mp3",
  "samples/ELPHNT_LM-1/HiHat 4.mp3",
  "samples/ELPHNT_LM-1/Cabasa 2.mp3",
  "samples/ELPHNT_LM-1/Rim Shot 7.mp3",
  "samples/ELPHNT_LM-1/Rim Shot 6.mp3",
  "samples/ELPHNT_LM-1/Cabasa 3.mp3",
  "samples/ELPHNT_LM-1/HiHat 5.mp3",
  "samples/ELPHNT_LM-1/Cow Bell 12.mp3",
  "samples/ELPHNT_LM-1/HiHat 10.mp3",
  "samples/ELPHNT_LM-1/DX Mid Tom 2.mp3",
  "samples/ELPHNT_LM-1/HiHat 12.mp3",
  "samples/ELPHNT_LM-1/Cow Bell 10.mp3",
  "samples/ELPHNT_LM-1/HiHat 7.mp3",
  "samples/ELPHNT_LM-1/Cabasa 1.mp3",
  "samples/ELPHNT_LM-1/Rim Shot 4.mp3",
  "samples/ELPHNT_LM-1/Rim Shot 5.mp3",
  "samples/ELPHNT_LM-1/HiHat 6.mp3",
  "samples/ELPHNT_LM-1/Cow Bell 11.mp3",
  "samples/ELPHNT_LM-1/HiHat 13.mp3",
  "samples/ELPHNT_LM-1/DX Mid Tom 3.mp3",
  "samples/ELPHNT_LM-1/DX Mid Tom 7.mp3",
  "samples/ELPHNT_LM-1/HiHat 2.mp3",
  "samples/ELPHNT_LM-1/Cabasa 4.mp3",
  "samples/ELPHNT_LM-1/Clap 10.mp3",
  "samples/ELPHNT_LM-1/Rim Shot 1.mp3",
  "samples/ELPHNT_LM-1/Cabasa 5.mp3",
  "samples/ELPHNT_LM-1/HiHat 3.mp3",
  "samples/ELPHNT_LM-1/DX Mid Tom 6.mp3",
  "samples/ELPHNT_LM-1/DX Mid Tom 4.mp3",
  "samples/ELPHNT_LM-1/HiHat 1.mp3",
  "samples/ELPHNT_LM-1/Cabasa 7.mp3",
  "samples/ELPHNT_LM-1/Kick 8.mp3",
  "samples/ELPHNT_LM-1/Rim Shot 2.mp3",
  "samples/ELPHNT_LM-1/Rim Shot 3.mp3",
  "samples/ELPHNT_LM-1/Cabasa 6.mp3",
  "samples/ELPHNT_LM-1/DX Mid Tom 5.mp3",
  "samples/ELPHNT_LM-1/Snare 8.mp3",
  "samples/ELPHNT_LM-1/DX Low Tom 1.mp3",
  "samples/ELPHNT_LM-1/Snare 9.mp3",
  "samples/ELPHNT_LM-1/DX Low Tom 2.mp3",
  "samples/ELPHNT_LM-1/Clap 9.mp3",
  "samples/ELPHNT_LM-1/Cow Bell 8.mp3",
  "samples/ELPHNT_LM-1/Cow Bell 9.mp3",
  "samples/ELPHNT_LM-1/Clap 8.mp3",
  "samples/ELPHNT_LM-1/DX Low Tom 3.mp3",
  "samples/ELPHNT_LM-1/DX Low Tom 7.mp3",
  "samples/ELPHNT_LM-1/DX Low Tom 6.mp3",
  "samples/ELPHNT_LM-1/DX Low Tom 4.mp3",
  "samples/ELPHNT_LM-1/DX Low Tom 5.mp3",
  "samples/ELPHNT_LM-1/Snare 1.mp3",
  "samples/ELPHNT_LM-1/DX Low Tom 8.mp3",
  "samples/ELPHNT_LM-1/Tambourine 6.mp3",
  "samples/ELPHNT_LM-1/Clap 3.mp3",
  "samples/ELPHNT_LM-1/Cow Bell 2.mp3",
  "samples/ELPHNT_LM-1/Cow Bell 3.mp3",
  "samples/ELPHNT_LM-1/Clap 2.mp3",
  "samples/ELPHNT_LM-1/Tambourine 7.mp3",
  "samples/ELPHNT_LM-1/Snare 2.mp3",
  "samples/ELPHNT_LM-1/Tambourine 5.mp3",
  "samples/ELPHNT_LM-1/Cow Bell 1.mp3",
  "samples/ELPHNT_LM-1/Clap 1.mp3",
  "samples/ELPHNT_LM-1/Tambourine 4.mp3",
  "samples/ELPHNT_LM-1/Snare 3.mp3",
  "samples/ELPHNT_LM-1/Snare 7.mp3",
  "samples/ELPHNT_LM-1/Clap 5.mp3",
  "samples/ELPHNT_LM-1/Cow Bell 4.mp3",
  "samples/ELPHNT_LM-1/Snare 11.mp3",
  "samples/ELPHNT_LM-1/Snare 10.mp3",
  "samples/ELPHNT_LM-1/Cow Bell 5.mp3",
  "samples/ELPHNT_LM-1/Tambourine 1.mp3",
  "samples/ELPHNT_LM-1/Clap 4.mp3",
  "samples/ELPHNT_LM-1/Snare 6.mp3",
  "samples/ELPHNT_LM-1/Snare 4.mp3",
  "samples/ELPHNT_LM-1/Clap 6.mp3",
  "samples/ELPHNT_LM-1/Tambourine 3.mp3",
  "samples/ELPHNT_LM-1/Cow Bell 7.mp3",
  "samples/ELPHNT_LM-1/Cow Bell 6.mp3",
  "samples/ELPHNT_LM-1/Tambourine 2.mp3",
  "samples/ELPHNT_LM-1/Clap 7.mp3",
  "samples/ELPHNT_LM-1/Snare 5.mp3",
  "samples/ELPHNT_LM-1/DX Mid Tom 8.mp3",
  "samples/ELPHNT_LM-1/HiHat Open 1.mp3",
  "samples/ELPHNT_LM-1/Kick 4.mp3",
  "samples/ELPHNT_LM-1/Kick 5.mp3",
  "samples/ELPHNT_LM-1/HiHat Open 2.mp3",
  "samples/ELPHNT_LM-1/Cabasa 8.mp3",
  "samples/ELPHNT_LM-1/Kick 7.mp3",
  "samples/ELPHNT_LM-1/Kick 6.mp3",
  "samples/ELPHNT_LM-1/Cabasa 9.mp3",
  "samples/ELPHNT_LM-1/HiHat Open 3.mp3",
  "samples/ELPHNT_LM-1/HiHat Open 7.mp3",
  "samples/ELPHNT_LM-1/Kick 2.mp3",
  "samples/ELPHNT_LM-1/Rim Shot 8.mp3",
  "samples/ELPHNT_LM-1/Rim Shot 9.mp3",
  "samples/ELPHNT_LM-1/Kick 3.mp3",
  "samples/ELPHNT_LM-1/HiHat Open 6.mp3",
  "samples/ELPHNT_LM-1/HiHat Open 4.mp3",
  "samples/ELPHNT_LM-1/HiHat 8.mp3",
  "samples/ELPHNT_LM-1/Kick 1.mp3",
  "samples/ELPHNT_LM-1/HiHat 9.mp3",
  "samples/ELPHNT_LM-1/HiHat Open 5.mp3",
];
registerDrumKit("ELPHNT", "707", elphnt707);
registerDrumKit("ELPHNT", "LM-1", elphntLM1);

export { audios }