$(function(){
    $("#div_headNav").load("/components/header.html");

    $("#div_footer").load("/components/footer.html");
});

function renderArticlePreviews(numberOfArticles, articleID) {
    document.getElementById("div_articlePreviews").innerHTML = retrieveArticlePreviews(numberOfArticles, articleID);
}

function renderArticlePage(numberOfArticles, articleID, path) {
    document.getElementById("div_articlePreviews").innerHTML = retrieveArticlePreviews(numberOfArticles, articleID);
    document.getElementById("article_main").innerHTML = retrieveMainArticle(path);
}