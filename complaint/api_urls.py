from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ComplaintViewSet, complaint_page, complaint_auth_page

router = DefaultRouter()
router.register('complaints', ComplaintViewSet, basename='complaint')

urlpatterns = [
    # Serve friendly HTML pages under the API prefix as requested
    path('complaints/page/', complaint_page, name='complaints_page_api'),
    path('complaints/authority/', complaint_auth_page, name='complaints_auth_page_api'),
    path('', include(router.urls)),
]