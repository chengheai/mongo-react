import React from 'react';
import { connect } from 'dva';
import { Table, Button, Layout, Drawer, Form, Col, Row, Input, Select } from 'antd';

const { Option } = Select;
const { Header, Content } = Layout;
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      visible: false,
      loading: true,
      tableData: [],
      total:0
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
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
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
  getData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'heroModel/get_heros',
      payload: {},
      callback: res =>{
        this.setState({
          tableData: res.data,
          total: parseInt(res.headers['x-header'])
        })
      }
    })
    this.setState({
      loading: false
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, tableData, total } = this.state;
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
        width: 150,
      },
      {
        title: '位置',
        key: 'dowhat',
        dataIndex: 'dowhat',
        width: 120,
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
                <Button type="primary">详情</Button>
                <Button style={{ marginLeft: 5 }}>修改</Button>
                <Button style={{ marginLeft: 5 }} type="danger">
                  删除
                </Button>
                <Button style={{ marginLeft: 5 }} type="dashed">
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
          <Header>
            <h1 style={{ color: '#fff' }}>LOGO</h1>
            <span style={{ color: '#fff' }}>121</span>
          </Header>
            <Content style={{ padding: 20 }}>
              <div style={{ marginBottom: 10 }}>
                <Button type="primary" icon="plus" onClick={this.showDrawer}>
                  添加
                </Button>
              </div>
              <Table columns={columns} dataSource={tableData} loading={loading} scroll={{ y: 700 }}
                pagination={{ pageSize: 10,
                showTotal: () => (<span>总页数: <span>{total}</span></span>), }} />
            </Content>
        </Layout>
        <Drawer
          title="添加"
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
          <Form layout="vertical" hideRequiredMark>
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
                  {getFieldDecorator('owner', {
                    rules: [{ required: true, message: '请选择性别' }],
                  })(
                    <Select placeholder="请选择性别">
                      <Option value="1">男</Option>
                      <Option value="0">女</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="籍贯">
                  {getFieldDecorator('type', {
                    rules: [{ required: true, message: '请选择籍贯' }],
                  })(
                    <Select placeholder="请选择籍贯">
                      <Option value="0">艾欧尼亚</Option>
                      <Option value="1">祖安</Option>
                      <Option value="2">诺克萨斯</Option>
                      <Option value="3">班德尔城</Option>
                      <Option value="4">皮尔吉沃特</Option>
                      <Option value="5">战争学院</Option>
                      <Option value="6">巨神峰</Option>
                      <Option value="7">雷瑟守备</Option>
                      <Option value="8">裁决之地</Option>
                      <Option value="9">黑色玫瑰</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="位置">
                  {getFieldDecorator('approver', {
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
                      <Option value="2">打野</Option>
                      <Option value="3">辅助</Option>
                      <Option value="4">下路</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="台词">
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入台词' }],
                  })(<Input placeholder="请输入台词" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="背景故事">
                  {getFieldDecorator('description', {
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
            <Button onClick={this.onClose} type="primary">保存</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}
const ListInfo = Form.create()(List);
List.propTypes = {};
function mapStateToProps({ test }) {
  return { test };
}
export default connect(mapStateToProps)(ListInfo);
