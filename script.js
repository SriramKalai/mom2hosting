let products; 
let filterobject;
let mobiledata;
let likedata ;
const productCard = document.querySelector('.products');
const categoryList = document.querySelector('.category-list');
// const productCard_mobile=document.querySelector('.productsmobile')

// skeleton
const allSkeleton = document.querySelectorAll('.brand-sel')

window.addEventListener('load', function() {
  allSkeleton.forEach(item=> {
    item.classList.remove('brand-sel')
  })
})


document.addEventListener("DOMContentLoaded", function() {
  // fetchAllData()
  likefetchData();
  mobilefetchData();
  fetchData();
});






function fetchData() {
  let uri = "https://crazy-sun-hat-cod.cyclic.app/products";
  fetch(uri) 
    .then(response => response.json())
    .then(data => {
      products = data; 
      filterobject=productfilter(arr,perpage,pageNumber);
      listView(filterobject);
      totalitem();
      console.log(products)
      console.log(products["like"])
  
      // console.log(products.products)
      mobile();
      like();

    })
    .catch(error => {
      console.error('Error fetching JSON data:', error);
    });
}

// document.addEventListener("DOMContentLoaded", fetchData);

// mobile header
function mobilefetchData() {
  let uri = "https://crazy-sun-hat-cod.cyclic.app/mobile";
  fetch(uri) 
    .then(response => response.json())
    .then(data => {
      mobiledata = data; 
    })
    .catch(error => {
      console.error('Error fetching JSON data:', error);
    });
}
// document.addEventListener("DOMContentLoaded", mobilefetchData);

// like product
function likefetchData() {
  let uri = "https://crazy-sun-hat-cod.cyclic.app/like";
  fetch(uri) 
    .then(response => response.json())
    .then(data => {
      likedata = data; 
      console.log(likedata);
    })
    .catch(error => {
      console.error('Error fetching JSON data:', error);
    });
}
// document.addEventListener("DOMContentLoaded", likefetchData);


// all fecth all one
// function fetchData(url) {
//   return fetch(url)
//     .then(response => response.json())
//     .catch(error => console.log('Error:', error));
// }


// function fetchAllData() {
//   const urls = [
//    'https://crazy-sun-hat-cod.cyclic.app/like',
//    'https://crazy-sun-hat-cod.cyclic.app/mobile',
//    'https://crazy-sun-hat-cod.cyclic.app/products'
//   ];

//   const promises = urls.map(url => fetchData(url));

//   // Use Promise.all() to handle multiple asynchronous requests
//     Promise.all(promises)
//     .then(data => {

//       // Store the fetched data in separate variables
//       likedata = data[0];
//       mobiledata = data[1];
//       products = data[2];

//     });
// }


















// Call the function to fetch the JSON data
// fetchData();

function totalitem(){
  const total=document.querySelector(".totalitems")
  const productlen=products.length;
  // console.log(productlen)
  total.innerHTML=`${productlen}`;
}





let arr={
  brand:[],
  feature:[],
  condition:[],
  rating:[],
  price:[0,10000],
  verified:[],
  featured:[],
  manufacturers:[],
  type:[]
}

let perpage =6;
let pageNumber=1;


function productfilter(filterObj,perPage, pageNumber) {
  const filteredProducts = [];
  const minPrice = filterObj.price[0]; 
  const maxPrice = filterObj.price[1]; 
  const currentPage = pageNumber || 1;


  for (const product of products) {
    // console.log(product)
    const typematch=filterObj.type.length ===0 || filterObj.type.includes(product.type)
    const brandMatch = filterObj.brand.length === 0 || filterObj.brand.includes(product.Brand);
    const manumatch=filterObj.manufacturers.length===0 || filterObj.manufacturers.includes(product.manufacturers)
    const verifiedMatch = filterObj.verified.length === 0 || filterObj.verified.includes(product.verified);
    const featuredmatch=filterObj.featured.length===0 || filterObj.featured.includes(product.featured);
    // console.log(filterObj.brand,product.Brand);
    const featureMatch = filterObj.feature.length === 0 || product.feature.some(function(feature) {
    return filterObj.feature.includes(feature);  });
    const conditionMatch = filterObj.condition.length === 0 || filterObj.condition.includes(product.condition);
    const ratingMatch = filterObj.rating.length === 0 || filterObj.rating.includes(product.rating);
    const price = parseInt(product.price.replace('$', '')); 
    const priceMatch = minPrice <= price && price <= maxPrice; 
    // console.log(priceMatch);
    // console.log(brandMatch,featureMatch,conditionMatch,ratingMatch);
    firstpage();
    // renderItems();
    
  if(brandMatch && featureMatch && conditionMatch && ratingMatch&&priceMatch &&verifiedMatch &&featuredmatch && manumatch &&typematch){
    filteredProducts.push(product);
    // console.log(product)
  }
  }

  
  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const slicedProducts = filteredProducts.slice(start, end);
  // console.log(slicedProducts);
  const result = {
    products: [],
    pageNumbers: []
  };

  for (const product of slicedProducts) {
    result.products.push(product);
  }

  for (let i = 1; i <= totalPages; i++) {
    result.pageNumbers.push(i);
  }
  // console.log(result);
  createPageNumbers(result.pageNumbers.length);

  // return filteredProducts;
  return result;
  

  
  
};

// console.log(filteredProducts);
// star

function star(rating,id) {
    const arr=["one","two","three","four","five"]
    for (let i = 0; i < rating; i++) {
        var element = document.querySelector(`#${arr[i]}${id}`);
        element.classList.remove("emptystar")
        element.classList.add("checked");
        }
 }



// window.addEventListener('DOMContentLoaded', renderProduct);

// list view of the product
function listView(filterobject){
  const productCard = document.querySelector('.products');
  productCard.classList.remove("productgird");
  productCard.classList.add("mt-[-25px]");
  productCard.classList.remove("mt-20px]");


  flexproduct(filterobject);

}

// grid view of the product

