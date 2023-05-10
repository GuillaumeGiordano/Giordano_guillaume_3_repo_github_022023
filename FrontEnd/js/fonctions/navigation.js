




export function renderNav() {

    const links = document.querySelectorAll(".nav__li");

    links.forEach(item => {
        // console.log(item);
        item.addEventListener("click", menuItemBold)
    });


    const pageIndex = document.querySelector("#introduction");
    console.log(pageIndex);



};


function menuItemBold(e) {
    // e.preventDefault();

    // Clear
    document.querySelectorAll(".nav__li").forEach(link => {
        link.classList.remove("nav__li--select");
    });


    const hrefLink = e.target.getAttribute("href");


    this.classList.add("nav__li--select");



    // window.location.href = hrefLink;


};

