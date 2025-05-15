import { Divider } from "@mantine/core";
import PostedJob from "../Components/PostedJob/PostedJob";
import PostedJobDesc from "../Components/PostedJob/PostedJobDesc";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobsPostedBy } from "../Services/JobService";

const PostedJobPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector((state: any) => state.user);
    const [jobList, setJobList] = useState<any[]>([]);
    const [job, setJob] = useState<any>({});
    useEffect(()=>{
        window.scrollTo(0,0);
        getJobsPostedBy(user.id).then((res)=>{
            setJobList(res);
            if(res && res.length>0 && Number(id)==0) navigate(`/posted-jobs/${res[0].id}`);
            setJob(res.find((item:any)=>item.id==id));
        }).catch((err)=>{
            console.log(err);
        })
    }, [id])
    return <div className="min-h-[90vh] bg-mine-shaft-950 font-['montserrat'] px-4">
        <Divider size="xs" />
        <div className="flex gap-5">
            <PostedJob job={job} jobList={jobList} />
            <PostedJobDesc {...job}/>
        </div>
    </div>
}
export default PostedJobPage;