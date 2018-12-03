import React from 'react'
import { connect } from 'dva'

class List extends React.Component {
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
        list
      </div>
    )
  }
}
List.propTypes = {

};
function mapStateToProps({  }) {
  return { };
}
export default connect(mapStateToProps)(List)
