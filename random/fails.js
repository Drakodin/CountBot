class Fails {
    constructor() {
        // Default, does nothing
    }
    messageStems = ['you failed to keep up with the count! Ah, ah, ah!',
        'you messed it up! Ah, ah, ah!',
        'you lost track of the count! Ah, ah, ah!',
        'you miscount! Ah, ah, ah! ',
        'you disgraced the count! Ah, oh shame!'
    ];

    failMsg() {
        let index = Math.floor(Math.random() * 5);
        return this.messageStems[index];
    }
}

module.exports = Fails;
