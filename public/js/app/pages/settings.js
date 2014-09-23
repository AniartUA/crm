require(
	[
	 	'jquery', 
	 	'anicrm',
	], 
	function($, AniCRM){
	var mediaUrl = $('#accordionMediaTypes').attr('data-url');
	AniCRM.includeComponent('media_type', 'crud', function(Component){
		var phones = new Component({type: 'phone', url: mediaUrl});
		var messengers = new Component({type: 'messenger', url: mediaUrl});
		var emails = new Component({type: 'email', url: mediaUrl});
		$('#collapsePhones').append(phones.render().el);
		$('#collapseMessengers').append(messengers.render().el);
		$('#collapseEmails').append(emails.render().el);
	});
});
