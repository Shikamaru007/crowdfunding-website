const mobileNavBtn = document.getElementById("mobileNavBtn");
const radioInputs = document.querySelectorAll("input[type='radio']");
const form = document.getElementById("form");
const closeModal = document.querySelector(".close-modal");
const projectModal = document.querySelector(".project-modal");

mobileNavBtn.addEventListener("click", (e) => {
    const navWrapper = mobileNavBtn.parentElement;
    navWrapper.classList.toggle("open")

});

radioInputs.forEach((radio) => {
    
    radio.addEventListener("change", (e) => {
        radioInputs.forEach((radio) => {
            radio.closest("label").classList.remove("selected-card");
           
        });

        const label = e.target.closest("label");
        const bottom = label.querySelector(".bottom");

        label.classList.add("selected-card");
        bottom.style.height = `${bottom.scrollHeight}px`;
        
     
       
    });
    
});

closeModal.addEventListener("click", () => {
    document.body.classList.remove("project-modal-open");
})


