const signupValidation=(name:string, value:string)=>{
    switch(name) {
        case "name":
            if(value.length===0) return "Имя обязательно для заполнения.";
            return "";
        case "email":
            if(value.length===0) return "Email обязателен для заполнения.";
            if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return "Неверный формат Email.";
            return "";
        case "password":
            if(value.length===0) return "Пароль обязателен для заполнения.";
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/.test(value)) return "Пароль должен содержать 8-15 символов, включая заглавную, строчную букву, цифру и спецсимвол."
            return "";
        default:
            return "";
    }
}

const loginValidation=(name:string, value:string)=>{
    switch(name) {
        case "email":
            if(value.length===0) return "Email обязателен для заполнения.";
            return "";
        case "password":
            if(value.length===0) return "Пароль обязателен для заполнения.";
            return ""
        default:
            return "";
    }
}
export {signupValidation, loginValidation};