const projects = [
  {
    index: "01",
    title: "Intella by Deloitte",
    type: "Enterprise Tax Platform",
    description:
      "Backend services and data workflows for large-scale tax processing, validation, reporting, and regulatory compliance.",
    impact: "Enterprise-scale tax data",
    tech: [".NET Core", "Python", "PySpark", "Azure Synapse", "Azure SQL"],
    accent: "lime",
  },
  {
    index: "02",
    title: "Gecco2",
    type: "AI Sustainability Platform",
    description:
      "An AI-driven carbon accounting platform helping European industries measure emissions and move toward net-zero goals.",
    impact: "1M+ transactions / month",
    tech: ["Python", ".NET Core", "React", "AWS Lambda", "Microservices"],
    accent: "cyan",
    github: "https://github.com/noumannbaig/co2-calc-service",
  },
  {
    index: "03",
    title: "Windoxx",
    type: "Digital Signage Network",
    description:
      "Cloud-to-device platform for scheduling and remotely managing video advertising across billboards, kiosks, and displays.",
    impact: "Secure real-time device control",
    tech: [".NET Core", "Raspberry Pi", "AWS IoT", "DynamoDB", "MQTT"],
    accent: "violet",
    github: "https://github.com/noumannbaig/windoxx-marketing-app",
  },
  {
    index: "04",
    title: "HR Management System",
    type: "Business Automation",
    description:
      "Event-driven payroll, recruitment, and compliance platform secured for high-volume enterprise data.",
    impact: "40% less manual processing",
    tech: ["Microservices", ".NET Core", "TDE", "Event-driven", "SQL Server"],
    accent: "orange",
    github: "https://github.com/noumannbaig/HRM",
  },
  {
    index: "05",
    title: "StayX Gameplay",
    type: "Industrial Gamification",
    description:
      "AI-powered simulations and interactive challenges that train industrial teams and improve operational decision-making.",
    impact: "Real-time interactive training",
    tech: [".NET Core", "React", "Flutter", "AWS", "SignalR"],
    accent: "pink",
    github: "https://github.com/noumannbaig/stayx-gamification",
  },
  {
    index: "06",
    title: "Knorr-Bremse Digital",
    type: "Industrial Cloud Platform",
    description:
      "Real-time monitoring, predictive maintenance, and secure access for railway and commercial vehicle systems.",
    impact: "Cloud-native industrial systems",
    tech: [
      "Azure",
      "Azure Active Directory",
      "SSO",
      ".NET Core",
      "Kubernetes",
      "Docker",
      "Event Grid",
    ],
    accent: "blue",
    github: "https://github.com/noumannbaig/kb",
  },
  {
    index: "07",
    title: "FastScanner",
    type: "Market Data Processing",
    description:
      "A high-throughput market data scanner that pulls millions of ticker records from Polygon, stores them efficiently as Parquet files, and processes symbols through calculation pipelines.",
    impact: "Millions of market data records",
    tech: [
      "Polygon API",
      "Parquet",
      "Market Data",
      "Data Pipelines",
      "High-throughput Processing",
    ],
    accent: "red",
    github: "https://github.com/fastraders/fastscanner",
  },
  {
    index: "08",
    title: "Business Data Pipeline",
    type: "Consumer Data Engineering",
    description:
      "A data platform that collects business and consumer data from multiple sources, transforms it into analytics-ready datasets, and loads it into databases for downstream processing.",
    impact: "Multi-source data ingestion",
    tech: [
      "AWS Redshift",
      "Amazon Athena",
      "AWS Glue",
      "ClickHouse",
      "PostgreSQL",
      "Neon",
    ],
    accent: "green",
  },
];