function gridView(){
  // perpage=9;
  filterobject=productfilter(arr,perpage,pageNumber);
  const productCard = document.querySelector('.products');
  productCard.classList.add("productgird");
  productCard.classList.remove("mt-[-25px]");
  productCard.classList.add("mt-20px]");

  const active=document.querySelector(".listview");
  active.classList.remove("active");
  
  
  

function gridproduct(filterobject){

  let template = ''; 

  filterobject.products.forEach(product => {
    template += `
    <div class="flex m-w-295 w-full  m-h-405 h-full bg-white flex-col border-[1px] rounded-md border-[#DEE2E7] cursor-pointer">
      <div class="flex justify-center lg:block">
        <div class="flex w-[130px] h-[130px]  md:w-[180px] lg:w-230 md:h-230 justify-center lg:pl-[50px] lg:pr-0 lg:pt-[2rem] lg:pb-[0px]">
          <img src="${product.image_url}" alt="${product.product_name}">
        </div>
      </div>
      <hr class="md:mt-[35px] md:mb-[31px]">
        <div class="flex md:mt-[-15px] md:ml-[-4px] justify-around md:justify-start lg:justify-between lg:pl-[20px] lg:pb-[20px] lg:pr-[20px]">
              <div class="flex flex-col md:ml-5">
                <div class="flex">             
                    <p class="font-bold text-[16px] md:text-[18px]  font-inter">${product.price}</p>
                    <del class="ml-[8px] text-[16px] pt-0.5 font-inter text-[#8B96A5]">${product.discount}</del>
                </div>
                <div class="flex">
                      <div class="star">
                          <span class="fa fa-star emptystar" id="one${product.product_id}"></span>
                          <span class="fa fa-star emptystar" id="two${product.product_id}"></span>
                          <span class="fa fa-star emptystar" id="three${product.product_id}"></span>
                          <span class="fa fa-star emptystar" id="four${product.product_id}"></span>
                          <span class="fa fa-star emptystar" id="five${product.product_id}"></span>
                      </div>
                      <p class="text-[16px] text-rating-color ml-4 font-inter">${product.rating}</p>
                </div>
                <div class="mt-[4px] lg:mt-3">
                  <p class="text-[16px] text-[#606060] font-inter">${product.product_name}</p>
                </div>
              </div>
              <div class="bg-[#FFFFFF]  hidden lg:flex">
                  <div class="button one inactive mobile button--secondary  h-fit drop-shadow-xl  hidden lg:flex justify-center items-center border-[2px] border-[#DEE2E7]" onclick="blueheartbutton(${product.product_id})" id="${product.product_id}button">
                      <div class="btn__effect">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.5 0.824951C12.76 0.824951 11.09 1.63495 10 2.91495C8.91 1.63495 7.24 0.824951 5.5 0.824951C2.42 0.824951 0 3.24495 0 6.32495C0 10.105 3.4 13.185 8.55 17.865L10 19.175L11.45 17.855C16.6 13.185 20 10.105 20 6.32495C20 3.24495 17.58 0.824951 14.5 0.824951ZM10.1 16.375L10 16.475L9.9 16.375C5.14 12.065 2 9.21495 2 6.32495C2 4.32495 3.5 2.82495 5.5 2.82495C7.04 2.82495 8.54 3.81495 9.07 5.18495H10.94C11.46 3.81495 12.96 2.82495 14.5 2.82495C16.5 2.82495 18 4.32495 18 6.32495C18 9.21495 14.86 12.065 10.1 16.375Z" fill="#0D6EFD"/>
                          </svg>
  
                          <svg class="heart-full icon-svg icon-svg--size-4 icon-svg--color-blue" viewBox="0 0 19.2 18.5" aria-hidden="true" focusable="false"><path d="M9.66 18.48a4.23 4.23 0 0 1-2.89-1.22C.29 10.44-.12 7.79.02 5.67.21 2.87 1.95.03 5.42.01c1.61-.07 3.16.57 4.25 1.76A5.07 5.07 0 0 1 13.6 0c2.88 0 5.43 2.66 5.59 5.74.2 4.37-6.09 10.79-6.8 11.5-.71.77-1.7 1.21-2.74 1.23z"></path></svg>
                      </div>
                  </div>
              </div> 

        </div>

    </div>                
    
    `; 

});
lastpage();

productCard.innerHTML = template;
filterobject.products.forEach(product => {
  // console.log(product.rating);
  star(product.rating,product.product_id);
});

}
gridproduct(filterobject);
}




// categories
const extractCategories = (products) => {
  const categories = [];
  products.forEach(product => {
    product.category.forEach(category => {
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });
  });
  return categories;
};

const renderCategories = (categories, limit) => {
  let categoryTemplate = '';
  for (let i = 0; i < limit; i++) {
    categoryTemplate += `<li class="mb-[12px] font-inter text-[16px] cursor-pointer">${categories[i]}</li>`;
  }

  if (categories.length > limit) {
    categoryTemplate += `<li><a href="#" class="see-more text-textsee font-inter text-[16px]">See all</a></li>`;
  }

  categoryList.innerHTML = categoryTemplate;

  const seeMoreLink = categoryList.querySelector('.see-more');
  seeMoreLink.addEventListener('click', () => {
    renderAllCategories(categories);
  });
};

const renderAllCategories = (categories) => {
  let categoryTemplate = '';
  categories.forEach(category => {
    categoryTemplate += `<li class="mb-[12px] font-inter text-[16px] cursor-pointer">${category}</li>`;
  });

  categoryTemplate += `<li><a href="#" class="show-less text-textsee">Show Less</a></li>`;

  categoryList.innerHTML = categoryTemplate;

  const showLessLink = categoryList.querySelector('.show-less');
  showLessLink.addEventListener('click', () => {
    renderCategories(categories, 4);
  });
};





