import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as someActions from 'store/modules/some';
import PreviewPane from 'components/editor/PreviewPane';

class PreviewPaneContainer extends Component {
 render() {
     const { title, markdown } = this.props;
   return (
    <PreviewPane title={title} markdown={markdown}/>
   );
 }
}

export default connect(
  (state) => ({
      title: state.editor.get('title'),
      markdown: state.editor.get('markdown')
  }),
  (dispatch) => ({
  })
)(PreviewPaneContainer);