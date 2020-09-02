import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDataToChangeState } from '../../actions'

class TestComponent extends Component {
    componentDidMount = async () => {
        await this.props.fetchDataToChangeState('or change anything')
    }
    render() {
        return (
            <div>
                <p>{`TestComponent ${this.props.initState}`}</p>
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
)(TestComponent)