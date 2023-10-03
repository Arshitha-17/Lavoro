export const validateRegistrationForm = (formData, existingEmails) => {
    const errors = {};
  
    // Name Validation
    if (!formData.name) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]*$/.test(formData.name)) {
      errors.name = "Name should only contain letters and spaces";
    } else if (formData.name.length < 3) {
      errors.name = "Name must have at least 3 characters";
    }
  
    // Email Validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email address";
    } else if (existingEmails.includes(formData.email)) {
      errors.email = "Email address is already registered";
    }
  
    // Password Validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else if (/[\s,.]/.test(formData.password)) {
      errors.password = "Password should not contain spaces, dots, or commas";
    }
  
    // Confirm Password Validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }
  
    return errors;
  };
  
  const isValidEmail = (email) => {
    // You can use a more sophisticated email validation regex here
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  