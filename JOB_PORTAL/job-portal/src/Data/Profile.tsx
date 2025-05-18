import { IconBriefcase,  IconMapPin } from "@tabler/icons-react";

// const fields=[
//     {label:"Job Title",placeholder:"Enter Job Title", options:['Designer', 'Developer', 'Product Manager', 'Marketing Specialist', 'Data Analyst', 'Sales Executive', 'Content Writer', 'Customer Support'], leftSection:IconBriefcase},
//     {label:"Company",placeholder:"Enter Company Name", options:['Google', 'Microsoft', 'Meta', 'Netflix', 'Adobe', 'Facebook', 'Amazon', 'Apple', 'Spotify'], leftSection:IconBriefcase},
//     {label:"Location",placeholder:"Enter Job Location", options:['Delhi', 'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto'], leftSection:IconMapPin}
// ]
const fields = [
  { label: "Должность", placeholder: "Введите должность", options: ["Дизайнер", "Разработчик", "Менеджер продукта", "Маркетолог", "Аналитик данных", "Менеджер по продажам", "Копирайтер", "Специалист поддержки"], leftSection: IconBriefcase },
  { label: "Компания", placeholder: "Введите название компании", options: ["Яндекс", "Mail.ru", "Сбер", "Тинькофф", "Ozon", "Росатом", "МТС", "VK", "Касперский"], leftSection: IconBriefcase },
  { label: "Город", placeholder: "Введите город работы", options: ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань", "Нижний Новгород", "Ростов-на-Дону", "Краснодар"], leftSection: IconMapPin },
  {
    label: "Университет",
    placeholder: "Введите название университета",
    options: [
      "МГУ им. Ломоносова",
      "СПбГУ",
      "МФТИ",
      "НИУ ВШЭ",
      "МГТУ им. Баумана",
      "ИТМО",
      "РАНХиГС",
      "РТУ МИРЭА",
      "ТГУ",
      "УрФУ"
    ],
    leftSection: IconBriefcase
  }
];
export default fields;