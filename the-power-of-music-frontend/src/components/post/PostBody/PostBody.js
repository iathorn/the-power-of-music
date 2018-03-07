import React from 'react';
import styles from './PostBody.scss';
import classNames from 'classnames/bind';
import AudioPlayer from 'components/player/AudioPlayer';
import MarkdownRender from '../../common/MarkdownRender/MarkdownRender';

const cx = classNames.bind(styles);

const PostBody = ({body}) => (
  <div className={cx('post-body')}>
    <div className={cx('paper')}>
      
      <AudioPlayer/>
      <MarkdownRender markdown={body}/>
    </div>
  </div>
);

export default PostBody;