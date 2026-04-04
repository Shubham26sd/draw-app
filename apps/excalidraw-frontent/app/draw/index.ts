export function initDraw(canvas: HTMLCanvasElement) {

    const ctx = canvas.getContext("2d")

    if (!ctx) return

    let clicked = false
    let startX = 0
    let startY = 0

    const getCoords = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        }
    }

    canvas.addEventListener("mousedown", (e) => {
        clicked = true
        const { x, y } = getCoords(e)
        startX = x
        startY = y
    })

    canvas.addEventListener("mouseup", () => {
        clicked = false
    })

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const { x, y } = getCoords(e)

            const width = x - startX
            const height = y - startY

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.strokeStyle = "rgba(255,255,255,1)"

            ctx.strokeRect(startX, startY, width, height)
        }
    })
}