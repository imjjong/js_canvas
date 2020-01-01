
    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    export function randomColor() {
        return 0
    }
    function distance(x1, x2, y1, y2) {
        const xDist = x2 - x1
        const yDist = y2 - y1

        // sqrt = 루트, pow  = 제곱
        return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
    }

    export {randomIntFromRange, randomColor, distance}