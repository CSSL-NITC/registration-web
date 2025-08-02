import { ExternalToast, toast } from "sonner";

class ToastService {
  private defaultSettings: ExternalToast = {
    // position: "top-right",
  };
  showDefaultMessage = (message: string) => {
    toast(message, {
      ...this.defaultSettings,
    });
  };

  showSuccessMessage = (message: string) => {
    toast.success(message, {
      ...this.defaultSettings,
    });
  };

  showWarnMessage = (message: string) => {
    toast.warning(message, {
      ...this.defaultSettings,
    });
  };

  showErrorMessage = (message: string) => {
    toast.error(message, {
      ...this.defaultSettings,
    });
  };
}

const toastService = new ToastService();

export default toastService;
