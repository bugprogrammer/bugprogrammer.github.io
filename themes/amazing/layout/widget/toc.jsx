const { tocObj: getTocObj } = require('hexo-util');
const { Component } = require('inferno');
const { cacheComponent } = require('../util/cache');

/**
 * Export a tree of headings of an article
 * {
 *    "1": {
 *        "id": "How-to-enable-table-of-content-for-a-post",
 *        "text": "How to enable table of content for a post",
 *        "index": "1"
 *    },
 *    "2": {
 *        "1": {
 *            "1": {
 *                "id": "Third-level-title",
 *                "text": "Third level title",
 *                "index": "2.1.1"
 *            },
 *            "id": "Second-level-title",
 *            "text": "Second level title",
 *            "index": "2.1"
 *        },
 *        "2": {
 *            "id": "Another-second-level-title",
 *            "text": "Another second level title",
 *            "index": "2.2"
 *        },
 *        "id": "First-level-title",
 *        "text": "First level title",
 *        "index": "2"
 *    }
 * }
 */
function getToc(content) {
    const toc = {};
    const levels = [0, 0, 0];
    const tocObj = getTocObj(content, { min_depth: 1, max_depth: 6 });
    const minLevel = Math.min(...tocObj.map(item => item.level));
    tocObj.forEach(item => {
        const { text, id } = item;
        const level = item.level - minLevel;

        for (let i = 0; i < levels.length; i++) {
            if (i > level) {
                levels[i] = 0;
            } else if (i < level) {
                if (levels[i] === 0) {
                    // if headings start with a lower level heading, set the former heading index to 1
                    // e.g. h3, h2, h1, h2, h3 => 1.1.1, 1.2, 2, 2.1, 2.1.1
                    levels[i] = 1;
                }
            } else {
                levels[i] += 1;
            }
        }
        let node = toc;
        for (const i of levels.slice(0, level + 1)) {
            if (!(i in node)) {
                node[i] = {};
            }
            node = node[i];
        }
        node.id = id;
        node.text = text;
        node.index = levels.slice(0, level + 1).join('.');
    });
    return toc;
}

class Toc extends Component {
    renderToc(toc) {
        let result;

        const keys = Object.keys(toc)
            .filter(key => !['id', 'index', 'text'].includes(key))
            .map(key => parseInt(key, 10))
            .sort((a, b) => a - b);

        if (keys.length > 0) {
            result = <ul class="menu-list toc">
                {keys.map(i => this.renderToc(toc[i]))}
            </ul>;
        }
        if ('id' in toc && 'index' in toc && 'text' in toc) {
            result = <li>
                <a class="is-flex toc-item" id={`toc-item-${toc.id}`} href={'#' + toc.id}>
                    {/*<span class="mr-2">{toc.index}</span>*/}
                    <span>{toc.text}</span>
                </a>
                {result}
            </li>;
        }
        return result;
    }

    render() {
        const toc = getToc(this.props.content);
        //toc highlight
        const js = `
        $(document).ready(function () { //参考自 https://github.com/ppoffice/hexo-theme-icarus/pull/616/files
            var observerTopMargin;
            var scrollObserver;
            var headerElems = $(".headerlink");
            var activeTocItem;
        
            function initIntersectionObserver(docHeight) {
                observerTopMargin = docHeight;
                scrollObserver = new IntersectionObserver(scrollCallBack,
                    {
                        root: null,  // viewpoint
                        rootMargin: docHeight + "px 0px -80% 0px"  // cover top 30% of viewport to the top of document
                    })
            }
        
            function scrollCallBack(entries, observer) {
                if ($(window).scrollTop() > observerTopMargin * 0.7) { 
                    // User somehow scroll to 70% of observerTopMargin (which is inited as 200% document height)
                    // Observer top margin need to extend to cover all the space to the top of the document
                    initIntersectionObserver(observerTopMargin * 2)
                    observer.disconnect();
                    return;
                }
                let toActive;
                if (entries[0].intersectionRatio == 1) {  // enter viewed area
                    let entry = entries.reduce((u, v) => (u.target.toc_id > v.target.toc_id ? u : v));  // get the lowest item
                    toActive = $("#toc-item-" + $(entry.target).attr("href").substr(1));
                } else {
                    let entry = entries.reduce((u, v) => (u.target.toc_id < v.target.toc_id ? u : v));  // get the highest item
                    let idx = Math.max(entry.target.toc_id - 1, 0);
                    toActive = $("#toc-item-" + $(headerElems[idx]).attr("href").substr(1));
                }
                if (activeTocItem) activeTocItem.removeClass("is-current");
                activeTocItem = toActive
                activeTocItem.addClass("is-current");
            }
        
            initIntersectionObserver($(document).height() * 2);
            headerElems.each(function (index, obj) {
                obj.toc_id = index;
                scrollObserver.observe(obj);
            })
        });`;
        if (!Object.keys(toc).length) {
            return null;
        }

        return <div class="card widget toc-scroll" id="toc">
            <div class="card-content">
                <div class="menu">
                    <h3 class="menu-label">{this.props.title}</h3>
                    {this.renderToc(toc)}
                </div>
            </div>
            <script type="text/javascript" dangerouslySetInnerHTML={{ __html: js }} async={true}></script>
        </div>;
    }
}

module.exports = cacheComponent(Toc, 'widget.toc', props => {
    const { config, page, helper } = props;
    const { layout, content } = page;

    if (config.toc !== true || (layout !== 'page' && layout !== 'post')) {
        return null;
    }

    return {
        title: helper._p('widget.catalogue', Infinity),
        content
    };
});
