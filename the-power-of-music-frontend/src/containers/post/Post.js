import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as postActions from 'store/modules/post';
import PostInfo from 'components/post/PostInfo';
import PostBody from 'components/post/PostBody';
import {Helmet} from 'react-helmet';
import removeMd from 'remove-markdown';

class Post extends Component {
    initialize = async () => {
        const { PostActions, id } = this.props;

        try {
            await PostActions.getPost(id);
        } catch(e){
            console.log(e);
        }
    }

    componentDidMount() {
        this.initialize();
    }
 render() {
     const { loading, post } = this.props;
     if(loading) return null;
     const { title, body, publishedDate, tags, cover, list, artist } = post.toJS();
   return (
        <div>
        {
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={removeMd(body).slice(0, 200)}/>
            </Helmet>
        }
            <PostInfo title={title} body={body} publishedDate={publishedDate} tags={tags}/>
            <PostBody 
                title={title} 
                body={body} 
                cover={cover} 
                artist={artist}
                list={list} 
                publishedDate={publishedDate}/>
        </div>
   );
 }
}

export default connect(
  (state) => ({
      post: state.post.get('post'),
      loading: state.pender.pending['post/GET_POST']
  }),
  (dispatch) => ({
      PostActions: bindActionCreators(postActions, dispatch)
  })
)(Post);