/**
 * Created by damian on 20.11.14.
 */
define([
    'modules/phones/collections/PhoneCollection',
    'modules/emails/collections/EmailCollection',
    'modules/messengers/collections/MessengerCollection',
    'modules/contacts/models/Contact',
    'modules/contacts/views/EditFormView',
    'modules/files/collections/FileCollection'
], function(PhoneCollection, EmailCollection, MessengerCollection, Contact, EditFormView, FileCollection){
    describe('Тесты для Контактов(contacts)', function(){

        var contact;

        beforeEach(function(){
            contact = new Contact({
                name: 'Василий Алибабаевич',
                responsible: '1',
                position: 'Сантехних',
                phones: new PhoneCollection([
                    {
                        mediaTypeId: 1,
                        value: '0601112233'
                    },
                    {
                        mediaTypeId: 2,
                        value: '+380662404292'
                    }
                ]),
                emails: [
                    {mediaTypeId: 4, value: 'aa@test.ua'},
                    {mediaTypeId: 5, value: 'bb@test.ua'}
                ],
                files: new FileCollection([
                    {
                        name: '1.jpg',
                        size: 10000000,
                        src: '/1.jpg'
                    },
                    {
                        name: 'text.doc',
                        size: 1234567,
                        src: '/uploads/text.doc'
                    }
                ])
            }, {parse: true});
        });

        describe('Тестируем модель Contact', function(){

            it('Если в качестве phones, emails и messengers передается массив простых объектов, ' +
            'то модель должна сама преобразовать его в соотв. коллекции данных ', function(){
                expect(contact.get('emails') instanceof EmailCollection).toBeTruthy();
                contact.set('phones', [{mediaTypeId: 1, value: '06566666'}, {mediaTypeId: 2, value: '123456778'}]);
                expect(contact.get('phones') instanceof PhoneCollection).toBeTruthy();
                //expect(contact.get('messengers') instanceof MessengerCollection).toBeTruthy();
            });

        });

        describe('Тестируем представление для формы создания/редактирования Контакта EditFormView', function(){

            var view;
            var sandboxContainer = $('#tests_sandbox');

            beforeEach( function(){
                view = new EditFormView({model: contact, mediaTypes: [
                    {id: 1, name: 'Телефон', type: 'phone'},
                    {id: 2, name: 'Раб. телефон', type: 'phone'},
                    {id: 3, name: 'Дом. телефон', type: 'phone'},
                    {id: 4, name: 'Email', type: 'email'},
                    {id: 5, name: 'Корп. Email', type: 'email'},
                    {id: 6, name: 'Skype', type: 'messenger'}
                ]});
                sandboxContainer.empty().append(view.render().$el);
            });

            it('Представление должно иметь возможность рисовасть само себя', function(){
                expect(view.$el.text()).not.toBe('');
            });

            describe('Изменение атрибутов модели(Контакта)', function(){

                it('При изменении названия контакта, название должно меняться и в соотв. поле', function(){
                    contact.set('name', 'Коля Власенко');
                    expect(view.getElement('fieldName').val()).toBe(contact.get('name'));
                });

                it('При изменении ответственного, он должен меняться и  в соотв. поле', function(){
                    contact.set('responsible', 'Коля Власенко');
                    expect(view.getElement('fieldResponsible').val()).toBe(contact.get('responsible'));
                });

                it('При изменении должности контакта, она должна меняться и в соотв. поле', function(){
                    contact.set('position', 'Сварщик');
                    expect(view.getElement('fieldPosition').val()).toBe(contact.get('position'));
                });

                it('При изменении комментария к контакту, он должен меняться и в соотв. поле', function(){
                    var comment = "Ха-ха";
                    contact.set('comment', comment);
                    expect(view.getElement('fieldComment').val()).toBe(comment);
                });

                it('При добавлении телефона контакта, должно появляться новое поле с его параметрами', function(){
                    contact.get('phones').add({mediaTypeId: 3, value: '333'});
                    expect(view.getElement('fieldPhones').find('input').length).toBe(contact.get('phones').size());
                });

                it('При удалении телефона контакта, должно удаляться и поле в котором оно отображалось', function(){
                    contact.get('phones').remove(contact.get('phones').at(1));
                    expect(view.getElement('fieldPhones').find('input').length).toBe(contact.get('phones').size());
                });

                it('При изменении значения телефона контакта, должно меняться и значения в поле, в котором оно ото' +
                'бражается', function(){
                    var value = '066-66-66';
                    contact.get('phones').at('1').set('value', value);
                    expect(view.getElement('fieldPhones').find('input:eq(1)').val()).toBe(value);
                });

                it('При изменении типа телефона контакта, должен меняться и тип в дропдауне', function(){
                    var mediaTypeId = 3;
                    contact.get('phones').at('0').set('mediaTypeId', mediaTypeId);
                    expect(view.getElement('fieldPhones').find('button:eq(0) span:first').text()).toBe(
                        _.where(view.mediaTypes, {id: mediaTypeId})[0].name);
                });

            });

            describe('Изменение значений в полях представления для Контакта', function(){

                it('При изменении поля с названиме контакта, должно меняться и название контакта', function(){
                    var name = 'Петр Леонидович';
                    view.getElement('fieldName').val(name).trigger('input');
                    expect(contact.get('name')).toBe(name);
                });

                it('При изменении поля с ответственным контакта, должен меняться и ответственный контакта', function(){
                    var responsible = 'Я';
                    view.getElement('fieldResponsible').val(responsible).trigger('input');
                    expect(contact.get('responsible')).toBe(responsible);
                });

                it('При изменении поля с должностью контакта, должна меняться и должность контакта', function(){
                    var position = 'Пожарный';
                    view.getElement('fieldPosition').val(position).trigger('input');
                    expect(contact.get('position')).toBe(position);
                });

                it('При изменении поля с комментарием к контакту, должен меняться и комментарий к контакту', function(){
                    var comment = 'Ха-ха';
                    view.getElement('fieldComment').val(comment).trigger('input');
                    expect(contact.get('comment')).toBe(comment);
                });
            });

            describe('Работа с файлами', function(){
                it('Прикрепленные файлы должны отображаться отдельным списком', function(){
                    contact.get('files').at(0).set('id', 6);
                    var filesList = view.getElement('attachedFiles').find('.attached-file');
                    expect(contact.get('files').size()).toBe(filesList.length);
                });

            });
        });
    });
});
