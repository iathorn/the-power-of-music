import React, { Component, Fragment } from 'react';
import styles from './AudioPlayer.scss';
import classNames from 'classnames/bind';
import moment from 'moment';
const cx = classNames.bind(styles);

const TrackList = () => (
  <div className={cx('track')}>
    <div className={cx('track-number')}>
      1     
    </div>
    <div className={cx('track-title')}>
      노래 이름
    </div>
    <div className={cx('track-duration')}>
      3:45
    </div>
  </div>
)

class AudioPlayer extends Component {

  audio = document.createElement('audio');
  
  state = {
    barPercentage: 0.0,
    isPlaying: false,
    isPaused: false,
    progress: 0,
    index: 0,
    isInitial: true,
    mute: false
  };

  updateProgress = () => {
    const { duration, currentTime } = this.audio;
    const progress = (currentTime * 100) / duration;

    this.setState({
      progress: progress,
      barPercentage: progress / 100
    });
 
  }


  next = () => {
    const { index } = this.state;
    const { list } = this.props;
    const trackLength = list.track.length;
    if(index < trackLength - 1) {
      this.setState({
        index: index + 1
      });
      this.audio.src = `/uploads/${list.track[this.state.index]}`;
      this.audio.play();
    } 
    else {
      this.setState({
        index: 0,
        isPlaying: false,
        barPercentage: 0
      });
      this.audio.currentTime = 0;
      this.audio.src = `/uploads/${list.track[0]}`;
    }
    
  }

  componentDidMount() {
   const { list } = this.props;
   const { updateProgress, next } = this;
   if(list) {
    this.audio.src = `/uploads/${list.track[0]}`;
    this.audio.autoplay = false;
    this.audio.addEventListener('timeupdate', e => {
      updateProgress();
    });
    this.audio.addEventListener('ended', e => {
      next();
    });
   }
    
    
    
  }

  componentWillUnmount() {
    this.audio.pause();
    this.setState({
      isPlaying: false,
      isPaused: false
    })
  }

  


  handleMouseMove = (e) => {
    const { barPercentage } = this.state;
    const bar = document.getElementById('bar');
    const square = document.getElementById('square');
    const parentRect = bar.getBoundingClientRect().left + (square.clientWidth) / 2;
    const offsetX = e.clientX - parentRect;
    const parentWidth = bar.getBoundingClientRect().right - bar.getBoundingClientRect().left;
    const { duration, currentTime } = this.audio;
    // if(parseInt(barPercentage, 10) >= 0 && parseInt(barPercentage, 10) < 1) {
      if(barPercentage < parseFloat(0)) {
        // console.log("HIHI")
        this.setState({
          barPercentage: 0
        });
        return;
      } 

      if(barPercentage >= 1) {
        this.setState({
          barPercentage: 1
        });
        return;
      }

      this.setState({
        barPercentage: offsetX / parentWidth
      });

      if(((duration * offsetX) / parentWidth) < duration) {
        this.audio.currentTime = (duration * offsetX) / parentWidth;
      } else {
        return;
      }

      
      
 
  }

