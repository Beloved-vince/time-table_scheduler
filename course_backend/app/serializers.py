from rest_framework import serializers
from .models import User, UploadedFile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from .models import User

class UserSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'full_name',]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data.get('email'),
            password=validated_data['password'],
            full_name=validated_data.get('full_name'),
        )
        return user


from rest_framework import serializers

class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = ['file']



class LoginSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        # Check if user exists
        user = User.objects.filter(email=email).first()
        print(user)
        if not user or not user.check_password(password):
            raise AuthenticationFailed("Invalid authentication credentials")

        if not user.is_active:
            raise AuthenticationFailed("Your account is not active.")

        # Call parent validate method
        data = super().validate(attrs)
        data.update({
            'user_id': user.id,
        })
        return data
