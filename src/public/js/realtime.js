const socket=io();

const productForm=document.getElementById('productForm');
const productList=document.getElementById('productList');

productForm.addEventListener('submit', async(e)=>{
    e.preventDefault();
    
    const title=document.getElementById('title').value;
    const price=document.getElementById('price').value;

    await fetch('/api/product',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, price})
    });

    productForm.reset();
});

socket.on('updateProducts', (products)=>{
    productList.innerHTML='';
    products.forEach(p=>{
        productList.innerHTML+=`
        <li>
            ${p.title}-$${p.price}
            <button onclick="deleteProduct('${p.id}')">Eliminar</button>
        </li>`;        
    });
});

async function deleteProduct(id){
    await fetch(`/api/product/${id}`,{
        method: 'DELETE'
    });    
}