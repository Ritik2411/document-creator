import { USER } from "./Actiontype"

const initialstate = {
    user:[]
}

export const userReducer = (state=initialstate,action) => {
    switch(action.type){
        case USER:return{
            user:action.payload
        }

        default:{
            return state
        }
    }
}