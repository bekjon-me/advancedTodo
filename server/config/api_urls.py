from django.urls import path, include


urlpatterns = [
    # 3rd party apps path
    path('projects/', include('projects.urls')),
    path('projects/', include('tasks.urls')),
    path('projects/', include('comments.urls')),
]
