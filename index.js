class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll('.pad');
    this.playbtn = document.querySelector('.play');
    this.currentKick = './Sounds/kick-classic.wav';
    this.currentSnare = './Sounds/snare-acoustic01.wav';
    this.currentHihat = './Sounds/hihat-acoustic01.wav';
    this.kickAudio = document.querySelector('.kick-audio');
    this.snareAudio = document.querySelector('.snare-audio');
    this.hihatAudio = document.querySelector('.hihat-audio');
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = false;
    this.selects = document.querySelectorAll('select');
    this.muteBtn = document.querySelectorAll('.mute')
  }
  activePad() {
    this.classList.toggle('active')
  }
  repeat() {
    let step = this.index % 8;
    let activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach(bar => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if (bar.classList.contains('active')) {
        if (bar.classList.contains('kick-pad')) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains('snare-pad')) {
          this.snareAudio.currentTime = 0; // to play sound of each pad
          this.snareAudio.play();
        }
        if (bar.classList.contains('hihat-pad')) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    })
    // console.log(step);
    this.index++
  }
  start() {
    if (!this.isPlaying) {
      const interval = (60 / this.bpm) * 1000;
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval)
      this.playbtn.innerText = 'Stop';
      // console.log(this.isPlaying)
    } else {
      // console.log(this.isPlaying)
      clearInterval(this.isPlaying);
      this.isPlaying = false;
      this.playbtn.innerText = 'Play';
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    console.log(selectionName, selectionValue);
    switch (selectionName) {
      case 'kick-select':
        this.kickAudio.src = selectionValue;
        break;
      case 'snare-select':
        this.snareAudio.src = selectionValue;
        break;
      case 'hihat-select':
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
  muteSound(e) {
    const muteIndex = e.target.getAttribute('data-track')
    e.target.classList.toggle('active')
    if (e.target.classList.contains('active')) {
      switch (muteIndex) {
        case '0':
          this.kickAudio.volume = 0;
          break;
        case '1':
          this.snareAudio.volume = 0;
          break;
        case '2':
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case '0':
          this.kickAudio.volume = 1;
          break;
        case '1':
          this.snareAudio.volume = 1;
          break;
        case '2':
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }

  // addHandler() {
  //   this.playbtn.addEventListener('click', () => {
  //     this.start();
  //     if (!this.flag) {
  //       this.start();
  //       this.flag = true;
  //     }
  //     // if (this.flag) {
  //     //   this.stop();
  //     //   this.flag = false;
  //     // }
  //   });
  // }
}

const drumkit = new DrumKit();
drumkit.pads.forEach(pad => {
  pad.addEventListener('click', drumkit.activePad);
  pad.addEventListener('animationend', function () {
    this.style.animation = '';
  })

})
drumkit.playbtn.addEventListener('click', () => {
  drumkit.start();
});
drumkit.selects.forEach(select => {
  select.addEventListener('change', function (e) {
    e.preventDefault()
    drumkit.changeSound(e)
  })
})
drumkit.muteBtn.forEach(mute => {
  mute.addEventListener('click', function (e) {
    e.preventDefault()
    drumkit.muteSound(e)
  })
})
console.log(drumkit.muteBtn)