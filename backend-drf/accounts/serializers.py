from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    class Meta:
        model = User
        fields = ['username', 'email','password']

    # We will not force the password minimum validation here
    # def validate_password(self, value):
    #     validate_password(value)
    #     return value

    def create(self, validated_data):
        # User.objects.create = save the password in a plain text
        # User.objects.create_user = hash the password before saving it to the database
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        ) # You can also pass validated_data as **validated_data only if the fields in the serializer are the same as the fields in the model
        # user = User.objects.create_user(**validated_data)
        return user
