<?php

namespace App\Telegram;

use App\Http\Controllers\SurveyController;
use DefStudio\Telegraph\Handlers\WebhookHandler;
use DefStudio\Telegraph\Models\TelegraphChat;

class Handler extends WebhookHandler
{
    public function __construct(protected SurveyController $controller, protected TelegraphChat $telegraphChat)
    {
    }

    public function start():void
    {
        $this->reply('Привет! Введи /send и имя человека одним сообщением)');

    }
    public function send(string $message):void
    {
        $id = $this->chat->id;
        $chat = $this->telegraphChat::find($id);


        $this->reply('Супер! Сейчас создадим ссылку на небольшой опросник и отправим её тебе)');
        $response = $this->controller->start($message, $id);


        $chat->markdownV2(
'Залупа
`'.env('APP_FRONTEND_URL') . 'home/'. $response['uid'] .'`'
        )->send();
    }
    public function update(string $message):void
    {
        $this->reply('Супер! Сейчас создадим ссылку и отправим ее тебе)');
        $id = $this->chat->id;
        $this->reply($id);
    }
}
