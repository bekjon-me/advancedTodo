from django.urls import path
# from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, SubTaskViewSet, \
    AttachedFileViewSet, AttachedFileDownloadViewSet


# router = DefaultRouter()
# router.register(r'tasks', TaskViewSet, basename='Tasks')

# urlpatterns = router.urls

urlpatterns = [
    # tasks views
    path('<int:upid>/tasks/',
         TaskViewSet.as_view(
             {'get': 'list', 'post': 'create'}), name='tasks-list'),
    path('<int:upid>/tasks/<int:ptid>/',
         TaskViewSet.as_view(
             {'get': 'retrieve',
              'put': 'update',
              'patch': 'partial_update',
              'delete': 'destroy'}), name='task-detail'),
    # task attached files views
    path('<int:upid>/tasks/<int:ptid>/files/',
         AttachedFileViewSet.as_view(
             {'get': 'list', 'post': 'create'}), name='task-files-list'),
    path('<int:upid>/tasks/<int:ptid>/files/<int:tfid>/',
         AttachedFileViewSet.as_view(
             {'get': 'retrieve',
              'put': 'update',
              'patch': 'partial_update',
              'delete': 'destroy'}), name='task-file-detail'),
    # file download
    path('<int:upid>/tasks/<int:ptid>/files/<int:tfid>/download/',
         AttachedFileDownloadViewSet.as_view(
             {'get': 'retrieve'}), name='task-file-download'),

    # subtasks views
    path('<int:upid>/tasks/<int:ptid>/subtasks/',
         SubTaskViewSet.as_view(
             {'get': 'list', 'post': 'create'}), name='subtasks-list'),
    path('<int:upid>/tasks/<int:ptid>/subtasks/<int:tsid>/',
         SubTaskViewSet.as_view(
             {'get': 'retrieve',
              'put': 'update',
              'patch': 'partial_update',
              'delete': 'destroy'}), name='subtask-detail'),
    # subtask attached files views
    path('<int:upid>/tasks/<int:ptid>/subtasks/<int:tsid>/files/',
         AttachedFileViewSet.as_view(
             {'get': 'list', 'post': 'create'}), name='subtask-files-list'),
    path('<int:upid>/tasks/<int:ptid>/subtasks/<int:tsid>/files/<int:tfid>/',
         AttachedFileViewSet.as_view(
             {'get': 'retrieve',
              'put': 'update',
              'patch': 'partial_update',
              'delete': 'destroy'}), name='subtask-file-detail'),
    # file download
    path('<int:upid>/tasks/<int:ptid>/subtasks/<int:tsid>/files/<int:tfid>/download/',
         AttachedFileDownloadViewSet.as_view(
             {'get': 'retrieve'}), name='subtask-file-download'),
]
