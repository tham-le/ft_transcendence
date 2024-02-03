# Generated by Django 5.0.1 on 2024-02-03 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id_user', models.AutoField(primary_key=True, serialize=False)),
                ('login', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=50)),
                ('first_name', models.CharField(max_length=50, null=True)),
                ('last_name', models.CharField(max_length=50, null=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('sexe', models.CharField(max_length=50)),
                ('age', models.IntegerField()),
                ('token', models.CharField(max_length=50, null=True)),
                ('avatar', models.CharField(default='/var/www/imgs/default_avatar.webp', max_length=255)),
                ('status', models.CharField(default='offline', max_length=50)),
                ('date_creation', models.DateTimeField()),
                ('date_last_connection', models.DateTimeField()),
                ('id_list_friend', models.IntegerField()),
            ],
        ),
    ]
