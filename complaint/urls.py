from django.urls import path
from .views import complaint_page, complaint_auth_page, sos

urlpatterns = [
    # HTML pages for complaints UI
    path('complaints/page/', complaint_page, name='complaints_page'),
    path('complaints/', complaint_page, name='complaints_page_index'),

    # Authority-specific complaints page
    path('complaints/authority/', complaint_auth_page, name='complaints_auth_page'),

    path('sos/', sos, name='sos'), 
]