from django import template
from django.utils import timezone

register = template.Library()

@register.filter(name='formatted_time')
def formatted_time(value):
    if isinstance(value, timezone.datetime):
        delta = timezone.now() - value
        total_seconds = delta.total_seconds()

        if total_seconds < 60:
            return 'Just now'

        minutes = total_seconds // 60
        hours = total_seconds // 3600

        if minutes < 60:
            return f'{int(minutes)} minute{"s" if int(minutes) != 1 else ""} ago'
        else:
            return f'{int(hours)} hour{"s" if int(hours) != 1 else ""} ago'

    return value
