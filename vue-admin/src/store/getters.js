const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  noImg: state => state.app.noImage,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  communityID: state => state.user.communityID
};
export default getters;
