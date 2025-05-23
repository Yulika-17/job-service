import { useEffect, useState } from "react";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAllProfiles, getProfile } from "../../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";
import { getApplicants } from "../../Services/UserService";
import { Button } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";

const Talents = () => {
    const dispatch = useDispatch();
    const [talents, setTalents] = useState<any>([]);
    const filter = useSelector((state: any) => state.filter);
    const sort = useSelector((state: any) => state.sort);
    const [filteredTalents, setFilteredTalents] = useState<any>([]);
    // useEffect(() => {
    //     dispatch(resetFilter());
    //     getAllProfiles().then((res) => {
    //         setTalents(res);
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }, [])
    // Функция для получения пользователей с типом APPLICANT
    useEffect(() => {
        dispatch(resetFilter());

        getApplicants().then((applicants) => {

            // Теперь получаем профили для этих пользователей
            const profilePromises = applicants.map((user: any) => getProfile(user.profileId));
            Promise.all(profilePromises).then((profiles) => {
                setTalents(profiles.filter((talent: any) => talent.verified == true));  // Сохраняем только профили для пользователей с типом "APPLICANT"
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }, []);
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
        if (filter["Должность"] && filter["Должность"].length > 0) filtered = filtered.filter((talent: any) => filter["Должность"]?.some((x: any) => talent.jobTitle?.toLowerCase().includes(x.toLowerCase())));
        if (filter.Университет && filter.Университет.length > 0) filtered = filtered.filter((talent: any) => filter.Университет?.some((x: any) => talent.university?.toLowerCase().includes(x.toLowerCase())));
        if (filter.Навыки && filter.Навыки.length > 0) filtered = filtered.filter((talent: any) => filter.Навыки?.some((x: any) => talent.skills?.some((y: any) => y.toLowerCase().includes(x.toLowerCase()))));
        if (filter.exp && filter.exp.length > 0) filtered = filtered.filter((talent: any) => filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1]);
        setFilteredTalents(filtered);
    }, [filter, talents])
    return <div className="px-5 py-5">
        <div className="flex justify-between mt-5">
            <div className="text-2xl font-semibold">Студенты</div>
            {/* <Sort /> */}
            <div className="flex gap-3">
                <Button
                    variant="outline"
                    className="cursor-pointer border !border-bright-sun-400 flex gap-2 px-2 py-1 !text-sm !font-normal !text-mine-shaft-300 !rounded-xl !items-center"
                    rightSection={<IconFilter className='h-5 w-5 text-bright-sun-400' />}
                    // onClick={() => setModalOpened(true)}
                >
                    Все фильтры
                </Button>
                <Sort />
            </div>
        </div>
        <div className="flex mt-10 flex-wrap gap-5 justify-between">
            {
                filteredTalents.map((talent: any, index: any) => <TalentCard key={index} {...talent} />)
                // filteredTalents?.length?filteredTalents.map((talent: any, index: any) => <TalentCard key={index} {...talent} />):<div className="text-xl font-semibold">Таланты не найдены</div>
            }
        </div>
    </div>
}
export default Talents;