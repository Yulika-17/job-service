import { IconBriefcase, IconCalendar, IconCalendarClock, IconCertificate, IconClock, IconDeviceLaptop, IconHelpCircle, IconLanguage, IconLighter, IconListCheck, IconMapPin, IconPremiumRights, IconRecharging, IconSchool, IconTools } from "@tabler/icons-react"

const card = [
    { name: "Город", icon: IconMapPin, value: "New York", id: "location" },
    { name: "Опыт работы", icon: IconBriefcase, value: "Expert", id: "experience" },
    { name: "Заработная плата", icon: IconPremiumRights, value: "48 LPA", id: "packageOffered" },
    { name: "Тип занятости", icon: IconRecharging, value: "Full Time", id: "jobType" },

    { name: "Work Format", icon: IconDeviceLaptop, value: "Office", id: "workFormat" },
    { name: "Education Level", icon: IconSchool, value: "Master's", id: "educationLevel" },
    { name: "Academic Compatibility", icon: IconCertificate, value: "Can be counted as practice", id: "academicCompatibility" },
    { name: "Task Types", icon: IconListCheck, value: "Real Tasks", id: "taskTypes" },
    { name: "Student Support", icon: IconHelpCircle, value: "Has Mentor", id: "studentSupport" },
    { name: "Work Language", icon: IconLanguage, value: "Russian", id: "workLanguage" },
    { name: "Equipment Access", icon: IconDeviceLaptop, value: "Provide Equipment", id: "equipmentAccess" },
    { name: "Flexibility", icon: IconClock, value: "Flexible Schedule", id: "flexibility" },
    { name: "Duration", icon: IconCalendar, value: "1-3 months", id: "duration" },
    { name: "Start Period", icon: IconCalendarClock, value: "Flexible", id: "startPeriod" }

]
const skills = ['React', 'Spring Boot', 'Java', 'Python', 'Node.js', 'MongoDB', 'Express', 'Django', 'PostgreSQL']
const desc = "<h4>About The Job</h4><p>Here at UIHUT, we are a passionate, fun-loving, growing team. We are looking for passionate programmers who want to solve technical challenges and learn and incorporate new technologies into their skillset to join our team and grow with us. In this role, you would use various tech stacks, including Laravel, Node JS (Adonis JS), Vue JS, React JS, Nuxt JS, Redis, MySQL, MongoDB, and CSS. You will be engaged across the software development life cycle to create and modify platforms and capabilities in a collaborative and agile environment.</p><h4>Responsibilities</h4><ul><li>Design, build, test, and deploy software applications and features</li><li>Carry software products through the software development life cycle (SDLC)</li><li>Write clean, concise, and efficient code</li><li>Manage code documentation and version control</li><li>Troubleshoot and debug software</li><li>Participate in on-call rotation to respond to production issues</li></ul><h4>Qualifications and Skill Sets</h4><ul><li>3+ years of professional experience working on this field</li><li>Bachelor's degree in computer science, software engineering, or related field</li><li>Proficiency in at least one programming language (e.g., Java, C#, C++)</li><li>Back-end development expertise</li><li>Strong problem-solving and communication skills</li><li>Experience with build tools such as Gradle and Maven</li><li>Good working knowledge of the Linux operating system</li></ul>"

export { card, skills, desc };