<?php

namespace App\Utils;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;

/**
 * Class JsonResponse
 * Simple response object
 * Response format:
 * {
 *   'status': true|false,
 *   'data': [],
 *   'error': ''
 * }
 *
 * @package Laravue
 */
class JsonResponse implements \JsonSerializable
{
    const STATUS_SUCCESS = true;
    const STATUS_ERROR = false;

    /**
     * Data to be returned
     * @var mixed
     */
    private $data = [];

    /**
     * Error message in case process is not success. This will be a string.
     *
     * @var string
     */
    private $error = '';

    /**
     * @var bool
     */
    private $status = false;

    /**
     * JsonResponse constructor.
     * @param mixed $data
     * @param string $error
     */
    public function __construct($data = [], string $error = '')
    {
        if ($this->shouldBeJson($data)) {
            $this->data = $data;
        }

        $this->error = $error;
        $this->status = !empty($data);
    }

    /**
     * Success with data
     *
     * @param array $data
     */
    public function success($data = [])
    {
        $this->status = self::STATUS_SUCCESS;
        $this->data = $data;
        $this->error = '';
    }

    /**
     * Fail with error message
     * @param string $error
     */
    public function fail($error = '')
    {
        $this->status = self::STATUS_ERROR;
        $this->error = $error;
        $this->data = [];
    }

    /**
     * @inheritdoc
     */
    public function jsonSerialize()
    {
        return [
            'success' => $this->status,
            'data' => $this->data,
            'error' => $this->error,
        ];
    }

    /**
     * Determine if the given content should be turned into JSON.
     *
     * @param mixed $content
     * @return bool
     */
    private function shouldBeJson($content): bool
    {
        return $content instanceof Arrayable ||
            $content instanceof Jsonable ||
            $content instanceof \ArrayObject ||
            $content instanceof \JsonSerializable ||
            is_array($content);
    }
}
