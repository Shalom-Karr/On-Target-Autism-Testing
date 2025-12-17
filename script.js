document.addEventListener('DOMContentLoaded', function() {
            // 1. INPUT MASKING (IMask)
            const phoneMask = IMask(document.getElementById('phone'), {
                mask: '(000) 000-0000'
            });
            const zipMask = IMask(document.getElementById('zipCode'), {
                mask: '00000'
            });

            // 2. HEADER SCROLL-TO-REVEAL LOGIC
            const header = document.getElementById('header');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.remove('header-transparent');
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.add('header-transparent');
                    header.classList.remove('header-scrolled');
                }
            });

            // 3. MOBILE MENU
            const btn = document.getElementById('mobile-menu-btn');
            const menu = document.getElementById('mobile-menu');
            const closeBtn = document.getElementById('close-menu');
            const links = menu.querySelectorAll('a');

            function toggleMenu() {
                menu.classList.toggle('hidden');
                document.body.classList.toggle('overflow-hidden');
            }

            btn.addEventListener('click', toggleMenu);
            closeBtn.addEventListener('click', toggleMenu);
            links.forEach(link => link.addEventListener('click', toggleMenu));

            // 4. ACCORDION LOGIC
            const accordions = document.querySelectorAll('.accordion-btn');
            accordions.forEach(acc => {
                acc.addEventListener('click', function() {
                    const expanded = this.getAttribute('aria-expanded') === 'true';
                    this.setAttribute('aria-expanded', !expanded);
                    
                    const content = this.nextElementSibling;
                    const icon = this.querySelector('.accordion-icon');
                    
                    content.classList.toggle('active');
                    icon.style.transform = expanded ? 'rotate(0deg)' : 'rotate(180deg)';
                });
            });

            // 5. ADVANCED GSAP ANIMATIONS
            gsap.registerPlugin(ScrollTrigger);

            // Hero Animation Timeline
            const heroTl = gsap.timeline();
            heroTl.from(".gsap-hero-text", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            })
            .from("#hero-image-block", {
                x: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            }, "-=0.8");

            // Slide In Elements (Left)
            gsap.utils.toArray('.slide-from-left').forEach(element => {
                gsap.fromTo(element, 
                    { x: -50, opacity: 0, autoAlpha: 0 },
                    { 
                        scrollTrigger: {
                            trigger: element,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        },
                        x: 0, 
                        opacity: 1, 
                        autoAlpha: 1, 
                        duration: 0.8 
                    }
                );
            });

            // Slide In Elements (Right)
            gsap.utils.toArray('.slide-from-right').forEach(element => {
                gsap.fromTo(element, 
                    { x: 50, opacity: 0, autoAlpha: 0 },
                    { 
                        scrollTrigger: {
                            trigger: element,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        },
                        x: 0, 
                        opacity: 1, 
                        autoAlpha: 1, 
                        duration: 0.8 
                    }
                );
            });

            // Staggered Symptom Cards
            gsap.to(".symptom-card", {
                scrollTrigger: {
                    trigger: "#symptoms-guide",
                    start: "top 75%"
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)"
            });

            // Process Line Animation
            gsap.to("#process-line-fill", {
                scrollTrigger: {
                    trigger: "#process",
                    start: "top 60%",
                    end: "bottom 60%",
                    scrub: 1
                },
                width: "100%",
                ease: "none"
            });

            // Staggered Process Steps
            gsap.to(".process-step", {
                scrollTrigger: {
                    trigger: "#process",
                    start: "top 75%"
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.2
            });

            // FAQ Items Slide In
            gsap.to(".faq-item", {
                scrollTrigger: {
                    trigger: "#faq",
                    start: "top 80%"
                },
                x: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1
            });

            // Standard Fade Up (for Trusted By, Titles)
            gsap.utils.toArray('.gsap-fade-up, .gsap-reveal.text-reveal-block').forEach(element => {
                gsap.fromTo(element, 
                    { y: 30, opacity: 0, autoAlpha: 0 },
                    {
                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        },
                        y: 0,
                        opacity: 1,
                        autoAlpha: 1,
                        duration: 1
                    }
                );
            });

            // Parallax Background Shapes
            gsap.utils.toArray('.parallax-shape').forEach(shape => {
                gsap.to(shape, {
                    scrollTrigger: {
                        trigger: shape.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    },
                    y: 150, // Moves down slower than scroll
                    ease: "none"
                });
            });

            // Number Counters (Trust Signals)
            gsap.utils.toArray(".counter").forEach(counter => {
                gsap.to(counter, {
                    innerText: counter.getAttribute("data-target"),
                    duration: 2,
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 90%",
                        once: true
                    },
                    onUpdate: function() {
                        counter.innerHTML = Math.ceil(this.targets()[0].innerText);
                    }
                });
            });

            // Form Submit Simulation
            window.handleFormSubmit = function(e) {
                e.preventDefault();
                const btn = document.getElementById('submitBtn');
                btn.disabled = true;
                const originalText = btn.innerHTML;
                btn.innerHTML = 'Submitting...';
                
                // Simulate server request
                setTimeout(() => {
                    gsap.to("#intake-form", {opacity: 0, duration: 0.5, onComplete: () => {
                        document.getElementById('intake-form').classList.add('hidden');
                        const successMsg = document.getElementById('success-msg');
                        successMsg.classList.remove('hidden');
                        successMsg.classList.add('flex');
                        gsap.from(successMsg, {scale: 0.8, opacity: 0, duration: 0.5, ease: "back.out"});
                    }});
                }, 1500);
            }
        });
