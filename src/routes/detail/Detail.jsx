import React from 'react'
import { connect } from 'dva'

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {

  }
  render() {
    return (
      <div>
        detail
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
