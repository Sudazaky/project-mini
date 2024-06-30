// Permissions
const tablePermissions = document.querySelector("[table-permissions]");
if(tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener('click', () => {
    let permissions = [];
    const rows = tablePermissions.querySelectorAll("[data-name]");
    
    rows.forEach(row => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      
      if(name == "id") {
        inputs.forEach(input => {
          permissions.push({
            id: input.value,
            permissions: []
          });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          if(checked) {
            permissions[index].permissions.push(name);
          }
        });
      }
    });

    // console.log(permissions);
    if(permissions.length > 0) {
      const formPermissions = document.querySelector("[form-permissions]");
      if(formPermissions) {
        const inputPermissions = document.querySelector("[input-permissions]");
        inputPermissions.value = JSON.stringify(permissions);
        formPermissions.submit();
      }
    }
  });
}
// End Permissions

// Permissions view default
const dataRecords = document.querySelector("[data-records]");
if(dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  // console.log(records);

  records.forEach((record, index) => {
    const permissions = record.permissions;

    permissions.forEach(permissions => {
      const rows = tablePermissions.querySelector(`[data-name=${permissions}]`);
      const input = rows.querySelectorAll("input")[index];

      input.checked = true;
    });
  });
}
// End Permissions view default
