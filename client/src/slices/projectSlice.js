/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInput: {
        projectname: "",
        projectDescription: "",
        language: ""
    },

    projects: [],

    viewProject: "ID 12345",
    serverURL: import.meta.env.VITE_SERVER_URL,
    // serverURL: "http://localhost:3000"



};


const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        addProject: (state, action) => {
            // Directly update state.userInput
            state.userInput.projectname = action.payload.projectname;
            state.userInput.projectDescription = action.payload.projectDescription;
            state.userInput.language = action.payload.language;
        },

        storeProjects: (state, action) => { state.projects = action.payload },

        addProjectToList: (state, action) => { state.projects.push(action.payload) },
        viewProject: (state, action) => {
            state.viewProject = action.payload
        },
        colorModeGlobal: (state, action) => {
            state.colorModeGlobal = action.payload
        }
    }
});

export const { addProject, viewProject, colorModeGlobal, addProjectToList, storeProjects } = projectSlice.actions;
export default projectSlice.reducer;
