import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as editorActions from 'store/modules/editor';
import EditorPane from 'components/editor/EditorPane';

class EditorPaneContainer extends Component {

    handleChangeInput = ({name, value}) => {
        const { EditorActions } = this.props;
        EditorActions.changeInput({name, value});
    }

    handleChangeFile = ({fileName}) => {
        const { EditorActions } = this.props;
        EditorActions.changeTrackFile({fileName});
    }

    handleCoverFile = ({fileName}) => {
        const { EditorActions } = this.props;
        EditorActions.changeCoverFile({fileName});
    }
    render() {
        const {title, markdown, tags, trackFile, coverFile} = this.props;
        const { handleChangeInput, handleChangeFile, handleCoverFile } = this;
        return (
            <EditorPane
                title={title}
                markdown={markdown}
                tags={tags}
                trackFile={trackFile}
                coverFile={coverFile}
                onChangeInput={handleChangeInput}
                onChangeFile={handleChangeFile}
                onChangeCover={handleCoverFile}/>
        );
    }
}

export default connect((state) => ({
    title: state
        .editor
        .get('title'),
    markdown: state
        .editor
        .get('markdown'),
    tags: state
        .editor
        .get('tags'),
    trackFile: state.editor.get('trackFile'),
    coverFile: state.editor.get('coverFile')
}), (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
}))(EditorPaneContainer);