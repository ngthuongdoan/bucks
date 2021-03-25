/**
 *
 * @class
 * @classdesc -Class for Cloudinary API Response
 */
class Image {
  /**
   *
   * @param {string} public_id - Defined image param
   * @param {Date} created_at
   * @param {string} url - HTTP url
   * @param {string} secure_url - HTTPS url
   * @param {string} original_filename - File name on cloud
   */
  constructor(public_id, created_at, url, secure_url, original_filename) {
    this.public_id = public_id;
    this.created_at = created_at;
    this.url = url;
    this.secure_url = secure_url;
    this.original_filename = original_filename;
  }
}

export default Image;
