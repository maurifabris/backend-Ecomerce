
//form to fetch data 


const form = document.getElementById('products')

const formData = new FormData(form);
const data = {};
for (let [key, value] of formData.entries()) {
    data[key] = value;
}
fetch('/api/addBook', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
})
