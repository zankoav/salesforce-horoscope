import { LightningElement, track, wire } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import { getRecord } from "lightning/uiRecordApi";
import BIRTHDATE_FIELD from "@salesforce/schema/Contact.Birthdate";

const types = {
  aries: {
    from: { m: 3, d: 21 },
    to: { m: 4, d: 19 }
  },
  taurus: {
    from: { m: 4, d: 20 },
    to: { m: 5, d: 20 }
  },
  gemini: {
    from: { m: 5, d: 21 },
    to: { m: 6, d: 21 }
  },
  cancer: {
    from: { m: 6, d: 22 },
    to: { m: 7, d: 22 }
  },
  leo: {
    from: { m: 7, d: 23 },
    to: { m: 8, d: 22 }
  },
  virgo: {
    from: { m: 8, d: 23 },
    to: { m: 9, d: 22 }
  },
  libra: {
    from: { m: 9, d: 23 },
    to: { m: 10, d: 23 }
  },
  scorpio: {
    from: { m: 10, d: 24 },
    to: { m: 11, d: 22 }
  },
  sagittarius: {
    from: { m: 11, d: 23 },
    to: { m: 12, d: 21 }
  },
  capricorn: {
    from: { m: 12, d: 22 },
    to: { m: 1, d: 20 }
  },
  aquarius: {
    from: { m: 1, d: 21 },
    to: { m: 2, d: 18 }
  },
  pisces: {
    from: { m: 2, d: 19 },
    to: { m: 3, d: 20 }
  }
};

export default class Horoscope extends LightningElement {
  @track types = {};

  @wire(CurrentPageReference)
  currentPageReference;

  @wire(getRecord, {
    recordId: "$currentPageReference.attributes.recordId",
    fields: [BIRTHDATE_FIELD]
  })
  initContact({ error, data }) {
    if (data) {
      const birthDate = data.fields.Birthdate.value;
      if (birthDate) {
        const type = this.getType(birthDate);
        this.types = {};
        this.types[type] = true;
      } else {
        this.types = {
          empty: true
        };
      }
    } else if (error) {
      console.error(error);
    }
  }

  getType(birthDate) {
    const dateObject = new Date(birthDate);
    const m = dateObject.getMonth() + 1;
    const d = dateObject.getDate();
    let result;
    // eslint-disable-next-line guard-for-in
    for (const key in types) {
      const type = types[key];
      if (
        (type.from.m === m && d >= type.from.d) ||
        (type.to.m === m && d <= type.to.d)
      ) {
        result = key;
      }
    }
    return result;
  }
}