import React, {createContext, useReducer} from 'react';
import {THEME} from "../constants";



export const defaultValue = {

    book: {

    },
    chapter: [],
    // 主题色
    theme: localStorage.getItem(THEME) ? localStorage.getItem(THEME) : 'violet',
    breadcrumb: [],
    title: '主页',
};

export const GlobalStore = createContext(defaultValue);

const reducer = (state, action) => {

    switch(action.type) {

        case 'theme':
            return {...state, theme: action.payload};
        case 'book':
            return {...state, book: action.payload};
        case 'chapter':
            return {...state, chapter: action.payload};
        case 'title':
            return {...state, title: action.payload};
        default:
            return {...state, ...action.payload}
    }
}


const GlobalStoreProvider = props => {
    const [store, dispatch] = useReducer(reducer, defaultValue);
    return (
        <GlobalStore.Provider value={{...store, dispatch}}>
            {props.children}
        </GlobalStore.Provider>
    );
};
export default GlobalStoreProvider;
