var img = document.getElementById('door');

Hammer(document.body)
	.on('swipeup', function(event){
		img.classList.add('open');
		$.post(window.location.href);
	})
	.on('swipedown', function(event) {
		img.classList.remove('open');
		$.post(window.location.href);
	});