import * as actionTypes from '../actions/actionTypes/emeraldAccountTypes'
import {Dispatch} from 'redux';

export const getEmeraldAccount = (): Promise<number> =>((dispatch: Dispatch) =>{
    console.log(dispatch)
    return fetch(`http://localhost:4000/emeraldAccount`)
        .then(res =>res.json())
        .then((emeraldAccount: number)=>{
            dispatch({
                type: actionTypes.GET_EMERALD_ACCOUNT,
                emeraldAccount
            })
        })
}) as any;

