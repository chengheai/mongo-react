
import React from 'react';
import { Modal } from 'antd';
import styles from './Public.less';

function DeleteConfirm({
  content = '确认删除吗？',
  ...modalProps
}) {
  const modalOpts = {
    ...modalProps,
    width: 610,
  };

  return (
    <Modal {...modalOpts}>
      <div className={styles.modal}>
        {content}
      </div>
    </Modal>
  );
}

export default DeleteConfirm;
