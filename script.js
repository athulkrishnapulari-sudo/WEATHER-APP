// PROFILE MENU OPEN CLOSE 



const userBar = document.querySelector(".username-bar");

profile_btn.addEventListener("click", () => {
    const isActive = profile_menu.classList.toggle("active");

    if (isActive) {
       
        const scrollWidth = userBar.scrollWidth + 20; 
        profile_menu.style.width = scrollWidth + "px";
        profile_menu.style.maxWidth = scrollWidth + "px";
    } else {
        profile_menu.style.width = "45px";
        profile_menu.style.maxWidth = "45px";
    }
});

// POPUP INPUT 

if ((!localStorage.getItem('name'))) {
    const form = document.getElementById('popup_main');
    form.style.display = 'block';
}
else{
    const form = document.getElementById('form');
    form.style.display='none';
    const name=localStorage.getItem('name');
    const username_display=document.getElementById('username_display');
    username_display.textContent=name;
}

const submit = document.getElementById('popup_submit');

submit.addEventListener('click', event => {
    event.preventDefault
    const username = document.getElementById('username').value;
    localStorage.setItem('name', username);
    
});



