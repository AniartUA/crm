/**
 * Created by damian on 18.11.14.
 */
define([
    'components/DropdownInput/models/DropdownInput',
    'components/DropdownInput/collections/DropdownInputCollection',
    'components/DropdownInput/views/DropdownInputView',
    'components/DropdownInput/views/DropdownInputMultipleView'
], function(DropdownInput, DropdownInputCollection, DropdownInputView, DropdownInputMultipleView){
    describe('Тесты для DropdownInput', function(){

        beforeEach(function(){
            this.dropdownInput = new DropdownInput({
                typeId: 3, //Идентификатор выбранного типа
                typeName: 'Мандарин', // Название выбранного типа
                types: [ // Список типов
                    {id: '1', name: 'Апельсин'},
                    {id: '2', name: 'Мандарин'},
                    {id: '3', name: 'Яблоко'}
                ],
                value: '' //значение для выбранного типа
            });
        });

        describe('Тестируем модель DropdownInput', function(){

            describe('Инициализация', function(){

                it('Название типа должно соответствовать его идентификатору', function(){
                    expect(this.dropdownInput.get('typeName')).toEqual('Яблоко');
                });

                it('Если тип не задан, по умолчанию должен подставлять первый из списка', function(){
                    var dropdownInput = new DropdownInput({
                       types: [
                           {id: '1', name: 'Апельсин'},
                           {id: '2', name: 'Мандарин'},
                           {id: '3', name: 'Яблоко'}
                       ]
                    });
                    expect(dropdownInput.get('typeId')).toEqual('1');
                });

            });

            describe('Изменение атрибутов', function(){

                it('При изменении идентификатора типа должно меняться и его название', function(){
                    this.dropdownInput.set('typeId', '2');
                    expect(this.dropdownInput.get('typeName')).toEqual('Мандарин');
                });


                it('При изменении списка типов, если ранее установленного типа нету в новом списке, то должен ' +
                'подставляться первый тип из списка', function(){
                    this.dropdownInput.set('typeId', '3');
                    this.dropdownInput.set('types', [
                        {id: '5', name: 'Манго'},
                        {id: '1', name: 'Мандарин'},
                        {id: '2', name: 'Апельсин'}
                    ]);
                    expect(this.dropdownInput.get('typeId')).toEqual('5');
                });

            });

        });

        describe('Тестируем коллекцию DropdownInputCollection', function(){

            var collection;
            var types;

            beforeEach(function(){
                types = [
                    {id: 1, name: 'Синий'},
                    {id: 2, name: 'Красный'},
                    {id: 3, name: 'Зеленый'}
                ];
                collection = new DropdownInputCollection([this.dropdownInput], {types: types});
            });

            it('При инициализации коллекции, если у какой либо модели в коллекции нету типов, то такая модель должна ' +
            'взять типы у коллекции', function(){
                this.dropdownInput.set('types', []);
                collectionModel = new DropdownInputCollection([this.dropdownInput], {types: types});
                collectionObject = new DropdownInputCollection([{}], {types: types});
                expect(collectionModel.at(0).get('types').length).toBe(3);
                expect(collectionObject.at(0).get('types').length).toBe(3);
            });

            it('При добавлении модели в коллекцию, если у модели нет собственного списка типов, то этот список ' +
            'модель должна взять у коллекции', function(){
                var model = this.dropdownInput.clone();
                model.set('types', []);
                collection.add(model);
                expect(model.getTypeNameById(2)).toBe('Красный');
            });

        });


        describe('Тестируем представление DropdownInputView', function(){

            var dropdownInputView;
            var emptyContainer = $('<div>', {id: 'dropdown_input_view_empty'});
            var customContainer = $('<div>', {id: 'dropdown_input_view_custom'});
            $('#tests_sandbox')
                .append(emptyContainer)
                .append(customContainer)
            ;

            it('Представление должно иметь возможность рисовать само себя', function(){
                dropdownInputView = new DropdownInputView();
                emptyContainer.append(dropdownInputView.render().$el);
                expect(emptyContainer.find('div.input-group.m-b').length).toBe(1);
            });

            beforeEach(function(){
                dropdownInputView = new DropdownInputView({model: this.dropdownInput});
                customContainer.empty().append(dropdownInputView.render().$el);
            });

            it('Представление должно соответствовать своей модели', function(){
                dropdownInputView.$el.find('ul li').each(function(){
                    var id = $(this).attr('data-id');
                    expect(id).toEqual(dropdownInputView.model.getTypeById(id).id);
                });
            });

            it('При выборе значения из выпад. списка должен меняться тип привязанной модели', function(){
                customContainer.find('ul li:eq(1)').trigger('click');
                expect(dropdownInputView.model.get('typeId')).toEqual('2');
            });

            it('При изменении типа модели должно меняться и отображение в представлении', function(){
                dropdownInputView.model.set('typeId', 1);
                expect(customContainer.find('button span:first').text()).toBe(dropdownInputView.model.get('typeName'));
            });

            it('При вводе значения(событие input), должно меняться значение модели, которое соотв. выбранному типу', function(){
                customContainer.find('input').val("Значение поля").trigger('input');
                expect(dropdownInputView.model.get('value')).toBe(customContainer.find('input').val());
            });

            it('При изменении значения модели, должно меняться и значения в представлении', function(){
                dropdownInputView.model.set('value', "Желчь");
                expect(customContainer.find('input').val()).toBe(dropdownInputView.model.get('value'));
            });

        });

        describe('Тестируем представление DropdownInputMultipleView', function(){

            var view;
            var collection;
            var types;
            var customContainer = $('<div>', {id: 'dropdown_input_multiple_view_custom'});
            $('#tests_sandbox')
                .append(customContainer)
            ;


            beforeEach(function(){
                types = [
                    {id:1, name: 'Синий'},
                    {id:2, name: 'Красный'},
                    {id:3, name: 'Зелёный'}
                ];
                collection = new DropdownInputCollection([
                    {typeId: 1, value: 'aaa'},
                    {typeId: 2, value: 'bbb'}
                ], {types: types});
                view = new DropdownInputMultipleView({collection: collection});
                customContainer.empty().append(view.render().$el);
            });

            it('При инициализции коллекция представления всегда должна иметь один пустой элемент', function(){
                expect(collection.getEmpty().length).toBe(1);
            });


            it('При добавлении новой модели в коллекцию, должен появляться новый DropdownInputView', function(){
                view.collection.add({});
                expect(view.$el.find('div.input-group.m-b').length).toBe(collection.size());
            });

            it('При удалении модели из коллекции, должен удаляться и соотв. ей DropdownInputView', function(){
                view.collection.add({});
                view.collection.remove(view.collection.at(0));
                expect(view.$el.find('div.input-group.m-b').length).toBe(collection.size());
            });

            it('При заполнении значений всех моделей коллекции , ' +
            'должна показываться ссылка для добавления новой модели в коллекцию', function(){
                view.collection.each(function(model){
                    model.set('value', 'abc');
                });
                expect(view.$el.find('a.dropdownInput-add:visible').length).toBe(1);
            });

            it('При нажатии на ссылку добавления новой модели в коллекцию, ' +
            'в коллекцию должна попасть новая модель, а ссылка - пропасть', function(){
                view.collection.each(function(model){
                   model.set('value', 'abc');
                });
                var collectionSize = view.collection.size();
                view.$el.find('a.dropdownInput-add').trigger('click');
                expect(view.collection.size()).toBe(collectionSize + 1);
                expect(view.$el.find('a.dropdownInput-add:visible').length).toBe(0);
            });
        });

    });
});
