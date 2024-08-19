# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import random
import openpyxl
from .models import UploadedFile
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate

from django.contrib.auth import get_user_model

User = get_user_model()

class SignUpAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        full_name = request.data.get('full_name')

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            email=email,
            password=password,
            full_name=full_name,
        )

        return Response({"message": "Sign-up successful"}, status=status.HTTP_201_CREATED)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken


class LoginAPIView(APIView):
    permission_classes = [AllowAny]  # Make sure unauthenticated users can access this view

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = authenticate(email=email, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user_id': user.id,
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# class LoginView(TokenObtainPairView):
#     serializer_class = LoginSerializer
#     permission_classes = ()

#     def post(self, request, *args, **kwargs):
#         serializer = LoginSerializer(data=request.data)
#         if serializer.is_valid():
#             return Response(serializer.validated_data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


class UploadDataView(APIView):
    permission_classes = [IsAuthenticated, AllowAny]
    def post(self, request, *args, **kwargs):
        if 'file' not in request.FILES:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        file = request.FILES['file']

        if not file.name.endswith(('.xlsx', '.xls', '.csv')):
            return Response({'error': 'Invalid file type. Only Excel files are accepted.'}, status=status.HTTP_400_BAD_REQUEST)

        uploaded_file = UploadedFile(file=file)
        uploaded_file.save()
        return Response({
            'message': 'Data uploaded successfully',
            'file_id': uploaded_file.id
        }, status=status.HTTP_200_OK)        


User = get_user_model()

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = authenticate(email=email, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user_id': user.id,
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class ResultView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        file_id = request.query_params.get('file_id')

        if not file_id:
            return Response({'error': 'No file ID provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve the UploadedFile instance
            uploaded_file = UploadedFile.objects.get(id=file_id)

            # Load the workbook
            workbook = openpyxl.load_workbook(uploaded_file.file)
            sheet = workbook.active

            # Read rows from the sheet
            rows = [row for row in sheet.iter_rows(values_only=True)]

            # Convert tuples to list of strings for the response
            rows_as_strings = [str(row) for row in rows]

            return Response({'data': rows_as_strings}, status=status.HTTP_200_OK)

        except UploadedFile.DoesNotExist:
            return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': f'Error processing file: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)