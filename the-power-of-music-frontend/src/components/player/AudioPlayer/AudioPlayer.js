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
  render() {
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
            <div className={cx('bar')}>
              <div className={cx('touch-square')}> 
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