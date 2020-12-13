export const modal = {
  handleShow: (setCreationView) => {
    setCreationView(true)

    document.querySelector(".modal--container").classList.add("show");
    document.querySelector(".modal-box").classList.add("show");
    document.querySelector(".modal-bg").classList.add("show");
  },
  handleDetailsShow: (setDeletedState) => {
    // so we can reset state to watch for n deletes after the first delete
    if (setDeletedState) {
      setDeletedState(false);
    }

    document.querySelector(".modal--container").classList.add("show");
    document.querySelector(".modal-box").classList.add("show");
    document.querySelector(".modal-bg").classList.add("show");
  },
  clearForm: () => {
    const inputs = document.querySelectorAll('input');
    const selects = document.querySelectorAll('select');
    inputs.forEach(input => input.value = "");
    selects.forEach(select => select.value = "none");
  },
  handleClose: (setEditMode) => {
    modal.clearForm();

    if (setEditMode) {
        setEditMode(false);
    }

    // close modal
    document.querySelector(".modal-box").classList.remove("show");
    setTimeout(() => {
        document.querySelector(".modal--container").classList.remove("show");
        document.querySelector(".modal-bg").classList.remove("show");
    }, 300);
  },
  handleAddFormClose: (setCreationView) => {
    modal.handleClose()
    
    setTimeout(function () {
        setCreationView(false)
    }, 700);
  },
  handleEditFormClose: (setEditMode) => {
    modal.handleClose(setEditMode);
    
    const muiSwitch = document.querySelector('.MuiSwitch-switchBase');

    if (muiSwitch.classList.contains('Mui-checked')) {
      muiSwitch.click();
    }
  },
  handleEditMode: (editMode, setEditMode) => {
    setEditMode(!editMode);

    const muiSwitch = document.querySelector('.MuiSwitch-switchBase');
    muiSwitch.classList.add('Mui-checked', 'PrivateSwitchBase-checked-2');
  }
}