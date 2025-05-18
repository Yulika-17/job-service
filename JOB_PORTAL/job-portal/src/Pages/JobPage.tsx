import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import Job from "../Components/JobDesc/Job";
import RecommendedJob from "../Components/JobDesc/RecommendedJob";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const JobPage = () => {
    const {id}=useParams();
    const [job, setJob] = useState<any>(null);
    useEffect(()=>{
        window.scrollTo(0,0);
        getJob(id).then((res)=>{
            setJob(res);
        }).catch((err)=>{
            console.log(err);
        })
    },[id])
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['montserrat'] p-4">
            <Divider size="xs" />
            <Link className="my-5 inline-block" to="/find-jobs">
                <Button leftSection={<IconArrowLeft size={20}/>} color="brightSun.4" variant="light" >Назад</Button>
            </Link>
            <div className="flex gap-5 justify-around">
                <Job {...job}/>
                <RecommendedJob/>
            </div>
        </div>
    )
}
export default JobPage;