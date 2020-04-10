/**
 * CDN static file resolvers.
 *
 * @example
 *     <%- cdn(package, version, filename) %>
 *     <%- fontcdn(fontName) %>
 *     <%- iconcdn() %>
 */

const PROVIDERS = {
    LIBRARY: {
        cdnjs: '[cdnjs]https://cdnjs.cloudflare.com/ajax/libs/${ package }/${ version }/${ filename }',
        loli: '[cdnjs]https://cdnjs.loli.net/ajax/libs/${ package }/${ version }/${ filename }',
        jsdelivr: 'https://cdn.jsdelivr.net/npm/${ package }@${ version }/${ filename }',
        unpkg: 'https://unpkg.com/${ package }@${ version }/${ filename }'
    },
    FONT: {
        google: 'https://fonts.googleapis.com/${ type }?family=${ fontname }',
        loli: 'https://fonts.loli.net/${ type }?family=${ fontname }'
    },
    ICON: {
        loli: 'https://cdnjs.loli.net/ajax/libs/font-awesome/5.12.0/css/all.min.css',
        fontawesome: 'https://use.fontawesome.com/releases/v5.12.0/css/all.css'
    }
};

/**
 * Convert npm library path to CDN.js path
 */
const CDNJS_FIXTURES = {
    'moment': (ver, fname) => [
        'moment.js', ver, fname.startsWith('min/') ? fname.substr(4) : fname
    ],
    'outdatedbrowser': (ver, fname) => [
        'outdated-browser', ver, fname.startsWith('outdatedbrowser/') ? fname.substr(16) : fname
    ],
    'highlight.js': (ver, fname) => [
        'highlight.js', ver, fname.endsWith('.css') && fname.indexOf('.min.') === -1
            ? fname.substr(0, fname.length - 4) + '.min.css' : fname
    ],
    'mathjax': (ver, fname) => [
        'mathjax', ver, fname.startsWith('unpacked/') ? fname.substr(9) : fname
    ],
    'katex': (ver, fname) => [
        'KaTeX', ver, fname
    ],
    'pace-js': (ver, fname) => [
        'pace', ver, fname
    ],
    'clipboard': (ver, fname) => [
        'clipboard.js', ver, fname
    ],
    // disqusjs is not hosted on CDN.js
    'disqusjs': (ver, fname) => []
};

module.exports = function (hexo) {
    hexo.extend.helper.register('cdn', function (_package, version, filename) {
        let { cdn = 'jsdelivr' } = typeof this.config.providers === 'object' ? this.config.providers : {};
        if (cdn in PROVIDERS.LIBRARY) {
            cdn = PROVIDERS.LIBRARY[cdn];
        }
        // cdn.js does not follow a GitHub npm style like jsdeliver and unpkg do. Patch it!
        if (cdn === 'cdnjs' || cdn.startsWith('[cdnjs]')) {
            if (cdn.startsWith('[cdnjs]')) {
                cdn = cdn.substr(7);
            }
            if (filename.startsWith('dist/')) {
                filename = filename.substr(5);
            }
            if (Object.prototype.hasOwnProperty.call(CDNJS_FIXTURES, _package)) {
                [_package, version, filename] = CDNJS_FIXTURES[_package](version, filename);
                // package is not hosted on CDN.js
                if (!_package) {
                    cdn = 'jsdelivr';
                }
            }
        }
        return cdn.replace(/\${\s*package\s*}/gi, _package)
            .replace(/\${\s*version\s*}/gi, version)
            .replace(/\${\s*filename\s*}/gi, filename);
    });

    // filename resource abs url
    hexo.extend.helper.register('my_cdn', function (filename) {

        // https://cdn.jsdelivr.net/gh/removeif/removeif.github.io@v1.0.6/json_data/record.json
        // full url,return
        if (filename.startsWith("https://cdn.jsdelivr.net")) {
            return filename;
        } else {
            const myCdnPre = this.config.providers.my_cdn_pre;
            if (myCdnPre != undefined && myCdnPre != "") {
                if (filename.endsWith(".css") && !filename.endsWith(".min.css") && myCdnPre.indexOf("cdn.jsdelivr.net") > -1) {
                    filename = filename.replace(".css", ".min.css");
                } else if (filename.endsWith(".js") && !filename.endsWith(".min.js") && myCdnPre.indexOf("cdn.jsdelivr.net") > -1) {
                    filename = filename.replace(".js", ".min.js");
                }
                return this.config.providers.my_cdn_pre + filename;
            } else {
                return filename;
            }
        }
    });

    hexo.extend.helper.register('fontcdn', function (fontName, type = 'css') {
        let { fontcdn = 'google' } = typeof this.config.providers === 'object' ? this.config.providers : {};
        if (fontcdn in PROVIDERS.FONT) {
            fontcdn = PROVIDERS.FONT[fontcdn];
        }
        return fontcdn.replace(/\${\s*fontname\s*}/gi, fontName)
            .replace(/\${\s*type\s*}/gi, type);
    });

    hexo.extend.helper.register('iconcdn', function () {
        let { iconcdn = 'fontawesome' } = typeof this.config.providers === 'object' ? this.config.providers : {};
        if (iconcdn in PROVIDERS.ICON) {
            iconcdn = PROVIDERS.ICON[iconcdn];
        }
        return iconcdn;
    });
};
