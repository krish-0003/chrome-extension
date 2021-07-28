let s_for = document.getElementsByClassName("slider-for")[0];
let s_nav = document.getElementsByClassName("slider-nav")[0];
let result=` <div>
<img
    src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
    alt=""
/>
</div>
<div>
<img
    src="https://homepages.cae.wisc.edu/~ece533/images/serrano.png"
    alt=""
/>
</div>
<div>
<img
    src="https://homepages.cae.wisc.edu/~ece533/images/fruits.png"
    alt=""
/>
</div>
<div>
<img
    src="https://homepages.cae.wisc.edu/~ece533/images/fruits.png"
    alt=""
/>
</div>
<div>
<img
    src="https://homepages.cae.wisc.edu/~ece533/images/fruits.png"
    alt=""
/>
</div>`
s_for.insertAdjacentHTML("afterbegin", result);
s_nav.insertAdjacentHTML("afterbegin", result);
$(document).ready(function () {
    $(".slider-for").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: ".slider-nav",
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
    });
    $(".slider-nav").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".slider-for",
        dots: true,
        centerMode: true,
        focusOnSelect: true,
    });
});