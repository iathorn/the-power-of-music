import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as listActions from 'store/modules/list';
import PostList from 'components/list/PostList';
import Pagination from 'components/list/Pagination';

class ListContainer extends Component {
    getPostList = () => {
        const { ListActions, tag, page } = this.props;
        ListActions.getPostList({
            page,
            tag
        });
    }

    componentDidMount() {
        this.getPostList();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.page !== this.props.page || prevProps.tag !== this.props.tag) {
            this.getPostList();
            // 스크롤을 맨 위로 올립니다.
            document.documentElement.scrollTop = 0; 
          }
    }
 render() {
     const { loading, posts, page, lastPage, tag} = this.props;
     if(loading) return null;
   return (
    <div>
        <PostList posts={posts}/>
        <Pagination page={page} lastPage={lastPage} tag={tag}/>
    </div>
   );
 }
}

export default connect(
  (state) => ({
      posts: state.list.get('posts'),
      loading: state.pender.pending['list/GET_POST_LIST'],
      lastPage: state.list.get('lastPage')
  }),
  (dispatch) => ({
      ListActions: bindActionCreators(listActions, dispatch)
  })
)(ListContainer);