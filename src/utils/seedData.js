const newsData = [
    {
        title: "OpenAI Launches Sora: The Future of Video Gen",
        category: "Generative AI",
        source: "TechCrunch",
        time: "2h ago",
        image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=800",
        whyItMatters: "Sora changes the unit economics of video production. Professionals knowing Sora will have a 10x edge in content marketing.",
        url: "https://openai.com/sora"
    },
    {
        title: "Apple Enters the AI Race with 'Apple Intelligence'",
        category: "Tech Giant",
        source: "The Verge",
        time: "5h ago",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800",
        whyItMatters: "On-device AI means your privacy is protected. Developers need to learn Swift + CoreML for the next wave of iPhone apps.",
        url: "https://apple.com"
    }
];

const jobsData = [
    {
        title: "Gen AI Engineer",
        company: "Google",
        location: "Mountain View, CA",
        salary: "$180k - $250k",
        matchScore: 92,
        missingSkills: ["None"],
        link: "#"
    },
    {
        title: "AI Product Manager",
        company: "Meta",
        location: "Remote",
        salary: "$160k - $220k",
        matchScore: 78,
        missingSkills: ["LLM Fine-tuning", "RAG Architecture"],
        link: "#"
    }
];

export const seedDatabase = () => {
    try {
        // Seed News
        const existingNews = localStorage.getItem('news');
        if (!existingNews) {
            console.log("Seeding news...");
            localStorage.setItem('news', JSON.stringify(newsData));
        }

        // Seed Jobs
        const existingJobs = localStorage.getItem('jobs');
        if (!existingJobs) {
            console.log("Seeding jobs...");
            localStorage.setItem('jobs', JSON.stringify(jobsData));
        }

        console.log("Mock database seeded successfully!");
    } catch (err) {
        console.error("Error seeding mock database:", err);
    }
};
