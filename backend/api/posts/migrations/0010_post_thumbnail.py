# Generated by Django 3.1.4 on 2020-12-15 22:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0009_boat_country'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='thumbnail',
            field=models.URLField(blank=True, null=True, unique=True),
        ),
    ]
