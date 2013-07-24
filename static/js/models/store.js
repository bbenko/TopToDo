'use strict';

App.Store = DS.DjangoRESTStore.extend({
    adapter: DS.DjangoRESTAdapter.create({
        namespace: 'api'
    })
});
