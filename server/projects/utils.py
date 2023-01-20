# Utils


def cal_key(obj, m):
    present_keys = False
    if m.__name__ == 'Project':
        present_keys = m.objects.filter(user=obj).order_by(
            '-upid').values_list('upid', flat=True)

    if present_keys:
        return present_keys[0] + 1
    else:
        return 1
