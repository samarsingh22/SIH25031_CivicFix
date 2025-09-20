from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ComplaintViewSet, complaint_page

router = DefaultRouter()
router.register('complaints', ComplaintViewSet, basename='complaint')

urlpatterns = [
    # Serve a friendly HTML page under the API prefix as requested
    path('complaints/page/', complaint_page, name='complaints_page_api'),
    path('', include(router.urls)),
]