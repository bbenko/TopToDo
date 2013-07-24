// Controllers
App.RegisterController = Ember.Controller.extend({

    reset: function () {
        this.setProperties({
            email: "",
            password: "",
            repeatPassword: "",
            errorMessage: ""
        });
    },

    doRegister: function () {
        var self = this, data = this.getProperties('email', 'password', 'repeatPassword');
        if (data.password != data.repeatPassword) {
            self.set('errorMessage', "Passwords don't match");
            return;
        }
        self.set('errorMessage', null);
        $.ajaxSetup({
            headers: {}
        });
        $.post('/api/register/', data)
            .done(function (response) {
                alert("Successfuly registred. Please login.")
                self.transitionToRoute('login');
            })
            .fail(function (response) {
                errors = "";
                $.each(jQuery.parseJSON(response.responseText), function (key, values) {
                    errors += values[0] + " ";
                });
                self.set('errorMessage', errors);
            });
    }
});