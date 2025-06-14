import axiosInstance from "../Interceptor/AxiosInterceptor";


const registerUser = async (user: any) => {
    return axiosInstance.post(`/users/register`, user)
        .then((result: any) => result.data)
        .catch((error: any) => { throw error; });
}
const registerAlternative = async (user: any) => {
    return axiosInstance.post(`/users/registerAlt`, user)
        .then((result: any) => result.data)
        .catch((error: any) => { throw error; });
}
const loginUser = async (login: any) => {
    return axiosInstance.post(`/users/login`, login)
        .then((result: any) => result.data)
        .catch((error: any) => { throw error; });
}
const sendRegistrationOtp = async (email: string) => {
    return axiosInstance.post(`/users/sendRegistrationOtp/${email}`)
        .then((result: any) => result.data)
        .catch((error: any) => { throw error; });
}
const sendOtp = async (email: string) => {
    return axiosInstance.post(`/users/sendOtp/${email}`)
        .then((result: any) => result.data)
        .catch((error: any) => { throw error; });
}

const verifyOtp = async (email: string, otp: string) => {
    return axiosInstance.get(`/users/verifyOtp/${email}/${otp}`)
        .then((result: any) => result.data)
        .catch((error: any) => { throw error; });
}

const resetPassword = async (email: string, password: string) => {
    return axiosInstance.post(`/users/changePass`, { email, password })
        .then((result: any) => result.data)
        .catch((error: any) => { throw error; });
}

const getApplicants=async ()=>{
    return axiosInstance.get(`/users/applicants`)
    .then((result:any) => result.data)
    .catch((error:any) =>{throw error;});
}

export { registerUser, registerAlternative, loginUser, sendRegistrationOtp, sendOtp, verifyOtp, resetPassword, getApplicants };