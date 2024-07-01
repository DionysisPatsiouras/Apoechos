# Generated by Django 5.0.2 on 2024-06-21 08:10

import django.db.models.deletion
import profiles.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('color', models.CharField(max_length=200)),
                ('icon', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Instrument',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('category', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Store_Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Studio_Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('profileId', models.CharField(default=profiles.models.generate_pk, max_length=255, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=200)),
                ('address', models.CharField(blank=True, max_length=100)),
                ('bio', models.TextField(blank=True)),
                ('websiteLink', models.URLField(blank=True, max_length=100)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='category', to='profiles.category')),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profiles.city')),
                ('genres', models.ManyToManyField(blank=True, to='profiles.genre')),
                ('instruments', models.ManyToManyField(blank=True, to='profiles.instrument')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
                ('studio_services', models.ManyToManyField(blank=True, to='profiles.studio_service')),
                ('store_services', models.ManyToManyField(blank=True, to='profiles.store_service')),
            ],
        ),
    ]
