from django.db import models
from django.contrib.auth.models import User
from .utils import cal_key


class Project(models.Model):
    class Meta:
        ordering = ["upid"]
        unique_together = ["upid", "user"]

    "Model for Projects"
    upid = models.PositiveIntegerField()  # user-project-id
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="projects")

    name = models.CharField(max_length=50)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return str(
            f"USER:{self.user} UPID:{self.upid} NAME:{self.name}"
            # f"(Date:{self.created.strftime('%m/%d/%Y|%H:%M:%S')})"
        )

    def save(self, *args, **kwargs):
        if self._state.adding is True:
            upid = cal_key(self.user, Project)
            self.upid = upid
        return super(Project, self).save(*args, **kwargs)
