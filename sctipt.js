gsap.to("#box1", {
    x: 800, //px
    y: 500,
    duration: 5, //sec
    delay: 1,
    rotate: -7200,  //deg
    backgroundColor: "pink",
    borderRadius: "50%",
    scale: 2,
    repeat: -1, //infinite
    yoyo: true  //back and forth
})

gsap.from("#box2", {
    x: 800,
    y: 500,
    duration: 5,
    delay: 1
})

gsap.from("h1", {
    opacity: 0,
    duration: 1,
    delay: 1,
    y: 30,
    delay: 1,
    stagger: 0.5,   //sec
    //stagger: -1  //reverse
    repeat: 2   //3 times
})

// These are tweens

//Timeline

// gsap.to("#box3", {
//     x: 800,
//     duration: 1,
//     delay: 1
// })

// gsap.to("#box4", {
//     x: 800,
//     duration: 1,
//     delay: 2
// })

// gsap.to("#box5", {
//     x: 800,
//     duration: 1,
//     delay: 3
// })

// will animate one after another
// but problem is async
// to make it sync, we will use gsap timeline

/*
A Tween is a single, atomic animation of one or more properties on an element (e.g., "move an object to the right over 1 second").
A Timeline is a container that strings multiple tweens together in a sequence, allowing you to control, pause, or reverse the entire group as a single unit.
*/

let tl = gsap.timeline();

tl.to("#box3", {
    x: 800,
    duration: 1,
    delay: 1
})

tl.to("#box4", {
    x: 800,
    duration: 1,
})

tl.to("#box5", {
    x: 800,
    duration: 1,
})

// now no need of delay



/* Index 2 */

gsap.from("#page1 #box", {
    scale: 0,
    delay: 1,
    duration: 2,
    rotate: 360
})

gsap.from("#page2 #box", {
    scale: 0.5,
    opacity: 0,
    delay: 1,
    duration: 2,
    rotate: 720,
    // scrollTrigger: "#page2 #box"
    scrollTrigger: {
        trigger: "#page2 #box",
        scroller: "body", // default, but need to mention if using smooth scroll libraries
        // markers: true,  // markers that help to visualize scroll start and end, remove later

        start: "top 70%", // default end of body
        end: "top 30%",    // default start of body
        // here start & end are is related to body, not element. e.g. animation will start/trigger if target top/start point is hits top 70% ~ bottom 30% of body
        // here can use top, center and bottom. But use always top only. (i checked with bottom its abrupt)

        // scrub: true, // while scrolling into view effect, default is false
        // when using scrub duration & delay become irrelevant
        scrub: 4, // higher the value, higher smoothing/delay. 1-5 are good range.

        // pin: true
    }
})

// pin property usage example
// pin is basically replacement of sticky css property. impt.- always use parent element as trigger
gsap.to("#example", {
    transform: "translateX(-50%)",
    scrollTrigger: {
        trigger: "#page4",
        scroller: "body",
        // markers: true,
        scrub: 2,
        // start: "top 0%",
        // end: "top -100%",

        // start: "top top",     // Jab page ka 'top' screen ke 'top' par aaye
        // end: "bottom top",    // Jab page ka 'bottom' screen ke 'top' se nikal jaye

        // start: "top center",  // Jab page ka 'top' screen ke 'center' (50%) par pahunche
        // end: "bottom center", // Jab page ka 'bottom' screen ke 'center' tak pahunche
        
        // start: "top top",     // Jab page ka top screen ke top par ho
        // end: "top -50%",      // Jab page ka top screen se sirf 50% upar gaya ho

        // start: "top top",     // Start point fixed hai
        // end: "+=2000",        // Start point se exact 2000px scroll hone ke baad khatam

        pin: true   // will pin the trigger element until full scroll is done i.e. top 0% to -100%
        // Pinning ka duration sirf is baat par depend karta hai ki Start aur End ke beech kitne pixels ka gap hai.
    }
})

// two types of start and end-
// 1. scroller start and end. i.e. mostly body
// 2. trigger start and end

// property start/end is meeting point. it controles both scroller and trigger points.
// start/end: "Trigger-ka-point Scroller-ka-point" or "Trigger-element View-Port"
// Jab Trigger-Start, Scroller-Start se takrayega $\rightarrow$ Animation shuru.
// Jab Trigger-End, Scroller-End se takrayega $\rightarrow$ Animation khatam.

/*
Single Value (Offset/Distance): Jab start ya end mein single value (jaise +=100% ya 500px) use hoti hai, toh wo meeting point nahi balki Start position se aage ki direct scroll distance hoti hai.
Example: end: "+=100%" matlab jahan trigger start hua, wahan se exactly 1 screen height aage scroll hone par end hoga.
*/


/*
toggleActions: "onEnter onLeave onEnterBack onLeaveBack"

onEnter-	Jab scroll karte hue element niche se enter kare (Start marker cross ho).
onLeave-	Jab scroll karte hue element uupar se nikal jaye (End marker cross ho).
onEnterBack-	Jab wapas upar scroll karte hue element uupar se enter kare.
onLeaveBack-	Jab wapas upar scroll karte hue element niche se nikal jaye.

Possible Actions-
play: Jahan ruka hai wahan se shuru karo.
pause: Wahin rok do.
resume: Pause ke baad wapas shuru karo.
reverse: Animation ko ulta chalao.
restart: Animation ko ekdum shuru (0%) se chalao (Reset).
reset: Animation ko shuruat ki state mein le jao aur rok do.
complete: Ekdum end state par pahuncha do.
none: Kuch mat karo.
*/

//example
gsap.from("#page3 #box", {
    scale: 0.5,
    opacity: 0,
    delay: 0,
    duration: 2,
    rotate: 720,
    scrollTrigger: {
        trigger: "#page3 #box",
        scroller: "body",
        start: "top 70%",
        end: "top 30%",
        toggleActions: "restart pause resume reverse",
        markers: true
    }
})