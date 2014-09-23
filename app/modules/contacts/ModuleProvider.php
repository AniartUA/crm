<?php namespace App\Modules\Contacts;
 
class ModuleProvider extends \App\Modules\ServiceProvider {
 
    public function register()
    {
        parent::register('contacts');
    }
 
    public function boot()
    {
        parent::boot('contacts');
    }
 
}
?>