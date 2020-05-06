<?php

namespace App\Http\Controllers;

use App\Helpers\ZoomAPIHelpers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    public function loginWithZoom(Request $request)
    {
        $code = $request->input('code');

        if (!$code) {
            redirect('/login');
        }

        Log::info('code: ' . $code);
        $tokens = ZoomAPIHelpers::getAccessToken($code);
        $userInfo = ZoomAPIHelpers::getUserInfo($tokens['access_token']);

        $user = User::where('email', $userInfo['email'])->first();
        if (!$user) {
            $user = new User;
            $user->email = $userInfo['email'];
            $user->password = Hash::make($userInfo['id']);
            $user->name = $userInfo['first_name'] . ' ' . $userInfo['last_name'];
            $user->type = User::TYPE_PRESENTER;
            $user->zoom_id = $userInfo['id'];
            $user->zoom_access_token = $tokens['access_token'];
            $user->zoom_refresh_token = $tokens['refresh_token'];
            $user->save();
        }

        Auth::guard()->login($user);

        return redirect('/login?zoom_auth=success');
    }
}
