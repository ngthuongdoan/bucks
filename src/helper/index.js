import router from "@/router";
import Swal from "sweetalert2";

export default {
  async back() {
    await router.back();
  },
  async to(path) {
    await router.push(path)
  },
  loading() {
    Swal.fire({
      title: "Please wait",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then();
  },
  /**
   * Show Error
   * @param {Error} error
   */
  showError(error) {
    Swal.fire({
      title: "Please try again",
      icon: "error",
      text: error.message,
    }).then();
    console.error(error);
  },
  showSuccess() {
    Swal.fire({
      title: "Success",
      icon: "success",
    }).then();
  },
  /**
   * Show warning
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
