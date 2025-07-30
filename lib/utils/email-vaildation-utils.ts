import { checkVerified, sendCode } from "../api/email-validation-api";

export const isAlreadyUsed = async (email: string, callback: () => void) => {
  try {
    const response = await checkVerified(email);
    
    await sendCode({
      email,
    });

    callback()
  } catch (error) {
    //toastService.showErrorMessage("Email Validation failed");
  }
};
