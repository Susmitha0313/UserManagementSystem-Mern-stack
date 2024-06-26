

function registerValidation (name, email , mobile , password, confirm , toast) {
    name = name.trim()
    email = email.trim()
    mobile = mobile.trim()
    password = password.trim()
    confirm = confirm.trim()
    
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const mobileRegex = /^\+?[1-9]\d{1,14}$/;
    const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(name === '' || email === '' || mobile === '' || password === '' || confirm === '') {
        return toast.error('All Fields Are Required', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
    } else {
        return true;
    }
} 



export default registerValidation