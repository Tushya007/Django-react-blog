from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class BlogModel(models.Model):
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=2000)
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    date_time_creates = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title