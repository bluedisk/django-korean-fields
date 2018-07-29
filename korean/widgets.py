from pprint import pprint

from django.forms.widgets import TextInput


class SynchronizedWidget(TextInput):

    class Media:
        css = {'all': ('korean/css/korean.css',)}
        js = ('korean/js/synchronize_input.js',)

    divider = '-'
    fields = (
        (2, '1'),
        (3, '2'),
        (4, '3'),
    )

    template_name = 'korean/widgets/synced.html'

    def format_value(self, value):
        if value == '' or value is None:
            return zip(*list(zip(*self.fields)), [''] * len(self.fields))

        return zip(*list(zip(*self.fields)), value.split(self.divider))

    def value_from_datadict(self, data, files, name):
        return self.divider.join(data.getlist(name))


class JuminWidget(SynchronizedWidget):
    """
    Korean people registration code widget.
    """
    fields = (
        (6, '생년월일'),
        (7, '다음 7자리')
    )

    class Media:
        js = ('korean/js/jumin.js',)


class JuminDateWidget(SynchronizedWidget):
    """
    Korean people registration date widget.
    """
    fields = (
        (6, '생년월일'),
        (7, '다음 7자리')
    )

    class Media:
        js = ('korean/js/jumin_date.js',)


class SaupWidget(SynchronizedWidget):
    """
    Korean tax registration code widget.
    """
    fields = (
        (3, 'xxx'),
        (2, 'xx'),
        (5, 'xxxxx')
    )

    class Media:
        js = ('korean/js/saup.js',)


class BupinWidget(SynchronizedWidget):
    """
    Korean corperation registration code widget.
    """
    fields = (
        (6, '분류번호'),
        (7, '일련번호')
    )

    class Media:
        js = ('korean/js/bupin.js',)


class CellPhoneWidget(SynchronizedWidget):
    """
    Korean corperation registration code widget.
    """
    fields = (
        (3, '01x'),
        (4, 'xxxx'),
        (4, 'xxxx')
    )

    class Media:
        js = ('korean/js/cell.js',)
