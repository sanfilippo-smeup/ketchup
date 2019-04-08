/**
 * Offset Interface
 **/
export interface ElementOffset {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
}

/**
 * Given an HTML element, how a third element must be positioned relatively to it and an offset element from which it must be positioned
 * calculates the top or bottom, right or left properties to allow correctly placing that third element.
 * @param el - The element relative to which the third element must be placed
 * @param positioning - How the third element must be placed in relation to el (if over or under, left or right aligned)
 * @param [offsetEl] - An optional parameter to specify from which scrollable element calculations must take place
 */
export function getElementOffset(
    el: HTMLElement,
    positioning: {isRight: boolean, isTop: boolean} = {isRight: false, isTop: false},
    offsetEl: HTMLElement = document.documentElement
): ElementOffset {
    let ret: ElementOffset = {};
    // Get rectangle of the component.
    let rect = el.getBoundingClientRect(),
        scrollLeft = offsetEl.scrollLeft,
        scrollTop = offsetEl.scrollTop;

    // If left positioned
    if (!positioning.isRight) {
        ret.left = rect.left + scrollLeft;
    } else {
        // If right positioned
        ret.right = offsetEl.scrollWidth - rect.left - rect.width;
    }

    // If positioned on the bottom of the el element
    if (!positioning.isTop) {
        ret.top = scrollTop + rect.top + rect.height;
    } else {
        // If positioned on the top of the el element
        ret.bottom = offsetEl.scrollHeight - scrollTop - rect.top;
    }
    return ret;
}

/**
 * Given an HTMLElement and a position object, sets given positions to that element, while setting the others to initial state.
 * @param el - The element to position
 * @param position - The position to assign to that element
 */
export function setElementOffset(el: HTMLElement, position: ElementOffset) {
    const style = el.style;
    // Always check alterned elements
    if (position.left) {
        style.left = position.left + 'px';
        style.right = 'initial';
    } else if (style.right) {
        style.right = position.right + 'px';
        style.left = 'initial';
    }

    if (position.top) {
        style.top = position.top + 'px';
        style.bottom = 'initial';
    } else if (style.bottom) {
        style.bottom = position.bottom + 'px';
        style.top = 'initial';
    }
}