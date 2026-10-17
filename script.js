const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const taskList = $("#taskList");
const taskForm = $("#taskForm");
const taskInput = $("#taskInput");
let toastTimer;

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function updateProgress() {
  const items = $$(".task-item", taskList);
  const done = items.filter(item => item.classList.contains("done")).length;
  const total = items.length;
  const percent = total ? Math.round(done / total * 100) : 0;
  $("#taskCount").textContent = `${done} of ${total} completed`;
  $("#progressText").textContent = `${done} of ${total} tasks`;
  $("#progressBar").style.width = `${percent}%`;
  $("#plannerProgress").style.width = `${percent}%`;
  $("#ringPercent").textContent = `${percent}%`;
  $("#statTasks").textContent = String(total).padStart(2, "0");
  $(".progress-ring").style.background = `conic-gradient(var(--purple) 0 ${percent}%, var(--soft) ${percent}% 100%)`;
}

function createTask(label) {
  const item = document.createElement("li");
  item.className = "task-item";
  const toggle = document.createElement("button");
  toggle.className = "task-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", `Mark ${label} complete`);
  const text = document.createElement("span");
  text.textContent = label;
  const remove = document.createElement("button");
  remove.className = "delete-task";
  remove.type = "button";
  remove.textContent = "×";
  remove.setAttribute("aria-label", `Delete ${label}`);
  item.append(toggle, text, remove);
  taskList.append(item);
}

taskForm.addEventListener("submit", event => {
  event.preventDefault();
  const value = taskInput.value.trim();
  if (!value) {
    $("#formMessage").textContent = "Please enter a task before adding it.";
    taskInput.focus();
    return;
  }
  createTask(value);
  taskInput.value = "";
  $("#formMessage").textContent = "";
  updateProgress();
  showToast("Task added to your plan ✨");
});

taskList.addEventListener("click", event => {
  const item = event.target.closest(".task-item");
  if (!item) return;
  if (event.target.closest(".task-toggle")) {
    item.classList.toggle("done");
    const label = $("span", item).textContent;
    const completed = item.classList.contains("done");
    $(".task-toggle", item).textContent = completed ? "✓" : "";
    $(".task-toggle", item).setAttribute("aria-label", `Mark ${label} ${completed ? "incomplete" : "complete"}`);
    showToast(completed ? "Nice work — task completed!" : "Task moved back to your list.");
    updateProgress();
  }
  if (event.target.closest(".delete-task")) {
    item.remove();
    updateProgress();
    showToast("Task removed.");
  }
});

$("#clearDone").addEventListener("click", () => {
  const completed = $$(".task-item.done", taskList);
  completed.forEach(item => item.remove());
  updateProgress();
  showToast(completed.length ? `${completed.length} completed task(s) cleared.` : "There are no completed tasks to clear.");
});

$("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  $("#themeToggle").textContent = isDark ? "☾ Theme" : "☼ Theme";
  try { localStorage.setItem("focusflow-theme", isDark ? "dark" : "light"); } catch (_) {}
  showToast(`${isDark ? "Dark" : "Light"} theme enabled.`);
});
try {
  if (localStorage.getItem("focusflow-theme") === "dark") {
    document.body.classList.add("dark");
    $("#themeToggle").textContent = "☾ Theme";
  }
} catch (_) {}

$("#menuToggle").addEventListener("click", () => {
  const open = $("#navLinks").classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(open));
  $("#menuToggle").textContent = open ? "×" : "☰";
});
$$(".nav-links a").forEach(link => link.addEventListener("click", () => {
  $("#navLinks").classList.remove("open");
  $("#menuToggle").setAttribute("aria-expanded", "false");
  $("#menuToggle").textContent = "☰";
}));

$("#contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = $("#name").value.trim();
  const email = $("#email").value.trim();
  const message = $("#message").value.trim();
  const feedback = $("#contactFeedback");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (name.length < 2) {
    feedback.textContent = "Please enter a name with at least 2 characters.";
    $("#name").focus();
    return;
  }
  if (!emailPattern.test(email)) {
    feedback.textContent = "Please enter a valid email address.";
    $("#email").focus();
    return;
  }
  if (message.length < 5) {
    feedback.textContent = "Please write a message of at least 5 characters.";
    $("#message").focus();
    return;
  }
  feedback.textContent = `Thanks, ${name}! Your form passed validation. (Demo only — no message was sent.)`;
  showToast("Form validated successfully!");
  event.target.reset();
});

const today = new Date();
$("#todayDate").textContent = today.toLocaleDateString(undefined, {month:"short", day:"numeric"});
$("#backTop").addEventListener("click", event => {
  event.preventDefault();
  window.scrollTo({top: 0, behavior: "smooth"});
});
updateProgress();
