import { checkVerified, sendCode } from "../api/email-validation-api";
import toastService from "@/lib/services/toast-service";
import { AxiosError } from "axios";

interface ErrorResponse {
  errors?: string[];
  message?: string;
  errorCode?: string;
}

export const isAlreadyUsed = async (email: string, callback: () => void) => {
  try {
    const response = await checkVerified(email);
    await sendCode({ email });
    callback();
  } catch (error: unknown) {
    let errorMessage = "Email validation failed";
    
    if (error instanceof AxiosError) {
      const responseData = error.response?.data as ErrorResponse;
      
      switch (error.response?.status) {
        case 409: // CONFLICT
          errorMessage = "This email is already registered";
          break;
        case 400: // BAD REQUEST
          errorMessage = responseData.errors?.[0] || "Invalid email format";
          break;
        case 500: // INTERNAL SERVER ERROR
          errorMessage = "Server error occurred. Please try again later";
          break;
        default:
          errorMessage = responseData.message || error.message || "Request failed";
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    toastService.showErrorMessage(errorMessage);
  }
};