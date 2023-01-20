from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline
from .models import Task, SubTask, AttachedFile
# Register your models here.


class AFInlineAdmin(GenericTabularInline):
    model = AttachedFile
    extra = 1
    readonly_fields = ['tfid', ]


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    inlines = [AFInlineAdmin, ]

    list_display = (
        'ptid', 'project',
        'title', 'description',
        'created', 'updated',
        'beginning', 'completion',
        'importance', 'current_status',
    )

    list_display_links = ('ptid', 'title',)

    readonly_fields = ('ptid', 'project', 'created', 'updated',)
    add_readonly_fields = ('ptid', 'created', 'updated',)

    fieldsets = [
        ('Project', {'fields': ['project', ]},),
        ('Task information', {
            'fields': [
                'ptid', 'title', 'description',
                'beginning', 'completion',
                'importance', 'current_status',
            ]
        },),
        ('Date information', {'fields': ['created', 'updated', ]},),
    ]

    add_fieldsets = [
        ('Project', {'fields': ['project', ]},),
        ('Task information', {
            'fields': [
                'title', 'description',
                'beginning', 'completion',
                'importance', 'current_status',
            ]
        },),
    ]

    search_fields = ['ptid', 'title', ]

    def get_readonly_fields(self, request, obj=None):
        if not obj:
            return self.add_readonly_fields
        return self.readonly_fields

    def get_fieldsets(self, request, obj=None):
        if not obj:
            return self.add_fieldsets
        return super().get_fieldsets(request, obj)


@admin.register(SubTask)
class SubTaskAdmin(admin.ModelAdmin):
    inlines = [AFInlineAdmin, ]

    list_display = (
        'tsid', 'task',
        'title', 'description',
        'created', 'updated',
        'beginning', 'completion',
        'importance', 'current_status',
    )

    list_display_links = ('tsid', 'title',)

    readonly_fields = ('tsid', 'task', 'created', 'updated',)
    add_readonly_fields = ('tsid', 'created', 'updated',)

    fieldsets = [
        ('Project', {'fields': ['task', ]},),
        ('Task information', {
            'fields': [
                'tsid', 'title', 'description',
                'beginning', 'completion',
                'importance', 'current_status',
            ]
        },),
        ('Date information', {'fields': ['created', 'updated', ]},),
    ]
    add_fieldsets = [
        ('Project', {'fields': ['task', ]},),
        ('Task information', {
            'fields': [
                'title', 'description',
                'beginning', 'completion',
                'importance', 'current_status',
            ]
        },),
    ]

    search_fields = ['tsid', 'title', ]

    def get_readonly_fields(self, request, obj=None):
        if not obj:
            return self.add_readonly_fields
        return self.readonly_fields

    def get_fieldsets(self, request, obj=None):
        if not obj:
            return self.add_fieldsets
        return super().get_fieldsets(request, obj)


@admin.register(AttachedFile)
class AttachedFileAdmin(admin.ModelAdmin):
    list_display = (
        'content_type', 'object_id', 'content_object',
        'tfid', 'name', 'info', 'attached_file',
        'created', 'updated',
    )

    list_display_links = ('tfid', 'name', 'attached_file',)

    readonly_fields = ('content_type', 'object_id', 'content_object',
                       'tfid', 'created', 'updated',)
    add_readonly_fields = ('tfid', 'created', 'updated',)

    fieldsets = [
        ('Task', {
            'fields': [
                'content_type', 'object_id', 'content_object',
            ]
        },),
        ('Object - file id', {
            'fields': ['tfid', ]
        },),
        ('File information', {
            'fields': [
                'name', 'info', 'attached_file',
            ]
        },),
        ('Date information', {'fields': ['created', 'updated', ]},),
    ]
    add_fieldsets = [
        ('Task', {
            'fields': [
                'content_type', 'object_id',
            ]
        },),
        ('File information', {
            'fields': [
                'name', 'info', 'attached_file',
            ]
        },),
    ]

    search_fields = ['title', ]

    def get_readonly_fields(self, request, obj=None):
        if not obj:
            return self.add_readonly_fields
        return self.readonly_fields

    def get_fieldsets(self, request, obj=None):
        if not obj:
            return self.add_fieldsets
        return super().get_fieldsets(request, obj)
