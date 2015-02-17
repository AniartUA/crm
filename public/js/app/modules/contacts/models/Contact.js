define(
    [
        'backbone',
        'modules/media_types/MediaTypeValueFactory',
        'modules/files/collections/FileCollection'
    ],
    function(Backbone, MediaTypeValueFactory, FileCollection){

        var Contact = Backbone.Model.extend({
            defaults:{
                name:			'',
                responsible:	'',
                position: 		'',
                phones: 		MediaTypeValueFactory.build('PhoneCollection'),
                emails: 		MediaTypeValueFactory.build('EmailCollection'),
                messengers:		MediaTypeValueFactory.build('MessengerCollection'),
                comment:        '',
                files:			new FileCollection([]),
                company:        null,
                updated_at:     ''
            },
            urlRoot: '/contacts',

            initialize: function(attributes){
            },

            editUrl: function(){
                return this.urlRoot + '/' + this.id + '/edit';
            },

            getHtmlEditLink: function(){
                return '<a href="'+this.editUrl()+'">'+this.get('name')+'</a>';
            },

            getMediaTypeValues: function(mediaType){
                var result = [];
                if(this.get(mediaType)){
                    result = this.get(mediaType).pluck('value');
                }
                return result;
            },

            set: function(key, val, options){
                var attributes;
                if (typeof key === 'object') {
                    attributes = key;
                    options = val;
                } else {
                    (attributes = {})[key] = val;
                }

                //working with default collection objects which always link to model  attributes
                ['emails', 'phones', 'messengers'].forEach(function(mediaTypeValue){
                    if(_.isArray(attributes[mediaTypeValue])){
                        /*
                        var last = _.last(attributes[mediaTypeValue]);
                        if( last && last.value !== ''){
                            attributes[mediaTypeValue].push([]);
                        }
                        */
                        attributes[mediaTypeValue].push([]);
                        if(!(attributes[mediaTypeValue] = this._normalizeCollectionAttribute(
                            mediaTypeValue,
                            attributes[mediaTypeValue]
                        ))){
                            delete attributes[mediaTypeValue];
                        }
                    }
                }, this);
                if(!(attributes['files'] = this._normalizeCollectionAttribute('files', attributes['files']))){
                    delete attributes['files'];
                }

                return Backbone.Model.prototype.set.call(this, attributes, options);
            },

            _normalizeCollectionAttribute: function(attributeName, attributeValue){
                if(!this.get(attributeName)){
                    var collection = this.defaults[attributeName].clone();
                    this.attributes[attributeName] = collection;
                }

                if(_.isArray(attributeValue)){
                    this.get(attributeName).set(attributeValue, {parse: true});
                    attributeValue = this.get(attributeName);
                }
                else if(!(attributeValue instanceof Backbone.Collection)){
                    attributeValue = false;
                }

                return attributeValue;
            },

            parse: function(response, options){
                if(response.data){
                    response = response.data;
                }
                return {
                    id: response.id,
                    name: response.name,
                    responsible: response.responsible_id,
                    position: response.position,
                    company: response.company_id,
                    comment: response.comment,
                    phones: response.phones,
                    emails: response.emails,
                    messengers: response.messengers,
                    files: response.files,
                    updated_at: response.updated_at
                };
            }
        });

        return Contact;
    });