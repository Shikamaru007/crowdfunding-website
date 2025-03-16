const mobileNavBtn = document.getElementById("mobileNavBtn");
const radioInputs = document.querySelectorAll("input[type='radio']");
const form = document.querySelector(".modal-form");
const closeModal = document.querySelector(".close-modal");
const projectModal = document.querySelector(".project-modal");
const bookmarkBtn = document.querySelector(".bookmark");
const backProjectBtn = document.querySelector(".back-project");
const selectRewardBtns = document.querySelectorAll(".select-reward");
const allInputs = document.querySelectorAll(".pledge-amount");
const progressBar = document.querySelector(".progress");
const gotItBtn = document.querySelector(".got-it");

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
});

allInputs.forEach(input => {
    const minValue = parseInt(input.dataset.min);
    
    input.addEventListener("input", () => {
        const formattedInput = input.value.replace(/\D/g, "");
        input.value = formattedInput;
    });

    
    input.addEventListener("focus", () => {
        const wrapper = input.parentElement;
        if(input.value === ""){
            input.value = minValue;
            
        }
        wrapper.classList.add("focused");
    });

    input.addEventListener("blur", () => {
        const wrapper = input.parentElement;
        if(input.value === "" || parseInt(input.value) < minValue){
            input.value = minValue;
            
        }
        wrapper.classList.remove("focused");
    });

    

})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedRadio = document.querySelector("input[type='radio']:checked");
    if(!selectedRadio){
        alert("Please select a pledge");
        return;
    }

    const pledgeInput = selectedRadio.closest("label").querySelector(".pledge-amount"); 
    const minPledge = pledgeInput.dataset.min;   

    if(pledgeInput.value === ""){
        alert("Please enter a pledge amount");
        return;
    }

    let pledgeAmount = parseInt(pledgeInput.value) || minPledge;
    let existingAmount = parseInt(document.querySelector(".revenue-amount").textContent.replace(/,/g, ""));
    const totalAmount = 100000;

    existingAmount += pledgeAmount;
    document.querySelector(".revenue-amount").textContent = existingAmount.toLocaleString();

    const progressPercentage = (existingAmount / totalAmount) * 100;
    progressBar.style.width = `${Math.min(progressPercentage, 100)}%`;

    const chosenSection = selectedRadio.closest("label");
    const peopleLeftElement = chosenSection.querySelector(".number");
    const pledgeId = selectedRadio.id;
    const mainPeopleLeft = document.querySelector(`[data-id="${pledgeId}"]`);


    let peopleLeft = parseInt(peopleLeftElement.textContent);
    if(peopleLeft > 0){
        peopleLeft--;
        peopleLeftElement.textContent = peopleLeft;
        mainPeopleLeft.textContent = peopleLeft;
    }

    if(peopleLeft <= 0){
        selectRadio.disabled = true;
        chosenSection.classList.add("out");
    }
   
    pledgeInput.value === "";
    radioInputs.forEach(radio => {
        radio.checked = false;
        radio.closest("label").classList.remove("selected-card");
    })
    document.body.classList.remove("project-modal-open");
    document.body.classList.add("success-modal-open");

    allInputs.forEach(input => {
        input.value = "";
    })
});

gotItBtn.addEventListener("click", ()=> {
    document.body.classList.remove("project-modal-open");
    document.body.classList.remove("success-modal-open");
});

function changeModalCardLayout(){
    const isTablet = window.innerWidth >= 768;

    const modalCards = document.querySelectorAll(".modal-card");

    modalCards.forEach(card => {
        const topSection = card.querySelector(".top");
        const pledgeRadio = topSection.querySelector(".pledge-checkbox");
        const modalStand = topSection.querySelector(".modal-stand-details");        
        const deets = topSection.querySelector(".deets");
        const peopleLeft = topSection.querySelector(".modal-people-left");
        const projectHead = document.createElement("div");
        projectHead.classList.add("project-head")

        const left = document.createElement("div");
        left.classList.add("left")
        left.appendChild(pledgeRadio);

        const right = document.createElement("div");
        right.classList.add("right")
        const rightTop = document.createElement("div");
        rightTop.classList.add("top-right")
        const rightTopLeft = document.createElement("div");
        const rightTopRight = document.createElement("div");



        rightTopLeft.appendChild(modalStand)
        if(peopleLeft){
            rightTopRight.append(peopleLeft)
        }
        rightTop.appendChild(rightTopLeft)
        rightTop.appendChild(rightTopRight)
        right.appendChild(rightTop)
        right.appendChild(deets)
        

        if(isTablet){
            topSection.innerHTML = "";
            topSection.appendChild(left)
            topSection.appendChild(right)
        }else{
            topSection.innerHTML = "";
            projectHead.appendChild(pledgeRadio)
            projectHead.appendChild(modalStand)

            topSection.appendChild(projectHead)
            topSection.appendChild(deets)
            topSection.appendChild(rightTopRight)
            
        }

       
        
    })

}



window.addEventListener("resize", changeModalCardLayout)
window.addEventListener("load", changeModalCardLayout)


