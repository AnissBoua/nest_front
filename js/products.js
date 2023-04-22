async function getProducts(url) {
    // send token in the header
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }

    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    // intercept if token is expired
    // refresh token
    return fetch(url, 
    {
        headers: headers
    }
    )
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let products = document.getElementById('products');
        data.forEach(product => {

            let productDiv = document.createElement('div');
            // use tailwind classes, style for each product (pop, anime, manga, etc.) dark theme
            productDiv.classList.add('bg-gray-800', 'shadow-md', 'rounded-md', 'p-4', 'm-4', 'w-80', 'flex', 'flex-col', 'justify-between', 'h-96', 'hover:shadow-lg', 'hover:scale-105', 'transition', 'duration-300', 'ease-in-out');
            // style elements (img, p, h2) with tailwind classes
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2><a href="product.html?product=${product.id}">${product.name}</a></h2>
                <p>${product.description}</p>
                <p class="price">${product.price} &euro;</p>
            `;
            products.appendChild(productDiv);

            let img = productDiv.querySelector('img');
            img.classList.add('w-full', 'h-64', 'object-cover', 'object-top');

            let h2 = productDiv.querySelector('h2');
            h2.classList.add('text-xl', 'font-bold', 'mt-4');

            let p = productDiv.querySelector('p');
            p.classList.add('text-sm', 'mt-2');
            
            let price = productDiv.querySelector('.price');
            price.classList.add('text-xl', 'font-bold', 'text-indigo-500', 'text-right');
        });
    }).catch(error => {
        // try to refresh token
        // if not possible, redirect to login

        // get refresh token
        const refreshToken = localStorage.getItem('refresh_token');
        const token = localStorage.getItem('token');
        if (!refreshToken) {
            window.location.href = 'login.html';
        }

        fetch('http://localhost:3000/auth/refreshtoken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                access_token: token,
                refresh_token: refreshToken
            })
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            window.location.reload();
        }).catch(error => {
            console.log(error);
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            window.location.href = 'login.html';
        });
    });
}

async function getSingleProduct(url){
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let product = document.getElementById('product');
        let productDiv = document.createElement('div');
        // use tailwind classes, style like amazon product page dark theme
        productDiv.classList.add('flex', 'my-20')


        // style elements (img, p, h2) with tailwind classes
        productDiv.innerHTML = `
            <img src="${data.image}" alt="${data.name}">
            <div class="flex flex-col justify-between flex-1 items-between">
                <div>
                    <h2>${data.name}</h2>
                    <p>${data.description}</p>
                </div>
                <div class="flex justify-between">
                    <p class="price">${data.price} &euro;</p>
                    <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Add to cart</button>
                </div>
            </div>
        `;
        product.appendChild(productDiv);

        let img = productDiv.querySelector('img');
        img.classList.add('w-2/6', 'object-cover', 'object-top', 'rounded-lg', 'shadow-md', 'mr-10');

        let h2 = productDiv.querySelector('h2');
        h2.classList.add('text-xl', 'font-bold', 'mt-4');

        let p = productDiv.querySelector('p');
        p.classList.add('text-sm', 'mt-2');
        
        let price = productDiv.querySelector('.price');
        price.classList.add('text-xl', 'font-bold', 'text-indigo-500', 'text-right');
    }).catch(error => {} )
}

export { getProducts, getSingleProduct };