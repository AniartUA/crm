/**
 * Created by damian on 24.11.14.
 */
define([
    'components/DropdownInput/collections/DropdownInputCollection',
    'modules/phones/collections/PhoneCollection',
    'modules/media_types/collections/MediaTypeValueDropdownInputCollectionsAdapter'
], function(DropdownInputCollection, PhoneCollection, MediaTypeValueDropdownInputCollectionsAdapter){

    var types = [
        {id: 1, name: 'Телефон', type: 'phone'},
        {id: 2, name: 'Раб. телефон', type: 'phone'},
        {id: 3, name: 'Дом. телефон', type: 'phone'}
    ];

    var phones;
    var adapter;

    describe('Тестируем MediaTypeValueDropdownInputCollectionsAdapter', function(){

        beforeEach(function(){
            phones = new PhoneCollection([
                {mediaTypeId: 1, value: '111'},
                {mediaTypeId: 2, value: '222'}
            ]);

            adapter = new MediaTypeValueDropdownInputCollectionsAdapter([], {
                mediaTypeValues: phones,
                types: types
            });
        });

        it('Адаптер - это тот же DropdownInputCollection, который связан с MediaTypeValueCollection', function(){
            expect(adapter instanceof DropdownInputCollection).toBeTruthy();
        });

        it('При инициализации адаптера, его дропдауны должны соотв. медиатипам прикрепленной коллекции', function(){
            expect(adapter.size()).toBe(phones.size());
            adapter.each(function(dropdownInput, index){
                expect(dropdownInput.get('typeId')).toBe(phones.at(index).get('mediaTypeId'));
                expect(dropdownInput.get('value')).toBe(phones.at(index).get('value'));
            });
        });

        it('При добавлении нового дропдауна в коллекцию адаптера, должен добавл. и соотв. медиатип в связанную ' +
        'коллекцию медиатипов', function(){
            adapter.add({typeId: 3, value: '333'});
            expect(phones.at(2)).toBeDefined();
            expect(phones.at(2).toJSON()).toEqual({
               mediaTypeId: 3, value: '333'
            });
        });

        it('При добавлении нового медиатипа должен добавляться и новый дропдаун в коллекции адаптера', function(){
            phones.add({mediaTypeId: 3, value: '333'});
            expect(adapter.size()).toBe(3);
            expect(adapter.at(2).get('typeId')).toEqual(3);
            expect(adapter.at(2).get('value')).toEqual('333');
        });

        it('При удалении дропдауна из адаптера, должен удаляться и соотв. ему медиатип из связанно коллекции' +
            ' медиатипов', function(){
            adapter.remove(adapter.where({typeId: 1}));
            expect(phones.size()).toBe(1);
            expect(phones.where({mediaTypeId: 1}).length).toBe(0);
        });

        it('При удалении медиатипа из связанно коллекции, должен удаляться и соотв. дропдаун из адаптера', function(){
            phones.remove(phones.where({mediaTypeId: 1}));
            expect(adapter.size()).toBe(1);
            expect(adapter.where({typeId: 1}).length).toBe(0);
        });
    });
});