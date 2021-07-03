export const state = () => ({
  searchTerm: '',
  typeAheadList: [],
  suggestions: [],
  contents: [],
  start: 0,
  limit: 20,
  isRequesting: false,
  selectedCategories: []
})

export const mutations = {
  SET_SEARCHTERM (state, searchTerm) {
    state.searchTerm = searchTerm
  },
  SET_TYPEAHEADLIST (state, typeAheadList) {
    state.typeAheadList = typeAheadList
  },
  SET_SUGGESTIONS (state, suggestions) {
    state.suggestions = suggestions
  },
  SET_ISREQUESTING (state, isRequesting) {
    state.isRequesting = isRequesting
  },
  SET_START (state, start) {
    state.start += start
  },
  SET_CONTENTS (state, contents) {
    state.contents = [...state.contents, ...contents]
  },
  SET_SELECTEDCATEGORIES (state, selectedCategories) {
    state.selectedCategories = selectedCategories
  },
  CLEAR_CONTENTS (state) {
    state.contents = []
  },
  CLEAR_START (state) {
    state.start = 0
  },
  CLEAR_TYPEAHEADLIST (state) {
    state.typeAheadList = []
  },
  CLEAR_SUGGESTIONS (state) {
    state.suggestions = []
  }
}

export const actions = {
  load ({ commit, state }, { searchTerm, loadMore }) {
    return new Promise((resolve, reject) => {
      commit('CLEAR_TYPEAHEADLIST')
      commit('CLEAR_SUGGESTIONS')
      commit('SET_SEARCHTERM', searchTerm)
      if (state.isRequesting) { return }
      commit('SET_ISREQUESTING', true)
      if (!loadMore) {
        commit('CLEAR_CONTENTS')
        commit('CLEAR_START')
      }
      const endpoint = this.$api.EndPoints.search
      const params = {
        version: 8,
        search: searchTerm,
        limit: state.limit,
        start: state.start
      }

      if (state.selectedCategories.length > 0) {
        if (!loadMore) {
          commit('CLEAR_CONTENTS')
          commit('CLEAR_START')
        }
        const categories = state.selectedCategories.join(',')
        params.category = categories
      }
      // if let specialties = filter?.selectedSpecialties, !specialties.isEmpty {
      //     params.specialties = (specialties.map { $0.id }).joined(separator: ",")
      // }
      this.$api.request(endpoint, params)
        .then((response) => {
          const data = response.data
          commit('SET_CONTENTS', data)
          commit('SET_START', data.length)
          commit('SET_ISREQUESTING', false)
          resolve(data)
        })
        .catch((error) => {
          commit('SET_ISREQUESTING', false)
          reject(error)
        })
    })
  },

  async loadTypeAhead ({ commit }, searchTerm) {
    if (searchTerm === null || searchTerm === undefined) { return }
    const endpoint = this.$api.EndPoints.searchTypeAhead
    endpoint.term = searchTerm
    await this.$api.request(endpoint)
      .then((response) => {
        commit('SET_TYPEAHEADLIST', response.data)
      })
  },

  async loadSuggestion ({ commit }) {
    const searchTerm = this.getters['search/SEARCHTERM']
    if (searchTerm === null || searchTerm === undefined) { return }
    commit('SET_SUGGESTIONS', [])
    const endpoint = this.$api.EndPoints.searchSuggestion
    endpoint.term = searchTerm
    // const params = { term: searchTerm, categories: categoryFilter }
    await this.$api.request(endpoint)
      .then((response) => {
        commit('SET_SUGGESTIONS', response.data)
      })
    // commit('SET_ISREQUESTING', false)
  }
}

// private var searchParams {
//   var params: JSON = ["version" : 8, "search": searchTerm, "limit": limit, "start": skip]
//   if let categories = filter?.selectedCategories, !categories.isEmpty {
//       params["category"] = (categories.map { $0.id }).joined(separator: ",")
//   }
//   if let specialties = filter?.selectedSpecialties, !specialties.isEmpty {
//       params["specialty"] = (specialties.map { $0.id }).joined(separator: ",")
//   }
//   return params
// }
