import React from 'react'
import { connect } from 'dva'

import { Carousel } from 'antd';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    const { location, dispatch } = this.props;
    let id = location.pathname.split('/')[2];
    dispatch({
      type: 'heroModel/get_hero_detail',
      payload: id,
      callback: (res) => {
        console.log(res);
      }
    })
  }
  render() {
    return (
      <div>
        <Carousel autoplay>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
      </Carousel>
      </div>
    )
  }
}
Detail.propTypes = {

};
function mapStateToProps({  }) {
  return { };
}
export default connect(mapStateToProps)(Detail)
