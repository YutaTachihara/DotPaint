from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render

from .models import Article


def index(request):
    return render(request, 'blog/index.html')

def detail(request, article_id):
    # question = get_object_or_404(Question, pk=question_id)
    # return render(request, 'polls/detail.html', {'question': question})
    return HttpResponse("Detail")