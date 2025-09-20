from rest_framework import serializers
from .models import Complaint


class ComplaintSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Complaint
        fields = ['id', 'user', 'description', 'latitude', 'longitude', 'is_sos', 'timestamp']
        read_only_fields = ['id', 'user', 'timestamp']