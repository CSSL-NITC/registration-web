import AppUtil from "../utils/app-utils";

class CustomRouterService extends AppUtil.EventEmitter {
  navigateToPage = (pageInfo = {}) => {
    this.emit("onNavigation", pageInfo);
  };
}

const routerService = new CustomRouterService();

export default routerService;
