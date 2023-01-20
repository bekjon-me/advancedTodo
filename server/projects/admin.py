from django.contrib import admin
from .models import Project
# Register your models here.


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):

    list_display = ('upid', 'user', 'name', 'created', 'updated',)
    list_display_links = ('upid', 'name',)
    readonly_fields = ('upid', 'user', 'created', 'updated',)
    add_readonly_fields = ('upid', 'created', 'updated',)
    fieldsets = [
        ('Project information', {'fields': ['upid', 'user', 'name', ]}),
        ('Date information', {'fields': ['created', 'updated', ]}),
    ]
    add_fieldsets = [
        ('Project information', {'fields': ['name', 'user', ]}),
    ]

    search_fields = ['upid', 'user', 'name', ]

    def get_queryset(self, request):
        qs = self.model._default_manager.get_queryset()
        # qs = qs.filter(user=request.user)
        # TODO: this should be handled by some parameter to the ChangeList.
        ordering = self.get_ordering(request)
        if ordering:
            qs = qs.order_by(*ordering)
        return qs

    def get_readonly_fields(self, request, obj=None):
        if not obj:
            return self.add_readonly_fields
        return self.readonly_fields

    def get_fieldsets(self, request, obj=None):
        if not obj:
            return self.add_fieldsets
        return super().get_fieldsets(request, obj)

    def save_model(self, request, obj, form, change, *args, **kwargs):
        # if not change and not hasattr(obj, 'user'):
        #     obj.user = request.user
        return super().save_model(request, obj, form, change, *args, **kwargs)
