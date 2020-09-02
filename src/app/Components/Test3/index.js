import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDataToChangeState } from '../../../actions'

class Test3 extends Component {
    componentDidMount = async () => {
        await this.props.fetchDataToChangeState("Testing")
    }
    render() {
        return (
            <div>
                <p>{`Test3 ${this.props.initState}`}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { initState } = state.app
    return { initState }
}
const mapDispatchToProps = dispatch => ({
    fetchDataToChangeState: data => dispatch(fetchDataToChangeState(data)),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Test3)