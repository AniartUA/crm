    define([
        'backbone',
        'modules/errors/views/FormErrorsView',
        'modules/media_types/collections/MediaTypeValueDropdownInputCollectionsAdapter',
        'modules/files/collections/FileCollection',
        'modules/files/views/DropzoneUploaderView',
        'modules/files/views/AttachmentsView',
        'components/DropdownInput/views/DropdownInputMultipleView',
        '../models/Contact',
        'text!../templates/template.html'
    ], function(Backbone, FormErrorsView, MediaTypeValueDropdownInputCollectionsAdapter, FileCollection, DropzoneUploaderView,
                AttachmentsView, DropdownInputMultipleView, ContactModel, Template){

    /* Селекторы обозначающие элементы формы */
    var defaultSelectors = {
        form: 'form',
        fieldName: '#contact_name',
        fieldPosition: '#contact_position',
        fieldResponsible: '#contact_responsible',
        fieldPhones: '#contact_phones',
        fieldEmails: '#contact_emails',
        fieldMessengers: '#contact_messengers',
        fieldComment: '#contact_comment',
        filesUploader: '#contact_files',
        attachedFiles: '#attach_files_list',
        attachFilesLink: '#attach_files_link',
        buttonSave: 'button#contact_save',
        buttonCancel: 'button#contact_cancel'
    };

    var getElementsBySelectors = function(container, selectors){
        var elements = {};
        _.each(selectors, function(selector, selectorId){
            elements[selectorId] = container.find(selector);
        });

        return elements;
    };

	var EditFormView = Backbone.View.extend({

        template: _.template($(Template).filter('#contact_edit_form').html()),
        mediaTypes: [],
        selectors: {},
        elements: {},
        formErrors: null,
        fileUploader: null,

		initialize: function(options){
            //привязываем все функции к контексту формы
            _.bindAll(this, 'setElementValue', 'getElement', 'filesUpload');
            //обрабатываем начальные параметры
            options = options || {};
            options.selectors = options.elements || {};
            _.extend(this.selectors, defaultSelectors, options.selectors);
            this.mediaTypes = options.mediaTypes;

            //Создаем представление для отображение ошибок полей формы
            this.formErrors = new FormErrorsView({
                form: this.el,
                fields: {
                    phone: '#contact_phones .input-group',
                    email: '#contact_emails .input-group',
                    messenger: '#contact_messengers .input-group',
                    'default': '#contact_'
                },
                aliases: {
                    responsible: ['responsible_id']
                }
            });

            //инициализируем аплоадер для файлов
            this.fileUploader = new DropzoneUploaderView({url: this.model.get('files').url});
            //Добавим событий на загрузчик файлов
            this.fileUploader.on({
                'error': this.errorFileUpload,
                'success': this.successFileUpload,
                'queueComplete': this.filesUpload
            }, this);

            //Добавим событий модели, чтобы её изменения влияли на наше представление
            this.model.on({
                'change:name': function(model, value){
                    this.setElementValue('fieldName', value);
                },
                'change:position': function(model, value){
                    this.setElementValue('fieldPosition', value);
                },
                'change:responsible': function(model, value){
                    this.setElementValue('fieldResponsible', value);
                },
                'change:comment': function(model, value){
                    this.setElementValue('fieldComment', value);
                }
            }, this);
        },

        //Привяжем определенные события к элементам нашей формы
        events: function(){
            var events = {};
            events['input ' + this.getSelector('fieldName')] = 'setContactName';
            events['input ' + this.getSelector('fieldPosition')] = 'setContactPosition';
            events['input ' + this.getSelector('fieldResponsible')] = 'setContactResponsible';
            events['input ' + this.getSelector('fieldComment')] = 'setContactComment';
            events['submit ' + this.getSelector('form')] = 'sendContactForm';
            events['click ' + this.getSelector('buttonSave')] = 'sendContactForm';
            events['click ' + this.getSelector('buttonCancel')] = 'resetContactForm';
            events['click ' + this.getSelector('attachFilesLink')] = 'toggleFilesUploader';
            return events;
        },

        errorFileUpload: function(file, data, xhr){
            this.formErrors.addErrors(data.errors);
            this.formErrors.highlightFieldAsError(this.getElement('filesUploader'));
        },

        successFileUpload: function(file, response){
            if(_.isArray(response.data.files)){
                var files = this.model.get('files');
                response.data.files.forEach(function(responseFile){
                    //добавляем к списку прикрепленных
                    files.add(responseFile, {parse: true});
                    //удаляем из загрузки
                    var _this = this;
                    $(file.get('uploaderFile').previewElement).fadeOut(1000, function(){
                        _this.fileUploader.removeFile(file.get('uploaderFile'));
                    });

                }, this);
            }
        },

        filesUpload: function(){
            //TODO сделать тут какую-то обработку результата
            this.model.save({id: this.model.get('id'), files: this.model.get('files')}, {patch: true});
        },

        /**
         * Возвращает селектор по внутр. названию поля
         *
         * @param fieldName
         * @returns {*}
         */
        getSelector: function(fieldName){
            return this.selectors[fieldName];
        },

        /**
         * Возвращает JQuery-объект по внутр. названию поля
         *
         * @param fieldName
         * @returns {*}
         */
        getElement: function(fieldName){
            return this.elements[fieldName];
        },

        /**
         * Изменяет значение для заданного поля
         *
         * @param fieldName - внутр. название поля
         * @param value - значение
         * @returns {boolean}
         */
        setElementValue: function(fieldName, value){
            var element = this.getElement(fieldName);
            if(element && element.has('value')){
                element.val(value);
                return true;
            }

            return false;
        },

        setContactName: function(event){
            this.model.set('name', $(event.currentTarget).val());
        },

        setContactPosition: function(event){
            this.model.set('position', $(event.currentTarget).val());
        },

        setContactResponsible: function(event){
            this.model.set('responsible', $(event.currentTarget).val());
        },

        setContactComment: function(event){
            this.model.set('comment', $(event.currentTarget).val());
        },

        toggleFilesUploader: function(event){
            event.preventDefault();
            this.getElement('filesUploader').toggle();
        },

        sendContactForm: function(event){
            event.preventDefault();
            this.formErrors.setErrors([]); //сбросим предыдущие ошибки
            AniCRM.loader.load(); // покажем, что начался процесс обращения к серверу
            var _this = this;
            var isNew = this.model.isNew();
            this.model.save(null, AniCRM.loader.processResponse({
                success: function(model, response){
                    //ошибок нет? загружаем файлы
                    _this.fileUploader.upload(); //обработка результата на событиях
                    if(isNew){
                        _this.trigger('created');
                    }
                    else{
                        _this.trigger('updated');
                    }
                    _this.trigger('saved');
                },
                error: function(model, xhr){
                    var errors = xhr.responseJSON.data.errors;
                    _this.formErrors.addErrors(errors);
                    _this.trigger('error');
                },
                hideTimeout: 3000
            }));
        },

        resetContactForm: function(event){
            if(this.model.isNew()){
                this.trigger('canceled');
            }
            else{
                //reset all fields;
                this.trigger('reseted');
            }
        },

        renderPhones: function(){
            var phonesView = new DropdownInputMultipleView({
                collection: new MediaTypeValueDropdownInputCollectionsAdapter([], {
                    mediaTypeValues: this.model.get('phones'),
                    types: _.where(this.mediaTypes, {type: 'phone'})
                })
            });
            this.getElement('fieldPhones').find('div.col-lg-8').html(phonesView.render().$el);
        },


        renderEmails: function(){
            var emailsView = new DropdownInputMultipleView({
                collection: new MediaTypeValueDropdownInputCollectionsAdapter([], {
                    mediaTypeValues: this.model.get('emails'),
                    types: _.where(this.mediaTypes, {type: 'email'})
                })
            });
            this.getElement('fieldEmails').find('div.col-lg-8').html(emailsView.render().$el);
        },


        renderMessengers: function(){
            var messengersView = new DropdownInputMultipleView({
                collection: new MediaTypeValueDropdownInputCollectionsAdapter([], {
                    mediaTypeValues: this.model.get('messengers'),
                    types: _.where(this.mediaTypes, {type: 'messenger'})
                })
            });
            this.getElement('fieldMessengers').find('div.col-lg-8').html(messengersView.render().$el);
        },

        renderFilesUploader: function(){
            this.getElement('filesUploader').html(this.fileUploader.render());
        },

        renderAttachedFiles: function(){
            var attachmentsView = new AttachmentsView({
                el: this.getElement('attachedFiles'),
                collection: this.model.get('files')
            });
            attachmentsView.render();
        },

		render: function() {
            //если форма не прикреплена к DOM, создаем её на основе шаблона
            if(!this.$el.text()){
                this.setElement(this.template(this.model.toJSON()));
                this.formErrors.form = this.el;
            }
            //Находим и устанавливаем элементы представления по заданным селкторам
            this.elements = getElementsBySelectors(this.$el, this.selectors);
            //Заполняем поля контакта
            this.setElementValue('fieldName', this.model.get('name'));
            this.setElementValue('fieldPosition', this.model.get('position'));
            this.setElementValue('fieldResponsible', this.model.get('responsible'));
            this.setElementValue('fieldComment', this.model.get('comment'));
            //Заполняем поля зависимых сущностей
            this.renderPhones();
            this.renderEmails();
            this.renderMessengers();
            this.renderAttachedFiles();
            this.renderFilesUploader();

            return this;
        }
	});
	
	return EditFormView;
});