import React, { Component, Fragment } from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';
import CodeMirror from 'codemirror';

import 'codemirror/mode/markdown/markdown'; // 마크다운 문법 색상
// 마크다운 내부에 들어가는 코드 색상
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';

// CodeMirror 를 위한 CSS 스타일
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

import Button from 'components/common/Button';

import axios from 'axios';
const cx = classNames.bind(styles);
const $ = window.$;

class EditorPane extends Component {



  id = 0;
  coverId = 0;

  editor = null;
  codeMirror = null;
  cursor = null;

  state = {
    list: [],
    trackListVisible: true,
    cover: [],
    propCoverList: []
  }

  initializeEditor = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true
    });
    this.codeMirror.on('change', this.handleChangeMarkdown);
  }




  componentDidMount() {
    this.initializeEditor();
    

   
  }

  handleChange = (e) => {
    const { onChangeInput } = this.props;
    const { name, value } = e.target;
    onChangeInput({name, value});
  }

  handleChangeMarkdown = (doc) => {
    const { onChangeInput } = this.props;
    this.cursor = doc.getCursor();
    onChangeInput({
      name: 'markdown',
      value: doc.getValue()
    });
  }


  handleFileChange = (e) => {
    const { onChangeFile, onAjaxUpload } = this.props;
    // const { list } = this.state;
    // if(e.target.files[0]) {
    //   this.setState({
    //     list: list.concat({
    //       id: this.id++,
    //       name: e.target.files[0].name
    //     })
        
    //   });
    // } else {
    //   return;
    // }

    if(e.target.files[0]) {
      onChangeFile({
        fileName: e.target.files[0].name
      });
    } else {
      return;
    }
    
    

    const formData = new FormData();
    formData.append('track', e.target.files[0]);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
 
    onAjaxUpload(formData, config);



  

    // console.log(e.target.files[0]);
  }

  handleCoverChange = (e) => {
    const { onChangeCover, onAjaxCoverUpload } = this.props;
    const { cover } = this.state;
    if(e.target.files[0]) {
      if(cover.length >= 1) {
        alert("커버 사진은 한장만 가능합니다.");
        return;
      }
      this.setState({
        cover: cover.concat({
          id: this.coverId++,
          name: e.target.files[0].name
        })
      });
    } else {
      return;
    }
    onChangeCover({
      fileName: e.target.files[0].name
    });

    const formData = new FormData();
    formData.append('cover', e.target.files[0]);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    onAjaxCoverUpload(formData, config);
    
  }

  handleTrackListVisible = () => {
    const { trackListVisible } = this.state;
    this.setState({
      trackListVisible: !trackListVisible
    });
  }

  handleTrackListRemove = (e) => {
    // const { list } = this.state;
    const { onAjaxRemoveTrack, onRemoveTrack, uploadedTrackList } = this.props;

    if(parseInt(e.target.getAttribute('index'), 10) + 1 === document.getElementsByName('track-name').length) {
      onAjaxRemoveTrack(uploadedTrackList.toJS()[parseInt(e.target.getAttribute('index'), 10)]);
      onRemoveTrack({key: e.target.getAttribute('index')});
      console.log("here1");
    } else if(parseInt(e.target.getAttribute('index'), 10) === 0){
      onAjaxRemoveTrack(uploadedTrackList.toJS()[parseInt(e.target.getAttribute('index'), 10)]);
      const receivedName = [];
      for(var i = 0;i < document.getElementsByName('track-name').length - 1;i++){
        receivedName.push(document.getElementsByName('track-name')[i + 1].value);
        console.log(receivedName);
      }
      onRemoveTrack({key: e.target.getAttribute('index')});
      for(var j = 0;j < document.getElementsByName('track-name').length;j++){
        document.getElementsByName('track-name')[j].value = receivedName[j];
      }
      

    } else {
      onAjaxRemoveTrack(uploadedTrackList.toJS()[parseInt(e.target.getAttribute('index'), 10)]);
      const receivedName = document.getElementsByName('track-name')[parseInt(e.target.getAttribute('index'), 10) + 1].value;
      console.log(receivedName);
      onRemoveTrack({key: e.target.getAttribute('index')});
      document.getElementsByName('track-name')[parseInt(e.target.getAttribute('index'), 10)].value = receivedName;
      console.log("here2");
    }

    


    
  }
  
  handleCoverRemove = (e, id) => {
    const { cover } = this.state;
    const { onRemoveCover,  onAjaxRemoveCover, uploadedCover } = this.props;
    this.setState({
      cover: cover.filter(cover => cover.id !== parseInt(e.target.id, 10))
    });
    onAjaxRemoveCover(uploadedCover);
    onRemoveCover();
    console.log(e.target.id);
  }





  componentDidUpdate(prevProps, prevState) {
    if(prevProps.markdown !== this.props.markdown) {
      const { codeMirror, cursor } = this;
      if(!codeMirror) return;
      codeMirror.setValue(this.props.markdown);
      if(!cursor) return; // 커서가 없는 경우
      codeMirror.setCursor(cursor);
    }

    // if(prevProps.uploadedCover !== this.props.uploadedCover) {
    //   this.setState({
    //     propCoverList: this.state.propCoverList.concat({
    //       id: 0,
    //       name: this.props.uploadedCover
    //     })
    //   });
    //   console.log("hihi");
    // }

   

  }



  
  render() {
    const { handleChange, 
            handleFileChange,
            handleTrackListVisible, 
            handleTrackListRemove,
            handleCoverChange,
            handleCoverRemove
             } = this;
    const { list, trackListVisible, cover } = this.state;
    const propCoverList = [];

    const { title, tags, trackList, artist, uploadedTrackList, id, uploadedCover, preloadedTrackList} = this.props;

    
             
    
    const trackListVisibleStyle = {
      display: "block"
    };

    const trackListNonVisibleStyle = {
      display: "none"
    };

    const mapToTrackList = trackList => {
      return trackList.map((track, i) => {
        return (<div className={cx('track-list')}
                      key={i}
                      id={track.id}
                      index={i}
                      >
                {i + 1}: {track.name}
                <Button id={track.id} index={i} theme="gray" onClick={handleTrackListRemove}>&#x2715;</Button>
                <div className={cx('track-name')}>
                  <input type="text" name="track-name" placeholder="트랙 이름을 작성해주세요."/>
                </div>
               </div>);
      });
    }

    const mapToUploadedTrackList = (trackList) => {
      return trackList.map((track, i) => {
        return (
          <div className={cx('track-list')}
            key={i}
            >
            {i + 1}: <input type="text" 
                            ref={ref => this.name = ref}
                            className={cx('track-name')}
                             name="track-name" 
                             
                             placeholder="트랙 이름을 작성해주세요."/>
            <Button index={i} theme="gray" onClick={handleTrackListRemove}>&#x2715;</Button>
          </div>
        )
      })
    }


    const mapToPreloaded = (preloaded) => {
      return preloaded.map((track, i) => {
        return (
          <div className={cx('track-list')}
            key={i}
            >
            {i + 1}: <input type="text" 
                            ref={ref => this.name = ref}
                            className={cx('track-name')}
                             name="track-name" 
                             value={track.name}
                             placeholder="트랙 이름을 작성해주세요."/>
            <Button index={i} theme="gray" onClick={handleTrackListRemove}>&#x2715;</Button>
          </div>
        )
      })
    }

    const mapToCoverList = coverList => {
      return coverList.map((cover, i) => {
        return (<div className={cx('track-list')}
                    key={i}
                    id={cover.id}>
                    {cover.name}
                <Button id={cover.id} theme="gray" onClick={handleCoverRemove}>&#x2715;</Button>
              </div>)
      })
    }


    

    
    return (
      <div className={cx('editor-pane')}>
        <input 
          className={cx('title')} 
          placeholder="앨범 타이틀을 입력하세요" 
          name="title"
          value={title}
          onChange={handleChange}/>
          <input 
          className={cx('artist')} 
          placeholder="아티스트 이름을 입력하세요" 
          name="artist"
          value={artist}
          onChange={handleChange}/>
        <div className={cx('code-editor')} ref={ref=>this.editor=ref}></div>
        <div className={cx('tags')}>
          <div className={cx('description')}>태그</div>
          <input 
            name="tags"
            placeholder="태그를 입력하세요 (쉼표로 구분)"
            value={tags}
            onChange={handleChange}/>
        </div>
        {
            trackListVisible ? <div 
                                className={cx('close-track')}
                                onClick={handleTrackListVisible}>
                                파일 첨부 닫기
                              </div> : <div 
                                        className={cx('open-track')}
                                        onClick={handleTrackListVisible}>
                                          파일 첨부 열기
                                        </div>
          }
        <div 
          id="tracks" 
          className={cx('tracks')} 
          style={trackListVisible ? trackListVisibleStyle : trackListNonVisibleStyle}>
         <div className={cx('description')}>
          앨범 커버 파일
          </div>
          <div className={cx('button-wrapper')}>
            {/* <Button theme="gray">트랙 추가</Button> */}
            <label className={cx('input-track-label')}>
            클릭하여 커버 파일을 첨부해주세요.(jpg or png)
            <input 
              type="file" 
              name="cover" 
              accept=".jpg, .jpeg, .png"
              className={cx('input-track')}
              onChange={handleCoverChange}/>
            </label>
            <div className={cx('track-list')}>
            {
              id && (uploadedCover !== "") ? mapToCoverList([{
                id: 0,
                name: uploadedCover
              }]) : mapToCoverList(cover)
            }
            
            </div>
          </div>
          <div className={cx('description')}>
          트랙 파일
          </div>
          <div id="button-wrapper" className={cx('button-wrapper')}>
            <label className={cx('input-track-label')}>
            {
              id ? "클릭하여 트랙 파일을 첨부해주세요.(수정 화면일시, 모든 트랙파일을 초기화합니다.)" : "클릭하여 트랙 파일을 첨부해주세요."
            }
            <input 
              type="file" 
              name="track" 
              accept=".mp3"
              className={cx('input-track')}
              onChange={handleFileChange}/>
            </label>
            <div className={cx('track-list')}>
            {/* {
              mapToTrackList(list)
            } */}
            {
              uploadedTrackList.length !== 0 && mapToUploadedTrackList(uploadedTrackList)
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditorPane;