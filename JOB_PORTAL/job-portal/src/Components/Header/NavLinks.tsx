// import { Link, useLocation } from "react-router-dom";

// const NavLinks = () => {

//     const links = [
//         { name: "Вакансии", url: "find-jobs" },
//         { name: "Студенты", url: "find-talent" },
//         { name: "Разместить вакансию", url: "post-job/0" },
//         { name: "Мои вакансии", url: "posted-jobs/0" },
//         { name: "Отклики", url: "job-history" },
//         { name: "Проверка студентов", url: "verify-talent" },
//         { name: "Аналитика", url: "/university/:name" }
//     ]
//     const location = useLocation();
//     return <div className="flex bs-mx:!hidden gap-5 text-mine-shaft-300 h-full items-center">
//         {
//             links.map((link, index) => <div key={index} className={`${location.pathname == "/" + link.url ? "border-bright-sun-400 text-bright-sun-400" : "border-transparent"} border-t-[3px] h-full flex items-center`}>
//                 <Link className="hover:text-mine-shaft-200 " key={index} to={link.url} >{link.name}</Link>
//             </div>)

//         }
//     </div>
// }
// export default NavLinks;
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavLinks = () => {
    const user = useSelector((state: any) => state.user);
    const location = useLocation();

    // Определение ролей пользователя
    const isEmployer = user?.accountType === 'EMPLOYER';
    const isApplicant = user?.accountType === 'APPLICANT';
    const isUniversity = user?.accountType === 'UNIVERSITY';

    // Навигационные ссылки для разных типов аккаунтов
    const links = [
        ...(isApplicant ? [
            { name: "Вакансии", url: "find-jobs" },
            { name: "Мои отклики", url: "job-history" }
        ] : []),
        ...(isEmployer ? [
            { name: "Студенты", url: "find-talent" },
            { name: "Разместить вакансию", url: "post-job/0" },
            { name: "Мои вакансии", url: "posted-jobs/0" }
        ] : []),
        ...(isUniversity ? [
            { name: "Проверка студентов", url: "verify-talent" },
            { name: "Аналитика", url: "/university/:name" }
        ] : [])
    ];

    return (
        <div className="flex bs-mx:!hidden gap-5 text-mine-shaft-300 h-full items-center">
            {links.map((link, index) => (
                <div
                    key={index}
                    className={`${location.pathname === "/" + link.url ? "border-bright-sun-400 text-bright-sun-400" : "border-transparent"} border-t-[3px] h-full flex items-center`}
                >
                    <Link className="hover:text-mine-shaft-200" to={link.url}>
                        {link.name}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default NavLinks;
