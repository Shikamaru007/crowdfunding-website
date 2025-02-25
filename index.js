const mobileNavBtn = document.getElementById("mobileNavBtn");
const radioInputs = document.querySelectorAll("input[type='radio']");
const form = document.getElementById("form");
const closeModal = document.querySelector(".close-modal");
const projectModal = document.querySelector(".project-modal");
const bookmarkBtn = document.querySelector(".bookmark");
const backProjectBtn = document.querySelector(".back-project");
const selectRewardBtns = document.querySelectorAll(".select-reward");

mobileNavBtn.addEventListener("click", (e) => {
    const navWrapper = mobileNavBtn.parentElement;
    navWrapper.classList.toggle("open")

});

function selectRadio (selectedRadio){
    radioInputs.forEach((radio) => {
        radio.closest("label").classList.remove("selected-card");
    });
    selectedRadio.checked = true
    const label = selectedRadio.closest("label");
    const bottom = label.querySelector(".bottom");
    console.log(bottom)

    label.classList.add("selected-card");
   
};

radioInputs.forEach((radio) => {
    radio.addEventListener("change", (e) => {
        selectRadio(e.target);        
    });
    
});

closeModal.addEventListener("click", () => {
    radioInputs.forEach(radio => {
        radio.checked = false;
        radio.closest("label").classList.remove("selected-card");
    });    
    document.body.classList.remove("project-modal-open");
});

bookmarkBtn.addEventListener("click", () => {
    bookmarkBtn.classList.toggle("bookmarked");
});

backProjectBtn.addEventListener("click", () => {
    document.body.classList.add("project-modal-open");
});

selectRewardBtns.forEach((selectBtn) => {
    selectBtn.addEventListener("click", () => {
        radioInputs.forEach(radio => {
            radio.checked = false;
            radio.closest("label").classList.remove("selected-card");
        });
        const selectedReward = document.getElementById(`${selectBtn.name}`);
        selectRadio(selectedReward)
        document.body.classList.add("project-modal-open");

    })
})


