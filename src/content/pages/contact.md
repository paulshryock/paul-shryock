---
seo_title: Connect with Paul Shryock
title: Contact Paul
description: If you need an ethical software engineer to bring your Awesome Project™ to life, here's how to get in touch with Paul.
slug: contact
links:
  - link: https://github.com/paulshryock/
    label: Check out Paul's code on GitHub
  - link: https://www.linkedin.com/in/paulshryock/
    label: Send Paul work inquiries on LinkedIn
  - link: https://twitter.com/paul_shryock
    label: Chat with Paul on Twitter
---
{{ description }}

{%- if links %}
  {%- for item in links %}
- [{{ item.label }}]({{ item.link }})
  {%- endfor %}
{%- endif %}