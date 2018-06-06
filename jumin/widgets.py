from django.forms.widgets import Widget


class JuminWidget(Widget):
    """
    Korean people registration number widget.
    """
    input_type = 'text'
    template_name = 'jumin/widgets/jumin.html'

    class Media:
        css = {
            'all': (
                'jumin/css/jumin.css',
            )
        }
        js = (
            'jumin/js/jumin.js',
        )

    def __init__(self, attrs=None):
        if attrs is not None:
            attrs = attrs.copy()
            self.input_type = attrs.pop('type', self.input_type)
        super(JuminWidget, self).__init__(attrs)

    def get_context(self, name, value, attrs):
        context = super(JuminWidget, self).get_context(name, value, attrs)
        context['widget']['type'] = self.input_type
        return context

    def format_value(self, value):
        if value == '' or value is None:
            return None

        return value.split('-')

    def value_from_datadict(self, data, files, name):
        return '-'.join(data.getlist(name))
