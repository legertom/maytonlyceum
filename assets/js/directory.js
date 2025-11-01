// Staff Directory Search, Sort, and Filter

let staffData = [];
let currentView = 'grid';
let sortColumn = 'name';
let sortDirection = 'asc';

document.addEventListener('DOMContentLoaded', function() {
  // Load staff data
  loadStaffData();
  
  // Search functionality
  const searchInput = document.getElementById('staffSearch');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(filterStaff, 300));
  }
  
  // Filter functionality
  const schoolFilter = document.getElementById('schoolFilter');
  const departmentFilter = document.getElementById('departmentFilter');
  
  if (schoolFilter) {
    schoolFilter.addEventListener('change', filterStaff);
  }
  
  if (departmentFilter) {
    departmentFilter.addEventListener('change', filterStaff);
  }
  
  // View toggle
  const viewButtons = document.querySelectorAll('.view-btn');
  viewButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const view = this.dataset.view;
      switchView(view);
    });
  });
  
  // Table sorting
  const tableHeaders = document.querySelectorAll('.directory-table th.sortable');
  tableHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const column = this.dataset.sort;
      sortTable(column);
    });
  });
});

// Load staff data from embedded JSON
function loadStaffData() {
  const staffDataElement = document.getElementById('staffData');
  if (staffDataElement) {
    try {
      staffData = JSON.parse(staffDataElement.textContent);
      displayStaff(staffData);
    } catch (e) {
      console.error('Error loading staff data:', e);
    }
  }
}

// Filter staff based on search and filters
function filterStaff() {
  const searchTerm = document.getElementById('staffSearch')?.value.toLowerCase() || '';
  const schoolFilter = document.getElementById('schoolFilter')?.value || 'all';
  const deptFilter = document.getElementById('departmentFilter')?.value || 'all';
  
  let filtered = staffData.filter(staff => {
    // Search filter
    const matchesSearch = !searchTerm || 
      staff.name.toLowerCase().includes(searchTerm) ||
      staff.position.toLowerCase().includes(searchTerm) ||
      staff.email.toLowerCase().includes(searchTerm);
    
    // School filter
    const matchesSchool = schoolFilter === 'all' || staff.school === schoolFilter;
    
    // Department filter
    const matchesDept = deptFilter === 'all' || staff.department === deptFilter;
    
    return matchesSearch && matchesSchool && matchesDept;
  });
  
  displayStaff(filtered);
  updateResultsCount(filtered.length, staffData.length);
}

// Display staff in current view
function displayStaff(staff) {
  if (currentView === 'grid') {
    displayGridView(staff);
  } else {
    displayTableView(staff);
  }
}

// Display grid view
function displayGridView(staff) {
  const grid = document.getElementById('staffGrid');
  if (!grid) return;
  
  if (staff.length === 0) {
    grid.innerHTML = '<div class="no-results"><h3>No staff members found</h3><p>Try adjusting your search or filters.</p></div>';
    return;
  }
  
  grid.innerHTML = staff.map(person => `
    <div class="staff-card">
      <img src="${person.photo}" alt="${person.name}" class="staff-photo" loading="lazy">
      <div class="staff-info">
        <h3 class="staff-name">${person.name}</h3>
        <p class="staff-position">${person.position}</p>
        <p class="staff-school">${person.school}</p>
        <div class="staff-contact">
          <p><strong>Email:</strong> <a href="mailto:${person.email}">${person.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${person.phone}">${formatPhone(person.phone)}</a></p>
          ${person.office ? `<p><strong>Office:</strong> ${person.office}</p>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// Display table view
function displayTableView(staff) {
  const tbody = document.querySelector('#staffTable tbody');
  if (!tbody) return;
  
  if (staff.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem;">No staff members found. Try adjusting your search or filters.</td></tr>';
    return;
  }
  
  tbody.innerHTML = staff.map(person => `
    <tr>
      <td>${person.name}</td>
      <td>${person.position}</td>
      <td>${person.school}</td>
      <td><a href="mailto:${person.email}">${person.email}</a></td>
      <td><a href="tel:${person.phone}">${formatPhone(person.phone)}</a></td>
    </tr>
  `).join('');
}

// Switch between grid and table views
function switchView(view) {
  currentView = view;
  
  const gridView = document.getElementById('staffGrid');
  const tableView = document.querySelector('.directory-table');
  const viewButtons = document.querySelectorAll('.view-btn');
  
  viewButtons.forEach(btn => {
    if (btn.dataset.view === view) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  if (view === 'grid') {
    gridView.classList.add('active');
    tableView.classList.remove('active');
  } else {
    gridView.classList.remove('active');
    tableView.classList.add('active');
  }
  
  // Re-filter to update the new view
  filterStaff();
}

// Sort table by column
function sortTable(column) {
  if (sortColumn === column) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn = column;
    sortDirection = 'asc';
  }
  
  // Update header classes
  document.querySelectorAll('.directory-table th').forEach(th => {
    th.classList.remove('sort-asc', 'sort-desc');
  });
  
  const header = document.querySelector(`th[data-sort="${column}"]`);
  if (header) {
    header.classList.add(`sort-${sortDirection}`);
  }
  
  // Sort the data
  const searchTerm = document.getElementById('staffSearch')?.value.toLowerCase() || '';
  const schoolFilter = document.getElementById('schoolFilter')?.value || 'all';
  const deptFilter = document.getElementById('departmentFilter')?.value || 'all';
  
  let filtered = staffData.filter(staff => {
    const matchesSearch = !searchTerm || 
      staff.name.toLowerCase().includes(searchTerm) ||
      staff.position.toLowerCase().includes(searchTerm) ||
      staff.email.toLowerCase().includes(searchTerm);
    
    const matchesSchool = schoolFilter === 'all' || staff.school === schoolFilter;
    const matchesDept = deptFilter === 'all' || staff.department === deptFilter;
    
    return matchesSearch && matchesSchool && matchesDept;
  });
  
  filtered.sort((a, b) => {
    let aVal = a[column] || '';
    let bVal = b[column] || '';
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });
  
  displayStaff(filtered);
}

// Update results count
function updateResultsCount(shown, total) {
  const resultsInfo = document.getElementById('resultsInfo');
  if (resultsInfo) {
    if (shown === total) {
      resultsInfo.textContent = `Showing all ${total} staff members`;
    } else {
      resultsInfo.textContent = `Showing ${shown} of ${total} staff members`;
    }
  }
}

// Format phone number
function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

// Debounce function to limit search frequency
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export functionality (optional)
function exportToCSV() {
  const searchTerm = document.getElementById('staffSearch')?.value.toLowerCase() || '';
  const schoolFilter = document.getElementById('schoolFilter')?.value || 'all';
  const deptFilter = document.getElementById('departmentFilter')?.value || 'all';
  
  let filtered = staffData.filter(staff => {
    const matchesSearch = !searchTerm || 
      staff.name.toLowerCase().includes(searchTerm) ||
      staff.position.toLowerCase().includes(searchTerm);
    const matchesSchool = schoolFilter === 'all' || staff.school === schoolFilter;
    const matchesDept = deptFilter === 'all' || staff.department === deptFilter;
    return matchesSearch && matchesSchool && matchesDept;
  });
  
  let csv = 'Name,Position,School,Email,Phone\n';
  filtered.forEach(person => {
    csv += `"${person.name}","${person.position}","${person.school}","${person.email}","${person.phone}"\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'staff-directory.csv';
  link.click();
  window.URL.revokeObjectURL(url);
}
