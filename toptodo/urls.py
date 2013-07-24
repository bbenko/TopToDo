from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView
from django.conf import settings

from rest_framework import routers
from todo.views import TodoViewSet

admin.autodiscover()

router = routers.DefaultRouter()
router.register(r'todos', TodoViewSet)


urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', 'rest_framework.authtoken.views.obtain_auth_token'),
    url(r'^api/login/', 'todo.views.login'),
    url(r'^api/logout/', 'todo.views.logout'),
    url(r'^api/register/', 'todo.views.register'),
    url(r'^api/', include(router.urls)),
    url(r'^', TemplateView.as_view(template_name='index.html'), name='index'),
)

if settings.DEBUG:
    urlpatterns += patterns(
        '',
        url(r'^site_media/static/(?P<path>.*)$',
            'django.views.static.serve', {
                'document_root': settings.STATIC_ROOT,
                'show_indexes': False,
        }),
        url(r'^media/(?P<path>.*)$',
            'django.views.static.serve', {
                'document_root': settings.MEDIA_ROOT,
                'show_indexes': False,
        }),
    )
