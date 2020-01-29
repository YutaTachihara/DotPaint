from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin


class HomeView(LoginRequiredMixin, TemplateView):
    template_name = 'accounts/home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        urls = []
        for d in self.request.user.picture_set.all():
            # import pdb; pdb.set_trace()
            urls.append(d.image.url)
        context['srcs'] = urls
        return context

