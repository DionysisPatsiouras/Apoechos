from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0005_insert_studio_services"),
    ]

    def insertData(apps, schema_editor):

        Instrument = apps.get_model("profiles", "Instrument")

        names = [
            "Guitar",
            "Bass",
            "Flute",
            "Horn",
            "Drums",
            "Cajon",
        ]

        category = [
            "strings",
            "strings",
            "woodwind",
            "woodwind",
            "percussion",
            "percussion",
        ]

        for index in range(len(names)):

            new_instrument = Instrument(
                name=names[index], category=category[index]
            )
            new_instrument.save()

    operations = [
        migrations.RunPython(insertData),
    ]
