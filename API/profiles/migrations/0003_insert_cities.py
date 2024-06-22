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
            "Βόλος",
            "Ιωάννινα",
            "Τρίκαλα",
            "Χαλκίδα",
            "Σέρρες",
            "Αλεξανδρούπολη",
            "Ξάνθη",
            "Κατερίνη",
            "Αγρίνιο",
            "Καλαμάτα",
            "Καβάλα",
            "Καρδίτσα",
            "Λαμία",
            "Ραφήνα",
        ]

        for index in range(len(names)):

            new_city = City(name=names[index])

            new_city.save()

    operations = [
        migrations.RunPython(insertData),
    ]
