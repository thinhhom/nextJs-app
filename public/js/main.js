document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.main-slider');
    const slides = document.querySelectorAll('.main-slider-item');
    const totalSlides = slides.length;
    let currentIndex = 0;

    function showSlide(index) {
        // Kiểm tra giới hạn index
        if (index < 0 || index >= totalSlides) {
            return;
        }

        // Di chuyển slider để hiển thị slide tương ứng
        slider.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
    }

    // Tự động chuyển slide sau một khoảng thời gian
    function autoSlide() {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            showSlide(currentIndex);
        }, 2500); // Thay đổi slide mỗi 3 giây
    }

    // Bắt đầu tự động chuyển slide
    autoSlide();
});
