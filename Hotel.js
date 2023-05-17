class Hotel {
    address = "";
    numberOfRoom;
    #minFloor;
    #maxFloor;
    rooms = [];
    constructor(address, numberOfRoom, minFloor, maxFloor, room) {
        this.address = address;
        this.numberOfRoom = numberOfRoom;
        this.#minFloor = minFloor;
        this.#maxFloor = maxFloor;
        this.rooms.push(room);
    }
    printAdvertisemen() {
        console.log("See hotel is an amazing hotel and here is his location " + this.address + " \n there is " + this.numberOfRoom + " available so hurry up and choose a perfect hotel");
    }
    listBookedRoom() {
        for (let i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].isBooked())
                this.rooms[i].printRoom();
        }

    }
}

class Room {
    floorNum;
    roomNum;
    price;
    #isBooked = false;
    constructor(floorNum, roomNum, price, isBooked) {
        this.floorNum = floorNum;
        this.roomNum = roomNum;
        this.price = price;
        this.#isBooked = isBooked;
    }
    printRoom() {
        console.log("the room's number is: " + this.roomNum +
            "\n the room's floor is: " + this.floorNum +
            "\n its price: " + this.price +
            "\n booked or not: " + this.#isBooked + "\n");
    }
    book() {
        this.#isBooked = true;
    }
    isBooked() {
        return this.#isBooked;
    }
}

class SleepingRoom extends Room {
    personCapacity;
    constructor(floorNum, roomNum, price, isBooked, pCapacity) {
        super(floorNum, roomNum, price, isBooked);
        this.personCapacity = pCapacity;
    }
}

class roomWithView extends Room {
    view = "";
    numberOfBeds;
    constructor(floorNum, roomNum, price, isBooked, view, numberOfBed) {
        super(floorNum, roomNum, price, isBooked)
        this.view = view;
        this.numberOfBeds = numberOfBed;
    }
}
const r1 = new Room(2, 5, 23, false);
const h1 = new Hotel("Hebron", 4, 5, 3, r1);

// const roomWithSeeView=new roomWithView(2,4,56,true,"see",5);
// console.log(h1.rooms[0].isBooked());
// h1.listBookedRoom();
// h1.printAdvertisemen();
//all comments just to test the code