const mobileNavBtn = document.getElementById("mobileNavBtn");

mobileNavBtn.addEventListener("click", (e) => {
    const navWrapper = mobileNavBtn.parentElement;
    navWrapper.classList.toggle("open")

});


