import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import FooterContainer from 'containers/common/FooterContainer';
import HeaderContainer from 'containers/common/HeaderContainer';
const cx = classNames.bind(styles);

const PageTemplate = ({children}) => (
  <div className={cx('page-template')}>
    <HeaderContainer/>
    <main>
      {children}
    </main>
    <FooterContainer/>
  </div>
);

export default PageTemplate;