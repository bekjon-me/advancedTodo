from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.oauth2.views import OAuth2LoginView
from allauth.socialaccount.providers.base import AuthAction, AuthProcess
from allauth.socialaccount.models import SocialLogin
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from dj_rest_auth.registration.views import SocialLoginView, SocialConnectView
# Create your views here.


class GoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client

    # https://gist.github.com/dgilge/dbe9260208aadee535cef7c412a1162e#file-07_views-py
    def get(self, request):
        """
        Returns the URL to the login page of provider's authentication server.
        """
        # You should have CSRF protection enabled, see
        # https://security.stackexchange.com/a/104390 (point 3).
        # Therefore this is a POST endpoint.
        # This code is inspired by `OAuth2LoginView.dispatch`.

        adapter = self.adapter_class(request)
        provider = adapter.get_provider()
        app = provider.get_app(request)
        view = OAuth2LoginView()
        view.request = request
        view.adapter = adapter
        client = view.get_client(request, app)
        # You can modify `action` if you have more steps in your auth flow
        action = AuthProcess.LOGIN #AuthAction.AUTHENTICATE
        auth_params = provider.get_auth_params(request, action)
        # You can omit this if you want to validate the state in the frontend
        client.state = SocialLogin.stash_state(request)

        # Custom edit <
        extra_params = {
            'prompt': 'select_account',
        }
        callback_url = request.GET.get('redirect_uri', None)
        if callback_url is not None:
            extra_params.update({'redirect_uri': callback_url})
        auth_params.update(extra_params) # >

        url = client.get_redirect_url(adapter.authorize_url, auth_params)
        return Response({'url': url})


class GoogleConnectView(SocialConnectView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client

    # https://gist.github.com/dgilge/dbe9260208aadee535cef7c412a1162e#file-07_views-py
    def get(self, request):
        """
        Returns the URL to the login page of provider's authentication server.
        """
        # You should have CSRF protection enabled, see
        # https://security.stackexchange.com/a/104390 (point 3).
        # Therefore this is a POST endpoint.
        # This code is inspired by `OAuth2LoginView.dispatch`.

        adapter = self.adapter_class(request)
        provider = adapter.get_provider()
        app = provider.get_app(request)
        view = OAuth2LoginView()
        view.request = request
        view.adapter = adapter
        client = view.get_client(request, app)
        # You can modify `action` if you have more steps in your auth flow
        action = AuthProcess.LOGIN #AuthAction.AUTHENTICATE
        auth_params = provider.get_auth_params(request, action)
        # You can omit this if you want to validate the state in the frontend
        client.state = SocialLogin.stash_state(request)

        # Custom edit <
        extra_params = {
            'prompt': 'select_account',
        }
        callback_url = request.GET.get('redirect_uri', None)
        if callback_url is not None:
            extra_params.update({'redirect_uri': callback_url})
        auth_params.update(extra_params) # >

        url = client.get_redirect_url(adapter.authorize_url, auth_params)
        return Response({'url': url})

@api_view()
@permission_classes((AllowAny,))
def googlecallback(request, *args, **kwargs):
    code = request.GET.get('code', None)
    print(code)
    return Response({'code': code})
