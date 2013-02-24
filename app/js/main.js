var img = document.getElementById('door');

Hammer(document.body)
	.on('swipeup', function(event){
		img.classList.add('open');
		$.get('http://visserpi:8000');
	})
	.on('swipedown', function(event) {
		img.classList.remove('open');
		$.get('http://visserpi:8000');
	});