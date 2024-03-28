from django.db import models


class SignatureColors(models.Model):
    title =  models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    icon =  models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.title