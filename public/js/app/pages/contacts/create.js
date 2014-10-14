require(['jquery', 'modules/contacts/views/EditContactView', 'anicrm'], function($, EditContactView){
    console.log(AniCRM.get('mediaTypes'));
	var editContactView = new EditContactView();
	/*
	AniCRM.includeComponent('media_types', 'DropdownInput', function(DropdownInput){
		var phoneList = [
		                 
		   {
			   id: 		1,
			   value:	'0662404282',
			   typeId:	1
		   },
		   {
			   id:		2,
			   value:	'0445648237',
			   typeId:  16
		   }
		   
		];
		
		var emailList = [];
		var messengerList = [];
		
		var phonesDropdown = new DropdownInput({
			typeCaption: 'Телефон',
			mediaType: 'phone',
			items: phoneList,
		});
		var emailsDropdown = new DropdownInput({
			typeCaption: 'Email',
			mediaType: 'email',
			items: emailList
		});
		var messengersDropdown = new DropdownInput({
			typeCaption: 'Messenger',
			mediaType: 'messenger',
			items: messengerList
		});
		$('#contact_phones').append(phonesDropdown.el());
		$('#contact_emails').append(emailsDropdown.el());
		$('#contact_messengers').append(messengersDropdown.el());
	});
	*/
});