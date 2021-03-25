/**
 * @class
 * @classdesc Wallet is a container of transactions.
 */
class Wallet {
  /**
   * Create new Wallet
   * @param  {string} name
   * @param  {number} amount
   * @param  {number} color - "#xxxxxx"
   * @param  {string} bank=""
   * @param type
   * @param  {string} serial="" - If bank exists
   * @param  {Currency} currency - Currency API
   */
  constructor(name = "", amount = "", color = "", bank = "", type = "", serial = "", currency = "") {
    this.name = name;
    this.amount = amount;
    this.color = color;
    this.currency = currency;
    if (bank) {
      this.serial = serial;
      this.bank = bank;
      this.type = type;

    }
  }
}

export default Wallet;