const skillGroups = [
  {
    number: "01",
    title: "AI Engineering",
    featured: true,
    skills: [
      "Large Language Models",
      "LangChain",
      "AI Agents",
      "RAG Pipelines",
      "Prompt Engineering",
      "Vector Databases",
      "FastAPI",
      "Python",
    ],
  },
  {
    number: "02",
    title: "Backend & Architecture",
    skills: [
      "C# / .NET Core",
      "ASP.NET Core",
      "Microservices",
      "Monolithic Architecture",
      "Design Patterns",
      "Clean Architecture",
      "REST APIs",
      "WebSockets",
      "SignalR",
      "Kafka",
      "RabbitMQ",
      "API Gateway",
    ],
  },
  {
    number: "03",
    title: "Cloud & DevOps",
    skills: [
      "AWS",
      "Microsoft Azure",
      "Docker",
      "Kubernetes",
      "AWS Lambda",
      "Azure Functions",
      "CI/CD",
      "EC2 / ECS",
      "S3 / EFS",
      "SQS / SNS",
      "AWS IoT Core",
      "AWS IoT Greengrass",
      "Azure App Service",
      "Azure Data Lake",
      "Azure DevOps",
      "Azure Service Bus",
      "Azure APIM",
      "Azure Key Vault",
      "Azure Blob Storage",
      "Azure AD",
    ],
  },
  {
    number: "04",
    title: "Data & Frontend",
    skills: [
      "PostgreSQL",
      "SQL Server",
      "MySQL",
      "Azure SQL",
      "Amazon RDS",
      "MongoDB",
      "DynamoDB",
      "Azure Synapse",
      "React",
      "Angular",
      "PySpark",
    ],
  },
];

