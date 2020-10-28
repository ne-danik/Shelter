// Close menu on click on overlay
document.querySelector('.overlay').addEventListener('click', () => {
	document.querySelector('.burger_menu__btn__icon').click();
});


// Scroll to top
document.querySelector('#active').addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
	document.querySelector('.burger_menu__btn__icon').click();
});


// Block page scrolling when opening a menu
document.querySelector('#burgerBtn').addEventListener('click', () => {
	if (document.querySelector('#burgerBtn').checked) {
		document.querySelector('body').style.overflow = 'hidden';
	} else {
		document.querySelector('body').style.overflow = '';
	}
});


// Open popup
const popup = document.querySelector('#popup');
const span = document.querySelector('#close');

function openPopup(e) {
	popup.style.display = 'flex';
	document.querySelector('body').style.overflow = 'hidden';
	let id = e.id.substring(6) - 1;
	samplePopup(id);
}

// Close popup on click on button
span.addEventListener('click', () => {
  popup.style.display = 'none';
	document.querySelector('body').style.overflow = '';
});

// Close popup on click on overlay
document.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.style.display = 'none';
		document.querySelector('body').style.overflow = '';
  }
});


// Parse JSON
function samplePopup(id) {
	let requestURL = 'pets.json';
	let request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		let pets = request.response;
		slide(pets, id);
	}
}

function slide(pets, id) {
	let pet = pets;
	const popup = document.querySelector('#popup');
	
	let img = popup.querySelector('#img');
  let h3Name = popup.querySelector('#name');
  let h4Type = popup.querySelector('#type');
  let h4Breed = popup.querySelector('#breed');
	let pDescription = popup.querySelector('#description');
	let liAge = popup.querySelector('#age');
	let liInoculations = popup.querySelector('#inoculations');
	let liDiseases = popup.querySelector('#diseases');
	let liParasites = popup.querySelector('#parasites');
	
	img.src=`${pet[id].img}`;
	h3Name.textContent = pet[id].name;
  h4Type.textContent = pet[id].type;
  h4Breed.textContent = pet[id].breed;
	pDescription.textContent = pet[id].description;
	liAge.textContent = pet[id].age;
	liInoculations.textContent = pet[id].inoculations;
	liDiseases.textContent = pet[id].diseases;
	liParasites.textContent = pet[id].parasites;
}