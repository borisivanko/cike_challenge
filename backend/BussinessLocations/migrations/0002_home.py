# Generated by Django 4.1.6 on 2023-04-01 17:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("BussinessLocations", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Home",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("x", models.FloatField()),
                ("y", models.FloatField()),
                ("type", models.CharField(max_length=50)),
            ],
        ),
    ]
