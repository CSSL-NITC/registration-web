import { toast } from "sonner";

class ToastService {
  showDefaultMessage = (message: string) => {
    toast(message);
  };

  showSuccessMessage = (message: string) => {
    toast.success(message);
  };

  showWarnMessage = (message: string) => {
    toast.warning(message);
  };

  showErrorMessage = (message: string) => {
    toast.error(message);
  };
}

const toastService = new ToastService();

export default toastService;
