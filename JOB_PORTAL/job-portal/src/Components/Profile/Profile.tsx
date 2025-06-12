// import { Avatar, Divider, FileInput, Overlay } from "@mantine/core";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getProfile } from "../../Services/ProfileService";
// import Info from "./Info";
// import { changeProfile, setProfile } from "../../Slices/ProfileSlice";
// import About from "./About";
// import Skills from "./Skills";
// import Experience from "./Experience";
// import Certification from "./Certifications";
// import { useHover } from "@mantine/hooks";
// import { IconEdit } from "@tabler/icons-react";
// import { successNotification } from "../../Services/NotificationService";
// import { getBase64 } from "../../Services/Utilities";

// const Profile = () => {
//     const dispatch = useDispatch();
//     const profile = useSelector((state: any) => state.profile);
//     const { hovered, ref } = useHover();
//     const handleFileChange = async (image: any) => {
//         let picture: any = await getBase64(image);
//         let updatedProfile = { ...profile, picture: picture.split(',')[1] };
//         dispatch(changeProfile(updatedProfile));
//         successNotification("Успех", "Фотография профиля успешно обновлена");
//     };
//     return <div className="w-4/5 mx-auto">
//         <div className="" >
//             <div className="relative">
//                 <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
//                 <div ref={ref} className="absolute flex items-center justify-center -bottom-1/3 left-3">
//                     <Avatar className="!w-48 !h-48 rounded-full border-mine-shaft-950 border-8" src={profile.picture?`data:image/jpeg;base64,${profile.picture}`:'/avatar.png'} alt="" />
//                     {hovered && <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.75} />}
//                     {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16" />}
//                     {hovered && <FileInput onChange={handleFileChange} className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full w-full !h-full" variant="unstyled" accept="image/png,image/jpeg" />}
//                 </div>
//             </div>
//             <div className="px-3 mt-16">
//                 <Info />

//                 <Divider my="xl" />
//                 <About />
//                 <Divider my="xl" />
//                 <Skills />
//                 <Divider my="xl" />
//                 <Experience />
//                 <Divider my="xl" />
//                 <Certification />
//             </div>

//         </div>
//     </div>
// }
// export default Profile;
import { Avatar, Divider, FileInput, Overlay, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Services/ProfileService";
import Info from "./Info";
import { changeProfile, setProfile } from "../../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certification from "./Certifications";
import { useHover } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { successNotification } from "../../Services/NotificationService";
import { getBase64 } from "../../Services/Utilities";

const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const { hovered, ref } = useHover();

    // Загрузка фото профиля (уже есть)
    const handleProfilePhotoChange = async (image: any) => {
        let picture: any = await getBase64(image);
        let updatedProfile = { ...profile, picture: picture.split(',')[1] };
        dispatch(changeProfile(updatedProfile));
        successNotification("Успех", "Фотография профиля успешно обновлена");
    };

    // Новый обработчик — загрузка скана студенческого билета
    const handleStudentIdScanChange = async (file: any) => {
        if (!file) return;
        const base64scan: any = await getBase64(file);
        const scanBase64 = base64scan.split(',')[1];
        const updatedProfile = { ...profile, studentIdScan: scanBase64 };
        dispatch(changeProfile(updatedProfile));
        successNotification("Успех", "Скан студенческого билета успешно загружен");
    };

    return (
        <div className="w-4/5 mx-auto">
            <div className="">
                <div className="relative">
                    <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
                    <div ref={ref} className="absolute flex items-center justify-center -bottom-1/3 left-3">
                        <Avatar
                            className="!w-48 !h-48 rounded-full border-mine-shaft-950 border-8"
                            src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : '/avatar.png'}
                            alt=""
                        />
                        {hovered && <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.75} />}
                        {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16" />}
                        {hovered && (
                            <FileInput
                                onChange={handleProfilePhotoChange}
                                className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full w-full !h-full"
                                variant="unstyled"
                                accept="image/png,image/jpeg"
                            />
                        )}
                    </div>
                </div>

                <div className="px-3 mt-16">
                    <Info />

                    <Divider my="xl" />
                    <About />
                    <Divider my="xl" />
                    <Skills />
                    <Divider my="xl" />
                    <Experience />
                    <Divider my="xl" />
                    <Certification />
                </div>
                <div className="mt-8">
                    <h3 className="mb-2 font-semibold">Скан студенческого билета</h3>

                    {/* Показываем скан, если есть */}
                    {profile.studentIdScan ? (
                        <img
                            src={`data:image/jpeg;base64,${profile.studentIdScan}`}
                            alt="Скан студенческого билета"
                            style={{ maxWidth: "300px", borderRadius: "8px" }}
                        />
                    ) : (
                        <div className="text-gray-500">Скан недоступен</div>
                    )}

                    {/* Кнопка загрузки скана */}
                    <FileInput
                        onChange={handleStudentIdScanChange}
                        accept="image/png,image/jpeg"
                        placeholder="Загрузить скан студенческого"
                        mt="md"
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
