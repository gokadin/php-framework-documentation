<?php

namespace App\Domain\Authentication;

use App\Domain\Models\Users\User;
use Firebase\JWT\JWT;
use Library\DataMapper\DataMapper;

class Authenticator
{
    /**
     * @var DataMapper
     */
    private $dm;

    /**
     * @var User
     */
    private $user;

    /**
     * @var string
     */
    private $type;

    public function __construct(DataMapper $dm)
    {
        $this->dm = $dm;
    }

    public function user()
    {
        return $this->user;
    }

    public function setUser(User $user)
    {
        $this->user = $user;
    }

    public function type()
    {
        return $this->type;
    }

    public function processAuthorization($jwt)
    {
        $jwt = explode('Bearer ', $jwt)[1];
        $jwt = (array) JWT::decode($jwt, $this->getJwtSecret(), array('HS512'));
        $data = (array) $jwt['data'];

        $user = $this->dm->find(User::class, $data['id']);

        if (is_null($user))
        {
            return false;
        }

        $this->user = $user;
        $this->type = $data['type'];
        return true;
    }

    public function login($email, $password)
    {
        $user = $this->dm->findOneBy(User::class, [
            'email' => $email,
            'password' => $password
        ]);

        if (is_null($user))
        {
            return false;
        }

        return $this->createJwt([
            'id' => $user->getId(),
            'type' => $user->type()
        ]);
    }

    private function createJwt(array $data)
    {
        $currentTime = time();

        $data = [
            'iat' => $currentTime,
            'iss' => 'instructioner',
            'nbf' => $currentTime,
            'data' => $data
        ];

        return JWT::encode($data, $this->getJwtSecret(), 'HS512');
    }

    private function getJwtSecret()
    {
        return base64_encode('*ei3%a9200-h');
    }
}