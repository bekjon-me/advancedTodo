# from django.test import TestCase
# from django.contrib.auth.models import User
# from django.contrib.admin.sites import AdminSite
# from django.contrib.admin.options import ModelAdmin
# from .admin import ProjectAdmin
# from .models import Project
# Create your tests here.


# class ProjectAdminTests(TestCase):

#     @classmethod
#     def setUpTestData(cls):
#         cls.user = User.objects.create(
#             username='jahongir',
#             is_superuser=True,
#         )
#         cls.project = Project.objects.create(
#             user=cls.user,
#             name='NewProject'
#         )

#     def sutUp(self):
#         self.site = AdminSite()

#     def test_modeladmin_str(self):
#         ma = ModelAdmin(Project, self.site)
#         self.assertEqual(str(ma),
#             f"User:{self.user} ID:{self.upid} Name:{self.name} "
#             f"(Date:{self.created.strftime('%m/%d/%Y|%H:%M:%S')})"
#         )
