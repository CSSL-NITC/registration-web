import isObject from "lodash/isObject";
import each from "lodash/each";
import keys from "lodash/keys";
import isNumber from "lodash/isNumber";
import { decrypt, encrypt } from "./encryption-utils";
import { STORAGE } from "../constants/common";

export const getStorageItem = (key: string, isObject: boolean = false) => {
    let row = localStorage.getItem(key);
    let item = null;
    if (row) {
      item = decrypt(row);
    }
  
    if (!item) {
      return null;
    }
  
    if (isObject) {
      return JSON.parse(item);
    }
  
    return item;
  };
  
  export const removeStorageItem = (key: string) => {
    localStorage.removeItem(key);
  };
  
  export const setStorageItem = (key: string, data: any) => {
    if (isObject(data)) {
      localStorage.setItem(key, encrypt(JSON.stringify(data)));
    } else {
      if (isNumber(data)) {
        data = data + "";
      }
      localStorage.setItem(key, encrypt(data));
    }
  };
  
  export const clearLocalStorage = () => {
    each(keys(STORAGE), (key: string) => {
      removeStorageItem(key);
    });
  };