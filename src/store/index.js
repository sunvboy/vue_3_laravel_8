import { createStore } from 'vuex'
import axiosInstance from '../axios';
import { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } from '../constants'
// Create a new store instance.
const store = createStore({
    state: {
        isLoading: false,
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },
        dashboard: {},
        surveys: {
            links: [],
            data: []
        },
        questionTypes: ["text", "textarea", "select", "radio", "checkbox"],
        detailSurvey: {},
        notification: {
            show: false,
            type: 'success',
            message: ''
        }
    },
    getters: {},
    actions: {
        async register({ commit }, user) {
            commit('SHOWLOADING', true, { root: true })
            try {
                var result = await axiosInstance.post('/auth/register', user);
                commit('SHOWLOADING', false, { root: true })
                if (result.data.status === 'success') {
                    let objUser = {
                        user: result.data.user,
                        token: result.data.token,
                    }
                    commit('setUser', objUser);
                    return {
                        status: true,
                        error: null,
                        data: result.data
                    }
                }
                return {
                    status: false,
                    error: result.data.errors
                }
            } catch (error) {
                commit('SHOWLOADING', false, { root: true })
                return {
                    status: false,
                    error: error.response.data.message,
                }
            }
        },
        async login({ commit }, user) {
            commit('SHOWLOADING', true, { root: true })
            try {
                var result = await axiosInstance.post('/auth/login', user);
                commit('SHOWLOADING', false, { root: true })
                if (result.data.status === 'success') {
                    let objUser = {
                        user: result.data.user,
                        token: result.data.token,
                    }
                    commit('setUser', objUser);
                    return {
                        status: true,
                        data: result.data
                    }
                }
                return {
                    status: false,
                    error: result.data.errors
                }
            } catch (error) {
                commit('SHOWLOADING', false, { root: true })
                return {
                    status: false,
                    error: error.response.data.message,
                }
            }
        },
        async logout({ commit }) {
            try {
                let config = {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('TOKEN')
                    }
                }
                var result = await axiosInstance.delete('/auth/logout', config);
                if (result.data.status === 'success') {
                    commit('setLogout');
                    return {
                        status: true,
                        error: null,
                        data: result.data
                    }
                }
                return {
                    status: false,
                    error: result.data.message
                }
            } catch (error) {
                return {
                    status: false,
                    error: error.message
                }
            }
        },
        //getListSurveys
        async getSurveys({ commit }, { url = null } = {}) {
            commit('SHOWLOADING', true, { root: true })
            try {
                let config = {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('TOKEN')
                    }
                }
                url = url || '/auth/survey';
                console.log(url);
                var result = await axiosInstance.get(url, config);
                if (result.status === 200) {
                    commit('setSurveys', result.data);
                    commit('SHOWLOADING', false, { root: true })
                    return {
                        status: true,
                        data: result.data
                    }
                }
            } catch (error) {
                commit('SHOWLOADING', false, { root: true })
                return {
                    status: false,
                    error: error.message
                }
            }
        },
        //getDetailSurvey
        async getDetailSurvey({ commit }, id) {
            commit('SHOWLOADING', true, { root: true })
            try {
                let config = {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('TOKEN')
                    }
                }
                var result = await axiosInstance.get(`/auth/survey/${id}`, config);
                if (result.status === 200) {
                    commit('setDetailSurvey', result.data);
                    commit('SHOWLOADING', false, { root: true })
                    return {
                        status: true,
                        data: result.data
                    }
                }
            } catch (error) {
                commit('SHOWLOADING', false, { root: true })
                return {
                    status: false,
                    error: error.message
                }
            }
        },
        // saveSurvey
        async saveSurvey({ commit }, survey) {
            try {
                delete survey.image_url;
                let config = {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('TOKEN')
                    }
                }
                if (survey.id) {
                    var result = await axiosInstance.put(`/auth/survey/${survey.id}`, survey, config);
                    commit('notify', { type: 'success', message: UPDATE_SUCCESS });
                } else {
                    var result = await axiosInstance.post('/auth/survey', survey, config);
                    commit('notify', { type: 'success', message: CREATE_SUCCESS });
                }
                return {
                    status: true,
                    data: result.data
                }
            } catch (error) {
                return {
                    status: false,
                    error: error.response.data.errors,
                }
            }
        },
        //deleteSurvey
        async deleteSurvey({ commit, dispatch }, id) {
            console.log(id);
            commit('SHOWLOADING', true, { root: true })
            try {
                let config = {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('TOKEN')
                    }
                }
                var result = await axiosInstance.delete(`/auth/survey/${id}`, config);
                if (result.status === 200) {
                    dispatch('getSurveys')
                    commit('notify', { type: 'success', message: DELETE_SUCCESS });
                    commit('SHOWLOADING', false, { root: true })
                    return {
                        status: true,
                    }
                }
            } catch (error) {
                commit('SHOWLOADING', false, { root: true })
                return {
                    status: false,
                    error: error.response.data.errors,
                }
            }
        },
        //getDetailSurveySlug
        async getDetailSurveySlug({ commit }, slug) {
            commit('SHOWLOADING', true, { root: true })
            try {
                var result = await axiosInstance.get(`/survey-by-slug/${slug}`);
                if (result.status === 200) {
                    commit('setDetailSurvey', result.data);
                    commit('SHOWLOADING', false, { root: true })
                    return {
                        status: true,
                        data: result.data
                    }
                }
            } catch (error) {
                commit('SHOWLOADING', false, { root: true })
                return {
                    status: false,
                    error: error.message
                }
            }
        },
        //saveSurveyAnswer
        async saveSurveyAnswer({ commit }, { surveyId, answers }) {
            commit('SHOWLOADING', true, { root: true })
            try {
                var result = await axiosInstance.post(`/survey-by-slug/${surveyId}/answer`, { answers });
                commit('SHOWLOADING', false, { root: true })
                if (result.status === 200) {
                    return {
                        status: true,
                        data: result.data
                    }
                }
            } catch (error) {
                commit('SHOWLOADING', false, { root: true })
                return {
                    status: false,
                    error: error.message
                }
            }
        },
        //dashboard
        async getDataDashboard({ commit }) {
            commit('SHOWLOADING', true, { root: true })
            try {
                let config = {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('TOKEN')
                    }
                }
                var result = await axiosInstance.get(`/auth/dashboard`, config);
                if (result.status === 200) {
                    commit('setDataDashboard', result.data)
                    commit('SHOWLOADING', false, { root: true })
                    return {
                        status: true,
                    }
                }
            } catch (error) {
                commit('SHOWLOADING', false, { root: true })
                return {
                    status: false,
                }
            }
        },
    },
    mutations: {
        //logout: function
        setLogout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem('TOKEN');
        },
        setUser: (state, user) => {
            state.user.data = user.user;
            state.user.token = user.token;
            sessionStorage.setItem('TOKEN', user.token);
        },
        setDetailSurvey: (state, survey) => {
            state.detailSurvey = survey.data;
        },
        setSurveys: (state, surveys) => {
            state.surveys.data = surveys.data;
            state.surveys.links = surveys.meta.links;
        },
        //loading: function
        SHOWLOADING(state, isLoading) {
            state.isLoading = isLoading;
        },
        //notify: function
        notify: (state, { message, type }) => {
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;
            setTimeout(() => {
                state.notification.show = false;
            }, 3000)
        },
        //setDataDashboard: function
        setDataDashboard: (state, data) => {
            state.dashboard = data;
        },
    },
    modules: {},
})
export default store
