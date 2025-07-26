import dataService from "@/lib/services/data-service";
import loginEndpoints from "@/lib/endpoints/login-endpoints";

export async function onLogin(loginReq: any) {
  const response = await dataService.post(loginEndpoints.login, loginReq);
  return response;
}

export async function expireUserCache() {
  await dataService.post(loginEndpoints.expireUseCache);
}

export async function getApplicationProperties() {
  return await dataService.get(loginEndpoints.getApplicationProperties);
}

export async function onResetPasswordFromEmail(PasswordUpdateDTO: any) {
  const response = await dataService.post(
    loginEndpoints.resetPasswordFromEmail,
    PasswordUpdateDTO,
  );
  return response;
}

export async function onConfirmPassword(UserValidateRQ: any) {
  const response = await dataService.post(
    loginEndpoints.onConfirmPassword,
    UserValidateRQ,
  );
  return response;
}
