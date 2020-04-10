const { Component } = require('inferno');

module.exports = class extends Component {
    render() {
        const { thumbnail, url, title, date, dateXml, categories } = this.props;

        const categoryTags = [];

        if(categories.length > 0){
            categoryTags.push(<i class="fas fa-folder-open has-text-grey">&nbsp;</i>)
        }
        categories.forEach((category, i) => {
            categoryTags.push(<a class="link-muted" href={category.url}>{category.name}</a>);
            if (i < categories.length - 1) {
                categoryTags.push(' / ');
            }
        });

        return <article class="media">
            {thumbnail ? <a href={url} class="media-left">
                <p class="image is-64x64">
                    <img class="thumbnail" src={thumbnail} alt={title} />
                </p>
            </a> : null}
            <div class="media-content size-small">
                <p><time dateTime={dateXml}>{date}</time></p>
                <p class="title is-6"><a href={url} class="link-muted">{title}</a></p>
                <p class="is-uppercase">{categoryTags.length ? categoryTags : null}</p>
            </div>
        </article>;
    }
};
