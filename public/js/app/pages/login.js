require(['jquery', 'modules/errors/views/FormErrorsView'], function($, FormErrorsView){

    var form = $('#users_login_form');
    var formErrors = new FormErrorsView({
        form: form,
        fields: {
            login: '#login_email',
            password: '#login_password',
            remember: '#login_remember'
        },
        aliases: {
            login: ['email']
        }
    });

    form.on('submit', function(e){
        e.preventDefault();
        formErrors.setErrors([]);
        var params = form.serialize();
        var jqxhr = $.post($(this).attr('action'), params);
        AniCRM.loader.processResponse(jqxhr, {
            error: function(data, options){
                formErrors.addErrors(data.data.errors);
            }
        });
    });
});