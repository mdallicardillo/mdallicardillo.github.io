function retrieveImageGallary() {
    var htmlGallery;
    $.getJSON('/data/gallery.json', function(data)
    {
        let oImages = data.images;

        if (oImages != undefined) 
        {
            Array.prototype.forEach.call( oImages, function(oImage){
                if(oImage != undefined)
                {
                    let img_desc;
                    if(oImage.desc != "") img_desc = oImage.desc; else img_desc = "<strong>Description Coming Soon!</strong>";

                    let htmlImage =
                    `<section class="section_image">
                        <div class="div_image">
                            <img src="${oImage.src}"/>
                            <div class="overlay">
                                <p class="p_imageDescription">
                                    ${img_desc}
                                </p>
                            </div>
                        </div>
                    </section>`;
                    
                    if (htmlGallery === undefined) htmlGallery = htmlImage;
                    else htmlGallery += htmlImage;
                }
            })
            document.getElementById("div_imagePreviews").innerHTML = htmlGallery;
        }
    });
}