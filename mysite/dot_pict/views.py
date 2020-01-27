from django.shortcuts import render
from django.http import HttpResponse
from .models import Picture
import base64

def upload(request):
    if request.method == 'POST':
        from django.http import QueryDict

        # request.bodyに入っている。
        dic = QueryDict(request.body, encoding='utf-8')
        data = dic.get('imgBase64')

        import pdb;pdb.set_trace()

        encoded = base64.standard_b64decode(data)

        with open('images/sample.png', 'wb') as f:
            f.write(encoded)

        from json import dumps
        ret = dumps({})
        return HttpResponse(ret, content_type='application/json')