const testimonials = [
  {
    quote:
      "Nouman helped us through a complex ATS migration from Manatal to Ashby, including several tricky workarounds along the way. His command of the API landscape got us the technical outcomes we needed, and he consistently made himself available during London-friendly hours to keep things moving. Thank you, Nouman!",
  },
  {
    quote:
      "Nouman is outstanding to work with. He completes work to a very high standard and goes above and beyond to complete work quickly. I highly recommend working with him.",
  },
  {
    quote:
      "Nouman was incredible to work with. This was a difficult project where the scope expanded unexpectedly, but Nouman did not bat an eyelid and did everything he could to deliver the project quickly and successfully. I’d highly recommend Nouman!",
  },
  {
    quote:
      "Nouman did a great job deploying a multi-region web application. We’d be happy to work with this freelancer again.",
  },
  {
    quote:
      "Nouman completed the project successfully. He managed high-frequency real-time scanners according to the given requirements. He faced the challenges, demonstrating a high level of seniority. We will continue to work with him in the future when new features come out.",
  },
  {
    quote: "Loved working with Nouman again. Exactly what we needed!",
  },
  {
    quote:
      "Highly efficient and intelligent, a pleasure to work with. 5 stars.",
  },
  {
    quote: "Nouman is fantastic, highly recommended! 10 out of 10, 5 stars.",
  },
];

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    {diagonal ? (
      <>
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </>
    ) : (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    )}
  </svg>
);

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Nouman Baig, home">
          NB<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#expertise">Expertise</a>
          <a href="#about">About</a>
        </nav>
        <a href="#contact" className="header-cta">
          Let&apos;s talk <Arrow diagonal />
        </a>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero-grid" aria-hidden="true" />
          <div className="eyebrow">
            <span className="status-dot" /> Available for select projects
          </div>
          <h1>
            I engineer systems
            <br />
            that <em>scale.</em>
          </h1>
          <div className="hero-bottom">
            <p>
              Software engineer building resilient cloud platforms, intelligent
              products, and high-performance APIs from Lahore to the world.
            </p>
            <div className="hero-actions">
              <a href="#work" className="button button-primary">
                Explore my work <Arrow />
              </a>
              <a href="#contact" className="text-link">
                Start a conversation <Arrow diagonal />
              </a>
            </div>
          </div>
          <div className="hero-stats">
            <div>
              <strong>5+</strong>
              <span>Years engineering</span>
            </div>
            <div>
              <strong>1M+</strong>
              <span>Monthly transactions</span>
            </div>
            <div>
              <strong>99.9%</strong>
              <span>Platform uptime</span>
            </div>
            <div>
              <strong>$500K+</strong>
              <span>Monthly payments handled</span>
            </div>
            <div>
              <strong>5.0/5</strong>
              <span>Client rating</span>
            </div>
          </div>
        </section>

        <section id="work" className="section-shell section-block">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Selected work</span>
              <h2>Systems with substance.</h2>
            </div>
            <p>
              Enterprise platforms built where reliability, security, and scale
              are non-negotiable.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article
                className={`project-card accent-${project.accent}`}
                key={project.title}
              >
                <div className="project-top">
                  <span>{project.index}</span>
                  <span>{project.type}</span>
                </div>
                <div className="project-visual" aria-hidden="true">
                  <span className="visual-orbit" />
                  <span className="visual-core">{project.index}</span>
                  <span className="visual-line" />
                </div>
                <div className="project-copy">
                  <span className="impact">{project.impact}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul>
                    {project.tech.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {"github" in project && project.github && (
                    <a
                      className="project-link"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on GitHub <Arrow diagonal />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="expertise" className="expertise-section">
          <div className="section-shell section-block">
            <div className="section-heading light-heading">
              <div>
                <span className="section-kicker">Technical expertise</span>
                <h2>Deep skills. Clear outcomes.</h2>
              </div>
              <p>
                From LLM-powered applications to distributed cloud systems, I
                connect ambitious ideas to production-grade engineering.
              </p>
            </div>
            <div className="skills-grid">
              {skillGroups.map((group) => (
                <article
                  className={group.featured ? "skill-card featured" : "skill-card"}
                  key={group.title}
                >
                  <span className="skill-number">{group.number}</span>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section-shell section-block about-section">
          <div className="about-label">
            <span className="section-kicker">About me</span>
          </div>
          <div className="about-copy">
            <h2>
              Engineering for the
              <br />
              <em>real world.</em>
            </h2>
            <p className="about-lead">
              I&apos;m Nouman, a software engineer focused on building systems
              that remain fast, secure, and understandable as they grow.
            </p>
            <div className="about-columns">
              <p>
                Over 5+ years, I&apos;ve worked across fintech, sustainability,
                industrial technology, and enterprise platforms. My work spans
                architecture, APIs, data pipelines, cloud infrastructure, and
                now AI-native products.
              </p>
              <p>
                I care about pragmatic decisions, measurable outcomes, and
                clean execution. Whether processing millions of messages or
                orchestrating AI agents, I build with production in mind.
              </p>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="section-shell section-block testimonial-heading-wrap">
            <div className="section-heading">
              <div>
                <span className="section-kicker">Upwork testimonials</span>
                <h2>Built on trust.</h2>
              </div>
              <div className="review-summary" aria-label="5 out of 5 rating">
                <strong>5.0</strong>
                <span aria-hidden="true">★★★★★</span>
                <small>Upwork client rating</small>
              </div>
            </div>
          </div>
          <div
            className="testimonial-marquee"
            aria-label="Upwork client testimonials"
          >
            <div className="testimonial-track">
              {[false, true].map((duplicate) => (
                <div
                  className="testimonial-set"
                  aria-hidden={duplicate || undefined}
                  key={duplicate ? "duplicate" : "original"}
                >
                  {testimonials.map((testimonial, index) => (
                    <blockquote key={`${duplicate}-${index}`}>
                      <div className="review-card-top">
                        <span className="quote-mark">“</span>
                        <span className="review-stars" aria-label="5 stars">
                          ★★★★★
                        </span>
                      </div>
                      <p>{testimonial.quote}</p>
                      <footer>
                        <span className="upwork-mark" aria-hidden="true">
                          up
                        </span>
                        <span>
                          <strong>Upwork client</strong>
                          <small>5.0 out of 5</small>
                        </span>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-orb" aria-hidden="true" />
          <div className="section-shell contact-inner">
            <span className="section-kicker">Have a challenge?</span>
            <h2>
              Let&apos;s build what&apos;s
              <br />
              <em>next.</em>
            </h2>
            <p>
              I&apos;m open to ambitious products, complex backend systems, and
              applied AI projects.
            </p>
            <a
              className="button contact-button"
              href="mailto:nomanbaig290@gmail.com"
            >
              nomanbaig290@gmail.com <Arrow diagonal />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <a href="#top" className="brand">
          NB<span>.</span>
        </a>
        <p>© {new Date().getFullYear()} Nouman Baig. Built with intent.</p>
        <div>
          <a href="mailto:nomanbaig290@gmail.com">Email</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
