define(['backbone', '../models/Scheme', 'modules/contacts/models/Contact'], function(Backbone, Scheme, Contact){

    var DefaultContactScheme = Scheme.extend({
        defaults:{
            model: Contact,
            columns: [
                {code: 'updated_at', title: 'Время обновления', sort: true, sortOrder: 'desc'},
                {code: 'name', title: 'ФИО', sort: true},
                {code: 'position', title: 'Должность', sort: true},
                {code: 'phones', title: 'Телефон', sort: true},
                {code: 'emails', title: 'Эл. почта', sort: true},
                {code: 'messengers', title: 'Месенджер', sort: true},
                {code: 'files', title: 'Файлы', sort: false}
            ]
        },

        name: function(model){
            return model.getHtmlEditLink();
        },

        phones: function(model){
            return model.getMediaTypeValues('phones').join('<br />');
        },

        emails: function(model){
            return model.getMediaTypeValues('emails').join('<br />');
        },

        messengers: function(model){
            return model.getMediaTypeValues('messengers').join('<br />');
        },

        files: function(model){
            var result = [];
            var files = model.get('files');
            if(files.size() > 0){
                files.each(function(file){
                   result.push('<a target="_blank" href="/' + file.get('src') + '">' + file.getNameWithSize() + '</a>');
                });
            }
            return result.join("<br />");
        }

    });

    return DefaultContactScheme;
});