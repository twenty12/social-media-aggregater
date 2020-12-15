from django.db import models


# TODO: add events to boat, sailor and team for quering
# class Event(models.Model):
#     name = models.CharField(max_length=500)

class Boat(models.Model):
    name = models.CharField(max_length=500)
    built = models.DateField(null=True, blank=True)
    position = models.IntegerField(null=True, blank=True)
    country = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return self.name

class Team(models.Model):
    name = models.CharField(max_length=500)
    boat = models.ForeignKey(Boat, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Sailor(models.Model):
    name = models.CharField(max_length=500)
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(
        max_length=2,
        choices=[('M','M'), ('F', 'F'), ('NB', 'NB')]
    )
    boat = models.ForeignKey(Boat, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Account(models.Model):
    PLATFORM_CHOICES = [
        ('youtube', 'youtube')
    ]
    platform = models.CharField(
        max_length=50,
        choices=PLATFORM_CHOICES,
    )
    account_id = models.CharField(max_length=500, null=True, blank=True)
    name = models.CharField(max_length=500, null=True, blank=True)
    flag = models.CharField(max_length=500, null=True, blank=True)
    sailor = models.ForeignKey(Sailor, blank=True, null=True, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.platform


class Post(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    created = models.DateTimeField()
    collected = models.DateTimeField(auto_now=True)
    title = models.CharField(null=True, blank=True, max_length=500)
    description = models.TextField(null=True, blank=True)
    url = models.URLField(null=True, blank=True, unique=True)
    source_id = models.CharField(max_length=500, null=True, blank=True, unique=True)
