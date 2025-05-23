import { Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getBase64 } from "../../Services/Utilities";
import { applyJob } from "../../Services/JobService";
import { useNavigate, useParams } from "react-router-dom";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useSelector } from "react-redux";

// const ApplicationForm = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const user = useSelector((state: any) => state.user);
//     const [preview, setPreview] = useState(false);
//     const [submit, setSubmit] = useState(false);
//     const handlePreview = () => {
//         form.validate();
//         window.scrollTo({ top: 0, behavior: 'smooth' })
//         if (!form.isValid()) return;
//         setPreview(!preview);
//     }
//     const handleSubmit = async () => {
//         setSubmit(true);
//         let resume: any = await getBase64(form.getValues().resume);
//         let applicant = { ...form.getValues(), applicantId: user.id, resume: resume.split(',')[1] };
//         applyJob(applicant, id).then((res) => {
//             setSubmit(false);
//             successNotification("Успешно", "Отклик отправлен");
//             navigate("/job-history");
//         }).catch((err) => {
//             setSubmit(false);
//             errorNotification("Ошибка", err.response.data.errorMessage);
//         });
//     }
//     const form = useForm({
//         mode: 'controlled',
//         validateInputOnChange: true,
//         initialValues: {
//             name: '',
//             email: '',
//             phone: '',
//             website: '',
//             resume: null,
//             coverLetter: ''
//         },
//         validate: {
//             name: isNotEmpty('Имя не может быть пустым'),
//             email: isNotEmpty('Электронная почта не может быть пустой'),
//             phone: isNotEmpty('Телефон не может быть пустым'),
//             // website: isNotEmpty('Сайт не может быть пустым'),
//             resume: isNotEmpty('Резюме не может быть пустым'),
//         }
//     })

//     // Когда user загрузился, подставляем данные в форму
//     useEffect(() => {
//         if (user) {
//             form.setValues({
//                 name: user.name || '',
//                 email: user.email || '',
//                 phone: user.phone || '',
//                 website: user.website || '',
//                 resume: null,
//                 coverLetter: ''
//             });
//         }
//     }, [user]);
//     return <div>
//         <LoadingOverlay className="!fixed"
//             visible={submit}
//             zIndex={1000}
//             overlayProps={{ radius: 'sm', blur: 2 }}
//             loaderProps={{ color: 'brightSun.4', type: 'bars' }}
//         />
//         <div className="text-xl font-semibold mb-5">Откликнуться на вакансию</div>
//         <div className="flex flex-col gap-5">
//             <div className="flex gap-10 [&>*]:w-1/2">
//                 <TextInput {...form.getInputProps("name")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} label="ФИО" withAsterisk placeholder="Введите имя" />
//                 <TextInput {...form.getInputProps("email")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} label="Email" withAsterisk placeholder="Введите email" />
//             </div>
//             <div className="flex gap-10 [&>*]:w-1/2">
//                 <NumberInput {...form.getInputProps("phone")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} label="Телефон" withAsterisk placeholder="Введите номер телефона" hideControls min={0} max={9999999999} clampBehavior="strict" />
//                 <TextInput {...form.getInputProps("website")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} label="Личный сайт или профиль GitHub" withAsterisk placeholder="Введите URL" />
//             </div>
//             <FileInput {...form.getInputProps("resume")} accept="application/pdf" readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} withAsterisk leftSection={<IconPaperclip stroke={1.5} />} label="Прикрепите резюме" placeholder="Ваше резюме" leftSectionPointerEvents="none"
//             />
//             <Textarea {...form.getInputProps("coverLetter")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} withAsterisk placeholder="Напишите что-нибудь о себе..." label="Сопроводительное письмо" autosize minRows={4}
//             />
//             {!preview && <Button onClick={handlePreview} color="brightSun.4" variant="light" >Предпросмотр</Button>}
//             {
//                 preview && <div className="flex gap-10 [&>*]:w-1/2">
//                     <Button fullWidth onClick={handlePreview} color="brightSun.4" variant="outline" >Редактировать</Button>
//                     <Button fullWidth onClick={handleSubmit} color="brightSun.4" variant="light" >Откликнуться</Button>
//                 </div>
//             }
//         </div>
//     </div>
// }
// export default ApplicationForm;
const ApplicationForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);
    const [submit, setSubmit] = useState(false);

    const handleSubmit = async () => {
        await form.validate();
        if (!form.isValid()) return;

        setSubmit(true);
        let resume: any = await getBase64(form.getValues().resume);
        let applicant = { ...form.getValues(), applicantId: user.id, resume: resume.split(',')[1] };
        applyJob(applicant, id).then(() => {
            setSubmit(false);
            successNotification("Успешно", "Отклик отправлен");
            navigate("/job-history");
        }).catch((err) => {
            setSubmit(false);
            errorNotification("Ошибка", err.response.data.errorMessage);
        });
    }

    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            name: '',
            email: '',
            phone: '',
            website: '',
            resume: null,
            coverLetter: ''
        },
        validate: {
            name: isNotEmpty('Имя не может быть пустым'),
            email: isNotEmpty('Электронная почта не может быть пустой'),
            phone: isNotEmpty('Телефон не может быть пустым'),
            resume: isNotEmpty('Резюме не может быть пустым'),
        }
    });

    useEffect(() => {
        if (profile) {
            form.setValues({
                name: profile.name || '',
                email: profile.email || '',
                phone: profile.phone || '',
                website: profile.website || '',
                resume: null,
                coverLetter: ''
            });
            // setResumeUrl(profile.resumeUrl || null);
        }
    }, [profile]);


    return (
        <div>
            <LoadingOverlay
                className="!fixed"
                visible={submit}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'brightSun.4', type: 'bars' }}
            />
            <div className="text-xl font-semibold mb-5">Откликнуться на вакансию</div>
            <div className="flex flex-col gap-5">
                <div className="flex gap-10 [&>*]:w-1/2">
                    <TextInput {...form.getInputProps("name")} label="ФИО" withAsterisk placeholder="Введите имя" />
                    <TextInput {...form.getInputProps("email")} label="Email" withAsterisk placeholder="Введите email" />
                </div>
                <div className="flex gap-10 [&>*]:w-1/2">
                    <NumberInput {...form.getInputProps("phone")} label="Телефон" withAsterisk placeholder="Введите номер телефона" hideControls min={0} max={9999999999} clampBehavior="strict" />
                    <TextInput {...form.getInputProps("website")} label="Личный сайт или профиль GitHub" placeholder="Введите URL" />
                </div>
                <FileInput
                    {...form.getInputProps("resume")}
                    accept="application/pdf"
                    withAsterisk
                    leftSection={<IconPaperclip stroke={1.5} />}
                    label="Прикрепите резюме"
                    placeholder="Ваше резюме"
                    leftSectionPointerEvents="none"
                />
                <Textarea
                    {...form.getInputProps("coverLetter")}
                    placeholder="Напишите что-нибудь о себе..."
                    label="Сопроводительное письмо"
                    autosize
                    minRows={4}
                />
                <Button onClick={handleSubmit} color="brightSun.4" variant="light">Откликнуться</Button>
            </div>
        </div>
    );
}

export default ApplicationForm;
