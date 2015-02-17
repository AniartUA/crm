define(
    [
        'jquery', 'backbone',
        '../collections/DropdownInputCollection',
        './DropdownInputView'
    ],
    function($, Backbone, Collection, ItemView){

        var ComponentView = Backbone.View.extend({

            addControl: null,

            initialize: function(){
                this.dropdownInputs = [];
                _.bindAll(this, 'render');

                if(!this.collection){
                    this.collection = new Collection();
                }

                //при инициализации представление должно всегда иметь 1 пустое поле
                this.addNewModel();

                this.listenTo(this.collection, {
                    'add remove': function(model, collection, options){
                        this.render();
                    },
                    'reset': function(){
                        this.render();
                    }
                }, this);
                this.listenTo(this.collection, {
                    'change:value': this.changeValue,
                    'change:typeId':this.changeTypeId
                }, this);
            },

            events: {
                'click a.dropdownInput-add': function(event){
                    event.preventDefault();
                    this.addNewModel();
                }
            },

            changeValue: function(model){
                var emptyModelsCount = this.collection.getEmpty().length;
                //скрываем ссылку добавления нового инпута
                if(emptyModelsCount > 0){
                    this.addControl.hide();
                }
                //показываем ссылку
                else{
                    this.addControl.show();
                }
                this.trigger('change', model, this.collection);
            },

            changeTypeId: function(model){
                this.trigger('change', model, this.collection);
            },

            /**
             * Добавляет новую пустую модель в коллекцию представления, предварительно удалив
             * остальные пустые модели коллекции
             *
             * @param {*} [options] настройки которые будут делегированы функции collection.add(models, options)
             */
            addNewModel: function(options){
                this.collection.removeEmpty();
                this.collection.add({}, options);
            },

            removeDropdownInputViews: function(){
                this.dropdownInputs.forEach(function(dropdownInput){
                    dropdownInput.remove();
                });
            },

            render: function(){
                //удаляем все старые представления
                this.removeDropdownInputViews();
                //очищаем контейнер от прочего лишнего
                this.$el.empty();

                this.collection.each(function(dropdownInput){
                    var dropdownInputView = new ItemView({model: dropdownInput});
                    this.dropdownInputs.push(dropdownInputView);
                    this.$el.append(dropdownInputView.render().$el);
                }, this);

                this.addControl = $('<a>', {
                    href: '#',
                    text: 'Добавить еще',
                    'class': 'pse-link dropdownInput-add',
                    css: {float: 'right', display: 'none'}
                });
                this.$el.append(this.addControl);

                return this;
            }
        });

	    return ComponentView;
});