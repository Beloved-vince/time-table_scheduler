from django.db import models
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractUser, Group, Permission, PermissionsMixin


class User(AbstractUser, PermissionsMixin):
    """
    Custom user model that uses email or phone number as the unique identifier.
    """
    email = models.EmailField(unique=True, null=True)
    full_name = models.CharField(max_length=500, null=True, blank=True)

    verified = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',  # Custom related name
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions_set',  # Custom related name
        blank=True,
    )
    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        if not self.email:
            raise ValueError(_("Either email or phone must be provided."))
        super().save(*args, **kwargs)

    @property
    def username(self):
        return self.email
    @staticmethod
    def get_username_field():
        return User.USERNAME_FIELD

    @staticmethod
    def set_username_field(field):
        if field not in ['email',]:
            raise ValueError(_("Invalid field for USERNAME_FIELD."))
        User.USERNAME_FIELD = field




class UploadedFile(models.Model):
    file = models.FileField(upload_to='uploaded_files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)