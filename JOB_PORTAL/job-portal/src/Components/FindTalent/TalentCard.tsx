import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react";
import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { DateInput, TimeInput } from "@mantine/dates";
import { useEffect, useRef, useState } from "react";
import { getProfile } from "../../Services/ProfileService";
import { changeAppStatus } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { formatInterviewTime, openPDF } from "../../Services/Utilities";

const TalentCard = (props: any) => {
    const { id } = useParams();
    const ref = useRef<HTMLInputElement>(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<any>(null);
    const [profile, setProfile] = useState<any>({});
    useEffect(() => {
        if (props.applicantId) getProfile(props.applicantId).then((res) => {
            setProfile(res);
        }).catch((err) => {
            console.log(err);
        })
        else setProfile(props);
    }, [props])
    const handleOffer = (status: string) => {
        let interview: any = { id, applicantId: profile?.id, applicationStatus: status };
        if (status == "INTERVIEWING") {
            const [hours, minutes] = time.split(":").map(Number);
            date?.setHours(hours, minutes);
            interview = { ...interview, interviewTime: date };
        }
        changeAppStatus(interview).then((res) => {
            if (status == "INTERVIEWING") successNotification("Собеседование запланировано", "Собеседование успешно запланировано");
            else if (status == "OFFERED") successNotification("Предложение", "Предложение успешно отправлено");
            else successNotification("Отклонено", "Студент отклонён");
            window.location.reload();
        }).catch((err) => {
            console.log(err);
            errorNotification("Ошибка", err.response.data.errorMessage);
        })
    }
    return <div className="p-4 rounded-xl bg-mine-shaft-900   hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400  transition duration-300 ease-in-out w-96 sm-mx:w-full flex flex-col gap-3">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-mine-shaft-800 rounded-full">
                    <Avatar className="rounded-full" size="lg" src={profile?.picture ? `data:image/jpeg;base64,${profile?.picture}` : '/Avatar.png'} />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-semibold text-lg">{props.name}</div>
                    <div className="text-sm text-mine-shaft-300">{profile?.jobTitle} &bull; {profile?.university}</div>

                </div>
            </div>
            <IconHeart className="cursor-pointer text-mine-shaft-300" stroke={1.5} />
        </div>
        <div className="flex gap-2">
            {
                profile?.skills?.map((skill: any, index: any) => index < 4 && <div key={index} className="p-2 py-1 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs">{skill}</div>)
            }
        </div>
        <div>
            <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>{profile?.about}
            </Text>
        </div>
        <Divider color="mineShaft.7" size="xs" />
        {
            props.invited ? <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
                <IconCalendarMonth stroke={1.5} />Собеседование: {formatInterviewTime(props.interviewTime)}
            </div> : <div className="flex justify-between">
                <div className="text-mine-shaft-300">Опыт: {profile?.totalExp ? profile.totalExp : 0} года</div>
                <div className="text-xs flex gap-1 items-center text-mine-shaft-400">
                    <IconMapPin className="h-5 w-5" stroke={1.5} /> {profile?.location}
                </div>
            </div>
        }
        <Divider color="mineShaft.7" size="xs" />
        <div className="flex [&>*]:w-1/2 [&>*]:p-1">
            {
                !props.invited && <>
                    <Link to={`/talent-profile/${profile?.id}`}>
                        <Button color="brightSun.4" variant="outline" fullWidth>Профиль</Button>
                    </Link>

                    <div>
                        {props.posted ? <Button onClick={open} rightSection={<IconCalendarMonth className="w-5 h-5" />} color="brightSun.4" variant="light" fullWidth>Назначить</Button> : <Button color="brightSun.4" variant="light" fullWidth>Сообщение</Button>}
                    </div>
                </>
            }{

                props.invited && <>
                    <div>

                        <Button color="brightSun.4" onClick={() => handleOffer("OFFERED")} variant="outline" fullWidth>Принять</Button>
                    </div>
                    <div>

                        <Button color="brightSun.4" onClick={() => handleOffer("REJECTED")} variant="light" fullWidth>Отклонить</Button>
                    </div>
                </>
            }
        </div>
        {(props.invited || props.posted) && <Button color="brightSun.4" variant="filled" fullWidth onClick={openApp} autoContrast>Просмотр отклика</Button>}
        <Modal opened={opened} onClose={close} title="Запланировать собеседование" centered>
            <div className="flex flex-col gap-4">
                <DateInput value={date} minDate={new Date()} onChange={setDate} label="Дата" placeholder="Введите дату" />
                <TimeInput label="Время" value={time} onChange={(event) => setTime(event.currentTarget.value)} ref={ref} onClick={() => ref.current?.showPicker()} />
                <Button onClick={() => handleOffer("INTERVIEWING")} color="brightSun.4" variant="light" fullWidth>Назначить</Button>
            </div>
        </Modal>
        <Modal opened={app} onClose={closeApp} title="Отклик" centered>
            <div className="flex flex-col gap-4">
                <div>
                    Email: &emsp;<a className="text-bright-sun-400 hover:underline cursor-pointer text-center" href={`mailto:${props.email}`}>{props.email}</a>
                </div>
                <div>
                    Веб-сайт: &emsp;<a target="_blank" className="text-bright-sun-400 hover:underline cursor-pointer text-center" href={props.website}>{props.website}</a>
                </div>
                <div>
                    Резюме: &emsp;<span className="text-bright-sun-400 hover:underline cursor-pointer text-center" onClick={() => openPDF(props.resume)}>{props.name}</span>
                </div>
                <div>
                    Сопроводительное письмо: &emsp;<div>{props.coverLetter}</div>
                </div>
            </div>
        </Modal>
    </div>
}
export default TalentCard;