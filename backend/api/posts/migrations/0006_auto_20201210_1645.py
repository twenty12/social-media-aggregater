# Generated by Django 3.1.4 on 2020-12-10 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0005_auto_20201210_1629'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='source_id',
            field=models.CharField(blank=True, max_length=500, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='url',
            field=models.URLField(blank=True, null=True, unique=True),
        ),
    ]