// Unique brands 
// new content
let selectedBrands = new Set();
document.addEventListener("DOMContentLoaded", function() {
  fetch('https://crazy-sun-hat-cod.cyclic.app/products')
    .then(response => response.json())
    .then(data => {
      const brandSet = new Set();
      data.forEach(product => {
        brandSet.add(product.Brand);
      });
      const skeletonLoader = document.querySelector('.skeleton-loader');
      const brandList = document.getElementById('brandList');
      const seeMoreBtn = document.getElementById('seeMoreBtn');
      const showLessBtn = document.getElementById('showLessBtn');
      const uniqueBrands = Array.from(brandSet);

      const limit = 5;
      let displayCount = limit;
      // const selectedBrands = new Set();
      const checkedStateMap = new Map(); 

      function displayBrands(startIndex, endIndex) {
        for (let i = startIndex; i < endIndex && i < uniqueBrands.length; i++) {
          const brand = uniqueBrands[i];
          const listItem = document.createElement('li');
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.value = brand;
          checkbox.ariaLabel="Search";
          checkbox.className="w-[20px] h-[20px] mr-[13px]  mb-[16px] rounded-[6px] cursor-pointer";

          checkbox.addEventListener('change', function() {
            if (this.checked) {
              selectedBrands.add(this.value);
            } else {
              selectedBrands.delete(this.value);
            }
          });
          checkbox.onclick = function() {
            checkbox.checked = !checkbox.checked; 
          };
          listItem.onclick = function() {
            checkbox.checked = !checkbox.checked; 
            if (arr.brand.indexOf(brand) !== -1){
              const a=arr.brand.indexOf(brand) 
              arr.brand.splice(a,1);
            }
            else{
              arr.brand.push(brand);
            }
            filterobject=productfilter(arr,perpage,pageNumber);

            const buttonstatus=document.querySelector(".listview");
            const value=buttonstatus.classList.contains("active");
            if (value){
            listView(filterobject);
            }
            else{
            gridView(filterobject);}
            renderItems();
            console.log(arr);
          };

          if (checkedStateMap.has(brand)) {
            checkbox.checked = checkedStateMap.get(brand);
          }

          listItem.appendChild(checkbox);
          // listItem.appendChild(document.createTextNode(brand));
          // brandList.appendChild(listItem);
          const brandText = document.createElement('span');
          brandText.className="mt-[-4px] font-inter text-[16px] cursor-pointer"
          brandText.textContent = brand;
          listItem.appendChild(brandText);

          listItem.className = 'flex items-start justify-start';

          brandList.appendChild(listItem);
                  }
      }

      function clearAdditionalBrands() {
        const listItems = brandList.querySelectorAll('li');
        for (let i = displayCount; i < listItems.length; i++) {
          listItems[i].style.display = 'none';
          const checkbox = listItems[i].querySelector('input[type="checkbox"]');
          const brand = checkbox.value;
          checkedStateMap.set(brand, checkbox.checked); 
        }
      }

      // function showAdditionalBrands() {
      //   const listItems = brandList.querySelectorAll('li');
      //   for (let i = displayCount; i < listItems.length; i++) {
      //     listItems[i].style.display = 'list-item';
      //   }
      // }

      function updateButtonVisibility() {
        if (displayCount < uniqueBrands.length) {
          seeMoreBtn.style.display = 'block';
        } else {
          seeMoreBtn.style.display = 'none';
        }

        if (displayCount > limit) {
          showLessBtn.style.display = 'block';
        } else {
          showLessBtn.style.display = 'none';
        }
      }

      function handleSeeMoreClick() {
        const startIndex = displayCount;
        displayCount += limit;
        displayBrands(startIndex, displayCount);
        updateButtonVisibility();
      }

      function handleShowLessClick() {
        displayCount = limit;
        clearAdditionalBrands();
        updateButtonVisibility();
      }

      seeMoreBtn.addEventListener('click', handleSeeMoreClick);
      showLessBtn.addEventListener('click', handleShowLessClick);

      // Initial display
      displayBrands(0, displayCount);
      updateButtonVisibility();
      skeletonLoader.classList.add('hidden');
    })
    .catch(error => console.error(error));
});







//  unique condition

let selectedcondition = new Set();
document.addEventListener("DOMContentLoaded", function() {
    fetch('https://crazy-sun-hat-cod.cyclic.app/products')
      .then(response => response.json())
      .then(data => {
        const conditionSet = new Set();
        data.forEach(product => {
          conditionSet.add(product.condition);
        });

        const skeletonLoader = document.querySelector('.skeleton-loader-con');
        const conditionList = document.getElementById('conditionList');
        const uniqueConditions = Array.from(conditionSet);
        uniqueConditions.sort();

        function displayConditions() {
          conditionList.innerHTML = ``  ;

          uniqueConditions.forEach(condition => {
            const listItem = document.createElement('li');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.ariaLabel="Search";
            radio.className = 'radio-circle';
            radio.name = 'condition';
            radio.value = condition;
            radio.className="w-[20px] h-[20px] mr-[12px]  mb-[16px] cursor-pointer";   

            if (this.checked) {
              selectedcondition.add(this.value);
            } else {
              selectedcondition.delete(this.value);
            }

            radio.onclick=function(){
              if (radio.checked==true){
                radio.checked=false;
              }else{
                radio.checked=true;
              }

            }

            listItem.onclick = function() {
              if (radio.checked==true){
                radio.checked=false;
              }else{
                radio.checked=true;
              }
              // console.log('Brand clicked:', condition);
              
              if (arr.condition.indexOf(condition) !== -1){
                const a=arr.condition.indexOf(condition) 
                arr.condition.splice(a,1);
              }
              else if("Any"==condition) {
                    arr.condition=[]
              }
              else{
                arr.condition.push(condition);
              }
              filterobject=productfilter(arr,perpage,pageNumber);

              const buttonstatus=document.querySelector(".listview");
              const value=buttonstatus.classList.contains("active");
              if (value){
              listView(filterobject);
              }
              else{
              gridView(filterobject);}
              renderItems();
              console.log(arr);
            };
            listItem.appendChild(radio);
            const conditionText = document.createElement('span');
            conditionText.className="mt-[-2px] font-inter text-[16px] cursor-pointer"
            conditionText.textContent = condition;
            listItem.appendChild(conditionText);

          listItem.className = 'flex items-start justify-start';
            // listItem.appendChild(document.createTextNode(condition));
            conditionList.appendChild(listItem);
          });
        }

        displayConditions();
        skeletonLoader.classList.add('hidden');
      })
      .catch(error => console.error(error));
  });







