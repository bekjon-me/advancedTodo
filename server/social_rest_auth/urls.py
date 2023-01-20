from django.urls import path
from dj_rest_auth.registration.views import SocialAccountListView, \
    SocialAccountDisconnectView
from .views import GoogleLoginView, GoogleConnectView, googlecallback


urlpatterns = [
    path('google/login/', GoogleLoginView.as_view(), name='google_login'),
    path('google/connect/',
         GoogleConnectView.as_view(), name='google_connect'),
    path('google/callback/', googlecallback, name='google_callback'),
    path('connections/',
         SocialAccountListView.as_view(), name='socialaccount_connections'),
    path('disconnect/<int:pk>/',
         SocialAccountDisconnectView.as_view(), name='socialaccount_disconnect'),
]
