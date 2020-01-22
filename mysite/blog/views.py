from django.views import generic

from .models import Article


class IndexView(generic.ListView):
    template_name = 'blog/index.html'


class DetailView(generic.DetailView):
    model = Article
    template_name = 'blog/detail.html'