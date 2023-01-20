from django.contrib.contenttypes.models import ContentType
from django.db.models import QuerySet
from rest_framework import viewsets, permissions
from tasks.models import Task, SubTask
from .models import Comment
from .serializers import CommentSerializer
# Create your views here.


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'tcid'

    def get_queryset(self):
        if 'tsid' in self.kwargs:
            queryset = SubTask.objects.get(
                task__project__user=self.request.user,
                task__project__upid=self.kwargs['upid'],
                task__ptid=self.kwargs['ptid'],
                tsid=self.kwargs['tsid'])
        else:
            queryset = Task.objects.get(
                project__user=self.request.user,
                project__upid=self.kwargs['upid'],
                ptid=self.kwargs['ptid'])
        queryset = queryset.comments

        if isinstance(queryset, QuerySet):
            queryset = queryset.all()
        return queryset

    def perform_create(self, serializer):
        project = self.request.user.projects.get(
            upid=self.kwargs['upid'])
        task = project.tasks.get(ptid=self.kwargs['ptid'])

        if 'tsid' in self.kwargs:
            model_ = 'subtask'
            obj_id = task.subtasks.get(
                tsid=self.kwargs['tsid']).id
        else:
            model_ = 'task'
            obj_id = task.id

        content_type_ = ContentType.objects.get(
            app_label='tasks',
            model=model_)

        if 'tcid' in self.kwargs:
            try:
                parent = Comment.objects.get(
                    content_type=content_type_,
                    object_id=obj_id,
                    tcid=self.kwargs['tcid'])
            except Exception:
                pass
            else:
                return serializer.save(
                    content_type=content_type_,
                    object_id=obj_id,
                    author=self.request.user,
                    parent=parent)

        return serializer.save(
            content_type=content_type_,
            object_id=obj_id,
            author=self.request.user)
