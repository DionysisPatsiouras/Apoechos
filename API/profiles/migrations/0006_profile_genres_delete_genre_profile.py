# Generated by Django 5.0.2 on 2024-06-15 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0005_genre_genre_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='genres',
            field=models.ManyToManyField(to='profiles.genre'),
        ),
        migrations.DeleteModel(
            name='Genre_Profile',
        ),
    ]
