class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = "./sounds/kick-808.wav";
    this.currentSnare = "./sounds/snare-808.wav";
    this.currentHihat = "./sounds/hihat-808.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtn = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }

  activePad() {
    // console.log(this);
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    // console.log(activeBars);
    // console.log(step);
    // Loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

      // check if pads is active
      if (bar.classList.contains("active")) {
        // check each sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    // console.log(this);
    const interval = (60 / this.bpm) * 1000;
    // check if it is playing
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      // Clear the intervall
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerHTML = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerHTML = "Play";
      this.playBtn.classList.remove("active");
    }
  }

  changeSound(ev) {
    const selectionName = ev.target.name;
    const selectionValue = ev.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }

  mute(ev) {
    const muteName = ev.target.getAttribute("data-track");
    // console.log(muteName);
    ev.target.classList.toggle("active");
    if (ev.target.classList.contains("active")) {
      switch (muteName) {
        case "kick":
          this.kickAudio.volume = 0;
          break;
        case "snare":
          this.snareAudio.volume = 0;
          break;
        case "hihat":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteName) {
        case "kick":
          this.kickAudio.volume = 1;
          break;
        case "snare":
          this.snareAudio.volume = 1;
          break;
        case "hihat":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }

  changeTempo(ev) {
    // console.log(ev.target.value);
    const tempoText = document.querySelector(".tempo-number");
    this.bpm = ev.target.value;
    tempoText.innerText = ev.target.value;
  }

  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

const drumKit = new DrumKit();

// event Listeners

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", function () {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (ev) {
    drumKit.changeSound(ev);
  });
});

drumKit.muteBtn.forEach((btn) => {
  btn.addEventListener("click", function (ev) {
    drumKit.mute(ev);
  });
});

drumKit.tempoSlider.addEventListener("input", function (ev) {
  drumKit.changeTempo(ev);
});

drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e);
});
