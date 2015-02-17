define(['backbone', '../models/File'], function(Backbone, File){

    var FileCollection = Backbone.Collection.extend({
        model: File,
        url: '/files',

        removeFile: function(file){
            if(!(file instanceof File)){
                throw new TypeError('file must be a File instance');
            }
            else{
                if(file.isNew()){
                    file = this.getUniqFile(file.get('name'), file.get('size'));
                }
                this.remove(file);
            }
        },

        getUniqFile: function(name, size){
            return this.where({name: name, size: size})[0];
        },

        getByName: function(name){
            return this.where({name: name});
        }
    });

    return FileCollection;

});