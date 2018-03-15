import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as editorActions from 'store/modules/editor';
import EditorPane from 'components/editor/EditorPane';

class EditorPaneContainer extends Component {

    initialize = () => {
        const {  EditorActions } = this.props;
        EditorActions.initialize();
    }

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

    handleAjaxUpload = (formData, config) => {
        const { EditorActions } = this.props;
        EditorActions.ajaxUpload(formData, config);
    }

    handleAjaxCoverUpload = (formData, config) => {
        const { EditorActions } = this.props;
        EditorActions.ajaxCoverUpload(formData, config);
    }


    render() {
        const {title, 
                markdown,
                tags, 
                trackFile, 
                coverFile, 
                artist} = this.props;
        const { handleChangeInput,
                 handleChangeFile, 
                 handleCoverFile, 
                 handleAjaxUpload,
                handleAjaxCoverUpload } = this;
        
        return (
            <EditorPane
                title={title}
                markdown={markdown}
                tags={tags}
                trackFile={trackFile}
                coverFile={coverFile}
                artist={artist}
                onChangeInput={handleChangeInput}
                onChangeFile={handleChangeFile}
                onChangeCover={handleCoverFile}
                onAjaxUpload={handleAjaxUpload}
                onAjaxCoverUpload={handleAjaxCoverUpload}
                />
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
    coverFile: state.editor.get('coverFile'),
    artist: state.editor.get('artist'),
}), (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
}))(EditorPaneContainer);