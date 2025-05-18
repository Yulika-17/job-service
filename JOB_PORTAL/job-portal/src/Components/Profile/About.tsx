import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../../Services/NotificationService";
import { changeProfile } from "../../Slices/ProfileSlice";

const About = () => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const [about, setAbout] = useState("");
    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            setAbout(profile.about);
        }
        else setEdit(false);
    }
    const handleSave = () => {
        setEdit(false);
        let updatedProfile = { ...profile, about:about };
        dispatch(changeProfile(updatedProfile));
        successNotification("Успех", "Информация о себе успешно обновлена");
    }
    return <div>
        <div className="text-2xl font-semibold mb-3 flex justify-between">О себе <div>
            {edit && <ActionIcon onClick={handleSave} size="lg" color="green.8" variant="subtle">
                <IconCheck className="h-4/5 w-4/5" stroke={1.5} /></ActionIcon>}
            <ActionIcon onClick={handleClick} size="lg" color={edit ? "red.8" : "brightSun.4"} variant="subtle">
                {edit ? <IconX className="h-4/5 w-4/5" stroke={1.5} /> : <IconPencil className="h-4/5 w-4/5" stroke={1.5} />}</ActionIcon>
        </div></div>
        {
            edit ? <Textarea value={about} placeholder="Расскажите о себе..." autosize minRows={3} onChange={(event) => setAbout(event.currentTarget.value)} /> : <div className="text-sm text-mine-shaft-300 text-justify">{profile?.about}</div>
        }
    </div>
}
export default About;