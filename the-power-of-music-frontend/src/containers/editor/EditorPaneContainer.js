import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as editorActions from 'store/modules/editor';
import EditorPane from 'components/editor/EditorPane';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

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
    
    handleRemoveTrack = ({key}) => {
        const { EditorActions } = this.props;
        EditorActions.removeTrack({key});
    }

    handleCoverFile = ({fileName}) => {
        const { EditorActions } = this.props;
        EditorActions.changeCoverFile({fileName});
    }

    handleRemoveCoverFile = () => {
        const { EditorActions } = this.props;
        EditorActions.removeCover();
    }

    handleAjaxUpload = (formData, config) => {
        const { EditorActions } = this.props;
        EditorActions.ajaxUpload(formData, config);
    }

    handleAjaxCoverUpload = (formData, config) => {
        const { EditorActions } = this.props;
        EditorActions.ajaxCoverUpload(formData, config);
    }

    handleRemoveAjaxCover = (cover) => {
        const { EditorActions } = this.props;
        EditorActions.removeAjaxCover(cover);
    }





    handleAjaxRemoveTrack = (track) => {
        const { EditorActions } = this.props;
        EditorActions.ajaxRemoveTrack(track);
    }

    handleAjaxRemoveCover = (cover) => {
        const { EditorActions } = this.props;
        EditorActions.ajaxRemoveCover(cover);
    }

    render() {
        const {title, 
                markdown,
                tags, 
                trackFile, 
                coverFile, 
                artist,
                uploadedCover,
                location,
                uploadedTrackList,
            preloadedTrackList} = this.props;
        const { id } = queryString.parse(location.search);
        const { handleChangeInput,
                 handleChangeFile, 
                 handleCoverFile, 
                 handleAjaxUpload,
                handleAjaxCoverUpload,
                handleRemoveCoverFile,
                handleRemoveTrack,
            handleRemoveAjaxCover,
        handleAjaxRemoveCover,
    handleAjaxRemoveTrack } = this;
        
        return (
            <EditorPane
                id={id}
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
                onRemoveCover={handleRemoveCoverFile}
                onRemoveTrack={handleRemoveTrack}
                onRemoveAjaxCover={handleRemoveAjaxCover}
                uploadedCover={uploadedCover}
                uploadedTrackList={uploadedTrackList}
                preloadedTrackList={preloadedTrackList}
                onAjaxRemoveTrack={handleAjaxRemoveTrack}
                onAjaxRemoveCover={handleAjaxRemoveCover}
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
    uploadedCover: state.editor.get('uploadedCover'),
    uploadedTrackList: state.editor.get('uploadedTrackList'),
    preloadedTrackList: state.editor.get('preloadedTrackList')
}), (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
}))(withRouter(EditorPaneContainer));