/**
 * Created by damian on 31.10.14.
 */
define([
        'backbone',
        'modules/errors/collections/ErrorCollection',
        'modules/errors/views/ErrorView'
    ],
    function(Component, ErrorCollection, ErrorView){
    var FormErrorsView = Backbone.View.extend({
        form: null, //DOM-element
        fields: {}, //Selectors. Ex.: {phone: '#contact_phones .input-group'}
        aliasess: {}, //Aliases for fiedls. Ex {phone: ['phone_id', 'phones']}
        errorFields: [],
        errorSelector: '',

        initialize: function(params){
            this.form   = params.form;
            this.fields = params.fields;
            this.aliases = params.aliases || {};
            if(!this.collection){
                this.collection = new ErrorCollection();
            }
            _.bindAll(this,
                'findField', 'showError', 'clearError', 'clearAll', 'setErrors', 'render',
                'isFieldInput', 'highlightFieldAsError', 'highlightFieldAsNormal'
            );
            this.collection.on('add', this.render);
            this.collection.on('remove', this.render);
            this.collection.on('reset', this.render);
        },

        findField: function(fieldCode, formPosition){
            formPosition = formPosition || 0;
            if(fieldCode){
                if(!this.fields[fieldCode] && this.fields['default']){
                    this.fields[fieldCode] = this.fields['default'] + fieldCode;
                }
                var $field = $($(this.form).find(this.fields[fieldCode]).get(formPosition));
                if($field.length == 1){
                    return $field;
                }
            }

            return false;
        },

        isFieldInput: function($field){
            var field = $field.get(0);
            if(_.contains(['INPUT', 'SELECT', 'TEXTAREA'], field.tagName)){
                return true;
            }

            return false;
        },

        highlightFieldAsError: function($field){
            if(this.isFieldInput($field)){
                $field = $field.parent();
            }
            $field.addClass('has-error');
        },

        highlightFieldAsNormal: function($field){
            if(this.isFieldInput($field)){
                $field = $field.parent();
            }
            $field.removeClass('has-error');
        },

        showError: function(error){
            var fieldCode = error.additional('attribute');
            var formPosition = error.additional('formPosition');
            if($field = this.findField(fieldCode, formPosition)){
                var errorView = new ErrorView({model: error});
                if(!this.errorSelector){
                    this.errorSelector = errorView.tagName + '.' + errorView.className.replace(/\s+/g, '.');
                }
                $field.after(errorView.$el);
                this.highlightFieldAsError($field);
                this.errorFields.push(error);
            }
        },

        clearError: function(error){
            var fieldCode = error.additional('attribute');
            var formPosition = error.additional('formPosition');
            if($field = this.findField(fieldCode, formPosition)){
                $field.siblings(this.errorSelector).each(function(){
                   $(this).remove();
                });
                this.highlightFieldAsNormal($field);
                this.errorFields = _.reject(this.errorFields, function(error){
                    return (error.additional('attribute') == fieldCode && error.additional('formPosition') == formPosition);
                }, this);

                return true;
            }

            return false;
        },

        _processErrors: function(errors){
            if(!_.isArray(errors)) {
                return false;
            }
            var errorModels= [];
            errors.forEach(function(err){
                if(!(err instanceof this.collection.model)){
                    err = new this.collection.model(err);
                }
                if(!_.isEmpty(this.aliases)){
                    for(var field in this.aliases){
                        var fieldAliases = this.aliases[field];
                        var attr = err.additional('attribute');
                        if(
                            attr  &&
                            attr != field &&
                            _.contains(fieldAliases, attr)
                        ){
                            var additional = err.get('additional');
                            additional['attribute'] = field;
                            err.set('additional', additional);
                        }
                    }
                }
                errorModels.push(err);
            }, this);

            return errorModels;
        },

        clearAll: function(){
            var clearCount = 0;
            this.errorFields.forEach(function(error){
                if(this.clearError(error)){
                    clearCount++;
                }
            }, this);

            return clearCount;
        },

        addErrors: function(errors){
            if(errors = this._processErrors(errors)){
                this.collection.add(errors);
            }
        },

        setErrors: function(errors){
            if(errors = this._processErrors(errors)){
                this.collection.reset(errors);
            }
        },

        render: function(){
            this.clearAll();
            this.collection.each(function(error){
                this.showError(error);
            }, this);
        }

    });

    return FormErrorsView;
});
