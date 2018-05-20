export default class AudioPlayer {
  constructor(domControls, playlistManager) {
    console.log(domControls)

    this.track = null
    this.playlistManager = playlistManager
    this.audio = domControls.querySelector('#audio')
    this.playButton = domControls.querySelector('.play-pause')
    this.nextButton = domControls.querySelector('.next')
    this.previousButton = domControls.querySelector('.previous')
    this.forwardButton = domControls.querySelector('.forward')
    this.backwardButton = domControls.querySelector('.backward')
    this.timeLine = domControls.querySelector('.time')
    this.playedIndicator = domControls.querySelector('.listened')
    this.seeker = domControls.querySelector('.seek')

    this.trackChangedCallback = () => {}

    this.setPlayPauseEvent()
    this.setPreviousEvent()
    this.setNextEvent()
    this.setForward()
    this.setBackward()
    this.setSeekEvent()

    const self = this

    window.requestAnimationFrame(() => self.render.call(self))
  }

  play () {
    console.log('play')

    if (!this.audio.src) {
      this.setTrack(this.playlistManager.tracklist[0])
      this.playlistManager.setSelected(0)
    }

    this.audio.play()
      .then(() => {})
      .catch(() => {})

    return this
  }

  pause () {
    console.log('pause')

    this.audio.pause()

    return this
  }

  next () {
    this.pause()
    this.setTrack(this.playlistManager.next())
    this.play()
  }

  previous () {
    this.pause()
    this.setTrack(this.playlistManager.previous())
    this.play()
  }

  forward () {
    this.seek(this.audio.currentTime + 10)
  }

  backward () {
    this.seek(this.audio.currentTime - 10)
  }

  seek (time) {
    if (time >= 0 && time < this.audio.duration) {
      this.audio.currentTime = time
    }
  }

  setTrack (track) {
    if (track) {
      console.log('setTrack', track)
      this.track = track

      this.audio.src = track.url

      this.trackChangedCallback(this.track)
    }

    return this
  }

  setPlayPauseEvent () {
    this.playButton.addEventListener('click', () => {
      if (this.audio.paused) {
        this.play()
      }
      else {
        this.pause()
      }
    })
  }

  setPreviousEvent () {
    this.previousButton.addEventListener('click', () => {
      this.previous()
    })
  }

  setNextEvent () {
    this.nextButton.addEventListener('click', () => {
      this.next()
    })
  }

  setForward () {
    this.forwardButton.addEventListener('click', () => {
      this.forward()
    })
  }

  setBackward () {
    this.backwardButton.addEventListener('click', () => {
      this.backward()
    })
  }

  setSeekEvent () {
    const self = this
    this.timeLine.addEventListener('click', e => {
      const totalWidth = self.timeLine.offsetWidth
      const playedWidth = e.offsetX
      const percentage = playedWidth / totalWidth

      self.seek(self.audio.duration * percentage)
    })
  }

  isPlaying () {
    if (this.hasAudio()) {
      return !this.audio.paused
    }
    else {
      return false
    }
  }

  hasAudio () {
    return this.audio && this.audio.src
  }

  onTrackChange (callback) {
    this.trackChangedCallback = callback
  }

  render () {
    if (this.hasAudio()) {
      const duration = this.audio.duration
      const played = this.audio.currentTime

      this.playedIndicator.style.width = `${played * 100 / duration}%`
    }
    else {
      this.playedIndicator.style.width = `0%`
    }

    if (this.isPlaying() && this.playButton.querySelector('.fa-play')) {
      this.playButton.innerHTML = '<i class="fas fa-pause"></i>'
    }
    else if (!this.isPlaying() && this.playButton.querySelector('.fa-pause')) {
      this.playButton.innerHTML = '<i class="fas fa-play"></i>'
    }

    const self = this

    if (this.audio.ended) {
      this.next()
    }

    window.requestAnimationFrame(() => self.render.call(self))

  }
 }