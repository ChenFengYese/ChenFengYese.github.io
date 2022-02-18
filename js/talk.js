new TypeIt("#ttywzy", {
        loop: true,
        cursorSpeed: 1000,
        speed: 100
    })
    .type("  晨风 && 夜色的星空")
    .pause(2000)
    .delete(null, {
        delay: 500
    })
    .type("我们的一些话语，留下了美好的记忆……")
    .pause(3000)
    .go();

new TypeIt('#talkToYou', {
    lifeLike: true,
    cursorSpeed: 800,
    waitUntilVisible: true,
    speed: 50
}).go();