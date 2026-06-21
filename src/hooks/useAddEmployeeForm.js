import { useState } from "react";
import { useForm } from "react-hook-form";
import { addMockEmployee } from "../data/mockData";

const EMPTY_PERMISSIONS = [];

/**
 * useAddEmployeeForm
 * بيدير فورم إضافة موظف جديد: الحقول، رفع الملفات، الصلاحيات، والإرسال.
 */
export function useAddEmployeeForm(onSuccess) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [idImage, setIdImage]       = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  const [permissions, setPermissions] = useState(EMPTY_PERMISSIONS);
  const [loading, setLoading]       = useState(false);

  const togglePermission = (perm) => {
    setPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const resetForm = () => {
    reset();
    setIdImage(null);
    setAvatarImage(null);
    setPermissions(EMPTY_PERMISSIONS);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 900));

      const newEmployee = addMockEmployee({
        name:       `${data.firstName} ${data.lastName}`.trim(),
        email:      data.email,
        phone:      data.mobile,
        nationalId: data.nationalId,
        age:        data.age,
        address:    data.address,
        hireDate:   data.hireDate,
        role:       data.jobTitle,
        idImage:    idImage?.name ?? null,
        avatarImage: avatarImage?.name ?? null,
        permissions,
      });

      onSuccess?.(newEmployee, data.email);
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    loading,
    idImage, setIdImage,
    avatarImage, setAvatarImage,
    permissions, togglePermission,
    resetForm,
  };
}

export default useAddEmployeeForm;
