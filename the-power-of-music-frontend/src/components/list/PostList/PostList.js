import React, {Fragment} from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import moment from 'moment';
import removeMd from 'remove-markdown';

const cx = classNames.bind(styles);

const PostItem = ({ title, body, publishedDate, tags, id, cover, artist }) => {
  
  return (
    
    <div className={cx('post-item')}>
      <div className={cx('cover')}>
      <Link to={`/post/${id}`}><img 
          src={`/uploads/${cover}`}/></Link>
      </div>
      <div className={cx('post-content')}>
        <div className={cx('title')}>
        <Link to={`/post/${id}`}>
       {title}
       </Link>
          
        </div>
        <div className={cx('artist')}>
        <Link to={`/post/${id}`}>
        by {artist}
        </Link>
        </div>
        <div className={cx('published-date')}>
        <Link to={`/post/${id}`}>
        {moment(publishedDate).format('ll')}
        </Link>
        </div>
        <div className={cx('body')}>
        <Link to={`/post/${id}`}>
        {removeMd(body)}
        </Link>
        </div>
      </div>
    </div>
  );
}

const PostList = ({posts}) => {

  const postList = posts.map(
    (post) => {
      const { _id, title, body, publishedDate, tags, cover, artist } = post.toJS();
      return (
        <PostItem
          title={title}
          body={body}
          cover={cover}
          artist={artist}
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