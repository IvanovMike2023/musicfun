
// Or from '@reduxjs/toolkit/query/react'
import {setupListeners} from '@reduxjs/toolkit/query'
import {playlistsApi} from "@/features/playlists/api/playlistsApi";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [playlistsApi.reducerPath]: playlistsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(playlistsApi.middleware),
})


setupListeners(store.dispatch)