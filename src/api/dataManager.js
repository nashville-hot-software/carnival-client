const baseURL = "http://127.0.0.1:8000";

export default {
    getAllCustomers() {
    return fetch(
      `${baseURL}/customers`
    ).then(resp => resp.json());
  }
};
