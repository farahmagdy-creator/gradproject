import { useForm } from "react-hook-form";

export const useReceiptForm = () => {
  return useForm({
    // Default form values
    defaultValues: {
      customer: {
        name: "",
        phone: "",
      },
      device: {
        type: "",
        color: "",
        issue: "",
      },
      cost: {
        initial: "",
        paid: "",
        remaining: 0,
      },
      technician: "",
      receiver: "",
      notes: "",
    },

    // Enable live validation
    mode: "onChange",
  });
};