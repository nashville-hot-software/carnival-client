export const modal = {
  handleShow: (setCreationView) => {
    setCreationView(true)

    document.querySelector(".modal--container").classList.add("show");
    document.querySelector(".modal-box").classList.add("show");
    document.querySelector(".modal-bg").classList.add("show");
  },
  handleClose: (setCreationView) => {
    const inputs = document.querySelectorAll('input')
    const selects = document.querySelectorAll('select')

    inputs.forEach(input => input.value = "")
    selects.forEach(select => select.value = "none")

    document.querySelector(".modal-box").classList.remove("show");
    
    setTimeout(() => {
        document.querySelector(".modal--container").classList.remove("show");
        document.querySelector(".modal-bg").classList.remove("show");
    }, 300);

    setTimeout(function () {
        setCreationView(false)
    }, 700);
  },
  handleEditClose: (setEditMode) => {
    setEditMode(false);
    
    const inputs = document.querySelectorAll('input')
    const selects = document.querySelectorAll('select')
    inputs.forEach(input => input.value = "")
    selects.forEach(select => select.value = "none")

    document.querySelector(".modal-box").classList.remove("show");
    
    setTimeout(() => {
        document.querySelector(".modal--container").classList.remove("show");
        document.querySelector(".modal-bg").classList.remove("show");
    }, 300);

    const muiSwitch = document.querySelector('.MuiSwitch-switchBase');

    if (muiSwitch.classList.contains('Mui-checked')) {
      muiSwitch.click();
    }
  }
}