var cheerio = require( "cheerio" )


var wrapImageTags = function(page){

    var $ = cheerio.load(page.content);

    // Loop through each image found in the page content
    $('img').each(function(){
		
		//Get current page's path then remove .md text
		var path = page.path.replace('.md','').replace('/','-');
		
        // Build the wrapper
        var imageWrapper = $('<div>').addClass('image-wrapper').addClass(path);

        // Get the image object
        var img = $(this);

        // Rebuild the image
        var $image = $('<img>')
                        .attr('src', img.attr('src'))
                        .attr('alt', img.attr('alt'));

        // Append the original image
        imageWrapper.append($image);
        
        // Add the image with its wrapper
        $(this).before(imageWrapper);
        
        // Remove the image
        $(this).remove();
    });

    page.content = $.html();

    return page;

}

module.exports = {


    // Map of hooks
    hooks: {

    	'page': function(page){    		
    		return wrapImageTags(page);
    	}
    },

    // Map of new blocks
    blocks: {},

    // Map of new filters
    filters: {}
};