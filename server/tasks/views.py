from rest_framework import viewsets, permissions, mixins
from django.db.models import QuerySet
from django.http import FileResponse
from django.contrib.contenttypes.models import ContentType
from .serializers import TaskSerializer, SubTaskSerializer, \
    AttachedFileSerializer, AttachedFileDownloadSerializer
from .models import Task, SubTask
# Create your views here.


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'ptid'

    def get_queryset(self):
        queryset = Task.objects.filter(
            project__user=self.request.user,
            project__upid=self.kwargs['upid'])

        if isinstance(queryset, QuerySet):
            queryset = queryset.all()
        return queryset

    def perform_create(self, serializer):
        project = self.request.user.projects.get(
            upid=self.kwargs['upid'])
        return serializer.save(project=project)


class SubTaskViewSet(viewsets.ModelViewSet):
    serializer_class = SubTaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'tsid'

    def get_queryset(self):
        queryset = SubTask.objects.filter(
            task__project__user=self.request.user,
            task__project__upid=self.kwargs['upid'],
            task__ptid=self.kwargs['ptid'])

        if isinstance(queryset, QuerySet):
            queryset = queryset.all()
        return queryset

    def perform_create(self, serializer):
        project = self.request.user.projects.get(
            upid=self.kwargs['upid'])
        task = project.tasks.get(ptid=self.kwargs['ptid'])
        return serializer.save(task=task)


class AttachedFileViewSet(viewsets.ModelViewSet):
    serializer_class = AttachedFileSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'tfid'

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
        queryset = queryset.attached_files

        if isinstance(queryset, QuerySet):
            queryset = queryset.all()
        return queryset

    def perform_create(self, serializer):
        project = self.request.user.projects.get(
            upid=self.kwargs['upid'])
        task = project.tasks.get(ptid=self.kwargs['ptid'])

        if 'tsid' in self.kwargs:
            model_ = 'subtask'
            object_id = task.subtasks.get(
                tsid=self.kwargs['tsid']).id
        else:
            model_ = 'task'
            object_id = task.id
        content_type_ = ContentType.objects.get(
            app_label='tasks',
            model=model_)

        return serializer.save(
            content_type=content_type_, object_id=object_id)


class AttachedFileDownloadViewSet(
        mixins.RetrieveModelMixin,
        viewsets.GenericViewSet):

    serializer_class = AttachedFileDownloadSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'tfid'

    def retrieve(self, request, *args, **kwargs):
        # instance = self.get_object()
        # serializer = self.get_serializer(instance)
        # return Response(serializer.data)
        instance = self.get_object()
        return FileResponse(instance.attached_file.file)

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
        queryset = queryset.attached_files

        if isinstance(queryset, QuerySet):
            queryset = queryset.all()
        return queryset
