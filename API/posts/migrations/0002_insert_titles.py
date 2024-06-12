from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("posts", "0001_initial"),
    ]

    def insertData(apps, schema_editor):

        Post_Title = apps.get_model("posts", "Post_Title")

        titles = [
            "Ψάχνω νέα μέλη",
            "Νέα κυκλοφορία",
            "Ψάχνω μπάντα",
            "Νέα ενημέρωση",
            "Νέες αφίξεις",
            "Προσφορές",
            "Ζητείται προσωπικό"
        ]

        category = [
            "musician",
            "musician",
            "musician",
            "studio",
            "store",
            "store",
            "stage"
        ]
        for index in range(len(titles)):

            new_title = Post_Title(
                
                title=titles[index],
                category=category[index]
            )

            new_title.save()

      

    operations = [
        migrations.RunPython(insertData),
    ]
