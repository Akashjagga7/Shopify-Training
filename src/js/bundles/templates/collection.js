import 'Styles/templates/collection.scss';

function selectedPriceValue() {
    let selectedProductFilterValue = document.getElementById('filterProduct').value;
    let productGrid = document.querySelectorAll('.product__gridItem');
    if (selectedProductFilterValue === 'all') {
        productGrid.forEach(product => {
            product.parentNode.classList.remove('hide-product');  
        })      
    } else {
        productGrid.forEach(product => {
            let dataPrice = Number(product.getAttribute('data-value'));
            if (dataPrice > Number(selectedProductFilterValue)  ) {
                product.parentNode.classList.add('hide-product');
            } else {
                product.parentNode.classList.remove('hide-product');
            }
        })
    }
}

let selectedProductFilter = document.getElementById('filterProduct');
selectedProductFilter.addEventListener("change", selectedPriceValue);

let select = document.querySelectorAll('.custom__select');
select.forEach(el => {
    el.addEventListener('click' , () => {
        let dropdowns = document.getElementsByClassName("custom__select");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if ( dropdowns[i] != el ) {
                openDropdown.classList.remove('active');
            }
        }
        el.classList.toggle("active");
    })
})

