/* global Konva */
// @codekit-prepend quiet '../../../node_modules/konva/konva.min.js';
// @codekit-prepend quiet '../../../node_modules/gsap/src/minified/TweenLite.min.js';
// @codekit-prepend quiet '../../../node_modules/gsap/src/minified/TimelineMax.min.js';
// @codekit-prepend quiet '../../../node_modules/gsap/src/minified/easing/EasePack.min.js';
const carousel = () => {
    
    const blackFill = '#2d2d2d', grayFill = '#b0b0b0';
    const carousel = document.querySelector('#carousel');
    const width = 633;
    const height = 350;

    const stage = new Konva.Stage({
        container: 'carousel',
        width: width,
        height: height
    });

    const layer = new Konva.Layer();

    const circle = new Konva.Circle({
        x: stage.width() / 2,
        y: stage.height() / 2,
        radius: 100,
        stroke: '#7c7c7c',
        strokeWidth: 1
    });

    const lines = [], labels = [];
    const circleX = circle.radius() * Math.cos(Math.PI);
    const circleY = circle.radius() * Math.sin(Math.PI);

    const labelX = 130 * Math.cos(Math.PI);
    const labelY = 130 * Math.sin(Math.PI);

    const positions = [0, -1, -2, 2, 1, 0];
    const labelsContent = ['Private Equity', 'Data Analytics', 'Corporate &\nPortfolio Companies', 'Hedge Funds', 'Investment\nBanking']

    for (let i = 0; i < 5; i++) {
        // Creating lines/dots
        lines[i] = {
            group: new Konva.Group({
                x: circle.x(),
                y: circle.y()
            }),
            line: new Konva.Line({
                x: 0,
                y: 0,
                points: [circleX, circleY, labelX, labelY],
                stroke: circle.stroke(),
                strokeWidth: 1,
                lineCap: 'round',
                lineJoin: 'round'
            }),
            dot: new Konva.Circle({
                x: circleX,
                y: circleY,
                radius: 2.5,
                fill: blackFill
            })
        }
        lines[i].group.add(lines[i].line);
        lines[i].group.add(lines[i].dot);

        // Creating labels
        labels[i] = {
            group: new Konva.Group({
                x: circle.x() - 100,
                y: circle.y()
            }),
            labelgroup: new Konva.Group({
                x: -115,
                y: 0,
                pos: positions[i],
                id: i
            }),
            label: new Konva.Rect({
                x: 0,
                y: 0,
                width: 200,
                height: 40,
                fill: (positions[i] == 0) ? blackFill : grayFill,
                offset: {
                    x: 100,
                    y: 20
                }
            })
        }

        labels[i].labelgroup.add(labels[i].label);

        // Creating text
        labels[i].text = new Konva.Text({
            width: 200,
            height: 40,
            text: labelsContent[i].toUpperCase(),
            fontFamily: 'Verdana, Geneva, sans-serif',
            fontSize: 13,
            letterSpacing: 1.5,
            fill: '#fff',
            align: 'center',
            lineHeight: 1.25,
            verticalAlign: 'middle',
            offset: {
                x: 100,
                y: 20
            },
        });

        labels[i].labelgroup.add(labels[i].text);

        labels[i].group.add(labels[i].labelgroup);
    }

    layer.add(circle);

    // 92 | 130 | 105 | 130 | 92
    const timeStamps = [0, 0.92, 2.22, 3.27, 4.57, 5.5, 6.42, 7.72, 8.77, 10.07];

    const tlLine = group => {
        const tl = new TimelineMax({ paused: true });
        tl
            .add(TweenLite.to(group, 0.93, {konva: { rotation: '+=72' }, ease: Linear.easeNone}))
            .add(TweenLite.to(group, 0.86, {konva: { rotation: '+=37' }, ease: Linear.easeNone}))
            .add(TweenLite.to(group, 0.435, {konva: { rotation: '+=35' }, ease: Linear.easeNone}))
            .add(TweenLite.to(group, 1.05, {konva: { rotation: '+=72' }, ease: Linear.easeNone}))
            .add(TweenLite.to(group, 0.435, {konva: { rotation: '+=35' }, ease: Linear.easeNone}))
            .add(TweenLite.to(group, 0.86, {konva: { rotation: '+=37' }, ease: Linear.easeNone}))
            .add(TweenLite.to(group, 0.93, { konva: { rotation: '+=72' }, ease: Linear.easeNone }))
            // 2nd circle
            .add(TweenLite.to(group, 0.93, {konva: { rotation: '+=72' }, ease: Linear.easeNone}))
            .add(TweenLite.to(group, 0.86, {konva: { rotation: '+=37' }, ease: Linear.easeNone}))
            .add(TweenLite.to(group, 0.435, {konva: { rotation: '+=35' }, ease: Linear.easeNone}))
            .add(TweenLite.to(group, 1.05, {konva: { rotation: '+=72' }, ease: Linear.easeNone}))
            .add(TweenLite.to(group, 0.435, {konva: { rotation: '+=35' }, ease: Linear.easeNone}))
            .add(TweenLite.to(group, 0.86, {konva: { rotation: '+=37' }, ease: Linear.easeNone}))
            .add(TweenLite.to(group, 0.93, {konva: { rotation: '+=72' }, ease: Linear.easeNone}));
        return tl;
    }

    lines.forEach((el, i) => {
        layer.add(el.group);
        el.tl = tlLine(el.group);
        el.tl.seek(timeStamps[i + 5]);
    })


    const tlLabel = (labels, label) => {
        const tl = new TimelineMax({ paused: true });
        tl
            .add(TweenLite.to(labels, 0.125, {konva: {y: '-=20'},ease: Linear.easeNone}))
            .add([
                TweenLite.to(label, 1, { konva: { rotation: '-=90' }, ease: Linear.easeNone }),
                TweenLite.to(labels, 1, { konva: { rotation: '+=90' }, ease: Linear.easeNone })
            ])
            .add(TweenLite.to(labels, 0.5, {konva: {x: '+=200'},ease: Linear.easeNone}))
            .add([
                TweenLite.to(label, 1, { konva: { rotation: '-=90' }, ease: Linear.easeNone }),
                TweenLite.to(labels, 1, { konva: { rotation: '+=90' }, ease: Linear.easeNone })
            ])
            .add(TweenLite.to(labels, 0.25, {konva: {y: '+=40'},ease: Linear.easeNone}))
            .add([
                TweenLite.to(label, 1, { konva: { rotation: '-=90' }, ease: Linear.easeNone }),
                TweenLite.to(labels, 1, { konva: { rotation: '+=90' }, ease: Linear.easeNone })
            ])
            .add(TweenLite.to(labels, 0.5, {konva: {x: '-=200'},ease: Linear.easeNone}))
            .add([
                TweenLite.to(label, 1, { konva: { rotation: '-=90' }, ease: Linear.easeNone }),
                TweenLite.to(labels, 1, { konva: { rotation: '+=90' }, ease: Linear.easeNone })
            ])
            .add(TweenLite.to(labels, 0.125, { konva: { y: '-=20' }, ease: Linear.easeNone }))
            // 2nd circle
            .add(TweenLite.to(labels, 0.125, {konva: {y: '-=20'}, ease: Linear.easeNone}))
            .add([
                TweenLite.to(label, 1, { konva: { rotation: '-=90' }, ease: Linear.easeNone }),
                TweenLite.to(labels, 1, { konva: { rotation: '+=90' }, ease: Linear.easeNone })
            ])
            .add(TweenLite.to(labels, 0.5, {konva: {x: '+=200'}, ease: Linear.easeNone}))
            .add([
                TweenLite.to(label, 1, { konva: { rotation: '-=90' }, ease: Linear.easeNone }),
                TweenLite.to(labels, 1, { konva: { rotation: '+=90' }, ease: Linear.easeNone })
            ])
            .add(TweenLite.to(labels, 0.25, {konva: {y: '+=40'}, ease: Linear.easeNone}))
            .add([
                TweenLite.to(label, 1, { konva: { rotation: '-=90' }, ease: Linear.easeNone }),
                TweenLite.to(labels, 1, { konva: { rotation: '+=90' }, ease: Linear.easeNone })
            ])
            .add(TweenLite.to(labels, 0.5, {konva: {x: '-=200'}, ease: Linear.easeNone}))
            .add([
                TweenLite.to(label, 1, { konva: { rotation: '-=90' }, ease: Linear.easeNone }),
                TweenLite.to(labels, 1, { konva: { rotation: '+=90' }, ease: Linear.easeNone })
            ])
            .add(TweenLite.to(labels, 0.125, { konva: { y: '-=20' }, ease: Linear.easeNone }))
        return tl
    }

    labels.forEach((el, i) => {
        layer.add(el.group);
        el.tl = tlLabel(el.group, el.labelgroup);
        el.tl.seek(timeStamps[i + 5]);
        el.labelgroup.on('mouseup touchend', function () {
            const isActive = activeTween ? activeTween.isActive() : false;
            if (!isActive) {
                rotate(this);
                $('.carousel_brief').removeClass('is_active');
                $('.carousel_brief').removeClass('is_expanded');
                $('.carousel_details').removeClass('is_active');
                $(`#carouselBrief${i}`).addClass('is_active');
            }
        });
        el.labelgroup.on('mouseenter', () => {stage.container().style.cursor = 'pointer'});
        el.labelgroup.on('mouseleave', () => {stage.container().style.cursor = 'default'});
    })

    let state = 0, activeTween;

    const rotate = activeLabel => {
        const newState = activeLabel.attrs.pos;
        if (newState < 0 && state == 0) state = 5;
        if (newState < 0 && state == 1) state = 6;
        // console.log(`i + ${state}`, `i + ${state + newState}`)
        labels.forEach((el, i) => {
            lines[i].tl.tweenFromTo(timeStamps[i + state], timeStamps[i + state + newState], { ease: Elastic.easeOut.config(1, 0.9) });
            activeTween = el.tl.tweenFromTo(timeStamps[i + state], timeStamps[i + state + newState], { ease: Elastic.easeOut.config(1, 0.9) });
            if ((activeLabel == el.labelgroup) && el.label.fill != blackFill) {
                const tween = new Konva.Tween({
                    node: el.label,
                    fill: blackFill,
                    duration: 0.3,
                });
                tween.play();
            } else if(el.label.fill != grayFill){
                const tween = new Konva.Tween({
                    node: el.label,
                    fill: grayFill,
                    duration: 0.3,
                });
                tween.play();
            }
            el.labelgroup.attrs.pos -= newState;
            if (el.labelgroup.attrs.pos > 2) el.labelgroup.attrs.pos -= 5;
            if (el.labelgroup.attrs.pos < -2) el.labelgroup.attrs.pos += 5;
        });
        state = (state += newState) % 5;
        // console.log(`state ${state}`)
    }

    stage.add(layer);

    // tweenLines.timeScale(1.5)
    // tl.timeScale(1.5)





    function fitStageIntoParentContainer() {
        var container = document.querySelector('#carousel');

        // now we need to fit stage into parent
        var containerWidth = container.offsetWidth;
        // to do this we need to scale the stage
        var scale = containerWidth / width;


        stage.width(width * scale);
        stage.height(height * scale);
        stage.scale({ x: scale, y: scale });
        stage.draw();
    }

    fitStageIntoParentContainer();
    // adapt the stage on any window resize
    window.addEventListener('resize', fitStageIntoParentContainer);

}

carousel();

$('.carousel_more').click(function(e) {
    e.preventDefault();
    const brief = $(`#carouselBrief${$(this).data('id')}`); 

    brief.addClass('is_expanded');

    $($(this).attr('href')).addClass('is_active')
})