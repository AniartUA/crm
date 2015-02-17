/**
 * Created by damian on 24.11.14.
 */
define([
    'components/DropdownInput/collections/DropdownInputCollection',
    '../models/MediaTypeValueDropdownInputAdapter',
    './MediaTypeValueCollection'
], function(DropdownInputCollection, MediaTypeValueDropdownInputAdapter, MediaTypeValueCollection){

    /**
     * @class
     * @augments DropdownInputCollection
     */
    var MediaTypeValueDropdownInputCollectionsAdapter = DropdownInputCollection.extend({
        /**@lends MediaTypeValueDropdownInputAdapter */

        model: MediaTypeValueDropdownInputAdapter,
        mediaTypeValues: null,

        /**
         *
         * @param models
         * @param options
         * @constructs
         */
        initialize: function(models, options){
            if(this.setMediaTypeValues(options.mediaTypeValues)){
                //модели должны соотв. моделям коллекции медиатипов
                models.length = 0; //сбрасываем значения, но сохраняем ссылку на исходны массив
                this.mediaTypeValues.each(function(mediaTypeValue){
                    models.push({
                        mediaTypeValue: mediaTypeValue
                    });
                });
            }
            //Вызываем родительскую функцию
            MediaTypeValueDropdownInputCollectionsAdapter.__super__.initialize.apply(this, arguments);

            //Устанавливаем соыбтия, которые будут менять содержимое прикрепленной коллекции медиатипов
            this.on({
                'add': function(dropdownInputAdapter, collection, options){
                    if(options.notAddMediaTypeValue){
                        return;
                    }
                    if(!dropdownInputAdapter.get('mediaTypeValue')){
                        var mediaTypeValue = new this.mediaTypeValues.model({
                            'mediaTypeId': dropdownInputAdapter.get('typeId'),
                            'value': dropdownInputAdapter.get('value')
                        });
                        dropdownInputAdapter.set('mediaTypeValue', mediaTypeValue);
                    }
                    this.mediaTypeValues.add(dropdownInputAdapter.get('mediaTypeValue'), {
                        notAddDropdownInput: true
                    });
                },
                remove: function(dropdownInputAdapter){
                    if(options.notRemoveMediaTypeValue){
                        return;
                    }
                    this.mediaTypeValues.remove(dropdownInputAdapter.get('mediaTypeValue'), {
                        notRemoveDropdownInput: true
                    });
                }
            }, this);
        },

         /**
         * Проверяет принадлежит ли передаваемый объет классу MediaTypeValueCollection
         * @param mediaTypeValues
         * @returns {boolean}
         * @private
         */
        _isMediaTypeValueCollection: function(mediaTypeValues){
            return (mediaTypeValues instanceof  MediaTypeValueCollection);
        },

        setMediaTypeValues: function(mediaTypeValues){
            if(!this._isMediaTypeValueCollection(mediaTypeValues)){
                return false;
            }

            this.mediaTypeValues = mediaTypeValues;

            //вешаемся на события коллекции медиатипов
            this.listenTo(this.mediaTypeValues, {
                'add': function(mediaTypeValue, collection, options){
                    if(!options.notAddDropdownInput) {
                        this.add(new this.model({mediaTypeValue: mediaTypeValue}), {
                            notAddMediaTypeValue: true
                        });
                    }
                },
                remove: function(mediaTypeValue, collection, options){
                    if(!options.notRemoveDropdownInput) {
                        this.remove(this.where({mediaTypeValue: mediaTypeValue}), {
                            notRemoveMediaTypeValue: true
                        });
                    }
                }
            }, this);

            return true;
        }
    });

    return MediaTypeValueDropdownInputCollectionsAdapter;
});