from django.forms.widgets import TextInput


class SynchronizedWidget(TextInput):

    class Media:
        css = {'all': ('korean/css/korean.css',)}
        js = ('korean/js/synchronize_input.js',)

    def format_value(self, value):
        if value == '' or value is None:
            return None

        return value.split('-')

    def value_from_datadict(self, data, files, name):
        return '-'.join(data.getlist(name))


class JuminWidget(SynchronizedWidget):
    """
    Korean people registration code widget.
    """
    template_name = 'korean/widgets/jumin.html'

    class Media:
        js = ('korean/js/jumin.js',)


class SaupWidget(SynchronizedWidget):
    """
    Korean bussiness registration code widget.
    """
    template_name = 'korean/widgets/saup.html'

    class Media:
        js = ('korean/js/saup.js',)
