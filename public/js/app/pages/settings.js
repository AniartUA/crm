require(['jquery', 'modules/media_types/components/CRUD/component'], function($, CRUD){
    var phones = new CRUD({type: 'phone'});
    var messengers = new CRUD({type: 'messenger'});
    var emails = new CRUD({type: 'email'});
    $('#collapsePhones').append(phones.render().el);
    $('#collapseMessengers').append(messengers.render().el);
    $('#collapseEmails').append(emails.render().el);
});
