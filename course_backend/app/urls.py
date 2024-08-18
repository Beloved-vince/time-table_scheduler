# urls.py
from django.urls import path
from .views import UserSignupView
from .views import LoginView, UploadDataView

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('upload/', UploadDataView.as_view(), name='upload_data'),
]
