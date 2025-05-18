import { Button, TextInput } from "@mantine/core";
import SelectInput from "./SelectInput";
import fields from "../../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";

const CertiInput = (props: any) => {
    const select = fields;
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            name:'',
            issuer:'',
            issueDate:new Date(),
            certificateId:''
        },
        validate: {
            name: isNotEmpty('Поле "Название сертификата" не может быть пустым'),
            issuer: isNotEmpty('Поле "Компания" не может быть пустым'),
            issueDate: isNotEmpty('Поле "Дата выдачи" не может быть пустым'),
            certificateId: isNotEmpty('Поле "ID сертификата" не может быть пустым')
        }
    });
    const handleSave = () => {
        form.validate();
        if(!form.isValid())return;
        let certis = [...profile.certifications];
        // if (props.add) {
            certis.push(form.getValues());
            certis[certis.length - 1].issueDate = certis[certis.length - 1].issueDate.toISOString();
            // certis[certis.length - 1].issueDate = form.getValues().issueDate.toISOString();
        // }
        // else {
        //     certis[props.index] = form.getValues();
        //     certis[props.index].issueDate = form.getValues().issueDate.toISOString();
        // }
        
        let updatedProfile = { ...profile, certifications: certis };
        props.setEdit(false);
        dispatch(changeProfile(updatedProfile));
        successNotification("Успех", `Сертификат успешно добавлен`);
    }
    return <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold">Добавить сертификат</div>
        <div className="flex gap-10 [&>*]:w-1/2">
            <TextInput {...form.getInputProps("name")} label="Название" withAsterisk placeholder="Введите название" />
            <SelectInput form={form} name="issuer" {...select[1]} />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
            <MonthPickerInput {...form.getInputProps("issueDate")} withAsterisk maxDate={new Date()} label="Дата выдачи" placeholder="Выберите дату" />
            <TextInput {...form.getInputProps("certificateId")} label="ID сертификата" withAsterisk placeholder="Введите ID" />
        </div>
        <div className="flex gap-5">
            <Button onClick={handleSave} color="green.8" variant="light">Сохранить</Button>
            <Button color="red.8" onClick={() => props.setEdit(false)} variant="light">Отмена</Button>
        </div>
    </div>
}
export default CertiInput;