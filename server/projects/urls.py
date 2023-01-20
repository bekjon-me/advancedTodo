from django.urls import path
# from rest_framework import routers
from .views import ProjectsViewSet


# router = routers.DefaultRouter()
# router.register(r'', ProjectsViewSet, basename='Projects')

# urlpatterns = router.urls

urlpatterns = [
    path('', ProjectsViewSet.as_view(
        {'get': 'list', 'post': 'create'}), name='projects-list'),

    path('<int:upid>/', ProjectsViewSet.as_view(
        {'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy'}), name='project-detail'),
]
