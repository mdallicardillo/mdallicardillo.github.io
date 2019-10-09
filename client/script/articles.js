function retrieveArticlePreviews(articlesToShow, articleID) {
    let htmlArticles;
    $.getJSON('/data/articles.json', function(data){
        let objArticles = data.articles;

        for (i=0; i < articlesToShow; i++) {
            let oArticle = objArticles[i];
            if(oArticle != undefined && oArticle.id != articleID)
            {
                let htmlArticle =
                `<article class="article_preview">
                <div class="div_previewImage">
                    <a href="${oArticle.folder}"><img src="${oArticle.showcase}"/>
                </div>
                <div class="div_previewText">
                    <a href="${oArticle.folder}"><h2><em>${oArticle.title}</em></h2></a>
                    <p>${oArticle.body}</p>
                </div>
                </article>`;
                
                // additional fields for template literal if desired.
                // <a href=${oArticle.folder}><h2><em>${oArticle.title}</em></h2></a>
                //     <h3>${oArticle.subtitle}</h3>
                //     <time datetime="${oArticle.date}">${new Date(oArticle.date).toDateString()}</time>
                //     <p>${oArticle.body}</p>

                if (htmlArticles === undefined) {htmlArticles = htmlArticle;}
                else {htmlArticles = htmlArticles + htmlArticle;}
            }
        }
        document.getElementById("div_articlePreviews").innerHTML = htmlArticles;
    });
}

function retrieveMainArticle(path) {
    let htmlArticles;
    $.getJSON('/data/articles.json', function(data){
        let objArticles = data.articles;

        for (i=0; i < objArticles.length; i++) {
            let oArticle = objArticles[i];
            if(oArticle != undefined && oArticle.folder == path)
            {
                let htmlArticle =`
                <div id="div_mainImage">
                    <img src="${oArticle.showcase}"/>
                </div>
                <div id="div_mainText">
                    <h2><em>${oArticle.title}</em></h2>
                    <h3>${oArticle.subtitle}</h3>
                    <time datetime="${oArticle.date}">${new Date(oArticle.date).toDateString()}</time>
                    <p>${oArticle.body}</p>
                </div>
                </article>`;

                if (htmlArticles === undefined) {htmlArticles = htmlArticle;}
                else {htmlArticles = htmlArticles + htmlArticle;}
            }
        }
        document.getElementById("article_main").innerHTML = htmlArticles;
    });
}