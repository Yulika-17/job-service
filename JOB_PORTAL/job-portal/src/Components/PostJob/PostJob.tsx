import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields, multi } from "../../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJob, postJob } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MultiSelectInput from "./MultiSelectInput";

const PostJob = () => {
    const { id } = useParams();
    const [editorData, setEditorData] = useState(content);
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const select = fields;
    const multiSelect = multi;
    useEffect(() => {
        window.scrollTo(0, 0);
        if (Number(id) != 0) {
            getJob(id).then((res) => {
                form.setValues(res);
                setEditorData(res.description);
            }).catch((err) => console.log(err))
        }
        else {
            form.reset();
            setEditorData(content);
        }
    }, [id])
    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            jobTitle: '',
            company: '',
            experience: '',
            jobType: '',
            location: '',
            packageOffered: '',
            skillsRequired: [],
            about: '',
            description: content,
            workFormat: '', // Новый фильтр
            educationLevel: '', // Новый фильтр
            academicCompatibility: [], // Новый фильтр
            taskTypes: [], // Новый фильтр
            studentSupport: [], // Новый фильтр
            workLanguage: '', // Новый фильтр
            equipmentAccess: '', // Новый фильтр
            flexibility: [], // Новый фильтр
            duration: '', // Новый фильтр
            startPeriod: '' // Новый фильтр
        },
        validate: {
            jobTitle: isNotEmpty('Название должности не может быть пустым'),
            company: isNotEmpty('Компания не может быть пустой'),
            location: isNotEmpty('Город не может быть пустой'),
            about: isNotEmpty('Описание не может быть пустым'),
            description: isNotEmpty('Полное описание не может быть пустым'),
            experience: isNotEmpty('Опыт не может быть пустым'),
            jobType: isNotEmpty('Тип занятости не может быть пустым'),
            packageOffered: isNotEmpty('Заработная плата не может быть пустой'),
            skillsRequired: isNotEmpty('Навыки не могут быть пустыми')
        }
    });
    const handlePost = () => {
        form.validate();
        if (!form.isValid()) return;
        postJob({ ...form.getValues(), id, postedBy: user.id, jobStatus: "ACTIVE" }).then((res) => {
            successNotification("Успешно", "Вакансия успешно опубликована");
            navigate(`/posted-jobs/${res.id}`);
        }).catch((err) => {
            console.log(err);
            errorNotification("Ошибка", err.response.data.errorMessage);
        })
    }
    const handleDraft = () => {
        postJob({ ...form.getValues(), id, postedBy: user.id, jobStatus: "DRAFT" }).then((res) => {
            successNotification("Успешно", "Черновик вакансии сохранён");
            navigate(`/posted-jobs/${res.id}`);
        }).catch((err) => {
            console.log(err);
            errorNotification("Ошибка", err.response.data.errorMessage);
        })
    }
    return <div className="px-16 py-5">
        <div className="text-2xl font-semibold mb-5">Публикация вакансии</div>
        <div className="flex flex-col gap-5">
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="jobTitle" {...select[0]} />
                <SelectInput form={form} name="company" {...select[1]} />
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="experience" {...select[2]} />
                <SelectInput form={form} name="jobType" {...select[3]} />
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="location" {...select[4]} />
                <NumberInput {...form.getInputProps('packageOffered')} label="Заработная плата" withAsterisk min={1} max={300} clampBehavior="strict" placeholder="Введите зарплату" hideControls />
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="workFormat" {...select[5]} />
                <SelectInput form={form} name="educationLevel" {...select[6]} />
            </div>

            <div className="flex gap-10 [&>*]:w-1/2">
                <MultiSelectInput form={form} name="academicCompatibility" {...multiSelect[0]} />
                <MultiSelectInput form={form} name="taskTypes" {...multiSelect[1]} />
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <MultiSelectInput form={form} name="studentSupport" {...multiSelect[2]} />
                <SelectInput form={form} name="workLanguage" {...select[10]} />
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="equipmentAccess" {...select[11]} />
                <MultiSelectInput form={form} name="flexibility" {...multiSelect[3]} />
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="duration" {...select[13]} />
                <SelectInput form={form} name="startPeriod" {...select[14]} />
            </div>

            <TagsInput {...form.getInputProps('skillsRequired')} withAsterisk label="Навыки" placeholder="Введите навык" splitChars={[',', ' ', '|']} clearable acceptValueOnBlur />
            <Textarea {...form.getInputProps("about")} withAsterisk className="my-3" label="О вакансии" placeholder="Введите информацию о вакансии..." autosize minRows={2} />
            <div className="[&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:!bg-bright-sun-400/20">
                <div className="text-sm font-medium">Описание вакансии <span className="text-red-500">*</span></div>
                <TextEditor form={form} data={editorData} />
            </div>
            <div className="flex gap-4">
                <Button color="brightSun.4" onClick={handlePost} variant="light">Опубликовать вакансию</Button>
                <Button color="brightSun.4" onClick={handleDraft} variant="outline">Сохранить как черновик</Button>
            </div>
        </div>
    </div>
}
export default PostJob;