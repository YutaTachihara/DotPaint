from django.http import HttpResponse

def index(request):
    return HttpResponse("Index")

def detail(request, article_id):
    return HttpResponse("Detail")