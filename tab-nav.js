
function initTabNav() {
	var tabNav = document.getElementsByClassName('tab-nav');

	for (var i = 0; i < tabNav.length; i++){
		var list = tabNav[i];
		fetch(list.dataset["json"])
		.then(response => {
			 return response.json();
		})
		.then(
			data => {
				var marker = document.createElement('span')
				marker.classList.add('marker');
				list.appendChild(marker);

				var cities = data["cities"];
				for (var i = 0; i < cities.length; i++){
					var city = cities[i];

					var link = document.createElement('a');
					link.appendChild(document.createTextNode(city["label"]));
					link.href = "#" + city["section"];
					if(i == 0){
						link.classList.add('active');
					}	

					var item = document.createElement('li')
					item.appendChild(link);
					list.appendChild(item);
				}
	
				list.addEventListener('click', tabNavActivation);
				moveMarkerUnder(list.querySelectorAll('a.active')[0]);
				window.addEventListener('resize', function(){
					moveMarkerUnder(list.querySelectorAll('a.active')[0]);
				});
			}
		);
	}
}

function tabNavActivation(ev) {
	ev.preventDefault();
	var activeTab = ev.target
	var list = activeTab.parentElement.parentElement;
	var sibs = list.querySelectorAll('a');
	var prevActiveTab = list.querySelectorAll('a.active')[0];

	sibs.forEach(sib => sib.classList.remove('active'));
	activeTab.classList.add('active');
	if(list.querySelectorAll('a.active').length == 0){
		prevActiveTab.classList.add('active');
		return;
	}

	moveMarkerUnder(activeTab);
}

function moveMarkerUnder(el) {
	var list = el.parentElement.parentElement;
	var marker = list.querySelector('.marker');

	marker.style.width = el.clientWidth + 'px';
	marker.style.left = el.offsetLeft + 'px';
}

initTabNav();
