<?php

namespace App\Domain\Models\Users;

use Library\DataMapper\DataMapperPrimaryKey;
use Library\DataMapper\DataMapperTimestamps;

/** @Entity */
class User
{
    use DataMapperPrimaryKey, DataMapperTimestamps;

    /** @Column(type="string") */
    protected $firstName;

    /** @Column(type="string") */
    protected $lastName;

    /** @Column(type="string") */
    protected $email;

    /** @Column(type="string") */
    protected $password;

    /** @Column(type="string") */
    private $type;

    public function __construct($firstName, $lastName, $email, $password, $type = 'user')
    {
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->password = $password;
        $this->type = $type;
    }

    public function firstName()
    {
        return $this->firstName;
    }

    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
    }

    public function lastName()
    {
        return $this->lastName;
    }

    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
    }

    public function name()
    {
        return $this->firstName.' '.$this->lastName;
    }

    public function email()
    {
        return $this->email;
    }

    public function type(): string
    {
        return $this->type;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function password()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function setType(string $type)
    {
        $this->type = $type;
    }
}