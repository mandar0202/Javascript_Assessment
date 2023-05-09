var selectedSeats = [];


function generateSeatingPlan() {
  var movie = document.getElementById("movie").value;
  var seatingPlan = document.querySelector(".seating-plan");
  seatingPlan.innerHTML = ""; // Clear the seating plan

  
  var availableSeats = [1, 2, 3, 7, 8, 9, 13, 14, 15,16,19,20,22,23,25,29,30,31,32,33,36,37,38,43,44,46,47,48,49,51];
  var bookedSeats = [4, 5, 6, 10, 11, 12,17,18,21,24,26,27,28,34,35,39,40,41,42,45,50];

 
  for (var i = 1; i <= 51; i++) {
    var seat = document.createElement("div");
    seat.classList.add("seat");

    // Check if the seat is available or booked
    if (availableSeats.includes(i)) {
      seat.classList.add("available");
    } else if (bookedSeats.includes(i)) {
      seat.classList.add("booked");
    }

    
    seat.addEventListener("click", function() {
      toggleSeatSelection(this);
    });

    seatingPlan.appendChild(seat);
  }

  updateBookingSummary();
}


function toggleSeatSelection(seat) {
  var seatNumber = parseInt(seat.innerText);

  if (seat.classList.contains("booked")) {
    // Cancel the booking
    seat.classList.remove("booked");
    seat.classList.remove("selected");
    var index = selectedSeats.indexOf(seatNumber);
    if (index !== -1) {
      selectedSeats.splice(index, 1);
    }
  } else if (seat.classList.contains("available")) {
    // Toggle seat selection
    seat.classList.toggle("selected");
    if (seat.classList.contains("selected")) {
      selectedSeats.push(seatNumber);
    } else {
      var index = selectedSeats.indexOf(seatNumber);
      if (index !== -1) {
        selectedSeats.splice(index, 1);
      }
    }
  }

  updateBookingSummary();
}


function updateBookingSummary() {
  var totalSeatsBooked = selectedSeats.length;
  var totalPrice = totalSeatsBooked * 10; 
  document.getElementById("booking-summary").innerHTML =
    "Total Seats Booked: " + totalSeatsBooked + "<br>" +
    "Total Price: $" + totalPrice;
}

function validateForm() {
  var errorMessage = document.getElementById("error-message");
  if (selectedSeats.length === 0) {
    errorMessage.innerText = "Please select at least one seat.";
    return false;
  }
  errorMessage.innerText = "";
  return true;
}


function updateTimer() {
  var showTime = new Date("2023-05-09T19:30:00"); 

  var timerElement = document.getElementById("timer");

  
  var timerInterval = setInterval(function() {
    var currentTime = new Date().getTime();
    var timeDifference = showTime - currentTime;

    
    var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    
    timerElement.innerHTML = "Next Show starts in: " + hours + "h " + minutes + "m " + seconds + "s";

    
    if (timeDifference < 0) {
      clearInterval(timerInterval);
      timerElement.innerHTML = "The show is starting now!";
    }
  }, 1000); 
}


var movieSelection = document.getElementById("movie");
movieSelection.addEventListener("change", generateSeatingPlan);


generateSeatingPlan();


updateTimer();

