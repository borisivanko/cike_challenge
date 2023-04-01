# Generated by Django 4.1.6 on 2023-04-01 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("BussinessLocations", "0003_home_count_alter_home_id"),
    ]

    operations = [
        migrations.CreateModel(
            name="MHD",
            fields=[
                ("id", models.IntegerField(primary_key=True, serialize=False)),
                ("tram", models.BooleanField(default=False)),
                ("tbus", models.BooleanField(default=False)),
                ("bus", models.BooleanField(default=False)),
                ("x", models.FloatField(default=0)),
                ("y", models.FloatField(default=0)),
            ],
        ),
    ]
