$(document).ready(function(){
	
	var $grid = $('.grid').masonry({
		gutter: 5
	});
	
	// layout Masonry after each image loads
	$grid.imagesLoaded().progress( function() {
		$grid.masonry('layout');
	});
	
	$('.grid-item').click(function(){
		var image_data = $(this).data(image);
		var image = image_data.image;
		var description = `<p>${image.description}</p>`;
		var title = `<h5 class="modal-title">${image.name}<i class="fa fa-times" data-dismiss="modal" aria-label="Close" aria-hidden="true"></i></h5>`;
		var img = `<img src="${image.upload_location}" alt="${image.name}">`;
		$('#image-modal .modal-body').html(img + title + description);
		$('.modal').modal('show');
	});

	$('i.like').click(function(e) {
	
		e.stopPropagation();
		e.preventDefault();
	
		var like = $(this).hasClass('far');
		var image_id = $(this).data('image');
	  
		var _this = $(this);
	
		$.getJSON(
			$SCRIPT_ROOT + '/like', 
			{
				like: like,
				image_id: image_id
			}, 
			function(result) {
				_this.removeClass('far')
			}
		);
	});
	$('i.not_liked').click(function(e) {
	
		e.stopPropagation();
		e.preventDefault();
	
		var like = $(this).hasClass('fas');
		var image_id = $(this).data('image');
	  
		var _this = $(this);
	
		$.getJSON(
			$SCRIPT_ROOT + '/unlike', 
			{
				like: unlike,
				image_id: image_id
			}, 
			function(result) {
				_this.removeClass('fas')
			}
		);
	});
});