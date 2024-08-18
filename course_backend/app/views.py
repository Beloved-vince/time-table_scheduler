# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from app.serializers import UserSignupSerializer, LoginSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import random
import openpyxl
from .models import UploadedFile, User
from rest_framework.exceptions import AuthenticationFailed



class UserSignupView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the user after successful validation
            return Response("User created successfully", status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


class UploadDataView(APIView):
    def post(self, request, *args, **kwargs):
        if 'file' not in request.FILES:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        file = request.FILES['file']

        if not file.name.endswith(('.xlsx', '.xls')):
            return Response({'error': 'Invalid file type. Only Excel files are accepted.'}, status=status.HTTP_400_BAD_REQUEST)

        uploaded_file = UploadedFile(file=file)
        uploaded_file.save()

        try:
            # Load the workbook
            workbook = openpyxl.load_workbook(uploaded_file.file.path)
            sheet = workbook.active

            rows = [row for row in sheet.iter_rows(values_only=True)]

            # Shuffle the rows randomly
            random.shuffle(rows)

            # Convert tuples to list of strings for the response
            rows_as_strings = [str(row) for row in rows]

            return Response({'data': rows_as_strings}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': f'Error processing file: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
