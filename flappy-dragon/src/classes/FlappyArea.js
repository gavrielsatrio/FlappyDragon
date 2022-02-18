class FlappyArea
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.frameNo = 0;
        this.keys = [];
    }

    clear()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    stop()
    {
        location.reload();
    }
}

export default FlappyArea;