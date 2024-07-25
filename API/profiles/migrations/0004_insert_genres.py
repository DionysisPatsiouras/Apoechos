from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0003_insert_cities"),
    ]

    def insertData(apps, schema_editor):

        Genre = apps.get_model("profiles", "Genre")

        names = [
            "Rock N' Roll",
            "Hard Rock",
            "Heavy Metal",
            "Jazz",
            "Country",
            "Punk Rock",
            "Alternative",
            "Pop",
            "Blues",
            "Folk",
            "Soul",
            "Classical",
            "Garage",
            "Instrumental",
            "Rhythm & Blues",
            "Reggae",
            "New-age",
            "Indie rock",
            "Gupsy Jazz",
            "Ska",
            "Post-rock",
            "Post-punk",
            "Stoner",
            "Doom",
            "Surf Rock",
            "Funk",
            "Swing",
            "Black Metal",
            "Death Metal",
            "Epic Metal",
            "Speed Metal",
            "Thrash Metal"

        ]

        for index in range(len(names)):

            new_genre = Genre(name=names[index])
            new_genre.save()

    operations = [
        migrations.RunPython(insertData),
    ]
