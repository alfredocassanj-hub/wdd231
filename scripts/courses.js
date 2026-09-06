const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Intro to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        completed: false,
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        completed: false,
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        completed: false,
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        certificate: "Web and Computer Programming",
        completed: false,
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        completed: false,
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        certificate: "Web and Computer Programming",
        completed: true,
    },
];

const courseContainer = document.querySelector("#course-container");
const totalCreditsEl = document.querySelector("#total-credits");

const allButton = document.querySelector("#all-courses");
const wddButton = document.querySelector("#wdd-courses");
const cseButton = document.querySelector("#cse-courses");

function displayCourses(courseList) {
    courseContainer.innerHTML = "";

    courseList.forEach((course) => {
        const card = document.createElement("div");
        card.classList.add("course");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} credits</p>
        `;

        courseContainer.appendChild(card);
    });

    const totalCredits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    totalCreditsEl.textContent = totalCredits;
}

allButton.addEventListener("click", () => displayCourses(courses));

wddButton.addEventListener("click", () => {
    const wddCourses = courses.filter((course) => course.subject === "WDD");
    displayCourses(wddCourses);
});

cseButton.addEventListener("click", () => {
    const cseCourses = courses.filter((course) => course.subject === "CSE");
    displayCourses(cseCourses);
});

displayCourses(courses);