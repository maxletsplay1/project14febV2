<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Http\Request;
use DefStudio\Telegraph\Models\TelegraphChat;

class SurveyController extends Controller
{
    public function start(string $name, int $id)
    {
        return Survey::create([
            'uid' => uniqid(),
            'name' => $name,
            'chat_id' => $id
        ]);
    }
    public function update(string $id, Request $request): void
    {
        $data = $request->all();

        $r = Survey::where('uid', $id)->first();

        $r->update([
            'options' => $data['options'],
            'gift' => $data['gift'],
        ]);

        $r->refresh();

        $chat = TelegraphChat::find($r['chat_id']);

        $chat->message('Ответ получен, дай денег')->send();
    }

    public function index(string $id): \Illuminate\Http\JsonResponse
    {
        $r = Survey::where('uid', $id)->firstOrFail();
        return response()->json($r);
    }

}
