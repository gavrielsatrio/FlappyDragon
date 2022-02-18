<template>
	<div id="app">
		<div class="container-fluid h-100 d-flex justify-content-center align-items-center">
			<div id="flappyDragonContainer">
				<h1 id="flappyDragonHeader">Flappy Dragon</h1>
				<p id="flappyDragonDesc">Jika menabrak meteor maka game akan diulang</p>
				<canvas id="flappyDragonCanvas" width="700" height="400"></canvas>
			</div>
		</div>
	</div>
</template>
<script>

	import FlappyArea from './classes/FlappyArea';
	import ComponentFlappy from './classes/ComponentFlappy';

	import nagaImage from './assets/images/flappyDragonAssets/naga.png';
	import backgroundImage from './assets/images/flappyDragonAssets/background1.jpg';
	import meteorImage from './assets/images/flappyDragonAssets/meteor.png';

	export default {
		name: "App",
		data()
		{
			return {
				canvas : null,
				naga : null,
				background : null,
				score : null,
				flappyArea : null,
				obstacle : [],
				interval : null
			}
		},
		mounted()
		{
			this.initializeCanvas();

			window.onkeydown = (e) =>
			{
				e.preventDefault();
				this.flappyArea.keys = (this.flappyArea.keys || []);
				this.flappyArea.keys[e.keyCode] = (e.type == "keydown");
			};

			window.onkeyup = (e) =>
			{
				this.flappyArea.keys[e.keyCode] = (e.type == "keydown");
			};
		},
		methods :
		{
			initializeCanvas()
			{
				this.canvas = document.getElementById("flappyDragonCanvas");
				this.naga = new ComponentFlappy(this.canvas, this.canvas.getContext("2d"), 100, 100, nagaImage, 50, 50, "image");
				this.background = new ComponentFlappy(this.canvas, this.canvas.getContext("2d"), 700, 400, backgroundImage, 0, 0, "background");
				this.score = new ComponentFlappy(this.canvas, this.canvas.getContext("2d"), "30px", "Calibri", "black", 280, 40, "text");

				this.flappyArea = new FlappyArea(this.canvas);
				this.obstacle = [];

				this.startGame();
			},
			startGame()
			{
				this.interval = setInterval(this.updateGameArea, 20);
			},
			updateGameArea()
			{
				this.flappyArea.clear();
				this.flappyArea.frameNo += 1;

				this.naga.speedX = 0;
				this.naga.speedY = 0;

				if(this.flappyArea.keys[37])
				{
					this.naga.speedX = -1.5;
				}

				if(this.flappyArea.keys[39])
				{
					this.naga.speedX = 1;
				}

				if(this.flappyArea.keys[38])
				{
					this.naga.gravitySpeed = 0;
					this.naga.speedY = -2.5;
				}

				if(this.flappyArea.keys[116])
				{
					document.location.reload();
					return;
				}

				let x, height, minHeight, maxHeight, minGap, maxGap;
				for (let i = 0; i < this.obstacle.length; i += 1)
				{
					if (this.naga.crashWith(this.obstacle[i]))
					{
						clearInterval(this.interval);
						this.initializeCanvas();
                        
						return;
					}
				}

				this.background.x -= 1;
				this.background.newPos();
				this.background.update();

				this.naga.newPos();
				this.naga.update();

				if (this.flappyArea.frameNo == 1 || this.everyinterval(280))
				{
					x = this.flappyArea.canvas.width;
					minHeight = 20;
					maxHeight = 200;
					height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
					minGap = 100;
					maxGap = 300;
					let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
					let gap2 = Math.floor(Math.random() * (maxGap - minGap + 10) + minGap);
					let gap3 = Math.floor(Math.random() * (maxGap - minGap + 30) + minGap);

					this.obstacle.push(new ComponentFlappy(this.canvas, this.canvas.getContext("2d"), 60, 60, meteorImage, x, height, "image"));
					this.obstacle.push(new ComponentFlappy(this.canvas, this.canvas.getContext("2d"), 50, 50, meteorImage, x, height + gap, "image"));
					this.obstacle.push(new ComponentFlappy(this.canvas, this.canvas.getContext("2d"), 60, 60, meteorImage, x, height + gap2 + 15, "image"));
					this.obstacle.push(new ComponentFlappy(this.canvas, this.canvas.getContext("2d"), 50, 50, meteorImage, x, height + gap3 - 40, "image"));
				}

				for (let i = 0; i < this.obstacle.length; i += 1)
				{
					if(i%2 == 0)
					{
						this.obstacle[i].x += -2;
						this.obstacle[i].y += 0.5;
						this.obstacle[i].update();
					}
					else if(i%3 == 0)
					{
						this.obstacle[i].x += -4;
						this.obstacle[i].y += -0.6;
						this.obstacle[i].update();
					}
					else
					{
						this.obstacle[i].x += -3;
						this.obstacle[i].y += -0.7;
						this.obstacle[i].update();
					}
				}

				this.score.text = "SCORE : " + parseInt(this.flappyArea.frameNo / 100);
				this.score.update();
			},
			everyinterval(n)
			{
				if ((this.flappyArea.frameNo / n) % 1 == 0)
				{
					return true;
				}
				return false;
			}
		}
	};
</script>
<style>

	@import 'assets/css/Bootstrap.css';

	#app
	{
		background-size: cover;
		background-repeat: no-repeat;
		background-image: url("assets/images/flappyDragonAssets/background2.jpg");
		height: 100vh;
		text-align: center;
	}

	#flappyDragonContainer
	{
		border: 1px solid black;
		border-radius: 30px;
		display: inline-block;
		padding: 30px 50px 40px;
		background-color: rgba(255,255,255, 0.8);
	}

	#flappyDragonDesc
	{
		color: rgb(80, 80, 80);
		font-size: 28px;
	}

</style>
