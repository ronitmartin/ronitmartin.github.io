/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () =>{
   const header = document.getElementById('header')
   // When the scroll is greater than 50 viewport height, add the shadow-header class to the header tag
   this.scrollY >= 50 ? header.classList.add('shadow-header') 
                      : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) =>{
   e.preventDefault()

   // serviceID - templateID - #form - publicKey
   emailjs.sendForm('service_30ofpr7','template_sde5vuk','#contact-form','eqVVLojw6Ru3Ekmvk')
      .then(() =>{
         // Show sent message
         contactMessage.textContent = 'Message sent successfully ✅'

         // Remove message after five seconds
         setTimeout(() =>{
            contactMessage.textContent = ''
         }, 5000)

         // Clear input fields
         contactForm.reset()

      }, () =>{
         // Show error message
         contactMessage.textContent = 'Message not sent (service error) ❌'
      })
}

contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const THEME_STORAGE_KEY = 'ron-theme-choice'
let themeOverride = null
let themeExpiryTimer

function isNight(date) {
    const hour = date.getHours() + date.getMinutes() / 60
    return hour < 6.5 || hour >= 19.5
}

function nextThemeChange(date) {
    const next = new Date(date)
    const hour = date.getHours() + date.getMinutes() / 60
    if (hour < 6.5) next.setHours(6, 30, 0, 0)
    else if (hour < 19.5) next.setHours(19, 30, 0, 0)
    else {
        next.setDate(next.getDate() + 1)
        next.setHours(6, 30, 0, 0)
    }
    return next.getTime()
}

function clearThemeOverride() {
    themeOverride = null
    try { localStorage.removeItem(THEME_STORAGE_KEY) } catch {}
}

try {
    const stored = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY))
    if (typeof stored?.isDark === 'boolean' && Number.isFinite(stored?.expiresAt) && stored.expiresAt > Date.now()) {
        themeOverride = stored
    } else clearThemeOverride()
} catch { clearThemeOverride() }

function updateTheme() {
    const now = new Date()
    if (themeOverride && themeOverride.expiresAt <= now.getTime()) clearThemeOverride()
    const isDark = themeOverride ? themeOverride.isDark : isNight(now)
    document.body.classList.toggle('dark-theme', isDark)
    themeButton.classList.toggle('ri-sun-line', isDark)
    themeButton.classList.toggle('ri-moon-line', !isDark)
    themeButton.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`)
    clearTimeout(themeExpiryTimer)
    if (themeOverride) themeExpiryTimer = setTimeout(updateTheme, Math.max(0, themeOverride.expiresAt - now.getTime()))
}

themeButton.addEventListener('click', () => {
    themeOverride = {
        isDark: !document.body.classList.contains('dark-theme'),
        expiresAt: nextThemeChange(new Date()),
    }
    try { localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(themeOverride)) } catch {}
    updateTheme()
})

updateTheme()
setInterval(updateTheme, 30000)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Animations repeat
 })

 sr.reveal(`.home__perfil, .about__image, .contact__mail`, {origin: 'right'})
 sr.reveal(`.home__name, .home__info, 
            .about__container .section__title-1, .about__info, 
            .contact__social, .contact__data`, {origin: 'left'})
 sr.reveal(`.services__card, .projects__card`, {interval: 100})