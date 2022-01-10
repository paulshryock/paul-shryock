---
seo_title: Connect with Paul Shryock
title: Contact
description: If you need an ethical software engineer to bring your Awesome Project™ to life, here's how to get in touch with Paul.
slug: contact
links:
  - link: https://github.com/paulshryock/
    label: Check out my code on GitHub
  - link: https://www.linkedin.com/in/paulshryock/
    label: Send me work inquiries on LinkedIn
  - link: https://twitter.com/paul_shryock
    label: Chat with me on Twitter
---
{{ description }}

{%- if links %}
  {%- for item in links %}
- [{{ item.label }}]({{ item.link }})
  {%- endfor %}
{%- endif %}