import * as types from './actionTypes'
import data from "../data/places.json"

const updateTestState = ({ initState }) => ({
    type: types.CHANGE_STATE,
    data: { initState }
})

export function fetchDataToChangeState(data) {
    console.log('Test', data)
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                //any api calls
                dispatch(updateTestState({ initState: data }))
                resolve()
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
    }
}
export function fetchWorldMapLocations() {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(data)
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
    }
}