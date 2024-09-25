import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    user: null,
    isLoggedIn: false,
    points: 0,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setPoints(state, points) { // Mutation mới
      state.points = points;
    },
  },
  actions: {
    async fetchUser({ commit }) {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        commit('setLoggedIn', true);
        try {
          const response = await axios.get("http://localhost:8181/api/v1/users/me", {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });

          if (response && response.data && response.data.result) {
            const pointsResponse = await axios.get("http://localhost:8181/api/v1/users/points", {
              headers: {
                'Authorization': `Bearer ${accessToken}`
              },
              params: {
                idUser: response.data.result.id // Giả sử có id trong user
              }
            });
            if (pointsResponse && pointsResponse.data && pointsResponse.data.result) {
              commit('setPoints', pointsResponse.data.result.points);
            }
            commit('setUser', response.data.result);
          } else {
            commit('setUser', null);
          }
        } catch (error) {
          commit('setUser', null);
          commit('setLoggedIn', false);
        }
      } else {
        commit('setLoggedIn', false);
        commit('setUser', null);
      }
    },
  },
  getters: {
    user: state => state.user,
    isLoggedIn: state => state.isLoggedIn,
    points: state => state.points, // Getter cho points
  },
});

export default store;