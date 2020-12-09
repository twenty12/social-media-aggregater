from django.db import models

class Post(models.Model):
    PLATFORM_CHOICES = [
        ('youtube', 'youtube')
    ]
    platform = models.CharField(
        max_length=50,
        choices=PLATFORM_CHOICES,
    )
    created = models.DateTimeField()
    collected = models.DateTimeField(auto_now=True)
    title = models.CharField(null=True, blank=True, max_length=500)
    description = models.TextField(null=True, blank=True)
    url = models.URLField(null=True, blank=True)
    soruce_id = models.CharField(max_length=500, null=True, blank=True)
