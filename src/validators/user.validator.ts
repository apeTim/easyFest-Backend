import { body, check, query, CustomValidator } from 'express-validator';

export const activate = [
    query('uid', 'Укажите параметры')
];

export const update = [
    body("first_name", "Укажите имя").isString(),
    body("last_name", "Укажите фамилию").isString(),
    body("birthday", "Укажите дату рождения").isInt().withMessage('Дата рождения должна быть целым-числом'),
    body("sex", "Укажите пол").isInt().withMessage('Пол пользователя должен быть целым-числом'),   
    body("phone", "Укажите номер телефона"),
    body("vkontakte", "Укажите ссылку на ВКонтакте"),
    body("facebook", "Укажите ссылку на Facebook"),
    body("intagram", "Укажите ссылку на Intagram")
]

export const change = {
    password: [
        body("new_password", "Укажите новый пароль").isString(),
        body("new_password_confirm", "Подтвердите пароль").isString(),
        body("old_password", "Укажите старый пароль").isString()
    ]
}