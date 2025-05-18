import { Avatar, Button, Indicator } from "@mantine/core";
import { IconAnchor, IconBell, IconSchool, IconSettings } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";
import { setupResponseInterceptor } from "../../Interceptor/AxiosInterceptor";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../Slices/UserSlice";

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const token = useSelector((state: any) => state.jwt);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        setupResponseInterceptor(navigate, dispatch);

    }, [navigate])
    useEffect(() => {
        if (token) {
            if (localStorage.getItem("token")) {
                const decoded = jwtDecode(localStorage.getItem("token") || "");
                dispatch(setUser({ ...decoded, email: decoded.sub }));
            }
        }
        if (user?.profileId) {
            getProfile(user?.profileId).then((res) => {
                dispatch(setProfile(res));
            }).catch((err) => console.log(err))
        }
    }, [token, navigate]);
    return location.pathname != "/signup" && location.pathname != "/login" ? <div className="w-full bg-mine-shaft-950 px-6 text-white h-20 flex justify-between items-center font-['montserrat']">
        <div className="flex gap-1 items-center text-bright-sun-400">
            <IconSchool className="h-8 w-8" stroke={2.5} />
            <div className="text-3xl font-semibold">StudJob</div>
        </div>
        {<NavLinks />}
        <div className="flex gap-3 items-center">
            {user ? <ProfileMenu /> : <Link to="/login">
                <Button variant="subtle" color="brightSun.4">Войти</Button>
            </Link>}
            {/* <div className=" bg-mine-shaft-900 p-1.5 rounded-full">
                <IconSettings stroke={1.5} />  
            </div> */}
            {user ? <NotiMenu /> : <></>}
        </div>
    </div> : <></>
}
export default Header;
