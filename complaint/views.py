from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.shortcuts import render
from .models import Complaint
from .serializers import ComplaintSerializer


class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_queryset(self):
        # Limit to the current user's complaints by default
        return Complaint.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'], url_path='sos')
    def sos(self, request):
        # Expect latitude, longitude; use a predefined SOS message if not provided
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')
        description = request.data.get('description') or '⚠️ Emergency! I am in danger, please send help!'
        if latitude is None or longitude is None:
            return Response({'detail': 'latitude and longitude are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            complaint = Complaint.objects.create(
                user=request.user,
                description=description,
                latitude=latitude,
                longitude=longitude,
                is_sos=True,
            )
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(ComplaintSerializer(complaint).data, status=status.HTTP_201_CREATED)



def complaint_page(request):
    # Render complaints page based on user role
    is_authority = getattr(request.user, 'role', '') == 'authority'
    template = 'complaint/complaints_auth.html' if is_authority else 'complaint/complaints_page.html'
    context = {
        'GOOGLE_MAPS_API_KEY': settings.GOOGLE_MAPS_API_KEY,
    }
    return render(request, template, context)


def complaint_auth_page(request):
    context = {
        'GOOGLE_MAPS_API_KEY': settings.GOOGLE_MAPS_API_KEY,
    }
    return render(request, 'complaint/complaints_auth.html', context)



from django.views.generic import TemplateView
from django.conf import settings

class ComplaintMapView(TemplateView):
    template_name = 'complaints/map.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['GOOGLE_MAPS_API_KEY'] = settings.GOOGLE_MAPS_API_KEY
        return context
# SOS Page view
def sos(request):
 return render(request, 'sos.html') 