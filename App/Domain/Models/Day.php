<?php

namespace App\Domain\Models;

use Library\DataMapper\DataMapperPrimaryKey;
use Library\DataMapper\DataMapperTimestamps;

/** @Entity */
class Day
{
    use DataMapperPrimaryKey, DataMapperTimestamps;

    /** @Column(type="string") */
    private $currency;

    /** @Column(type="integer") */
    private $hours;

    /** @Column(type="decimal") */
    private $amount_mined;

    /** @Column(type="decimal") */
    private $amount_sold;

    /** @Column(type="decimal") */
    private $sell_price_usd;

    /** @Column(type="decimal") */
    private $profit_cad;

    /** @Column(type="string") */
    private $comments;

    public function __construct() {

    }

    public function getCurrency() {
        return $this->currency;
    }

    public function getHours() {
        return $this->hours;
    }

    public function getAmount_mined() {
        return $this->amount_mined;
    }

    public function getAmount_sold() {
        return $this->amount_sold;
    }

    public function getSell_price_usd() {
        return $this->sell_price_usd;
    }

    public function getProfit_cad() {
        return $this->profit_cad;
    }

    public function getComments() {
        return $this->comments;
    }

    public function setCurrency($value) {
        $this->currency = $value;
    }

    public function setHours($value) {
        $this->hours = $value;
    }

    public function setAmount_mined($value) {
        $this->amount_mined = $value;
    }

    public function setAmount_sold($value) {
        $this->amount_sold = $value;
    }

    public function setSell_price_usd($value) {
        $this->sell_price_usd = $value;
    }

    public function setProfit_cad($value) {
        $this->profit_cad = $value;
    }

    public function setComments($value) {
        $this->comments = $value;
    }
}
