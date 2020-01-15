// These variables store the buttons and text
let readme = document.getElementById('drop-down');
let foundme = document.getElementById('read-more');
let readless = document.getElementById('read-less');

//make visible
readme.onclick = () => {
    foundme.style.display = 'block';
    readme.style.display = 'none';
  }

//hide again
readless.onclick = () => {
    foundme.style.display = 'none';
    readme.style.display = 'block';
}