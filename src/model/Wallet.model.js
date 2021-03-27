/**
 * @class
 * @classdesc Wallet is a container of transactions.
 */
class Wallet {
  /**
   * Create new Wallet
   * @param  {string} name
   * @param  {number} amount
   * @param  {string} color - "#xxxxxx"
   * @param {string} uid - Owner
   * @param  {string} bank=""
   * @param type
   * @param  {string} serial="" - If bank exists
   * @param  {Currency} currency - Currency API
   */
  constructor(name = "", amount = 0, currency = "", color = "", uid = "", bank = "", type = "", serial = "") {
    this.name = name;
    this.amount = amount;
    this.color = color;
    this.currency = currency;
    this.uid = uid;
    if (bank) {
      this.serial = serial;
      this.bank = bank;
      this.type = type;
    }
  }
}

export default Wallet;
