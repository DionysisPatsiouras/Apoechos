# Generated by Django 5.0.2 on 2024-06-03 17:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_remove_post_profile_id_alter_post_musician'),
        ('studios', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='studio',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='studio', to='studios.studio'),
        ),
    ]
