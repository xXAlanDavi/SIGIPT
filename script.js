// Datos simulados completos
const sampleData = {
    inventory: [
        { id: 1, name: "Hamburguesa Clásica", category: "Carnes", stock: 45, minStock: 20, status: "normal" },
        { id: 2, name: "Pan de Hamburguesa", category: "Panes", stock: 12, minStock: 30, status: "low" },
        { id: 3, name: "Lechuga", category: "Vegetales", stock: 8, minStock: 15, status: "low" },
        { id: 4, name: "Tomate", category: "Vegetales", stock: 0, minStock: 10, status: "out" },
        { id: 5, name: "Refresco Cola", category: "Bebidas", stock: 120, minStock: 50, status: "normal" },
        { id: 6, name: "Papas Fritas", category: "Acompañamientos", stock: 25, minStock: 40, status: "low" },
        { id: 7, name: "Queso Cheddar", category: "Lácteos", stock: 35, minStock: 20, status: "normal" },
        { id: 8, name: "Salsa BBQ", category: "Condimentos", stock: 18, minStock: 25, status: "low" }
    ],
    sales: [
        { id: 1, product: "Hamburguesa Clásica", quantity: 2, price: 7.99, total: 15.98, date: "2023-10-15", seller: "María González" },
        { id: 2, product: "Papas Fritas", quantity: 1, price: 4.99, total: 4.99, date: "2023-10-15", seller: "Carlos Ruiz" },
        { id: 3, product: "Refresco Cola", quantity: 2, price: 2.99, total: 5.98, date: "2023-10-14", seller: "María González" },
        { id: 4, product: "Hamburguesa Especial", quantity: 1, price: 9.99, total: 9.99, date: "2023-10-14", seller: "Ana Martínez" },
        { id: 5, product: "Ensalada César", quantity: 3, price: 6.50, total: 19.50, date: "2023-10-13", seller: "Carlos Ruiz" }
    ],
    suppliers: [
        { id: 1, name: "Carnes Premium S.A.", contact: "Roberto Mendoza", phone: "+1 234 567 890", email: "ventas@carnespremium.com", status: "Activo" },
        { id: 2, name: "Panadería Delicias", contact: "Laura Hernández", phone: "+1 234 567 891", email: "pedidos@panaderiadelicias.com", status: "Activo" },
        { id: 3, name: "Verduras Frescas Ltda.", contact: "Miguel Ángel Soto", phone: "+1 234 567 892", email: "contacto@verdurasfrescas.com", status: "Activo" },
        { id: 4, name: "Bebidas Refrescantes", contact: "Sofía Ramírez", phone: "+1 234 567 893", email: "info@bebidasrefrescantes.com", status: "Inactivo" }
    ],
    orders: [
        { id: 4582, supplier: "Carnes Premium S.A.", products: "Hamburguesas, Carne molida", quantity: 150, total: 845.00, date: "2023-10-10", status: "Entregado" },
        { id: 4583, supplier: "Panadería Delicias", products: "Pan hamburguesa, Pan hot dog", quantity: 200, total: 320.50, date: "2023-10-12", status: "En camino" },
        { id: 4584, supplier: "Verduras Frescas Ltda.", products: "Lechuga, Tomate, Cebolla", quantity: 80, total: 156.75, date: "2023-10-14", status: "Pendiente" },
        { id: 4585, supplier: "Bebidas Refrescantes", products: "Refrescos, Jugos", quantity: 300, total: 450.00, date: "2023-10-08", status: "Entregado" }
    ],
    activities: [
        { type: "sale", message: "Nueva venta registrada - Hamburguesa Clásica", time: "Hace 10 minutos" },
        { type: "inventory", message: "Stock bajo de Papas Fritas", time: "Hace 2 horas" },
        { type: "order", message: "Pedido #4582 entregado por Carnes Premium S.A.", time: "Hace 5 horas" },
        { type: "warning", message: "Producto próximo a vencer: Salsa BBQ", time: "Hace 1 día" }
    ],
    monthlySales: [
        { month: "Ene", sales: 12500 },
        { month: "Feb", sales: 13200 },
        { month: "Mar", sales: 11800 },
        { month: "Abr", sales: 14500 },
        { month: "May", sales: 16200 },
        { month: "Jun", sales: 15800 },
        { month: "Jul", sales: 17200 },
        { month: "Ago", sales: 16500 },
        { month: "Sep", sales: 14800 },
        { month: "Oct", sales: 12450 }
    ],
    topProducts: [
        { product: "Hamburguesa Clásica", sales: 245 },
        { product: "Papas Fritas", sales: 189 },
        { product: "Refresco Cola", sales: 167 },
        { product: "Hamburguesa Especial", sales: 132 },
        { product: "Ensalada César", sales: 98 }
    ],
    categorySales: [
        { category: "Hamburguesas", sales: 45 },
        { category: "Acompañamientos", sales: 25 },
        { category: "Bebidas", sales: 18 },
        { category: "Ensaladas", sales: 12 }
    ]
};

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
    loadInventoryData();
    loadSalesData();
    loadSuppliersData();
    loadOrdersData();
    renderCharts();
    initializeEventListeners();
});

