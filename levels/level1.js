const level1 = new Level(
    [
        new Wraith(),
        new Wraith(),
        new Wraith(),
        new Wraith(),
        new Demon()
    ],
    [
        new Clouds('../img/bg/layers/clouds_1.png'),
        new Clouds('../img/bg/layers/clouds_1.png'),
        new Clouds('../img/bg/layers/clouds_2.png'),
        new Clouds('../img/bg/layers/clouds_2.png'),
        new Clouds('../img/bg/layers/clouds_2.png')
    ],
    [
        new BgObject('../img/bg/layers/sky.png', -720),
        new BgObject('../img/bg/layers/rocks.png', -720),
        new BgObject('../img/bg/layers/sky.png', 0),
        new BgObject('../img/bg/layers/rocks.png', 0),
        new BgObject('../img/bg/layers/sky.png', 720),
        new BgObject('../img/bg/layers/rocks.png', 720),
        new BgObject('../img/bg/layers/sky.png', 720*2),
        new BgObject('../img/bg/layers/rocks.png', 720*2),
        new BgObject('../img/bg/layers/sky.png', 720*3),
        new BgObject('../img/bg/layers/rocks.png', 720*3)
    ],
    [
        new BgObject('../img/bg/layers/ground_1.png', -720),
        new BgObject('../img/bg/layers/ground_2.png', -720),
        new BgObject('../img/bg/layers/ground_3.png', -720),
        new BgObject('../img/bg/layers/ground_1.png', 0),
        new BgObject('../img/bg/layers/ground_2.png', 0),
        new BgObject('../img/bg/layers/ground_3.png', 0),
        new BgObject('../img/bg/layers/ground_1.png', 720),
        new BgObject('../img/bg/layers/ground_2.png', 720),
        new BgObject('../img/bg/layers/ground_3.png', 720),
        new BgObject('../img/bg/layers/ground_1.png', 720*2),
        new BgObject('../img/bg/layers/ground_2.png', 720*2),
        new BgObject('../img/bg/layers/ground_3.png', 720*2),
        new BgObject('../img/bg/layers/ground_1.png', 720*3),
        new BgObject('../img/bg/layers/ground_2.png', 720*3),
        new BgObject('../img/bg/layers/ground_3.png', 720*3)
    ],
    [
        new Plant(),
        new Plant(),
        new Plant(),
        new Plant(),
        new Plant(),
        new Plant(),
        new Plant(),
        new Plant(),
        new Plant(),
        new Plant()
    ],
    [
        new Crystal(),
        new Crystal(),
        new Crystal(),
        new Crystal(),
        new Crystal(),
        new Crystal(),
        new Crystal(),
        new Crystal(),
        new Crystal(),
        new Crystal()
    ]
);