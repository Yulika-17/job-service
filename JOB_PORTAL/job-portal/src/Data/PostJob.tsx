const fields = [
  { label: "Профессия", placeholder: "Enter Job Title", options: ['Разработчик', 'Дизайнер', 'Маркетолог', 'Продакт-менеджер', 'Data Analyst', 'Контент-мейкер', 'HR', 'Исследователь'] },
  { label: "Компания", placeholder: "Enter Company Name", options: ['Google', 'Microsoft', 'Meta', 'Netflix', 'Adobe', 'Facebook', 'Amazon', 'Apple', 'Spotify'] },
  { label: "Опыт работы", placeholder: "Enter Experience Level", options:  ['Начальный уровень', 'Средний уровень', 'Эксперт']},
  { label: "Формат занятости", placeholder: "Enter Job Type", options: ['Полная', 'Частичная', 'Стажировка', 'Практика', 'Волонтёрство', 'Подработка', 'Гибкий график', 'Только на каникулах']  },
  { label: "Город", placeholder: "Enter Job Location", options: ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Онлайн', 'Другое'] },
  // { label: "Salary", placeholder: "Enter Salary", options: ['10 LPA', '15 LPA', '20 LPA', '25 LPA', '30 LPA', '35 LPA', '40 LPA', '45 LPA'] },
  { label: "Формат работы", placeholder: "Enter Job Type", options: ['Офис', 'Удалёнка', 'Гибрид'] },
  { label: "Курс / Степень", placeholder: "Enter Job Type", options: ['Бакалавриат', 'Магистратура', 'Аспирантура'] },
  { label: "Академическая совместимость", placeholder: "Enter Job Type", options: ['Можно зачесть как практику', 'Можно использовать в дипломе', 'Требуется портфолио'] },
  { label: "Тип задач", placeholder: "Enter Job Type", options: ['Учебные задачи', 'Реальные задачи', 'Исследовательские', 'Проектная работа', 'С ментором'] },
  { label: "Поддержка студента", placeholder: "Enter Job Type", options: ['Есть ментор', 'Есть обучение', 'Есть карьерный трек', 'Куратор из вуза'] },
  { label: "Язык работы", placeholder: "Enter Job Type", options: ['Русский', 'Английский', 'Неважно'] },
  { label: "Доступ к оборудованию", placeholder: "Enter Job Type", options: ['Выдают технику', 'Нужен свой ноутбук', 'Оборудование не требуется'] },
  { label: "Гибкость для учёбы", placeholder: "Enter Job Type", options: ['Гибкий график', 'Только на каникулах', 'Можно совмещать с парами'] },
  { label: "Длительность", placeholder: "Enter Job Type", options: ['< 1 месяца', '1–3 месяца', '> 3 месяцев'] },
  { label: "Начало", placeholder: "Enter Job Type", options: ['Июнь', 'Июль', 'Август', 'Сентябрь', 'Гибко'] }
]
const multi = [
  { label: "Академическая совместимость", placeholder: "Enter Job Type", options: ['Можно зачесть как практику', 'Можно использовать в дипломе', 'Требуется портфолио'] },
  { label: "Тип задач", placeholder: "Enter Job Type", options: ['Учебные задачи', 'Реальные задачи', 'Исследовательские', 'Проектная работа', 'С ментором'] },
  { label: "Поддержка студента", placeholder: "Enter Job Type", options: ['Есть ментор', 'Есть обучение', 'Есть карьерный трек', 'Куратор из вуза'] },
  { label: "Гибкость для учёбы", placeholder: "Enter Job Type", options: ['Гибкий график', 'Только на каникулах', 'Можно совмещать с парами'] }
]
const content =
  '<h4>About The Job</h4><p>Write description here...</p><h4>Responsibilities</h4><ul><li>Add responsibilities here...</li></ul><h4>Qualifications and Skill Sets</h4><ul><li>Add required qualification and skill set here...</li></ul>';
export { fields, content, multi };