export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
  return phoneRegex.test(phone);
};
