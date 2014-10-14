require(['jquery'], function($){
    AniCRM.includeComponent('media_types', 'CRUD', function(Component){
        var phones = new Component({type: 'phone'});
        var messengers = new Component({type: 'messenger'});
        var emails = new Component({type: 'email'});
        $('#collapsePhones').append(phones.render().el);
        $('#collapseMessengers').append(messengers.render().el);
        $('#collapseEmails').append(emails.render().el);
	});
});
