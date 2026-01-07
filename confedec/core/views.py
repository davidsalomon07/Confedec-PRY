from django.shortcuts import render

# Create your views here.

def home(request):
    """Render the core index page."""
    return render(request, 'core/index.html')
