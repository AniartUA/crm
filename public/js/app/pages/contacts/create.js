define(
    ['jquery', 'modules/contacts/models/Contact', 'modules/contacts/views/EditFormView'],
    function($, Contact, EditFormView){
        var contact = AniCRM.create(Contact, 'Contact', AniCRM.get('contactData'), {parse: true});
        var editContactView = AniCRM.create(EditFormView, 'EditContactForm', {
            el: $('#edit_contact'),
            mediaTypes: AniCRM.get('mediaTypes', []),
            model: contact
        });
        editContactView.render();
        editContactView.on({
            'canceled': function() {
                AniCRM.router.redirect('contacts')
            },
            'created': function(){
                AniCRM.router.navigate('contacts/' + this.model.get('id') + '/edit', {replace: true});
                this.getElement('buttonSave').html('Сохранить');
            }
        });
        console.log(AniCRM);
});