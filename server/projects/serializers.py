from rest_framework import serializers
from .models import Project


class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "upid",
            "name",
            "created",
            "updated",
        ]
        read_only_fields = [
            "upid",
            "created",
            "updated",
        ]
