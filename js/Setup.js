class Setup{
    constructor(pieces){
        this.pieces = pieces;
        this.array = [];
        this.card1 = null;
        this.card2 = null;
        this.disableClicks = false;
        this.clicks = 0;
        this.total = 0;
        this.errorAudio = document.getElementById('errorAudio');
        this.winAudio = document.getElementById('winAudio');
    }

    build() {
        this.reset();
        this.createArray();
        $('#score').text('Score: ' + this.total);
        // $('#gameboard').css('display', 'block');
        let delayTime = 0;
        for(let i = 0; i < this.array.length; i++) {
            console.log("Delay Time: ",delayTime);
            const currentIndex = this.array[i];
            let card = document.createElement('div');
            card.setAttribute('class', 'card card-template');
            card.classList.add('animated', 'bounceIn', 'delay-'+ delayTime +'s');
            delayTime++;
            card.setAttribute('data-number', currentIndex);
            $('#gameboard').append(card);
        }
    }

    suffle(array) {
        for(let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        this.array = array;
    }

    createArray() {
        let defaultArray = [];
        for(let i = 1; i < this.pieces + 1; i++) {
            for(let j = 0; j < 2; j++) {    
                defaultArray.push(i);
            }
        }
        this.suffle(defaultArray);
    }

    check(element) {

        console.log('Element', element);
        this.clicks += 1;
        if(!$(element).hasClass("disable") && !$(element).hasClass("canceled")) {

            console.log('ok');

            let colorArray = ['#ff4242', '#4542ff', '#4eff42', '#ffca09'];
            const cardNum = element.getAttribute('data-number');
            
            if(!this.disableClicks) {
                element.style.backgroundColor = colorArray[cardNum - 1];
                element.classList.remove('card-template');
            }  

            if(this.card1 === null) {
                this.card1 = cardNum;
                $(element).addClass('disable');        
            } else {
                this.card2 = cardNum;
                $(element).addClass('disable');
            }

            if(this.card1 !== null && this.card2 !== null) {
                if(this.card1 !== this.card2){
                    this.errorAudio.play();
                    $('.card').addClass('disable');
                    setTimeout( ()=> {
                        $('[data-number="' + this.card1 + '"]').addClass('card-template');
                        $('[data-number="' + this.card2 + '"]').addClass('card-template');
                        $('.card').removeClass('disable');
                        this.card1 = null;
                        this.card2 = null;
                        this.clicks = 0;
                    }, 1500);
                } else {
                    this.total++;
                    $('#score').text('Score: ' + this.total);
                    $('*[data-number="' + this.card1 + '"]').addClass("canceled");
                    this.card1 = null;
                    this.card2 = null;
                    this.clicks = 0;
                }
            }

            if(this.total === 3) {
                this.winAudio.play();
                $('#message').html('<p>Great Job!</p>');
                setTimeout( ()=> {
                    this.reset();
                },700);
            }

        }
    }

    reset() {
        $('#gameboard').html('');
        $('#menu').css('display', 'block');
    }
}
