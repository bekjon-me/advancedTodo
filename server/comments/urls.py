from django.urls import path
from .views import CommentViewSet


urlpatterns = [
    # task-comments
    path('<int:upid>/tasks/<int:ptid>/comments/',
         CommentViewSet.as_view(
             {'get': 'list', 'post': 'create'}), name='task-comments-list'),
    path('<int:upid>/tasks/<int:ptid>/comments/<int:tcid>/',
         CommentViewSet.as_view(
             {'get': 'retrieve',
              'post': 'create',
              'delete': 'destroy'}), name='task-comment'),

    # subtask-comments
    path('<int:upid>/tasks/<int:ptid>/subtasks/<int:tsid>/comments/',
         CommentViewSet.as_view(
             {'get': 'list', 'post': 'create'}), name='subtask-comments-list'),
    path(str(
        '<int:upid>/tasks/<int:ptid>/subtasks/<int:tsid>/' + \
        'comments/<int:tcid>/'),
        CommentViewSet.as_view(
        {'get': 'retrieve',
         'post': 'create',
         'delete': 'destroy'}), name='subtask-comment'),
]
