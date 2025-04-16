const tabs = {
  Default: [
    {
      title: "Email boss",
      description: "Update report",
      dueDate: "2025-04-20",
      priority: "high",
    },
  ],
  Other: [
    {
      title: "Email boss",
      description: "Update report",
      dueDate: "2025-04-20",
      priority: "high",
    },
  ],
};

function addToDoToLocalStorage() {
  const title = document.getElementById("Title").value;
  const description = document.getElementById("Description").value;
  const dueDate = document.getElementById("Date").value;
  const priority = document.getElementById("Priority").value;
  const destination = document.getElementById("tabSelector").value;

  if (!destination) {
    alert("Please select a tab to add the task to.");
    return;
  }

  const newItem = {
    title,
    description,
    dueDate,
    priority,
  };

  let tabs = JSON.parse(localStorage.getItem("tabs")) || {};

  if (!tabs[destination]) {
    alert(`Tab "${destination}" does not exist.`);
    return;
  }

  tabs[destination].push(newItem);
  localStorage.setItem("tabs", JSON.stringify(tabs));
  displayTabContent(destination);
}

function loadTabsToSidebar() {
  const verticalDiv = document.getElementById("vertical");
  verticalDiv.innerHTML = "";

  const storedTabs = JSON.parse(localStorage.getItem("tabs"));

  if (!storedTabs) {
    verticalDiv.innerHTML = "<p>No tabs found.</p>";
    return;
  }

  Object.keys(storedTabs).forEach((tabName) => {
    const tabButton = document.createElement("button");
    tabButton.textContent = tabName;
    tabButton.setAttribute("data-tab", tabName);
    tabButton.classList.add("tab-btn");

    tabButton.addEventListener("click", () => {
      displayTabContent(tabName);
    });
    verticalDiv.appendChild(tabButton);
  });
}

function addTabToLocalStorage() {
  const tabName = document.getElementById("listName").value;
  let tabs = JSON.parse(localStorage.getItem("tabs")) || {};

  if (tabs[tabName]) {
    console.log(`Tab "${tabName}" already exists.`);
    return;
  }

  tabs[tabName] = [];

  localStorage.setItem("tabs", JSON.stringify(tabs));
  console.log(`Tab "${tabName}" added to localStorage.`);
}

function openForm(id) {
  loadTabsIntoSelect();
  document.getElementById(id).style.display = "block";
}

function closeForm(id) {
  document.getElementById(id).style.display = "none";
}

function displayTabContent(tabName) {
  const container = document.getElementById("block2x2");
  container.innerHTML = "";

  const tabs = JSON.parse(localStorage.getItem("tabs")) || {};

  if (!tabs[tabName] || tabs[tabName].length === 0) {
    createDeleteButton(tabName);
    return;
  }

  createDeleteButton(tabName);

  tabs[tabName].forEach((item, index) => {
    console.log(index);
    const card = document.createElement("div");
    card.classList.add("todo-card");

    const buttonId = `delete-${tabName}-${index}`;
    const deleteButton = document.createElement("button");
    deleteButton.id = buttonId;
    deleteButton.textContent = "Delete item";

    deleteButton.onclick = function () {
      deleteItemFromTab(tabName, index); // Pass tab name and item index
    };

    card.innerHTML = `
        
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <p><strong>Due:</strong> ${item.dueDate}</p>
        <p><strong>Priority:</strong> ${item.priority}</p>
        
      `;
    card.appendChild(deleteButton);
    container.appendChild(card);
  });
}

function createDeleteButton(tabName) {
  const button = document.createElement("button");
  const container = document.getElementById("block2x2");

  button.textContent = `Delete Tab`;

  button.onclick = function () {
    deleteTab(tabName);
    displayTabContent("");
  };

  container.appendChild(button);
}

function deleteTab(tabName) {
  const tabs = JSON.parse(localStorage.getItem("tabs")) || {};

  if (!tabs[tabName]) {
    console.warn(`Tab "${tabName}" doesn't exist.`);
    return;
  }

  delete tabs[tabName]; // Remove tab
  localStorage.setItem("tabs", JSON.stringify(tabs)); // Save changes

  console.log(`Tab "${tabName}" has been deleted.`);

  loadTabsToSidebar(); // Refresh sidebar
}

function loadTabsIntoSelect() {
  const tabSelector = document.getElementById("tabSelector");
  tabSelector.innerHTML = '<option value="">Select a tab</option>'; // Reset options

  const storedTabs = JSON.parse(localStorage.getItem("tabs"));

  if (!storedTabs) return;

  Object.keys(storedTabs).forEach((tabName) => {
    const option = document.createElement("option");
    option.value = tabName;
    option.textContent = tabName;
    tabSelector.appendChild(option);
  });
}

function deleteItemFromTab(tabName, index) {
  const tabs = JSON.parse(localStorage.getItem("tabs")) || {};

  if (!tabs[tabName]) {
    console.warn(`Tab "${tabName}" doesn't exist.`);
    return;
  }

  if (index < 0 || index >= tabs[tabName].length) {
    console.warn(`Invalid index: ${index}`);
    return;
  }

  tabs[tabName].splice(index, 1);

  // Update localStorage
  localStorage.setItem("tabs", JSON.stringify(tabs));

  loadTabsToSidebar();
  displayTabContent(tabName); // Display the updated content for the tab
}

loadTabsToSidebar();
