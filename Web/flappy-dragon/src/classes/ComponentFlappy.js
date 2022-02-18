class componentFlappy
{
    constructor(canvas, ctx, width, height, color, x, y, type)
    {
        this.canvas = canvas;
        this.ctx = ctx;
        this.type = type;
        if (type == "image" || type == "background")
        {
            this.image = new Image();
            this.image.src = color;
        }
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0.05;
        this.gravitySpeed = 0;
        this.x = x;
        this.y = y;
    }

    update()
    {
        if (this.type == "image" || this.type == "background")
        {
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            if (this.type == "background")
            {
                this.ctx.drawImage(this.image, 
                    this.x + this.width, 
                    this.y,
                    this.width, this.height);
            }
        }
        else if(this.type == "text")
        {
            this.ctx.font = this.width + " " + this.height;
            this.ctx.fillStyle = this.color;
            this.ctx.fillText(this.text, this.x, this.y);
        }
        else
        {
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    newPos()
    {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.hitTop();

        if (this.type == "background")
        {
            if (this.x == -(this.width))
            {
                this.x = 0;
            }
        }
    }

    crashWith(otherObj)
    {
        const myleft = this.x;
        const myright = this.x + (this.width);
        const mytop = this.y;
        const mybottom = this.y + (this.height);
        const otherleft = otherObj.x;
        const otherright = otherObj.x + (otherObj.width);
        const othertop = otherObj.y;
        const otherbottom = otherObj.y + (otherObj.height);
        let crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright))
        {
            crash = false;
        }
        return crash;
    }

    hitBottom()
    {
        const rockbottom = this.canvas.height - this.height;
        if (this.y > rockbottom)
        {
            this.y = rockbottom;
        }
    }

    hitTop()
    {
        if(this.y < 0)
        {
            this.y = 0;
            this.gravitySpeed = 0;
        }
    }
}

export default componentFlappy;