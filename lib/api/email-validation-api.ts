import dataService from "@/lib/services/data-service";
import emailValidationEndpoints from "../endpoints/email-validation-endpoints";

export async function sendCode(registerRQ: any) {
  const response = await dataService.post(
    emailValidationEndpoints.sendCode,
    registerRQ
  );

  return response;
}

export async function onVerifyCode(registerRQ: any) {
  const response = await dataService.post(
    emailValidationEndpoints.verifyCode,
    registerRQ
  );
  return response;
}

export async function checkVerified(email: string) {
  return dataService.get(
    emailValidationEndpoints.checkVerified,
    { email }
  );
}
