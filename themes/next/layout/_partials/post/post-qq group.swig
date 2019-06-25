{% set ccLicense = theme.creative_commons.license | lower %}
{% set ccIcon = '<i class="fa fa-fw fa-creative-commons"></i>' %}
{% set ccText = ccLicense | upper %}
{% if ccLicense === 'zero' %}
  {% set ccType = 'publicdomain/zero/1.0/' %}
{% else %}
  {% set ccType = 'licenses/' + ccLicense + '/4.0/' %}
{% endif %}
{% set ccURL = 'https://creativecommons.org/' + ccType %}

<ul class="post-copyright">
  <li class="post-copyright-author">
    QQ群列表：
  </li>
  <li class="post-copyright-link">
    <a style="color:blue" href="http://shang.qq.com/wpa/qunwpa?idkey=860990e11014839268b97278613c5b16d3569e4ef42561eeab25b5457064cd87" target="_blank" rel="noopener">Hachintosh极客俱乐部</a>
    414114950
  </li>
</ul>
