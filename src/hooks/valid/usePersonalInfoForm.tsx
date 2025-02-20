import { useState, useEffect } from "react";
import type { PersonalInfoStepType } from "@/types/apply";
import { validateEmail, validatePhoneNumber } from "@/utils/valid";
import { formatPhoneNumber } from "@/utils/format";

interface UsePersonalInfoFormProps {
  initialData: PersonalInfoStepType;
  onSubmit: (data: PersonalInfoStepType) => void;
  onValidityChange: (isValid: boolean) => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

interface TouchedFields {
  name: boolean;
  email: boolean;
  phone: boolean;
}

/**
 * 개인정보 입력 폼 유효성 검사 훅
 * @param initialData 초기 데이터
 * @param onSubmit 제출 함수
 * @param onValidityChange 유효성 변경 함수
 * @returns 폼 데이터, 에러, 터치 상태, 변경 함수, 제출 함수
 */

export const usePersonalInfoForm = ({
  initialData,
  onSubmit,
  onValidityChange,
}: UsePersonalInfoFormProps) => {
  const [formData, setFormData] = useState<PersonalInfoStepType>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    email: false,
    phone: false,
  });

  const validationRules = {
    name: (value: string) => (!value.trim() ? "이름을 입력해주세요" : ""),
    email: (value: string) => {
      if (!value.trim()) return "이메일을 입력해주세요";
      if (!validateEmail(value)) return "올바른 이메일 형식이 아닙니다";
      return "";
    },
    phone: (value: string) => {
      if (!value.trim()) return "전화번호를 입력해주세요";
      if (!validatePhoneNumber(value))
        return "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)";
      return "";
    },
  };

  const validateField = (name: keyof PersonalInfoStepType, value: string) => {
    if (!touched[name]) return;

    const error = validationRules[name](value);
    setErrors((prev) => ({
      ...prev,
      [name]: error || undefined,
    }));
  };

  const validateForm = (data: PersonalInfoStepType) => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((field) => {
      const error = validationRules[field as keyof typeof validationRules](
        data[field as keyof PersonalInfoStepType] || "",
      );
      if (error) {
        newErrors[field as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === "phone" ? formatPhoneNumber(value) : value;

    setTouched((prev) => ({ ...prev, [name]: true }));

    const newFormData = {
      ...formData,
      [name]: newValue,
    };
    setFormData(newFormData);
    validateField(name as keyof PersonalInfoStepType, newValue);

    const allFieldsTouched = Object.values({
      ...touched,
      [name]: true,
    }).every((value) => value);

    if (allFieldsTouched) {
      const isValid = validateForm(newFormData);
      if (isValid) {
        onSubmit(newFormData);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
    });

    const isValid = validateForm(formData);
    if (isValid) {
      onSubmit(formData);
    }
  };

  useEffect(() => {
    const allFieldsTouched = Object.values(touched).every((value) => value);
    const isFormValid = Boolean(
      allFieldsTouched &&
        formData.name?.trim() &&
        formData.email?.trim() &&
        formData.phone?.trim() &&
        validateEmail(formData.email) &&
        validatePhoneNumber(formData.phone) &&
        Object.keys(errors).length === 0,
    );
    onValidityChange(isFormValid);
  }, [formData, errors, touched, onValidityChange]);

  useEffect(() => {
    if (initialData.name && initialData.email && initialData.phone) {
      setTouched({
        name: true,
        email: true,
        phone: true,
      });
      validateForm(initialData);
    }
  }, []);

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleSubmit,
  };
};
