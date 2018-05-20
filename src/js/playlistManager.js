

const rowClass = (index, selected) => selected === index ? 'selected' : ''

const rowView = (track, index, selected) =>
  `<li class="${rowClass(index, selected)}" index="${index}">
    ${albumView(track)}
    ${trackInfoView(track)}
   </li>`

const albumView = (track) =>
  `<div class="album-image"><img src="${track.image || FALLBACK_ALBUM}" width="64" height="64"/></div>`

const trackInfoView = (track) =>
  `<div class="track-info">
    <div class="track-title">${track.title}</div>
    <div class="track-artist">${track.artist}</div>
  </div>`

export default class PlaylistManager {
  constructor (container, tracklist = []) {
    this.container = container
    this.tracklist = tracklist
    this.trackClickedCallback = () => {}

    this.render()
  }

  render () {
    this.container.innerHTML = ''
    const lis = this.tracklist.map((track, index) => rowView(track, index, this.selected))

    this.container.innerHTML = lis.join('')

    const self = this

    this.container.querySelectorAll('li')
      .forEach(li => li.addEventListener('click', (e) => self.trackClickedCallback.apply(self, [e])))
  }

  onTrackClick (callback) {
    this.trackClickedCallback = (e) => {
      e.preventDefault()
      e.stopPropagation()

      const clickedIndex = parseInt(e.currentTarget.getAttribute('index'))

      if (clickedIndex !== this.selected) {
        this.selected = clickedIndex
        callback(this.tracklist[this.selected])

        this.render()
      }
    }

    this.render()
  }

  next () {
    const nextIndex = this.selected + 1

    if (nextIndex < this.tracklist.length) {
      this.selected = nextIndex
    }

    this.render()

    return this.tracklist[nextIndex]
  }

  previous () {
    const previousIndex = this.selected - 1

    if (previousIndex >= 0) {
      this.selected = previousIndex
    }

    this.render()

    return this.tracklist[previousIndex]
  }

  setSelected (index) {
    if (index >= 0 && index < this.tracklist.length) {
      this.selected = index
      this.render()
    }
  }

}