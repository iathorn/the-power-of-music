import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as editorActions from 'store/modules/editor';
import EditorHeader from 'components/editor/EditorHeader';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class EditorHeaderContainer extends Component {


    componentDidMount() {
        const { EditorActions, location } = this.props;
        EditorActions.initialize();

        const { id } = queryString.parse(location.search);
        if(id) {
            EditorActions.getPost(id);
        }
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.goBack();
    }


    handleSubmit = async () => {
        const { title, 
                markdown, 
                tags, 
                history, 
                uploadedTrackList, 
                uploadedCover,
                artist } = this.props;
        const { EditorActions } = this.props;
        const trackNameArray = [];
        const trackCount = document.getElementsByName('track-name').length;
        
        for(let i = 0;i<trackCount;i++) {
            trackNameArray.push(document.getElementsByName('track-name')[i].value);
        };

        const post = {
            title,
            body: markdown,
            tags: tags === "" ? [] : [...new Set(tags.split(', ').map(tag => tag.trim()))],
            trackName: trackNameArray,
            uploadedTrackList: uploadedTrackList,
            uploadedCover: uploadedCover,
            artist: artist
        };



        try {
            await EditorActions.writePost(post);
            history.push(`/post/${this.props.postId}`)
        } catch(e){
            console.log(e);
        }
    }



 render() {
     const { handleGoBack, handleSubmit } = this;
   return (
    <EditorHeader
        onGoBack={handleGoBack}
        onSubmit={handleSubmit}
        onTest={this.handleTest}/>
   );
 }
}

export default connect(
  (state) => ({
      postId: state.editor.get('postId'),
      title: state.editor.get('title'),
      markdown: state.editor.get('markdown'),
      tags: state.editor.get('tags'),
      uploadedTrackList: state.editor.get('uploadedTrackList'),
      uploadedCover: state.editor.get('uploadedCover'),
      artist: state.editor.get('artist'),
  }),
  (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
  })
)(withRouter(EditorHeaderContainer));