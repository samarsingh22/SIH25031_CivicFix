from django.contrib.auth import get_user_model, login, logout
from django.shortcuts import render, redirect
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .serializers import SignupSerializer, UserSerializer
from .permissions import RoleRequired
from .forms import RoleSignupForm, StyledAuthenticationForm

User = get_user_model()


# Signup endpoints
class CitizenSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data, context={'role': User.ROLE_CITIZEN})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class AuthoritySignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data, context={'role': User.ROLE_AUTHORITY})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class AdminSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data, context={'role': User.ROLE_ADMIN})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class ProfileView(APIView):
    permission_classes = [RoleRequired]
    allowed_roles = ['citizen', 'authority', 'admin']

    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


# Dashboard endpoints (placeholders)
class CitizenDashboardView(APIView):
    permission_classes = [RoleRequired]
    allowed_roles = ['citizen']

    def get(self, request):
        return Response({
            'dashboard': 'citizen',
            'message': 'Welcome to the Citizen dashboard',
        })


class AuthorityDashboardView(APIView):
    permission_classes = [RoleRequired]
    allowed_roles = ['authority']

    def get(self, request):
        return Response({
            'dashboard': 'authority',
            'message': 'Welcome to the Authority dashboard',
        })


class AdminDashboardView(APIView):
    permission_classes = [RoleRequired]
    allowed_roles = ['admin']

    def get(self, request):
        return Response({
            'dashboard': 'admin',
            'message': 'Welcome to the Admin dashboard',
        })


# HTML page helpers and views (non-API)
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from functools import wraps


def _dashboard_url_for(user: User) -> str:
    if user.role == User.ROLE_CITIZEN:
        return 'dashboard_citizen'
    if user.role == User.ROLE_AUTHORITY:
        return 'dashboard_authority'
    return 'dashboard_admin'


def role_required(allowed_roles):
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped(request, *args, **kwargs):
            if not request.user.is_authenticated:
                messages.warning(request, 'Please log in to continue.')
                return redirect('login')
            if request.user.role not in allowed_roles:
                messages.error(request, 'You do not have access to that page.')
                return redirect('home')
            return view_func(request, *args, **kwargs)
        return _wrapped
    return decorator


def login_page(request):
    if request.method == 'POST':
        form = StyledAuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, 'Welcome back, %s!' % user.username)
            return redirect('welcome')
    else:
        form = StyledAuthenticationForm(request)
    return render(request, 'auth/login.html', {'form': form})


def signup_citizen_page(request):
    if request.method == 'POST':
        form = RoleSignupForm(request.POST)
        if form.is_valid():
            user = form.save(role=User.ROLE_CITIZEN)
            login(request, user)
            messages.success(request, 'Account created successfully.')
            return redirect('welcome')
    else:
        form = RoleSignupForm()
    return render(request, 'auth/signup_citizen.html', {'form': form})


def signup_authority_page(request):
    if request.method == 'POST':
        form = RoleSignupForm(request.POST)
        if form.is_valid():
            user = form.save(role=User.ROLE_AUTHORITY)
            login(request, user)
            messages.success(request, 'Account created successfully.')
            return redirect('welcome')
    else:
        form = RoleSignupForm()
    return render(request, 'auth/signup_authority.html', {'form': form})


def signup_admin_page(request):
    if request.method == 'POST':
        form = RoleSignupForm(request.POST)
        if form.is_valid():
            user = form.save(role=User.ROLE_ADMIN)
            login(request, user)
            messages.success(request, 'Account created successfully.')
            return redirect('welcome')
    else:
        form = RoleSignupForm()
    return render(request, 'auth/signup_admin.html', {'form': form})


@login_required
@role_required(['citizen'])
def dashboard_citizen(request):
    return render(request, 'dashboards/citizen.html')


@login_required
@role_required(['authority'])
def dashboard_authority(request):
    return render(request, 'dashboards/authority.html')


@login_required
@role_required(['admin'])
def dashboard_admin(request):
    return render(request, 'dashboards/admin.html')


def logout_view(request):
    logout(request)
    messages.info(request, 'You have been logged out.')
    return redirect('home')


# JWT views passthrough (for API)
class JWTObtainPairView(TokenObtainPairView):
    pass


class JWTRefreshView(TokenRefreshView):
    pass