// button highlight it
var container = document.getElementById("btnContainer");
var btns = container.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}









    // flex product view 

    
  function  flexproduct(filterobject){
    let template = `
      <div class="all_product">
      ${filterobject.products.map(product => `
      <div class="card_outer ">    
      <div class="image_outer cursor-pointer">
        <img src="${product.image_url}" class="w-[92px] h-[82px] md:h-[auto] md:w-[210px] max-w-none"  alt="${product.product_name}"/>
      </div>
      <div class="detail cursor-pointer">
          <p class="text-[16px] text-menutext font-inter md:font-medium">${product.product_name}</p>
          <div class="price mt-[5px] md:mt-4">             
              <p class="font-semibold text-[16px] md:text-[20px] font-inter text-[#1C1C1C] mt-[-4px]">${product.price}</p>
              <del class="ml-[8px]  mt-[-4px] lg:mt-[0px] text-base font-inter text-[#8B96A5]">${product.discount}</del>
          </div>
          <div class="mt-[2px] md:flex">
              <div class="flex items-center">
                <div class="star ">
                    <span class="fa fa-star emptystar" id="one${product.product_id}"></span>
                    <span class="fa fa-star emptystar" id="two${product.product_id}"></span>
                    <span class="fa fa-star emptystar" id="three${product.product_id}"></span>
                    <span class="fa fa-star emptystar" id="four${product.product_id}"></span>
                    <span class="fa fa-star emptystar" id="five${product.product_id}"></span>
                </div>
                <p class="text-base text-rating-color ml-[8px] md:ml-4">${product.rating}</p>
                <img class="md:ml-3 md:mr-2.5 ml-[8px] mr-[8px]" src="Images/dot.svg" alt="dot"/>
                <p class="font-inter text-[#8B96A5] text-[13px] lg:text-[16px] items-center">${product.total_order}<span class="md:ml-1.5">orders</span></p>
                <img class="mr-2.5 ml-2.5 hidden md:block"src="Images/dot.svg" alt="dot" />
              </div>
                <p class="text-shipping font-inter text-[13px] md:text-[16px]">Free Shipping</p>
          </div>
          <div class="justify-center  mt-[8px] hidden md:flex">
              <p class="leading-6 font-inter text-[16px] tracking-[-0.2px]">${product.detail}</p>
          </div>
          <div class="mt-[6px] hidden md:block">
              <span class="text-detail font-inter text-[16px] font-semibold">View details</span>
          </div>
      </div>
      <div class="bg-white hidden lg:flex">
      <div class="button one inactive mobile button--secondary  h-fit drop-shadow-xl  hidden lg:flex justify-center items-center border-[2px] border-[#DEE2E7]" onclick="blueheartbutton(${product.product_id})" id="${product.product_id}button">
          <div class="btn__effect">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 0.824951C12.76 0.824951 11.09 1.63495 10 2.91495C8.91 1.63495 7.24 0.824951 5.5 0.824951C2.42 0.824951 0 3.24495 0 6.32495C0 10.105 3.4 13.185 8.55 17.865L10 19.175L11.45 17.855C16.6 13.185 20 10.105 20 6.32495C20 3.24495 17.58 0.824951 14.5 0.824951ZM10.1 16.375L10 16.475L9.9 16.375C5.14 12.065 2 9.21495 2 6.32495C2 4.32495 3.5 2.82495 5.5 2.82495C7.04 2.82495 8.54 3.81495 9.07 5.18495H10.94C11.46 3.81495 12.96 2.82495 14.5 2.82495C16.5 2.82495 18 4.32495 18 6.32495C18 9.21495 14.86 12.065 10.1 16.375Z" fill="#0D6EFD"/>
              </svg>
  
              <svg class="heart-full icon-svg icon-svg--size-4 icon-svg--color-blue" viewBox="0 0 19.2 18.5" aria-hidden="true" focusable="false"><path d="M9.66 18.48a4.23 4.23 0 0 1-2.89-1.22C.29 10.44-.12 7.79.02 5.67.21 2.87 1.95.03 5.42.01c1.61-.07 3.16.57 4.25 1.76A5.07 5.07 0 0 1 13.6 0c2.88 0 5.43 2.66 5.59 5.74.2 4.37-6.09 10.79-6.8 11.5-.71.77-1.7 1.21-2.74 1.23z"></path></svg>
          </div>
      </div>
      </div>               
    </div>
      `).join('')}
      </div>           
    `; 
    lastpage();
    productCard.innerHTML = template;
    productCard_mobile=template;
    filterobject.products.forEach(product => {
      star(product.rating,product.product_id);
    const categories = extractCategories(products);
    renderCategories(categories, 4);
  });
  
  }





  // listing unique features
  
  let selectedfeature = new Set();
  document.addEventListener("DOMContentLoaded", function() {
    fetch('https://crazy-sun-hat-cod.cyclic.app/products')
      .then(response => response.json())
      .then(data => {
        const FeatureSet = [];
        data.forEach(product => {
          product.feature.forEach(feature=>{
              if(!FeatureSet.includes(feature)){
                FeatureSet.push(feature);
                // console.log(feature);
              }
          });          
        });
        const skeletonLoader = document.querySelector('.skeleton-loader-fea');
        const featureList = document.getElementById('FeatureList');
        const seeMoreBtn = document.getElementById('seeMoreBtnfea');
        const showLessBtn = document.getElementById('showLessBtnfea');
        const uniqueBrands = Array.from(FeatureSet);
  
        const limit = 5;
        let displayCount = limit;
        // const selectedfeature = new Set();
        const checkedStateMap = new Map();
  
        function displayBrands(startIndex, endIndex) {
          for (let i = startIndex; i < endIndex && i < uniqueBrands.length; i++) {
            const brand = uniqueBrands[i];
            const listItem = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.ariaLabel="Search";
            checkbox.value = brand;
            checkbox.className="w-[20px] h-[20px] mr-[13px] ml-[4px] mb-[16px] rounded-[5px] cursor-pointer";
      
            checkbox.addEventListener('change', function() {
              if (this.checked) {
                selectedfeature.add(this.value);
              } else {
                selectedfeature.delete(this.value);
              }
            });
            checkbox.onclick = function() {
              checkbox.checked = !checkbox.checked; 
            };
            listItem.onclick = function() {
              checkbox.checked = !checkbox.checked; 
              if (arr.feature.indexOf(brand) !== -1){
                const a=arr.feature.indexOf(brand) 
                arr.feature.splice(a,1);
              }
              else{
                arr.feature.push(brand);
              }
              lastpage();
              filterobject=productfilter(arr,perpage,pageNumber);
  
              const buttonstatus=document.querySelector(".listview");
              const value=buttonstatus.classList.contains("active");
              if (value){
              listView(filterobject);
              }
              else{
              gridView(filterobject);}
              renderItems();
              console.log(arr);
            };
  
            if (checkedStateMap.has(brand)) {
              checkbox.checked = checkedStateMap.get(brand);
            }
  
            listItem.appendChild(checkbox);
            const featureText = document.createElement('span');
            featureText.className="mt-[-3px] font-inter text-[16px] cursor-pointer"
            featureText.textContent = brand;
            listItem.appendChild(featureText);
  
            listItem.className = 'flex items-start justify-start';
            featureList.appendChild(listItem);
          }
        }
  
        function clearAdditionalBrands() {
          const listItems = featureList.querySelectorAll('li');
          for (let i = displayCount; i < listItems.length; i++) {
            listItems[i].style.display = 'none';
            const checkbox = listItems[i].querySelector('input[type="checkbox"]');
            const brand = checkbox.value;
            checkedStateMap.set(brand, checkbox.checked); // Store the checked state
          }
        }
  
        // function showAdditionalBrands() {
        //   const listItems = featureList.querySelectorAll('li');
        //   for (let i = displayCount; i < listItems.length; i++) {
        //     listItems[i].style.display = 'list-item';
        //   }
        // }
  
        function updateButtonVisibility() {
          if (displayCount < uniqueBrands.length) {
            seeMoreBtn.style.display = 'block';
          } else {
            seeMoreBtn.style.display = 'none';
          }
  
          if (displayCount > limit) {
            showLessBtn.style.display = 'block';
          } else {
            showLessBtn.style.display = 'none';
          }
        }
  
        function handleSeeMoreClick() {
          const startIndex = displayCount;
          displayCount += limit;
          displayBrands(startIndex, displayCount);
          updateButtonVisibility();
        }
  
        function handleShowLessClick() {
          displayCount = limit;
          clearAdditionalBrands();
          updateButtonVisibility();
        }
  
        seeMoreBtn.addEventListener('click', handleSeeMoreClick);
        showLessBtn.addEventListener('click', handleShowLessClick);
  
        // Initial display
        displayBrands(0, displayCount);
        updateButtonVisibility();
        skeletonLoader.classList.add('hidden');
      })
      .catch(error => console.error(error));
  });

  




    // show and hide content for condition 

    function hidecontent(){
      const condition =document.getElementById('conditionList');
      condition.classList.add("hidden");

      const downbtn =document.querySelector(".downbtn");
      downbtn.classList.remove("hidden");

      const upbtn =document.querySelector(".upbtn");
      upbtn.classList.add("hidden");
    }


    function showcontent(){
      const condition =document.getElementById('conditionList');
      condition.classList.remove("hidden");

      const downbtn =document.querySelector(".downbtn");
      downbtn.classList.add("hidden");

      const upbtn =document.querySelector(".upbtn");
      upbtn.classList.remove("hidden");
    }


    // show and hide content for rating
    
    function ratinghidecontent(){
      const condition =document.querySelector('.star');
      condition.classList.add("hidden");

      const downbtn =document.querySelector(".ratingdownbtn");
      downbtn.classList.remove("hidden");

      const upbtn =document.querySelector(".ratingupbtn");
      upbtn.classList.add("hidden");
    }


    function ratingshowcontent(){
      const condition =document.querySelector('.star');
      condition.classList.remove("hidden");

      const downbtn =document.querySelector(".ratingdownbtn");
      downbtn.classList.add("hidden");

      const upbtn =document.querySelector(".ratingupbtn");
      upbtn.classList.remove("hidden");
    }


    // show and hide content for feature
    
    function featurehidecontent(){
      const condition =document.querySelector('.feature');
      condition.classList.add("hidden");

      const downbtn =document.querySelector(".featuredownbtn");
      downbtn.classList.remove("hidden");

      const upbtn =document.querySelector(".featureupbtn");
      upbtn.classList.add("hidden");
    }


    function featureshowcontent(){
      const condition =document.querySelector('.feature');
      condition.classList.remove("hidden");

      const downbtn =document.querySelector(".featuredownbtn");
      downbtn.classList.add("hidden");

      const upbtn =document.querySelector(".featureupbtn");
      upbtn.classList.remove("hidden");
    }



     // show and hide content for BRANDS
    
     function brandhidecontent(){
      const condition =document.querySelector('.brands');
      condition.classList.add("hidden");

      const downbtn =document.querySelector(".branddownbtn");
      downbtn.classList.remove("hidden");

      const upbtn =document.querySelector(".brandupbtn");
      upbtn.classList.add("hidden");
    }
    function brandshowcontent(){
      const condition =document.querySelector('.brands');
      condition.classList.remove("hidden");

      const downbtn =document.querySelector(".branddownbtn");
      downbtn.classList.add("hidden");

      const upbtn =document.querySelector(".brandupbtn");
      upbtn.classList.remove("hidden");
    }

 // show and hide content for CATEGORY
    
 function cathidecontent(){
  const condition =document.querySelector('.category');
  condition.classList.add("hidden");

  const downbtn =document.querySelector(".catdownbtn");
  downbtn.classList.remove("hidden");

  const upbtn =document.querySelector(".catupbtn");
  upbtn.classList.add("hidden");
}
function catshowcontent(){
  const condition =document.querySelector('.category');
  condition.classList.remove("hidden");

  const downbtn =document.querySelector(".catdownbtn");
  downbtn.classList.add("hidden");

  const upbtn =document.querySelector(".catupbtn");
  upbtn.classList.remove("hidden");
}


