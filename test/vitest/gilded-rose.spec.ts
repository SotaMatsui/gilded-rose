import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  test("The Quality of an item is never negative", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).not.toBeLessThan(0);
  });

  test("Once the sell by date has passed, Quality degrades twice as fast", () => {
    const gildedRose = new GildedRose([new Item("foo", 1, 4)]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  });

  test("'Aged Brie' increases in Quality the older it gets", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  })

  test("The Quality should < 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 50), new Item("Aged Brie", 10, 51)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[1].quality).toBe(51); // If its initial value is more than 50, it keeps as it is
  })

  test("'Sulfuras' never descrease in Quality", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 10, 80),
      new Item("Sulfuras, Hand of Ragnaros", 1, 0), // Initialization itself is possible, even Sulfuras is expected to have 80 of quality
    ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[1].quality).toBe(0);
    items = gildedRose.updateQuality();
    expect(items[1].quality).toBe(0);
  })

  test("Backstage passes increases in Quality", () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10),
    ];
    const gildedRose = new GildedRose(items);
    gildedRose.updateQuality(); // SellIn: 11
    expect(items[0].quality).toBe(11); // + 1
    gildedRose.updateQuality(); // SellIn :10
    expect(items[0].quality).toBe(13); // + 2
    for (let i = 0; i < 5; i++) {
      gildedRose.updateQuality();
    } // SellIn: 5
    expect(items[0].quality).toBe(24); // + 3
    for (let i = 0; i < 4; i++) {
      gildedRose.updateQuality();
    }  // SellIn: 1
    expect(items[0].quality).toBe(36)
    gildedRose.updateQuality(); // SellIn: 0
    expect(items[0].quality).toBe(0)
  });


  // test("Conjured items degrade in Quality twice as fast as normal items", () => {
  //   const items = [new Item("Conjured", 5, 5)];
  //   const gildedRose = new GildedRose(items);
  //   gildedRose.updateQuality();
  //   expect(items[0].quality).toBe(3);
  //   gildedRose.updateQuality();
  //   expect(items[0].quality).toBe(1);
  //   gildedRose.updateQuality();
  //   expect(items[0].quality).toBe(0);
  // })
});
