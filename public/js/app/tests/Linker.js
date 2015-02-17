/**
 * Created by damian on 20.11.14.
 */
define([
    'modules/core/Linker'
], function(Linker){
    describe('Тесты для Linker', function() {
        var linker;

        beforeEach(function(){
            linker = new Linker({
                baseUrl: '/contacts'
            });
            linker.setParams({sort: ['-name', 'position'], filter: {name: ['Andrew', 'Pavel']}, items: {from: '1', to: '15'}});
        });

        it('Linker должен парсить параметры страницы в свои сущности при инициализации', function(){
            //в конструкторе вызывается parse, поэтому будем тестировать с помощью этой функции
            var url = 'http://ad-crm.bi3x.org/tests/Linker?sort=-name|position&filter=name::Andrew::Pavel|position::driver::pilot&items=1-15&page=2';
            var params = linker.parse(url);
            expect(params).toEqual({
                sort: ['-name', 'position'],
                filter: {
                    name: ['Andrew', 'Pavel'],
                    position: ['driver', 'pilot']
                },
                items: {from: '1', to: '15'},
                page: '2'
            });
        });

        it('При добавлении нового параметра, он должен добавляться рекурсивно', function(){
            linker.addParams({sort: ['-updated_at'], filter: {name: ['Oksana'], position: ['pilot']}, items:{from: '2'}});
            expect(linker.getParams()).toEqual({
                sort: ['-name', 'position', '-updated_at'],
                filter: {
                    name: ['Andrew', 'Pavel', 'Oksana'],
                    position: ['pilot']
                },
                items:{
                    from: '2',
                    to: '15'
                }
            });
        });

        it('При добавлении нового параметра с флагом replace, он должен заменяться, но не влиять на сотальные параметры', function(){
            linker.addParams({sort: ['updated_at'], page: '3'}, true);
            expect(linker.getParams()).toEqual({
                filter: {name: ['Andrew', 'Pavel']},
                items: {from: '1', to: '15'},
                sort: ['updated_at'],
                page: '3'
            });
        });

        it('Linker должен уметь формировать request-ссылку по своим параметрам', function(){
            linker.addParams({filter: {position: ['pilot']}});
            expect(linker.getLink()).toEqual('/contacts?sort=-name|position&filter=name::Andrew::Pavel|position::pilot&items=1-15');
        });

    });
});