// show and hide content for price range
function pricehidecontent(){
  const condition =document.querySelector('.pricesilde');
  condition.classList.add("hidden");

  const downbtn =document.querySelector(".pricedownbtn");
  downbtn.classList.remove("hidden");

  const upbtn =document.querySelector(".priceupbtn");
  upbtn.classList.add("hidden");
}
function priceshowcontent(){
  const condition =document.querySelector('.pricesilde');
  condition.classList.remove("hidden");

  const downbtn =document.querySelector(".pricedownbtn");
  downbtn.classList.add("hidden");

  const upbtn =document.querySelector(".priceupbtn");
  upbtn.classList.remove("hidden");
}


// show and hide the manufacture
function manhidecontent(){
  const condition =document.querySelector('.manu');
  condition.classList.add("hidden");

  const downbtn =document.querySelector(".mandownbtn");
  downbtn.classList.remove("hidden");

  const upbtn =document.querySelector(".manupbtn");
  upbtn.classList.add("hidden");
}
function manshowcontent(){
  const condition =document.querySelector('.manu');
  condition.classList.remove("hidden");

  const downbtn =document.querySelector(".mandownbtn");
  downbtn.classList.add("hidden");

  const upbtn =document.querySelector(".manupbtn");
  upbtn.classList.remove("hidden");
} 

// starrating 


function buttonchange(x){
  let checkbox = document.getElementById(x);
    if (checkbox.checked==true){
      checkbox.checked=false;
    }else{
      checkbox.checked=true;
    }  
}
function starrating(x){  

  if (arr.rating.indexOf(x) !== -1){
    const a=arr.rating.indexOf(x) 
    arr.rating.splice(a,1);
  }
  else{
    arr.rating.push(x);
  }
  filterobject=productfilter(arr,perpage,pageNumber);

  const buttonstatus=document.querySelector(".listview");
  const value=buttonstatus.classList.contains("active");
  if (value){
  listView(filterobject);
  }
  else{
  gridView(filterobject);}
  renderItems();
  console.log(arr);

}





// price range slider
const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
range = document.querySelector(".slider .progress");
let priceGap = 100;

priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);
        
        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});



// apply button for price range
var applyButton = document.querySelector('.apply-button');

