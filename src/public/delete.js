const formDelete = document.getElementById('formDelete');
const inputBid = document.getElementsByName('bid')[0];

formDelete.addEventListener('submit', async (event) => {
  event.preventDefault();

  const bid = inputBid.value;

  fetch(`/api/delete`, {
    method: 'POST',
    body: JSON.stringify(bid),
    headers: {
        'Content-Type': 'application/json'
    }
  })
})