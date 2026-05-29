/* ===========================================
   LABFORWEB – Nerd Academy
   Main JavaScript
   =========================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* -----------------------------------------------
       COOKIE BANNER
    ----------------------------------------------- */
    const cookieBanner  = document.getElementById('cookieBanner');
    const cookieAccept  = document.getElementById('cookieAccept');
    const cookieReject  = document.getElementById('cookieReject');
    const COOKIE_KEY    = 'lfw_cookie_consent';

    if (!localStorage.getItem(COOKIE_KEY)) {
        setTimeout(function () {
            cookieBanner.classList.add('show');
            document.body.classList.add('cookie-visible');
        }, 900);
    }

    function closeCookieBanner(choice) {
        localStorage.setItem(COOKIE_KEY, choice);
        cookieBanner.classList.remove('show');
        document.body.classList.remove('cookie-visible');
    }

    if (cookieAccept) cookieAccept.addEventListener('click', function () { closeCookieBanner('accepted'); });
    if (cookieReject) cookieReject.addEventListener('click', function () { closeCookieBanner('rejected'); });


    /* -----------------------------------------------
       MOBILE NAVIGATION
    ----------------------------------------------- */
    const hamburger = document.getElementById('hamburger');
    const mainNav   = document.getElementById('mainNav');

    function closeNav() {
        mainNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        const lines = hamburger.querySelectorAll('.hamburger-line');
        lines[0].style.transform = '';
        lines[1].style.opacity   = '';
        lines[2].style.transform = '';
    }

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', function () {
            const isOpen = mainNav.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', String(isOpen));
            const lines = hamburger.querySelectorAll('.hamburger-line');
            if (isOpen) {
                lines[0].style.transform = 'translateY(7px) rotate(45deg)';
                lines[1].style.opacity   = '0';
                lines[2].style.transform = 'translateY(-7px) rotate(-45deg)';
            } else {
                closeNav();
            }
        });

        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
                closeNav();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeNav();
        });
    }


    /* -----------------------------------------------
       SMOOTH SCROLL FOR ANCHOR LINKS
    ----------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href   = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                closeNav();
                const stickyH = document.querySelector('.sticky-wrapper')
                    ? document.querySelector('.sticky-wrapper').offsetHeight
                    : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - stickyH - 12;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });


    /* -----------------------------------------------
       SCROLL REVEAL ANIMATION (IntersectionObserver)
    ----------------------------------------------- */
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(function (el) { observer.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('visible'); });
    }


    /* -----------------------------------------------
       HEADER SCROLL SHADOW
    ----------------------------------------------- */
    const stickyWrapper = document.querySelector('.sticky-wrapper');

    window.addEventListener('scroll', function () {
        if (stickyWrapper) {
            if (window.scrollY > 10) {
                stickyWrapper.style.boxShadow = '0 2px 20px rgba(0,0,0,0.13)';
            } else {
                stickyWrapper.style.boxShadow = '';
            }
        }
    }, { passive: true });


    /* -----------------------------------------------
       ACTIVE NAV LINK (highlight based on scroll)
    ----------------------------------------------- */
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        const stickyH  = stickyWrapper ? stickyWrapper.offsetHeight : 0;
        const scrollPos = window.scrollY + stickyH + 20;

        sections.forEach(function (section) {
            if (
                section.offsetTop <= scrollPos &&
                section.offsetTop + section.offsetHeight > scrollPos
            ) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + section.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink, { passive: true });

});
