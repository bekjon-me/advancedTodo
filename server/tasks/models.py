from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey, \
    GenericRelation
from projects.models import Project
from comments.models import Comment
from .utils import cal_key
# Create your models here.


class BaseTask(models.Model):
    """Base task model"""

    class Meta:
        abstract = True

    title = models.CharField(max_length=50)
    description = models.TextField()

    attached_files = GenericRelation('AttachedFile')

    comments = GenericRelation(Comment)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    beginning = models.DateTimeField()
    completion = models.DateTimeField()

    IMPORTANCE = [
        ('not_important', 'Not important'),
        ('moderately_important', 'Moderately important'),
        ('important', 'Important'),
    ]

    importance = models.CharField(max_length=20, choices=IMPORTANCE)

    STATUS = [
        ('queue', 'Queue'),
        ('development', 'Development'),
        ('done', 'Done'),
    ]

    current_status = models.CharField(
        max_length=11, choices=STATUS, default='queue')


class Task(BaseTask):
    class Meta:
        ordering = ['ptid']
        unique_together = [
            ['project', 'ptid'],
            # ['project', 'title'],
        ]

    ptid = models.PositiveIntegerField()  # project-task_id
    project = models.ForeignKey(
        Project, related_name='tasks', on_delete=models.CASCADE)

    def __str__(self):
        return str(
            f"UPID:{self.project.upid} PTID:{self.ptid} NAME:{self.title}"
        )

    def save(self, *args, **kwargs):
        if self._state.adding is True:
            ptid = cal_key(self.project, Task)
            self.ptid = ptid
        return super(Task, self).save(*args, **kwargs)


class SubTask(BaseTask):
    class Meta:
        ordering = ['tsid']
        unique_together = [
            ['task', 'tsid'],
            # ['task', 'title'],
        ]

    tsid = models.PositiveIntegerField()  # task-subtask_id
    task = models.ForeignKey(
        Task, related_name='subtasks', on_delete=models.CASCADE)

    def __str__(self):
        return str(
            f"PTID:{self.task.ptid} TSID:{self.tsid} NAME:{self.title}"
        )

    def save(self, *args, **kwargs):
        if self._state.adding is True:
            tsid = cal_key(self.task, SubTask)
            self.tsid = tsid
        return super(SubTask, self).save(*args, **kwargs)


class AttachedFile(models.Model):
    class Meta:
        indexes = [
            models.Index(fields=["content_type", "object_id"]),
        ]
        ordering = ['tfid']
        unique_together = [
            ['content_type', 'object_id', 'tfid'],
        ]

    TASK_TYPE = (
        models.Q(
            app_label='tasks', model='task'
        ) | models.Q(
            app_label='tasks', model='subtask'
        )
    )

    tfid = models.PositiveIntegerField()  # task-file_id
    name = models.CharField(max_length=30, blank=True, null=True)
    info = models.TextField(max_length=70, blank=True, null=True)
    attached_file = models.FileField(upload_to='attached_files/')

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE,
        limit_choices_to=TASK_TYPE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return str(
            f"OBJECT:[{self.content_object}] TFID:{self.tfid} "
            f"NAME:{self.name}"
        )

    def save(self, *args, **kwargs):
        if self._state.adding is True:
            tfid = cal_key(
                self.content_object, AttachedFile,
                self.content_type, self.object_id)
            self.tfid = tfid
        return super(AttachedFile, self).save(*args, **kwargs)
