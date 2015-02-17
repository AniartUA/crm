define(['backbone'], function(Backbone){

    var File = Backbone.Model.extend({
        urlRoot: '/files',
        defaults:{
            name: '',
            src: '',
            size: '',
            type: '',
            description: ''
        },

        initialize: function(attributes, options) {
            if(attributes['original_name']){
                this.set({name: attributes['original_name']}, {silent: true});
            }
        },

        /**
         * Возвращает имя+размер файла
         * @return string
         */
        getNameWithSize: function(){
            var result = this.get('name') + ' (' + this.getFormattedSize() + ')';
            return result;
        },

        /**
         * Возвращает размер с учетом kb,mb и т.д.
         * @returns string
         */
        getFormattedSize: function(){
            return File.bytesToSize(this.get('size'));
        },

        parse: function(response, options) {
            return {
                id: response.id,
                name: response.original_name,
                size: response.size,
                src: response.src,
                type: response.content_type,
                description: response.description
            }
        }

    }, {
        bytesToSize: function(bytes){
            if(bytes == 0) return '0 Byte';
            var k = 1000;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        }
    });

    return File;

});