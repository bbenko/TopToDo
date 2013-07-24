'use strict';

App.Todo = DS.Model.extend({
    description: DS.attr('string'),
    priority: DS.attr('number'),
    done: DS.attr('boolean'),

    todoDidChange: function () {
        Ember.run.once(this, function () {
            this.get('store').commit();
        });
    }.observes('done')
});
