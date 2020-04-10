const moment = require('moment');
const { Component, Fragment } = require('inferno');
const Share = require('./share');
const Donates = require('./donates');
const Comment = require('./comment');
const crypto = require('crypto');
const RecommendPosts = require('../widget/recommend_post');


/**
 * Get the word count of text.
 */
function getWordCount(content) {
    content = content.replace(/<\/?[a-z][^>]*>/gi, '');
    content = content.trim();
    return content ? (content.match(/[\u00ff-\uffff]|[a-zA-Z]+/g) || []).length : 0;
}

module.exports = class extends Component {
    render() {

        const { config, helper, page, index, site } = this.props;
        const { article, plugins, comment, has_latest_modify_time, has_copyright, busuanzi_only_count, index_show_tags_cateories } = config;
        const { has_thumbnail, my_cdn, get_thumbnail, url_for, date, date_xml, __, _p } = helper;
        const language = page.lang || page.language || config.language || 'en';
        const id = crypto.createHash('md5').update(page.path).digest('hex');
        const myPermalink = config.url + config.root + page.path;
        var hasLatestTime = has_latest_modify_time == undefined || has_latest_modify_time;
        var hasCopyright = has_copyright == undefined || has_copyright;
        var showBusuanziVisitor = plugins && plugins.busuanzi === true && (busuanzi_only_count != undefined && !busuanzi_only_count);
        var indexShowTagsCat = index_show_tags_cateories == undefined || index_show_tags_cateories;
        return <Fragment>
            {/* Main content */}
            <div class="card">
                {/* Thumbnail */}
                {has_thumbnail(page) ? <div class="card-image">
                    {index ? <a href={url_for(page.link || page.path)} class="image is-7by3">
                        <img class="thumbnail" src={get_thumbnail(page)} alt={page.title || get_thumbnail(page)} />
                    </a> : <span class="image is-7by3">
                            <img class="thumbnail" src={get_thumbnail(page)} alt={page.title || get_thumbnail(page)} />
                        </span>}
                </div> : null}
                {/* Metadata */}
                <article class={`card-content article${'direction' in page ? ' ' + page.direction : ''}`} role="article">
                    {page.layout !== 'page' ? <div class="article-meta size-small is-uppercase level is-mobile">
                        <div class="level-left">
                            {/*置顶图标*/}
                            {page.top > 0 ?
                                <div class="level-item tag is-danger" style="background-color: #3273dc;">已置顶</div> : null}
                            {/* Date */}
                            <i class="far fa-calendar-alt">&nbsp;&nbsp;</i>
                            <time class="level-item" dateTime={date_xml(page.date)}>{date(page.date)}</time>

                            {hasLatestTime && page.updated && page.updated > page.date ?
                                <div class="level-start">
                                    <div class="level-item has-text-grey is-size-7">
                                        <time datetime={date_xml(page.updated)}><i
                                            class="far fa-calendar-check">&nbsp;&nbsp;</i>{date(page.updated)}<i>
                                            &nbsp;&nbsp;&nbsp;</i>
                                        </time>
                                    </div>
                                </div> : null
                            }

                            {page.categories && page.categories.length ? <div class="level-item">
                            <i class="far fa-folder-open has-text-grey">&nbsp;</i>
                            {(() => {
                                const categories = [];
                                page.categories.forEach((category, i) => {
                                    categories.push(<a class="is-small link-muted" href={url_for(category.path)}>{category.name}</a>);
                                    if (i < page.categories.length - 1) {
                                        categories.push(<span>&nbsp;</span>);
                                    }
                                });
                                return categories;
                            })()}
                        </div> : null}

                            {comment.type !== 'undefined' && comment.type == 'gitalk' ?
                                <a class="commentCountImg" href={`${url_for(page.link || page.path)}#comment-container`}><span class="display-none-class">{id}</span><img class="not-gallery-item" src={`${my_cdn(url_for('/img/chat.svg'))}`} />&nbsp;<span class="commentCount" id={id}></span>&nbsp;&nbsp;&nbsp;&nbsp;</a> : null}
                            {/* Read time */}
                            {article && article.readtime && article.readtime === true ? <span class="level-item">
                                <i class="far fa-clock">&nbsp;&nbsp;</i>
                                {(() => {
                                    const words = getWordCount(page._content);
                                    const time = moment.duration((words / 150.0) * 60, 'seconds');
                                    return `${time.locale(language).humanize()} ${__('article.read')} (${__('article.about')} ${words} ${__('article.words')})`;
                                })()}
                            </span> : null}
                            {/* Visitor counter */}
                            {!index && showBusuanziVisitor ? <span class="level-item" id="busuanzi_container_page_pv" dangerouslySetInnerHTML={{
                                __html: '<i class="far fa-eye"></i>' + _p('plugin.visit', '&nbsp;&nbsp;<span id="busuanzi_value_page_pv">0</span>')
                            }}></span> : null}
                        </div>
                    </div> : null}
                    {/* Title */}
                    <h1 class="title is-3 is-size-4-mobile">
                        {index ? <a class="link-muted" href={url_for(page.link || page.path)}>{page.title}</a> : page.title}
                    </h1>
                    {/* Content/Excerpt */}
                    <div class="content" dangerouslySetInnerHTML={{ __html: index && page.excerpt ? page.excerpt : page.content }}></div>
                    {/* Tags */}
                    {index && indexShowTagsCat ? <div class="index-category-tag">
                        {/* Categories */}
                        {page.tags && page.tags.length ?
                            <div class="level-item">
                                {(() => {
                                    const tags = [];
                                    tags.push(<i class="fas fa-tags has-text-grey">&nbsp;</i>)
                                    page.tags.forEach((tag, i) => {
                                        tags.push(<a style="font-size:12px;" class="is-small link-muted" href={url_for(tag.path)}>{tag.name}</a>);
                                        if (i < page.tags.length - 1) {
                                            tags.push(<span>&nbsp;</span>);
                                        }
                                    });
                                    return tags;
                                })()}
                                <div style="float:right" class="level-item">
                                    <a style="font-size:12px;" class="is-small size-small link-muted"
                                        href={`${url_for(page.path)}#more`}><i class="fas fa-book-reader has-text-grey">&nbsp;</i>{__('article.more')}>></a>
                                </div>
                            </div> : null}
                    </div> : null}
                    {!index && page.layout == 'post' ?
                    <div style="text-align:center;color: #ccc;font-size:14px;">-------------本文结束<i class="fa fa-paw"></i>感谢您的阅读-------------</div> : null}
                    {!index && page.layout == 'post' ?
                    <div id="wechat_subscriber" style="display: block; padding: 10px 0; margin: 20px auto; width: 100%; text-align: center;">
                    <a class="gallery-item" href="/images/tim.jpg"><img id="wechat_subscriber_qcode" src="/images/tim.jpg" style="width: 200px; max-width: 100%;" /></a>
                    <div>扫一扫添加QQ好友</div>
                    </div> : null }
                    {!index && page.layout == 'post' ?
                    <ul class="post-copyright">
                    <li><strong>QQ群列表:</strong></li>
                    <li><a href="http://shang.qq.com/wpa/qunwpa?idkey=860990e11014839268b97278613c5b16d3569e4ef42561eeab25b5457064cd87" target="_blank">Hackintosh极客俱乐部</a>&nbsp;&nbsp;&nbsp;414114950</li>
                    </ul> : null}
                    {/*copyright*/}
                    {hasCopyright && !index && page.layout == 'post' ?
                        <ul class="post-copyright">
                            <li><strong>本文标题：</strong><a href={myPermalink}>{page.title}</a></li>
                            <li><strong>本文作者：</strong><a href={url_for(config.url)}>{config.author}</a></li>
                            <li><strong>本文链接：</strong><a href={myPermalink}>{myPermalink}</a></li>
                            <li><strong>发布时间：</strong>{date(page.date)}</li>
                            <li><strong>版权声明：</strong>本博客所有文章除特别声明外，均采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" rel="external nofollow" target="_blank">CC BY-NC-SA 4.0</a> 许可协议。转载请注明出处！
                        </li>
                        </ul> : null}
                        {!index && page.tags && page.tags.length ?
                            <div class="level-item">
                                {(() => {
                                    const tags = [];
                                    tags.push(<i class="fas fa-tags has-text-grey">&nbsp;</i>)
                                    page.tags.forEach((tag, i) => {
                                        tags.push(<a style="font-size:12px;" class="is-small link-muted" href={url_for(tag.path)}>{tag.name}</a>);
                                        if (i < page.tags.length - 1) {
                                            tags.push(<span>&nbsp;</span>);
                                        }
                                    });
                                    return tags;
                                })()}
                            </div> : null}
                    {/* Share button */}
                    <br />
                    {!index ? <Share config={config} page={page} helper={helper} /> : null}
                </article>
            </div>
            {/* Donate button */}
            {!index ? <Donates config={config} helper={helper} /> : null}
            {/* Post navigation */}
            {!index && (page.prev || page.next) ? <nav class="post-navigation mt-4 level is-mobile">
                {page.prev ? <div class="level-start">
                    <a class={`article-nav-prev level level-item${!page.prev ? ' is-hidden-mobile' : ''} link-muted`} href={url_for(page.prev.path)}>
                        <i class="level-item fas fa-chevron-left"></i>
                        <span class="level-item">{page.prev.title}</span>
                    </a>
                </div> : null}
                {page.next ? <div class="level-end">
                    <a class={`article-nav-next level level-item${!page.next ? ' is-hidden-mobile' : ''} link-muted`} href={url_for(page.next.path)}>
                        <span class="level-item">{page.next.title}</span>
                        <i class="level-item fas fa-chevron-right"></i>
                    </a>
                </div> : null}
            </nav> : null}
            {/* Comment */}
            {!index ? <Comment config={config} page={page} helper={helper} /> : null}
        </Fragment>;
    }
};
