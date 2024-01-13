// jay patel
// 100873351
window.onload = function () {
    window.scrollTo(0, 0);

    // reference the puzzle
    const puzzle = document.querySelectorAll(".puzzleStyle");

    // variables
    let thePuzzle = [];
    let hiddenArray = [];
    let theObjects = [];
    let theMatching = [];
    let matchCount = 0;
    let matchFlag = false;
    let scoreValue = 0;
    const multiplier = 5;

    let sectID = ".sect";
    let theIndex = 0;

    // set up timeline
    let gBtimeline = gsap.timeline();

    // global variable
    let menuAnimate = gsap.timeline();
    let intro = gsap.timeline();



    // initialize click event for each puzzle
    for (let i = 0; i < puzzle.length; i++) {
        const theID = 'obj' + i;

        thePuzzle[i] = document.getElementById(theID).contentDocument;
        thePuzzle[i].addEventListener("click", () => {
            // hide the main menu and reveal the proper section
            theIndex = i + 1; // theIndex is the selected puzzle
            sectID = ".sect" + theIndex

            //   created a local var
            const sceneID = 'scene' + theIndex;
            const objs = document.getElementById(sceneID).contentDocument;
            const theObjs = objs.querySelectorAll(".itemStyle");
            hiddenArray = [];
            theObjects = [];
            theObjects = gsap.utils.toArray(theObjs);
            theObjects.forEach(function (obj, index) {
            hiddenArray[index] = './images/puzzle' + theIndex + '/elem' + index + '.svg';
            obj.img = hiddenArray[index];
            let animation = gsap.timeline({ paused: true });
            animation.to(obj, {
                    autoAlpha: 0,
                    duration: 1
                })
                obj.animation = animation;
                obj.addEventListener("click", checkMatch)
            });

            menuAnimate = gsap.timeline({ paused: true });
            menuAnimate.to('.sect', { autoAlpha: 1 })
                .to([sectID, '.board',], { autoAlpha: 0 })
                .to([sectID, '.scoreStyle',], { autoAlpha: 0 })
                .to(theObjects, { autoAlpha: 1 })
                .to('.boardStyle', { opacity: 1 });

            shuffleRoutine();
            gBtimeline.to(['.sect', '.title'],  { autoAlpha: 0 })
                .to([sectID, '.board', '.scoreStyle'], { autoAlpha: 1 });
        })
    }

    function shuffleRoutine() {
        theMatching = [];
        // scoreValue = 0; stop reseting the score by suffle
        document.getElementById("score").innerHTML = scoreValue;
        if (hiddenArray.length === 0) {
            menuAnimate.restart();
        } else {
            for (let i = 0; i < 5; i++) {
                const theSelected = Math.floor(Math.random() * hiddenArray.length);
                theMatching[i] = hiddenArray[theSelected];
                const itemID = 'item' + i;
                document.getElementById(itemID).src = hiddenArray[theSelected];
                hiddenArray.splice(theSelected, 1);
            }
        }
    }

    function checkMatch() {
        matchFlag = false;
        for (let j = 0; j < 5; j++) {
            if (this.img === theMatching[j]) {
                matchFlag = true;
                matchCount += 1;
                scoreValue += multiplier;
                document.getElementById("score").innerHTML = scoreValue;
                const theItem = '#item' + j;
                gsap.to(theItem, { opacity: .4  });
                this.animation.restart();
            };
        }

        // win
        if (matchCount === 5) {
            matchCount = 0;
            window.scrollTo(0, 0);
            menuAnimate.restart();
            gsap.to('.title', { autoAlpha: 1 });
            alert("you win")
        }
    }

    // buttons
    let theButtons = document.querySelectorAll('.buttons');
    theButtons.forEach(function (theBtn, index) {
        switch (index) {
            case 0: // Shuffle button
                theBtn.addEventListener('click', () => {
                    gsap.to(theObjects, { autoAlpha: 1 });
                    gsap.to('.boardStyle', { opacity: 1 });
                    shuffleRoutine();
                    window.scrollTo(0, 0);
                    tl.restart();
                });
                break;
            case 1: // Home button
                theBtn.addEventListener('click', () => {
                    window.scrollTo(0, 0);
                    menuAnimate.restart();
                    tl.restart();
                    gsap.to('.title', { autoAlpha: 1 });
                    
                });
                break;
            default:
                menuAnimate();
                break;
        }
    })

    // intro animation

    // selecting the svg
    theTitle = document.getElementById('title0').contentDocument;

    // selecting the elements from the svg
	let theText = theTitle.getElementById("text");
    let TajMahal = theTitle.getElementById("taj");
    let mandala = theTitle.getElementById("mandala-1");
    let mandalaTwo = theTitle.getElementById("mandala-2");

    // global timeline for Intro animation
    let tl = gsap.timeline();

    gsap.set (TajMahal, {opacity:0});
    
    tl.to(TajMahal, {
        opacity:1,
        duration:2,
        delay:1
        });

    gsap.set (theText, {opacity:0, scale: 0,transformOrigin: 'center center'});

        tl.to(theText, {
            opacity:1,
            scale:1
        });

        gsap.set (mandala, {y:20, transformOrigin: 'center center'});

    tl.to(mandala, {
        rotate:360,
        duration: 8, 
        ease: 'sine.in',
        yoyo:true, 
        repeat:-1},2);

        gsap.set (mandalaTwo, {y:20, transformOrigin: 'center center'});

    tl.to(mandalaTwo, {
        rotate:360,
        duration: 8, 
        ease: 'sine.in',
        yoyo:true, 
        repeat:-1},2);
}