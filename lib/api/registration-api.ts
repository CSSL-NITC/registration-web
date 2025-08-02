import dataService from "@/lib/services/data-service";
import registerEndpoints from './../endpoints/registration-endpoints';

export async function onRegistrationInit(registerRQ: any) {
  return dataService.post(registerEndpoints.init, registerRQ);
}

export async function onRegistrationComplete(registerRQ: any) {
  const response = await dataService.post(registerEndpoints.complete, registerRQ);
  return response;
}

export async function onCompanyRegistration(registerRQ: any) {
  return dataService.post(registerEndpoints.company, registerRQ);
}

export async function onMembershipValidation(registerRQ: any) {
  return dataService.post(registerEndpoints.membershipValidation, registerRQ);
}
