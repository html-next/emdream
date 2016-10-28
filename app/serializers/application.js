export default class Serializer {
  constructor() {
    this.store = null;
  }

  normalizeResponse(_, __, data) {
    return data;
  }

  static create() {
    return new Serializer();
  }
}
