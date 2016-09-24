# component
##posttime.js
投稿日から今日まで投稿時間差
```
	<script src="js/app/postTime.js"></script>
	<script>
	$(function(){
		CA.postTime();
	});
	</script>
```

##circleFall.js
背景で丸が移動

```
	<script src="js/app/circleFall.js"></script>
	<script>
	$(function(){
		CA.circleFall({
			size      : 10,
			speed     : 1.5,
			timing    : 100,
			len       : 30,
			direction : "top" // "top" or "left"
		});
	});
	</script>
```

##boxMove.js
箱が領域外が出現

```
	<script src="js/app/boxMove.js"></script>
	<script>
	$(function(){
		CA.boxMove({
			size      : 100,
			speed     : 20,
			timing    : 10,
			len       : 0,
			direction : "top"
		});
	});
	</script>
```

##targetPost.js
射的ゲームっぽい

```
	<script src="js/app/boxMove.js"></script>
	<script>
    $(function(){
		CA.targetPost({
			/*レーン数 1~10*/
			lane:1,
			/*的スピードレベル 1~5*/
			speed:3000,
			/*的数 1~10*/
			target:50
		});
    });
	</script>
```