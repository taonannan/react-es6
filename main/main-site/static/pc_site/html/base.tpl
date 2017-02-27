{% html %}
    {% head %}
        <title>{% block title %}李小双运动城 – 您身边的生态运动公园{% endblock %}</title>
        <meta charset="utf-8">
        <meta name="keywords" content="{% block keywords%}{% endblock %}" />
        <meta name="description" content="{% block description%}{% endblock %}"/>
        <meta name="renderer" content="webkit">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <meta name="format-detection" content="telephone=no,address=no,email=no">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
        <meta name="handheldFriendly" content="true">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <link href="{{ publicDir }}/images/favicon32.ico" mce_href="/public/images/favicon32.ico" rel="bookmark" type="image/x-icon" />
        <link href="{{ publicDir }}/images/favicon32.ico" mce_href="/public/images/favicon32.ico" rel="icon" type="image/x-icon" />
        <link href="{{ publicDir }}/images/favicon32.ico" mce_href="/public/images/favicon32.ico" rel="shortcut icon" type="image/x-icon" />

        {% css "base" %}
        {% block css %}{% endblock %}
    {% endhead %}
    {% body %}
        

        {% block content %}{% endblock %}


        {% js "jquery.min" %}
        {% js "base" %}
        {% block js %}{% endblock %}

    {% endbody %}
{% endhtml %}
