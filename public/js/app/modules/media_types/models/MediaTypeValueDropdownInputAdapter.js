/**
 * Created by damian on 24.11.14.
 */
define([
    'components/DropdownInput/models/DropdownInput',
    './MediaTypeValue'
], function(DropdownInput, MediaTypeValue){

    /**
     * Адаптирует модель DropdownInput, связывая её с моделью MediaTypeValue таким образом, чтобы значения атрибутов
     * DropdownInput соотв. значениям атрибутов MediaTypeValue и наоборот при изменении значений DropdownInput
     * @class
     * @augments DropdownInput
     */
    var MediaTypeValueDropdownInputAdapter = DropdownInput.extend({
        /**@lends MediaTypeValueDropdownInputAdapter */

        defaults: _.extend({}, DropdownInput.prototype.defaults, {
            mediaTypeValue: null
        }),

        /**
         * @constructs
         */
        initialize: function() {
            this._initMediaTypeValue(this.get('mediaTypeValue'));

            //Меняем состояние медиатипа при изменении сотояни адаптера(дропдауна)
            this.on({
                'change:typeId': function (self, typeId) {
                    this.setMediaTypeValueAttribute(this.get('mediaTypeValue'), 'mediaTypeId', typeId);
                },
                'change:value': function (self, value) {
                    this.setMediaTypeValueAttribute(this.get('mediaTypeValue'), 'value', value);
                },
                'change:mediaTypeValue': function(self, mediaTypeValue){
                    this.setMediaTypeValue(mediaTypeValue);
                }
            }, this);

            //Вызовем родительский метод
            MediaTypeValueDropdownInputAdapter.__super__.initialize.apply(this, arguments);
        },

        /**
         * Проверяет является ли объект MediaTypeValue
         *
         * @param mediaTypeValue
         * @private
         * @return bool
         */
        _isMediaTypeValue: function(mediaTypeValue){
            return (mediaTypeValue instanceof MediaTypeValue);
        },
        /**
         * Инициализирует медиатип: проверяет тип, вешает события
         *
         * @param {MediaTypeValue}  mediaTypeValue
         * @returns {boolean}
         * @private
         */
        _initMediaTypeValue: function(mediaTypeValue){

            if(!this._isMediaTypeValue(mediaTypeValue)){
                return false;
            }

            //Меняем атрибуты дропдауна
            this.set('typeId', mediaTypeValue.get('mediaTypeId'));
            this.set('value', mediaTypeValue.get('value'));

            //Меняем состояние адаптера при изменении состояния медиатипа
            this.listenTo(mediaTypeValue, {
                'change:mediaTypeId': function (mediaTypeValue, mediaTypeId) {
                    this.set('typeId', mediaTypeId);
                },
                'change:value': function (mediaTypeValue, value) {
                    this.set('value', value);
                }
            }, this);

            return true;
        },

        /**
         * Устанавливает значение заданного атрибута для оъекта mediaTypeValue
         *
         * @param {MediaTypeValue} mediaTypeValue
         * @param {string} attrName - название атрибута
         * @param {*} attrValue - значение атрибута
         */
        setMediaTypeValueAttribute: function(mediaTypeValue, attrName, attrValue){
            if(this._isMediaTypeValue(mediaTypeValue)){
                mediaTypeValue.set(attrName, attrValue);
            }
        },

        /**
         * Устанавливает медиатип, предварительно его инициализировав
         *
         * @param {MediaTypeValue} mediaTypeValue
         * @returns {boolean}
         */
        setMediaTypeValue: function(mediaTypeValue){
            if(this._initMediaTypeValue(mediaTypeValue)){
                this.set('mediaTypeValue', mediaTypeValue);
                return true;
            }

            return false;
        }

    });

    return MediaTypeValueDropdownInputAdapter;
});