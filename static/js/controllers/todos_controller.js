// Controllers
App.TodosController = Ember.ObjectController.extend({
    createTodo: function () {
        var description = this.get('description');
        if (!description.trim()) {
            return;
        }
        App.Todo.createRecord({
            description: description,
            priority: 1,
            done: false
        });

        this.set('description', '');
        this.get('store').commit();
    }
});