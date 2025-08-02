import dataService from "@/lib/services/data-service";
import loginEndpoints from "@/lib/endpoints/login-endpoints";
import emailValidationEndpoints from './../endpoints/email-validation-endpoints';

export async function onLogin(loginReq: any) {
  const response = await dataService.post(loginEndpoints.login, loginReq);
  return response;
}

export async function onForgotPassword(req: any) {
  const response = await dataService.post(emailValidationEndpoints.sendCode, req);
  return response;
}

export async function onResetPassword(loginReq: any) {
  const response = await dataService.patch(loginEndpoints.resetPassword, loginReq);
  return response;
}

export async function expireUserCache() {
  await dataService.post(loginEndpoints.expireUseCache);
}

export async function getApplicationProperties() {
  return await dataService.get(loginEndpoints.getApplicationProperties);
}

