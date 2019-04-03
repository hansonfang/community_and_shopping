const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  communityList: state => state.user.communityList
};

export default getters;
