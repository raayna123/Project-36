class Food {

    constructor() {
        this.image = loadImage("images/Milk.png"); 
    }
    getFoodStock() {
        var foodStockRef = database.ref("foodStock");
        foodStockRef.on("value", function(data) {
            // console.log("foodStockRef: ", data);
            foodStock = data.val();
        })
    }
    getFeedTime() {
        var feedTimeRef = database.ref("feedTime");
        feedTimeRef.on("value", function(data) {
            // console.log("foodStockRef: ", data);
            feedTime = data.val();
        })
    }
    addFood() {
        this.updateCount(foodStock + 1)
    }
    deductFood() {
        if(foodStock > 0) {
            this.updateCount(foodStock - 1)
            // console.log(feedTime);
            var datetime = new Date().toString();
            console.log(datetime);
            var feedTime = datetime.slice(0, 24);
            console.log(feedTime);
            this.updateFeedTime(feedTime);
        }
    }
    updateCount(count) {
        database.ref("/").update({
            foodStock: count
        })
    }
    updateFeedTime(time) {
        database.ref("/").update({
            feedTime: time
        })
    }
    display() {
        var x = 90, y = 100;

        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);
        // console.log(foodStock)
        if(foodStock) {
            for(var i = 0; i < foodStock; i++) {
                if(i % 10 === 0) {
                    x = 90;
                    y = y +50
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
    bedroom() {
        background(bedroomImg, 550, 500);
    }
    garden() {
        background(gardenImg, 550, 500);
    }
    washroom() {
        background(washroomImg, 550, 500);
    }
}