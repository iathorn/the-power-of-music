import React from 'react';
import styles from './Footer.scss';
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const Footer = ({onLoginClick, logged}) => (
  <footer className={cx('footer')}>
    <div className={cx('footer-content')}>
      <div className={cx('brand')}>
        <Link to="/">The Power Of Music</Link>
      </div>
      <div className={cx('login')} onClick={onLoginClick}>
        { logged ? '로그아웃' : '관리자 로그인'}
      </div>
    </div>
  </footer>
);

export default Footer;