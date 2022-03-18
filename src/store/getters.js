/*
 * @Author: H.
 * @Date: 2021-10-29 08:37:23
 * @LastEditTime: 2021-12-09 16:50:23
 * @Description:
 */
const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  userId: (state) => state.user.userId,
  introduction: (state) => state.user.introduction,
  roles: (state) => state.user.roles,
  permission_routes: (state) => state.permission.routes,
  errorLogs: (state) => state.errorLog.logs,
  current: (state) => state.page.current,
};
export default getters;
