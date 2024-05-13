# Generated by Django 5.0.2 on 2024-05-13 17:02

import django.db.models.deletion
import studios.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Studio',
            fields=[
                ('studioId', models.CharField(default=studios.models.generate_pk, max_length=255, primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=200)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('category', models.CharField(default='studio', max_length=50)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('studio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='services', to='studios.studio')),
            ],
        ),
    ]
