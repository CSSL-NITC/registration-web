import * as _ from "lodash";

export type PrivilegeModule = "ADMIN" | "CLIENT" | "COMMON";

export type PrivilegeMap = {
  [key in string]: Privilege[];
};

export type Privilege = {
  privilegeID: number;
  privilegeCode: string;
  privilegeName: string;
  description: string;
  privilegeCategory: string;
  status: Status;
};

export type Status = "ACT" | "INA";

export const trim = (formValues: any): any => {
  _.keys(formValues).forEach((key: string) => {
    if (_.isString(formValues[key])) {
      formValues[key] = formValues[key].trim();
    }
  });
  return formValues;
};

export const matchPath = (routes: string[], matchingPath: string) => {
  if (!matchingPath) {
    return false;
  }
  if (!routes || routes.length === 0) {
    return false;
  }
  return !!routes.find((path) => path === matchingPath);
};

class EventEmitter<T = any> {
  private events: Record<string, Set<(...args: T[]) => void>> = {};

  private getEventListByName(eventName: string): Set<(...args: T[]) => void> {
    if (!this.events[eventName]) {
      this.events[eventName] = new Set();
    }
    return this.events[eventName];
  }

  on(eventName: string, fn: (...args: T[]) => void): void {
    this.getEventListByName(eventName).add(fn);
  }

  once(eventName: string, fn: (...args: T[]) => void): void {
    const self = this;

    const onceFn = (...args: T[]): void => {
      self.removeListener(eventName, onceFn);
      fn.apply(self, args);
    };
    this.on(eventName, onceFn);
  }

  emit(eventName: string, ...args: T[]): void {
    this.getEventListByName(eventName).forEach((fn: (...args: T[]) => void) => {
      fn.apply(this, args);
    });
  }

  removeListener(eventName: string, fn: (...args: T[]) => void): void {
    this.getEventListByName(eventName).delete(fn);
  }
}

class AppUtil {
  static EventEmitter = EventEmitter;

  static hasPrivilege(privilege: string, allPrivileges: string[]) {
    return _.indexOf(allPrivileges, privilege.trim()) !== -1;
  }

  static hasAnyPrivilege(privileges: string[], allPrivileges: string[]) {
    let hasPrivilege = false;

    for (const privilege of privileges) {
      if (this.hasPrivilege(privilege, allPrivileges)) {
        hasPrivilege = true;
        break;
      }
    }

    return hasPrivilege;
  }

  static filterPrivilegeByModule(
    modules: PrivilegeModule[],
    categoryWisePrivileges: any,
  ) {
    const filtered: PrivilegeMap = {};

    _.keys(categoryWisePrivileges).forEach((category) => {
      modules.forEach((reqModule) => {
        const filteredPrivileges = -_.filter(
          categoryWisePrivileges[category],
          (privilege: any) => privilege.privilegeModule == reqModule,
        );
        if (filteredPrivileges.length > 0) {
          if (!filtered[category]) {
            filtered[category] = [];
          }
          filtered[category] = [...filtered[category], ...filteredPrivileges];
        }
      });
    });
    return filtered;
  }

}

export default AppUtil;