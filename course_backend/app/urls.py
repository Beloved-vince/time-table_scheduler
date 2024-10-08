# urls.py
from django.urls import path
from .views import SignUpAPIView
from .views import LoginView, UploadDataView, ResultView

urlpatterns = [
    path('signup/', SignUpAPIView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('upload/', UploadDataView.as_view(), name='upload_data'),
    path('result/', ResultView.as_view(), name='result-view'),
]
