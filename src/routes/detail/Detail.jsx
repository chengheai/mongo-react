import Header from './../../components/Header.jsx';
import React from 'react'
import { connect } from 'dva'

import { Carousel, Button } from 'antd';
import { Link } from 'dva/router';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgArr: [],
      name: '',
      favourite: '',
      explain: ''
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
        this.setState({
          imgArr: res.imgArr,
          explain: res.explain,
          favourite: res.favourite,
          name: res.name
        })
      }
    })
  }
  render() {
    const { imgArr, explain, favourite, name } = this.state;
    return (
      <div>
      <Header />
      <div style={{width: 850, textAlign: 'left',margin: '0 auto', marginTop: 20}}><Link to='/list'><Button type='primary'>返回上一页</Button></Link></div>
      <div style={{margin: '0 auto', width: 850, marginTop: 20}}>
        <Carousel
          autoplay
         >
          {imgArr.map((item, index) => {
          console.log(item)
          return <div style={{width: 850, height: 460}}><img
            style={{width: 850, height: 460, objectFit: 'cover'}}
            key={index}
            src={item}
          />
          </div>
        })}
      </Carousel>
      <h1 style={{color: '#181e'}}>{name} ******* {favourite}</h1>
      <h2>被动:</h2>
      <h3>{explain}</h3>
      </div>
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
