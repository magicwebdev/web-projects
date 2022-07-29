const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let tickerPrice = +movieSelect.value;

populateIU();
updateSelectedCount();


function populateIU() {
  const selectedSeatsIndexes = JSON.parse(
    localStorage.getItem('selectedSeatsIndexes')
  );
  if (selectedSeatsIndexes !== null && selectedSeatsIndexes.length > 0) {
    // first way
    // selectedSeatsIndexes.forEach(index => {
    //   seats[index].classList.add('selected');
    // });
    // second way
    seats.forEach((seat, index) => {
      if (selectedSeatsIndexes.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
  if (selectedMoviePrice !== null) {
    tickerPrice = selectedMoviePrice;
  }
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const selectedSeatsIndexes = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem(
    'selectedSeatsIndexes',
    JSON.stringify(selectedSeatsIndexes)
  );

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * tickerPrice;
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
  }
  updateSelectedCount();
});

movieSelect.addEventListener('change', (e) => {
  tickerPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});
