define(['backbone'], function(Backbone){
    var AppRouter = Backbone.Router.extend({
        routes: {
            'contacts/create': 'createContact',
            'settings': 'settings'
        },

        settings: function(){
            require(['pages/settings']);
        },

        createContact: function(){
            require(['pages/contacts/create']);
        }
    });

    return AppRouter;
});