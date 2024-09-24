document.addEventListener('DOMContentLoaded', function() {
    new WOW().init();

    // 파일 경로, CSS 셀렉터
    const sections = [
        { url: 'footer.html', selector: '#footer' },
        { url: 'header.html', selector: '#header' },
        { url: 'main/m-1.html', selector: '.m-1' },
        { url: 'main/m-2.html', selector: '.m-2' },
        { url: 'main/m-3.html', selector: '.m-3' },
        { url: 'main/m-4.html', selector: '.m-4' },
        { url: 'main/m-5.html', selector: '.m-5' },
        { url: 'main/m-6.html', selector: '.m-6' },
        { url: 'main/m-7.html', selector: '.m-7' }
    ];

    let loadCount = 0;
    let siteWrapHeight = 0;

    // fetch 함수 + script 태그 실행 처리
    function loadContent(url, selector) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const container = document.querySelector(selector);
                container.innerHTML = data;

                // 삽입된 HTML 안에 있는 스크립트 태그를 실행하는 함수
                const scripts = container.querySelectorAll('script');
                scripts.forEach(oldScript => {
                    const newScript = document.createElement('script');
                    newScript.src = oldScript.src; // 외부 스크립트일 경우 src 속성 복사
                    newScript.innerHTML = oldScript.innerHTML; // 내부 스크립트일 경우 내용 복사
                    document.body.appendChild(newScript); // 스크립트를 body에 추가하여 실행
                });

                loadCount++; // 로드 카운트 증가
                // 모든 섹션이 로드된 후 헤더 스크롤 active 추가
                if (loadCount === sections.length) {
                    headerActive();
                    mainSwiper();
                    popup();
                }
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    }

    // 모든 섹션을 순회하며 로드
    sections.forEach(section => {
        loadContent(section.url, section.selector);
    });


    function headerActive() {
        const headerContent = document.querySelector('.header');
        const main1 = document.querySelector('.m-1');
        const siteWrap = main1.querySelector('.site-wrap');
        siteWrapHeight = siteWrap ? siteWrap.offsetHeight : 0; // siteWrapHeight 값 저장

        window.addEventListener('scroll', function() {
            if (window.scrollY >= siteWrapHeight) {
                headerContent.classList.add('active');
            } else {
                headerContent.classList.remove('active');
            }
        });
    }

    
    function mainSwiper() {
        if (window.innerWidth <= 1024) {
            var mainSwiper01 = new Swiper('.mainSwiper01', {
                slidesPerView:2.5,
                spaceBetween :10,
                pagination: {
                el: '.swiper-pagination',
                clickable: true,
                },
            });
            var mainSwiper02 = new Swiper('.mainSwiper02', {
                slidesPerView:2.5,
                spaceBetween :10,
                pagination: {
                el: '.swiper-pagination',
                clickable: true,
                },
            });
            var mainSwiper03 = new Swiper('.mainSwiper03', {
                slidesPerView:1.5,
                spaceBetween :10,
                pagination: {
                el: '.swiper-pagination',
                clickable: true,
                },
            });
            var popSwiper = new Swiper('.popSwiper', {
                slidesPerView:3,
                spaceBetween :20,
            });
            
        }
        if(window.innerWidth > 1024){
            var popSwiper = new Swiper('.popSwiper', {
                slidesPerView:3,
                spaceBetween :20,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });
            var mainSwiper03 = new Swiper('.mainSwiper03', {
                slidesPerView:3,
                spaceBetween :20,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });
        }
    }

    function popup(){
        const popbg = document.querySelector('.popup-bg');
        const popup = document.querySelector('.popup');
        const CloseBtn = document.querySelector('.popup .close');
        const estateViewBtn = document.querySelectorAll('.m-3 .site-wrap .grid-3 .card .card-wrap .text_area .btn');
        estateViewBtn.forEach((evb)=>{
            evb.addEventListener('click',function(){
                popbg.classList.add('active');
                popup.classList.add('active');
            })
        })
        CloseBtn.addEventListener('click',function(){
            popbg.classList.remove('active');
            popup.classList.remove('active');
        })
        popbg.addEventListener('click',function(){
            popbg.classList.remove('active');
            popup.classList.remove('active');
        })
        
    }

});
