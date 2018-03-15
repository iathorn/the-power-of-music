import React from 'react';
import styles from './PostBody.scss';
import classNames from 'classnames/bind';
import AudioPlayer from 'components/player/AudioPlayer';
import MarkdownRender from '../../common/MarkdownRender/MarkdownRender';

const cx = classNames.bind(styles);

const PostBody = ({title, body, cover, list, publishedDate, artist}) => (
  <div className={cx('post-body')}>
    <div className={cx('paper')}>
      
      <AudioPlayer 
        title={title} 
        cover={cover}
        artist={artist} 
        list={list} 
        publishedDate={publishedDate}/>
      <MarkdownRender markdown={body}/>
    </div>
  </div>
);

export default PostBody;