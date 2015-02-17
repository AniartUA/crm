/**
 * Created by damian on 20.11.14.
 */
define([
    'modules/phones/models/Phone',
    'modules/phones/collections/PhoneCollection',
    'modules/emails/models/Email',
    'modules/emails/collections/EmailCollection',
    'modules/messengers/models/Messenger',
    'modules/messengers/collections/MessengerCollection',
], function(Phone, PhoneCollection, Email, EmailCollection, Messenger, MessengerCollection){

    var MediaTypeValueFactory = {
        build: function(){
            var arguments = _.toArray(arguments);
            var type = arguments.shift();
            switch(type){
                case 'Phone':
                    return new Phone(arguments[0], arguments[1]);
                    break;
                case 'Email':
                    return new Email(arguments[0], arguments[1]);
                    break;
                case 'Messenger':
                    return new Messenger(arguments[0], arguments[1]);
                    break;
                case 'phones':
                case 'PhoneCollection':
                    return new PhoneCollection(arguments[0], arguments[1]);
                    break;
                case 'emails':
                case 'EmailCollection':
                    return new EmailCollection(arguments[0], arguments[1]);
                    break;
                case 'messengers':
                case 'MessengerCollection':
                    return new MessengerCollection(arguments[0], arguments[1]);
                    break;
                default:
                    return null;
            }
        }
    }

    /*
    return {
        model: {
            phone: function(){
                return applyToConstructor(Phone, arguments);
            },
            email: function(){
                return applyToConstructor(Email, arguments);
            },
            messenger: function(){
                return applyToConstructor(Messenger, arguments);
            }
        },
        collection: {
            phones: function(){
                return applyToConstructor(PhoneCollection, arguments);
            },
            emails: function(){
                //return applyToConstructor(EmailCollection, arguments);
                //return applyToConstructor.call(null, EmailCollection, arguments);
                console.log(new (EmailCollection.bind.apply(EmailCollection, [null].concat(arguments))));alert();
                return new (EmailCollection.bind.apply(EmailCollection, [null].concat(arguments)));
            },
            messengers: function(){
                return applyToConstructor(MessengerCollection, arguments);
            }
        }
    };
    */

    return MediaTypeValueFactory;
});
