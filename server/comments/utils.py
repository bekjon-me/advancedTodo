# Utils
from django.contrib.contenttypes.models import ContentType


def cal_key(obj, m, content_type_, object_id_):
    present_keys = False

    content_type__ = ContentType.objects.get(
        app_label=content_type_.app_label,
        model=content_type_.model)
    present_keys = m.objects.filter(
        content_type=content_type__.id, object_id=object_id_).order_by(
        '-tcid').values_list('tcid', flat=True)

    if present_keys:
        return present_keys[0] + 1
    else:
        return 1
