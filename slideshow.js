// Defining variables
var images = [
    'building.jpg', 
    'school.jpg', 
    'hospital.jpg',
	'highwayprimary.jpg',
	'highwayresidential.jpg',
	'highwaypath.jpg'
];

// Defining slideshow 
var num = 0;
function next() {
    var slider = document.getElementById('slider');
    num++;
    if(num >= images.length) {
        num = 0;
    }
    slider.src = images[num];
}
function prev() {
    var slider = document.getElementById('slider');
    num--;
    if(num < 0) {
        num = images.length-1;
    }
    slider.src = images[num];
}