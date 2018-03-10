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

const cx = classNames.bind(styles);


class EditorPane extends Component {

  id = 0;
  coverId = 0;

  editor = null;
  codeMirror = null;
  cursor = null;

  state = {
    list: [],
    trackListVisible: true,
    cover: []
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
    const { onChangeFile } = this.props;
    const { list } = this.state;
    if(e.target.files[0]) {
      this.setState({
        list: list.concat({
          id: this.id++,
          name: e.target.files[0].name
        })
      });
    } else {
      return;
    }
    
    onChangeFile({
      fileName: e.target.files[0].name
    });
    // console.log(e.target.files[0]);
  }

  handleCoverChange = (e) => {
    const { onChangeCover } = this.props;
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
    console.log(e.target.files[0]);
  }

  handleTrackListVisible = () => {
    const { trackListVisible } = this.state;
    this.setState({
      trackListVisible: !trackListVisible
    });
  }

  handleTrackListRemove = (e, id) => {
    const { list } = this.state;
    this.setState({
      list: list.filter(list => list.id !== parseInt(e.target.id, 10))
    });

    
  }
  
  handleCoverRemove = (e, id) => {
    const { cover } = this.state;
    this.setState({
      cover: cover.filter(cover => cover.id !== parseInt(e.target.id, 10))
    });
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
  }
  render() {
    const { handleChange, 
            handleFileChange,
            handleTrackListVisible, 
            handleTrackListRemove,
            handleCoverChange,
            handleCoverRemove } = this;
    const { list, trackListVisible, cover } = this.state;
    const { title, tags, trackFile } = this.props;

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
                      >
                {i + 1}: {track.name}
                <Button id={track.id} theme="gray" onClick={handleTrackListRemove}>&#x2715;</Button>
               </div>);
      });
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
          placeholder="제목을 입력하세요" 
          name="title"
          value={title}
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
              name="track" 
              accept=".jpg, .jpeg, .png"
              className={cx('input-track')}
              onChange={handleCoverChange}/>
            </label>
            <div className={cx('track-list')}>
            {
              mapToCoverList(cover)
            }
            
            </div>
          </div>
          <div className={cx('description')}>
          트랙 파일
          </div>
          <div className={cx('button-wrapper')}>
            {/* <Button theme="gray">트랙 추가</Button> */}
            <label className={cx('input-track-label')}>
            클릭하여 트랙 파일을 첨부해주세요.
            <input 
              type="file" 
              name="track" 
              accept=".mp3"
              className={cx('input-track')}
              onChange={handleFileChange}/>
            </label>
            <div className={cx('track-list')}>
            {
              mapToTrackList(list)
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditorPane;