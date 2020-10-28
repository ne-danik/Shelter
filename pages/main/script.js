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


// Parse JSON
let request = new XMLHttpRequest();
request.open('GET', 'pets.json');
request.responseType = 'json';
request.send();
request.onload = function() {
	let petsList = request.response; //8
	let randomPetsList = []; // 48

	randomPetsList = (() => {
		let tempArr = [];

		for (let i = 0; i < 6; i++) {
			const newPets = petsList;
			for (let j = petsList.length; j > 0; j--) {
				let randInd = Math.floor(Math.random() * j);
				const randElem = newPets.splice(randInd, 1)[0];
				newPets.push(randElem);
			}
			tempArr = [...tempArr, ...newPets];
		}
		return tempArr;
	})();
	
	randomPetsList = sort863(randomPetsList);
	createElements(randomPetsList);
}

createElements = (petsList) => {
  const elem = document.querySelector("#swiper-wrapper");
  for (let i = 0; i < petsList.length; i++) {
		elem.innerHTML += `
		<div class="swiper-slide" onclick="openPopup(this)" id="slide-${petsList[i].name}">
      <img src="${petsList[i].img}" alt="${petsList[i].name}">
      <h4 class="swiper-slide__title" id="name">${petsList[i].name}</h4>
      <button class="button button_secondary" type="submit" title="Learn more">Learn more</button>
    </div>`;
	}
	
	// Slider-swiper
	var swiper = new Swiper('.swiper-container', {
		breakpoints: {
			320: {
				spaceBetween: 40,
				slidesPerView: 1,
				slidesPerGroup: 1,
			},
			768: {
				spaceBetween: 40,
				slidesPerView: 2,
				slidesPerGroup: 2,
			},
			1280: {
				spaceBetween: 90,
				slidesPerView: 3,
				slidesPerGroup: 3,
			}
		},
		loop: true,
		loopFillGroupWithBlank: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-btn-next',
			prevEl: '.swiper-btn-prev',
		},
	});
}

const sort863 = (list) => {
  let unique8List = [];
  let length = list.length;
  for (let i = 0; i < length / 8; i++) {
    const uniqueStepList = [];
    for (j = 0; j < list.length; j++) {
      if (uniqueStepList.length >= 8) {
        break;
      }
      const isUnique = !uniqueStepList.some((item) => {
        return item.name === list[j].name;
      });
      if (isUnique) {
        uniqueStepList.push(list[j]);
        list.splice(j, 1);
        j--;
      }
    }
    unique8List = [...unique8List, ...uniqueStepList];
  }
	list = unique8List;
	
  list = sort6recursively(list);
  return list;
}

const sort6recursively = (list) => {
  const length = list.length;

  for (let i = 0; i < (length / 6); i++) {
    const stepList = list.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && (ind !== j);
      });

      if (duplicatedItem !== undefined) {
        const ind = (i * 6) + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        sort6recursively(list);
      }
    }
  }

  return list;
}


// Open popup
const popup = document.querySelector('#popup');
const span = document.querySelector('#close');

function openPopup(e) {
	popup.style.display = 'flex';
	document.querySelector('body').style.overflow = 'hidden';
	let id = e.id.substring(6);
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

// Create popup
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

function slide(petsList, id) {
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
	
	let arr;

	for(let i = 0; i < petsList.length; i++) {
		if (petsList[i].name === id) {
			arr = petsList[i];
			break;
		}
	}

	img.src=`${arr.img}`;
	h3Name.textContent = arr.name;
  h4Type.textContent = arr.type;
  h4Breed.textContent = arr.breed;
	pDescription.textContent = arr.description;
	liAge.textContent = arr.age;
	liInoculations.textContent = arr.inoculations;
	liDiseases.textContent = arr.diseases;
	liParasites.textContent = arr.parasites;
}