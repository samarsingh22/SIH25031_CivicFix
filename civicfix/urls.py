from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/', include('complaint.api_urls')),  # complaint API only
    path('api-auth/', include('rest_framework.urls')),  # DRF login/logout for browsable API

    # Pages
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    path('about/', TemplateView.as_view(template_name='about.html'), name='about'),
    path('welcome/', TemplateView.as_view(template_name='welcome.html'), name='welcome'),

    # Complaint page (HTML)
    path('', include('complaint.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)