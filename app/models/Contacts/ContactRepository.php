<?php namespace App\Models;

class ContactRepository extends BaseRepository
{
	public function __construct(Contact $contact)
    {
        $this->model = $contact;
    }

    public function orderByPhones($sortOrder = 'asc')
    {
        $prefix = \DB::getTablePrefix();
        $this->queryBuilder()->selectRaw(
            sprintf(
                '* , (SELECT COUNT(*) FROM "%1$sphones" WHERE "%1$sphones"."contact_id" = "%1$scontacts"."id") as "phones_count"',
                $prefix
            )
        );
        $this->queryBuilder()->orderBy('phones_count', $sortOrder);
        return $this;
    }

    public function orderByEmails($sortOrder = 'asc')
    {
        $prefix = \DB::getTablePrefix();
        $this->queryBuilder()->selectRaw(
            sprintf(
                '* , (SELECT COUNT(*) FROM "%1$semails" WHERE "%1$semails"."contact_id" = "%1$scontacts"."id") as "emails_count"',
                $prefix
            )
        );
        $this->queryBuilder()->orderBy('emails_count', $sortOrder);
        return $this;
    }

    public function orderByMessengers($sortOrder = 'asc')
    {
        $prefix = \DB::getTablePrefix();
        $this->queryBuilder()->selectRaw(
            sprintf(
                '* , (SELECT COUNT(*) FROM "%1$smessengers" WHERE "%1$smessengers"."contact_id" = "%1$scontacts"."id") as "messengers_count"',
                $prefix
            )
        );
        $this->queryBuilder()->orderBy('messengers_count', $sortOrder);
        return $this;
    }

    public function orderByUpdated_At($sortOrder = 'asc')
    {
        $this->orderByField('updated_at', $sortOrder);
        return $this;
    }
}
?>