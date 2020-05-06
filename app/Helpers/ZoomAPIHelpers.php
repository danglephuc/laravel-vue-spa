<?php

namespace App\Helpers;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class ZoomAPIHelpers {

    public static function getAccessToken($code)
    {
        $endpoint = 'https://zoom.us/oauth/token';

        try {
            $client = new Client();
            $response = $client->request('POST', $endpoint, [
                'headers' => [
                    'Authorization' => 'Basic OFFIbkJfdjBTcUdvSEFoS1FTUkh0QTpxUHE5YzNqM0k2QXhaQlVLT0dQdlBOODZDcGswQXlJVw=='
                ],
                'query' => [
                    'grant_type' => 'authorization_code',
                    'code' => $code,
                    'redirect_uri' => 'http://192.168.99.100:8000/zoom-auth'
                ],
            ]);
            Log::info('response: ' . $response->getStatusCode() . ' - ' . $response->getBody());
            if ($response->getStatusCode() === 200) {
                $data = json_decode($response->getBody(), true);
                return [
                    'access_token' => $data['access_token'],
                    'refresh_token' => $data['refresh_token']
                ];
            }
        } catch (\Exception $e) {
            Log::error('Exception while getAccessToken: ' . $e->getMessage() . $e->getTraceAsString());
        }
        return [];
    }

    public static function getUserInfo($accessToken)
    {
        $endpoint = 'https://api.zoom.us/v2/users/me';

        try {
            $client = new Client();
            $response = $client->request('GET', $endpoint, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $accessToken,
                ],
            ]);

            Log::info('response: ' . $response->getStatusCode() . ' - ' . $response->getBody());
            if ($response->getStatusCode() === 200) {
                return json_decode($response->getBody(), true);
            }
        } catch (\Exception $e) {
            Log::error('Exception while getUserInfo: ' . $e->getMessage() . $e->getTraceAsString());
        }
        return [];
    }

}
