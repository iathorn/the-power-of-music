import React, { Component } from 'react';
import styles from './AudioPlayer.scss';
import classNames from 'classnames/bind';

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

  state = {
    barPercentage: 0.0
  };

  handleMouseMove = (e) => {
    const { barPercentage } = this.state;
    const bar = document.getElementById('bar');
    const square = document.getElementById('square');
    const parentRect = bar.getBoundingClientRect().left + (square.clientWidth) / 2;
    const offsetX = e.clientX - parentRect;
    const parentWidth = bar.getBoundingClientRect().right - bar.getBoundingClientRect().left;
    // if(parseInt(barPercentage, 10) >= 0 && parseInt(barPercentage, 10) < 1) {
      if(barPercentage < 0) {
        // console.log("HIHI")
        this.setState({
          barPercentage: 0
        });
        return;
      } 

      if(barPercentage > 1) {
        this.setState({
          barPercentage: 1
        });
        return;
      }

      this.setState({
        barPercentage: offsetX / parentWidth
      });
      
    
    // } 
    // else if(parseInt(barPercentage, 10) === -0) {
    //   console.log("-0!!!")
    //   this.setState({
    //     barPercentage: 0
    //   });
    // } 
    // else if(parseInt(barPercentage, 10) > 1){
    //   this.setState({
    //     barPercentage: 1
    //   });
    // }
    
    // this.setState({
    //   barPercentage: offsetX / parentWidth
    // });
    // console.log(e.clientX);
    // console.log(bar.clientX);
    // console.log(window.innerWidth);
    // console.log(window.clientWidth);
    console.log(barPercentage);
    // console.log(bar.getBoundingClientRect().left);
    // console.log(bar.getBoundingClientRect().right);
    // console.log(offsetX);
    // console.log(parentRect);
    // console.log(bar.clientWidth);
  }

  handleMouseUp = (e) => {
    document.body.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleSeparatorMouseDown = (e) => {
    document.body.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }
  render() {
    const { handleSeparatorMouseDown } = this;
    const { barPercentage } = this.state;

    const barStyle = {
      left: `${barPercentage * 100}%`
    };



    return (
      <div className={cx('audio-player')}>
        <div className={cx('album-title')}>
          앨범 타이틀
        </div>
        <div className={cx('artist-name')}>
          by 아티스트
        </div>
        <div className={cx('published-date')}>
          2018-03-05
        </div>
        <div className={cx('song-name')}>
          노래 이름
        </div>
        <div className={cx('player')}>
          <div className={cx('cover')}>
            <img 
              src={`https://images.unsplash.com/photo-1496016943515-7d33598c11e6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=936a883de6ad128e4b3d414ffd04490a&auto=format&fit=crop&w=800&q=80`}/>
          </div>
          <div className={cx('player-indicator')}>
            <div className={cx('play')}>
              Play
            </div>
            <div className={cx('bar')} id="bar">
            <div className={cx('touch-square')}
                  id="square" 
                  onMouseDown={handleSeparatorMouseDown}
                  style={barStyle}> 
              </div>
            </div>
            
            <div className={cx('volume')}>
              Volume
            </div>
          </div>
          <TrackList/>
          <TrackList/>
          <TrackList/>
          <TrackList/>
          <TrackList/>
        </div>
      </div>
    );
  }
}

export default AudioPlayer;