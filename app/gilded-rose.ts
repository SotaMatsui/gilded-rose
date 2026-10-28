export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

type SpecialItems =
  | "Aged Brie"
  | "Backstage passes to a TAFKAL80ETC concert"
  | "Sulfuras, Hand of Ragnaros";

type ItemSetting = {
  sold: boolean;
  minQuality: number;
  maxQuality: number;
  degradation: {
    [sellInIsLessThan: number]: number;
  };
};

type DegradationSettings = Record<SpecialItems | "default", ItemSetting>;

const ITEM_SETTINGS = {
  default: {
    sold: true,
    minQuality: 0,
    maxQuality: 50,
    degradation: {
      Infinity: 1,
      0: 2,
    },
  },
  "Aged Brie": {
    sold: true,
    minQuality: 0,
    maxQuality: 50,
    degradation: {
      Infinity: -1,
      0: -2,
    },
  },
  "Sulfuras, Hand of Ragnaros": {
    sold: false,
    minQuality: 80,
    maxQuality: 80,
    degradation: {
      Infinity: 0,
    },
  },
  "Backstage passes to a TAFKAL80ETC concert": {
    sold: true,
    minQuality: 0,
    maxQuality: 50,
    degradation: {
      Infinity: -1,
      10: -2,
      5: -3,
      0: Infinity,
    },
  },
} as const satisfies DegradationSettings;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const settings = (ITEM_SETTINGS[this.items[i].name] ??
        ITEM_SETTINGS.default) as ItemSetting;

      // SellIn
      if (settings.sold) {
        this.items[i].sellIn -= 1;
      }

      // Quality
      const current = this.items[i].quality;
      if (current < settings.minQuality || settings.maxQuality < current)
        continue;
      const degs = Object.entries(settings.degradation)
        .filter((e) => Number(e[0]) > this.items[i].sellIn)
        .sort((a, b) => Number(a[0]) - Number(b[0]));
      const degradation = degs[0][1];
      const next = current - degradation;

      // commit
      if (next < settings.minQuality) {
        this.items[i].quality = settings.minQuality;
      } else if (settings.maxQuality < next) {
        this.items[i].quality = settings.maxQuality;
      } else {
        this.items[i].quality = next;
      }
    }

    return this.items;
  }
}
