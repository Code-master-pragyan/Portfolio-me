
let tablinks = document.getElementsByClassName("tab-links")
let tabcontents = document.getElementsByClassName("tab-contents")

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link")
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab")
    }
    event.currentTarget.classList.add("active-link")
    document.getElementById(tabname).classList.add("active-tab")
}

//sidebar logic for smaller screens---------------

let sidemenu = document.getElementById("sideBar");
function openSidebar() {
  document.getElementById("sideBar").classList.add("active");
  document.querySelector("nav").classList.add("sidebar-open");
  document.querySelector(".github-float").style.display = "none";
}
function closeSidebar() {
  document.getElementById("sideBar").classList.remove("active");
  document.querySelector("nav").classList.remove("sidebar-open");
  document.querySelector(".github-float").style.display = "";
}

// On page load, ensure correct icon state
document.addEventListener('DOMContentLoaded', function() {
    closeSidebar();
});


//Scroll animation js and typed js----------------

AOS.init({
    duration: 1000,
    once: true,
});

const typed = new Typed('#typing', {
    strings: ["Full-Stack Web Developer", "MERN Stack", "Web Designer", "Freelancer", "Open Source Contributor","Working as a Contributor in GSSoC'25"],
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 1000,
    loop: true,
})

//Back to top------------------------

const btn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
});
btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
});


document.querySelectorAll('nav a[data-scroll]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-scroll');
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        // Optionally, close sidebar if open
        if (typeof closeSidebar === 'function') closeSidebar();
    });
});

// AJAX Contact Form Submission with Toast
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('contactSubmitBtn');
    if (form && submitBtn) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            // Show spinner, hide text
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').style.display = 'none';
            submitBtn.querySelector('.btn-spinner').style.display = 'inline-flex';

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const res = await fetch('/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (res.ok) {
                    showToast(`The message has been sent. Thank you ${data.name}, for showing interest and visiting my portfolio website.`);
                    form.reset();
                } else {
                    showToast("Sorry, something went wrong. Please try again.", true);
                }
            } catch (err) {
                showToast("Sorry, something went wrong. Please try again.", true);
            } finally {
                // Hide spinner, show text, enable button
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').style.display = 'inline';
                submitBtn.querySelector('.btn-spinner').style.display = 'none';
            }
        });
    }
});

// Toast function
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-message');
    msg.textContent = message;
    toast.querySelector('i').className = isError ? 'fa-solid fa-circle-xmark' : 'fa-solid fa-circle-check';
    toast.querySelector('i').style.color = isError ? '#ff004f' : '#4bb543';
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}


// swiper js

const lifeSwiper = new Swiper(".myLifeSwiper", {
    loop: true,
    spaceBetween: 30,
    centeredSlides: true,
    slidesPerView: 1,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
    },
    speed: 900,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});


//   See more/ See less toggle

    const toggleBtn = document.getElementById("toggleProjects");
    const extraWorks = document.querySelectorAll(".extra-work");
    const portfolioSection = document.getElementById("portfolio");
    let isExpanded = false;

    toggleBtn.addEventListener("click", () => {
        isExpanded = !isExpanded;

        extraWorks.forEach(work => {
            work.style.display = isExpanded ? "flex" : "none";
        });

        toggleBtn.textContent = isExpanded ? "See Less" : "See More";

        if (!isExpanded) {
            portfolioSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    // Initial hide
    extraWorks.forEach(work => work.style.display = "none");