// Navegación entre pestañas
function showTab(tabName) {
    // Ocultar todas las pestañas
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        tab.style.display = 'none';
    });
    
    // Mostrar la pestaña seleccionada
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
        selectedTab.style.display = 'block';
    }
    
    // Actualizar navegación activa
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`.nav-link[onclick="showTab('${tabName}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Cargar datos del dashboard
function loadDashboardData() {
    // Actualizar estadísticas
    document.getElementById('totalSales').textContent = '$12,450';
    document.getElementById('totalProducts').textContent = '245';
    document.getElementById('pendingOrders').textContent = '18';
    document.getElementById('activeSuppliers').textContent = '12';
    
    // Cargar actividad reciente
    loadRecentActivity();
}

// Cargar actividad reciente
function loadRecentActivity() {
    const container = document.getElementById('recentActivity');
    container.innerHTML = '';

    sampleData.activities.forEach(activity => {
        const iconClass = activity.type === 'sale' ? 'fa-shopping-cart text-primary' :
                         activity.type === 'inventory' ? 'fa-box text-warning' :
                         activity.type === 'order' ? 'fa-truck text-success' :
                         'fa-exclamation-triangle text-danger';
        
        const item = `
            <div class="activity-item">
                <div class="activity-icon-container" style="background: rgba(255,255,255,0.05);">
                    <i class="fas ${iconClass}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-message">${activity.message}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `;
        container.innerHTML += item;
    });
}

// Cargar datos del inventario
function loadInventoryData() {
    const tableBody = document.getElementById('inventoryTable');
    tableBody.innerHTML = '';

    sampleData.inventory.forEach(item => {
        const statusClass = `status-${item.status}`;
        const statusText = getStatusText(item.status);
        
        const row = `
            <tr class="fade-in">
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.stock}</td>
                <td>${item.minStock}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="btn-icon" onclick="editProduct(${item.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="deleteProduct(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Cargar datos de ventas
function loadSalesData() {
    const tableBody = document.getElementById('salesTable');
    tableBody.innerHTML = '';

    sampleData.sales.forEach(sale => {
        const row = `
            <tr class="fade-in">
                <td>#${sale.id.toString().padStart(4, '0')}</td>
                <td>${sale.product}</td>
                <td>${sale.quantity}</td>
                <td>$${sale.total.toFixed(2)}</td>
                <td>${formatDate(sale.date)}</td>
                <td>${sale.seller}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Cargar datos de proveedores
function loadSuppliersData() {
    const tableBody = document.getElementById('suppliersTable');
    tableBody.innerHTML = '';

    sampleData.suppliers.forEach(supplier => {
        const statusClass = supplier.status === 'Activo' ? 'status-normal' : 'status-out';
        
        const row = `
            <tr class="fade-in">
                <td>${supplier.name}</td>
                <td>${supplier.contact}</td>
                <td>${supplier.phone}</td>
                <td>${supplier.email}</td>
                <td><span class="status-badge ${statusClass}">${supplier.status}</span></td>
                <td>
                    <button class="btn-icon" onclick="editSupplier(${supplier.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="deleteSupplier(${supplier.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Cargar datos de pedidos
function loadOrdersData() {
    const tableBody = document.getElementById('ordersTable');
    tableBody.innerHTML = '';

    sampleData.orders.forEach(order => {
        const statusClass = order.status === 'Entregado' ? 'status-normal' : 
                           order.status === 'En camino' ? 'status-low' : 'status-out';
        
        const row = `
            <tr class="fade-in">
                <td>#${order.id}</td>
                <td>${order.supplier}</td>
                <td>${order.products}</td>
                <td>$${order.total.toFixed(2)}</td>
                <td>${formatDate(order.date)}</td>
                <td><span class="status-badge ${statusClass}">${order.status}</span></td>
                <td>
                    <button class="btn-icon" onclick="viewOrder(${order.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="editOrder(${order.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Renderizar gráficos
function renderCharts() {
    renderSalesChart();
    renderTopProductsChart();
    renderCategorySalesChart();
}

// Gráfico de ventas mensuales
function renderSalesChart() {
    const container = document.getElementById('salesChart');
    const maxSales = Math.max(...sampleData.monthlySales.map(m => m.sales));
    
    const bars = sampleData.monthlySales.map(month => {
        const height = (month.sales / maxSales) * 100;
        return `
            <div class="chart-bar-container">
                <div class="chart-bar" style="height: ${height}%"></div>
                <div class="chart-label">${month.month}</div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = bars;
}

// Gráfico de productos más vendidos
function renderTopProductsChart() {
    const container = document.getElementById('topProductsChart');
    const maxSales = Math.max(...sampleData.topProducts.map(p => p.sales));
    
    const bars = sampleData.topProducts.map(product => {
        const height = (product.sales / maxSales) * 100;
        const shortName = product.product.length > 12 ? product.product.substring(0, 12) + '...' : product.product;
        
        return `
            <div class="chart-bar-container">
                <div class="chart-bar" style="height: ${height}%; background: var(--success-gradient);"></div>
                <div class="chart-label">${shortName}</div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = bars;
}

// Gráfico de ventas por categoría
function renderCategorySalesChart() {
    const container = document.getElementById('categorySalesChart');
    const totalSales = sampleData.categorySales.reduce((sum, cat) => sum + cat.sales, 0);
    
    const chartContent = sampleData.categorySales.map((category, index) => {
        const percentage = ((category.sales / totalSales) * 100).toFixed(1);
        const colors = ['#3498db', '#e74c3c', '#f39c12', '#9b59b6'];
        
        return `
            <div class="d-flex align-items-center mb-3">
                <div class="rounded-circle me-3" style="width: 12px; height: 12px; background-color: ${colors[index]}"></div>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between">
                        <span>${category.category}</span>
                        <span>${percentage}%</span>
                    </div>
                    <div class="progress mt-1" style="height: 8px; background: rgba(255,255,255,0.1);">
                        <div class="progress-bar" style="width: ${percentage}%; background-color: ${colors[index]}"></div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = chartContent;
}

// Funciones auxiliares
function getStatusText(status) {
    const statusMap = {
        'normal': 'Normal',
        'low': 'Bajo',
        'out': 'Agotado'
    };
    return statusMap[status] || 'Desconocido';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
}

// Funciones de UI
function changePeriod(period) {
    const buttons = document.querySelectorAll('.period-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = document.querySelector(`.period-btn[onclick="changePeriod('${period}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Aquí podrías cargar datos diferentes según el período
    console.log(`Período cambiado a: ${period}`);
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    console.log(`Buscando: ${searchTerm}`);
    // Implementar lógica de búsqueda aquí
}

function toggleNotifications() {
    alert('Mostrando notificaciones');
}

function toggleUserMenu() {
    alert('Mostrando menú de usuario');
}

// Funciones de modal
function openAddProductModal() {
    const modal = new bootstrap.Modal(document.getElementById('addProductModal'));
    modal.show();
}

function openNewSaleModal() {
    alert('Abriendo modal para nueva venta');
}

function openAddSupplierModal() {
    alert('Abriendo modal para agregar proveedor');
}

function openNewOrderModal() {
    alert('Abriendo modal para nuevo pedido');
}

// Funciones CRUD
function addProduct() {
    alert('Producto agregado correctamente');
    const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
    modal.hide();
}

function editProduct(id) {
    const product = sampleData.inventory.find(p => p.id === id);
    alert(`Editando producto: ${product.name}`);
}

function deleteProduct(id) {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
        alert('Producto eliminado correctamente');
    }
}

function editSupplier(id) {
    const supplier = sampleData.suppliers.find(s => s.id === id);
    alert(`Editando proveedor: ${supplier.name}`);
}

function deleteSupplier(id) {
    if (confirm('¿Está seguro de que desea eliminar este proveedor?')) {
        alert('Proveedor eliminado correctamente');
    }
}

function viewOrder(id) {
    const order = sampleData.orders.find(o => o.id === id);
    alert(`Viendo detalles del pedido #${order.id}`);
}

function editOrder(id) {
    const order = sampleData.orders.find(o => o.id === id);
    alert(`Editando pedido #${order.id}`);
}

function exportReport() {
    alert('Exportando reporte en PDF...');
}

// Inicializar event listeners
function initializeEventListeners() {
    // Navegación entre pestañas ya está manejada por las funciones onclick
    console.log('Sistema SIGIPT inicializado correctamente');
}