import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDataToChangeState, fetchWorldMapLocations } from '../../../actions'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import "./styles.css"

class CovidTracker extends Component {
    state = {
        viewport: {
            width: '100vw',
            height: '100vh',
            latitude: 41.312731,
            longitude: -6.484775,
            zoom: 1.5
        },
        entries: [],
        allData: [],
        sizeOfMarker: {
            width: 30,
            height: 30,
        },
        popup: {}
    }
    componentDidMount = async () => {
        // const logEntries = await getAllLogEntries()
        const entries = await this.props.fetchWorldMapLocations()
        this.setState({ entries: entries.data, allData: entries.data })
        this.fetchCountryRelatedData()
    }
    fetchCountryRelatedData = (below) => {
        const { entries } = this.state
        const countryData = []
        entries.forEach(element => {
            const index = countryData.findIndex(item => item.country === element.country)
            if (index === -1) {
                countryData.push(element)
            }else{
                countryData[index].infected = countryData[index].infected + element.infected
                countryData[index].recovered = countryData[index].recovered + element.recovered
                countryData[index].dead = countryData[index].dead + element.dead
            }
        });
        this.setState({entries: countryData, sizeOfMarker: { 
            width: 50,
            height: 50
        }})
    }
    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render() {
        const { viewport, entries, allData, sizeOfMarker, popup } = this.state
        return (
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/ramandsb/ckel1ezoc0w4d19o1hhp0frq2"
                mapboxApiAccessToken={"pk.eyJ1IjoicmFtYW5kc2IiLCJhIjoiY2tlYXhjdWltMDJuZDMwcW52Mmdya290OCJ9.G1xvvIWABtW-1xV7k6A0Sg"}
                onViewportChange={nextViewport => {
                    if(nextViewport.zoom < 2.5){
                        this.fetchCountryRelatedData()
                    }else{
                        this.setState({entries: allData, sizeOfMarker: { 
                            width: 30,
                            height: 30
                        }})
                    }
                    this.setState({ viewport: nextViewport })
                }}>
                {
                    entries.map((item) => {
                        return (
                            <>
                            <Marker latitude={item.latitude} longitude={item.longitude} offsetLeft={-20} offsetTop={-10}>
                                <div className="marker" onClick={()=> this.setState({popup: {
                                    showPopUp: true,
                                    itemId: item.id
                                }})}
                                    style={{
                                    ...sizeOfMarker
                                }} />
                            </Marker>
                            {popup && popup["itemId"] === item.id ? <Popup 
                                latitude={item.latitude} 
                                longitude={item.longitude}
                                closeButton={true}
                                closeOnClick={true}
                                onClose={()=> this.setState({popup: false})}
                                anchor="bottom"
                            >
                                <div className="wrapper">
                                    <p className="countryHead">{item.name}</p>
                                    <div className="row">
                                        <p className="country">{`${this.numberWithCommas(item.infected)}`}</p>
                                        <p>{`:`}</p>
                                        <p>{`Total Cases`}</p>
                                    </div>
                                    <div className="row">
                                        <p className="country">{`${this.numberWithCommas(item.recovered)}`}</p>
                                        <p>{`:`}</p>
                                        <p>{`Recoveries`}</p>
                                    </div>
                                    <div className="row">
                                        <p className="country">{`${this.numberWithCommas(item.dead)}`}</p>
                                        <p>{`:`}</p>
                                        <p>{`Deaths`}</p>
                                    </div>
                                </div>
                            </Popup> : null}
                            </>
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
    fetchWorldMapLocations: () => dispatch(fetchWorldMapLocations()),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CovidTracker)