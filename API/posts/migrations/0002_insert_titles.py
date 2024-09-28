from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("posts", "0001_initial"),
    ]

    def insertData(apps, schema_editor):

        Post_Title = apps.get_model("posts", "Post_Title")

        titles = [
            #
            "Ψάχνω μπάντα",
            "Νέα σόλο κυκλοφορία"
            #
            "Ψάχνουμε νέα μέλη",
            "Νέο άλμπουμ",
            #
            "Ανακαίνιση",
            "Συνεργασίες",
            #
            "Νέες αφίξεις",
            "Προσφορές",
            #
            "Νέα Ενημέρωση",
            "Ζητείται μπάντα",
        ]

        category = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
        for index in range(len(titles)):

            new_title = Post_Title(title=titles[index], categoryId_id=category[index])

            new_title.save()

    operations = [
        migrations.RunPython(insertData),
    ]
