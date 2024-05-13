async function getGroceryList() {
  try {
      const response = await fetch(`/grocery`);
      const data = await response.json();

      if (!data) {
        alert('Grocery List Does Not Exist')
        return;
      }

      const extractedData = data.map(item => ({
        _id: item._id,
        item: item.item,
        number: item.number,
        person: item.person,
        date: item.date
      }));

      displayGroceryList(extractedData)
  } catch (error) {
      console.error('Error fetching grocery list:', error);
  }
}

function displayGroceryList(groceryList) {
  const tableBody = document.getElementById('groceryListBody');
  tableBody.innerHTML = '';

  groceryList.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${item.item}</td>
          <td>${item.number}</td>
          <td>${item.person}</td>
          <td>${item.date}</td>
          <td><input type="checkbox" ${item.checked ? 'checked' : ''}></td>
      `;
      tableBody.appendChild(row);
  });
}

$(document).ready(() => {
  let socket = io.connect();

  // Socket.IO event listener for 'itemAdded'
  socket.on('listUpdated', () => {
    // When a new item is added, automatically fetch the updated grocery list
    getGroceryList();
  });
});


$('#groceryListBody').on('click', 'tr', function() {
  var rowIndex = $(this).index();

  $(this).toggleClass('selected');
  var selectedRows = $('#groceryListBody tr.selected');

  var selectedValues = selectedRows.map(function() {
    // return $(this).find('td:first').text();
    return $(this).index()
  }).get();
});


async function addItem() {
  // Get input field values
  const item = document.getElementById('item').value;
  const number = document.getElementById('number').value;
  const person = document.getElementById('person').value;

  if (!item || !number || !person) {
    alert('Please fill in all fields');
    return;
  }

  // Create an object representing the new item
  const newItem = {
    item: item,
    number: number,
    person: person,
  };

  // Send a POST request to add the new item to the grocery list
  fetch(`/grocery/addItem`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to add item');
      }
      return response.text()
  })
  .then(message => {
    // Display the message to the user
    alert("Item Added");
    // Reload the grocery list to display the updated items
    getGroceryList();
  })
  .catch(error => {
      console.error('Error adding item:', error);
  });
}

async function removeItems(){
  // Get the selected row indices
  const selectedRows = document.querySelectorAll("#groceryListBody tr.selected");
  const indices = Array.from(selectedRows).map(row => row.rowIndex - 1); // Subtract 1 to adjust for table header
  
  if (indices.length == 0) {
    alert("None Selected")
    return;
  }

  
  const indicesString = indices.join(',');

  // Send a DELETE request to remove the selected items
  const response = await fetch(`/grocery/removeItems/${indicesString}`, {
    method: 'DELETE',
  });

  if (response.ok) {
      const data = await response.json();
      // console.log(data.message);
      getGroceryList();
  } else {
      console.error('Failed to remove items:', response.status);
  }
}