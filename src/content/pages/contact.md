---
seo_title: Connect with Paul Shryock
title: Contact Paul
description: If you need an ethical software engineer to bring your Awesome Project™ to life, here's how to get in touch with Paul.
slug: contact
---
{{ description }}

{%- if links %}
  {%- for item in links %}
  {%- unless item.label == 'Website' %}
- [{{ item.cta }}]({{ item.link }})
  {%- endunless %}
  {%- endfor %}
{%- endif %}