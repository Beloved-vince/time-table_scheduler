# from rest_framework import serializers
# from .models import User, UploadedFile
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework import serializers
# from rest_framework.exceptions import AuthenticationFailed
# from .models import User

# class UserSignupSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['email', 'password', 'full_name',]
#         extra_kwargs = {
#             'password': {'write_only': True},
#         }

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             email=validated_data.get('email'),
#             password=validated_data['password'],
#             full_name=validated_data.get('full_name'),
#         )
#         return user


# from rest_framework import serializers

# class UploadedFileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UploadedFile
#         fields = ['file']



# # class LoginSerializer(serializers.Serializer):
# #     email = serializers.EmailField(write_only=True)
# #     password = serializers.CharField(write_only=True)

# #     def validate(self, attrs):
# #         email = attrs.get('email')
# #         password = attrs.get('password')

# #         user = User.objects.filter(email=email).first()
# #         if not user or not user.check_password(password):
# #             raise AuthenticationFailed("Invalid authentication credentials")

# #         if not user.is_active:
# #             raise AuthenticationFailed("Your account is not active.")

# #         refresh = RefreshToken.for_user(user)
# #         return {
# #             'access': str(refresh.access_token),
# #             'refresh': str(refresh),
# #             'user_id': user.id,
# #         }
        
        
        
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework.parsers import JSONParser
# from rest_framework.decorators import parser_classes

# @parser_classes([JSONParser])
# class LoginSerializer(TokenObtainPairSerializer):
#     email = serializers.EmailField(write_only=False)
#     phone_number = serializers.CharField(required=False)
#     password = serializers.CharField(required=True)
#     default_error_messages = {
#         'no_active_account': 'Your account is yet to be activated',
#         'invalid_credentials': 'Invalid email or password'
#     }