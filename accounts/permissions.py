from rest_framework.permissions import BasePermission


class RoleRequired(BasePermission):
    """Allow access only to users whose role is in view.allowed_roles."""

    def has_permission(self, request, view):
        user = request.user
        allowed = getattr(view, 'allowed_roles', None)
        if not user or not user.is_authenticated:
            return False
        if not allowed:
            return True
        return user.role in allowed