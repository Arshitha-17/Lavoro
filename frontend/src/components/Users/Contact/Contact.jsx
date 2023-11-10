import React from 'react'

const Contact = () => {
    return (
        <div>
            <div>
                <div style={{ textAlign: "center", color: "white" }}>
                    <h4>Get In Touch With Us</h4>
                </div>
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <div style={{textAlign:"center", background:"white", margin:"10px",  padding:"10px"}} >
                        <h6  >Who We Are?</h6>
                        <p>Lavoro stands as India's premier online job portal, catering to the diverse and dynamic employment landscape of the country. As the leading platform connecting talent with opportunities, Lavoro prides itself on its robust and user-friendly interface, offering a comprehensive array of job listings across various industries and career levels. With a commitment to empowering both job seekers and employers, Lavoro harnesses the latest technological advancements to streamline the job search process, providing innovative tools for resume building, job matching, and seamless application processes. Whether you're a seasoned professional or a fresh graduate, Lavoro is dedicated to fostering a thriving ecosystem where talent meets opportunity, ensuring a match made in career heaven.</p>

                    </div>
                    <div style={{textAlign:"center", background:"white", margin:"10px", padding:"10px"}} >
                        <h6>For More Information </h6>
                        <p>Advanced Job Search: Tailored search filters for industry, experience level, and location.
                            Resume Builder: User-friendly tool for crafting professional resumes.
                            Personalized Job Alerts: Customized notifications for relevant job openings.
                            Company Profiles: In-depth insights into prospective employers.
                            Application Tracker: Organized management of submitted applications and their status.
                            Communication Tools: Seamless interaction between employers and job seekers.
                            Career Resources: Articles, tips, and guidance for career development and job hunting.
                        </p>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Contact
