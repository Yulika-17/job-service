import { IconHeart, IconMapPin } from "@tabler/icons-react";
import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import { successNotification, errorNotification } from "../../Services/NotificationService";
import { verifyProfile } from "../../Services/ProfileService";

const VerTalentCard = (props: any) => {
    // Проверяем, был ли профиль отклонен или принят ранее
    const isRejected = localStorage.getItem(`rejectedProfile-${props.id}`);
    const isVerified = localStorage.getItem(`verifiedProfile-${props.id}`);

    const handleVerification = (type: "ACCEPT" | "REJECT") => {
        if (type === "ACCEPT") {
            verifyProfile(props.id).then(() => {
                // Сохраняем ID проверенного профиля в localStorage
                localStorage.setItem(`verifiedProfile-${props.id}`, "true");
                successNotification("Verified", "Profile has been verified");
                window.location.reload();
            }).catch((err) => {
                errorNotification("Error", err.response?.data?.errorMessage || "Failed to verify");
            });
        } else {
            // Сохраняем ID отклоненного профиля в localStorage
            localStorage.setItem(`rejectedProfile-${props.id}`, "true");
            successNotification("Rejected", "Profile has been rejected");
            window.location.reload();  // Перезагружаем страницу, чтобы обновить состояние
        }
    };

    // Если профиль был отклонен или принят, не рендерим его на текущей странице
    if (isRejected || isVerified) return null;

    return (
        <div className="p-4 rounded-xl bg-mine-shaft-900 hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 transition duration-300 ease-in-out w-96 sm-mx:w-full flex flex-col gap-3">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-800 rounded-full">
                        <Avatar
                            className="rounded-full"
                            size="lg"
                            src={props.picture ? `data:image/jpeg;base64,${props.picture}` : "/Avatar.png"}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold text-lg">{props.name}</div>
                        <div className="text-sm text-mine-shaft-300">
                            {props.jobTitle} &bull; {props.university}
                        </div>
                    </div>
                </div>
                <IconHeart className="cursor-pointer text-mine-shaft-300" stroke={1.5} />
            </div>

            <div className="flex gap-2">
                {props.skills?.slice(0, 4).map((skill: any, index: number) => (
                    <div key={index} className="p-2 py-1 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs">
                        {skill}
                    </div>
                ))}
            </div>

            <div>
                <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
                    {props.about}
                </Text>
            </div>

            <Divider color="mineShaft.7" size="xs" />

            <div className="flex justify-between">
                <div className="text-mine-shaft-300">Exp: {props.totalExp ? props.totalExp : 1} Years</div>
                <div className="text-xs flex gap-1 items-center text-mine-shaft-400">
                    <IconMapPin className="h-5 w-5" stroke={1.5} /> {props.location}
                </div>
            </div>

            <Divider color="mineShaft.7" size="xs" />

            <div className="flex [&>*]:w-1/2 [&>*]:p-1">
                <div>
                    <Button color="brightSun.4" variant="outline" fullWidth onClick={() => handleVerification("ACCEPT")}>
                        Accept
                    </Button>
                </div>
                <div>
                    <Button color="brightSun.4" variant="light" fullWidth onClick={() => handleVerification("REJECT")}>
                        Reject
                    </Button>
                </div>
            </div>
            <Link to={`/talent-profile/${props.id}`}>
                <Button color="brightSun.4" variant="filled" autoContrast fullWidth>
                    Profile
                </Button>
            </Link>
        </div>
    );
};

export default VerTalentCard;
