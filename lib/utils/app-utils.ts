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
  privilegeModule?: PrivilegeModule; // Added missing type
  status: Status;
};

export type Status = "ACT" | "INA";

// Fixed trim function - now properly handles immutability
export const trim = <T extends Record<string, any>>(formValues: T): T => {
  if (!formValues) return formValues;
  
  // Create a new object to store trimmed values
  const result: Record<string, any> = Array.isArray(formValues) ? [...formValues] : { ...formValues };
  
  Object.keys(result).forEach((key: string) => {
    if (typeof result[key] === 'string') {
      result[key] = result[key].trim();
    }
  });
  
  return result as T;
};

export const matchPath = (routes: string[], matchingPath: string): boolean => {
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

  static hasPrivilege(privilege: string, allPrivileges: string[]): boolean {
    return _.indexOf(allPrivileges, privilege.trim()) !== -1;
  }

  static hasAnyPrivilege(privileges: string[], allPrivileges: string[]): boolean {
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
    categoryWisePrivileges: Record<string, Privilege[]>
  ): PrivilegeMap {
    const filtered: PrivilegeMap = {};

    _.keys(categoryWisePrivileges).forEach((category) => {
      modules.forEach((reqModule) => {
        const filteredPrivileges = _.filter(
          categoryWisePrivileges[category],
          (privilege: Privilege) => privilege.privilegeModule === reqModule
        );
        if (filteredPrivileges && filteredPrivileges.length > 0) {
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