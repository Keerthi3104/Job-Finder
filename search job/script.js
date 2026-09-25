const searchInput = document.getElementById("searchInput");
const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");

const jobFilter = document.getElementById("jobFilter");
const jobCards = document.querySelectorAll(".job-card");
const noJobs = document.getElementById("noJobs");

const modal = document.getElementById("jobModal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalCompany = document.getElementById("modalCompany");
const modalLocation = document.getElementById("modalLocation");
const modalType = document.getElementById("modalType");
const modalSalary = document.getElementById("modalSalary");
const modalLogo = document.getElementById("modalLogo");

function filterJobs() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const locationValue = locationInput.value.toLowerCase().trim();
  const selectedType = jobFilter.value;

  let visibleJobs = 0;

  jobCards.forEach(function (card) {
    const title = card.dataset.title.toLowerCase();
    const location = card.dataset.location.toLowerCase();
    const type = card.dataset.type;

    const matchesSearch = title.includes(searchValue);

    const matchesLocation = location.includes(locationValue);

    const matchesType = selectedType === "all" || type === selectedType;

    if (matchesSearch && matchesLocation && matchesType) {
      card.style.display = "flex";
      visibleJobs++;
    } else {
      card.style.display = "none";
    }
  });

  if (visibleJobs === 0) {
    noJobs.style.display = "block";
  } else {
    noJobs.style.display = "none";
  }
}

searchBtn.addEventListener("click", filterJobs);

jobFilter.addEventListener("change", filterJobs);

searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    filterJobs();
  }
});

const detailButtons = document.querySelectorAll(".details-btn");

detailButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const card = button.closest(".job-card");

    const title = card.querySelector("h3").textContent;

    const company = card.querySelector(".company").textContent;

    const location = card.querySelector(
      ".job-info span:first-child",
    ).textContent;

    const type = card.querySelector(".job-info span:nth-child(2)").textContent;

    const salary = card.querySelector(".job-bottom strong").textContent;

    const logo = card.querySelector(".company-logo").textContent;

    modalTitle.textContent = title;
    modalCompany.textContent = company;
    modalLocation.textContent = location;
    modalType.textContent = type;
    modalSalary.textContent = "💰 " + salary;
    modalLogo.textContent = logo;

    modal.classList.add("active");
  });
});

closeModal.addEventListener("click", function () {
  modal.classList.remove("active");
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.remove("active");
  }
});

const applyButton = document.querySelector(".apply-btn");

applyButton.addEventListener("click", function () {
  alert("Application feature will be available soon!");
});

const postJobBtn = document.getElementById("postJobBtn");
const postJobModal = document.getElementById("postJobModal");
const closePostJob = document.getElementById("closePostJob");
const postJobForm = document.getElementById("postJobForm");

postJobBtn.addEventListener("click", function () {
  postJobModal.classList.add("active");
});

closePostJob.addEventListener("click", function () {
  postJobModal.classList.remove("active");
});

postJobModal.addEventListener("click", function (event) {
  if (event.target === postJobModal) {
    postJobModal.classList.remove("active");
  }
});

postJobForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const job = {
    title: document.getElementById("jobTitle").value,
    company: document.getElementById("companyName").value,
    location: document.getElementById("jobLocation").value,
    type: document.getElementById("jobType").value,
    salary: document.getElementById("salary").value,
  };

  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  jobs.push(job);

  localStorage.setItem("jobs", JSON.stringify(jobs));

  alert("Job posted successfully!");

  postJobForm.reset();

  postJobModal.classList.remove("active");
});
