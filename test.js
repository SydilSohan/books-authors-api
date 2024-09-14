
async function Fetch() {
    const data = {
        name : "sohan",
        bio : "Very good boy capable of goodness",
        birthdate: '1948-09-20T00:00:00.000Z'
    }
    const res = await fetch("http://localhost:3000/api/books/?size=50", {
        method : "GET",   
    })
    console.log( await res.json())
}
Fetch()