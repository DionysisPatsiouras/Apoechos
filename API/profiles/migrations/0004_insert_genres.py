from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0003_insert_cities"),
    ]

    def insertData(apps, schema_editor):

        Genre = apps.get_model("profiles", "Genre")

        names = [
            "Rock",
            "Metal",
            "Jazz",
            "Country",
            "Punk",
            "Alternative",
            "Pop",
            "Blues",
            "Folk",
            "Soul",
            "Classical",
            "Garage",
            "Instrumental",
        ]

        for index in range(len(names)):

            new_genre = Genre(name=names[index])
            new_genre.save()

    operations = [
        migrations.RunPython(insertData),
    ]
