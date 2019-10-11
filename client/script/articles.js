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
                    <p>${oArticle.body.substring(3, 150) + "..."}</p>
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
        let oArticles = data.articles;

        for (i=0; i < oArticles.length; i++) {
            let oArticle =  oArticles[i];
            let oImages = oArticle.images;
            let oBodyElements = oArticle.bodyElements;

            if(oArticle != undefined && oArticle.folder == path)
            {
                let htmlArticle =`
                <div id="div_mainImage">
                    <img src="${oImages[0].src}" alt="${oImages[0].caption}"/>
                </div>
                <div id="div_mainText">
                    <h2>${oArticle.title}</h2>
                    <h3><em>${oArticle.subtitle}</em></h3>
                    <time datetime="${oArticle.date}">${new Date(oArticle.date).toDateString()}</time>`;
                
                    let img_count = 1;
                for (n=0; n < oBodyElements.length; n++)
                {
                    oBodyElement = oBodyElements[n]

                    if(oBodyElement.type === "p") htmlArticle += `<p>${oBodyElement.contents}</p>`; 
                    else if (oBodyElement.type === "img")
                    {
                        htmlArticle += `<img src="${oImages[img_count].src}">`;
                        img_count += 1;
                    } 
                }
                    // ${oArticle.body}
                htmlArticle += `</div></article>`;

                if (htmlArticles === undefined) {htmlArticles = htmlArticle;}
                else {htmlArticles += htmlArticle;}
            }
        }
        document.getElementById("article_main").innerHTML = htmlArticles;
    });
}