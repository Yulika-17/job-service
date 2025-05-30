import { useParams } from "react-router-dom";
import JobCard from "../FindJobs/JobCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";

const RecommendedJob=()=>{
    const [jobList, setJobList] = useState<any>(null);
    const {id}=useParams();
    useEffect(()=>{
        getAllJobs().then((res)=>{
            setJobList(res);
        }).catch((err)=>console.log(err));
    }, [])
    return <div>
        <div className="text-xl font-semibold mb-5">Рекомендуемые вакансии</div>
        <div className="flex flex-col flex-wrap gap-5 justify-between">
            {
                jobList?.map((job:any, index:number) =>index<6 && id!=job.id && <JobCard key={index} {...job} />)
            }
        </div>
    </div>
}
export default RecommendedJob;