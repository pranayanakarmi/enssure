<?php

namespace App\Policies;

class NewsTickerItemPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'news_ticker_items';
    }
}
