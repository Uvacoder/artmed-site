export const state = () => ({
  searchTerm: '',
  typeAheadList: [],
  suggestions: [],
  isRequesting: false,
  loadMore: false,
  hasMoreToLoad: false,
  limit: 20,
  skip: 0,
  contents: []
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
  SET_HASMORETOLOAD (state, hasMoreToLoad) {
    state.hasMoreToLoad = hasMoreToLoad
  },
  SET_SKIP (state, skip) {
    state.skip = skip
  },
  SET_CONTENTS (state, contents) {
    state.contents = contents
  }
}

export const getters = {
  SEARCHTERM: state => state.searchTerm ? state.searchTerm : '',
  TYPEAHEADLIST: state => state.typeAheadList ? state.typeAheadList : [],
  SUGGESTIONS: state => state.suggestions ? state.suggestions : [],
  ISREQUESTING: state => state.isRequesting ? state.isRequesting : false,
  LOADMORE: state => state.loadMore ? state.loadMore : false,
  HASMORETOLOAD: state => state.hasMoreToLoad ? state.hasMoreToLoad : false,
  LIMIT: state => state.limit ? state.limit : 20,
  SKIP: state => state.skip ? state.skip : 0,
  CONTENTS: state => state.contents ? state.contents : []
}

export const actions = {
  async load ({ commit }) {
    await console.log(
      'Load',
      this,
      this.getters['search/SEARCHTERM'],
      this.getters['search/TYPEAHEADLIST'],
      this.getters['search/SUGGESTIONS'],
      this.getters['search/ISREQUESTING'],
      this.getters['search/LOADMORE'],
      this.getters['search/HASMORETOLOAD'],
      this.getters['search/LIMIT'],
      this.getters['search/SKIP'],
      this.getters['search/CONTENTS']
    )
  },

  async loadTypeAhead ({ commit }) {
    const searchTerm = this.getters['search/SEARCHTERM']
    if (searchTerm === null || searchTerm === undefined) { return }
    // var categoryFilter: String?
    // if let categories = filter?.selectedCategories, !categories.isEmpty {
    //   categoryFilter = (categories.map { $0.id }).joined(separator: ",")
    // }
    const endpoint = this.$api.EndPoints.searchTypeAhead
    endpoint.term = searchTerm
    // const params = { term: searchTerm, categories: categoryFilter }
    await this.$api.request(endpoint)
      .then((response) => {
        commit('SET_TYPEAHEADLIST', response.data)
      })
    // commit('SET_ISREQUESTING', false)
  },

  async loadSuggestion ({ commit }) {
    const searchTerm = this.getters['search/SEARCHTERM']
    if (searchTerm === null || searchTerm === undefined) { return }
    commit('SET_SUGGESTIONS', [])
    // var categoryFilter: String?
    // if let categories = filter?.selectedCategories, !categories.isEmpty {
    //   categoryFilter = (categories.map { $0.id }).joined(separator: ",")
    // }
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
