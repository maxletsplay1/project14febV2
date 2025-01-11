import anime from "animejs";

export const randomizePosition = (buttonId: string):void => {
    const button = document.getElementById(buttonId);

    if (button) {
        const buttonWidth = button.offsetWidth;
        const buttonHeight = button.offsetHeight;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const padding = 10;

        const currentLeft = button.offsetLeft;
        const currentTop = button.offsetTop;

        const randomLeft = Math.random() * (viewportWidth - buttonWidth - 2 * padding) + padding;
        const randomTop = Math.random() * (viewportHeight - buttonHeight - 2 * padding) + padding;

        if (!button.style.left || !button.style.top) {
            button.style.position = 'absolute';
            button.style.left = `${currentLeft}px`;
            button.style.top = `${currentTop}px`;
        }

        anime({
            targets: button,
            left: `${randomLeft}px`,
            top: `${randomTop}px`,
            easing: 'easeOutQuad',
            duration: 500,
        });
    }
};