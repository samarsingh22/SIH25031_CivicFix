from django.urls import path
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    # API endpoints
    CitizenSignupView,
    AuthoritySignupView,
    AdminSignupView,
    CitizenDashboardView,
    AuthorityDashboardView,
    AdminDashboardView,
    ProfileView,
    # HTML views
    login_page,
    signup_citizen_page,
    signup_authority_page,
    signup_admin_page,
    dashboard_citizen,
    dashboard_authority,
    dashboard_admin,
    logout_view,
)

urlpatterns = [
    # Auth / signup (API)
    path('auth/signup/citizen/', CitizenSignupView.as_view(), name='signup-citizen'),
    path('auth/signup/authority/', AuthoritySignupView.as_view(), name='signup-authority'),
    path('auth/signup/admin/', AdminSignupView.as_view(), name='signup-admin'),

    # Profile API
    path('auth/profile/', ProfileView.as_view(), name='profile'),

    # JWT
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Session logout (action)
    path('auth/logout/', logout_view, name='logout'),

    # Dashboards (HTML)
    path('dashboard/citizen/', dashboard_citizen, name='dashboard_citizen'),
    path('dashboard/authority/', dashboard_authority, name='dashboard_authority'),
    path('dashboard/admin/', dashboard_admin, name='dashboard_admin'),

    # Pages: Login + Signups (HTML)
    path('auth/login/', login_page, name='login'),
    path('auth/signup/citizen/page/', signup_citizen_page, name='signup_citizen_page'),
    path('auth/signup/authority/page/', signup_authority_page, name='signup_authority_page'),
    path('auth/signup/admin/page/', signup_admin_page, name='signup_admin_page'),

    # Welcome page
    path('welcome/', TemplateView.as_view(template_name='welcome.html'), name='welcome'),
]