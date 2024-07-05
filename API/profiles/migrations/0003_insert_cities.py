from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0002_insert_categories"),
    ]

    def insertData(apps, schema_editor):

        City = apps.get_model("profiles", "City")

        names = [
            "Αθήνα",
            "Θεσσαλονίκη",
            "Πάτρα",
            "Ηράκλειο",
            "Λάρισα",
        ]
        latitude = ["37.983810", "40.629269", "38.246639", "35.341846", "39.643452"]

        longitude = ["23.727539", "22.947412", "21.734573", "25.148254", "22.413208"]

        for index in range(len(names)):

            new_city = City(
                name=names[index], latitude=latitude[index], longitude=longitude[index]
            )

            new_city.save()

    operations = [
        migrations.RunPython(insertData),
    ]
