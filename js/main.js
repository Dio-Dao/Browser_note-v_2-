
let nt_mas = document.getElementsByClassName('note_title');
let textarea_mas = document.getElementsByClassName('note_textarea');
//-------------* Select note tab
document.querySelector('.note_header').addEventListener('click', ftabs);
function ftabs(event) {
	if (event.target.className == 'note_title') {
		let dataTab = event.target.getAttribute('data-tab');
		for (let i = 0; i < nt_mas.length; i++) {
			nt_mas[i].classList.remove('active');
		}
		event.target.classList.add('active');
		for (let i = 0; i < textarea_mas.length; i++) {
			if (dataTab == i) {
				textarea_mas[i].style.display = 'block';
				// let border_bcolor = nt_mas[i].style.backgroundColor;
				// nt_mas[i].style.borderBottomColor = border_bcolor;
			}
			else {
				textarea_mas[i].style.display = 'none';
				nt_mas[i].style.borderBottomColor = '$output-color';
			}
		}
	}
}
//-------------* Add note tab
let insert_placeH = document.querySelector(".note_header-left");
let insert_placeT = document.querySelector(".note_body");
let addNote = document.querySelector('.add_note');
let addColor = document.querySelector('.add_color');
let pull_ribbon = document.querySelector('.corner-ribbon');
addNote.onclick = function add_elements() {
	insert_placeH.insertAdjacentHTML('beforeEnd', '<input type="text" class="note_title" maxlength="100"> </input>');
	nt_mas[nt_mas.length - 4].setAttribute('data-tab', [nt_mas.length - 4]);
	nt_mas[nt_mas.length - 4].placeholder = '_ _ _';
	insert_placeT.insertAdjacentHTML('beforeEnd', '<textarea class="note_textarea" \
	placeholder="_ _ _      _ _ _      _ _ _\n_ _ _      _ _ _      _ _ _\n_ _ _      _ _ _      _ _ _\n_ _ _      _ _ _      _ _ _\n_ _ _      _ _ _      _ _ _" ></textarea>');
	addColor.style.display = 'inline-block';
	// pull_ribbon.style.display = 'block';

	let header_width = document.querySelector(".note_header-right").offsetWidth + insert_placeH.offsetWidth + 5;
	for (let i = 0; i < textarea_mas.length; i++) {
		textarea_mas[i].style.minWidth = header_width + 'px';
	}
	if (textarea_mas.length == 1) {
		nt_mas[nt_mas.length - 4].classList.add('active');
	}
}
//-------------* Delete note tab
let delNote = document.querySelector('.rem_note');
delNote.onclick = function () {
	nt_mas;
	textarea_mas;
	if (nt_mas.length == 3) {
		return;
	}
	else if (nt_mas[nt_mas.length - 4].className == 'note_title active' && nt_mas.length != 4) {
		nt_mas[nt_mas.length - 4].remove();
		nt_mas[nt_mas.length - 4].classList.add('active');
		textarea_mas[nt_mas.length - 4].style.display = 'block';
		if (nt_mas[nt_mas.length - 4].className == 'note_title active') {
			nt_mas[nt_mas.length - 4].style.borderBottomColor = nt_mas[nt_mas.length - 4].style.backgroundColor;
		}
	}
	else if (nt_mas.length == 4) {
		nt_mas[nt_mas.length - 4].remove();
		addColor.style.display = 'none';
		// pull_ribbon.style.display = 'none';
	}
	else {
		nt_mas[nt_mas.length - 4].remove();
	}
	textarea_mas[textarea_mas.length - 1].remove();
	note_textarea_ls.splice(note_textarea_ls.length - 1, 1);
	note_title_ls.splice(note_title_ls.length - 1, 1);
	note_color_ls.splice(note_color_ls.length - 1, 1);
	addToLocalStorage();
}
//-------------* Change note color
document.querySelector('.change_color').oninput = function () {
	let theColor = this.value;
	for (let i = 0; i < nt_mas.length; i++) {
		if (nt_mas[i].className == 'note_title active') {
			textarea_mas[i].style.backgroundColor = theColor;
			nt_mas[i].style.backgroundColor = theColor;
			nt_mas[i].style.borderBottomColor = theColor;
		}
	}
	note_color_ls = [];
	note_title_ls = [];
	note_textarea_ls = [];
	for (let i = 0; i < textarea_mas.length; i++) {
		note_color_ls.push({ data: rgb2hex(nt_mas[i].style.backgroundColor) })
		note_title_ls.push({ data: nt_mas[i].value });
		note_textarea_ls.push({ data: textarea_mas[i].value });
	}
	for (let i = note_title_ls.length - 1; i < note_title_ls.length; i++) {
		addToLocalStorage();
	}
}
//-------------* Add note_title to local storage
if ((localStorage.getItem('note_tls') == undefined) && (localStorage.getItem('note_txals') == undefined) && (localStorage.getItem('note_cls')) == undefined) {
	var note_title_ls = [];
	var note_textarea_ls = [];
	var note_color_ls = [];
}
else {
	note_title_ls = JSON.parse(localStorage.getItem('note_tls'));
	note_textarea_ls = JSON.parse(localStorage.getItem('note_txals'));
	note_color_ls = JSON.parse(localStorage.getItem('note_cls'));
}
for (let key in note_title_ls) {
	if (note_title_ls[key]) {
		insert_placeH.insertAdjacentHTML('beforeEnd', '<input type="text" class="note_title"> </input>');
		nt_mas[nt_mas.length - 4].setAttribute('data-tab', [nt_mas.length - 4]);
		nt_mas[nt_mas.length - 4].placeholder = '_ _ _';
		insert_placeT.insertAdjacentHTML('beforeEnd', '<textarea class="note_textarea" \
	placeholder="_ _ _      _ _ _      _ _ _\n_ _ _      _ _ _      _ _ _\n_ _ _      _ _ _      _ _ _\n_ _ _      _ _ _      _ _ _\n_ _ _      _ _ _      _ _ _" ></textarea>');
		addColor.style.display = 'inline-block';
		// pull_ribbon.style.display = 'block';

		let header_width = document.querySelector(".note_header-right").offsetWidth + insert_placeH.offsetWidth + 5;
		for (let i = 0; i < textarea_mas.length; i++) {
			textarea_mas[i].style.minWidth = header_width + 'px';
		}
		if (textarea_mas.length == 1) {
			nt_mas[nt_mas.length - 4].classList.add('active');
		}
	}
}
document.querySelector('.note_inner').onkeyup = function () {
	note_title_ls = [];
	note_textarea_ls = [];
	note_color_ls = [];
	for (let i = 0; i < textarea_mas.length; i++) {
		note_title_ls.push({ data: nt_mas[i].value });
		note_textarea_ls.push({ data: textarea_mas[i].value })
		note_color_ls.push({ data: rgb2hex(nt_mas[i].style.backgroundColor) })
	}
	for (let i = note_title_ls.length - 1; i < note_title_ls.length; i++) {
		addToLocalStorage();
	}
}
for (let i in note_textarea_ls) {
	if (note_textarea_ls[i]) {
		for (let i = 0; i < textarea_mas.length; i++) {
			textarea_mas[i].value = note_textarea_ls[i].data;
		}
	}
}
for (let i in note_title_ls) {
	if (note_title_ls[i]) {
		for (let i = 0; i < textarea_mas.length; i++) {
			nt_mas[i].value = note_title_ls[i].data;
		}
	}
}
// for (let i in note_color_ls) {
// 	if (note_color_ls[i]) {
// 		for (let i = 0; i < textarea_mas.length; i++) {
// 			textarea_mas[i].style.backgroundColor = note_color_ls[i].data;
// 			nt_mas[i].style.backgroundColor = note_color_ls[i].data;
// 			if (nt_mas[i].className == 'note_title active') {
// 				nt_mas[i].style.borderBottomColor = note_color_ls[i].data;
// 			}
// 		}
// 	}
// }
function addToLocalStorage() {
	localStorage.setItem('note_tls', JSON.stringify(note_title_ls));
	localStorage.setItem('note_txals', JSON.stringify(note_textarea_ls));
	localStorage.setItem('note_cls', JSON.stringify(note_color_ls));
}
//-------------* RGB to HEX
function rgb2hex(rgb) {
	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return (rgb && rgb.length === 4) ? "#" +
		("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}
//-------------* Corner ribbon color
// let body = document.querySelector('.body');
// document.querySelector('.note_item').onmousemove = function () {
// 	for (let i = 0; i < textarea_mas.length; i++) {
// 		if (nt_mas[i].className == 'note_title active') {
// 			if ((textarea_mas[i].offsetWidth > 1000) || (textarea_mas[i].offsetHeight > 590)) {
// 				pull_ribbon.style.backgroundColor = '#F8463F';
// 				pull_ribbon.style["boxShadow"] = "0 0 0 3px #F8463F";
// 			}
// 			else {
// 				pull_ribbon.style.backgroundColor = '#57dd43';
// 				pull_ribbon.style["boxShadow"] = "0 0 0 3px #57dd43";
// 			}
// 		}
// 	}
// }
// -------------* Cursor Custom
document.onmousemove = function () {
	document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd', '<div id="cursor_custom"></div');
	let cursor_custom = document.getElementById('cursor_custom');
	cursor_custom.style.position = 'fixed';
	cursor_custom.classList.add('bezier');

	document.onmousemove = function normal_size(event) {
		cursor_custom.style.left = event.clientX - 8 + 'px';
		cursor_custom.style.top = event.clientY - 8 + 'px';
	}
}
for (let i = 0; i < nt_mas.length; i++) {
	nt_mas[i].onpointerenter = function () {
		cursor_custom.classList.remove('bezier');
		cursor_custom.classList.add('normal');
		cursor_custom.style.width = 70 + 'px';
		cursor_custom.style.height = 70 + 'px';
		cursor_custom.style.borderRadius = 50 + "px";
		document.onmousemove = function (event) {
			cursor_custom.style.left = event.clientX - 38 + 'px';
			cursor_custom.style.top = event.clientY - 38 + 'px';
		}
	}
	nt_mas[i].onpointerleave = function () {
		document.onmousemove = function (event) {
			cursor_custom.style.left = event.clientX - 8 + 'px';
			cursor_custom.style.top = event.clientY - 8 + 'px';
		}
		cursor_custom.classList.remove('normal');
		cursor_custom.classList.add('bezier');
		cursor_custom.style.width = 10 + 'px';
		cursor_custom.style.height = 10 + 'px';
	}
}
