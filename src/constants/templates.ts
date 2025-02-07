export const templates = [
    {
        id: "blank",
        label: "Blank Document",
        imageUrl: "/blank-document.svg",
        initialContent: ""
    },
    {
        id: "software-proposal",
        label: "Software Dev Proposal",
        imageUrl: "/software-proposal.svg",
        initialContent: `
            <h1>Software Development Proposal</h1>
            <h2>Project Overview</h2>
            <p>Provide a brief introduction to the project, outlining the problem and the proposed solution.</p>
            
            <h2>Scope of Work</h2>
            <ul>
                <li>Define the key features and functionalities.</li>
                <li>Outline the technologies to be used.</li>
                <li>Describe the timeline and milestones.</li>
            </ul>
            
            <h2>Team & Responsibilities</h2>
            <p>List team members and their roles.</p>
            
            <h2>Budget & Costs</h2>
            <p>Provide an estimated cost breakdown.</p>
            
            <h2>Conclusion</h2>
            <p>Summarize the proposal and next steps.</p>
        `
    },
    {
        id: "project-proposal",
        label: "Project Proposal",
        imageUrl: "/project-proposal.svg",
        initialContent: `
            <h1>Project Proposal</h1>
            <h2>Introduction</h2>
            <p>Describe the purpose and goals of the project.</p>

            <h2>Objectives</h2>
            <ul>
                <li>Define the primary objectives.</li>
                <li>Mention key deliverables.</li>
            </ul>

            <h2>Timeline</h2>
            <p>Include estimated completion dates for each phase.</p>

            <h2>Budget</h2>
            <p>Provide cost estimates.</p>

            <h2>Conclusion</h2>
            <p>Summarize the proposal and outline the next steps.</p>
        `
    },
    {
        id: "business-letter",
        label: "Business Proposal",
        imageUrl: "/business-letter.svg",
        initialContent: `
            <h1>Business Proposal</h1>
            <h2>Executive Summary</h2>
            <p>Provide an overview of your business and the purpose of the proposal.</p>

            <h2>Business Opportunity</h2>
            <p>Describe the market opportunity and your proposed solution.</p>

            <h2>Implementation Plan</h2>
            <p>Outline the strategy for execution.</p>

            <h2>Financial Plan</h2>
            <p>Provide projections and funding requirements.</p>

            <h2>Conclusion</h2>
            <p>Summarize the key points and include a call to action.</p>
        `
    },
    {
        id: "resume",
        label: "Resume",
        imageUrl: "/resume.svg",
        initialContent: `
            <h1>[Your Name]</h1>
            <p>[Your Contact Information]</p>

            <h2>Summary</h2>
            <p>Brief summary of your skills and experience.</p>

            <h2>Work Experience</h2>
            <ul>
                <li><strong>Job Title</strong> – [Company Name] (YYYY - YYYY)
                    <ul>
                        <li>Responsibility 1</li>
                        <li>Responsibility 2</li>
                    </ul>
                </li>
            </ul>

            <h2>Education</h2>
            <ul>
                <li><strong>Degree</strong> – [Institution Name], [Year]</li>
            </ul>

            <h2>Skills</h2>
            <ul>
                <li>Skill 1</li>
                <li>Skill 2</li>
                <li>Skill 3</li>
            </ul>

            <h2>Projects</h2>
            <ul>
                <li><strong>Project Name</strong> – Brief description of the project.</li>
            </ul>
        `
    },
    {
        id: "cover-letter",
        label: "Cover Letter",
        imageUrl: "/cover-letter.svg",
        initialContent: `
            <h1>Cover Letter</h1>
            <p><strong>[Your Name]</strong></p>
            <p>[Your Address]</p>
            <p>[Your Email]</p>
            <p>[Date]</p>

            <p><strong>[Hiring Manager's Name]</strong></p>
            <p>[Company Name]</p>
            <p>[Company Address]</p>

            <p>Dear [Hiring Manager's Name],</p>

            <p>I am writing to express my interest in the <strong>[Job Title]</strong> position at <strong>[Company Name]</strong>. 
            With <strong>[X years]</strong> of experience in <strong>[relevant field]</strong>, I believe my skills in 
            <strong>[specific skills]</strong> align well with the role.</p>

            <p>I look forward to discussing how my background can benefit your team. Thank you for your time and consideration.</p>

            <p>Sincerely,</p>
            <p><strong>[Your Name]</strong></p>
        `
    },
    {
        id: "letter",
        label: "Letter",
        imageUrl: "/letter.svg",
        initialContent: `
            <h1>Formal Letter</h1>
            <p><strong>[Your Name]</strong></p>
            <p>[Your Address]</p>
            <p>[Your Email]</p>
            <p>[Date]</p>

            <p><strong>[Recipient's Name]</strong></p>
            <p>[Recipient's Address]</p>

            <p>Dear [Recipient's Name],</p>

            <p>I hope this letter finds you well. [Body of the letter]</p>

            <p>Sincerely,</p>
            <p><strong>[Your Name]</strong></p>
        `
    }
];
