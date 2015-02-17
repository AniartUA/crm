require([
    'jquery',
    'jasmine-boot'
], function($){
    //include tests here
    var tests = [
        'tests/DropdownInput',
        'tests/Contacts',
        'tests/MediaTypeValueDropdownInputAdapter',
        'tests/MediaTypeValueDropdownInputCollectionsAdapter',
        'tests/Linker'
        //'tests/Files'
    ];

    //create and append tests buttons
    tests.forEach(function(test){
        var testName = test.split('/').pop();
        var button = $('<a>', {
            'class': 'btn btn-primary btn-xs',
            href: "/"+test,
            text: testName
        });
        $('#tests_list').append(button);
    });

    //load what we need
    var testName = '';
    if(testName = AniCRM.get('testName', '')){
        tests = [
          'tests/' + testName
        ];
    }

    //execute tests
    require(tests, function(){
        window.onload(); //jasmine binding to window.onload event, so call it manually
        (function waitAndMoveJasmineReport()
        {
            var jasmineReport = $('.jasmine_html-reporter');
            if(jasmineReport.length){
                jasmineReport.appendTo('#tests_results');
            }
            else{
                setTimeout(waitAndMoveJasmineReport, 100);
            }
        })();
    });
});