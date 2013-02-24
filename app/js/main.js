var img = document.getElementById('door');

Hammer(document.body)
	.on('swipeup', function(event){
		img.classList.add('open');
	})
	.on('swipedown', function(event) {
		img.classList.remove('open');
	});