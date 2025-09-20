from django.urls import path
from .views import complaint_page

urlpatterns = [
    # HTML page for complaints UI
    path('complaints/page/', complaint_page, name='complaints_page'),
    path('complaints/', complaint_page, name='complaints_page_index'),
]