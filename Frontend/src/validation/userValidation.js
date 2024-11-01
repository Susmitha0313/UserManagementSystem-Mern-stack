function registerValidation(name, email, mobile, password, confirm, toast) {
    name = name.trim();
    email = email.trim();
    mobile = mobile.trim();
    password = password.trim();
    confirm = confirm.trim();

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const mobileRegex = /^\+?[1-9]\d{1,14}$/;
    const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check if any field is empty
    if (!name || !email || !mobile || !password || !confirm) {
        return toast.error('All fields are required', {
            hideProgressBar: true,
            className: 'custom-toast-error',
            autoClose: 2000,
        });
    }

    // Validate name length
    if (name.length < 3) {
        return toast.error('Name must be at least 3 characters long', {
            hideProgressBar: true,
            className: 'custom-toast-error',
            autoClose: 2000,
        });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
        return toast.error('Please enter a valid email address', {
            hideProgressBar: true,
            className: 'custom-toast-error',
            autoClose: 2000,
        });
    }

    // Validate mobile number format
    if (!mobileRegex.test(mobile)) {
        return toast.error('Please enter a valid mobile number', {
            hideProgressBar: true,
            className: 'custom-toast-error',
            autoClose: 2000,
        });
    }

    // Validate password strength
    if (!passRegex.test(password)) {
        return toast.error('Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character', {
            hideProgressBar: true,
            className: 'custom-toast-error',
            autoClose: 4000,
        });
    }

    // Check if passwords match
    if (password !== confirm) {
        return toast.error('Passwords do not match', {
            hideProgressBar: true,
            className: 'custom-toast-error',
            autoClose: 2000,
        });
    }

    // All validations passed
    return true;
}

export default registerValidation;
