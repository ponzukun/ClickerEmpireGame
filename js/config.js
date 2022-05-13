import { Item } from "/js/item.js";

const items = [
    {
        "name":"Flip machine",
        "type":"能力",
        "maxAmount":500,
        "description":"グリルをクリックごとに 25 円を取得します。",
        "imageUrl":"/images/FlipMachine.png",
        "price":15000
    },
    {
        "name":"ETF Stock",
        "type":"投資",
        "maxAmount":Infinity,
        "description":"ETF 銘柄の購入分をまとめて加算し、毎秒 0.1% を取得します。",
        "imageUrl":"/images/ETF-Stock.png",
        "price":300000
    },
    {
        "name":"ETF Bonds",
        "type":"投資",
        "maxAmount":Infinity,
        "description":"債券 ETF の購入分をまとめて加算し、毎秒 0.07% を取得します。",
        "imageUrl":"/images/ETF-Bonds.png",
        "price":300000
    },
    {
        "name":"Lemonade Stand",
        "type":"不動産",
        "maxAmount":1000,
        "description":"毎秒 30 円を取得します。",
        "imageUrl":"/images/LemonadeStand.png",
        "price":30000
    },
    {
        "name":"Ice Cream Truck",
        "type":"不動産",
        "maxAmount":500,
        "description":"毎秒 120 円を取得します。",
        "imageUrl":"/images/IceCreamTruck.png",
        "price":30000
    },
    {
        "name":"House",
        "type":"不動産",
        "maxAmount":100,
        "description":"毎秒 32,000 円を取得します。",
        "imageUrl":"/images/House.png",
        "price":20000000
    },
    {
        "name":"TownHouse",
        "type":"不動産",
        "maxAmount":100,
        "description":"毎秒 64,000 円を取得します。",
        "imageUrl":"/images/TownHouse.png",
        "price":40000000
    },
    {
        "name":"Mansion",
        "type":"不動産",
        "maxAmount":20,
        "description":"毎秒 500,000 円を取得します。",
        "imageUrl":"/images/Mansion.png",
        "price":250000000
    },
    {
        "name":"Industrial Space",
        "type":"不動産",
        "maxAmount":10,
        "description":"毎秒 2,200,000 円を取得します。",
        "imageUrl":"/images/IndustrialSpace.png",
        "price":1000000000
    },
    {
        "name":"Hotel Skyscraper",
        "type":"不動産",
        "maxAmount":5,
        "description":"毎秒 25,000,000 円を取得します。",
        "imageUrl":"/images/HotelSkyscraper.png",
        "price":10000000000
    },
    {
        "name":"Bullet-Speed Sky Railway",
        "type":"不動産",
        "maxAmount":1,
        "description":"毎秒 30,000,000,000 円を取得します。",
        "imageUrl":"/images/Bullet-SpeedSkyRailway.png",
        "price":10000000000000
    }
];

export const itemObjects = items.map(item => 
    new Item(item.name, item.type, item.maxAmount, item.description, item.imageUrl, item.price));