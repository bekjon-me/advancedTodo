from rest_framework import viewsets, permissions
from django.db.models import QuerySet
from .serializers import ProjectsSerializer
# Create your views here.


class ProjectsViewSet(viewsets.ModelViewSet):

    serializer_class = ProjectsSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'upid'

    def get_queryset(self):
        queryset = self.request.user.projects
        if isinstance(queryset, QuerySet):
            queryset = queryset.all()
        return queryset

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
