define([
        'backbone',
        'modules/errors/views/FormErrorsView',
        'modules/media_types/models/MediaTypeValueDropdownInputAdapter',
        'components/DropdownInput/views/DropdownInputMultipleView',
        '../models/Contact',
        'text!../templates/template.html'
    ], function(Backbone, FormErrorsView, MediaTypeAdapter, DropdownInputMultipleView, ContactModel, Template){

    function registerMediaTypeEvents(mediaType)
    {
        return {
            'add': function(model, collection, options){
                console.log(1);
                options.type = mediaType;
                this.addDropdownInput.apply(this, arguments);
            },
            'remove': function(model, collection, options) {
                options.type = mediaType;
                this.removeDropdownInput.apply(this, arguments);
            },
            'reset': function(collection, options) {
                options.type = mediaType;
                this.resetDropdownInputs.apply(this, arguments);
            }
        }
    }

	var EditContactView = Backbone.View.extend({

        template: _.template($(Template).filter('#contact_edit_form').html()),
        dropdownInputs: {},

		initialize: function(options){
            _.bindAll(this,
                'changeName', 'changePosition', 'changeResponsible',
                'addDropdownInput', 'removeDropdownInput', 'resetDropdownInputs'
            );
            this.mediaTypes = options.mediaTypes;
            this.formErrors = new FormErrorsView({
                form: this.el,
                fields: {
                    phone: '#contact_phones .input-group',
                    email: '#contact_emails .input-group',
                    messenger: '#contact_messengers .input-group',
                    'default': '#contact_'
                }
            });

            this.model.on('change:name', this.changeName);
            this.model.on('change:position', this.changePosition);
            this.model.on('change:responsible', this.changeResponsible);
            this.model.on('change:emails', this.changeEmails);
            this.model.on('change:messengers', this.changeMessengers);
            this.model.get('phones').on(registerMediaTypeEvents('phone'), this);
            this.model.get('emails').on(registerMediaTypeEvents('email'), this);
            this.model.get('messengers').on(registerMediaTypeEvents('messenger'), this);

            this.initMediaTypeValues('phones');
            this.initMediaTypeValues('emails');
            this.initMediaTypeValues('messengers');
        },

        events: {
            'input #contact_name': 'setContactName',
            'input #contact_position': 'setContactPosition',
            'input #contact_responsible': 'setContactResponsible',
            'submit form': 'sendContactForm',
            'click button#contact_save': 'sendContactForm',
            'click button#contact_cancel': 'resetContactForm'
        },

        initMediaTypeValues: function(mediaType){
            if(this.model.get(mediaType).isEmpty()){
                this.model.get(mediaType).add({});
            }
       },

        changeName: function(model, value){
            this.$el.find('#contact_name').val(value);
        },

        changePosition: function(model, value){
            this.$el.find('#contact_position').val(value);
        },

        changeResponsible: function(model, value){
            this.$el.find('#contact_responsible').val(value);
        },

        addDropdownInput: function(model, collection, options){
            if(options.selfAdd){ //избегаем рекурсии, т.к. у нас коллекции слушают друг друга
                return;
            }
            var dropdownInput = this.createDropdownInput(options.type);
            var mediaTypeAdapter = AniCRM.create(MediaTypeAdapter, '', model);
            dropdownInput.collection.add(mediaTypeAdapter.dropdownInput);
        },

        removeDropdownInput: function(model, collection, options){
            var dropdownInput = this.createDropdownInput(options.type);
            dropdownInput.collection.remove(dropdownInput.collection.at(options.index));
        },

        resetDropdownInputs: function(collection, options){
            var dropdownInput = this.createDropdownInput(options.type);
            dropdownInput.collection.reset();
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

        sendContactForm: function(event){
            event.preventDefault();
            var _this = this;
            AniCRM.loader.load();
            this.model.save(null, AniCRM.loader.processResponse({
                success: function(model, response){
                    _this.formErrors.clearAll();
                },
                error: function(model, xhr){
                    _this.formErrors.setErrors(xhr.responseJSON.errors);
                },
                hideTimeout: 3000
            }));
        },

        resetContactForm: function(event){
            if(this.model.isNew()){
                AniCRM.router.redirect('contacts');
            }
            else{
                //reset all fields;
            }
        },

        createDropdownInput: function(type){
            if(this.dropdownInputs[type]){
               return this.dropdownInputs[type];
            }

            var mediaTypes = _.where(this.mediaTypes, {type: type});
            var viewName = 'Contact' + (type.charAt(0).toUpperCase() + type.slice(1));
            var dropdownInputView = AniCRM.create(DropdownInputMultipleView, viewName, {
                types: mediaTypes
            });
            //Слушаем коллекцию нашего дропдауна
            this.listenTo(dropdownInputView.collection, 'add', function(model){
                this.model.get(type + 's').add({}, {selfAdd: true});
                this.model.get(type + 's').last().mediaTypeValue = model;
            }, this);
            this.listenTo(dropdownInputView.collection, 'change', function(model){
                if(_.isObject(model.mediaTypeValue)) {
                    if (model.hasChanged('value')) {
                        model.mediaTypeValue.set('value', model.get('value'));
                    }
                    if (model.hasChanged('typeId')) {
                        model.mediaTypeValue.set('mediaTypeId', model.get('typeId'));
                    }
                }
            }, this);

            return (this.dropdownInputs[type] = dropdownInputView);
        },

        renderPhones: function(){
            this.$el.find('#contact_phones div.col-lg-8').html(this.dropdownInputs.phone.render().$el);
        },

        renderEmails: function(){
            this.$el.find('#contact_emails div.col-lg-8').html(this.dropdownInputs.email.render().$el);
        },

        renderMessengers: function(){
            this.$el.find('#contact_messengers div.col-lg-8').html(this.dropdownInputs.messenger.render().$el);
        },

		render: function() {
            if(!this.$el.text()){
                this.setElement(this.template());
            }
            //this.renderPhones();
            //this.renderEmails();
            //this.renderMessengers();

            return this;
        }
	});
	
	return EditContactView;
});