import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './IndexPage.css';


function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <Button>123</Button>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
