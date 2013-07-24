# TopToDo

Simple todo list example built with Django and Django Rest Framework on backend and Ember.js on frontend.
Users can register, login enter todos with priorities. They can edit the list, mark todo as done and remove todos. 

## Quickstart

Create virtualenv and activate it. Install stuff from requirements.txt. Sync the database. Run Django development server.
```
workon project_name
python manage.py syncdb
python manage.py runserver
```

Urls:

1. main site http://127.0.0.1:8000/
2. admin site http://127.0.0.1:8000/admin/
3. browsable api http://127.0.0.1:8000/api/


## Known issues
1. Logging in after logout brings the todos of previous user. Workaround is to reload the page after logout. Hopefully, feature that enable easy fix on that will be implemented in Ember.js soon. [[https://github.com/emberjs/data/issues/235]]
2. Sorting after list priorities changed needs to happend on client.
