from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0006_insert_instruments"),
    ]

    def insertData(apps, schema_editor):

        Store_Service = apps.get_model("profiles", "Store_Service")

        names = [
            "Επισκευή/Συντήρηση",
            "Μεταχειρισμένα",
            "Παρουσία E-shop",
        ]


      
        for index in range(len(names)):

            new_store_service = Store_Service(name=names[index])
            new_store_service.save()


    operations = [
        migrations.RunPython(insertData),
    ]
