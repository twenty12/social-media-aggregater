# Generated by Django 3.1.4 on 2020-12-11 20:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_auto_20201210_1645'),
    ]

    operations = [
        migrations.RenameField(
            model_name='account',
            old_name='account_name',
            new_name='name',
        ),
    ]