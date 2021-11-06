new TypeIt("#tqyxhj", {
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

new TypeIt('#talkToXHJ', {
    lifeLike: true,
    cursorSpeed: 1000,
    waitUntilVisible: true,
    speed: 100
}).go();