// Add a click event listener to the Apply button
applyButton.addEventListener('click', function() {
  // Get the current minimum and maximum values
  var minInput = document.querySelector('.input-min');
  var maxInput = document.querySelector('.input-max');
  
  arr.price = [minInput.value, maxInput.value];
  
  // Print the updated arr object in the console
  console.log(arr);
  lastpage();
  filterobject=productfilter(arr,perpage,pageNumber);
  
  const buttonstatus=document.querySelector(".listview");
  const value=buttonstatus.classList.contains("active");
  if (value){
  listView(filterobject);
  }
  else{
  gridView(filterobject);}

  console.log(arr);
  

});



// verified only
function verifyContent() {
  var checkbox = document.getElementById("verificationCheckbox");

  if (arr.verified.length==0){
    arr.verified.push("True");
  }
  else{
    arr.verified.pop();
  }
  lastpage();
  console.log(arr);
  filterobject=productfilter(arr,perpage,pageNumber);
  
  const buttonstatus=document.querySelector(".listview");
  const value=buttonstatus.classList.contains("active");
  if (value){
  listView(filterobject);
  }
  else{
  gridView(filterobject);}

  console.log(arr);
  
}










// page number
// Function to create page number elements
function createPageNumbers(totalPages) {
  const pageNumbersContainer = document.getElementById('pageNumbers');
  pageNumbersContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const pageNumberElement = document.createElement('div');
    pageNumberElement.textContent = i;
    pageNumberElement.classList.add('pageNumber');
    pageNumberElement.classList.add('font-inter');
    pageNumberElement.classList.add('text-[16px]');

   
    



    pageNumberElement.addEventListener('click', function(){
       pageNumber=i;
       filterProducts();
       lastpage();
       firstpage();
      });
    if(i==pageNumber){
      pageNumberElement.classList.add('pagebackground');
    }
    pageNumbersContainer.appendChild(pageNumberElement);
  }
}

// Function to handle page number click
function setPageNumber(pageNumber) {
  document.getElementById('pageNumber').value = pageNumber;
}


function filterProducts() {
  // const perPage = parseInt(document.getElementById('perPage').value);


  // const pageNumber = parseInt(document.getElementById('pageNumber').value);

  const filterobject = productfilter(arr, perpage, pageNumber);

  // Display the filtered products
  // const productListContainer = document.querySelector('.products');
  // productListContainer.innerHTML = '';

  // for (const product of result.products) {
  //   const productElement = document.createElement('div');
  //   productElement.textContent = product.name; 
  //   productListContainer.appendChild(productElement);
  // }

  const buttonstatus=document.querySelector(".listview");
  const value=buttonstatus.classList.contains("active");
  if (value){
  listView(filterobject);
  }
  else{
  gridView(filterobject);}
  //  page numbers
  createPageNumbers(filterobject.pageNumbers.length);
}





// feature and all operation

