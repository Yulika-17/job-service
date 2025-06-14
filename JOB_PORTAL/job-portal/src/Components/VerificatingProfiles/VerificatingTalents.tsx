import { useEffect, useState } from "react";
import Sort from "../FindJobs/Sort";
import { getAllProfiles, getProfile } from "../../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";
import TalentCard from "../FindTalent/TalentCard";
import { getApplicants } from "../../Services/UserService";
import VerTalentCard from "./VerTalentCard";

const VerificatingTalents = () => {
    const dispatch = useDispatch();
    const [talents, setTalents] = useState<any>([]);
    const profile = useSelector((state: any) => state.profile);
    const filter = useSelector((state: any) => state.filter);
    const sort = useSelector((state: any) => state.sort);
    const [filteredTalents, setFilteredTalents] = useState<any>([]);
    useEffect(() => {
        dispatch(resetFilter());

        getApplicants().then((applicants) => {
            const profilePromises = applicants.map((user: any) => getProfile(user.profileId));
            Promise.all(profilePromises).then((profiles) => {
                // Дожидаемся, пока profile.university станет доступен, прежде чем фильтровать
                if (profile?.university) {
                    setTalents(profiles.filter((talent: any) => talent.university === profile.university && talent.verified == false));
                } else {
                    setTalents(profiles); // Если профиль еще не загружен, не фильтруем
                }
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }, [profile.university]); // Перезапускаем эффект при изменении profile.university
    useEffect(() => {
        if (sort == "Опыт: по возрастанию") {
            setTalents([...talents].sort((a: any, b: any) => a.totalExp - b.totalExp));
        }
        else if (sort == "Опыт: по убыванию") {
            setTalents([...talents].sort((a: any, b: any) => b.totalExp - a.totalExp));
        }

    }, [sort])
    useEffect(() => {
        let filtered = talents;

        if (filter.name) filtered = filtered.filter((talent: any) => talent.name.toLowerCase().includes(filter.name.toLowerCase()));
        if (filter["Job Title"] && filter["Job Title"].length > 0) filtered = filtered.filter((talent: any) => filter["Job Title"]?.some((x: any) => talent.jobTitle?.toLowerCase().includes(x.toLowerCase())));
        if (filter.University && filter.University.length > 0) filtered = filtered.filter((talent: any) => filter.University?.some((x: any) => talent.university?.toLowerCase().includes(x.toLowerCase())));
        if (filter.Skills && filter.Skills.length > 0) filtered = filtered.filter((talent: any) => filter.Skills?.some((x: any) => talent.skills?.some((y: any) => y.toLowerCase().includes(x.toLowerCase()))));
        if (filter.exp && filter.exp.length > 0) filtered = filtered.filter((talent: any) => filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1]);
        setFilteredTalents(filtered);
    }, [filter, talents])
    return <div className="px-5 py-5">
        <div className="flex justify-between mt-5">
            <div className="text-2xl font-semibold">Студенты</div>
            {/* <Sort /> */}
        </div>
        <div className="flex mt-10 flex-wrap gap-5 justify-between">
            {
                filteredTalents.map((talent: any, index: any) => <VerTalentCard key={index} {...talent} />)
                // filteredTalents?.length?filteredTalents.map((talent: any, index: any) => <TalentCard key={index} {...talent} />):<div className="text-xl font-semibold">Студенты не найдены</div>
            }
        </div>
    </div>
}
export default VerificatingTalents;