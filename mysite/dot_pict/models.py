from django.db import models

class Picture(models.Model):
    file = models.FileField(
        upload_to='uploads/%Y/%m/%d/',
        verbose_name='添付ファイル',
    )
