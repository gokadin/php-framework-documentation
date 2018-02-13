<?php

namespace App\Http\Controllers;

use Library\Transformer\Transformer;

abstract class ApiController extends Controller
{
    /**
     * @var Transformer
     */
    protected $transformer;

    public function __construct(Transformer $transformer)
    {
        $this->transformer = $transformer;
    }
}