define(['backbone', 'jqueryClock'], function(Backbone){
    var ClockView = Backbone.View.extend({
        tagName: 'span',

        render: function(){
            this.$el.append(
                $('<span>', {'class': 'hour'}),
                $('<span>', {'class': 'min'}),
                $('<span>', {'class': 'sec'})
            );
            this.$el.clock({type: 'digit'});
        }
    });

    return ClockView;
});