import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as editorActions from 'store/modules/editor';
import EditorHeader from 'components/editor/EditorHeader';
import { withRouter } from 'react-router-dom';

class EditorHeaderContainer extends Component {

    handleGoBack = () => {
        const { history } = this.props;
        history.goBack();
    }


    handleSubmit = async () => {
        const { title, markdown, tags, history } = this.props;
        const { EditorActions } = this.props;
        const post = {
            title,
            body: markdown,
            tags: tags === "" ? [] : [...new Set(tags.split(', ').map(tag => tag.trim()))]
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
        onSubmit={handleSubmit}/>
   );
 }
}

export default connect(
  (state) => ({
      postId: state.editor.get('postId'),
      title: state.editor.get('title'),
      markdown: state.editor.get('markdown'),
      tags: state.editor.get('tags')
  }),
  (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
  })
)(withRouter(EditorHeaderContainer));