import { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tabs";
import { postAiGenerate } from "../endpoints/ai/generate_POST.schema";
import styles from "./_index.module.css";

type WorkspaceTask = "resume" | "email" | "research" | "chat";

const navItems = [
  ["/", "Workspace"],
  ["#playground", "AI Playground"],
  ["/evaluation", "Evaluation Lab"],
  ["#responsible-ai", "Responsible AI"],
] as const;

export default function HomePage() {
  const [task, setTask] = useState<WorkspaceTask>("resume");
  const [name, setName] = useState("Alex Morgan");
  const [targetRole, setTargetRole] = useState("Junior Business Analyst");
  const [jobDescription, setJobDescription] = useState("");
  const [careerInfo, setCareerInfo] = useState("Customer service, retail sales, POS operations, teamwork, problem solving and basic data analysis coursework.");
  const [emailContext, setEmailContext] = useState("");
  const [researchText, setResearchText] = useState("");
  const [researchQuestion, setResearchQuestion] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("Ready");
  const [evaluation, setEvaluation] = useState<number | null>(null);

  const taskLabel = useMemo(() => ({ resume: "Resume & Career", email: "Smart Email", research: "Research Assistant", chat: "AI Workplace Chat" })[task], [task]);

  async function generate() {
    setStatus("Analyzing input");
    setEvaluation(null);
    try {
      const result = await postAiGenerate({
        task,
        candidateName: name,
        targetRole,
        careerInfo,
        jobDescription,
        emailContext,
        researchText,
        researchQuestion,
      });
      setOutput(result.output);
      setEvaluation(result.score ?? null);
      setStatus("Ready for review");
    } catch (error) {
      setStatus("Needs attention");
      setOutput(error instanceof Error ? error.message : "The AI service could not be reached. Please try again.");
    }
  }

  return (
    <>
      <Helmet>
        <title>Workmate AI — AI-Powered Workplace Productivity Assistant</title>
        <meta name="description" content="An assessment-ready AI productivity workspace for resumes, professional email and grounded research." />
      </Helmet>
      <div className={styles.app}>
        <header className={styles.header}>
          <div className={styles.brand}><span className={styles.brandMark}>W</span><span>WORKMATE AI</span></div>
          <nav className={styles.nav} aria-label="Primary navigation">
            {navItems.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className={styles.headerState}><span className={styles.dot} /> Claude engine</div>
        </header>

        <main className={styles.main}>
          <section className={styles.hero}>
            <div>
              <p className={styles.eyebrow}>CAPACITI · AI DEVELOPMENT PROJECT</p>
              <h1>One workspace for the work you repeat.</h1>
              <p className={styles.lede}>Turn career information, workplace context and research notes into useful drafts — with validation and human review built into the workflow.</p>
            </div>
            <div className={styles.heroMeta}>
              <div><span>MODEL</span><strong>CLAUDE</strong></div>
              <div><span>WORKFLOW</span><strong>AI → VALIDATE → REVIEW</strong></div>
              <div><span>STATUS</span><strong>Prototype active</strong></div>
            </div>
          </section>

          <section className={styles.workspace} id="playground">
            <aside className={styles.sidebar}>
              <p className={styles.kicker}>PRODUCTIVITY MODES</p>
              <button className={`${styles.mode} ${task === "resume" ? styles.activeMode : ""}`} onClick={() => setTask("resume")}><span>01</span><b>Resume & Career</b><small>Generate + optimize</small></button>
              <button className={`${styles.mode} ${task === "email" ? styles.activeMode : ""}`} onClick={() => setTask("email")}><span>02</span><b>Smart Email</b><small>Draft for an audience</small></button>
              <button className={`${styles.mode} ${task === "research" ? styles.activeMode : ""}`} onClick={() => setTask("research")}><span>03</span><b>Research Assistant</b><small>Summarize supplied text</small></button>
              <button className={`${styles.mode} ${task === "chat" ? styles.activeMode : ""}`} onClick={() => setTask("chat")}><span>04</span><b>AI Workplace Chat</b><small>Multi-purpose assistant</small></button>
              <div className={styles.sideNote}><span>WHY IT EXISTS</span><p>Designed around repeatable workplace tasks, not a generic chatbot.</p></div>
            </aside>

            <section className={styles.panel}>
              <div className={styles.panelHead}><div><p className={styles.kicker}>ACTIVE WORKFLOW</p><h2>{taskLabel}</h2></div><div className={styles.status}><span className={styles.statusPulse} />{status}</div></div>
              <Tabs defaultValue="input" className={styles.tabs}>
                <TabsList><TabsTrigger value="input">Input</TabsTrigger><TabsTrigger value="output">Output</TabsTrigger><TabsTrigger value="explain">Why this result</TabsTrigger></TabsList>
                <TabsContent value="input" className={styles.tabContent}>
                  {task === "resume" && <div className={styles.formGrid}>
                    <label><span>Candidate name</span><Input value={name} onChange={e => setName(e.target.value)} /></label>
                    <label><span>Target role</span><Input value={targetRole} onChange={e => setTargetRole(e.target.value)} /></label>
                    <label className={styles.full}><span>Candidate information</span><Textarea value={careerInfo} onChange={e => setCareerInfo(e.target.value)} /></label>
                    <label className={styles.full}><span>Job description <em>optional</em></span><Textarea value={jobDescription} onChange={e => setJobDescription(e.target.value)} placeholder="Paste the actual job description for grounded keyword analysis." /></label>
                  </div>}
                  {task === "email" && <div className={styles.formGrid}>
                    <label><span>Audience</span><Input value={targetRole} onChange={e => setTargetRole(e.target.value)} placeholder="Manager, client, recruiter" /></label>
                    <label><span>Tone</span><Input value={name} onChange={e => setName(e.target.value)} placeholder="Formal, informal, persuasive" /></label>
                    <label className={styles.full}><span>Context</span><Textarea value={emailContext} onChange={e => setEmailContext(e.target.value)} placeholder="What is the situation and desired outcome?" /></label>
                  </div>}
                  {task === "research" && <div className={styles.formGrid}>
                    <label className={styles.full}><span>Source material</span><Textarea value={researchText} onChange={e => setResearchText(e.target.value)} placeholder="Paste an article, report, meeting notes or other material." /></label>
                    <label className={styles.full}><span>Research question</span><Textarea value={researchQuestion} onChange={e => setResearchQuestion(e.target.value)} placeholder="What should the assistant extract or explain?" /></label>
                  </div>}
                  {task === "chat" && <div className={styles.formGrid}>
                    <label className={styles.full}><span>Message to the assistant</span><Textarea value={emailContext} onChange={e => setEmailContext(e.target.value)} placeholder="Ask for resume help, a professional rewrite, research support or another workplace task." /></label>
                  </div>}
                  <div className={styles.actionRow}><Button size="lg" onClick={generate}>Run {taskLabel} <span>→</span></Button><span className={styles.actionHint}>AI output is a draft. Review before use.</span></div>
                </TabsContent>
                <TabsContent value="output" className={styles.tabContent}><div className={styles.output}><p className={styles.outputLabel}>GENERATED RESULT</p><pre>{output || "Run a workflow to generate an output here."}</pre></div></TabsContent>
                <TabsContent value="explain" className={styles.tabContent}><div className={styles.explain}><div><b>Grounding</b><span>Uses the information you supplied as the factual source.</span></div><div><b>Validation</b><span>Flags unsupported claims rather than inventing them.</span></div><div><b>Human checkpoint</b><span>You review and edit the result before professional use.</span></div></div></TabsContent>
              </Tabs>
            </section>
          </section>

          <section className={styles.proofGrid} id="evaluation">
            <article className={styles.proofCard}><p className={styles.kicker}>AI EVALUATION</p><h3>{evaluation === null ? "Awaiting test" : `${evaluation.toFixed(1)} / 5`}</h3><p>Quality score from the evaluation layer. A result below the 4.0 target should be revised or reviewed.</p></article>
            <article className={styles.proofCard}><p className={styles.kicker}>AGENTIC FLOW</p><div className={styles.flow}><span>Generate</span><i>→</i><span>Critique</span><i>→</i><span>Revise</span><i>→</i><span>Evaluate</span></div></article>
            <article className={styles.proofCard}><p className={styles.kicker}>PRODUCTIVITY TEST</p><h3>Measure, don't guess.</h3><p>Track task steps and time taken in real test runs rather than claiming invented productivity gains.</p></article>
          </section>

          <section className={styles.responsible} id="responsible-ai">
            <div><p className={styles.kicker}>RESPONSIBLE AI</p><h2>Useful AI, with boundaries.</h2></div>
            <div className={styles.guardrails}><span>No fabricated credentials</span><span>Source-grounded analysis</span><span>Human approval</span><span>Prompt-injection awareness</span><span>Privacy minimization</span><span>Secure API handling</span></div>
          </section>
        </main>

        <footer className={styles.footer}><span>WORKMATE AI · CAPACITI PROJECT</span><span>Prototype · Claude + Floot</span></footer>
      </div>
    </>
  );
}
