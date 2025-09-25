from rest_framework import serializers
from .models import Complaint


class ComplaintSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    photo = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Complaint
        fields = ['id', 'user', 'description', 'latitude', 'longitude', 'photo', 'is_sos', 'timestamp']
        read_only_fields = ['id', 'user', 'timestamp']