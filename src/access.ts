/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
//用户权限管理  管理员或vip都可在该里面配置
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.userRole === 1,
  };
}
