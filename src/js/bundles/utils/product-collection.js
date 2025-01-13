export default () => {
  (function (productCollection) {
      "use strict";   

      const dom = {};
  
      const cacheDom = () => {
        dom.productRow = document.getElementById("row");
      }

      const fetchApi = () => {
          const url = window.location.pathname;
          fetch(url + '?view=json')
          .then(resp => resp.json())
          .then(data => {
              console.log(data);
              const prodData = data.products;
              console.log(prodData);
              prodData.forEach(prod => {
                const prodTitle = document.createElement('div');
                prodTitle.className = "col-3";
                const link = document.createElement('a');
                link.href = prod.url;
                const prodImg = document.createElement('img');
                prodImg.src = prod.images;
                const title = document.createElement('div');
                title.className = 'product__gridTitle';
                title.innerText = prod.title;
                const desc = document.createElement('div');
                desc.className = 'product__gridDescription';
                desc.innerText = prod.desc;
                dom.productRow.appendChild(prodTitle);
                prodTitle.appendChild(link);
                link.appendChild(prodImg);
                prodTitle.appendChild(title);
                prodTitle.appendChild(desc);
              });
          })
      }

      const bindUIActions = () => {
          fetchApi()
      };

      const init = () => {
          cacheDom();
          bindUIActions();
      };

      productCollection.init = init;

  })((window.productCollection = window.productCollection || {}));
};