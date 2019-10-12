function retrieveArticlePreviews(articlesToShow, articleID) {
    let htmlPreviews;
    $.getJSON('/data/articles.json', function(data){
        let objArticles = data.articles;

        for (i=0; i < articlesToShow; i++) {
            let oArticle = objArticles[i];
            let preview_img;
            let oBodyElements = oArticle.bodyElements;

            if(oArticle != undefined && oArticle.id != articleID)
            {
                if (oArticle.images.length > 0) preview_img = oArticle.images[0].src;
                else preview_img = "/img/coming-soon.png"

                let htmlPreview =
                `<article class="article_preview">
                <div class="div_previewImage">
                    <a href="${oArticle.folder}"><img src="${preview_img}"/>
                </div>
                <div class="div_previewText">
                    <a href="${oArticle.folder}"><h2><em>${oArticle.title}</em></h2></a>`;
                
                let bodyWritten = false;
                for (n=0; n <oBodyElements.length; n++)
                {
                    oBodyElement = oBodyElements[n];
                    if (oBodyElement.type === "p" && oBodyElement.contents.length >= 150)
                    {
                        htmlPreview += `<p>${oBodyElement.contents.substring(0, 150)}...</p>`;
                        bodyWritten = true;
                        break;
                    }
                }
                if (!bodyWritten) htmlPreview += `<p>${oBodyElements[0].contents}...</p>`;
                    
                htmlPreview += `</div></article>`;
                
                if (htmlPreviews === undefined) htmlPreviews = htmlPreview;
                else htmlPreviews += htmlPreview;
            }
        }
        document.getElementById("div_articlePreviews").innerHTML = htmlPreviews;
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