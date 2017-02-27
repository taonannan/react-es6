{% extends "base.tpl" %}

{% block title%}{% endblock %}
{% block keywords%}{% endblock %}
{% block description%}{% endblock %}

{% block css %}
    {% css "home/home" %}
{% endblock %}

{% block content %}
	{% require $id="header" %}
    <div class="home">
        这就是首页
    </div>
    {% require $id="footer" %}
{% endblock %}

{% block js %}
    {%js "home/home" %}
{% endblock %}
