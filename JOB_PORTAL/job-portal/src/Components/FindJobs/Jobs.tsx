// import { useEffect, useState } from "react";
// import JobCard from "./JobCard";
// import Sort from "./Sort";
// import { getAllJobs } from "../../Services/JobService";
// import { useDispatch, useSelector } from "react-redux";
// import { resetFilter } from "../../Slices/FilterSlice";
// import { resetSort } from "../../Slices/SortSlice";

// const Jobs = () => {
//     const dispatch = useDispatch();
//     const [jobList, setJobList] = useState([{}]);
//     const filter = useSelector((state: any) => state.filter);
//     const sort = useSelector((state: any) => state.sort);
//     const [filteredJobs, setFilteredJobs] = useState<any>([]);
//     useEffect(() => {
//         dispatch(resetFilter());
//         dispatch(resetSort());
//         getAllJobs().then((res) => {
//             setJobList(res.filter((job: any) => job.jobStatus == "ACTIVE"));
//         }).catch((err) => console.log(err));
//     }, [])
//     useEffect(() => {
//         if (sort == "Most Recent") {
//             setJobList([...jobList].sort((a: any, b: any) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime()));
//         }
//         else if (sort == "Salary: Low to High") {
//             setJobList([...jobList].sort((a: any, b: any) => a.packageOffered - b.packageOffered));
//         }
//         else if (sort == "Salary: High to Low") {
//             setJobList([...jobList].sort((a: any, b: any) => b.packageOffered - a.packageOffered));
//         }

//     }, [sort])
//     useEffect(() => {
//         let filtered = jobList;
//         if (filter["Job Title"] && filter["Job Title"].length > 0) filtered = filtered.filter((job: any) => filter["Job Title"]?.some((x: any) => job.jobTitle?.toLowerCase().includes(x.toLowerCase())));
//         if (filter.Location && filter.Location.length > 0) filtered = filtered.filter((job: any) => filter.Location?.some((x: any) => job.location?.toLowerCase().includes(x.toLowerCase())));
//         if (filter.Experience && filter.Experience.length > 0) filtered = filtered.filter((job: any) => filter.Experience?.some((x: any) => job.experience?.toLowerCase().includes(x.toLowerCase())));
//         if (filter["Job Type"] && filter["Job Type"].length > 0) filtered = filtered.filter((job: any) => filter["Job Type"]?.some((x: any) => job.jobType?.toLowerCase().includes(x.toLowerCase())));
//         if (filter.salary && filter.salary.length > 0) filtered = filtered.filter((jobs: any) => filter.salary[0] <= jobs.packageOffered && jobs.packageOffered <= filter.salary[1]);
//         setFilteredJobs(filtered);
//     }, [filter, jobList])
//     return <div className="px-5 py-5">
//         <div className="flex justify-between mt-5">
//             <div className="text-2xl font-semibold">Recommended Jobs</div>
//             <Sort sort="job" />
//         </div>
//         <div className="flex mt-10 flex-wrap gap-5">
//             {
//                 filteredJobs.map((job: any, index: any) => <JobCard key={index} {...job} />)
//             }
//         </div>
//     </div>
// }
// export default Jobs;
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { getAllJobs } from "../../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";
import { resetSort } from "../../Slices/SortSlice";
import { Button } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import AllFiltersModal from "./AllFiltersModal";

