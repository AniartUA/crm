define(['backbone'], function(Backbone){
    var Column = Backbone.Model.extend({
        defaults: {
            active: true,
            code: '',
            title: '',
            sort: true,
            sortOrder: ''
        },
        initialize: function(attributes){
        }
    });

    return Column;
});