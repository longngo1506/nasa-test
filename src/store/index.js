import Vue from "vue";
import Vuex from "vuex";
import { services } from "../services";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    listData: [],
  },
  getters: {
    numberPage: (state) => {
      return ~~(state.listData.length / 5) || 1;
    },

    linkedList: (_, { remainedList }) =>
      remainedList.filter((item) => item.liked),

    removedList: ({ listData }) => listData.filter((item) => item.deleted),
    remainedList: (state, getters) => {
      return state.listData.filter(
        (item) =>
          !~getters.removedList.findIndex(
            (rmItem) => rmItem["nasa_id"] === item["nasa_id"]
          )
      );
    },
  },
  mutations: {
    setListData(state, data) {
      state.listData = data;
    },
    setLoading(state, status) {
      state.isLoading = status;
    },
  },
  actions: {
    setListData({ commit, dispatch }, data) {
      commit("setListData", data);
      dispatch("storeDataToLocal", data);
    },

    setLoading({ commit }, status) {
      commit("setLoading", status);
    },

    updateListData({ dispatch, state }, itemMutate) {
      const updatedListData = state.listData.map((item) =>
        itemMutate["nasa_id"] === item["nasa_id"] ? itemMutate : item
      );

      dispatch("setListData", updatedListData);
    },

    syncDataToStore({ commit }) {
      const data = localStorage.getItem("listData");

      if (data) {
        commit("setListData", JSON.parse(data));
      }
    },

    storeDataToLocal(_, data) {
      localStorage.setItem("listData", JSON.stringify(data));
    },

    clearDataHistory({ dispatch }) {
      dispatch("setListData", []);
      localStorage.clear();
    },

    async searchData({ dispatch }, params) {
      try {
        dispatch("setLoading", true);
        const {
          status,
          data: {
            collection: { items },
          },
        } = await services.get("/search", {
          params,
        });

        if (status !== 200) throw new Error();

        if (!items[0]) {
          dispatch("clearDataHistory");
          return;
        }

        // const totalRecords = item
        const formatItem = items.map((item) => ({
          ...item["data"][0],
          image: item["links"]
            ? item["links"][0]["href"]
            : "https://www.danasport.it/media/HOME/image.png",
        }));

        dispatch("setListData", formatItem);
      } catch (error) {
        console.log(error);
        dispatch("clearDataHistory");
      } finally {
        dispatch("setLoading", false);
      }
    },
  },
});
