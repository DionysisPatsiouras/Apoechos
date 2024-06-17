from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0005_studio_services"),
    ]

    def insertData(apps, schema_editor):

        Studio_Services = apps.get_model("profiles", "Studio_Services")

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

            new_studio_service = Studio_Services(name=names[index])
            new_studio_service.save()

    operations = [
        migrations.RunPython(insertData),
    ]
