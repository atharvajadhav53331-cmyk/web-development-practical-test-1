const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categoryInput = document.getElementById("expense-category");
const filterInput = document.getElementById("filter-category");
const listEl = document.getElementById("expense-list");
const totalEl = document.getElementById("total-amount");
const errorEl = document.getElementById("error-message");

let expenses = [];

function render() {
  const filter = filterInput.value;
  const visible =
    filter === "All"
      ? expenses
      : expenses.filter((item) => item.category === filter);

  listEl.innerHTML = visible.length
    ? visible
        .map(
          (item) => `
      <li class="expense-item">
        <div>
          <strong>${item.name}</strong>
          <span class="badge">${item.category}</span>
        </div>
        <div>
          <span>₹${item.amount.toFixed(2)}</span>
          <button type="button" class="btn-delete" data-id="${item.id}">Delete</button>
        </div>
      </li>`
        )
        .join("")
    : `<li class="empty-state">No expenses found.</li>`;

  const total = visible.reduce((sum, item) => sum + item.amount, 0);
  totalEl.textContent = `₹${total.toFixed(2)}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categoryInput.value;

  if (!name || Number.isNaN(amount) || amount <= 0) {
    errorEl.textContent = "Enter a valid expense name and positive amount.";
    return;
  }

  errorEl.textContent = "";
  expenses.push({ id: Date.now() + Math.random(), name, amount, category });
  form.reset();
  render();
});

listEl.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-delete")) return;
  const id = Number(e.target.dataset.id);
  expenses = expenses.filter((item) => item.id !== id);
  render();
});

filterInput.addEventListener("change", render);

render();