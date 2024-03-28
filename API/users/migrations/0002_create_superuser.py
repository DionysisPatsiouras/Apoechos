from django.db import migrations
from django.contrib.auth.hashers import make_password

class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

  
    def insertData(apps, schema_editor):

        CustomUser = apps.get_model('users','CustomUser')

        new_user = CustomUser(email = 'admin@mail.com', is_superuser = True, is_active = True, is_staff = True, password = make_password('123'))
        new_user.save()


    operations = [
         migrations.RunPython(insertData),
    ]
