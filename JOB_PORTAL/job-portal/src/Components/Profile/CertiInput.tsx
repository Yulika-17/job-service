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
        validate:{
            name: isNotEmpty('Title cannot be empty'),
            issuer: isNotEmpty('Issuer cannot be empty'),
            issueDate: isNotEmpty('Issue Date cannot be empty'),
            certificateId: isNotEmpty('Certificate ID cannot be empty')
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
        successNotification("Success", `Certificate Added Successfully`);
    }
    return <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold">Add Certificate</div>
        <div className="flex gap-10 [&>*]:w-1/2">
            <TextInput {...form.getInputProps("name")} label="Title" withAsterisk placeholder="Enter title" />
            <SelectInput form={form} name="issuer" {...select[1]} />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
            <MonthPickerInput {...form.getInputProps("issueDate")} withAsterisk maxDate={new Date()} label="Issue Date" placeholder="Pick date" />
            <TextInput {...form.getInputProps("certificateId")} label="Certificate ID" withAsterisk placeholder="Enter ID" />
        </div>
        <div className="flex gap-5">
            <Button onClick={handleSave} color="green.8" variant="light">Save</Button>
            <Button color="red.8" onClick={() => props.setEdit(false)} variant="light">Cancel</Button>
        </div>
    </div>
}
export default CertiInput;