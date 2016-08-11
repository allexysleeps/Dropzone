document.forms.upload.onsubmit = function() {
      var file = this.elements.userFile.files[0];
      if (file) {
        upload(file);
      }
      return false;
    }
window.ondragover  = function(event) {
	event.preventDefault();
}
function upload(file) {
	var xhr = new XMLHttpRequest();

	xhr.onload = xhr.onerror = function() {
    	if (this.status == 200) {
     		uploadEnd(true)
    	} else {
      		uploadEnd(false)
    	}
  	};

  	xhr.upload.onprogress = function(event) {
		showProgress(event.loaded, event.total);
	}

	xhr.open("POST", "upload", true);
 	xhr.send(file);
}

function showProgress(current, total) {
	var loader = document.getElementsByClassName('loader')[0];
	loader.style.width = current/total * 100 + '%';
}
function uploadEnd(status) {
	var caption = document.getElementById('status-text');
	var loader = document.getElementsByClassName('loader')[0];
	if (status) {
		caption.innerText = 'Completed';
		loader.style.background = '#61ea8b';
	} else {
		caption = 'Error';
		loader.style.background = '#f7618b';
	}
}

var zone = document.getElementById('zone');
zone.ondragover = function() {
	event.preventDefault();
	this.style.borderColor = '#61ea8b';
}
zone.ondragleave = function() {
	this.style.borderColor = '';
}
zone.ondrop = function(event) {
	event.stopPropagation();
	event.preventDefault();
	var file = event.dataTransfer.files[0];
	upload(file);
}







