from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from .utils import cal_key
# Create your models here.


class Comment(models.Model):
    class Meta:
        indexes = [
            models.Index(fields=["content_type", "object_id"]),
        ]
        ordering = ['created']
        unique_together = [
            ['content_type', 'object_id', 'tcid', ]
        ]

    TASK_TYPE = (
        models.Q(
            app_label='tasks', model='task'
        ) | models.Q(
            app_label='tasks', model='subtask'
        )
    )

    tcid = models.PositiveIntegerField()  # task-comment_id

    author = models.ForeignKey(User, on_delete=models.CASCADE)

    text = models.TextField(max_length=255)
    parent = models.ForeignKey(
        'self', null=True, blank=True,
        on_delete=models.CASCADE, related_name='replies')

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE,
        limit_choices_to=TASK_TYPE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return f'USER:{self.author.username} OBJECT: [{self.content_object}]'

    def save(self, *args, **kwargs):
        if self._state.adding is True:
            tcid = cal_key(
                self.content_object, Comment,
                self.content_type, self.object_id)
            self.tcid = tcid
        return super(Comment, self).save(*args, **kwargs)
