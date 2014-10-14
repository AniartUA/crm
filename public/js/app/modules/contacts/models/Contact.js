define(
    [
        'backbone',
        'modules/media_types/collections/PhoneCollection',
        'modules/media_types/collections/EmailCollection',
        'modules/media_types/collections/MessengerCollection'
    ],
    function(Backbone, PhoneCollection, EmailCollection, MessengerCollection){
	var Contact = new Backbone.Model.extend({
		defaults:{ 
			name:			'',
			responsible:	{},
			position: 		'',
			phones: 		new PhoneCollection,
			emails: 		new EmailCollection,
			messengers:		new MessengerCollection,
			files:			[]
		}
	});
	
	return Contact;
});