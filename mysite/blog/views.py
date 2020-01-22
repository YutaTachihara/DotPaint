from django.http import HttpResponse
from django.shortcuts import render

from .models import Article


def index(request):
    return render(request, 'blog/index.html')

def detail(request, article_id):
    return HttpResponse("Detail")