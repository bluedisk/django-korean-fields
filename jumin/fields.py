from django.core.exceptions import ValidationError
from django.forms import fields
from django.db import models
from .widgets import JuminWidget

from django.utils.translation import gettext_lazy as _
from calendar import monthrange
from functools import reduce
import re


jumin_format = re.compile('\d{6}-\d{7}')


def jumin_validator(value):
    if not jumin_format.match(value):
        raise ValidationError(_('Wrong jumin format'))

    year = int(value[:2])
    month = int(value[2:4])
    day = int(value[4:6])

    all_code = map(lambda x: int(x), value.replace('-', '')[:-1])
    verify_code = int(value[-1])

    if month < 1 or month > 12 or day < 1 or day > monthrange(year, month)[-1]:
        raise ValidationError(_('Wrong date'))

    checksum = (11 - reduce(lambda s, x: s + x[1] * (2 + (x[0] % 8)), enumerate(all_code), 0) % 11) % 10
    if verify_code != checksum:
        raise ValidationError(_('Wrong jumin format'))


class JuminFormField(fields.CharField):
    widget = JuminWidget
    default_validators = [jumin_validator]

    def __init__(self, *args, **kwargs):
        self.max_length = 14
        kwargs['max_length'] = self.max_length
        super(JuminFormField, self).__init__(*args, **kwargs)


class JuminField(models.CharField):
    widget = JuminWidget
    default_validators = [jumin_validator]

    def __init__(self, *args, **kwargs):
        self.max_length = 14
        kwargs['max_length'] = self.max_length
        super(JuminField, self).__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        defaults = {'max_length': self.max_length, 'widget': JuminWidget}
        defaults.update(kwargs)
        return super().formfield(**defaults)