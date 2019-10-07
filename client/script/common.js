$(function(){
    $("#div_headNav").load("/components/header.html");

    $("#div_footer").load("/components/footer.html");
});

function renderArticlePreviews(numberOfArticles) {


    document.getElementById("div_articlePreviews").innerHTML = retrieveArticlePreviews(numberOfArticles);
}