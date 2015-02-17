/**
 * Created by damian on 23.11.14.
 */
define([
    'components/DropdownInput/models/DropdownInput',
    'modules/phones/models/Phone',
    'modules/media_types/models/MediaTypeValueDropdownInputAdapter'
], function(DropdownInput, Phone, MediaTypeValueDropdownInputAdapter){
    describe('Тестируем MediaTypeValueDropdownInputAdapter', function(){
        var phone;
        var adapter;
        var types = [
            {id: 1, name: 'Телефон', type: 'phone'},
            {id: 2, name: 'Раб. телефон', type: 'phone'}
        ];

        beforeEach(function(){
            phone = new Phone({mediaTypeId: 1, value: '+380661112233'})

            adapter = new MediaTypeValueDropdownInputAdapter({mediaTypeValue: phone, types: types});
        });

        it('Адаптер - это тот же DropdownInput, только с прилепленным к нему медиатипом, поэтому у них должен' +
        'быть похожий набор атрибутов', function(){
            var dropdownInput = new DropdownInput();
            dropdownInput.keys().forEach(function(attribute){
                expect(adapter.has(attribute)).toBeTruthy();
            });
            expect(adapter.has('mediaTypeValue')).toBeTruthy();
        });

        it('При инициализации адаптер должен присвоить своим атрибутам значения соотв. атрибутов медиатипа', function(){
            expect(adapter.get('typeId')).toBe(phone.get('mediaTypeId'));
            expect(adapter.get('value')).toBe(phone.get('value'));
        });

        it('При изменении атрибутов медиатипа должны меняться атрибуты адаптера', function(){
            phone.set({
                mediaTypeId: 2,
                value: '222'
            });
            expect(adapter.get('typeId')).toBe(phone.get('mediaTypeId'));
            expect(adapter.get('value')).toBe(phone.get('value'));
        });

        it('При изменении атрибутов адаптера должны меняться атрибуты медиатипа', function(){
            adapter.set({
                typeId: 2,
                value: '222'
            });
            expect(phone.get('mediaTypeId')).toBe(adapter.get('typeId'));
            expect(phone.get('value')).toBe(adapter.get('value'));
        });
    });
});