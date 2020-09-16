import backendPendingSimulation from "@/utils/backendSimulation";

const state = {
  token: localStorage.getItem("token") || "",
  status: "" // shows the request status in a moment: if user waiting for backend response - pending, got it correctly - success, an exception arrived - error
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};

const actions = {
  // Method for user login where we send user credentials to backend
  // and waiting for response with token or error
  async auth_login({ commit }, user) {
    try {
      commit('auth_pending')
      const token = await backendPendingSimulation(user.email, user.password) // here should be fetch or axios to a backend. Also we could set here some user data to other state modules, eg "user" 
      localStorage.setItem('token', token) // here we use localStorage, but for better security we could use httpOnly Cookies given by server for example and handle auth problems on backend. Depends on project.
      commit('auth_success', token)
    } catch (error) {
      // processing backend errors with different status codes
      if (error.status_code === "wrong_login") {
        localStorage.removeItem('token')
        commit('auth_error')
        return Promise.reject("Wrong email")
      } else if (error.status_code === "wrong_password") {
        localStorage.removeItem('token')
        commit('auth_error')
        return Promise.reject("Wrong password")
      }
    }
  },
  auth_logout({ commit }) {
    return new Promise(resolve => {
      setTimeout(() => {
        localStorage.removeItem("token");
        commit("auth_logout");
        resolve();
      }, 500)
    });
  }
}

const mutations = {
  auth_pending(state) {
    state.status = "pending";
  },
  auth_success(state, token) {
    state.status = "success";
    state.token = token;
  },
  auth_error(state) {
    state.status = "error";
  },
  auth_logout(state) {
    state.token = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}