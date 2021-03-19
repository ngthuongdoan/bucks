import router from "@/router";
import Swal from "sweetalert2";
export default {
  async back() {
    await router.back();
  },
  loading() {
    Swal.fire({
      title: "Please wait",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  },
  /**
   * Hiển thị lỗi
   * @param {Error} error - Object lỗi gặp phải
   */
  showError(error) {
    Swal.fire({
      title: "Please try again",
      icon: "error",
      text: error.message,
    });
    console.error(error);
  },
  showSuccess() {
    Swal.fire({
      title: "Success",
      icon: "success",
    });
  },
  /**
   * Hiện bảng cảnh báo
   * @param {String} confirmText
   * @returns {Promise<SweetAlertResult<Awaited<unknown>>>}
   */
  confirmSwal() {
    return Swal.fire({
      text: "You cannot revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
  },
  close() {
    Swal.close();
  },
};