  handleMouseUp = (e) => {
    document.body.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleSeparatorMouseDown = (e) => {
    document.body.addEventListener('mousemove', this.handleMouseMove);
    
    window.addEventListener('mouseup', this.handleMouseUp);
  }


  handleMouseMovePlayed = (e) => {
    const { duration, currentTime } = this.audio;
    const bar = document.getElementById('bar');
    const parentWidth = bar.getBoundingClientRect().right - bar.getBoundingClientRect().left;
    const parentRect = bar.getBoundingClientRect().left
    const offsetX = e.clientX - parentRect;
    
    // console.log(parentRect);
    // console.log(this.state.barPercentage * parentRect / 100);
    if(offsetX / parentWidth > 1) {
      this.setState({
        barPercentage: 1
      })
    } else {
      this.setState({
        barPercentage: offsetX / parentWidth
      });
    }
    

    if(((duration * offsetX) / parentWidth) < duration) {
      this.audio.currentTime = (duration * offsetX) / parentWidth;
    } else {
      return;
    }
    // console.log(offsetX / parentWidth);

    
  }

  handleMouseClickPlayed = (e) => {
    const { duration, currentTime } = this.audio;
    const bar = document.getElementById('bar');
    const parentWidth = bar.getBoundingClientRect().right - bar.getBoundingClientRect().left;
    const parentRect = bar.getBoundingClientRect().left
    const offsetX = e.clientX - parentRect;
    if(offsetX > 0) {
      if(offsetX / parentWidth > 1) {
        this.setState({
          barPercentage: 1
        })
      } else {
        this.setState({
          barPercentage: offsetX / parentWidth
        });
      }
      
  
      if(((duration * offsetX) / parentWidth) < duration) {
        this.audio.currentTime = (duration * offsetX) / parentWidth;
      } else {
        return;
      }
    } else {
      return;
    }
    
  }

  handlePlayedBarMouseUp = (e) => {
    document.body.removeEventListener('mousemove', this.handleMouseMovePlayed);
    window.removeEventListener('mouseup', this.handlePlayedBarMouseUp);
  }

  handlePlayedBarMouseDown = (e) => {
    document.body.addEventListener('mousemove', this.handleMouseMovePlayed);
    window.addEventListener('mouseup', this.handlePlayedBarMouseUp);
  }

  handlePlay = () => {
    const { isPlaying, isInitial } = this.state;
    if(isInitial) {
      this.setState({
        index: 0,
        isInitial: false
      });
    }
    if (isPlaying) {
      this.audio.pause();
      this.setState({
        isPlaying: false,
        isPaused: true
      });
    } else {
      this.audio.play();
    this.setState({
      isPlaying: true,
      isPaused: false
    });
    }
    
  }

  handleClickToPlay = (e) => {
    const { list } = this.props;
    const { isPlaying } = this.state;
    const id = parseInt(e.target.id, 10);
    this.audio.src = `/uploads/${list.track[id]}`;
    this.audio.play();
    this.setState({
      isPlaying: true,
      isInitial: false,
      index: id
    });
  }


  handleMute = () => {
    const { mute } = this.state;

    this.setState({
      mute: !mute
    });

    this.audio.volume = !!mute;
  }

  render() {
    const { handleSeparatorMouseDown, 
            handlePlay, 
            handleMute,
            handleMouseClickPlayed,
            handlePlayedBarMouseDown } = this;
    const { barPercentage, index, mute } = this.state;
    const { cover, list, title, publishedDate, artist } = this.props;

    const barStyle = {
      left: `${barPercentage * 100}%`
    };

    const playedStyle = {
      width : `${barPercentage * 100}%`
    }

    const selectedStyle = {
      background: `#ced4da`
    }


    const nonSelectedStyle = {
      background: 'white'
    }
    const mapToTrackList = trackList => {
      const { handleClickToPlay } = this;
      const { index, isPlaying, isPaused } = this.state;
      return trackList.map((track, i) => {
        // function n(n){
        //   return n > 9 ? "" + n: "0" + n;
        // }
        const n = (n) => {
          return n > 9 ? "" + n: "0" + n;
        }
        return (<div 
                  id={i} 
                  key={i} 
                  className={cx('track')} 
                  onClick={handleClickToPlay} 
                  style={index === i ? selectedStyle : nonSelectedStyle}>
                  <div id={i} className={cx('track-number')}>
                    {i + 1}     
                  </div>
                  <div id={i} className={cx('track-title')} >
                    {track}
                  </div>
                  <div id={i} className={cx('track-duration')}>
                    {
                      (i === index && isPlaying) && !isNaN(this.audio.duration) ? 
                      `${n(parseInt(this.audio.currentTime / 60, 10))}:${n(parseInt(this.audio.currentTime % 60, 10))} / ${n(parseInt(this.audio.duration / 60, 10))}:${n(parseInt(this.audio.duration % 60, 10))}` : `` 
                    } 
                  </div>
                </div>);
      })
    }


    // const mapToAudioTag = trackList => {
    //   return trackList.map((track, i) => {
    //     return (
    //         <source key={i} src={`/uploads/${track}`} type="audio/mp3"/>
    //     )
    //   })
    // }



    return (
      <div className={cx('audio-player')} >
        <div className={cx('album-title')}>
          {title && title}
        </div>
        <div className={cx('artist-name')}>
          by {artist}
        </div>
        <div className={cx('published-date')}>
          {moment(publishedDate).format('ll')}
        </div>
        <div className={cx('song-name')}>
          {list && list.name[index]}
        </div>
        <div className={cx('player')}>
          <div className={cx('cover')}>
            <img 
              src={cover && `/uploads/${cover}`}/>
          </div>
          <div className={cx('player-indicator')} onClick={handleMouseClickPlayed}>
            <div className={cx('play')} onClick={handlePlay}>
              {
                this.state.isPlaying ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>
              }
            </div>
            <div className={cx('bar')} id="bar">
            <div className={cx('played')} style={playedStyle} onMouseDown={handlePlayedBarMouseDown}>
            </div>
            {/* <div className={cx('touch-square')}
                  id="square" 
                  onMouseDown={handleSeparatorMouseDown}
                  style={barStyle}> 
              </div> */}
            </div>
            
            <div className={cx('volume')} onClick={handleMute}>
              {
                mute ? <i className="fa fa-volume-off"></i> : <i className="fa fa-volume-up"></i>
              }
            </div>
          </div>
          {/* <TrackList/>
          <TrackList/>
          <TrackList/>
          <TrackList/>
          <TrackList/> */}
          {
            list && mapToTrackList(list.name)
          }
          {/* <audio id="audio-element"> 
          {
            list && mapToAudioTag(list.track)
          }
          </audio> */}
          
        </div>
      </div>
    );
  }
}

export default AudioPlayer;