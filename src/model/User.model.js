/**
 * @class
 * @classdesc User of application
 */
class User {
  /**
   * @param {string} uid - firebase custom uid
   * @param {string} displayName - username
   * @param {string} email - user email
   * @param {DocumentReference} selectedWallet - current Wallet
   */
  constructor(uid, displayName, email, selectedWallet) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
    this.selectedWallet = selectedWallet;
  }
}

export default User;