var dropdown = document.getElementById("feaDropdown");

  dropdown.addEventListener("change", function() {
    var selectedValue = dropdown.value;
    
    if (selectedValue === "all") {
      arr.featured.pop();
      console.log("All option selected");
    } else if (selectedValue === "featured") {
      arr.featured.push("True");
      console.log("Featured option selected");
    }
    filterobject=productfilter(arr,perpage,pageNumber);  
    const buttonstatus=document.querySelector(".listview");
    const value=buttonstatus.classList.contains("active");
    if (value){
    listView(filterobject);
    }
    else{
    gridView(filterobject);}
  });




  ///show limited item in the page [show 5, show 10, show 20]
  var limitperpage = document.getElementById("perpageproduct");

  limitperpage.addEventListener("change", function() {
    var selectedValue = limitperpage.value;
    
    if (selectedValue === "six") {
      perpage=6;
      console.log(perpage);
    } else if (selectedValue === "ten") {
      perpage=10;
      console.log(perpage);
    }else if (selectedValue === "twenty") {
      perpage=20;
      console.log(perpage);
    }else if (selectedValue === "fiften") {
      perpage=15;
      console.log(perpage);
    }
    lastpage();
    firstpage();
    filterobject=productfilter(arr,perpage,pageNumber);  
    const buttonstatus=document.querySelector(".listview");
    const value=buttonstatus.classList.contains("active");
    if (value){
    listView(filterobject);
    }
    else{
    gridView(filterobject);}
  });



  // right button for page changing

  var rightbutton =document.getElementById("rightpagebuttton")

  rightbutton.addEventListener("click",function(){
    // console.log(pageNumber);
    filterobject=productfilter(arr,perpage,pageNumber);
    const maxpage=  filterobject.pageNumbers.length
    console.log(maxpage);
    // pageNumber+=1;
    if (pageNumber< maxpage){
      pageNumber+=1;
    }
    lastpage();
    firstpage();
    filterobject=productfilter(arr,perpage,pageNumber);  
    const buttonstatus=document.querySelector(".listview");
    console.log(buttonstatus.classList)
    const value=buttonstatus.classList.contains("active");

    if (value){
    listView(filterobject);
    }
    else{
    gridView(filterobject);}
  })


  // left button for page changing

  var leftbutton =document.getElementById("leftpagebutton")

  leftbutton.addEventListener("click",function(){
    console.log(pageNumber);
    if (pageNumber>1){
      pageNumber-=1;
    }
    lastpage();
    firstpage();
    filterobject=productfilter(arr,perpage,pageNumber);  
    const buttonstatus=document.querySelector(".listview");
    const value=buttonstatus.classList.contains("active");
    if (value){
    listView(filterobject);
    }
    else{
    gridView(filterobject);}
  })


  // last page checker 
  function lastpage(){
    filterobject=productfilter(arr,perpage,pageNumber);
    const maxpage=  filterobject.pageNumbers.length
    if(pageNumber==maxpage){
      const active=document.querySelector(".activeright")
      const notactive=document.querySelector(".notactiverigth")
      active.classList.add("hidden")
      notactive.classList.remove("hidden")
    }else{
      const active=document.querySelector(".activeright")
      const notactive=document.querySelector(".notactiverigth")
      active.classList.remove("hidden")
      notactive.classList.add("hidden")
    }
  }



  //firstpage checker
  function firstpage(){
    if(pageNumber!=1){
      const active=document.querySelector(".activeleft")
      const notactive=document.querySelector(".notactiveleft")
      active.classList.remove("hidden")
      notactive.classList.add("hidden")
    }else{
      const active=document.querySelector(".activeleft")
      const notactive=document.querySelector(".notactiveleft")
      active.classList.add("hidden")
      notactive.classList.remove("hidden")

    }
  }




  // // blue heart on click
  // // var heart=document.getElementById("#blueheart");
  // //  heart.addEventListener("click",function(){

  //   function blueheart(){
  //   const hearnotactive=document.querySelector(".blueheartnotactive");
  //   const heartactive=document.querySelector(".blueheartactive");

  //   if (heartactive.classList.contains("hidden")){
  //     hearnotactive.classList.add("hidden");
  //     heartactive.classList.remove("hidden");
  //   }
  // }
  // //  })




  //unique manufacture

  let selectedmanu = new Set();
  document.addEventListener("DOMContentLoaded", function() {
    fetch('https://crazy-sun-hat-cod.cyclic.app/products')
      .then(response => response.json())
      .then(data => {
        const manuSet = new Set();
        data.forEach(product => {
          manuSet.add(product.manufacturers);
        });
  
        const manuList = document.getElementById('manuList');
        const seeMoreBtn = document.getElementById('manseeMoreBtn');
        const showLessBtn = document.getElementById('manshowLessBtn');
        const uniquemanu = Array.from(manuSet);
  
        const limit = 4;
        let displayCount = limit;
        
        const checkedStateMap = new Map(); 
  
        function displayBrands(startIndex, endIndex) {
          for (let i = startIndex; i < endIndex && i < uniquemanu.length; i++) {
            const brand = uniquemanu[i];
            const listItem = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = brand;
            checkbox.ariaLabel="Search";
            checkbox.className="w-[20px] h-[20px] mr-[13px]  mb-[16px] rounded-[6px] cursor-pointer";
            checkbox.addEventListener('change', function() {
              if (this.checked) {
                selectedmanu.add(this.value);
              } else {
                selectedmanu.delete(this.value);
              }
            });
            checkbox.onclick = function() {
              checkbox.checked = !checkbox.checked; 
            };
            listItem.onclick = function() {
              checkbox.checked = !checkbox.checked; 
              if (arr.manufacturers.indexOf(brand) !== -1){
                const a=arr.manufacturers.indexOf(brand) 
                arr.manufacturers.splice(a,1);
              }
              else{
                arr.manufacturers.push(brand);
                console.log(arr.manufacturers);
              }
              filterobject=productfilter(arr,perpage,pageNumber);
  
              const buttonstatus=document.querySelector(".listview");
              const value=buttonstatus.classList.contains("active");
              if (value){
              listView(filterobject);
              }
              else{
              gridView(filterobject);}
              renderItems();
              console.log(arr);
            };
  
            if (checkedStateMap.has(brand)) {
              checkbox.checked = checkedStateMap.get(brand);
            }
  
            listItem.appendChild(checkbox);
            const manuText = document.createElement('span');
            manuText.className="mt-[-4px] font-inter text-[16px] cursor-pointer"
            manuText.textContent = brand;
            listItem.appendChild(manuText);

          listItem.className = 'flex items-start justify-start';

            manuList.appendChild(listItem);
          }
        }
  
        function clearAdditionalBrands() {
          const listItems = manuList.querySelectorAll('li');
          for (let i = displayCount; i < listItems.length; i++) {
            listItems[i].style.display = 'none';
            const checkbox = listItems[i].querySelector('input[type="checkbox"]');
            const brand = checkbox.value;
            checkedStateMap.set(brand, checkbox.checked); 
          }
        }
  
        function showAdditionalBrands() {
          const listItems = manuList.querySelectorAll('li');
          for (let i = displayCount; i < listItems.length; i++) {
            listItems[i].style.display = 'list-item';
          }
        }
  
        function updateButtonVisibility() {
          if (displayCount < uniquemanu.length) {
            seeMoreBtn.style.display = 'block';
          } else {
            seeMoreBtn.style.display = 'none';
          }
  
          if (displayCount > limit) {
            showLessBtn.style.display = 'block';
          } else {
            showLessBtn.style.display = 'none';
          }
        }
  
        function handleSeeMoreClick() {
          const startIndex = displayCount;
          displayCount += limit;
          displayBrands(startIndex, displayCount);
          updateButtonVisibility();
        }
  
        function handleShowLessClick() {
          displayCount = limit;
          clearAdditionalBrands();
          updateButtonVisibility();
        }
  
        seeMoreBtn.addEventListener('click', handleSeeMoreClick);
        showLessBtn.addEventListener('click', handleShowLessClick);
  
        // Initial display
        displayBrands(0, displayCount);
        updateButtonVisibility();
      })
      .catch(error => console.error(error));
  });
   




  // buttons for filter
  const contentDiv = document.getElementById('content');

// ...

const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', () => {
  arr.brand = [];
  arr.feature=[];
  arr.manufacturers=[];
  arr.condition=[];
  arr.rating=[];
  branduncheckAllCheckboxes();  
  ratingcheckAllCheckboxes()
  featureuncheckAllCheckboxes()
  manucheckAllCheckboxes()
  renderItems();
});

function renderItems() {
  contentDiv.innerHTML = '';

  let hasContent = false; 

  for (const category in arr) {
    if (category !== 'price' && category !=='condition' && category !=="verified" && arr[category].length > 0 && category !=="featured" && category !=="type") {
      hasContent = true; 
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('flex', 'items-center', 'mb-0');

      arr[category].forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('flex', 'items-center', 'mr-2','border-2','border-blue-500','px-2','py-1','mt-[20px]','rounded-md' ,'font-inter','text-[16px]');

        const itemText = document.createElement('span');
        itemText.classList.add('mr-1');
        itemText.textContent = item;

        const crossButton = document.createElement('button');
        crossButton.classList.add('text-blue-500', 'font-bold','pl-[10px]','font-inter','w-[10px]' );
        crossButton.innerHTML = '&times;';
        crossButton.addEventListener('click', () => removeItem(category,item));

        itemDiv.appendChild(itemText);
        itemDiv.appendChild(crossButton);

        categoryDiv.appendChild(itemDiv);
      });

      contentDiv.appendChild(categoryDiv);
    }
    lastpage();
    filterobject=productfilter(arr,perpage,pageNumber);

    const buttonstatus=document.querySelector(".listview");
    const value=buttonstatus.classList.contains("active");
    if (value){
    listView(filterobject);
    }
    else{
    gridView(filterobject);}

    // console.log(arr);
  }

  if (hasContent) {
    clearButton.style.display = 'block';
  } else {
    clearButton.style.display = 'none';
  }
}

