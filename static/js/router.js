'use strict';

App.Router.map(function () {
    this.resource('login');
    this.resource('logout');
    this.resource('register');
    this.resource('todos', {path: '/'});
});

App.LoginRoute = Ember.Route.extend({
    setupController: function (controller, context) {
        controller.reset();
    }
});

App.AuthenticatedRoute = Ember.Route.extend({

    beforeModel: function () {
        var token = this.controllerFor('login').get('token');
        if (!token || token == "false") {
            $.ajaxSetup({
                headers: { 'Authorization': '' }
            });
            this.redirectToLogin();
        }
        $.ajaxSetup({
            headers: { 'Authorization': 'Token ' + token }
        });
    },

    redirectToLogin: function () {
        this.transitionTo('login');
    }
});


App.TodosRoute = App.AuthenticatedRoute.extend({
    model: function () {
        return App.Todo.find();
    }
});


App.LogoutRoute = Ember.Route.extend({
    activate: function () {
        this.doLogout();
    },
    doLogout: function () {
        var self = this;
        $.ajaxSetup({
            headers: { 'Authorization': '' }
        });
        self.controllerFor('login').set('token', '');
        $.get('/api/logout/')
            .fail(function (response) {
                var error = jQuery.parseJSON(response.responseText);
                self.set('errorMessage', error.message);
            });
    }
});