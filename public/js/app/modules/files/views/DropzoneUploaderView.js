define([
    'backbone', 'dropzone', '../collections/FileCollection',
    'css!/css/plugins/dropzone/dropzone.css', 'css!/css/plugins/dropzone/basic.css'],
    function(Backbone, Dropzone, FileCollection){

        Dropzone.autoDiscover = false;

        var DropzoneUploaderView = Backbone.View.extend({

            className: 'dropzone',
            defaultOptions: {
                url: '/',
                autoProcessQueue: false,
                //uploadMultiple: true,
                parallelUploads: 10,
                maxFiles: 10,
                addRemoveLinks: true,
                createImageThumbnails: false
            },

            initialize: function(options){
                options = $.extend({}, this.defaultOptions, options);
                this.uploader = new Dropzone(this.el, options);

                var _this = this;
                this.uploader.on('addedfile', function(file){
                    _this.trigger('fileAdd', _this._convertFile(file));
                });
                this.uploader.on('removedfile', function(file){
                    _this.trigger('fileRemove', _this._convertFile(file));
                });
                this.uploader.on('error', function(file, data, xhr){
                    _this.trigger('error', _this._convertFile(file), data, xhr);
                    file.status = Dropzone.QUEUED; //for reupload
                });
                this.uploader.on('success', function(file, data){
                    _this.trigger('success', _this._convertFile(file), data);
                });
                this.uploader.on('queuecomplete', function(){
                    _this.trigger('queueComplete');
                });
            },

            upload: function(){
                this.uploader.processQueue();
            },

            removeFile: function(file){
                this.uploader.removeFile(file);
            },

            _convertFile: function(dropzoneFile){
                var collection = new FileCollection([]);
                return new collection.model({
                    name: dropzoneFile.name,
                    size: dropzoneFile.size,
                    type: dropzoneFile.type,
                    uploaderFile: dropzoneFile
                });
            },

            render: function(){
                return this.$el;
            }
        });

        return DropzoneUploaderView;

});