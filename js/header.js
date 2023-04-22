let categories = document.getElementById('categories');
let categoriesDropdown = document.getElementById('categories-dromdown');
categoriesDropdown.addEventListener('click', () => {
    categories.classList.toggle('hidden');
})

const token = localStorage.getItem('token');

if (token) {
    let login = document.getElementById('login');
    login.classList.add('hidden');

    let logout = document.getElementById('logout');
    logout.classList.remove('hidden');

    logout.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        window.location.href = 'index.html';
    })

    let register = document.getElementById('register');
    register.classList.add('hidden');
}

// get the categories from the backend
fetch('http://localhost:3000/categories')
.then(response => response.json())
.then((data) => {
    console.log(data);
    // fill the dropdown with categories
    let categories = document.getElementById('categories');
    // style with tailwind classes
    categories.classList.add('hidden');
    categories.classList.add('absolute');
    categories.classList.add('bg-white');
    categories.classList.add('border');
    categories.classList.add('border-gray-300');
    categories.classList.add('rounded');
    categories.classList.add('p-2');
    categories.classList.add('mt-2');
    categories.classList.add('shadow');
    categories.classList.add('w-48');
    categories.classList.add('z-10');

    
    data.forEach(category => {
        let categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <a href="category.html?category=${category.id}" class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm">${category.name}</a>
        `;
        categories.appendChild(categoryDiv);
    })
})