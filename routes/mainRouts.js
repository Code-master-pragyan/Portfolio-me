const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

const services = {
    backend: {
        title: "Backend Development",
        description: "Building robust, secure, and scalable server-side applications using Node.js, Express, and MongoDB. I specialize in developing RESTful APIs, handling complex server logic, managing databases efficiently, and ensuring seamless communication between the frontend and backend. With a focus on performance and maintainability, I aim to deliver backend solutions that power dynamic and data-driven applications.",
        points: [
            "Node.js and Express for server-side development",
            "MongoDB with Mongoose for database management",
            "RESTful API design and development",
            "Authentication and authorization using Passport.js",
        ]
    },
    frontend: {
        title: "Frontend Development",
        description: "Creating responsive and interactive web applications using React. I specialize in building modern, user- friendly, and high- performance frontend applications that bring your ideas to life.With a strong foundation in React.js, I develop scalable components that enhance user experience and maintain code modularity.",
        points: [
            "React for building user interfaces",
            "Redux for state management",
            "Responsive design with CSS frameworks like Bootstrap or Tailwind CSS",
            "Integration with RESTful APIs",
        ]
    },
    database: {
        title: "Database Management",
        description: "Designing, implementing, and maintaining efficient database systems using both SQL and NoSQL technologies. I focus on data integrity, performance optimization, and scalability to support smooth operations for data-driven applications.",
        points: [
            "MongoDB for NoSQL database operations",
            "MySQL/PostgreSQL for relational database design",
            "Data modeling and schema design",
            "Efficient querying and indexing strategies",
        ]
    },
    freelance: {
        title: "Freelance Services",
        description: "Providing custom full-stack development services tailored to client needs. From landing pages to full-featured applications, I collaborate closely with clients to bring ideas to life with professionalism and quality.",
        points: [
            "Client communication and requirement analysis",
            "Rapid prototyping and MVP development",
            "Custom website and web app development",
            "Timely delivery with proper documentation and support",
        ]
    },
    security: {
        title: "Web App Security",
        description: "Implementing essential security practices to protect web applications from common vulnerabilities and attacks. Ensuring data privacy, secure user authentication, and safe API communication are top priorities.",
        points: [
            "Input validation and sanitization",
            "JWT-based authentication and authorization",
            "Protection against XSS, CSRF, and SQL Injection",
            "HTTPS, Helmet.js, and secure headers implementation",
        ]
    }

}

const projects = {
    urbanescape: {
        title: "UrbanEscape",
        description: "UrbanEscape is a modern property and travel platform for Northeast India, allowing users to explore and list hotels, resorts, and apartments. Powered by AI, it offers smart search and filtering to enhance the travel planning experience.",
        demoVideo: "https://www.youtube.com/watch?v=ykiQ80J5TnU",
        poster: "/images/urbanthumb.png",
        techStack: ["EJS", "Node.js", "Express", "MongoDB", "Mapbox", "Bootstrap", "Passport.js"],
        problems: [
            "Integrating real-time map data and location services.",
            "Ensuring fast search and filtering for large datasets."
        ],
        solutions: [
            "Used Mapbox API for efficient map rendering.",
            "Implemented server-side filtering and caching for performance."
        ],
        liveLink: "https://urbanescape.onrender.com/listings"
    },

    vitalsync: {
        title: "VitalSync",
        description: "VitalSync is a smart healthcare website that helps users analyze symptoms and receive instant health suggestions using AI. Built with the MERN stack and integrated with the Openrouter API, it provides a responsive and user-friendly experience. The main goal is to Analyze user-reported symptoms to suggest possible health conditions using AI; browse detailed information about diseases, symptoms, and causes in one place; scan and identify medicines to get usage info, dosage, and side effects instantly.",
        demoVideo: "https://www.youtube.com/watch?v=EEmNplJKwCc",
        poster: "/images/vitalthumb.png",
        techStack: ["React.js + Typescript", "Node.js", "Express", "MongoDB", "Openrouter API", "Tailwind", "overpass API", "Passport.js"],
        problems: [
            "Integrating geolocation and distance logic accurately",
            "Difficulty in accurately scanning and extracting medicine names from images due to varied fonts and noisy backgrounds."
        ],
        solutions: [
            "Used Mapbox Geocoding to convert location names to coordinates and Haversine formula to calculate distances between user and listings",
            "Integrated Tesseract.js for performing OCR (Optical Character Recognition), which reads and processes the text from the scanned image, extracts the medicine name, and matches it with the database to provide the correct response."
        ],
        liveLink: "https://vitalsync-frontend.onrender.com",
    },

    spotifyclone: {
        title: "Spotify Clone (UI)",
        description: "A custom-built Spotify-inspired music player interface designed with HTML, CSS, featuring a sleek layout, responsive design, and smooth interactive elements for a modern user experience.",
        poster: "/images/spotifythumb.png",
        techStack: ["HTML", "CSS"],
        problems: [
            "Audio playback controls were unresponsive, and playlist layout broke on smaller screens.",
        ],
        solutions: [
            "Implemented proper responsive CSS media queries.",
        ],
        githubLink: "https://github.com/Code-master-pragyan/Spotify-clone",
    },

    javaadvancedcalculator: {
        title: "Java-Advanced-Calculator",
        description: "This project is a feature-rich calculator application built using Java Swing for a user-friendly graphical interface. It was developed as a group project during our 2nd semester. The calculator supports both basic operations (addition, subtraction, multiplication, division) and advanced mathematical functions such as sin, cos, tan, etc. My primary role in the project was implementing the trigonometric functions, ensuring accurate results and smooth user interaction. The intuitive design and clean layout made the calculator easy to use, enhancing the overall user experience.",
        demoVideo: "/videos/adv_calculator.mp4",
        techStack: ["Core Java", "Java Swing", "Java AWT", "Java ActionListner"],
        problems: [
            "Difficulty in accurately computing trigonometric functions.",
            "GUI layout became cluttered with too many buttons."
        ],
        solutions: [
            "Used Java's Math library to implement precise sin, cos, and tan calculations.",
            "Organized components using Java Swing's GridLayout for a clean and user-friendly interface."
        ],
         githubLink: "https://github.com/Code-master-pragyan/Java-Advanced-Calculator"
    },

};


router.get("/", (req, res) => {
    res.render("./pages/index.ejs");
})

router.get("/services/:service", (req, res) => {
    const serviceName = req.params.service.toLowerCase();
    const serviceData = services[serviceName];

    if (serviceData) {
        res.render("./pages/service.ejs", { service: serviceData });
    } else {
        res.status(404).send("Service not found");
    }
});

router.get("/projects/:project", (req, res) => {
    const projectName = req.params.project.toLowerCase();
    const projectData = projects[projectName];
    if (projectData) {
        res.render("pages/project", { project: projectData });
    } else {
        res.status(404).send("Project not found");
    }
});


router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Configure your email transporter (use your real email and app password)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pragyanlahkar28@gmail.com',
            pass: 'fkdvhbejjwgxajls'
        }
    });

    const mailOptions = {
        from: email,
        to: 'pragyanlahkar28@gmail.com', // where you want to receive the messages
        subject: `Portfolio Contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

module.exports = router;