const Jobs = () => {
    const dispatch = useDispatch();
    const [jobList, setJobList] = useState([{}]);
    const filter = useSelector((state: any) => state.filter);
    const sort = useSelector((state: any) => state.sort);
    const [filteredJobs, setFilteredJobs] = useState<any>([]);
    const [modalOpened, setModalOpened] = useState(false);

    useEffect(() => {
        dispatch(resetFilter());
        dispatch(resetSort());
        getAllJobs().then((res) => {
            setJobList(res.filter((job: any) => job.jobStatus == "ACTIVE"));
        }).catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (sort == "Сначала новые") {
            setJobList([...jobList].sort((a: any, b: any) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime()));
        }
        else if (sort == "Зарплата: по возрастанию") {
            setJobList([...jobList].sort((a: any, b: any) => a.packageOffered - b.packageOffered));
        }
        else if (sort == "Зарплата: по убыванию") {
            setJobList([...jobList].sort((a: any, b: any) => b.packageOffered - a.packageOffered));
        }
    }, [sort]);

    useEffect(() => {
        let filtered = jobList;
        
        // Основные фильтры
        if (filter["Профессия"]?.length > 0) filtered = filtered.filter((job: any) => 
            filter["Профессия"].some((x: any) => job.jobTitle?.toLowerCase().includes(x.toLowerCase())));
        
        if (filter.Город?.length > 0) filtered = filtered.filter((job: any) => 
            filter.Город.some((x: any) => job.location?.toLowerCase().includes(x.toLowerCase())));
        
        if (filter["Опыт работы"]?.length > 0) filtered = filtered.filter((job: any) => 
            filter["Опыт работы"].some((x: any) => job.experience?.toLowerCase().includes(x.toLowerCase())));
        
        if (filter["Формат занятости"]?.length > 0) filtered = filtered.filter((job: any) => 
            filter["Формат занятости"].some((x: any) => job.jobType?.toLowerCase().includes(x.toLowerCase())));
        
        if (filter.salary?.length === 2) filtered = filtered.filter((job: any) => 
            filter.salary[0] <= job.packageOffered && job.packageOffered <= filter.salary[1]);
        
        // Студенческие фильтры
        if (filter["Курс / Степень"]?.length > 0) filtered = filtered.filter((job: any) => 
            job.educationLevel && filter["Курс / Степень"].some((x: any) => 
                job.educationLevel.toLowerCase().includes(x.toLowerCase())));
        
        if (filter["Формат работы"]?.length > 0) filtered = filtered.filter((job: any) => 
            job.workFormat && filter["Формат работы"].some((x: any) => 
                job.workFormat.toLowerCase().includes(x.toLowerCase())));

        if (filter["Академическая совместимость"]?.length > 0) filtered = filtered.filter((job: any) => 
            job.academicCompatibility && filter["Академическая совместимость"].some((x: any) => 
                job.academicCompatibility.some((item: string) => item.toLowerCase().includes(x.toLowerCase()))));

        if (filter["Тип задач"]?.length > 0) filtered = filtered.filter((job: any) => 
            job.taskTypes && filter["Тип задач"].some((x: any) => 
                job.taskTypes.some((task: string) => task.toLowerCase().includes(x.toLowerCase()))));

        if (filter["Поддержка студента"]?.length > 0) filtered = filtered.filter((job: any) => 
            job.studentSupport && filter["Поддержка студента"].some((x: any) => 
                job.studentSupport.some((support: string) => support.toLowerCase().includes(x.toLowerCase()))));

        if (filter["Язык работы"]?.length > 0) filtered = filtered.filter((job: any) => 
            job.workLanguage && filter["Язык работы"].some((x: any) => 
                job.workLanguage.toLowerCase().includes(x.toLowerCase())));

        if (filter["Доступ к оборудованию"]?.length > 0) filtered = filtered.filter((job: any) => 
            job.equipmentAccess && filter["Доступ к оборудованию"].some((x: any) => 
                job.equipmentAccess.toLowerCase().includes(x.toLowerCase())));

        if (filter["Гибкость для учёбы"]?.length > 0) filtered = filtered.filter((job: any) => 
            job.flexibility && filter["Гибкость для учёбы"].some((x: any) => 
                job.flexibility.some((flex: string) => flex.toLowerCase().includes(x.toLowerCase()))));

        if (filter["Длительность"]?.length > 0) filtered = filtered.filter((job: any) => 
            job.duration && filter["Длительность"].some((x: any) => 
                job.duration.toLowerCase().includes(x.toLowerCase())));

        if (filter["Начало"]?.length > 0) filtered = filtered.filter((job: any) => 
            job.startPeriod && filter["Начало"].some((x: any) => 
                job.startPeriod.toLowerCase().includes(x.toLowerCase())));
        
        if (filter.Навыки?.length > 0) filtered = filtered.filter((job: any) => 
            job.skillsRequired && filter.Навыки.some((skill: any) => 
                job.skillsRequired.some((jobSkill: string) => 
                    jobSkill.toLowerCase().includes(skill.toLowerCase()))));
        
        setFilteredJobs(filtered);
    }, [filter, jobList]);

    return (
        <div className="px-5 py-5">
            <div className="flex justify-between mt-5">
                <div className="text-2xl font-semibold">Рекомендуемые вакансии</div>
                <div className="flex gap-3">
                    <Button 
                        variant="outline"
                        className="cursor-pointer border !border-bright-sun-400 flex gap-2 px-2 py-1 !text-sm !font-normal !text-mine-shaft-300 !rounded-xl !items-center"
                        rightSection={<IconFilter className='h-5 w-5 text-bright-sun-400'/>}
                        onClick={() => setModalOpened(true)}
                    >
                        Все фильтры
                    </Button>
                    <Sort sort="job" />
                </div>
            </div>
            
            <AllFiltersModal opened={modalOpened} close={() => setModalOpened(false)} />
            
            <div className="flex mt-10 flex-wrap gap-5">
                {filteredJobs.map((job: any, index: any) => (
                    <JobCard key={index} {...job} />
                ))}
            </div>
        </div>
    );
};

export default Jobs;