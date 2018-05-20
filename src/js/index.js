import('../css/index.css')

import PlaylistManager from './playlistManager'
import AudioPlayer from './audioPlayer'
import listService from './listService'

listService.getList()
  .then(trackList => {
    const playlistManager = new PlaylistManager(document.querySelector('#media-list ul'), trackList)
    const audioPlayer = new AudioPlayer(document.getElementById('media-player'), playlistManager)

    playlistManager.onTrackClick(track => audioPlayer.setTrack(track).play())

    audioPlayer.onTrackChange(track => console.log(track))
    console.log('script is launched')
  })