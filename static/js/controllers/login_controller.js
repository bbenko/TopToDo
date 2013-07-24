// Controllers
App.LoginController = Ember.Controller.extend({

    reset: function () {
        this.setProperties({
            email: "",
            password: "",
            errorMessage: "",
            infoMessage: ""
        });
    },

    token: localStorage.token,
    tokenChanged: function () {
        localStorage.token = this.get('token');
    }.observes('token'),

    doLogin: function () {

        var self = this, data = this.getProperties('email', 'password');
        data.username = data.email;

        self.set('errorMessage', null);
        $.ajaxSetup({
            headers: { 'Authorization': '' }
        });
        $.post('/api-token-auth/', data)
            .done(function (response) {
                self.set('token', response.token);
                self.transitionToRoute('todos');
            })
            .fail(function (response) {
                errors = "";
                $.each(jQuery.parseJSON(response.responseText), function (key, values) {
                    errors += values[0] + " ";
                });
                self.set('errorMessage', errors);
                self.set('token', '');
            });
    }
});