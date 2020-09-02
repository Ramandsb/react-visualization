import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDataToChangeState } from '../../../actions'
import ReactMapGL, { Marker } from 'react-map-gl';

class CovidTracker extends Component {
    state = {
        viewport: {
            width: '100vw',
            height: '100vh',
            latitude: 41.312731,
            longitude: -6.484775,
            zoom: 2
        },
        entries: []
    }
    componentDidMount = async () => {
        // const logEntries = await getAllLogEntries()
        await this.props.fetchDataToChangeState("Testing")
    }
    render() {
        const { viewport, entries} = this.state
        return (
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/ramandsb/ckeaxqbt302lw19o54po1nkdt"
                mapboxApiAccessToken={"pk.eyJ1IjoicmFtYW5kc2IiLCJhIjoiY2tlYXhjdWltMDJuZDMwcW52Mmdya290OCJ9.G1xvvIWABtW-1xV7k6A0Sg"}
                onViewportChange={nextViewport => this.setState({ viewport:nextViewport })}>
                {
                    entries.map((item) => {
                        return (
                            <Marker latitude={item.latitude} longitude={item.longitude} offsetLeft={-20} offsetTop={-10}>
                                <img style={{ width: '24px', height: '24px' }} src="https://lh3.googleusercontent.com/proxy/jkg1X3KtYE9ysASkqSi6M2hFiU-P6_VRrtG3-hTzZVGNJrrG6a3vLrac3QyNfNwR5yceC-BpBEoJfTJ1171JFVv_9UtMZUxS7UQ2VQiD4eBABl1MqXpRELn6vzlI58tvliJdRsIQSm1L" alt='marker' />
                            </Marker>
                        )
                    })
                }
            </ReactMapGL>
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
)(CovidTracker)