from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0004_insert_genres"),
    ]

    def insertData(apps, schema_editor):

        Studio_Service = apps.get_model("profiles", "Studio_Service")

        names = [
            "Πρόβες",
            "Ηχογραφήσεις",
            "Mix",
            "Mastering",
            "Ηχογράφηση Πρόβας",
            "Με πλήρες εξοπλισμό",
            "Live Ηχογράφηση",
        ]

        for index in range(len(names)):

            new_studio_service = Studio_Service(name=names[index])
            new_studio_service.save()

    operations = [
        migrations.RunPython(insertData),
    ]
