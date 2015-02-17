require([
    'jquery',
    'modules/contacts/collections/ContactCollection',
    'components/ActiveTable/views/ActiveTableView',
    'components/ActiveTable/schemes/DefaultContactScheme',
    'components/Pagination/PaginationView'
],function($, ContactCollection, ActiveTableView, DefaultContactScheme, PaginationView) {
    var contactCollection = AniCRM.create(ContactCollection, 'ContactCollection', AniCRM.get('contactsList'), {parse:true});

    var ActiveTable = AniCRM.create(ActiveTableView, 'ActiveTable', {
        scheme: new DefaultContactScheme(),
        rows: contactCollection,
        pagination: new PaginationView({
            model: _.omit(AniCRM.get('contactsList'), 'data')
        })
    });

    $('#contacts_table').html(ActiveTable.render().$el);
});