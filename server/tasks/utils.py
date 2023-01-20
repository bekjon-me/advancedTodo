# Utils
from django.contrib.contenttypes.models import ContentType


def cal_key(obj, m, content_type_=False, object_id_=False):
    present_keys = False
    if m.__name__ == 'Task':
        present_keys = m.objects.filter(project=obj).order_by(
            '-ptid').values_list('ptid', flat=True)
    elif m.__name__ == 'SubTask':
        present_keys = m.objects.filter(task=obj).order_by(
            '-tsid').values_list('tsid', flat=True)
    elif m.__name__ == 'AttachedFile':
        content_type__ = ContentType.objects.get(
            app_label=content_type_.app_label,
            model=content_type_.model)
        present_keys = m.objects.filter(
            content_type=content_type__.id, object_id=object_id_).order_by(
            '-tfid').values_list('tfid', flat=True)

    if present_keys:
        return present_keys[0] + 1
    else:
        return 1
