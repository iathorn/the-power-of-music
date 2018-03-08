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
  editor = null;
  codeMirror = null;
  cursor = null;

  state = {
    list: []
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
    this.setState({
      list: list.concat({
        name: e.target.files[0].name
      })
    });
    onChangeFile({
      fileName: e.target.files[0].name
    });
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
    const { handleChange, handleFileChange } = this;
    const { title, tags, trackFile } = this.props;
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
        <div id="tracks" className={cx('tracks')}>
          <div className={cx('description')}>
          트랙 파일
          
          </div>
          <div className={cx('button-wrapper')}>
            <Button theme="gray">트랙 추가</Button>
          </div>
          
          <input 
            type="text" 
            name="track-name" 
            placeholder="트랙의 제목을 입력해주세요."
            className={cx('input-track-name')}/>
            <label className={cx('input-track-label')}>
            {
              trackFile !== "" ? trackFile : "클릭하여 트랙 파일을 첨부해주세요."
            }
              <input 
              type="file" 
              name="track" 
              accept=".mp3"
              className={cx('input-track')}
              onChange={handleFileChange}/>
            </label>
          
        </div>
      </div>
    );
  }
}

export default EditorPane;