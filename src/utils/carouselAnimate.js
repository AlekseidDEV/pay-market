export const carouselAnimate = (index, slides) => {
    const wrapperCarousel = document.querySelector('.wrapper-carousel')

    let firstIndex = index + 1
    let secondIndex = index + 2

    if(firstIndex > slides.length - 1){
        firstIndex = 0
    }

    if(secondIndex > slides.length - 1){
        secondIndex = 1
    }

    wrapperCarousel.style.setProperty('--after', slides[firstIndex].color)
    wrapperCarousel.style.setProperty('--before', slides[secondIndex].color )
}