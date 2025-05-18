import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CertiCard from "./CertiCard";
import CertiInput from "./CertiInput";

const Certification = () => {
    const [edit, setEdit] = useState(false);
    const [addCerti, setAddCerti] = useState(false);
    const profile=useSelector((state:any)=>state.profile);
    const handleClick=()=>{
        setEdit(!edit);
    }
    return <div>
        <div className="text-2xl font-semibold mb-4 flex justify-between">Сертификаты <div className="flex gap-2"><ActionIcon onClick={() => setAddCerti(true)} size="lg" color="brightSun.4" variant="subtle"><IconPlus className="h-4/5 w-4/5" />
        </ActionIcon><ActionIcon onClick={handleClick} size="lg" color={edit ? "red.8" : "brightSun.4"} variant="subtle">
                {edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
            </ActionIcon></div></div>
        <div className="flex flex-col gap-8">
            {
                profile?.certifications?.map((certi: any, index: number) => <CertiCard key={index} index={index} edit={edit} {...certi} />)
            }
            {
                addCerti && <CertiInput setEdit={setAddCerti} />
            }
        </div>
    </div>
}
export default Certification;