function removeItem(category, item) {
  const index = arr[category].indexOf(item);
  console.log(index)
  arr[category].splice(index, 1);
  console.log(item);
  selectedmanu.delete(item);
  selectedBrands.delete(item);
  selectedfeature.delete(item);
  selectedcondition.delete(item);

  if (category=="brand"){
  const brandcheckboxes = brandList.querySelectorAll('input[type="checkbox"]');
  brandcheckboxes.forEach((checkbox) => {
    // console.log(checkbox.value);
    if (checkbox.value === item) {
      checkbox.checked = false;
    }
    // console.log(item);
  });}
  if (category=="feature"){
  const featurecheck = FeatureList.querySelectorAll('input[type="checkbox"]');
  featurecheck.forEach((checkbox) => {
    if (checkbox.value === item) {
      checkbox.checked = false;
    }
  });
  }
  if (category=="manufacturers"){
    const manucheck = manuList.querySelectorAll('input[type="checkbox"]');
    manucheck.forEach((checkbox) => {
      if (checkbox.value === item) {
        checkbox.checked = false;
      }
    });
    }
    if (category=="rating"){
      buttonchange(`${item}`);
      }
  filtercountcheck()
  renderItems();
}



// all clear remove functinallity
function branduncheckAllCheckboxes() {
  const checkboxes = brandList.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}

function featureuncheckAllCheckboxes() {
  const checkboxes = FeatureList.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}

function manucheckAllCheckboxes() {
  const checkboxes = manuList.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}

function ratingcheckAllCheckboxes() {
  const rating=[5,4,3,2];
  for (let i=0 ; i<rating.length ; i++){
    const starhide=document.getElementById(rating[i])
    console.log(starhide.checked);
    if (starhide.checked==true){
      starhide.checked=false;
    }
  }
}




// mobile
const mobileButtonsContainer = document.getElementById("mobileButtons");

function mobile(){
  console.log(mobiledata[0]["header"])
// Iterate through the header array and create buttons
const skeletonLoader = document.querySelector('.skeleton-loader-title');

    mobiledata[0]["header"].forEach(item => {
    const button = document.createElement("button");
    button.textContent = item;
    button.value=item;
    button.classList.add("px-[16px]", "py-[6px]", "bg-[#EFF2F4]", "text-[#0D6EFD]", "rounded", "text-inter","text-[18px]" );
    // button.onclick=buttonfilter(item);
    button.addEventListener('click', () => buttonfilter(item));
    mobileButtonsContainer.appendChild(button);
});
skeletonLoader.classList.add('hidden');
}




// like container
function createProductCard(product) {
  const card = document.createElement("div");
  // card.classList.add("max-w-xs", "mr-4", "flex-shrink-0");
  card.innerHTML = `
    <div class="bg-white flex justify-center flex-col rounded-lg border-[2px] overflow-hidden border-[#DEE2E7] w-[150px]">
    <div class="flex justify-center pt-[20px]">
      <img src="${product.image_url}" alt="${product.product_name}" class="min-w-[112px] w-[80%]">
    </div>
      <div class="p-4 mt-[6px]">
        <p class="text-[#1C1C1C] text-[16px] font-inter">${product.price}</p>
        <p class="text-[13px] text-[#8B96A5] font-inter">${product.product_name}</p>
      </div>
    </div>
  `;
  return card;
}

// Populate product cards
const productContainer = document.getElementById("likeproductContainer");
function like(){
  const skeletonLoader = document.querySelector('.skeleton-loader-like');
  skeletonLoader.classList.add('hidden');
  likedata.forEach(product => {
    const card = createProductCard(product);
    productContainer.appendChild(card);
  });}



  // blue heart button
function blueheartbutton(x) {
    const buttonblue=document.getElementById(`${x}button`)
    if ( buttonblue.classList.contains( "active" ) ) {
      buttonblue.classList.add("deactivate")
    }
    buttonblue.classList.toggle("active");
    buttonblue.classList.toggle("inactive");

  };



  // flag
  // const options = document.querySelectorAll('#select-color .option input');

  // options.forEach(option => {
  //   option.addEventListener('change', () => {
  //     document.getElementById('select-color').classList.toggle('open');
  //   });
  // });



  // Sort the items
function sortitems(){
  const sortnew=document.querySelector(".sortnew")
  const sortold=document.querySelector(".sortold")
  if (sortnew.classList.contains("hidden")){
    products.reverse();
    filterobject=productfilter(arr,perpage,pageNumber);
    sortnew.classList.remove("hidden")
    sortold.classList.add("hidden")
    const buttonstatus=document.querySelector(".listview");
    const value=buttonstatus.classList.contains("active");
    if (value){
    listView(filterobject);
    }
    else{
    gridView(filterobject);}
  }

  else{
    products.reverse();
    filterobject=productfilter(arr,perpage,pageNumber);
    sortnew.classList.add("hidden")
    sortold.classList.remove("hidden")
    console.log(sortnew.classList,sortold.classList)
    const buttonstatus=document.querySelector(".listview");
    const value=buttonstatus.classList.contains("active");
    if (value){
    listView(filterobject);
    }
    else{
    gridView(filterobject);}
  }

}




// show left side container
let filtercount=0;
function showleftside(){
  const leftside=document.querySelector(".leftside")
  const producthide=document.querySelector(".productcontainer")
  const likecontainer=document.querySelector(".likecontainer")
   if (leftside.classList.contains("hidden")){
    leftside.classList.remove("hidden")
    producthide.classList.add("hidden")
    likecontainer.classList.add("hidden")
   }
   else{
    leftside.classList.add("hidden")
    producthide.classList.remove("hidden")
    likecontainer.classList.remove("hidden")
    filtercountcheck();
   }
}



// fillter count
function filtercountcheck(){
  filtercount=0;
    for (const property in arr) {
      console.log(property);
      if (property !== 'price' && property !=='condition' && property !=="verified" && arr[property].length > 0 && property !=="featured" && property !=="type"){
          const length = arr[property].length;
          filtercount+=length;
      }
    }
    console.log(filtercount)
    const filtershow=document.querySelector(".filtercount")
    filtershow.innerHTML=`Filter (${filtercount})`
}



//header filter
function buttonfilter(value){
  console.log(value);
  if (arr.type.length===0){
    arr.type.push(value);
  }
  else if(value=="ALL"){
    arr.type=["Tablets","Phones","Headphones","Camera","Laptop","Watch"];
  }
  else{
    arr.type=[];
    arr.type.push(value);
  }
  console.log(arr.type);
  filterobject=productfilter(arr,perpage,pageNumber);  
  const buttonstatus=document.querySelector(".listview");
  const valuehead=buttonstatus.classList.contains("active");
  if (valuehead){
  listView(filterobject);
  }
  else{
  gridView(filterobject);}
  renderItems();

}