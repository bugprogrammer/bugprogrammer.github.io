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
    <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=cc516186110042126e7964fb5b93538614077c6607a5d1bb67231a00de454806"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="Hackintosh极客俱乐部" title="Hackintosh极客俱乐部"></a>
  </li>
</ul>
