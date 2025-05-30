import { Tabs } from "@mantine/core";
import { jobList } from "../../Data/JobsData";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import { useSelector } from "react-redux";

const JobHistory = () => {
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);
    const [activeTab, setActiveTab] = useState<any>('APPLIED');
    const [jobList, setJobList] = useState<any>([]);
    const [showList, setShowList] = useState<any>([]);

    useEffect(() => {
        getAllJobs().then((res) => {
            setJobList(res);
            setShowList(res.filter((job: any) => {
                let found = false;
                job.applicants?.forEach((applicant: any) => {
                    if (applicant.applicantId == user.id && applicant.applicationStatus == "APPLIED") found = true;
                })
                return found;
            }));
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    const handleTabChange = (value: string | null) => {
        if (value == "SAVED") {
            setShowList(jobList.filter((job: any) => profile.savedJobs?.includes(job.id)));
        } else {
            setShowList(jobList.filter((job: any) => {
                let found = false;
                job.applicants?.forEach((applicant: any) => {
                    if (applicant.applicantId == user.id && applicant.applicationStatus == value) found = true;
                })
                return found;
            }));
        }
        setActiveTab(value);
    }
    return <div>
        <div className="text-2xl font-semibold mb-5">История откликов</div>
        <div>
            <Tabs value={activeTab} onChange={handleTabChange} variant="outline" radius="lg" autoContrast>
                <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
                    <Tabs.Tab value="APPLIED">Откликнутые</Tabs.Tab>
                    <Tabs.Tab value="SAVED">Сохранённые</Tabs.Tab>
                    <Tabs.Tab value="OFFERED">Предложенные</Tabs.Tab>
                    <Tabs.Tab value="INTERVIEWING">Собеседования</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value={activeTab} className="[&>div]:w-full">
                    <div className="flex mt-10 flex-wrap gap-5">
                        {
                            showList.map((item: any, index: any) => <Card key={index} {...item} {...{[activeTab.toLowerCase()]:true}} />)
                        }
                    </div>
                </Tabs.Panel>

            </Tabs>
        </div>
    </div>
}
export default JobHistory;