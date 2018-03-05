import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const PostItem = () => {
  return (
    <div className={cx('post-item')}>
      <div className={cx('cover')}>
        <img 
          src={`https://images.unsplash.com/photo-1413781892741-08a142b23dfe?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1c936494b99fce2298a27b9a39627ed6&auto=format&fit=crop&w=1650&q=80`}/>
      </div>
      <div className={cx('post-content')}>
        <div className={cx('title')}>
          제목
        </div>
        <div className={cx('artist')}>
          by 음악가
        </div>
        <div className={cx('published-date')}>
          2018-03-05
        </div>
        <div className={cx('body')}>
          Some Description....
        </div>
      </div>
    </div>
  );
}

const PostList = () => (
  <div className={cx('post-list')}>
    <PostItem/>
    <PostItem/>
    <PostItem/>
    <PostItem/>
  </div>
);

export default PostList;