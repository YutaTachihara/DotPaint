from django.views import generic

from .models import Article

class IndexView(generic.ListView):
    template_name = 'blog/index.html'
    context_object_name = 'latest_articles'

    def get_queryset(self):
        """Return the last five published questions."""
        return Article.objects.order_by('-pub_date')[:5]


class DetailView(generic.DetailView):
    model = Article
    template_name = 'blog/detail.html'
