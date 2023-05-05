




export function renderNav() {

    const links = document.querySelectorAll(".nav__li");

    links.forEach(item => {
        console.log(item);
        item.addEventListener("click", classModifierOnClick)
    });

};


const classModifierOnClick = function (e) {
    e.preventDefault();

    // console.log(hrefLink);
    document.querySelectorAll(".nav__li").forEach(link => {
        console.log(link);
        link.classList.remove("nav__li--select");
    });

    // console.log(e.target);
    // razClassNav();

    const hrefLink = e.target.getAttribute("href");
    window.location.href = hrefLink;
    this.classList.add("nav__li--select");
};

