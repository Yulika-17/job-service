import { Badge, Tabs } from "@mantine/core";
import TalentCard from "../FindTalent/TalentCard";
import Job from "../JobDesc/Job";
import { useEffect, useState } from "react";

const PostedJobDesc = (props: any) => {
    const [tab, setTab] = useState("overview");
    const [arr, setArr] = useState<any>([]);
    const handleTabChange=(value:any)=>{
        setTab(value);
        if(value=="applicants")setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="APPLIED"));
        else if(value=="invited")setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="INTERVIEWING"));
        else if(value=="offered")setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="OFFERED"));
        else if(value=="rejected")setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="REJECTED"));
    }
    useEffect(()=>{
        handleTabChange("overview");
    }, [props]);
    return <div className="mt-5 w-3/4 px-5">
        {props.jobTitle ? <><div className="text-2xl font-semibold flex items-center">{props.jobTitle} <Badge variant="light" ml="sm" color="brightSun.4" size="sm">{props.jobStatus}</Badge></div>
            <div className="font-medium text-mine-shaft-300 mb-5">{props.location}</div>
            <div>
                <Tabs variant="outline" autoContrast radius="lg" value={tab} onChange={handleTabChange}>
                    <Tabs.List className="[&_button]:!text-xl font-semibold mb-5 [&_button[data-active='true']]:!border-b-mine-shaft-950 [&_button[data-active='true']]:text-bright-sun-400">
                        <Tabs.Tab value="overview">Обзор</Tabs.Tab>
                        <Tabs.Tab value="applicants">Кандидаты</Tabs.Tab>
                        <Tabs.Tab value="invited">Приглашённые</Tabs.Tab>
                        <Tabs.Tab value="offered">Предложения</Tabs.Tab>
                        <Tabs.Tab value="rejected">Отклонённые</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="overview" className="[&>div]:w-full">
                        <Job {...props} edit={true} closed={props.jobStatus == "CLOSED"} />
                    </Tabs.Panel>
                    <Tabs.Panel value="applicants">
                        <div className="flex mt-10 flex-wrap gap-5 justify-around">
                            {
                                arr?.length?arr.map((talent: any, index: any) => <TalentCard key={index} {...talent} posted={true} />):"Кандидатов пока нет"
                            }
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value="invited">
                        <div className="flex mt-10 flex-wrap gap-5 justify-around">
                            {
                                arr?.length?arr.map((talent: any, index: any) => <TalentCard key={index} {...talent} invited={true} />):"Приглашённых пока нет"
                            }
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value="offered">
                        <div className="flex mt-10 flex-wrap gap-5 justify-around">
                            {
                                arr?.length?arr.map((talent: any, index: any) => <TalentCard key={index} {...talent} offered />):"Предложений пока нет"
                            }
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value="rejected">
                        <div className="flex mt-10 flex-wrap gap-5 justify-around">
                            {
                                arr?.length?arr.map((talent: any, index: any) => <TalentCard key={index} {...talent} offered />):"Отклонённых пока нет"
                            }
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </> : <div className="text-2xl font-semibold flex min-h-[70vh] justify-center items-center">Вакансия не выбрана</div>}
    </div>
}
export default PostedJobDesc;