// import { useEffect, useState } from "react";
// import { Input } from "@/components/common/Input";
// import { StepLayout } from "@/layouts/StepLayout";
// import type { PersonalInfoStepType } from "@/types/apply";
// import { formatPhoneNumber } from "@/utils/format";
// import { validateEmail, validatePhoneNumber } from "@/utils/valid";

// interface PersonalInfoStepProps {
//   initialData: PersonalInfoStepType;
//   onSubmit: (data: PersonalInfoStepType) => void;
//   onValidityChange: (isValid: boolean) => void;
// }

// interface FormErrors {
//   name?: string;
//   email?: string;
//   phone?: string;
// }

// interface TouchedFields {
//   name: boolean;
//   email: boolean;
//   phone: boolean;
// }

// export const PersonalInfoStep = ({
//   initialData,
//   onSubmit,
//   onValidityChange,
// }: PersonalInfoStepProps) => {
//   const [formData, setFormData] = useState<PersonalInfoStepType>(initialData);
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [touched, setTouched] = useState<TouchedFields>({
//     name: false,
//     email: false,
//     phone: false,
//   });

//   const validateField = (name: keyof PersonalInfoStepType, value: string) => {
//     if (!touched[name]) return;

//     const newErrors = { ...errors };

//     switch (name) {
//       case "name":
//         if (!value.trim()) {
//           newErrors.name = "이름을 입력해주세요";
//         } else {
//           delete newErrors.name;
//         }
//         break;

//       case "email":
//         if (!value.trim()) {
//           newErrors.email = "이메일을 입력해주세요";
//         } else if (!validateEmail(value)) {
//           newErrors.email = "올바른 이메일 형식이 아닙니다";
//         } else {
//           delete newErrors.email;
//         }
//         break;

//       case "phone":
//         if (!value.trim()) {
//           newErrors.phone = "전화번호를 입력해주세요";
//         } else if (!validatePhoneNumber(value)) {
//           newErrors.phone =
//             "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)";
//         } else {
//           delete newErrors.phone;
//         }
//         break;
//     }

//     setErrors(newErrors);
//   };

//   const validateForm = (data: PersonalInfoStepType) => {
//     const newErrors: FormErrors = {};
//     let isValid = true;

//     if (!data.name?.trim()) {
//       newErrors.name = "이름을 입력해주세요";
//       isValid = false;
//     }

//     if (!data.email?.trim()) {
//       newErrors.email = "이메일을 입력해주세요";
//       isValid = false;
//     } else if (!validateEmail(data.email)) {
//       newErrors.email = "올바른 이메일 형식이 아닙니다";
//       isValid = false;
//     }

//     if (!data.phone?.trim()) {
//       newErrors.phone = "전화번호를 입력해주세요";
//       isValid = false;
//     } else if (!validatePhoneNumber(data.phone)) {
//       newErrors.phone = "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     if (!touched[name as keyof TouchedFields]) {
//       setTouched((prev) => ({
//         ...prev,
//         [name]: true,
//       }));
//     }

//     const newFormData = {
//       ...formData,
//       [name]: value,
//     };
//     setFormData(newFormData);
//     validateField(name as keyof PersonalInfoStepType, value);

//     // 모든 필드가 터치되었고 유효성 검사를 통과하면 onSubmit 호출
//     const allFieldsTouched = Object.values({
//       ...touched,
//       [name]: true,
//     }).every((value) => value);

//     if (allFieldsTouched) {
//       const isValid = validateForm(newFormData);
//       if (isValid) {
//         onSubmit(newFormData);
//       }
//     }
//   };

//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formatted = formatPhoneNumber(e.target.value);

//     if (!touched.phone) {
//       setTouched((prev) => ({
//         ...prev,
//         phone: true,
//       }));
//     }

//     const newFormData = {
//       ...formData,
//       phone: formatted,
//     };
//     setFormData(newFormData);
//     validateField("phone", formatted);

//     const allFieldsTouched = Object.values({
//       ...touched,
//       phone: true,
//     }).every((value) => value);

//     if (allFieldsTouched) {
//       const isValid = validateForm(newFormData);
//       if (isValid) {
//         onSubmit(newFormData);
//       }
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     setTouched({
//       name: true,
//       email: true,
//       phone: true,
//     });

//     const isValid = validateForm(formData);
//     if (isValid) {
//       onSubmit(formData);
//     }
//   };

//   useEffect(() => {
//     const allFieldsTouched = Object.values(touched).every((value) => value);
//     const isFormValid: boolean = Boolean(
//       allFieldsTouched &&
//         formData.name?.trim() &&
//         formData.email?.trim() &&
//         formData.phone?.trim() &&
//         validateEmail(formData.email) &&
//         validatePhoneNumber(formData.phone) &&
//         Object.keys(errors).length === 0,
//     );
//     onValidityChange(isFormValid);
//   }, [errors, touched]);

//   useEffect(() => {
//     if (initialData.name && initialData.email && initialData.phone) {
//       setTouched({
//         name: true,
//         email: true,
//         phone: true,
//       });
//       validateForm(initialData);
//     }
//   }, []);

//   return (
//     <StepLayout title="기본 정보" description="연락 가능한 정보를 입력해주세요">
//       <form
//         onSubmit={handleSubmit}
//         className="p-6 bg-white rounded-lg border border-gray-200"
//       >
//         <div className="space-y-4">
//           <Input
//             id="name"
//             name="name"
//             label="성함을 입력해주세요"
//             placeholder="홍길동"
//             required
//             value={formData.name || ""}
//             onChange={handleInputChange}
//             error={touched.name ? errors.name : undefined}
//           />

//           <Input
//             id="email"
//             name="email"
//             type="email"
//             label="이메일 주소를 입력해주세요"
//             placeholder="prography@gmail.com"
//             required
//             value={formData.email || ""}
//             onChange={handleInputChange}
//             error={touched.email ? errors.email : undefined}
//           />

//           <Input
//             id="phone"
//             name="phone"
//             label="휴대폰 번호를 입력해주세요"
//             placeholder="010-1234-5678"
//             required
//             value={formData.phone || ""}
//             onChange={handlePhoneChange}
//             error={touched.phone ? errors.phone : undefined}
//           />
//         </div>
//       </form>
//     </StepLayout>
//   );
// };

import { Input } from "@/components/common/Input";
import { StepLayout } from "@/layouts/StepLayout";
import type { PersonalInfoStepType } from "@/types/apply";
import { usePersonalInfoForm } from "@/hooks/valid/usePersonalInfoForm";

interface PersonalInfoStepProps {
  initialData: PersonalInfoStepType;
  onSubmit: (data: PersonalInfoStepType) => void;
  onValidityChange: (isValid: boolean) => void;
}

export const PersonalInfoStep = ({
  initialData,
  onSubmit,
  onValidityChange,
}: PersonalInfoStepProps) => {
  const { formData, errors, touched, handleChange, handleSubmit } =
    usePersonalInfoForm({
      initialData,
      onSubmit,
      onValidityChange,
    });

  return (
    <StepLayout title="기본 정보" description="연락 가능한 정보를 입력해주세요">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg border border-gray-200"
      >
        <div className="space-y-4">
          <Input
            id="name"
            name="name"
            label="성함을 입력해주세요"
            placeholder="홍길동"
            required
            value={formData.name || ""}
            onChange={handleChange}
            error={touched.name ? errors.name : undefined}
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="이메일 주소를 입력해주세요"
            placeholder="prography@gmail.com"
            required
            value={formData.email || ""}
            onChange={handleChange}
            error={touched.email ? errors.email : undefined}
          />

          <Input
            id="phone"
            name="phone"
            label="휴대폰 번호를 입력해주세요"
            placeholder="010-1234-5678"
            required
            value={formData.phone || ""}
            onChange={handleChange}
            error={touched.phone ? errors.phone : undefined}
          />
        </div>
      </form>
    </StepLayout>
  );
};
