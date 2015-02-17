/**
 * @class MediaTypeValue
 */
define(['backbone'], function(Backbone){
    var MediaTypeValue = Backbone.Model.extend({
        defaults: {
            mediaTypeId: 0,
            value: ''
        },

        toDropdownInput: function(){
            var result = {
                typeId: this.get('mediaTypeId'),
                value: this.get('value')
            };
            if(!this.isNew()){
                result.id = this.id;
            }

            return result;
        }
    });

    return MediaTypeValue;
});