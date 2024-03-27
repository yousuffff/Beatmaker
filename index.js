class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll('.pad');
    this.playbtn = document.querySelector('.play');
    this.kickAudio = document.querySelector('.kick-audio');
    this.snareAudio = document.querySelector('.snare-audio');
    this.hihatAudio = document.querySelector('.hihat-audio');
    this.index = 0;
    this.bpm = 150;
    this.flag = false
  }
  activePad() {
    this.classList.toggle('active')
  }
  repeat() {
    let step = this.index % 8;
    let activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach(bar => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`
    })
    // console.log(step);
    this.index++
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    setInterval(() => {
      this.repeat();
    }, interval)
  }
  stop() {
    console.log('hello')
  }
  addHandler() {
    this.playbtn.addEventListener('click', () => {
      if (!this.flag) {
        this.start();
        this.flag = true;
      }
      // if (this.flag) {
      //   this.stop();
      //   this.flag = false;
      // }
    });
  }
}

const drumkit = new DrumKit();
drumkit.pads.forEach(pad => {
  pad.addEventListener('click', drumkit.activePad);
  pad.addEventListener('animationend', function () {
    this.style.animation = '';
  })

})
// drumkit.addHandler();