# -*- coding: utf-8 -*-
from django.forms import forms, CharField
from django.http import HttpResponse
from django.shortcuts import render
from jumin.fields import JuminFormField


class TestForm(forms.Form):
    jumin = JuminFormField()
    another = CharField(label='test', max_length=10, required=False)


def test(request):
    if request.method == 'POST':
        form = TestForm(request.POST)
        if form.is_valid():
            return HttpResponse('success : ' + form.cleaned_data['jumin'])

    else:
        form = TestForm(initial={'jumin': '010203-4567890'})

    return render(request, 'jumin/test.html', {'form': form})
