import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import moment from 'moment';
import removeMd from 'remove-markdown';

const cx = classNames.bind(styles);

const PostItem = ({ title, body, publishedDate, tags, id }) => {
  
  return (
    <div className={cx('post-item')}>
      <div className={cx('cover')}>
        <img 
          src={`https://images.unsplash.com/photo-1413781892741-08a142b23dfe?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1c936494b99fce2298a27b9a39627ed6&auto=format&fit=crop&w=1650&q=80`}/>
      </div>
      <div className={cx('post-content')}>
        <div className={cx('title')}>
          <Link to={`/post/${id}`}>{title}</Link>
        </div>
        <div className={cx('artist')}>
          by 음악가
        </div>
        <div className={cx('published-date')}>
          {moment(publishedDate).format('ll')}
        </div>
        <div className={cx('body')}>
          {removeMd(body)}
        </div>
      </div>
    </div>
  );
}

const PostList = ({posts}) => {
  const postList = posts.map(
    (post) => {
      const { _id, title, body, publishedDate, tags } = post.toJS();
      return (
        <PostItem
          title={title}
          body={body}
          publishedDate={publishedDate}
          tags={tags}
          key={_id}
          id={_id}
        />
      )
    }
  );

  return (
    <div className={cx('post-list')}>
      {postList}
    </div>
  )
}


export default PostList;