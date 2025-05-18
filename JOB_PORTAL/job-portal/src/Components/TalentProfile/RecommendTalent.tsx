import { useParams } from "react-router-dom";
import { talents } from "../../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";
import { useEffect, useState } from "react";
import { getApplicants } from "../../Services/UserService";
import { getProfile } from "../../Services/ProfileService";

const RecommendTalent = (props: any) => {
    const { id } = useParams();
    const [talents, setTalents] = useState<any>([]);
    useEffect(() => {
    
            getApplicants().then((applicants) => {
        
                // Теперь получаем профили для этих пользователей
                const profilePromises = applicants.map((user: any) => getProfile(user.profileId));
                Promise.all(profilePromises).then((profiles) => {
                    setTalents(profiles);  // Сохраняем только профили для пользователей с типом "APPLICANT"
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        }, []);
    return <div>
        <div className="text-xl font-semibold mb-5">Рекомендуемые студенты</div>
        <div className="flex flex-col flex-wrap gap-5 justify-between">
            {
                talents?.map((talent: any, index: any) => index < 4 && id != talent.id && <TalentCard key={index} {...talent} />)
            }
        </div>
    </div>
}
export default RecommendTalent;