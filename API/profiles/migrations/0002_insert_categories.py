from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0001_initial"),
    ]

    def insertData(apps, schema_editor):

        Category = apps.get_model("profiles", "Category")

        names = [
            "Μουσικοί",
            "Συγκροτήματα",
            "Στούντιο",
            "Καταστήματα",
            "Σκηνές",
        ]

        colors = ["#10ACDD", "#E37056", "#FF8514", "#12C59A", "#E558C6"]

        icons = ["musician", "band", "studio", "store", "stage"]

      
        for index in range(len(names)):

            new_category = Category(name=names[index], color=colors[index], icon=icons[index])

            new_category.save()


    operations = [
        migrations.RunPython(insertData),
    ]
