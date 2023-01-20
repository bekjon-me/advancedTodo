from rest_framework import serializers
from .models import Task, SubTask, AttachedFile


class AttachedFileSubSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttachedFile
        fields = ['tfid', 'name', ]


class SubTaskSubSerizlizer(serializers.ModelSerializer):
    class Meta:
        model = SubTask
        fields = ['tsid', 'title', ]


class TaskSerializer(serializers.ModelSerializer):
    attached_files = AttachedFileSubSerializer(many=True, read_only=True)
    subtasks = SubTaskSubSerizlizer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = [
            'ptid', 'project',
            'title', 'description',
            'created', 'updated',
            'beginning', 'completion',
            'importance', 'current_status',
            'subtasks',
            'attached_files',
        ]
        read_only_fields = [
            'ptid', 'project',
            'created', 'updated',
            'subtasks',
            'attached_files',
        ]


class SubTaskSerializer(serializers.ModelSerializer):
    attached_files = AttachedFileSubSerializer(many=True, read_only=True)

    class Meta:
        model = SubTask
        fields = [
            'tsid', 'task',
            'title', 'description',
            'created', 'updated',
            'beginning', 'completion',
            'importance', 'current_status',
            'attached_files',
        ]

        read_only_fields = [
            'tsid', 'task',
            'created', 'updated',
        ]


class AttachedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttachedFile
        fields = ['tfid',
                  'name', 'info', 'attached_file',
                  'created', 'updated', ]
        read_only_fields = ['tfid', 'created', 'updated', ]

    def to_representation(self, instance):
        representation = super(
            AttachedFileSerializer, self).to_representation(instance)
        attached_file_url = str(
            self.context.get('request').build_absolute_uri())
        if attached_file_url[-2] == 's':
            attached_file_url += f"{instance.tfid}/download/"
        else:
            attached_file_url += "download/"
        representation['attached_file'] = attached_file_url
        return representation


class AttachedFileDownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttachedFile
        fields = ['attached_file', ]
        read_only_fields = ['attached_file', ]
