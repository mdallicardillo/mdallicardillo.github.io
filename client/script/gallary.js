function retrieveImageGallary() {
    let htmlPreviews;
    $.getJSON('/data/articles.json', function(data){
        let objArticles = data.articles;

        if (articlesToShow == undefined) articlesToShow = 16;

        for (i=0; i < articlesToShow; i++) {
            let oArticle = objArticles[i];
            let preview_img;
            
            if(oArticle != undefined && oArticle.id != articleID)
            {
                let oBodyElements = oArticle.bodyElements;

                if (oArticle.images.length > 0) preview_img = oArticle.images[0].src;
                else preview_img = "/img/coming-soon.png"

                let htmlPreview =
                `<article class="article_preview">
                <div class="div_previewImage">
                    <a href="${oArticle.folder}"><img src="${preview_img}"/>
                </div>`

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