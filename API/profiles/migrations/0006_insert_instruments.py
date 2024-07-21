from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0005_insert_studio_services"),
    ]

    def insertData(apps, schema_editor):

        Instrument = apps.get_model("profiles", "Instrument")

        names = [
            # strings
            "Ηλεκτρ. Κιθάρα",
            "Κλασσική Κιθάρα",
            "Ακουστική Κιθάρα",
            "Ακουστικό Μπάσο",
            "Ηλεκτρ. Μπάσο",
            "Βιολί",
            "Ηλεκτρ. Βιολί",
            "Βιόλα",
            "Τσέλο",
            "Κοντραμπάσο",
            "Άρπα",
            "Γιουκαλίλι",
            # traditional
            "Λαούτο",
            "Λύρα",
            "Μπαγλαμάς",
            "Τζουράς",
            "Μπουζούκι",
            "Ταμπουράς",
            "Ούτι",
            "Σαντούρι",
            "Μαντολίνο",
            "Μπάντζο",
            "Τουμπελέκι",
            "Νταούλι",
            # woodwind
            "Φλάουτο",
            "Πίκολο",
            "Όμποε",
            "Κλαρινέτο",
            "Τρομπέτα",
            "Γαλλική Κόρνα",
            "Τρομπόνι",
            "Τούμπα",
            "Φαγκότο",
        ]

        category = [
            "έγχορδα",
            "έγχορδα",
            "έγχορδα",
            "έγχορδα",
            "έγχορδα",
            "έγχορδα",
            "έγχορδα",
            "έγχορδα",
            "έγχορδα",
            "έγχορδα",
            "έγχορδα",
            "έγχορδα",
            "παραδοσιακά",
            "παραδοσιακά",
            "παραδοσιακά",
            "παραδοσιακά",
            "παραδοσιακά",
            "παραδοσιακά",
            "παραδοσιακά",
            "παραδοσιακά",
            "παραδοσιακά",
            "παραδοσιακά",
            "παραδοσιακά",
            "παραδοσιακά",
            "πνευστά",
            "πνευστά",
            "πνευστά",
            "πνευστά",
            "πνευστά",
            "πνευστά",
            "πνευστά",
            "πνευστά",
            "πνευστά",
        ]

        for index in range(len(names)):

            new_instrument = Instrument(name=names[index], category=category[index])
            new_instrument.save()

    operations = [
        migrations.RunPython(insertData),
    ]
