import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../Components/TalentProfile/Profile";
import RecommendTalent from "../Components/TalentProfile/RecommendTalent";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../Services/ProfileService";

const TalentProfilePage = () => {
    const navigate = useNavigate();
    const [talents, setTalents] = useState<any[]>([]);
    useEffect(()=>{
        getAllProfiles().then((res)=>{
            setTalents(res);
        }).catch((err)=>{
            console.log(err);
        })
    }, [])
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['montserrat'] p-4">
            <Divider size="xs" mx="md" />
                <Button onClick={()=>navigate(-1)} leftSection={<IconArrowLeft size={20}/>} color="brightSun.4" my="sm" variant="light" >Назад</Button>
            <div className="flex gap-5">
                <Profile/>
                <RecommendTalent talents = {talents}/>
            </div>
        </div>
    )
}
export default TalentProfilePage;