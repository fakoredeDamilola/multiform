const sections = document.getElementsByClassName("section")
const confirm = document.getElementById("confirm")
const buttonConfirm = document.getElementsByClassName("button-confirm")[0]
const buttonBack = document.getElementsByClassName("button-back")[0]
const bannerStep = document.getElementsByClassName("banner__number")
const sectionTwoCards = document.getElementsByClassName("section__two-cards")
const sectionTwoCard = document.getElementsByClassName("section__two-card")
const monthlyPlan = document.getElementsByClassName("yearly__plan")
const buttons = document.getElementsByClassName("buttons")[0]
const yearlyPlan = document.getElementsByClassName("monthly__plan")
const monthlyAddon = document.getElementsByClassName("section__three-addon-monthly")
const yearlyAddon = document.getElementsByClassName("section__three-addon-yearly")
const nameInput = document.getElementById("name_input")
const emailInput = document.getElementById("email_input")
const phoneInput = document.getElementById("phone_input")
const slider = document.getElementById("slider")
const section4summary = document.getElementsByClassName("section__four-summary")[0]
const radioDivs = document.querySelectorAll(".section__two-radio div")
const sectionThreeAddons = document.getElementsByClassName("section__three-checkbox")
const errorElement = document.getElementsByClassName("error")
const card__error = document.getElementsByClassName("card__error")[0]

let currentPage=0
const pageLength= 5

const infoData = {
    personalInfo: {
        name_input:"",
        email_input:"",
        phone_input:""
    },
    plan: {
        type:"",
        amount:""
    },
    addons: [],
    duration:"monthly"
}
const instructions = [
    
]
const error = [

]




function runCheck(number){
    let key = Object.keys(infoData)
    let index = key[currentPage]
    if(currentPage === 0){
        infoData.personalInfo.name_input =nameInput.value
        infoData.personalInfo.email_input =emailInput.value
        infoData.personalInfo.phone_input =phoneInput.value
    }else if(currentPage === 1) {
        
    }
    if(currentPage < key.length && number === 1){
     
       const errors =checkForErrors(infoData[index]) 
       if(errors.length > 0){
      errors.map((error)=>{
        console.log(error)
        // error.classList.add("you")
      })
       }else{
        nextPage(number)
       }
    }else{
     nextPage(number)
   }
  
}

const checkForErrors =(info)=>{
    const error = []
    if(currentPage === 0){
       for(item in info) {
            let element = document.querySelector(`#${item}`)
        if(!info[item]) {
            console.log({item})
            element.style.border="1px solid red"
            errorElement[element.dataset.error].style.display="block"
            error.push(item)
        }else{
            element.style.border="1px solid black"
            errorElement[element.dataset.error].style.display="none"
        }
    } 
    }else if(currentPage===1) {
        if(info.type==="" || info.amount ===""){
            card__error.style.display="block"
            error.push("Select an addon")
        } else{
            card__error.style.display="none" 
        }
    }
    
    return error
}

confirm.addEventListener("click",()=>runCheck(1))
buttonBack.addEventListener("click",()=>runCheck(-1))

function nextPage(number){
    changePage(pageLength,number)
    checkForButton(pageLength)
    changeBanner()
}

function changePage(pageLength,number){

    if(currentPage < pageLength && currentPage >=0){
        currentPage = currentPage + number
        
        Array.from(sections).forEach((section)=>{
            section.style.display="none"
        })
        sections[currentPage].style.display="block"
    }
    if(currentPage === 3 ){
        const result = {...infoData}
       result.plan = setPlan(infoData.plan,infoData.duration)
   result.addons = setAddon(infoData.addons,infoData.duration)
        fillUpUI(result)
    }
}

function fillUpUI(infoData) {
    const {personalInfo,plan,addons} = infoData
    section4summary.innerHTML = `
   
    <div class="section__4-container">
 <div class="section__4-wrapper">
    <div>
    <div>${plan.type} <span>(${infoData.duration})</span></div>
    <p class="change__plan">Change plan</p>
    </div>
    <div class="price">
 \$${plan.amount}/${infoData.duration === "monthly" ? "mo":"yr"}
    </div>
   
    </div>
    <div class="line"></div>
    <div class="section__4-addon">
    ${addons.map(addon =>(
            `<div class="section__4-add">
                <p>${addon.name}</p>
                <div>$${addon.price}/${infoData.duration === "monthly" ? "mo":"yr"}</div>
        </div>`
        )
    ).join("")

    }
    </div>
    
    </div>
    <div class="section__4-total">
    <p>Total (per ${infoData.duration ==="monthly" ? "Month" : "Year"})</p>
    <div>$${addons.reduce((acc,cur)=>acc+cur.price,0)+plan.amount}/${infoData.duration === "monthly" ? "mo":"yr"}</div>
    </div>
   
    `
}
function changeBanner(){
    if(currentPage <= pageLength-2){
       Array.from(bannerStep).forEach((banner)=>{
        banner.classList.remove("banner__step--active")
    })
    bannerStep[currentPage].classList.add("banner__step--active")  
    }
   
}

