from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

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