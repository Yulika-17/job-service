// import { Anchor, Button, Checkbox, Group, LoadingOverlay, PasswordInput, Radio, rem, TextInput } from "@mantine/core";
// import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "../../Services/UserService";
// import { signupValidation } from "../../Services/FormValidation";
// import { errorNotification, successNotification } from "../../Services/NotificationService";


// const SignUp = () => {
//     const form = {
//         name: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         accountType: "APPLICANT",
//     }
//     const [data, setData] = useState<{ [key: string]: string }>(form);
//     const [formError, setFormError] = useState<{ [key: string]: string }>(form);
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const handleChange = (event: any) => {
//         if (typeof (event) == "string") {
//             setData({ ...data, accountType: event });
//             return;
//         }
//         let name = event.target.name, value = event.target.value;
//         setData({ ...data, [name]: value });
//         setFormError({ ...formError, [name]: signupValidation(name, value) });
//         if (name === "password" && data.confirmPassword !== "") {
//             let err = "";
//             if (data.confirmPassword !== value) err = "Passwords do not match.";
//             setFormError({ ...formError, [name]: signupValidation(name, value), confirmPassword: err });
//         }
//         if (name === "confirmPassword") {
//             if (data.password !== value) setFormError({ ...formError, [name]: "Passwords do not match." });
//             else setFormError({ ...formError, confirmPassword: "" });
//         }
//     }
//     const handleSubmit = () => {
//         let valid = true, newFormError: { [key: string]: string } = {};
//         for (let key in data) {
//             if (key === "accountType") continue;
//             if (key !== "confirmPassword") newFormError[key] = signupValidation(key, data[key]);
//             else if (data[key] !== data["password"]) newFormError[key] = "Пароли не совпадают.";
//             if (newFormError[key]) valid = false;
//         }
//         setFormError(newFormError);
//         if (valid === true) {
//             setLoading(true);
//             registerUser(data).then((res) => {
//                 console.log(res);
//                 setData(form);
//                 successNotification("Регистрация прошла успешно", "Переход на главную страницу...");

//                 setTimeout(() => {
//                     setLoading(false);
//                     navigate("/login");
//                 }, 4000)
//             }).catch((err) => {
//                 setLoading(false);
//                 console.log(err);
//                 errorNotification("Ошибка при регистрации", err.response.data.errorMessage);
//             });
//         }
//     }
//     return <><LoadingOverlay
//         visible={loading}
//         zIndex={1000}
//         className="translate-x-1/2"
//         overlayProps={{ radius: 'sm', blur: 2 }}
//         loaderProps={{ color: 'brightSun.4', type: 'bars' }}
//     /><div className="w-1/2 px-20 flex flex-col justify-center gap-3">
//             <div className="text-2xl font-semibold">Создать аккаунт</div>
//             <TextInput value={data.name} error={formError.name} name="name" onChange={handleChange} withAsterisk label="Полное имя" placeholder="Ваше имя" />
//             <TextInput value={data.email} error={formError.email} name="email" onChange={handleChange} withAsterisk leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />} label="Email" placeholder="Ваш email" />
//             <PasswordInput value={data.password} error={formError.password} name="password" onChange={handleChange} withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} label="Пароль" placeholder="Пароль" />
//             <PasswordInput value={data.confirmPassword} error={formError.confirmPassword} name="confirmPassword" onChange={handleChange} withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} label="Подтвердите пароль" placeholder="Подтвердите пароль" />
//             <Radio.Group
//                 value={data.accountType}
//                 onChange={handleChange}
//                 label="Кто вы?"
//                 withAsterisk
//             >
//                 <Group mt="xs">
//                     <Radio className="w-[123px] py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg" autoContrast value="APPLICANT" label="Студент" />
//                     <Radio className="w-[165px] py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg" autoContrast value="EMPLOYER" label="Работодатель" />
//                     <Radio className="w-[160px] py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg" autoContrast value="UNIVERSITY" label="Университет" />
//                 </Group>
//             </Radio.Group>
//             {/* <Checkbox autoContrast label={<>I accept{' '}<Anchor>terms & conditions</Anchor></>} /> */}
//             <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Зарегистрироваться</Button>
//             <div className="mx-auto">Уже есть аккаунт? <span className="text-bright-sun-400 hover:underline cursor-pointer" onClick={() => { navigate("/login"); setFormError(form); setData(form) }}>Войти</span></div>
//         </div></>
// }
// export default SignUp;
import { Button, LoadingOverlay, PasswordInput, PinInput, Radio, rem, TextInput, Group, Alert } from "@mantine/core";
import { IconAt, IconLock, IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, sendRegistrationOtp, verifyOtp, registerAlternative } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useInterval } from "@mantine/hooks";

