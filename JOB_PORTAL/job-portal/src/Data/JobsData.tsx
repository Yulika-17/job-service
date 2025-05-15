import { IconBriefcase, IconBuilding, IconCalendar, IconCalendarClock, IconCertificate, IconClock, IconDeviceLaptop, IconLanguage, IconLighter, IconListCheck, IconMapPin, IconRecharging, IconSchool, IconSearch, IconTools } from "@tabler/icons-react";

    // { title: "Job Title", icon: IconSearch, options: ['Designer', 'Developer', 'Product Manager', 'Marketing Specialist', 'Data Analyst', 'Sales Executive', 'Content Writer', 'Customer Support'] },
    // { title: "Location", icon: IconMapPin, options: ['Delhi', 'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto'] },
    // { title: "Experience", icon: IconBriefcase, options: ['Entry Level', 'Intermediate', 'Expert'] },
    // { title: "Job Type", icon: IconRecharging, options: ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship'] }
const dropdownData = [
  { title: "Профессия", icon: IconSearch, options: ['Разработчик', 'Дизайнер', 'Маркетолог', 'Продакт-менеджер', 'Data Analyst', 'Контент-мейкер', 'HR', 'Исследователь'] },
  { title: "Город", icon: IconMapPin, options: ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Онлайн', 'Другое'] },
  { title: "Опыт работы", icon: IconBriefcase, options: ['Начальный уровень', 'Средний уровень', 'Эксперт'] },
  { title: "Формат занятости", icon: IconRecharging, options: ['Полная', 'Частичная', 'Стажировка', 'Практика', 'Волонтёрство', 'Подработка', 'Гибкий график', 'Только на каникулах'] }
];

export const studentFilters = [
  { title: "Профессия", icon: IconSearch, options: ['Разработчик', 'Дизайнер', 'Маркетолог', 'Продакт-менеджер', 'Data Analyst', 'Контент-мейкер', 'HR', 'Исследователь'] },
  { title: "Город", icon: IconMapPin, options: ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Онлайн', 'Другое'] },
  { title: "Опыт работы", icon: IconBriefcase, options: ['Начальный уровень', 'Средний уровень', 'Эксперт'] },
  { title: "Формат занятости", icon: IconRecharging, options: ['Полная', 'Частичная', 'Стажировка', 'Практика', 'Волонтёрство', 'Подработка', 'Гибкий график', 'Только на каникулах'] },
  { title: "Формат работы", icon: IconDeviceLaptop, options: ['Офис', 'Удалёнка', 'Гибрид'] },
  { title: "Курс / Степень", icon: IconSchool, options: ['Бакалавриат', 'Магистратура', 'Аспирантура'] },
  { title: "Навыки", icon: IconTools, options: ['JavaScript', 'Python', 'Excel', 'Figma', 'SQL', 'UI/UX Design', 'Командная работа', 'C++', 'Английский язык'] },
  { title: "Академическая совместимость", icon: IconCertificate, options: ['Можно зачесть как практику', 'Можно использовать в дипломе', 'Требуется портфолио'] },
  { title: "Тип задач", icon: IconListCheck, options: ['Учебные задачи', 'Реальные задачи', 'Исследовательские', 'Проектная работа', 'С ментором'] },
  { title: "Поддержка студента", icon: IconLighter, options: ['Есть ментор', 'Есть обучение', 'Есть карьерный трек', 'Куратор из вуза'] },
  { title: "Язык работы", icon: IconLanguage, options: ['Русский', 'Английский', 'Неважно'] },
  { title: "Доступ к оборудованию", icon: IconDeviceLaptop, options: ['Выдают технику', 'Нужен свой ноутбук', 'Оборудование не требуется'] },
  { title: "Гибкость для учёбы", icon: IconClock, options: ['Гибкий график', 'Только на каникулах', 'Можно совмещать с парами'] },
  { title: "Длительность", icon: IconCalendar, options: ['< 1 месяца', '1–3 месяца', '> 3 месяцев'] },
  { title: "Начало", icon: IconCalendarClock, options: ['Июнь', 'Июль', 'Август', 'Сентябрь', 'Гибко'] }
];

// Фильтр для работы в университете, который можно добавить, если требуется:
const universityWorkFilter = {
  title: "Тип работы в университете",
  icon: IconBuilding,
  options: ['Ассистент преподавателя', 'Научный проект', 'Лаборантская работа', 'Организационная работа', 'Другое']
};

const jobList = [
    {
      jobTitle: "Product Designer",
      company: "Meta",
      applicants: 25,
      experience: "Entry Level",
      jobType: "Full-Time",
      location: "New York",
      package: "32 LPA",
      postedDaysAgo: 12,
      description: "Meta is seeking a Product Designer to join our team. You'll be working on designing user-centric interfaces for our blockchain wallet platform. This is an excellent opportunity for entry-level designers to grow their skills in a dynamic environment."
    },
    {
      jobTitle: "Sr. UX Designer",
      company: "Netflix",
      applicants: 14,
      experience: "Expert",
      jobType: "Part-Time",
      location: "San Francisco",
      package: "40 LPA",
      postedDaysAgo: 5,
      description: "Netflix is looking for a Sr. UX Designer to enhance our user experience on streaming platforms. Ideal candidates will have extensive experience in user research and interaction design, helping us to deliver engaging content to our global audience."
    },
    {
      jobTitle: "Product Designer",
      company: "Microsoft",
      applicants: 58,
      experience: "Intermediate",
      jobType: "Full-Time",
      location: "Remote",
      package: "35 LPA",
      postedDaysAgo: 4,
      description: "Join Microsoft as a Product Designer and contribute to our new Lightspeed LA studio. We're looking for designers who can create intuitive and compelling gaming experiences. This is a remote position, offering flexibility and the opportunity to work with a leading technology company."
    },
    {
      jobTitle: "Product Designer",
      company: "Adobe",
      applicants: 23,
      experience: "Expert",
      jobType: "Part-Time",
      location: "Toronto",
      package: "33 LPA",
      postedDaysAgo: 22,
      description: "Adobe is seeking a part-time Product Designer to help us enhance our user experience. You will work closely with our team to design features that make our platform more engaging and user-friendly. This role is perfect for experienced designers looking for flexible work hours."
    },
    {
      jobTitle: "Backend Developer",
      company: "Google",
      applicants: 21,
      experience: "Entry Level",
      jobType: "Full-Time",
      location: "Bangalore",
      package: "38 LPA",
      postedDaysAgo: 8,
      description: "Google is hiring a Backend Developer to join our team in Bangalore. You'll be responsible for developing scalable backend systems that power our services. This role requires strong problem-solving skills and experience with modern backend technologies."
    },
    {
      jobTitle: "SMM Manager",
      company: "Spotify",
      applicants: 73,
      experience: "Intermediate",
      jobType: "Full-Time",
      location: "Delhi",
      package: "34 LPA",
      postedDaysAgo: 8,
      description: "Spotify is looking for an SMM Manager to lead our social media marketing efforts in Delhi. You will create and manage campaigns to promote our music streaming service, engage with our audience, and drive growth. This role is ideal for creative marketers with a passion for music."
    },
    {
      jobTitle: "Frontend Developer",
      company: "Amazon",
      applicants: 50,
      experience: "Intermediate",
      jobType: "Full-Time",
      location: "Seattle",
      package: "36 LPA",
      postedDaysAgo: 10,
      description: "Amazon is looking for a Frontend Developer to build and maintain our customer-facing applications. You will work with a dynamic team to create seamless and responsive web applications."
    },
    {
      jobTitle: "iOS Developer",
      company: "Apple",
      applicants: 30,
      experience: "Expert",
      jobType: "Full-Time",
      location: "Cupertino",
      package: "42 LPA",
      postedDaysAgo: 7,
      description: "Apple is seeking an iOS Developer to join our team in Cupertino. You will work on developing cutting-edge applications for iOS devices, ensuring high performance and an exceptional user experience."
    }
  ];

  export {dropdownData,jobList};