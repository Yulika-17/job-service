import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled, IconMapPin } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { card } from "../../Data/JobDescData";
//@ts-ignore
import DOMPurify from 'dompurify';
import { timeAgo } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { useEffect, useState } from "react";
import { postJob } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";

// const JobDesc = (props: any) => {
//     const dispatch = useDispatch();
//     const [applied, setApplied] = useState(false);
//     const profile = useSelector((state: any) => state.profile);
//     const user = useSelector((state: any) => state.user);
//     const handleSaveJob = () => {
//         let savedJobs: any = profile.savedJobs ? [...profile.savedJobs] : [];
//         if (savedJobs?.includes(props.id)) {
//             savedJobs = savedJobs?.filter((id: any) => id !== props.id);
//         } else {
//             savedJobs = [...savedJobs, props.id];
//         }
//         let updatedProfile = { ...profile, savedJobs: savedJobs };
//         dispatch(changeProfile(updatedProfile));
//     }
//     useEffect(() => {
//         if (props.applicants?.filter((applicant: any) => applicant.applicantId == user.id).length > 0) {
//             setApplied(true);
//         }
//         else setApplied(false);
//     }, [props])
//     const handleClose = () => {
//         postJob({ ...props, jobStatus: "CLOSED" }).then((res) => {
//             successNotification('Job Closed', 'Job has been closed successfully');
//         }).catch((err) => {
//             errorNotification("Error", err.response.data.errorMessage);
//         })
//     }
//     const data = DOMPurify.sanitize(props.description);
//     return <div className="w-2/3">
//         <div className="flex justify-between">
//             <div className="flex gap-2 items-center">
//                 <div className="p-3 bg-mine-shaft-800 rounded-xl">
//                     <img className="h-14" src={`/Icons/${props.company}.png`} alt="" />
//                 </div>
//                 <div className="flex flex-col gap-1">
//                     <div className="font-semibold text-2xl">{props.jobTitle}</div>
//                     <div className="text-lg text-mine-shaft-300">{props.company} &bull; {timeAgo(props.postTime)} &bull; {props.applicants ? props.applicants.length : 0} Applicants</div>
//                 </div>
//             </div>
//             <div className="flex flex-col gap-2 items-center">
//                 {(props.edit || !applied) && <Link to={props.edit?`/post-job/${props.id}`:`/apply-job/${props.id}`}>
//                     <Button color="brightSun.4" size="sm" variant="light">{props.closed ? "Reopen" : props.edit ? "Edit" : "Apply"}</Button>
//                 </Link>}
//                 {
//                     !props.edit && applied && <Button color="green.8" size="sm" variant="light">Applied</Button>
//                 }
//                 {props.edit && !props.closed ? <Button color="red.4" onClick={handleClose} size="sm" variant="outline">Close</Button> : profile.savedJobs?.includes(props.id) ? <IconBookmarkFilled onClick={handleSaveJob} className="cursor-pointer text-bright-sun-400" stroke={1.5} /> : <IconBookmark onClick={handleSaveJob} className="cursor-pointer hover:text-bright-sun-400 text-mine-shaft-300" stroke={1.5} />}
//             </div>
//         </div>
//         <Divider my="xl" />
//         <div className="flex justify-between">
//             {
//                 card.map((item: any, index: number) => <div key={index} className="flex flex-col items-center gap-1">
//                     <ActionIcon color="brightSun.4" className="!h-12 !w-12" variant="light" radius="xl" aria-label="Settings">
//                         <item.icon className="h-4/5 w-4/5" stroke={1.5} />
//                     </ActionIcon>
//                     <div className="text-sm text-mine-shaft-300">{item.name}</div>
//                     <div className="font-semibold">{props ? props[item.id] : "NA"} {item.id == "packageOffered" && <>LPA</>}</div>
//                 </div>)
//             }
//         </div>
//         <Divider my="xl" />
//         <div>
//             <div className="text-xl font-semibold mb-5">Required Skills</div>
//             <div className="flex flex-wrap gap-2">
//                 {
//                     props?.skillsRequired?.map((skill: any, index: number) => <ActionIcon key={index} color="brightSun.4" className="!h-fit font-medium !text-sm !w-fit" variant="light" p="xs" radius="xl" aria-label="Settings">{skill}
//                     </ActionIcon>)
//                 }
//             </div>
//         </div>
//         <Divider my="xl" />
//         <div className="[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify" dangerouslySetInnerHTML={{ __html: data }}>
//         </div>
//         <Divider my="xl" />
//         <div>
//             <div className="text-xl font-semibold mb-5">About Company</div>
//             <div className="flex justify-between mb-3">
//                 <div className="flex gap-2 items-center">
//                     <div className="p-3 bg-mine-shaft-800 rounded-xl">
//                         <img className="h-8" src={`/Icons/${props.company}.png`} alt="" />
//                     </div>
//                     <div className="flex flex-col">
//                         <div className="font-medium text-lg">{props.company}</div>
//                         <div className="text-mine-shaft-300">10K+ Employees</div>
//                     </div>
//                 </div>
//                 <Link to={`/company/${props.company}`}>
//                     <Button color="brightSun.4" variant="light">Company Page</Button>
//                 </Link>
//             </div>
//             <div className="text-mine-shaft-300 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. A esse laboriosam explicabo aspernatur quibusdam modi tempora architecto alias deleniti illum magnam voluptate amet exercitationem animi, maxime nihil eaque, doloremque iure similique error perferendis natus expedita! Temporibus iste est error doloremque!</div>
//         </div>
//     </div>
// }
// export default JobDesc;
const JobDesc = (props: any) => {
    const dispatch = useDispatch();
    const [applied, setApplied] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const user = useSelector((state: any) => state.user);
    const iconCards = card.slice(0, 4);
    const tagCards = card.slice(4);
    const handleSaveJob = () => {
        let savedJobs: any = profile.savedJobs ? [...profile.savedJobs] : [];
        if (savedJobs?.includes(props.id)) {
            savedJobs = savedJobs?.filter((id: any) => id !== props.id);
        } else {
            savedJobs = [...savedJobs, props.id];
        }
        let updatedProfile = { ...profile, savedJobs: savedJobs };
        dispatch(changeProfile(updatedProfile));
    };

    useEffect(() => {
        if (props.applicants?.filter((applicant: any) => applicant.applicantId == user.id).length > 0) {
            setApplied(true);
        } else setApplied(false);
    }, [props]);

    const handleClose = () => {
        postJob({ ...props, jobStatus: "CLOSED" }).then((res) => {
            successNotification('Вакансия закрыта', 'Вакансия была успешно закрыта.');
        }).catch((err) => {
            errorNotification("Ошибка", err.response.data.errorMessage);
        });
    };

    const data = DOMPurify.sanitize(props.description);

    return (
        <div className="w-2/3">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-3 bg-mine-shaft-800 rounded-xl">
                        <img className="h-14" src={`/Icons/${props.company}.png`} alt="" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold text-2xl">{props.jobTitle}</div>
                        <div className="text-lg text-mine-shaft-300">{props.company} &bull; {timeAgo(props.postTime)} &bull; {props.applicants ? props.applicants.length : 0} студентов</div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    {(props.edit || !applied) && <Link to={props.edit ? `/post-job/${props.id}` : `/apply-job/${props.id}`}>
                        <Button color="brightSun.4" size="sm" variant="light">{props.closed ? "Повторно открыть" : props.edit ? "Редактировать" : "Откликнуться"}</Button>
                    </Link>}
                    {!props.edit && applied && <Button color="green.8" size="sm" variant="light">Откликнулся»</Button>}
                    {props.edit && !props.closed ? <Button color="red.4" onClick={handleClose} size="sm" variant="outline">Закрыть</Button> : profile.savedJobs?.includes(props.id) ? <IconBookmarkFilled onClick={handleSaveJob} className="cursor-pointer text-bright-sun-400" stroke={1.5} /> : <IconBookmark onClick={handleSaveJob} className="cursor-pointer hover:text-bright-sun-400 text-mine-shaft-300" stroke={1.5} />}
                </div>
            </div>
            <Divider my="xl" />
            {/* Первые четыре — иконки */}
            <div className="grid grid-cols-4 gap-6">
                {iconCards.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col items-center gap-1">
                        <ActionIcon color="brightSun.4" className="!h-12 !w-12" variant="light" radius="xl" aria-label={item.name}>
                            <item.icon className="h-4/5 w-4/5" stroke={1.5} />
                        </ActionIcon>
                        <div className="text-sm text-mine-shaft-300 text-center">{item.name}</div>
                        <div className="font-semibold text-center">
                            {Array.isArray(props[item.id])
                                ? props[item.id].join(", ")
                                : props[item.id] || "—"} {item.id === "packageOffered" && "тыс."}
                        </div>
                    </div>
                ))}
            </div>

            <Divider my="xl" />

            {/* Остальные — как теги */}
            <div className="flex flex-wrap gap-3">
                {tagCards.map((item: any, index: number) => {
                    const value = Array.isArray(props[item.id]) ? props[item.id].join(", ") : props[item.id];
                    return value ? (
                        <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-mine-shaft-800 text-sm text-mine-shaft-200">
                            <item.icon className="h-4 w-4 text-bright-sun-400" stroke={1.5} />
                            <span className="font-medium">{value}</span>
                        </div>
                    ) : null;
                })}
            </div>
            <Divider my="xl" />
            <div>
                <div className="text-xl font-semibold mb-5">Необходимые навыки</div>
                <div className="flex flex-wrap gap-2">
                    {
                        props?.skillsRequired?.map((skill: any, index: number) => <ActionIcon key={index} color="brightSun.4" className="!h-fit font-medium !text-sm !w-fit" variant="light" p="xs" radius="xl" aria-label="Settings">{skill}
                        </ActionIcon>)
                    }
                </div>
            </div>
            <Divider my="xl" />
            <div className="[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify" dangerouslySetInnerHTML={{ __html: data }}>
            </div>
            <Divider my="xl" />
            <div>
                <div className="text-xl font-semibold mb-5">О компании</div>
                <div className="flex justify-between mb-3">
                    <div className="flex gap-2 items-center">
                        <div className="p-3 bg-mine-shaft-800 rounded-xl">
                            <img className="h-8" src={`/Icons/${props.company}.png`} alt="" />
                        </div>
                        <div className="flex flex-col">
                            <div className="font-medium text-lg">{props.company}</div>
                            <div className="text-mine-shaft-300">10 тыс.+ сотрудников</div>
                        </div>
                    </div>
                    <Link to={`/company/${props.company}`}>
                        <Button color="brightSun.4" variant="light">Страница компании</Button>
                    </Link>
                </div>
                <div className="text-mine-shaft-300 text-justify">Наша компания занимается разработкой современных цифровых решений для бизнеса. Мы стремимся создавать качественные продукты, которые упрощают жизнь пользователям и помогают клиентам достигать своих целей. Команда состоит из опытных специалистов, ориентированных на инновации, результат и рост.</div>
            </div>
        </div>
    );
};
export default JobDesc;