const SignUp = () => {
    const form = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType: "APPLICANT",
    };
    const [data, setData] = useState<{ [key: string]: string }>(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>(form);
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [verified, setVerified] = useState(false);
    const [resendLoader, setResendLoader] = useState(false);
    const [seconds, setSeconds] = useState(60);
    const [showAlternative, setShowAlternative] = useState(false);
    const navigate = useNavigate();

    const interval = useInterval(() => {
        if (seconds === 0) {
            setResendLoader(false);
            setSeconds(60);
            interval.stop();
        } else setSeconds((s) => s - 1);
    }, 1000);

    const handleChange = (event: any) => {
        if (typeof event === "string") {
            setData({ ...data, accountType: event });
            return;
        }
        const name = event.target.name;
        const value = event.target.value;
        setData({ ...data, [name]: value });
        setFormError({ ...formError, [name]: signupValidation(name, value) });

        if (name === "password" && data.confirmPassword !== "") {
            const err = data.confirmPassword !== value ? "Пароли не совпадают." : "";
            setFormError({ ...formError, password: signupValidation(name, value), confirmPassword: err });
        }
        if (name === "confirmPassword") {
            const err = data.password !== value ? "Пароли не совпадают." : "";
            setFormError({ ...formError, confirmPassword: err });
        }
    };

    const handleSendOtp = () => {
        setOtpSending(true);
        sendRegistrationOtp(data.email)
            .then(() => {
                successNotification("Код отправлен", "Проверьте почту и введите OTP.");
                setOtpSent(true);
                setOtpSending(false);
                setResendLoader(true);
                interval.start();
            })
            .catch((err) => {
                errorNotification("Ошибка отправки кода", err.response?.data?.errorMessage || "Попробуйте позже.");
                setOtpSending(false);
            });
    };

    const handleVerifyOtp = (otp: string) => {
        verifyOtp(data.email, otp)
            .then(() => {
                successNotification("Почта подтверждена", "Завершите регистрацию.");
                setVerified(true);
            })
            .catch((err) => {
                errorNotification("Ошибка OTP", err.response?.data?.errorMessage || "Неверный код.");
            });
    };

    const resendOtp = () => {
        if (resendLoader) return;
        handleSendOtp();
    };

    const handleAlternativeRegister = () => {
        setLoading(true);
        registerAlternative({
            name: data.name,
            email: data.email,
            password: data.password,
            accountType: data.accountType
        })
            .then(() => {
                successNotification("Заявка отправлена", "Ваш аккаунт будет проверен университетом");
                navigate("/login");
            })
            .catch((err) => {
                errorNotification("Ошибка регистрации", err.response?.data?.errorMessage || "Попробуйте позже.");
            })
            .finally(() => setLoading(false));
    };

    const handleSubmit = () => {
        if (showAlternative && data.accountType === "APPLICANT") {
            handleAlternativeRegister();
            return;
        }

        const skipOtp = data.accountType === "EMPLOYER";
        if (!skipOtp && !verified) {
            errorNotification("Ошибка", "Подтвердите почту перед регистрацией.");
            return;
        }

        let valid = true;
        const newFormError: { [key: string]: string } = {};
        for (const key in data) {
            if (key === "accountType") continue;
            if (key !== "confirmPassword") newFormError[key] = signupValidation(key, data[key]);
            else if (data[key] !== data.password) newFormError[key] = "Пароли не совпадают.";
            if (newFormError[key]) valid = false;
        }

        setFormError(newFormError);
        if (!valid) return;

        setLoading(true);
        registerUser(data)
            .then(() => {
                successNotification("Успешно!", "Регистрация завершена. Войдите в аккаунт.");
                navigate("/login");
            })
            .catch((err) => {
                errorNotification("Ошибка регистрации", err.response?.data?.errorMessage || "Попробуйте позже.");
            })
            .finally(() => setLoading(false));
    };

    const needsOtp = data.accountType !== "EMPLOYER";
    const isApplicant = data.accountType === "APPLICANT";

    return (
        <>
            <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
                loaderProps={{ color: "brightSun.4", type: "bars" }}
            />
            <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
                <div className="text-2xl font-semibold">Создать аккаунт</div>

                {showAlternative && isApplicant && (
                    <Alert icon={<IconInfoCircle />} color="blue" className="mb-4">
                        Заполните профиль после регистрации. Доступ к вакансиям откроется после проверки университетом.
                    </Alert>
                )}

                <TextInput
                    value={data.name}
                    error={formError.name}
                    name="name"
                    onChange={handleChange}
                    withAsterisk
                    label="Полное имя"
                    placeholder="Ваше имя"
                    disabled={otpSent && needsOtp && !showAlternative}
                />

                <TextInput
                    value={data.email}
                    error={formError.email}
                    name="email"
                    onChange={handleChange}
                    withAsterisk
                    leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                    label="Email"
                    placeholder="Ваш email"
                    disabled={otpSent && needsOtp && !showAlternative}
                    rightSection={
                        needsOtp && !otpSent && !showAlternative && (
                            <Button
                                loading={otpSending}
                                size="xs"
                                className="mr-1"
                                onClick={handleSendOtp}
                                autoContrast
                                disabled={!data.email || !!formError.email}
                                variant="filled"
                            >
                                Отправить код
                            </Button>
                        )
                    }
                    rightSectionWidth={needsOtp && !showAlternative ? "xl" : undefined}
                />

                {needsOtp && otpSent && !showAlternative && (
                    <>
                        <PinInput
                            onComplete={handleVerifyOtp}
                            length={6}
                            className="mx-auto"
                            size="md"
                            gap="lg"
                            type="number"
                        />
                        <div className="flex gap-2">
                            <Button
                                fullWidth
                                loading={otpSending}
                                color="brightSun.4"
                                onClick={resendOtp}
                                autoContrast
                                variant="light"
                            >
                                {resendLoader ? seconds : "Отправить повторно"}
                            </Button>
                        </div>
                    </>
                )}

                <PasswordInput
                    value={data.password}
                    error={formError.password}
                    name="password"
                    onChange={handleChange}
                    withAsterisk
                    leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                    label="Пароль"
                    placeholder="Пароль"
                />

                <PasswordInput
                    value={data.confirmPassword}
                    error={formError.confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                    withAsterisk
                    leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                    label="Подтвердите пароль"
                    placeholder="Подтвердите пароль"
                />

                <Radio.Group
                    value={data.accountType}
                    onChange={handleChange}
                    label="Кто вы?"
                    withAsterisk
                >
                    <Group mt="xs">
                        <Radio
                            className="w-[123px] py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg"
                            autoContrast
                            value="APPLICANT"
                            label="Студент"
                            disabled={otpSent && needsOtp}
                        />
                        <Radio
                            className="w-[165px] py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg"
                            autoContrast
                            value="EMPLOYER"
                            label="Работодатель"
                            disabled={otpSent && needsOtp}
                        />
                        <Radio
                            className="w-[160px] py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg"
                            autoContrast
                            value="UNIVERSITY"
                            label="Университет"
                            disabled={otpSent && needsOtp}
                        />
                    </Group>
                </Radio.Group>

                <Button
                    onClick={handleSubmit}
                    autoContrast
                    variant="filled"
                >
                    {showAlternative ? "Зарегистрироваться" : "Зарегистрироваться"}
                </Button>

                <div className="mx-auto">
                    Уже есть аккаунт?{" "}
                    <span
                        className="text-bright-sun-400 hover:underline cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Войти
                    </span>
                </div>

                {/* Перемещенная надпись вниз формы */}
                {isApplicant && !showAlternative && (
                    <div className="text-center">
                        Нет доступа к вузовской почте?{" "}
                        <span 
                            className="text-bright-sun-400 hover:underline cursor-pointer"
                            onClick={() => setShowAlternative(true)}
                        >
                            Зарегистрируйтесь здесь
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};

export default SignUp;