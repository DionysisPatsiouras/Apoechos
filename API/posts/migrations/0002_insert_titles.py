from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("posts", "0001_initial"),
    ]

    def insertData(apps, schema_editor):

        Post_Title = apps.get_model("posts", "Post_Title")

        titles = [
            "Ψάχνω νέα μέλη",
            "Ψάχνω μπάντα",
            "Νέα κυκλοφορία",
            "Νέα ενημέρωση",
            "Νέες αφίξεις",
            "Προσφορές",
            "Ζητείται προσωπικό",
        ]

        category = [1, 1, 2, 3, 4, 4, 5]
        for index in range(len(titles)):

            new_title = Post_Title(title=titles[index], categoryId_id=category[index])

            new_title.save()

    operations = [
        migrations.RunPython(insertData),
    ]
