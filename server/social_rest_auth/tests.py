from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model


class TaskTests(APITestCase):
    def setUp(self):
        super(TaskTests, self).setUp()
        self.username = "username"
        self.password = "Pas$w0rd"
        self.data = {
            'username': self.username,
            'password': self.password
        }
        self.user_model = get_user_model()

    def test_auth(self):
        # URL using path name
        url = reverse('rest_login')

        # Create a user is a workaround in order to authentication works
        user = self.user_model.objects.create_user(username=self.username, password=self.password)
        self.assertEqual(user.is_active, 1, 'Active User')

        # First post to get access_token
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        access_token = response.data['access_token']

        # Next post/get's will require the access_token to connect
        self.client.credentials(HTTP_AUTHORIZATION='Bearer {0}'.format(access_token))
        response = self.client.get(reverse('rest_user_details'), data={'format': 'json'})
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