section4summary.addEventListener("click",(e)=>{

    if(e.target.classList.contains("change__plan")){
       nextPage(-2)
    }
})

function checkForButton(pageLength) {
    if(currentPage===0 || currentPage === pageLength){
        // dont show back button
        buttonBack.style.display="none"
        buttonConfirm
        buttonConfirm.textContent="next"   
        buttons.style.justifyContent="right"
    }else if( currentPage > 0 && currentPage < pageLength){
        // show back button
        buttonBack.style.display="block"
        buttonConfirm.textContent="next"
        buttonConfirm.style.backgroundColor="#022959"
        buttons.style.justifyContent="space-between"
    }
    if(currentPage === pageLength -2 ){
        buttonConfirm.textContent="confirm"  
        buttonConfirm.style.backgroundColor="#483EFF"
    }
    if(currentPage === pageLength-1){
        buttonConfirm.style.display="none"
        buttonBack.style.display="none"
    }else{
        buttonConfirm.style.display="block"
        
    }
}

Array.from(sectionTwoCards).forEach((sectionTwoCard)=>{
    sectionTwoCard.addEventListener("click",(e)=>{
        Array.from(document.getElementsByClassName('section__two-card')).forEach(function(el) { 
            el.classList.remove('card__active');
        });
        if(e.target.classList.contains("section__two-card")){
           e.target.classList.add("card__active")
       const plan =e.target.dataset
           infoData.plan = setPlan(plan,"monthly")
        }
       
    })
})
Array.from(sectionThreeAddons).forEach((sectionThreeAddon)=>{
    sectionThreeAddon.addEventListener("click",(e)=>{
       
        if(e.target.parentElement.parentElement.classList.contains("section__three-addon") ){
            if(e.target.checked){        
       e.target.parentElement.parentElement.classList.add("card__active")
       const addon = e.target.parentElement.parentElement.dataset
       infoData.addons.push({
        name:addon.name,
        description:addon.description,
        price: parseInt(addon.price)
       })
            }else{
                e.target.parentElement.parentElement.classList.remove("card__active")
                const add = e.target.parentElement.parentElement.dataset.name
              
              infoData.addons = infoData.addons.filter((addon)=>addon.name ===add.name)
            }
        }
    })
})

function setPlan(plan,dur){
    const duration = dur === "monthly" ? 1 : 10
    const free = dur === "monthly" ? "none" : 2
    const planInfo = {
        type: plan.type,
        amount: parseInt(plan.amount) * duration,
        free

       }
       return planInfo
}

function setAddon(addons,dur){
    const duration = dur === "monthly" ? 1 : 10
     const addon= addons.map((addon)=>({...addon,price:addon.price* duration}))

     console.log({addon})
     return addon
}

slider.addEventListener("click",(e)=>{
    if(!e.target.checked){
        radioDivs[0].classList.add("selected")
        radioDivs[1].classList.remove("selected")
        Array.from(monthlyPlan).forEach((plan)=>{
            plan.style.display="none"
        })
        Array.from(yearlyPlan).forEach((plan)=>{
            plan.style.display="block"
        })
        Array.from(monthlyAddon).forEach((addon)=>{
            addon.style.display="block"
        })
        Array.from(yearlyAddon).forEach((addon)=>{
            addon.style.display="none"
        })
        infoData.duration ="monthly"
    }else{
        radioDivs[1].classList.add("selected")
        radioDivs[0].classList.remove("selected")
        Array.from(monthlyPlan).forEach((plan)=>{
            plan.style.display="block"
        })
        Array.from(yearlyPlan).forEach((plan)=>{
            plan.style.display="none"
        })
        Array.from(monthlyAddon).forEach((addon)=>{
            addon.style.display="none"
        })
        Array.from(yearlyAddon).forEach((addon)=>{
            addon.style.display="block"
        })
        infoData.duration ="yearly"
    }


})

document.addEventListener("DOMContentLoaded",()=>{
    changePage(pageLength,0)
    checkForButton(pageLength)
})

