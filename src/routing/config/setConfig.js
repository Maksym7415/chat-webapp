export default (routerConfig) => {
  const userRoles = ['admin'];
  const config = routerConfig.filter((el) => el.security === true);
  let newConfig = [...config];
  let children = [];
  let childrenPath = [];
  newConfig[0].children.map((route) => route.roles.map((roles) => {
    userRoles.map((userRole) => {
      if (userRole === roles) {
        children = [...children, route];
        childrenPath = [...childrenPath, route.path];
      }
    });
  }));

  return [{ ...newConfig[0], children, childrenPath }];
};
