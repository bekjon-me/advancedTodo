from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from .models import Project


class TaskTests(APITestCase):
    def setUp(self):
        super(TaskTests, self).setUp()
        self.username = "username"
        self.password = "Pas$w0rd"
        self.data = {
            "username": self.username,
            "password": self.password,
        }
        self.user_model = get_user_model()

        url = reverse("rest_login")
        user = self.user_model.objects.create_user(
            username=self.username, password=self.password
        )
        response = self.client.post(url, self.data, format="json")
        access_token = response.data["access_token"]
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access_token))

    def test_create_project(self):
        name_ = "P1"

        url = reverse("projects-list")
        resp = self.client.post(url, {"name": name_})
        data = resp.json()

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(data["upid"], 1)
        self.assertEqual(data["name"], name_)
        self.assertTrue(data["created"])
        self.assertTrue(data["updated"])

    def test_get_projects(self):
        n1, n2, n3 = "P1", "P2", "P3"
        user_ = self.user_model.objects.get(pk=1)
        for name in [n1, n2, n3]:
            Project.objects.create(name=name, user=user_)

        url = reverse("projects-list")
        resp = self.client.get(url)
        data = resp.json()

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(data.__len__(), 3)

    def test_get_project(self):
        name_ = "P1"
        Project.objects.create(name=name_, user=self.user_model.objects.get(pk=1))

        url = reverse("project-detail", kwargs={"upid": 1})
        resp = self.client.get(url)
        data = resp.json()

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(data["upid"], 1)
        self.assertEqual(data["name"], name_)
        self.assertTrue(data["created"])
        self.assertTrue(data["updated"])

