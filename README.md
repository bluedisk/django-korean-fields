# django-korean-fields
Django용 주민등록번호, 사업자등록번호, 법인등록번호, 휴대폰번호 등 한국에서만 쓰는 필드들 &amp; 위젯

## 기능
- 주민번호 유효성 검사
- 날자 유효성 검사(윤년 검사 포함)
- 붙여 넣기 적당히 잘되게
- 앞뒤 주민번호 이동
- 앞자리 다쓰고 나서 고칠 때 짜증나게 자꾸 뒷자리로 날라가지 않음
- 그 외 앵간한거 그냥 다 됨

## TODO
- [x] 주민등록번호 필드 & 위젯
- [x] 사업자등록번호 필드 & 위젯
- [x] 법인등록번호 필드 & 위젯
- [x] 위젯 n개의 다중 필드용으로 만능화
- [x] 휴대폰번호 필드
- [ ] 사업자등록번호 Validator
- [ ] 법인등록번호 Validator
- [ ] 휴대폰번호 Validator
- [ ] 카드 유효기간 필드
- [ ] 주민등록증 발급일자 필드
- [ ] 운전면허 번호 필드
- [ ] 또 뭐 넣을지 생각하기 

## Demo
![Demo](./demo/demo_small.gif)

## Example

example 폴더 참조

# 의존성
- Twitter bootstrap 3 or 4
- jQuery
- Django (2.0+ 만 테스트)
- django-bootstrap3 또는 django-bootstrap4 사용하면 좋음(안해도되고...)

# SETUP
1. Install
```
pip install django-korean-fields
```

2. INSTALL_APPS에 'korean'추가

``` python
INSTALLED_APPS = [
    'korean',
    
    ...
    'my_app',
    ...
    
    'django.contrib.admin
```

3. 템플릿 상단에 Media 추가
ex>
```html
{% extends "admin/base_site.html" %}
{% load i18n %}
{% load admin_static suit_tags %}

{% block extrastyle %}
    <link type="text/css" rel="stylesheet" href="/static/css/basic.css" />
    {{ block.super }}
    {{ form.media }}
{% endblock %}
```

# 사용법 

## model에서 사용 시 
```python
from django.db import models
from korean.fields import JuminField

class YourEverythingModel(models.Model):

    name = models.CharField(u'실명', max_length=20)
    cell = CellPhoneField(u'내 휴대폰 번호')
   
    jumin = JuminField(u'내 주민번호')
    saup = SaupField(u'내 사업자 등록 번호') 
    bupin = BupinField(u'내(?) 법인 등록 번호')
    
    mom_jumin = JuminField(u'엄마 주민번호')
    dad_jumin = JuminField(u'아빠 주민번호')
    uncle_jumin = JuminField(u'삼촌 주민번호')
    
    your_secret = models.TextField(u'비밀정보')
    ...
```    

## form에서 사용 시
```python
class TestForm(forms.Form):
    jumin = JuminFormField()
    cell = CelPhoneFormField()
    another = CharField(label='test', max_length=10, required=False)
```

