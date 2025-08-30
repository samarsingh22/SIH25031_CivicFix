from django import template
from django.conf import settings
from pathlib import Path

register = template.Library()

@register.simple_tag
def list_css_files():
    """Return a list of CSS filenames in the project's static/css folder."""
    css_dir = Path(settings.BASE_DIR) / 'static' / 'css'
    if not css_dir.exists():
        return []
    files = []
    for p in sorted(css_dir.glob('*.css')):
        files.append(p.name)
    return files