import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const initialState = {
    misc: {
        initialStartup: true,
        darkTheme: false
    },
    info: {
        nickname: "",
        email: "",
        password: "",
        userLink: ""
    },
    data: {
        markedNotes: {},
        bookmarkedNotes: [],
        sharedNotes: [],
        notes: []
    },
}

const accountSlice = createSlice({

    name: 'account',
    initialState,
    reducers: {

        setAccountInfo(state, action) {
            state.info = action.payload
        },

        setData(state, action) {
            state.data = action.payload
        },

        setInitialStartup(state, action) {
            state.misc.initialStartup = action.payload
        },

        setDarkTheme(state, action) {
            state.misc.darkTheme = action.payload
        }
    },
})

export const selectAccount = (state) => state.account
export const { setAccountInfo, setData, setDarkTheme } = accountSlice.actions
export default accountSlice.reducer
