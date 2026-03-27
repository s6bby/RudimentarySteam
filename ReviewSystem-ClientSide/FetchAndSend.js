//structure of reviewData
const reviewData = {
  softwareID: "softwareID",
  userID: "user_67",
  date: "02/20/2026",
  rating: 5,
  comment: "this is an example review",
}

const stars = document.querySelectorAll('.star');

stars.forEach(star => {
  star.addEventListener('click', (e) => {
    // Get the star number from the data-value attribute
    const starRating = parseInt(e.target.getAttribute('data-value'));

    stars.forEach(s => {
      if (s.getAttribute('data-value') <= starRating) {
        s.classList.add('active');
    } else {
      s.classList.remove('active');
    }
  });
    console.log(`User clicked: ${starRating} stars`);

    showSpecificStar(starRating, allReviews);
  });
});

const clearBtn = document.querySelector('#clear-filter');

clearBtn.addEventListener('click', () => {
  stars.forEach(s => s.classList.remove('active'));

  displayReviews(allReviews);
  
  console.log("Filters cleared. Showing all reviews.");
});

let allReviews = []; 

async function getReviews(softwareID) {
  try {
    const response = await fetch(`/server_api/reviews/${softwareID}`);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    
    allReviews = await response.json();
    displayReviews(allReviews);
  } catch (error) {
    console.error('Failed to grab reviews:', error);
  }
}

getReviews("softwareID")

async function submitReview(reviewData) {
  const response = await fetch('/server_api/reviewSubmission', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData)
  });
  return response.json();
}

function showSpecificStar(starRating, allReviews) {
  const filtered = allReviews
    .filter(review => review.rating === starRating)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

    displayReviews(filtered);
}

function displayReviews(reviews) {
  const container = document.querySelector('#reviews-container');
  // Clear current list
  container.innerHTML = ''; 

  // Check if there are reviews to show
  if (reviews.length === 0) {
    container.innerHTML = '<p>No reviews found for this rating.</p>';
    return;
  }

  // Loop through & add the reviews to the container
  reviews.forEach(review => {
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review-card';
    reviewElement.innerHTML = `
      <h3>${review.rating} Stars</h3>
      <p>${review.comment}</p>
      <small>Posted on: ${review.date}</small>
    `;
    container.appendChild(reviewElement);
  });
}