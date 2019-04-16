const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  communityList: state => state.user.communityList,
  community: state => state.user.community
};

export default getters;
