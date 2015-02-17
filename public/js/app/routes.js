define(['backbone'], function(Backbone){
    var AppRouter = Backbone.Router.extend({
        routes: {
            //contacts
            'contacts': 'showContacts',
            'contacts/create': 'createContact',
            'contacts/:contactId/edit': 'editContact',
            //settings
            'settings': 'settings',
            //tests
            'tests(/:testName)': 'tests'
        },

        settings: function(){
            require(['pages/settings']);
        },

        tests: function(testName){
            AniCRM.set('testName', testName);
            require(['pages/tests']);
        },

        showContacts: function(){
            require(['pages/contacts/index'], function(){
            });
        },

        createContact: function(){
            require(['pages/contacts/create']);
        },

        editContact: function(){
            require(['pages/contacts/create']);
        }

    });

    return AppRouter;
});