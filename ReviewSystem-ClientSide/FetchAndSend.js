//structure of reviewData
const reviewData = {
  softwareID: "softwareID",
  rating: 5,
  comment: "this is an example review",
  userID: "user_67"
}

async function getReviews(softwareID) {
  try {
    const response = await fetch(`/server_api/reviews/softwareID`);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    
    const reviews = await response.json();
    displayReviews(reviews); 
  } catch (error) {
    console.error('Error loading reviews:', error);
  }
}

async function submitReview(reviewData) {
  const response = await fetch('/server_api/reviewSubmission', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData)
  });
  return response.json();
}