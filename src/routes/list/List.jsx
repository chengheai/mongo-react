import Header from './../../components/Header.jsx';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import { Table, Button, Layout, message, Modal, Drawer, Form, Col, Row, Input, Select, Tag } from 'antd';

const { Option } = Select;
const { Content } = Layout;
const confirm = Modal.confirm;
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      visible: false,
      imgVisible: false,
      loading: true,
      tableData: [],
      total: 0,
      imgUrl: '',
      imgId: '',
      editForm: {},
      pagination: {
        currentPage: 1,
        pageSize: 10,
      },
    };
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  showDrawer = () => {
    this.setState({
      visible: true,
      types: 1
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  // pic
  showImgDrawer = (id) => {
    console.log(id);
    this.setState({
      imgVisible: true,
      imgId: id,
    })
  };

  imgClose = () => {
    this.setState({
      imgVisible: false,
    });
  };

  handleChange = (value) => {
    console.log(`Selected: ${value}`);
  }
  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate() {
    if(this.state.visible === false) {
      this.props.form.resetFields();
    }
  }
  //编辑
  editHandle = (obj) =>{
    console.log('obj: ', obj);
    this.setState({
      visible: true,
      types: 2,
      editForm: obj
    });
    this.props.form.setFieldsValue({
      name: obj.name,
      nickname: obj.nickname,
      explain: obj.explain,
      favourite: obj.favourite,
      sex: obj.sex,
      dowhat: obj.dowhat,
      address: obj.address
    });
  }
  ImputChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      imgUrl: e.target.value
    })
  }
  // 添加图片
  addPicHandle = () => {
    let that = this;
    const { imgUrl, imgId } = that.state;
    const { dispatch } = this.props;
    console.log(imgUrl,imgId)
    if (!imgUrl.trim()) {
      message.info('图片格式不正确');
    } else {
      dispatch({
        type: 'Hero/put_add_pic',
        payload: {
          id: imgId,
          url: imgUrl
        },
        callback: (res) => {
          message.success('添加成功');
          this.setState({
            imgUrl: '',
            imgId: '',
            imgVisible: false
          })
        }
      })
    }
  }
  // 添加
  handleSubmit = (e) => {
    let that = this;
    const { dispatch } = this.props;
    const { types, editForm } = this.state;
    e.preventDefault();
    if(types === 2){
      this.props.form.validateFields((err, values) => {
        values = Object.assign(editForm, values);
        console.log('values: ', values);
      if (!err) {
        // message.loading('正在添加...');
        dispatch({
          type: 'Hero/put_heros',
          payload: values,
          callback: (res) => {
            message.success('修改成功');
            this.setState({
              visible: false,
              editId: ''
            });
            this.props.form.resetFields();
            that.getData();
          }
        })
      }
    });
    } else {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          // message.loading('正在添加...');
          dispatch({
            type: 'Hero/post_hero',
            payload: values,
            callback: (res) => {
              message.success('添加成功');
              this.setState({
                visible: false,
              });
              this.props.form.resetFields();
              that.getData();
            }
          })
        }
      });
    }
  }
  // 删除
  showDeleteConfirm = (id) => {
    let that = this;
    const { dispatch } = this.props;
    confirm({
      title: '此操作将永久删除该文件, 是否继续?',
      okText: '确定',
      okType: 'primary',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'Hero/delete_hero',
          payload: id,
          callback: (res) => {
            message.success('删除成功');
            that.getData();
          }
        })
        console.log(id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  // 获取所有
  getData = () => {
    const { dispatch } = this.props;
    const { pagination, payload } = this.state;
    const query = {
      ...pagination,
      ...payload
    }
    dispatch({
      type: 'Hero/get_heros',
      payload: query,
      callback: res =>{
        this.setState({
          tableData: res.data,
          // eslint-disable-next-line
          total: parseInt(res.headers['x-header'])
        })
      }
    })
    this.setState({
      loading: false
    })
  }
  // 翻页
  handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination);
    // let that = this;
    const { pageSize, current } = pagination;
    const { dispatch } = this.props;
    const { payload } = this.state;
    this.setState({
      pagination: {
        currentPage: current,
        pageSize,
      },
    });
    const query = {
      ...payload,
      pageSize,
      currentPage: current
    };
    dispatch({
      type: 'Hero/get_heros',
      payload: query,
      callback: res => {
        this.setState({
          tableData: res.data,
          // eslint-disable-next-line
          total: parseInt(res.headers['x-header'])
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, tableData, total, pagination, types } = this.state;
    const columns = [
      {
        title: '英雄',
        key: 'nickname',
        dataIndex: 'nickname',
        width: 150,
      },
      {
        title: '名字',
        key: 'name',
        dataIndex: 'name',
        width: 100,
      },
      {
        title: '性别',
        key: 'sex',
        dataIndex: 'sex',
        render: sex => (sex === 'man' ? '汉子' : '妹子'),
        width: 80,
      },
      {
        title: '籍贯',
        key: 'address',
        dataIndex: 'address',
        render: address => (address === '0' ? '艾欧尼亚' : address === '1' ? '祖安' : address === '2' ? '雷瑟守备' : address === '3'? '裁决之地' : '黑色玫瑰'),
        width: 150,
      },
      {
        title: '位置',
        key: 'dowhat',
        dataIndex: 'dowhat',
        render: dowhat => (
          <span>
            {dowhat.map(tag => <Tag color="volcano" key={tag}>{tag === '0' ? '上单': tag === '1'? '中单': tag === '2'? '下路': tag === '3'? '辅助': '打野' }</Tag>)}
            {/* {dowhat.map(tag => {
              tag === '0'? <Tag color='magenta'>上单</Tag> : tag === '1'? <Tag color='volcano'>中单</Tag> : tag === '2'? <Tag color='geekblue'>下路</Tag> : tag === '3'? <Tag color='purple'>辅助</Tag> : <Tag color='cyan'>打野</Tag>
            })} */}
          </span>
        ),
        width: 180,
      },
      {
        title: '台词',
        key: 'favourite',
        dataIndex: 'favourite',
        width: 250,
      },
      {
        title: '操作',
        width: 350,
        // fixed: 'right',
        render: (record, obj) => (
          <span>
            {
              <span>
              <Link to={`/detail?id=${record._id}`}>
                <Button type="primary">详情</Button>
              </Link>
                <Button
                  style={{ marginLeft: 5 }}
                  onClick={()=>{this.editHandle(record)}}
                  >编辑</Button>
                <Button
                  style={{ marginLeft: 5 }}
                  type="danger"
                  onClick={() => { this.showDeleteConfirm(record._id)}}
                  >
                  删除
                </Button>
                <Button style={{ marginLeft: 5 }} type="dashed"
                  onClick={() => {this.showImgDrawer(record._id)}}
                >
                  添加图片
                </Button>
              </span>
            }
          </span>
        ),
      },
    ];
    return (
      <div>
        <Layout style={{ height: '100vh' }}>
          <Header />
            <Content style={{ padding: 20, background: '#fff' }}>
              <div style={{ marginBottom: 10 }}>
                <Button type="primary" icon="plus" onClick={this.showDrawer}>
                  添加
                </Button>
              </div>
              <Table
                columns={columns}
                dataSource={tableData}
                loading={loading}
                scroll={{ y: 700 }}
                onChange={this.handleTableChange}
                pagination={{
                  ...pagination,
                  total,
                  currentPage: pagination.currentPage,
                  // size: 'small',
                  showQuickJumper: true,
                  showSizeChanger: true,
                showTotal: () => (<span>总页数: <span>{total}</span></span>), }} />
            </Content>
        </Layout>
        {/* 编辑添加 */}
        <Drawer
          title={ types === 2? '编辑' : '添加'}
          width={720}
          placement="right"
          onClose={this.onClose}
          visible={this.state.visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="名字">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入名字' }],
                  })(<Input placeholder="请输入名字" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="英雄">
                  {getFieldDecorator('nickname', {
                    rules: [{ required: true, message: '请输入英雄名称' }],
                  })(<Input placeholder="请输入英雄名称" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="性别">
                  {getFieldDecorator('sex', {
                    rules: [{ required: true, message: '请选择性别' }],
                  })(
                    <Select placeholder="请选择性别">
                      <Option value="man">男</Option>
                      <Option value="woman">女</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="籍贯">
                  {getFieldDecorator('address', {
                    rules: [{ required: true, message: '请选择籍贯' }],
                  })(
                    <Select placeholder="请选择籍贯">
                      <Option value="0">艾欧尼亚</Option>
                      <Option value="1">祖安</Option>
                      <Option value="2">雷瑟守备</Option>
                      <Option value="3">裁决之地</Option>
                      <Option value="4">黑色玫瑰</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="位置">
                  {getFieldDecorator('dowhat', {
                    rules: [{ required: true, message: '请选择位置' }],
                  })(
                    <Select
                      mode="tags"
                      placeholder="请选择位置"
                      onChange={this.handleChange}
                      style={{ width: '100%' }}
                    >
                      <Option value="0">上单</Option>
                      <Option value="1">中单</Option>
                      <Option value="2">下路</Option>
                      <Option value="3">辅助</Option>
                      <Option value="4">打野</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="台词">
                {getFieldDecorator('favourite', {
                    rules: [{ required: true, message: '请输入台词' }],
                  })(<Input placeholder="请输入台词" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="背景故事">
                  {getFieldDecorator('explain', {
                    rules: [
                      {
                        required: true,
                        message: '英雄故事',
                      },
                    ],
                  })(<Input.TextArea rows={4} placeholder="英雄故事" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={this.onClose}
            >
              取消
            </Button>
            <Button
              htmlType="submit"
              onClick={this.handleSubmit}
              type="primary">保存</Button>
          </div>
        </Drawer>
        {/* 添加图片 */}
        <Drawer
          title="添加图片"
          placement="bottom"
          closable={false}
          onClose={this.imgClose}
          visible={this.state.imgVisible}
        >
         <Input addonBefore="图片地址" onChange={this.ImputChange} defaultValue='' value={this.state.imgUrl} />
         <div>
           {this.state.imgList}
         </div>
        <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={this.imgClose}
            >
              取消
            </Button>
            <Button
              onClick={this.addPicHandle}
              type="primary">确定</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}
const ListInfo = Form.create()(List);
List.propTypes = {};
function mapStateToProps({ Hero }) {
  return { Hero };
}
export default connect(mapStateToProps)(ListInfo);
