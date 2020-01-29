from django.http import HttpResponse
import base64
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import QueryDict
from json import dumps
from .models import Picture
from django.views.generic import ListView, DetailView


@login_required
def upload(request):
    if request.method == 'POST':

        dic = QueryDict(request.body, encoding='utf-8')
        title = dic.get('title')
        bin = dic.get('imgBase64')

        encoded = base64.standard_b64decode(bin)

        picture = Picture()
        picture.author = request.user
        picture.title = title
        picture.image.name = f"{title}.png"
        picture.save()

        with open(picture.image.url[1:], 'wb+') as f:
            f.write(encoded)

        ret = dumps({})
        return HttpResponse(ret, content_type='application/json')
    else:
        raise Exception()


def create(request):
    return render(request, 'dot_pict/canvas.html')


class PictureList(ListView):
    model = Picture
    context_object_name = 'pictures'
    paginate_by = 8

    def get_queryset(self):
        return Picture.objects.order_by('-id')


class PictureDetail(DetailView):
    model = Picture
