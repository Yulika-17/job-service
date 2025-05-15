import axiosInstance from "../Interceptor/AxiosInterceptor";

const getUniversityStats = async (university: string) => {
    return axiosInstance.get(`/university/stats/${university}`)
        .then((result: any) => result.data)
        .catch((error: any) => { throw error; });
}
export {getUniversityStats};