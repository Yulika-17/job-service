const fields = [
  { label: "Должность", placeholder: "Введите должность", options: ['Разработчик', 'UI/UX-дизайнер', 'Маркетолог', 'Продакт-менеджер', 'Аналитик данных', 'Контент-мейкер', 'HR', 'Исследователь'] },
  // { label: "Компания", placeholder: "Введите название компании", options: ['Google', 'Microsoft', 'Meta', 'Netflix', 'Adobe', 'Facebook', 'Amazon', 'Apple', 'Spotify'] },
  { label: "Компания", placeholder: "Введите название компании", options: ['Яндекс', 'ВКонтакте','Сбербанк', 'Газпром', 'Авито', 'Т-Банк', 'РЖД', 'Аэрофлот', 'Озон', 'Магнит']},
  { label: "Опыт работы", placeholder: "Введите уровень опыта", options: ['Без опыта', 'Начальный', 'Средний', 'Эксперт'] },
  { label: "Тип занятости", placeholder: "Выберите тип занятости", options: ['Полная', 'Частичная', 'Стажировка', 'Практика', 'Волонтёрство', 'Подработка', 'Гибкий график'] },
  { label: "Город", placeholder: "Введите город", options: ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Онлайн', 'Другое'] },
  // { label: "Salary", placeholder: "Enter Salary", options: ['10 LPA', '15 LPA', '20 LPA', '25 LPA', '30 LPA', '35 LPA', '40 LPA', '45 LPA'] },
  { label: "Формат работы", placeholder: "Выберите формат работы", options: ['Офис', 'Удалёнка', 'Гибрид', 'В университете'] },
  { label: "Курс / Степень", placeholder: "Выберите уровень обучения", options: ['Бакалавриат', 'Магистратура', 'Аспирантура'] },
  { label: "Академическая совместимость", placeholder: "Выберите совместимость", options: ['Можно зачесть как практику', 'Можно использовать в дипломе', 'Требуется портфолио'] },
  { label: "Тип задач", placeholder: "Выберите тип задач", options: ['Учебные задачи', 'Реальные задачи', 'Исследовательские', 'Проектная работа', 'С ментором'] },
  { label: "Поддержка студента", placeholder: "Выберите тип поддержки", options: ['Есть ментор', 'Есть обучение', 'Есть карьерный трек', 'Куратор из вуза'] },
  { label: "Язык работы", placeholder: "Выберите язык работы", options: ['Русский', 'Английский', 'Неважно'] },
  { label: "Доступ к оборудованию", placeholder: "Выберите вариант", options: ['Выдают технику', 'Нужен свой ноутбук', 'Оборудование не требуется'] },
  { label: "Гибкость для учёбы", placeholder: "Выберите уровень гибкости", options: ['Гибкий график', 'Только на каникулах', 'Можно совмещать с парами'] },
  { label: "Длительность", placeholder: "Выберите длительность", options: ['Менее 1 месяца', 'От 1 до 3 месяцев', 'Более 3 месяцев'] },
  { label: "Начало", placeholder: "Выберите месяц начала", options: ['Июнь', 'Июль', 'Август', 'Сентябрь', 'В любое время'] }
]
const multi = [
  { label: "Академическая совместимость", placeholder: "Выберите совместимость", options: ['Можно зачесть как практику', 'Можно использовать в дипломе', 'Требуется портфолио'] },
  { label: "Тип задач", placeholder: "Выберите тип задач", options: ['Учебные задачи', 'Реальные задачи', 'Исследовательские', 'Проектная работа', 'С ментором'] },
  { label: "Поддержка студента", placeholder: "Выберите тип поддержки", options: ['Есть ментор', 'Есть обучение', 'Есть карьерный трек', 'Куратор из вуза'] },
  { label: "Гибкость для учёбы", placeholder: "Выберите уровень гибкости", options: ['Гибкий график', 'Только на каникулах', 'Можно совмещать с парами'] }
]
const content =
  '<h4>О вакансии</h4><p>Напишите описание здесь...</p><h4>Обязанности</h4><ul><li>Добавьте обязанности здесь...</li></ul><h4>Квалификация и навыки</h4><ul><li>Добавьте необходимые квалификацию и навыки здесь...</li></ul>';
export { fields, content, multi };