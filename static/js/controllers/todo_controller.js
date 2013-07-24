'use strict';

App.TodoController = Ember.ObjectController.extend({
    isEditing: false,

    editTodo: function () {
        this.set('isEditing', true);
    },

    removeTodo: function () {
        var todo = this.get('model');
        todo.deleteRecord();
        todo.get('store').commit();
    },

    saveTodo: function () {
        var priority = this.get('priority');
        console.log(priority);
        if (isNaN(priority))
            return;
        var todo = this.get('model');
        todo.get('store').commit();
        this.set('isEditing', false);
    }
});