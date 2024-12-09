import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
app.use(bodyParser.json());

const BOT_TOKEN = '7565594920:AAFr_PBq22jFw5Fxa3YMl2jlyI5IaLpNTEo';
const CHAT_ID = '1026864669';

app.post('/notify', (req, res) => {
    const { name } = req.body;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: `Новый гость: ${name} подтвердил "Приду!"`,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Сообщение отправлено:', data);
            res.status(200).send('Уведомление отправлено');
        })
        .catch((error) => {
            console.error('Ошибка при отправке сообщения:', error);
            res.status(500).send('Ошибка при отправке уведомления');
        });
});

app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));
