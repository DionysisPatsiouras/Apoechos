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
            "Κατερίνη",
            "Πειραιάς",
            "Χανιά",
            "Ιωάννινα",
            "Κέρκυρα",
            "Καβάλα",
            "Χαλκίδα",
            "Ρόδος",
            "Καλαμάτα",
            "Ρέθυμνο",
            "Άρτα",
            "Σπάρτη",
            "Ζάκυνθος",
            # "Κέρκυρα"
        ]
        latitude = [
            "37.983810",
            "40.629269",
            "38.246639",
            "35.341846",
            "39.643452",
            "39.362454",
            "40.271106",
            "37.942416",
            "35.516239",
            "39.674530",
            "39.621841",
            "40.936500",
            "38.463540",
            "36.433427",
            "37.037800",
            "35.365550",
            "39.160140",
            "37.074301",
            "37.778250",
            # "39.620690"
        ]

        longitude = [
            "23.727539",
            "22.947412",
            "21.734573",
            "25.148254",
            "22.413208",
            "22.940068",
            "22.508478",
            "23.645672",
            "24.018810",
            "20.840210",
            "19.917959",
            "24.409480",
            "23.602840",
            "28.230698",
            "22.111100",
            "24.482320",
            "20.985610",
            "22.432584",
            "20.896425",
            # "19.919750"
        ]

        for index in range(len(names)):

            new_city = City(
                name=names[index], latitude=latitude[index], longitude=longitude[index]
            )

            new_city.save()

    operations = [
        migrations.RunPython(insertData),
    ]
